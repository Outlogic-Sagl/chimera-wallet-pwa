import { ReactNode } from 'react'
import Shadow from './Shadow'

interface InfoContainerProps {
  children: ReactNode
}

export default function InfoContainer({ children }: InfoContainerProps) {
  return <Shadow info>{children}</Shadow>
}
