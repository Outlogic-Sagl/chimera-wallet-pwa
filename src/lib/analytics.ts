// Google Analytics helper functions
// Only tracks when on app.chimerawallet.com

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const isAnalyticsEnabled = (): boolean => {
  return typeof window !== 'undefined' && 
         window.location.hostname === 'app.chimerawallet.com' && 
         typeof window.gtag === 'function'
}

export const trackPageView = (pageName: string): void => {
  if (!isAnalyticsEnabled()) return
  
  try {
    window.gtag!('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: `/${pageName}`,
    })
  } catch (err) {
    console.error('Analytics tracking error:', err)
  }
}

export const trackEvent = (
  eventName: string, 
  eventParams?: Record<string, any>
): void => {
  if (!isAnalyticsEnabled()) return
  
  try {
    window.gtag!('event', eventName, eventParams)
  } catch (err) {
    console.error('Analytics event tracking error:', err)
  }
}
