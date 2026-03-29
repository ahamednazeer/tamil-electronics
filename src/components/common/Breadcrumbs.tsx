import Link from 'next/link'
import { Icon } from '@iconify/react'

type Crumb = { label: string; href: string }

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `https://tamilelectricals.com${crumb.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm font-medium text-muted/80 mb-4 sm:mb-6">
        <ol className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1">
          {crumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center whitespace-nowrap">
              {i > 0 && <Icon icon="mdi:chevron-right" className="mx-1 sm:mx-2 text-muted/50 w-4 h-4 shrink-0" />}
              {i === crumbs.length - 1 ? (
                <span className="text-theme font-semibold" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
