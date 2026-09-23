import SignUpForm from '@/components/auth/SignUpForm'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Create a free WhatBox account: list what is in your boxes, add photos and print QR labels.',
  alternates: { canonical: '/sign-up' },
}

export default function SignUpPage() {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Typography.H1 className="text-center">Sign up</Typography.H1>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <CardContent>
          <SignUpForm />
          <p className="text-sm mt-4 text-center">
            Already have an account?&nbsp;
            <Link href="/sign-in" className="font-medium">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  )
}
