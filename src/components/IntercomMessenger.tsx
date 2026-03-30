import { useEffect } from 'react'
import { initializeIntercom, shutdownIntercom } from '../lib/intercom'

const IntercomMessenger = () => {
  useEffect(() => {
    // Initialize Intercom when component mounts
    initializeIntercom()

    // Cleanup function to shutdown Intercom when component unmounts
    return () => {
      shutdownIntercom()
    }
  }, [])

  return null // Component does not render UI
}

export default IntercomMessenger
