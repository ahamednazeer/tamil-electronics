"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";
import { useLanguage } from '@/context/LanguageContext';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const { t, language } = useLanguage();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const path = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (item.submenu) {
      timeoutRef.current = setTimeout(() => {
        setSubmenuOpen(false);
      }, 150); // 150ms delay for diagonal cursor movement (UX improvement)
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`flex items-center font-medium hover:text-primary whitespace-nowrap capitalized ${
          language === 'ta' ? 'text-[14px] 2xl:text-[15.5px]' : 'text-[15.5px]'
        } ${path === item.href ? "text-primary " : " text-muted "}`}
      >
        <span className="relative pb-1">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {t(`menu.${item.label.toLowerCase()}` as any)}
          <span
            className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
              path === item.href ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </span>
      </Link>
      
      {item.submenu && (
        <div
          className={`absolute left-0 top-full pt-3 z-50 transition-all duration-200 ease-out origin-top-left ${
            submenuOpen 
              ? "opacity-100 visible scale-100 translate-y-0" 
              : "opacity-0 invisible scale-[0.97] -translate-y-1 pointer-events-none"
          }`}
        >
          {/* Invisible hit-area expansion to cover the gap */}
          <div className="absolute inset-0 -top-3 h-full w-full -z-10 bg-transparent" />
          
          <div className="surface-card w-[230px] p-1.5 flex flex-col gap-0.5">
            {item.submenu.map((subItem, index) => {
              const isActive = path === subItem.href; 
              
              const handleSubItemHover = () => {
                if (subItem.serviceKey && typeof window !== 'undefined') {
                  window.dispatchEvent(
                    new CustomEvent('service-filter', { detail: { service: subItem.serviceKey, source: 'hover' } })
                  );
                }
              };

              return (
                <Link
                  key={index}
                  href={subItem.href}
                  onMouseEnter={handleSubItemHover}
                  className={`group/link relative flex items-center justify-between px-3 py-2.5 rounded-[10px] transition-all duration-200 overflow-hidden ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted hover:bg-black/5 dark:hover:bg-white/10 hover:text-midnight_text dark:hover:text-white"
                  }`}
                  onClick={() => setSubmenuOpen(false)}
                >
                  <span className="text-[14px] font-medium transition-transform duration-200 group-hover/link:translate-x-1">
                    {subItem.translationKey ? (t(`menu.submenus.${subItem.translationKey}` as any) as string) : subItem.label}
                  </span>
                  
                  {/* Subtle hover chevron indicator */}
                  <svg 
                    className={`w-4 h-4 transition-all duration-250 opacity-0 -translate-x-2 group-hover/link:opacity-50 group-hover/link:translate-x-0 ${isActive ? 'text-primary' : 'currentColor'}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
