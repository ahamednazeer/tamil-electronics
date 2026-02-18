import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

type MobileHeaderLinkProps = {
  item: HeaderItem;
  onNavigate?: () => void;
}

const MobileHeaderLink: React.FC<MobileHeaderLinkProps> = ({ item, onNavigate }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="relative w-full">
      <Link
        href={item.href}
        onClick={(event) => {
          if (item.submenu) {
            event.preventDefault();
            handleToggle();
            return;
          }
          onNavigate?.();
        }}
        className="flex items-center justify-between w-full rounded-xl px-3 py-3 text-lg font-semibold text-midnight_text dark:text-white hover:text-primary hover:bg-primary/10 transition-colors focus:outline-hidden"
      >
        {item.label}
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
              onClick={() => onNavigate?.()}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-midnight_text dark:text-white hover:text-primary hover:bg-primary/10 transition-colors"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
