import { ItemRow } from '@/components/ItemRow'
import { Image } from '@/components/ui/Image'
import { useBox } from '@/hooks/useBox'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BoxDetailScreen() {
  const { boxId } = useLocalSearchParams<{ boxId: string }>()
  const { data: box, isLoading, isError } = useBox(boxId)

  return (
    <SafeAreaView className="flex-1 bg-neutral-950" edges={['top']}>
      <Stack.Screen options={{ title: box?.name ?? 'Box', headerShown: true }} />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#fff" />
        </View>
      ) : isError || !box ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-neutral-400">Couldn&apos;t load this box.</Text>
        </View>
      ) : (
        <FlatList
          data={box.items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 8, padding: 16 }}
          ListHeaderComponent={
            <View className="mb-4 items-center gap-3">
              {box.imageUrl && (
                <Image
                  source={{ uri: box.imageUrl }}
                  className="h-32 w-32 rounded-xl bg-neutral-800"
                  contentFit="cover"
                />
              )}
              <Text className="text-2xl font-semibold text-neutral-50">{box.name}</Text>
              {box.shortId && <Text className="text-sm text-neutral-500">{box.shortId}</Text>}
            </View>
          }
          ListEmptyComponent={
            <Text className="mt-8 text-center text-neutral-500">This box is empty.</Text>
          }
          renderItem={({ item }) => (
            <ItemRow name={item.name} quantity={item.quantity} imageUrl={item.imageUrl} />
          )}
        />
      )}
    </SafeAreaView>
  )
}
