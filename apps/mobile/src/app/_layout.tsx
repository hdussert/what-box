import '@/global.css'

import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}

function RootNavigator() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-950">
        <ActivityIndicator color="#fff" />
      </View>
    )
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
