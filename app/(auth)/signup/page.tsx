import SignUpForm from '@/app/components/auth/SignUpForm'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="text-center">WhatBox</Typography.H1>
        <Typography.H2 className="mt-2 text-center">
          Create a new account
        </Typography.H2>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <SignUpForm />
          <p className="text-sm mt-4 text-center">
            Already have an account?&nbsp;
            <Link href="/signin" className="font-medium">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
