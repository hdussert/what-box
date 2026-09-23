import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-full flex border-b-2 px-4 py-2 sticky top-0 bg-background ">
      <Logo />
      <div className="ml-auto flex gap-4">
        <Button asChild variant="outline">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
