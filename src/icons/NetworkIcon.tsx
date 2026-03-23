import type { TransferMethod } from '../lib/transferMethods'

interface NetworkIconProps {
  network: TransferMethod
  size?: number
}

const iconPaths: Record<TransferMethod, string> = {
  ark: '/images/network_icons/ark.svg',
  lightning: '/images/network_icons/Lightning.svg',
  bitcoin: '/images/network_icons/native.svg',
  bank: '/images/network_icons/bank.svg',
}

export default function NetworkIcon({ network, size = 24 }: NetworkIconProps) {
  const iconPath = iconPaths[network] || iconPaths.bitcoin

  return (
    <img
      src={iconPath}
      alt={`${network} icon`}
      width={size}
      height={size}
      style={{
        display: 'block',
      }}
    />
  )
}
