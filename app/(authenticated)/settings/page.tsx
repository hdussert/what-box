import ChangePasswordForm from '@/components/settings/ChangePasswordForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            You&apos;ll stay signed in here, and be signed out on your other
            devices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
