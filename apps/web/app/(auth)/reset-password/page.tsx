import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import Link from 'next/link'
import { Suspense } from 'react'

export default function ResetPasswordPage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="mt-2 text-center">
          Reset password
        </Typography.H1>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
          <p className="mt-4 text-sm text-center">
            Remember your password?&nbsp;
            <Link href="/sign-up" className="font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
