import { useContext } from 'react'
import Content from '../../components/Content'
import FlexRow from '../../components/FlexRow'
import Padded from '../../components/Padded'
import Header from '../../components/Header'
import FlexCol from '../../components/FlexCol'
import Text from '../../components/Text'
import Shadow from '../../components/Shadow'
import { NavigationContext, Pages } from '../../providers/navigation'
import Focusable from '../../components/Focusable'

const Middot = () => (
  <svg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
    <circle cx='3' cy='3' r='3' fill='white' />
  </svg>
)

const Tag = ({ kind }: { kind: 'new' | 'coming soon' }) => {
  const style: React.CSSProperties = {
    borderRadius: '4px',
    background: kind === 'coming soon' ? 'rgba(96, 177, 138, 0.10)' : 'var(--blue-primary, rgba(57, 25, 152, 1))',
    color: kind === 'coming soon' ? 'var(--green)' : 'var(--white)',
    fontFamily: 'Geist Mono',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '150%',
    width: 'fit-content',
    padding: '2px 8px',
    textAlign: 'right' as const,
    textTransform: 'uppercase' as const,
  }
  return (
    <div style={style}>
      <FlexRow centered gap='0.25rem'>
        {kind === 'new' ? <Middot /> : ''}
        <p>{kind.replace(' ', '\u00A0')}</p>
      </FlexRow>
    </div>
  )
}

interface AppProps {
  desc: string
  icon: string
  name: string
  live?: boolean
  link?: string
  page?: Pages
}

function App({ desc, icon, link, name, live, page }: AppProps) {
  const { navigate } = useContext(NavigationContext)

  const handleClick = () => {
    if (typeof page !== 'undefined') return navigate(page)
    if (link) window.open(link, '_blank')
  }

  const testId = `app-${name.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <Focusable onEnter={handleClick}>
      <Shadow border borderPurple={live} onClick={handleClick}>
        <FlexCol gap='0.75rem' padding='0.5rem' testId={testId}>
          <FlexRow between>
            <img
              src={icon}
              alt={`${name} icon`}
              style={{ width: 55, height: 55, borderRadius: 8, objectFit: 'contain' }}
            />
            <FlexCol gap='0.25rem'>
              <FlexRow between>
                <Text bold>{name}</Text>
                <Tag kind={live ? 'new' : 'coming soon'} />
              </FlexRow>
              <Text color='dark80' small thin wrap>
                {link}
              </Text>
            </FlexCol>
          </FlexRow>
          <Text color='dark80' small thin wrap>
            {desc}
          </Text>
        </FlexCol>
      </Shadow>
    </Focusable>
  )
}

export default function Apps() {
  return (
    <>
      <Header text='Apps' />
      <Content>
        <Padded>
          <FlexCol>
            <App
              name='Statement'
              icon='/images/apps/Statement.png'
              desc='View your transaction history and account statements'
              page={Pages.AppStatement}
              live
            />

            <App
              name='Referral'
              icon='/images/apps/Referral.png'
              desc='Invite friends and earn rewards'
              page={Pages.AppReferral}
              live
            />

            <App
              name='Gift Cards'
              icon='/images/apps/Card.png'
              desc='Buy and redeem gift cards with Bitcoin'
              page={Pages.AppGiftCards}
              live
            />

            <App
              name='Card Reservation'
              icon='/images/apps/Card.png'
              desc='Reserve your Chimera debit card'
              page={Pages.AppCardReservation}
              live
            />
          </FlexCol>
        </Padded>
      </Content>
    </>
  )
}
