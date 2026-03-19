// Fiat currency configuration - single source of truth

export interface FiatConfig {
  symbol: string
  name: string
  precision: number
}

export const FIATS = {
  CHF: {
    symbol: 'CHF',
    name: 'Swiss Franc',
    precision: 2,
  },
  EUR: {
    symbol: 'EUR',
    name: 'Euro',
    precision: 2,
  },
  USD: {
    symbol: 'USD',
    name: 'US Dollar',
    precision: 2,
  },
} as const

export type FiatSymbol = keyof typeof FIATS

export const FIAT_LIST: FiatConfig[] = Object.values(FIATS)

export const getFiatConfig = (symbol: string): FiatConfig | undefined => {
  return FIATS[symbol.toUpperCase() as FiatSymbol]
}

// Static fiat exchange rates (for fiat-to-fiat conversions)
// In a real app, these would come from an exchange rate API
export const FIAT_EXCHANGE_RATES: Record<FiatSymbol, Record<FiatSymbol, number>> = {
  CHF: {
    CHF: 1.0,
    EUR: 0.92,
    USD: 1.1,
  },
  EUR: {
    CHF: 1.09,
    EUR: 1.0,
    USD: 1.08,
  },
  USD: {
    CHF: 0.91,
    EUR: 0.93,
    USD: 1.0,
  },
}
