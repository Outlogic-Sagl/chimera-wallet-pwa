import { useEffect } from 'react'
import { initializeIntercom, shutdownIntercom } from '../lib/intercom'

const IntercomMessenger = () => {
  useEffect(() => {
    // Initialize Intercom when component mounts
    // Use a small delay to ensure DOM is fully ready
    const timeoutId = setTimeout(() => {
      initializeIntercom()
    }, 100)

    // Cleanup function to shutdown Intercom when component unmounts
    return () => {
      clearTimeout(timeoutId)
      shutdownIntercom()
    }
  }, [])

  return null // Component does not render UI
}

export default IntercomMessenger
