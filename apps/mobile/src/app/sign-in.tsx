import { useAuth } from '@/hooks/useAuth'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'

export default function SignInScreen() {
  const { user, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (user) {
    return <Redirect href="/" />
  }

  const handleSubmit = async () => {
    setError(null)
    setIsSubmitting(true)
    try {
      await signIn({ email, password })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 justify-center bg-neutral-950 px-6"
    >
      <Text className="mb-8 text-center text-2xl font-semibold text-neutral-50">WhatBox</Text>

      <View className="gap-3">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#737373"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          className="rounded-lg bg-neutral-900 px-4 py-3 text-neutral-50"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#737373"
          secureTextEntry
          autoComplete="password"
          className="rounded-lg bg-neutral-900 px-4 py-3 text-neutral-50"
        />

        {error && <Text className="text-sm text-red-400">{error}</Text>}

        <Pressable
          onPress={handleSubmit}
          disabled={isSubmitting}
          className="mt-2 items-center rounded-lg bg-neutral-50 py-3 active:opacity-70 disabled:opacity-50"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text className="font-medium text-neutral-950">Sign in</Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}
