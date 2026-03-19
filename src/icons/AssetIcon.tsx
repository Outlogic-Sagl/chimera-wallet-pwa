import { AssetSymbol, getAssetColor } from '../lib/assets'

interface AssetIconProps {
  symbol: AssetSymbol | string
  size?: number
}

// Bitcoin icon path
const BTCPath = () => (
  <path
    fill="white"
    d="M12.5 2.5v1.25h-1.25V2.5h-2.5v1.25H7.5V2.5H5v2.5h1.25v10H5v2.5h2.5v1.25h1.25V17.5h2.5v1.25h1.25V17.5h.625c2.07 0 3.75-1.68 3.75-3.75 0-1.38-.75-2.59-1.86-3.25.69-.66 1.11-1.58 1.11-2.6 0-2.07-1.68-3.75-3.75-3.75H12.5V2.5h-2.5v1.65H12.5V2.5zm-3.75 3.75h4.375c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25H8.75V6.25zm0 5h5c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25h-5v-2.5z"
  />
)

// Ethereum icon path
const ETHPath = () => (
  <path
    fill="white"
    d="M12 2L5 12l7 4 7-4-7-10zm0 14l-7-4 7 10 7-10-7 4z"
  />
)

// Tether icon path
const USDTPath = () => (
  <>
    <path
      fill="white"
      d="M12 14c3.31 0 6-1.12 6-2.5V10c0 1.38-2.69 2.5-6 2.5S6 11.38 6 10v1.5c0 1.38 2.69 2.5 6 2.5z"
    />
    <path
      fill="white"
      d="M12 12c3.31 0 6-1.12 6-2.5S15.31 7 12 7 6 8.12 6 9.5 8.69 12 12 12zM6 5h12v2H6z"
    />
  </>
)

// TRON icon path
const TRXPath = () => (
  <path
    fill="white"
    d="M12 2L3 9l3 10h12l3-10-9-7zm0 2.5L17.5 9l-2 6.5h-7L6.5 9 12 4.5z"
  />
)

// Polygon/MATIC icon path
const MATICPath = () => (
  <path
    fill="white"
    d="M16.5 8.25L12 5.5 7.5 8.25v5.5l4.5 2.75 4.5-2.75v-5.5zM12 3l7 4.25v7.5L12 19l-7-4.25v-7.5L12 3z"
  />
)

const iconPaths: Record<string, () => JSX.Element> = {
  BTC: BTCPath,
  USDT: USDTPath,
  ETH: ETHPath,
  TRX: TRXPath,
  MATIC: MATICPath,
}

export default function AssetIcon({ symbol, size = 44 }: AssetIconProps) {
  const colorVar = getAssetColor(symbol)
  const IconPath = iconPaths[symbol.toUpperCase()] || BTCPath
  const iconSize = size * 0.55 // Icon is ~55% of the circle size

  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: '50%',
        backgroundColor: `var(--${colorVar})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <IconPath />
      </svg>
    </div>
  )
}
