import type { Metadata } from "next"
export const SITE_TITLE = 'The Cycle: Frontier Items Tracker'
export const SITE_DESCRIPTION = 'The Cycle: Frontier Items Tracker is an easy way to help you keep track of all items and materials you may need in The Cycle: Frontier for easy reference and accessibility'
export const GLOBAL_OG_PROPS = {
  openGraph: {
    siteName: SITE_TITLE,
    locale: 'en_US',
    type: 'website'
  }
} satisfies Metadata