import SignInForm from '@/components/auth/SignInForm'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import { safeRedirectPath } from '@/lib/utils'
import Link from 'next/link'

type SignInPageProps = {
  searchParams: Promise<{ next?: string | string[] }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { next } = await searchParams
  const redirectTo = safeRedirectPath(next)

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="mt-2 text-center">Sign in</Typography.H1>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <SignInForm redirectTo={redirectTo} />
          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?&nbsp;
            <Link href="/sign-up" className="font-medium">
              Sign up
            </Link>
          </p>
          <p className="text-sm mt-4 text-center">
            Forgot password?&nbsp;
            <Link href="/forgot-password" className="font-medium">
              Click here
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
