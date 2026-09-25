import Typography from '@/components/ui/typography'
import { getCurrentUser } from '@/lib/user'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function SettingsPage() {
  // Nothing here queries the data layer yet, so authenticate explicitly
  await getCurrentUser()

  return <Typography.H1>Settings</Typography.H1>
}
