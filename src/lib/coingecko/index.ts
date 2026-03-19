// CoinGecko API Integration
export { default as CoinGeckoApi } from './api'
export type { CoinGeckoAssetID, CoinGeckoPriceData, CoinGeckoHistoricalData, CoinGeckoMarketData } from './api'

export { CoinGeckoConversionService } from './service'
export type { ConversionRateResult, BulkConversionOptions } from './service'

export { coingeckoCache } from './cache'

export {
  ASSET_COINGECKO_MAPPING,
  SYMBOL_TO_MAPPING_MAP,
  getCoingeckoIdForSymbol,
  getAssetMapping,
  getUniqueCoingeckoIds,
  requiresSpecialHandling,
  getSupportedSymbols,
} from './mapping'
export type { AssetMapping } from './mapping'
