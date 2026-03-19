import AssetIcon from '../icons/AssetIcon'
import PriceChart from './PriceChart'
import { getAssetConfig, type AssetSymbol } from '../lib/assets'

interface AssetBalanceViewProps {
  symbol: AssetSymbol | string
  balance: number
  onBack: () => void
}

export default function AssetBalanceView({ symbol, balance, onBack }: AssetBalanceViewProps) {
  const config = getAssetConfig(symbol)
  const assetName = config?.name || symbol
  const precision = config?.precision || 8

  // Format balance using asset's configured precision
  const formatBalance = (value: number): string => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: precision,
    })
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--white70)',
          fontSize: 14,
          cursor: 'pointer',
          padding: '8px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        ← All assets
      </button>

      {/* Asset Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <AssetIcon symbol={symbol} size={48} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, color: 'white' }}>{assetName}</div>
          <div style={{ fontSize: 14, color: 'var(--white50)' }}>{symbol}</div>
        </div>
      </div>

      {/* Balance */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: 'white',
            fontFamily: 'monospace',
          }}
        >
          {formatBalance(balance)} {symbol}
        </div>
      </div>

      {/* Price Chart */}
      <PriceChart symbol={symbol} vsCurrency="usd" />
    </div>
  )
}
