import InputContainer from './InputContainer'
import { IonInput } from '@ionic/react'

interface InputDateProps {
  label: string
  value: Date
  onChange: (date: Date) => void
  max?: string
}

export default function InputDate({ label, value, onChange, max }: InputDateProps) {
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleInput = (ev: Event) => {
    const inputValue = (ev.target as HTMLInputElement).value
    if (inputValue) {
      const newDate = new Date(inputValue)
      // Set time to start of day to avoid timezone issues
      newDate.setHours(0, 0, 0, 0)
      onChange(newDate)
    }
  }

  return (
    <InputContainer label={label}>
      <IonInput
        type='date'
        value={formatDateForInput(value)}
        onIonInput={handleInput}
        max={max}
        style={{
          '--padding-start': '0',
          '--padding-end': '0',
        }}
      />
    </InputContainer>
  )
}
