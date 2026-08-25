import ForgotPasswordForm from '@/app/components/auth/ForgotPasswordForm'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="mt-2 text-center">
          Forgot password
        </Typography.H1>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <ForgotPasswordForm />
          <p className="mt-4 text-sm text-center">
            I remembered my password,&nbsp;
            <Link href="/signup" className="font-medium">
              go back
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
