export type SubmenuItem = {
    label: string;
    translationKey?: string;
    href: string;
    serviceKey?: string;
  };    
  
  export type HeaderItem = {
    label: string;
    href: string;
    submenu?: SubmenuItem[];
  };