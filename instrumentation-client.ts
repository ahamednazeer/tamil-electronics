import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: '/ingest',
  ui_host: 'https://us.posthog.com',
  defaults: '2026-01-30',
  capture_exceptions: true,
  person_profiles: 'identified_only',
  disable_session_recording: process.env.NEXT_PUBLIC_POSTHOG_SESSION_RECORDING !== 'true',
  debug: process.env.NODE_ENV === 'development',
})
