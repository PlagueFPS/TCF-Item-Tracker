import type { Metadata } from "next"

export const DELETE_ERROR_MESSAGE = 'Unable To Delete List If Currently Selected; Please Switch Lists First'
export const CREATE_ERROR_MESSAGE = 'A List With That Name Already Exists'
export const SITE_TITLE = 'The Cycle: Frontier Items Tracker'
export const SITE_DESCRIPTION = 'The Cycle: Frontier Items Tracker is an easy way to help you keep track of all items and materials you may need in The Cycle: Frontier for easy reference and accessibility'
export const GLOBAL_OG_PROPS = {
  openGraph: {
    siteName: SITE_TITLE,
    locale: 'en_US',
    type: 'website'
  }
} satisfies Metadata