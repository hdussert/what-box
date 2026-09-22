import { Image } from 'expo-image'
import { Pressable, Text, View } from 'react-native'

type BoxCardProps = {
  name: string
  shortId: string | null
  imageUrl: string | null
  itemCount: number
  onPress: () => void
}

export function BoxCard({ name, shortId, imageUrl, itemCount, onPress }: BoxCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-xl bg-neutral-900 p-3 active:opacity-70"
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} className="h-14 w-14 rounded-lg bg-neutral-800" />
      ) : (
        <View className="h-14 w-14 items-center justify-center rounded-lg bg-neutral-800">
          <Text>📦</Text>
        </View>
      )}
      <View className="flex-1">
        <Text className="text-base font-medium text-neutral-50">{name}</Text>
        <Text className="text-sm text-neutral-400">
          {shortId ? `${shortId} · ` : ''}
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
      </View>
    </Pressable>
  )
}
