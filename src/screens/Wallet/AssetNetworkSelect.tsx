/**
 * Asset and Network Selection Screen
 * 
 * First step for Send/Receive flows where user selects:
 * 1. Asset (BTC, etc.)
 * 2. Network/Transfer Method (Bitcoin, Ark, Lightning, Bank)
 * 
 * After both are selected, navigates to the appropriate screen.
 */

import { useContext, useState } from 'react'
import Content from '../../components/Content'
import FlexCol from '../../components/FlexCol'
import Header from '../../components/Header'
import Padded from '../../components/Padded'
import Button from '../../components/Button'
import ButtonsOnBottom from '../../components/ButtonsOnBottom'
import AssetSelector from '../../components/AssetSelector'
import NetworkSelector from '../../components/NetworkSelector'
import { type AssetSymbol } from '../../lib/assets'
import { TRANSFER_METHOD, type TransferMethod } from '../../lib/transferMethods'
import { NavigationContext, Pages } from '../../providers/navigation'
import { FlowContext } from '../../providers/flow'

interface AssetNetworkSelectProps {
  mode?: 'send' | 'receive'
}

export default function AssetNetworkSelect({ mode: modeProp }: AssetNetworkSelectProps) {
  const { navigate, goBack, screen } = useContext(NavigationContext)
  const { sendInfo, setSendInfo, recvInfo, setRecvInfo } = useContext(FlowContext)

  // Auto-detect mode if not provided, based on which flow has been initialized
  // If navigating back from SendForm/BankSend, we should be in send mode
  // If navigating back from ReceiveAmount/BankReceive, we should be in receive mode
  const mode = modeProp || (sendInfo.method ? 'send' : 'receive')

  // For now, only BTC is supported, but keep the selector for future expansion
  const [selectedAsset, setSelectedAsset] = useState<AssetSymbol>('BTC')
  const [selectedNetwork, setSelectedNetwork] = useState<TransferMethod | null>(
    mode === 'send' ? sendInfo.method || null : recvInfo.method || null
  )

  const handleContinue = () => {
    if (!selectedAsset || !selectedNetwork) return

    // Update flow context with selected method
    if (mode === 'send') {
      setSendInfo({ ...sendInfo, method: selectedNetwork })
      
      // Navigate based on network
      if (selectedNetwork === TRANSFER_METHOD.bank) {
        navigate(Pages.BankSend)
      } else {
        navigate(Pages.SendForm)
      }
    } else {
      setRecvInfo({ ...recvInfo, method: selectedNetwork })
      
      // Navigate based on network
      if (selectedNetwork === TRANSFER_METHOD.bank) {
        navigate(Pages.BankReceive)
      } else {
        navigate(Pages.ReceiveAmount)
      }
    }
  }

  const canContinue = selectedAsset && selectedNetwork

  return (
    <>
      <Header text={mode === 'send' ? 'Send' : 'Receive'} back={goBack} />
      <Content>
        <Padded>
          <FlexCol gap='1.5rem'>
            <AssetSelector
              label="Asset"
              selected={selectedAsset}
              onSelect={setSelectedAsset}
            />
            <NetworkSelector
              label="Network"
              selected={selectedNetwork || TRANSFER_METHOD.bitcoin}
              onSelect={(network) => setSelectedNetwork(network)}
            />
          </FlexCol>
        </Padded>
      </Content>
      <ButtonsOnBottom>
        <Button
          label='Continue'
          onClick={handleContinue}
          disabled={!canContinue}
        />
      </ButtonsOnBottom>
    </>
  )
}
