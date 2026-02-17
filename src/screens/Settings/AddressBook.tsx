import Header from './Header'
import Content from '../../components/Content'
import Padded from '../../components/Padded'
import FlexCol from '../../components/FlexCol'
import Text, { TextSecondary } from '../../components/Text'
import ComingSoonIcon from '../../icons/ComingSoon'

export default function AddressBook() {
  return (
    <>
      <Header text='Address Book' back />
      <Content>
        <Padded>
          <FlexCol>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
              <ComingSoonIcon />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text>Coming Soon</Text>
              <TextSecondary>
                The Address Book feature will be available in a future update.
              </TextSecondary>
            </div>
          </FlexCol>
        </Padded>
      </Content>
    </>
  )
}
