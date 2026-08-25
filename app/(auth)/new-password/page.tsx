import NewPasswordForm from '@/app/components/auth/NewPasswordForm'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import Link from 'next/link'
import { Suspense } from 'react'

export default function NewPasswordPage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="mt-2 text-center">New Password</Typography.H1>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <Suspense>
            <NewPasswordForm />
          </Suspense>
          <p className="mt-4 text-sm text-center">
            Remember your password?&nbsp;
            <Link href="/signup" className="font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
