import { getBoxes } from '@/lib/box'
import { getCurrentUser } from '@/lib/user'

const BoxesList = async () => {
  const user = await getCurrentUser()
  const boxes = await getBoxes(user.id)
  return (
    <div>
      {boxes.map((box) => (
        <div key={box.id}>
          <div>{box.name}</div>
          <div key={box.id}>{box.items.join(', ')}</div>
        </div>
      ))}
    </div>
  )
}

export default BoxesList
