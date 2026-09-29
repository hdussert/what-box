import Logo from '@/components/Logo'
import SignUpButton from '@/components/marketing/SignUpButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex w-full items-center border-b-2 bg-background/40 px-2 md:px-4 py-2 backdrop-blur-xl">
      <Logo />
      <div className="ml-auto flex gap-2 md:gap-4">
        <Button
          render={<Link href="/sign-in" />}
          nativeButton={false}
          variant="outline"
        >
          Sign In
        </Button>
        <SignUpButton />
      </div>
    </nav>
  )
}

export default Navbar
