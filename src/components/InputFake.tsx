import { TextSecondary } from './Text'

export default function InputFake({ text, testId }: { text: string; testId: string }) {
  const style: React.CSSProperties = {
    backgroundColor: 'var(--input-bg)',
    borderRadius: 'var(--input-border-radius)',
    border: '1px solid var(--input-border-color)',
    color: 'var(--white)',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    minHeight: 'var(--input-height)',
    display: 'flex',
    width: '100%',
  }

  return (
    <div style={style} data-testid={testId}>
      <TextSecondary wrap>{text}</TextSecondary>
    </div>
  )
}
