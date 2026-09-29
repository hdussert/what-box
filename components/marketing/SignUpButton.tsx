import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ComponentProps } from 'react'

type SignUpButtonProps = Pick<ComponentProps<typeof Button>, 'size'>

/** Link to the sign-up page, styled as the primary button. */
const SignUpButton = ({ size }: SignUpButtonProps) => (
  <Button render={<Link href="/sign-up" />} nativeButton={false} size={size}>
    Sign Up
  </Button>
)

export default SignUpButton
