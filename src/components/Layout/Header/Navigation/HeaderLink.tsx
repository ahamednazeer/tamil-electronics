"use client";
import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";
import { usePathname } from "next/navigation";
import { useLanguage } from '@/context/LanguageContext';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const { t } = useLanguage();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();
  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };
  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`text-[15.5px] flex font-medium hover:text-primary whitespace-nowrap capitalized ${
          path === item.href ? "text-primary " : " text-muted "
        }`}
      >
        <span className="relative">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {t(`menu.${item.label.toLowerCase()}` as any)}
          <span
            className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
              path === item.href ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </span>
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
      {submenuOpen && (
        <div
          className={`surface-card absolute left-0 mt-0.5 w-60 py-2 shadow-lg`}
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block px-4 py-2   ${
                path === subItem.href
                  ? "bg-primary text-white"
                  : "text-theme hover:bg-primary hover:text-white"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
