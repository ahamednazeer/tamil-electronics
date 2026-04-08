export interface CategoryData {
  name: string
  slug: string
  heroImage: string
  seoTitle: string
  seoDescription: string
  keyFeatures: string[]
  brands: string[]
}

export const categoriesData: CategoryData[] = [
  {
    name: 'Electrical Wires & Cables',
    slug: 'wires-and-cables',
    heroImage: '/images/portfolio/image4.webp',
    seoTitle: 'Electrical Wires & Cables Shop in Virudhachalam | Top Brands',
    seoDescription: 'Shop high-quality, fire-resistant residential and commercial electrical wires in Virudhachalam. We stock RR Kabel, Finolex, Polycab, and Kundan Cab.',
    keyFeatures: ['Fire Resistant (FR)', 'Industrial Cables', 'House Wiring', 'Copper Wires', 'Affordable Pricing'],
    brands: ['RR Kabel', 'Finolex', 'Kundan', 'Luker', 'Norwood']
  },
  {
    name: 'Modular Switches & Sockets',
    slug: 'modular-switches',
    heroImage: '/images/portfolio/image9.webp',
    seoTitle: 'Modular Switches & Sockets Dealer in Virudhachalam',
    seoDescription: 'Upgrade your home with modern, designer modular switches and durable electrical sockets. Best prices on GM, Legrand, and Fybros in Virudhachalam.',
    keyFeatures: ['Designer Switches', 'Child Safe Sockets', 'Smart Home Integration', 'Durable Build', 'Luxury Finishes'],
    brands: ['GM', 'Legrand', 'Fybros', 'Hi-Fi']
  },
  {
    name: 'Switchgear & MCBs',
    slug: 'switchgear-and-mcbs',
    heroImage: '/images/portfolio/image3.webp',
    seoTitle: 'Switchgear, MCBs & Distribution Boards in Virudhachalam',
    seoDescription: 'Ensure safety with premium MCBs, RCCBs, and distribution boards. Buy commercial and residential switchgear components from Tamil Electricals.',
    keyFeatures: ['Short-Circuit Protection', 'Heavy Duty Distribution Boards', 'RCCB & Isolators', 'Industrial Grade', 'Official Warranty'],
    brands: ['Legrand', 'GM', 'Polycab', 'Havells']
  },
  {
    name: 'LED Lighting',
    slug: 'led-lighting',
    heroImage: '/images/portfolio/image2.webp',
    seoTitle: 'LED Lighting, Bulbs & Commercial Fixtures in Virudhachalam',
    seoDescription: 'Brighten your space with energy-efficient LED panels, tube lights, and outdoor fixtures. Visit Tamil Electricals for Philips, Surya, and Luker lighting.',
    keyFeatures: ['Energy Saving', 'Indoor & Outdoor Panels', 'Decorative Chandelier Lights', 'Street Lights', 'Long Lifespan'],
    brands: ['Philips', 'GM', 'Fybros', 'Luker', 'Sturlite', 'Surya', 'MAC 9']
  },
  {
    name: 'Ceiling Fans & Exhausts',
    slug: 'fans-and-exhausts',
    heroImage: '/images/portfolio/image5.webp',
    seoTitle: 'Ceiling Fans, BLDC & Exhaust Fans Shop in Virudhachalam',
    seoDescription: 'Buy high-speed designer ceiling fans, industrial exhausts, and energy-saving BLDC fans at Tamil Electricals in Virudhachalam.',
    keyFeatures: ['Energy Saving BLDC', 'Remote Controlled Fans', 'Silent Operation', 'Decorative Finishes', 'Heavy Duty Exhausts'],
    brands: ['Philips', 'Orient', 'Crompton', 'GM', 'V-Guard', 'CG', 'Fybros', 'Luker', 'Standard', 'Havells', 'Atomberg']
  },
  {
    name: 'PVC & Plumbing Pipes',
    slug: 'pvc-and-plumbing-pipes',
    heroImage: '/images/portfolio/image6.webp',
    seoTitle: 'PVC, CPVC & UPVC Plumbing Pipes Dealer in Virudhachalam',
    seoDescription: 'Buy highly durable, leak-proof electrical conduits and agricultural plumbing pipes from Ashirvad and Supreme at Tamil Electricals.',
    keyFeatures: ['Corrosion Free CPVC', 'Underground Wiring PVC', 'Agriculture Pipes', 'Leak-Proof Joints', 'High Pressure Rating'],
    brands: ['Ashirvad', 'Aquatech', 'Finolex']
  },
  {
    name: 'Water Pumps & Motors',
    slug: 'water-pumps-and-motors',
    heroImage: '/images/portfolio/image8.webp',
    seoTitle: 'Water Motors & Agricultural Borewell Pumps in Virudhachalam',
    seoDescription: 'Get robust agricultural borewell motors, domestic water pumps, and pressure boosters. Authorized dealer for Crompton, Suguna, and V-Guard.',
    keyFeatures: ['Heavy Duty Borewell', 'Domestic Monoblock', 'Submersible Pumps', 'Low Voltage Start', 'High Efficiency'],
    brands: ['V-Guard', 'Crompton', 'Suguna']
  },
  {
    name: 'Water Heaters & Geysers',
    slug: 'water-heaters-and-geysers',
    heroImage: '/images/portfolio/image7.webp',
    seoTitle: 'Water Heaters & Instant Geysers Shop in Virudhachalam',
    seoDescription: 'Stay warm with premium storage geysers and instant water heaters from V-Guard and Venus, available at wholesale local pricing.',
    keyFeatures: ['Instant Heating', 'Energy Efficient Storage', 'Hard Water Protection', 'Shock-Proof Body', 'Extended Warranty'],
    brands: ['V-Guard', 'Venus', 'Standard']
  }
]
