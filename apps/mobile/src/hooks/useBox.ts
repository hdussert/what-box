import { fetchBoxById } from '@/api/boxes'
import { useQuery } from '@tanstack/react-query'

export function useBox(boxId: string) {
  return useQuery({
    queryKey: ['boxes', boxId],
    queryFn: () => fetchBoxById(boxId),
  })
}
