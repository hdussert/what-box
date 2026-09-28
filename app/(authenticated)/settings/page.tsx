import ChangePasswordForm from '@/components/settings/ChangePasswordForm'
import DeleteAccountButton from '@/components/settings/DeleteAccountButton'
import Typography from '@/components/ui/typography'
import { getCurrentUser } from '@/lib/user'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function SettingsPage() {
  // The page itself queries nothing yet, so authenticate explicitly
  await getCurrentUser()

  return (
    <div className="flex flex-col gap-6">
      <Typography.H1>Settings</Typography.H1>
      <section className="flex max-w-sm flex-col gap-4">
        <div>
          <Typography.H2>Password</Typography.H2>
          <Typography.P className="mt-2 text-sm">
            You&apos;ll stay signed in here, and be signed out on your other
            devices.
          </Typography.P>
        </div>
        <ChangePasswordForm />
      </section>
      <section className="flex max-w-sm flex-col gap-4">
        <div>
          <Typography.H2>Delete account</Typography.H2>
          <Typography.P className="mt-2 text-sm">
            Deletes your boxes, items and photos for good.
          </Typography.P>
        </div>
        <DeleteAccountButton />
      </section>
    </div>
  )
}
