import { useContext, useState, useEffect, useMemo } from 'react'
import { NavigationContext, Pages } from '../../../providers/navigation'
import Content from '../../../components/Content'
import FlexCol from '../../../components/FlexCol'
import FlexRow from '../../../components/FlexRow'
import Header from '../../../components/Header'
import Padded from '../../../components/Padded'
import Text from '../../../components/Text'
import Shadow from '../../../components/Shadow'
import Button from '../../../components/Button'
import Focusable from '../../../components/Focusable'
import AddIcon from '../../../icons/Add'
import TabSelector from './TabSelector'
import {
  getAddressBook,
  getMyAccounts,
  getContacts,
  removeAddress,
  removeContact,
  getAddressTypeName,
  AddressBookEntry,
  AddressType,
} from '../../../lib/addressBook'
import TrashIcon from '../../../icons/X'

type TabType = 'myaccounts' | 'contacts'

interface AddressEntryProps {
  entry: AddressBookEntry
  onDelete: (id: string) => void
}

function AddressEntry({ entry, onDelete }: AddressEntryProps) {
  const truncateAddress = (addr: string) => {
    if (addr.length <= 20) return addr
    return `${addr.slice(0, 10)}...${addr.slice(-10)}`
  }

  return (
    <Shadow>
      <FlexRow between>
        <FlexCol gap='0.25rem'>
          <Text bold small>
            {entry.label || getAddressTypeName(entry.type)}
          </Text>
          <Text color='dark60' tiny>
            {truncateAddress(entry.address)}
          </Text>
        </FlexCol>
        <Focusable onEnter={() => onDelete(entry.id)} fit round>
          <div
            onClick={() => onDelete(entry.id)}
            style={{ cursor: 'pointer', padding: '0.5rem' }}
            aria-label='Delete address'
          >
            <TrashIcon />
          </div>
        </Focusable>
      </FlexRow>
    </Shadow>
  )
}

interface ContactEntryProps {
  name: string
  addressCount: number
  onClick: () => void
  onDelete: () => void
}

function ContactEntry({ name, addressCount, onClick, onDelete }: ContactEntryProps) {
  return (
    <Shadow>
      <FlexRow between>
        <Focusable onEnter={onClick}>
          <div onClick={onClick} style={{ cursor: 'pointer', flex: 1 }}>
            <FlexCol gap='0.25rem'>
              <Text bold>{name}</Text>
              <Text color='dark60' tiny>
                {addressCount} {addressCount === 1 ? 'address' : 'addresses'}
              </Text>
            </FlexCol>
          </div>
        </Focusable>
        <Focusable onEnter={onDelete} fit round>
          <div
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            style={{ cursor: 'pointer', padding: '0.5rem' }}
            aria-label='Delete contact'
          >
            <TrashIcon />
          </div>
        </Focusable>
      </FlexRow>
    </Shadow>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <FlexCol centered gap='1rem'>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Text color='dark60'>{message}</Text>
      </div>
    </FlexCol>
  )
}

export default function AppAddressBook() {
  const { navigate } = useContext(NavigationContext)
  const [currentTab, setCurrentTab] = useState<TabType>('myaccounts')
  const [refreshKey, setRefreshKey] = useState(0)

  const myAccounts = useMemo(() => getMyAccounts(), [refreshKey])
  const contacts = useMemo(() => getContacts(), [refreshKey])
  const addressBook = useMemo(() => getAddressBook(), [refreshKey])

  const handleBack = () => {
    navigate(Pages.Apps)
  }

  const handleAddNew = () => {
    navigate(Pages.AppAddressBookForm)
  }

  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      removeAddress(id)
      setRefreshKey((k) => k + 1)
    }
  }

  const handleDeleteContact = (name: string) => {
    if (confirm(`Are you sure you want to delete ${name} and all their addresses?`)) {
      removeContact(name)
      setRefreshKey((k) => k + 1)
    }
  }

  const handleViewContact = (name: string) => {
    navigate(Pages.AppAddressBookContact, { contactName: name })
  }

  const getContactAddressCount = (name: string): number => {
    return addressBook.filter((e) => e.contact === name).length
  }

  return (
    <>
      <Header
        text='Address Book'
        back={handleBack}
        auxFunc={handleAddNew}
        auxIcon={<AddIcon />}
        auxAriaLabel='Add new address'
      />
      <Content>
        <Padded>
          <FlexCol between>
            <FlexCol gap='1rem'>
              {/* Tab selector */}
              <TabSelector
                options={[
                  { value: 'myaccounts', label: 'My Accounts' },
                  { value: 'contacts', label: 'Contacts' },
                ]}
                selected={currentTab}
                onChange={(value) => setCurrentTab(value as TabType)}
              />

              {/* Content based on selected tab */}
              {currentTab === 'myaccounts' && (
                <FlexCol gap='0.5rem'>
                  {myAccounts.length === 0 ? (
                    <EmptyState message='No saved accounts yet. Add your addresses to easily access them later.' />
                  ) : (
                    myAccounts.map((entry) => (
                      <AddressEntry key={entry.id} entry={entry} onDelete={handleDeleteAddress} />
                    ))
                  )}
                </FlexCol>
              )}

              {currentTab === 'contacts' && (
                <FlexCol gap='0.5rem'>
                  {contacts.length === 0 ? (
                    <EmptyState message='No contacts yet. Add contact addresses to send funds quickly.' />
                  ) : (
                    contacts.map((name) => (
                      <ContactEntry
                        key={name}
                        name={name}
                        addressCount={getContactAddressCount(name)}
                        onClick={() => handleViewContact(name)}
                        onDelete={() => handleDeleteContact(name)}
                      />
                    ))
                  )}
                </FlexCol>
              )}
            </FlexCol>

            {/* Bottom button */}
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleAddNew}
                label={currentTab === 'myaccounts' ? 'Add New Account' : 'Add New Contact'}
              />
            </div>
          </FlexCol>
        </Padded>
      </Content>
    </>
  )
}
