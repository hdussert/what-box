import { Image } from '@/components/ui/Image'
import { Text, View } from 'react-native'

type ItemRowProps = {
  name: string
  quantity: number
  imageUrl: string | null
}

export function ItemRow({ name, quantity, imageUrl }: ItemRowProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-xl bg-neutral-900 p-3">
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="h-12 w-12 rounded-lg bg-neutral-800"
          contentFit="cover"
        />
      ) : (
        <View className="h-12 w-12 rounded-lg bg-neutral-800" />
      )}
      <Text className="flex-1 text-base text-neutral-50">{name}</Text>
      <Text className="text-sm text-neutral-400">×{quantity}</Text>
    </View>
  )
}
