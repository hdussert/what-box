import { useAuth } from '@/hooks/useAuth'
import { Redirect, Stack } from 'expo-router'

export default function AppLayout() {
  const { user } = useAuth()

  if (!user) {
    return <Redirect href="/sign-in" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
