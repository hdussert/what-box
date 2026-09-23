import { CONTACT_EMAIL } from '@/components/legal/const'
import Logo from '@/components/Logo'
import { SITE_TAGLINE } from '@/lib/const'
import Link from 'next/link'

const LINKS = [
  { href: '/legal', label: 'Legal notice' },
  { href: '/privacy', label: 'Privacy policy' },
]

const Footer = () => {
  return (
    <footer className="border-t text-sm text-muted-foreground">
      <div className="mx-auto max-w-5xl px-4 pt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <Logo className="text-base text-foreground" iconSize={24} />
          <p>{SITE_TAGLINE}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 sm:items-end">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-foreground">
              {label}
            </Link>
          ))}
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
            Contact
          </a>
        </nav>
      </div>

      <p className="mx-auto max-w-5xl px-4 pt-6 pb-8 text-xs">
        © {new Date().getFullYear()} WhatBox. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
