import posthog from 'posthog-js'

/**
 * All custom PostHog event names.
 * Using a string-literal union type prevents typos and keeps the event
 * registry in sync with the codebase at compile time.
 */
export type PostHogEvent =
  | 'inquiry_form_submitted'
  | 'whatsapp_button_clicked'
  | 'header_call_clicked'
  | 'header_whatsapp_clicked'
  | 'mobile_menu_opened'
  | 'footer_phone_clicked'
  | 'footer_social_clicked'
  | 'category_card_clicked'
  | 'brand_card_clicked'
  | 'brand_whatsapp_clicked'
  | 'brand_call_clicked'
  | 'category_whatsapp_clicked'
  | 'category_call_clicked'
  | 'location_whatsapp_clicked'
  | 'location_call_clicked'
  | 'location_maps_clicked'
  | 'hero_call_clicked'
  | 'hero_whatsapp_clicked'
  | 'faq_question_toggled'
  | 'language_switched'

/**
 * Centralized event tracking wrapper.
 *
 * Benefits over raw `posthog.capture`:
 *  - Type-safe event names (compile-time errors for typos)
 *  - Automatically attaches `page_path` to every event
 *  - Single place to add consent gating, global properties, or swap
 *    providers in the future
 */
export function trackEvent(event: PostHogEvent, properties?: Record<string, unknown>) {
  posthog.capture(event, {
    ...properties,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  })
}
