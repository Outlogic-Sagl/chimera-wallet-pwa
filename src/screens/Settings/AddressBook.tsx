import { useContext, useEffect } from 'react'
import { NavigationContext, Pages } from '../../providers/navigation'

export default function AddressBook() {
  const { navigate } = useContext(NavigationContext)

  // Redirect to the Address Book app
  useEffect(() => {
    navigate(Pages.AppAddressBook)
  }, [navigate])

  return null
}
