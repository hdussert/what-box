import { fetchBoxes } from '@/api/boxes'
import { useQuery } from '@tanstack/react-query'

export function useBoxes(search?: string) {
  return useQuery({
    queryKey: ['boxes', search ?? ''],
    queryFn: () => fetchBoxes(search),
  })
}
