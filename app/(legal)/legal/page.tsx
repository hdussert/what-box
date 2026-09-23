import { CONTACT_EMAIL, LEGAL_LAST_UPDATED } from '@/components/legal/const'
import Typography from '@/components/ui/typography'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legal notice',
  description: 'Legal notice for WhatBox: publisher, host and contact.',
  alternates: { canonical: '/legal' },
}

// Required by French law (LCEN, art. 6). The publisher is a private
// individual who stays anonymous, as art. 6-III-2 allows: their identity is
// held by the host.
export default function LegalNoticePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Typography.H1>Legal notice</Typography.H1>
        <Typography.P className="text-sm">
          Last updated: {LEGAL_LAST_UPDATED}
        </Typography.P>
      </div>

      <section className="flex flex-col gap-2">
        <Typography.H2>Publisher</Typography.H2>
        <Typography.P>
          WhatBox is a non-commercial website published by a private individual.
          In accordance with article 6-III-2 of French law no. 2004-575 of June
          21, 2004 (LCEN), the publisher has chosen to remain anonymous and has
          provided their identification details to the host below.
        </Typography.P>
        <Typography.P>
          Contact:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Publication director</Typography.H2>
        <Typography.P>
          The publisher, reachable at the contact address above.
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Host</Typography.H2>
        <Typography.P>
          Vercel Inc.
          <br />
          440 N Barranca Ave #4133, Covina, CA 91723, United States
          <br />
          Phone: +1 (559) 288-7060
          <br />
          <a href="https://vercel.com" className="underline">
            vercel.com
          </a>
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Intellectual property</Typography.H2>
        <Typography.P>
          The WhatBox name, design and code are the property of the publisher.
          Content you add to your account (box names, items, photos) remains
          yours.
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Personal data</Typography.H2>
        <Typography.P>
          How your data is handled is described in the{' '}
          <Link href="/privacy" className="underline">
            privacy policy
          </Link>
          .
        </Typography.P>
      </section>
    </main>
  )
}
