import { useContext, useEffect, useState } from 'react'
import { WalletContext } from '../../providers/wallet'
import { consoleError } from '../../lib/logs'
import { getPrivateKey, noUserDefinedPassword } from '../../lib/privateKey'
import { NavigationContext, Pages } from '../../providers/navigation'
import NeedsPassword from '../../components/NeedsPassword'
import Header from '../../components/Header'
import { defaultPassword } from '../../lib/constants'
import Loading from '../../components/Loading'

export default function Unlock() {
  const { initWallet, dataReady, wallet } = useContext(WalletContext)
  const { navigate } = useContext(NavigationContext)

  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [tried, setTried] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [shouldAutoUnlock, setShouldAutoUnlock] = useState(false)

  // Check if we should auto-unlock (only if no custom password and no biometrics)
  useEffect(() => {
    const checkAutoUnlock = async () => {
      const hasNoPassword = await noUserDefinedPassword()
      const hasBiometrics = wallet.lockedByBiometrics || false
      // Only auto-unlock if user has no custom password AND no biometrics
      setShouldAutoUnlock(hasNoPassword && !hasBiometrics)
      if (!hasNoPassword || hasBiometrics) {
        // User has a password or biometrics, show the unlock screen
        setTried(true)
      }
    }
    checkAutoUnlock()
  }, [wallet.lockedByBiometrics])

  useEffect(() => {
    // Only attempt unlock if we should auto-unlock OR user has entered a password
    if (!shouldAutoUnlock && !password) return
    
    const pass = password ? password : defaultPassword
    getPrivateKey(pass)
      .then(initWallet)
      .then(() => setUnlocked(true))
      .catch((err) => {
        setTried(true)
        if (password) {
          consoleError(err, 'error unlocking wallet')
          setError('Invalid password')
        }
      })
  }, [password, shouldAutoUnlock, initWallet])

  useEffect(() => {
    if (unlocked && dataReady) navigate(Pages.Wallet)
  }, [unlocked, dataReady, navigate])

  return tried ? (
    <>
      <Header text='Unlock' />
      <NeedsPassword error={error} onPassword={setPassword} />
    </>
  ) : (
    <Loading />
  )
}
