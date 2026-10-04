import ItemCardSkeleton from '@/components/items/ItemCardSkeleton'
import ListToolbarSkeleton from '@/components/list/ListToolbarSkeleton'

const ITEM_CARD_COUNT = 6

export default function ItemsLoading() {
  return (
    <div>
      <ListToolbarSkeleton />

      <div className="flex gap-2 flex-col py-2">
        {Array.from({ length: ITEM_CARD_COUNT }).map((_, index) => (
          <ItemCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
