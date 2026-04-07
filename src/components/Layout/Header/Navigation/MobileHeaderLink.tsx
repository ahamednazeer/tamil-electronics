import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { useLanguage } from '@/context/LanguageContext';

type MobileHeaderLinkProps = {
  item: HeaderItem;
  onNavigate?: () => void;
}

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, onNavigate }) => {
  const { t } = useLanguage();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        data-service-link={item.serviceKey ? true : undefined}
        onClick={(event) => {
          if (item.submenu) {
            event.preventDefault();
            handleToggle();
            return;
          }
          if (item.serviceKey && typeof window !== 'undefined') {
            event.preventDefault();
            window.dispatchEvent(
              new CustomEvent('service-filter', { detail: { service: item.serviceKey, source: 'menu' } })
            );
          }
          onNavigate?.();
        }}
        className="flex items-center justify-between w-full rounded-xl px-3 py-3 text-lg font-semibold text-midnight_text dark:text-white hover:text-primary hover:bg-primary/10 transition-colors focus:outline-hidden"
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {t(`menu.${item.label.toLowerCase()}` as any)}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className="mt-2 rounded-xl border p-2 w-full border-[var(--theme-border)] bg-[var(--theme-bg-secondary)]">
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              data-service-link
              onClick={(e) => {
                // Prevent default anchor jump to allow clean smooth scroll to brands
                e.preventDefault();
                
                // Dispatch the same service-filter event that desktop uses
                if (subItem.serviceKey && typeof window !== 'undefined') {
                  window.dispatchEvent(
                    new CustomEvent('service-filter', { detail: { service: subItem.serviceKey, source: 'menu' } })
                  );
                }
                onNavigate?.();
              }}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-midnight_text dark:text-white hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {subItem.translationKey ? (t(`menu.submenus.${subItem.translationKey}` as any) as string) : subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
