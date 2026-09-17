import { ANALYTICS_EVENTS, AnalyticsEventName } from '../constants/analytics';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Fires a typed dataLayer event for Google Tag Manager (GTM-WB4F8MS).
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  eventParams?: Record<string, unknown>
): void {
  try {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        timestamp: new Date().toISOString(),
        ...eventParams,
      });
    }
  } catch (err) {
    // Fail silently in non-browser or sandboxed environments
    console.debug('Analytics tracking error:', err);
  }
}

export { ANALYTICS_EVENTS };
