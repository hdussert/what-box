import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-2 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export default AuthLayout
