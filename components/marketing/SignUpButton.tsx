import { buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'

type SignUpButtonProps = Pick<VariantProps<typeof buttonVariants>, 'size'>

/** Link to the sign-up page, styled as the primary button. */
const SignUpButton = ({ size }: SignUpButtonProps) => (
  <Link href="/sign-up" className={buttonVariants({ size })}>
    Sign Up
  </Link>
)

export default SignUpButton
