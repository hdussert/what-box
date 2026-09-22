import * as authApi from '@/api/auth'
import { SignInData } from '@what-box/shared'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type AuthState = {
  isLoading: boolean
  user: authApi.AuthUser | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<authApi.AuthUser | null>(null)

  useEffect(() => {
    authApi.getStoredUser().then((storedUser) => {
      setUser(storedUser)
      setIsLoading(false)
    })
  }, [])

  const signIn = async (data: SignInData) => {
    const signedInUser = await authApi.signIn(data)
    setUser(signedInUser)
  }

  const signOut = async () => {
    await authApi.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
