import { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Content from '../../components/Content'
import Padded from '../../components/Padded'
import FlexCol from '../../components/FlexCol'
import Text, { TextSecondary } from '../../components/Text'
import Loading from '../../components/Loading'
import SuccessMessage from '../../components/Success'
import ErrorMessage from '../../components/Error'
import { FlowContext } from '../../providers/flow'
import { NavigationContext, Pages } from '../../providers/navigation'
import { OptionsContext } from '../../providers/options'
import {
  buildKycWebviewUrl,
  fetchKycStatus,
  hasCompletedKycOnce,
  getKycWebviewUrl,
  KycStatus,
  confirmMagicLink,
  saveKycTokens,
  saveKycStatus,
} from '../../lib/kyc'

type ViewState = 'loading' | 'webview' | 'status' | 'error'

export default function Verification() {
  const { kycAuthParams, setKycAuthParams } = useContext(FlowContext)
  const { navigate, screen } = useContext(NavigationContext)
  const { goBack } = useContext(OptionsContext)

  // Determine back behavior based on how we got here
  // If we're on SettingsKYC page (standalone), navigate back to Settings
  // If we're within Settings page (via menu option), use OptionsContext goBack
  const isStandalonePage = screen === Pages.SettingsKYC
  const handleBack = isStandalonePage ? () => navigate(Pages.Settings) : goBack

  const [viewState, setViewState] = useState<ViewState>('loading')
  const [kycStatus, setKycStatus] = useState<KycStatus>('not_started')
  const [statusMessage, setStatusMessage] = useState('')
  const [webviewUrl, setWebviewUrl] = useState('')
  const [error, setError] = useState('')

  // On mount, determine what to show
  useEffect(() => {
    const initializeView = async () => {
      try {
        // If we have auth params from deep link, confirm them and show status
        if (kycAuthParams) {
          try {
            const tokens = await confirmMagicLink(kycAuthParams)
            saveKycTokens(tokens, kycAuthParams.uid)
            
            // Clear the auth params after use
            setKycAuthParams(undefined)
            
            // Immediately fetch status using the token we just received
            const statusResponse = await fetchKycStatus(tokens.accessToken)
            setKycStatus(statusResponse.status)
            setStatusMessage(statusResponse.message || '')
            setViewState('status')
            return
          } catch (err) {
            console.error('KYC auth error:', err)
            setError('Failed to confirm authentication. Please try again.')
            setViewState('error')
            return
          }
        }

        // Check if user has completed KYC before (has tokens stored)
        if (hasCompletedKycOnce()) {
          // Fetch current status
          const statusResponse = await fetchKycStatus()
          setKycStatus(statusResponse.status)
          setStatusMessage(statusResponse.message || '')
          setViewState('status')
        } else {
          // First time - show webview to start KYC
          setWebviewUrl(getKycWebviewUrl())
          setViewState('webview')
        }
      } catch {
        setError('Failed to initialize verification. Please try again.')
        setViewState('error')
      }
    }

    initializeView()
  }, [kycAuthParams, setKycAuthParams])

  // Listen for messages from the iframe (for token capture)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from IDFlow domains
      if (!event.origin.includes('idflow.ch') && !event.origin.includes('azurewebsites.net')) {
        return
      }

      // Handle token messages from the iframe
      if (event.data?.type === 'kyc-tokens') {
        const { accessToken, refreshToken, expiresIn, userId } = event.data
        if (accessToken && refreshToken && userId) {
          saveKycTokens({ accessToken, refreshToken, expiresIn: expiresIn || 3600 }, userId)
        }
      }

      // Handle status updates from the iframe
      if (event.data?.type === 'kyc-status') {
        const status = event.data.status as KycStatus
        saveKycStatus(status)
        setKycStatus(status)
        if (status === 'confirmed' || status === 'pending' || status === 'rejected') {
          setViewState('status')
        }
      }

      // Handle KYC completion
      if (event.data?.type === 'kyc-complete') {
        saveKycStatus('pending')
        setKycStatus('pending')
        setViewState('status')
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleRetry = () => {
    setWebviewUrl(getKycWebviewUrl())
    setViewState('webview')
  }

  // Loading state
  if (viewState === 'loading') {
    return (
      <>
        <Header text='KYC - Verification' backFunc={handleBack} />
        <Content>
          <Loading />
        </Content>
      </>
    )
  }

  // Error state
  if (viewState === 'error') {
    return (
      <>
        <Header text='KYC - Verification' backFunc={handleBack} />
        <Content>
          <Padded>
            <FlexCol>
              <ErrorMessage error text={error} />
            </FlexCol>
          </Padded>
        </Content>
      </>
    )
  }

  // Status display state
  if (viewState === 'status') {
    return (
      <>
        <Header text='KYC - Verification' backFunc={handleBack} />
        <Content>
          <Padded>
            <FlexCol gap='1.5rem'>
              {kycStatus === 'confirmed' && (
                <>
                  <SuccessMessage />
                  <div style={{ textAlign: 'center' }}>
                    <Text>Your identity has been verified!</Text>
                    <TextSecondary>
                      You have full access to all features.
                    </TextSecondary>
                  </div>
                </>
              )}

              {kycStatus === 'pending' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
                  <Text>Verification in Progress</Text>
                  <TextSecondary>
                    Your documents are being reviewed. This usually takes 1-2 business days.
                  </TextSecondary>
                  {statusMessage ? (
                    <div style={{ marginTop: '0.5rem' }}>
                      <TextSecondary>
                        {statusMessage}
                      </TextSecondary>
                    </div>
                  ) : null}
                </div>
              )}

              {kycStatus === 'rejected' && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                  <Text>Verification Unsuccessful</Text>
                  <TextSecondary>
                    Unfortunately, we could not verify your identity. Please try again with valid documents.
                  </TextSecondary>
                  {statusMessage ? (
                    <div style={{ marginTop: '0.5rem' }}>
                      <TextSecondary>
                        {statusMessage}
                      </TextSecondary>
                    </div>
                  ) : null}
                  <div style={{ marginTop: '1.5rem' }}>
                    <button
                      onClick={handleRetry}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </FlexCol>
          </Padded>
        </Content>
      </>
    )
  }

  // Webview state
  return (
    <>
      <Header text='KYC - Verification' backFunc={handleBack} />
      <Content>
        <div style={{ height: '100%' }}>
          <FlexCol gap='0'>
            <iframe
              src={webviewUrl}
              title='KYC Verification'
              allow='camera; clipboard-write; clipboard-read'
              style={{
                width: '100%',
                height: 'calc(100vh - 100px)',
                border: 'none',
                borderRadius: '8px',
              }}
            />
          </FlexCol>
        </div>
      </Content>
    </>
  )
}
