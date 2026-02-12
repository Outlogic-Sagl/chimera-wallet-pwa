// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_ARK_SERVER?: string
  readonly VITE_BOLTZ_URL?: string
  // App URLs
  readonly VITE_GIFT_CARDS_URL?: string
  readonly VITE_CARD_RESERVATION_URL?: string
  readonly VITE_STATEMENT_URL?: string
  readonly VITE_REFERRAL_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Navigator {
  standalone?: boolean
}
