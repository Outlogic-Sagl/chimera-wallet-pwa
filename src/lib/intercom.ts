import Intercom, { show, showMessages, hide, shutdown, update } from '@intercom/messenger-js-sdk'

export interface IntercomConfig {
  app_id: string,
  hide_default_launcher: boolean
}

export const getIntercomConfig = (): IntercomConfig => {
  return {
    app_id: 'a7pgvcoj',
    hide_default_launcher: true
  }
}

export const initializeIntercom = (): void => {
  const config = getIntercomConfig()
  
  if (!config.app_id) {
    console.warn('Intercom app_id is not configured')
    return
  }

  Intercom(config)
}

export const showIntercom = (): void => {
  showMessages()
}

export const hideIntercom = (): void => {
  hide()
}

export const shutdownIntercom = (): void => {
  shutdown()
}

export const updateIntercomUser = (user: { name?: string; email?: string; user_id?: string }): void => {
  update(user)
}
