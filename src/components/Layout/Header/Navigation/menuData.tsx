import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/#main-banner" },
  { label: "Products", href: "/#products" },
  { 
    label: "Electrical", 
    href: "/#products",
    submenu: [
      { label: "Wiring & Cables", translationKey: "wiring_cables", href: "/#products?category=wiring-cables", serviceKey: "wiring" },
      { label: "Switch & Sockets", translationKey: "switch_sockets", href: "/#products?category=switch-sockets", serviceKey: "switches" },
      { label: "Switch Gear", translationKey: "switch_gear", href: "/#products?category=switch-gear", serviceKey: "switchgear" },
      { label: "Lighting System", translationKey: "lighting_system", href: "/#products?category=lighting-system", serviceKey: "lights" },
      { label: "Electrical Conduits & Fittings", translationKey: "conduits_fittings", href: "/#products?category=conduits-fittings", serviceKey: "conduits" }
    ]
  },
  { 
    label: "Plumbing", 
    href: "/#products",
    submenu: [
      { label: "Pipe & Fittings", translationKey: "pipe_fittings", href: "/#products?category=pipe-fittings", serviceKey: "pipes" },
      { label: "Bathroom Tap & Fittings", translationKey: "bathroom_fittings", href: "/#products?category=bathroom-tap-fittings", serviceKey: "fittings" },
      { label: "Water Tanks", translationKey: "water_tanks", href: "/#products?category=water-tanks", serviceKey: "tanks" }
    ]
  },
  {
    label: "Pumps",
    href: "/#products?category=pumps",
    serviceKey: "pumps"
  },
  { 
    label: "Appliances", 
    href: "/#products",
    submenu: [
      { label: "Fan", translationKey: "fan", href: "/#products?category=fan", serviceKey: "fans" },
      { label: "BLDC Fan", translationKey: "bldc_fan", href: "/#products?category=bldc-fan", serviceKey: "bldc" },
      { label: "Stabilizers", translationKey: "stabilizers", href: "/#products?category=stabilizers", serviceKey: "stabilizers" },
      { label: "Air Cooler", translationKey: "air_cooler", href: "/#products?category=air-cooler", serviceKey: "cooler" },
      { label: "Water Heater", translationKey: "water_heater", href: "/#products?category=water-heater", serviceKey: "heater" }
    ]
  },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
