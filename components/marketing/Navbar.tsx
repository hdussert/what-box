import Logo from '@/components/Logo'
import SignUpButton from '@/components/marketing/SignUpButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 flex w-full border-b-2 bg-background/40 px-4 py-2 backdrop-blur-xl">
      <Logo />
      <div className="ml-auto flex gap-4">
        <Button asChild variant="outline">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <SignUpButton />
      </div>
    </nav>
  )
}

export default Navbar
