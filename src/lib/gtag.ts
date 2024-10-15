/* eslint-disable no-unused-vars */
// First, let's declare the gtag function
declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      params?: { [key: string]: unknown }
    ) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void => {
  if (window.gtag) {
    window.gtag("config", GA_TRACKING_ID!, {
      page_path: url
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
interface EventProps {
  action: string
  category: string
  label: string
  value: number
}

export const event = ({ action, category, label, value }: EventProps): void => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}
