import SignInForm from '@/app/components/auth/SignInForm'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="text-center">WhatBox</Typography.H1>
        <Typography.H2 className="mt-2 text-center">
          Sign in to your account
        </Typography.H2>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <SignInForm />
          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?&nbsp;
            <Link href="/signup" className="font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
