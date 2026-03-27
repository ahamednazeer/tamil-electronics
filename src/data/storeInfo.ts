export type StoreHour = {
  day: number
  opens: string
  closes: string
}

export const storeInfo = {
  name: 'Tamil Electricals',
  description: 'Electrical & Electronics Shop in Virudhachalam',
  phoneDisplay: '+91 93638 97989',
  phoneE164: '+919363897989',
  whatsappNumber: '919363897989',
  address: {
    streetAddress: '805/A, Junction Road',
    addressLocality: 'Virudhachalam',
    addressRegion: 'Tamil Nadu',
    postalCode: '606001',
    addressCountry: 'IN',
  },
  timezone: 'Asia/Kolkata',
  hours: [
    { day: 1, opens: '08:30', closes: '20:30' },
    { day: 2, opens: '08:30', closes: '20:30' },
    { day: 3, opens: '08:30', closes: '20:30' },
    { day: 4, opens: '08:30', closes: '20:30' },
    { day: 5, opens: '08:30', closes: '20:30' },
    { day: 6, opens: '08:30', closes: '20:30' },
    { day: 0, opens: '09:00', closes: '20:30' },
  ] as StoreHour[],
  closedDays: [] as number[],
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Tamil%20Electricals%20Virudhachalam',
}

export const dayLabels = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const
