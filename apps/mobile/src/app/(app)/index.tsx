import { BoxCard } from '@/components/BoxCard'
import { useAuth } from '@/hooks/useAuth'
import { useBoxes } from '@/hooks/useBoxes'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BoxesScreen() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { data, isLoading, isError, refetch, isRefetching } = useBoxes()

  return (
    <SafeAreaView className="flex-1 bg-neutral-950" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <View>
          <Text className="text-xl font-semibold text-neutral-50">Your boxes</Text>
          {user && <Text className="text-sm text-neutral-500">{user.email}</Text>}
        </View>
        <Pressable onPress={signOut}>
          <Text className="text-sm text-neutral-400">Sign out</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#fff" />
        </View>
      ) : isError ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-neutral-400">
            Couldn&apos;t load your boxes. Pull down to try again.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data?.rows ?? []}
          keyExtractor={(box) => box.id}
          contentContainerStyle={{ gap: 8, padding: 16 }}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={
            <Text className="mt-12 text-center text-neutral-500">
              No boxes yet - create one from the web app.
            </Text>
          }
          renderItem={({ item: box }) => (
            <BoxCard
              name={box.name}
              shortId={box.shortId}
              imageUrl={box.imageUrl}
              itemCount={box.items.length}
              onPress={() => router.push({ pathname: '/boxes/[boxId]', params: { boxId: box.id } })}
            />
          )}
        />
      )}
    </SafeAreaView>
  )
}
