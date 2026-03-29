export interface LocationData {
  name: string
  slug: string
  seoTitle: string
  seoDescription: string
  distance: string
  highlights: string[]
}

export const locationsData: LocationData[] = [
  {
    name: 'Kallakurichi',
    slug: 'kallakurichi',
    seoTitle: 'Electrical Parts & Wires Distributor in Kallakurichi',
    seoDescription: 'Tamil Electricals supplies wholesale electrical goods, wires, switchgear, and plumbing to Kallakurichi. Call us for bulk competitive pricing and swift delivery.',
    distance: 'About 45 minutes from our main Virudhachalam warehouse',
    highlights: ['Wholesale Rates Available', 'Direct Contractor Supply', 'Bulk Wire Delivery', 'Agri Pump Distribution']
  },
  {
    name: 'Ulundurpet',
    slug: 'ulundurpet',
    seoTitle: 'Electrical & Plumbing Materials Shop near Ulundurpet',
    seoDescription: 'Looking for genuine electrical brands like Havells and Finolex near Ulundurpet? Tamil Electricals offers commercial and residential supplies at wholesale rates.',
    distance: 'Just 30 minutes away via NH38',
    highlights: ['Commercial Switchgear', 'Residential LED Lighting', 'PVC Plumbing Pipes', 'Same-Day Pickup']
  },
  {
    name: 'Neyveli',
    slug: 'neyveli',
    seoTitle: 'Industrial Electrical & Wire Supplier serving Neyveli',
    seoDescription: 'We provide heavy-duty electrical cables, MCBs, industrial switchgear, and plumbing materials to contractors and businesses in the Neyveli region.',
    distance: 'Approx 40 minutes driving distance',
    highlights: ['Industrial Grade Cables', 'Heavy Duty Switchgear', 'Contractor Pricing', 'Bulk Availability']
  },
  {
    name: 'Tittakudi',
    slug: 'tittakudi',
    seoTitle: 'Electrical Shop & Wires Retailer serving Tittakudi',
    seoDescription: 'Tamil Electricals is the premier supplier of high-quality electronics, fans, and wiring for residential projects spanning the Tittakudi area.',
    distance: 'Convenient 35-minute drive',
    highlights: ['Home Wiring Kits', 'Water Motors & Pumps', 'Geysers & Heaters', 'Modular Switches']
  },
  {
    name: 'Vriddhachalam',
    slug: 'vriddhachalam',
    seoTitle: 'Best Electrical Shop in Vriddhachalam | Tamil Electricals',
    seoDescription: 'Tamil Electricals is the top-rated electrical store in Vriddhachalam, offering genuine wires, fans, lighting, and plumbing with official warranty.',
    distance: 'Our Home Base (Junction Road)',
    highlights: ['Walk-in Retail', 'Immediate Stock', 'Expert Consultation', 'All Major Brands']
  }
]
