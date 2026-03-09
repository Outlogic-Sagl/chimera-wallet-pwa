import { useContext, useState, useMemo } from 'react'
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
import TrashIcon from '../../../icons/X'
import {
  getContactAddresses,
  removeAddress,
  removeContact,
  getAddressTypeName,
  AddressBookEntry,
} from '../../../lib/addressBook'

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
          <Text tiny>
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

export default function ContactDetail() {
  const { navigate, navigationData } = useContext(NavigationContext)
  const contactName = (navigationData?.contactName as string) || 'Unknown'
  const [refreshKey, setRefreshKey] = useState(0)

  const addresses = useMemo(() => getContactAddresses(contactName), [contactName, refreshKey])

  const handleBack = () => {
    navigate(Pages.AppAddressBook)
  }

  const handleAddAddress = () => {
    navigate(Pages.AppAddressBookForm, { contactName, isContact: true })
  }

  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      removeAddress(id)
      setRefreshKey((k) => k + 1)
      // If no more addresses, go back to address book
      if (addresses.length <= 1) {
        navigate(Pages.AppAddressBook)
      }
    }
  }

  const handleDeleteContact = () => {
    if (confirm(`Are you sure you want to delete ${contactName} and all their addresses?`)) {
      removeContact(contactName)
      navigate(Pages.AppAddressBook)
    }
  }

  return (
    <>
      <Header
        text={contactName}
        back={handleBack}
        auxFunc={handleAddAddress}
        auxIcon={<AddIcon />}
        auxAriaLabel='Add new address for contact'
      />
      <Content>
        <Padded>
          <FlexCol between>
            <FlexCol gap='1rem'>
              {/* Contact info */}
              <Shadow>
                <FlexCol gap='0.25rem'>
                  <Text tiny>
                    Contact Name
                  </Text>
                  <Text bold>{contactName}</Text>
                </FlexCol>
              </Shadow>

              {/* Addresses */}
              <FlexCol gap='0.5rem'>
                <Text bold small>
                  Addresses ({addresses.length})
                </Text>
                {addresses.length === 0 ? (
                  <div style={{ padding: '1rem', textAlign: 'center' }}>
                    <Text>No addresses for this contact.</Text>
                  </div>
                ) : (
                  addresses.map((entry) => (
                    <AddressEntry key={entry.id} entry={entry} onDelete={handleDeleteAddress} />
                  ))
                )}
              </FlexCol>
            </FlexCol>

            {/* Bottom buttons */}
            <FlexCol gap='0.5rem' margin='1rem 0 0 0'>
              <Button onClick={handleAddAddress} label='Add Address' />
              <Button onClick={handleDeleteContact} label='Delete Contact' red />
            </FlexCol>
          </FlexCol>
        </Padded>
      </Content>
    </>
  )
}
