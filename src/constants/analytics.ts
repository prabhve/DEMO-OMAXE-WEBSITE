/**
 * Analytics Event Name Constants for Google Tag Manager (GTM-WB4F8MS)
 * Standardized typed event names
 */
export const ANALYTICS_EVENTS = {
  ENQUIRY_OPEN: 'enquiry_open',
  ENQUIRY_SUBMIT: 'enquiry_submit',
  BROCHURE_DOWNLOAD: 'brochure_download',
  PROJECT_VIEW: 'project_view',
  WHATSAPP_CLICK: 'whatsapp_click',
  PHONE_CLICK: 'phone_click',
  VIDEO_PLAY: 'video_play',
  FILTER_APPLIED: 'filter_applied',
  SEARCH_SUBMIT: 'search_submit',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
