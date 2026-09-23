import { CONTACT_EMAIL, LEGAL_LAST_UPDATED } from '@/components/legal/const'
import Typography from '@/components/ui/typography'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy policy - WhatBox',
}

const SUBPROCESSORS = [
  {
    name: 'Vercel Inc.',
    role: 'Hosting and photo storage (Vercel Blob)',
    location: 'United States',
  },
  {
    name: 'Neon Inc.',
    role: 'Database',
    location: 'European Union (Frankfurt, Germany)',
  },
  {
    name: 'Resend Inc.',
    role: 'Sending password-reset emails',
    location: 'United States',
  },
]

// GDPR information notice. Keep it in sync with what the app actually
// collects, the services it uses and the cookies it sets.
export default function PrivacyPolicyPage() {
  const email = (
    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
      {CONTACT_EMAIL}
    </a>
  )

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Typography.H1>Privacy policy</Typography.H1>
        <Typography.P className="text-sm">
          Last updated: {LEGAL_LAST_UPDATED}
        </Typography.P>
      </div>

      <section className="flex flex-col gap-2">
        <Typography.H2>Data controller</Typography.H2>
        <Typography.P>
          The publisher of WhatBox, a private individual (see the legal notice),
          is responsible for processing your personal data. Contact: {email}.
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Data we collect</Typography.H2>
        <ul className="list-disc pl-6 flex flex-col gap-1 text-muted-foreground">
          <li>Your email address.</li>
          <li>
            Your password, stored only as a secure hash: we can never read it.
          </li>
          <li>The content you add: box names, items, quantities and photos.</li>
          <li>
            Security data: failed sign-in attempts, temporary account locks and
            the time of your last password-reset request.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Why we use it</Typography.H2>
        <Typography.P>
          We use this data only to provide the service: creating and securing
          your account, storing and displaying your boxes and items, and sending
          password-reset emails you request. The legal basis is the performance
          of the service you signed up for (GDPR, art. 6(1)(b)) and, for
          security data, our legitimate interest in protecting accounts (art.
          6(1)(f)). We don&apos;t sell your data, use it for advertising, or
          track you.
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>How long we keep it</Typography.H2>
        <Typography.P>
          Your account data and content are kept for as long as your account
          exists, and deleted when the account is deleted. Password-reset links
          expire after one hour.
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Service providers</Typography.H2>
        <Typography.P>
          Your data is processed by the following providers, only as needed to
          run the service:
        </Typography.P>
        <ul className="list-disc pl-6 flex flex-col gap-1 text-muted-foreground">
          {SUBPROCESSORS.map(({ name, role, location }) => (
            <li key={name}>
              <span className="text-foreground">{name}</span>: {role} (
              {location})
            </li>
          ))}
        </ul>
        <Typography.P>
          Transfers to the United States rely on the EU-U.S. Data Privacy
          Framework or the European Commission&apos;s standard contractual
          clauses.
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Cookies</Typography.H2>
        <Typography.P>
          WhatBox only sets cookies that are strictly necessary, so they
          don&apos;t require your consent:
        </Typography.P>
        <ul className="list-disc pl-6 flex flex-col gap-1 text-muted-foreground">
          <li>
            <span className="text-foreground">auth_token</span>: keeps you
            signed in (up to 30 days).
          </li>
          <li>
            <span className="text-foreground">sidebar_state</span>: remembers
            whether you collapsed the sidebar.
          </li>
        </ul>
        <Typography.P>
          No analytics or advertising cookies are used.
        </Typography.P>
      </section>

      <section className="flex flex-col gap-2">
        <Typography.H2>Your rights</Typography.H2>
        <Typography.P>
          You can access, correct, export or delete your data, and object to or
          restrict its processing. To exercise these rights, including deleting
          your account, write to {email}. We answer within one month.
        </Typography.P>
        <Typography.P>
          If you think your rights aren&apos;t respected, you can file a
          complaint with the CNIL, the French data protection authority (
          <a href="https://www.cnil.fr" className="underline">
            cnil.fr
          </a>
          ).
        </Typography.P>
      </section>
    </main>
  )
}
