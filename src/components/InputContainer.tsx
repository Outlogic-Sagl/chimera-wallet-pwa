import { ReactNode } from 'react'
import ErrorMessage from './Error'
import FlexRow from './FlexRow'
import FlexCol from './FlexCol'
import Shadow from './Shadow'
import Text from './Text'

interface InputContainerProps {
  children: ReactNode
  error?: string
  label?: string
  right?: JSX.Element
  bottomLeft?: string
  bottomRight?: string
}

export default function InputContainer({
  children,
  error,
  label,
  right,
  bottomLeft,
  bottomRight,
}: InputContainerProps) {
  const TopLabel = () => (
    <FlexRow between>
      <Text capitalize smaller>
        {label}
      </Text>
      <div>{right}</div>
    </FlexRow>
  )

  const BottomLabel = () => (
    <FlexRow between>
      <Text capitalize smaller>
        {bottomLeft}
      </Text>
      <Text capitalize smaller>
        {bottomRight}
      </Text>
    </FlexRow>
  )

  return (
    <FlexCol>
      <FlexCol gap='0.5rem'>
        {label || right ? <TopLabel /> : null}
        <Shadow input>
          <FlexRow>{children}</FlexRow>
        </Shadow>
        {bottomLeft || bottomRight ? <BottomLabel /> : null}
      </FlexCol>
      <ErrorMessage error={Boolean(error)} text={error ?? ''} />
    </FlexCol>
  )
}
