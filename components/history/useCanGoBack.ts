import { HistoryContext } from '@/components/history/HistoryProvider'
import { useContext } from 'react'

/** Whether the previous history entry is a page of this app (see HistoryProvider). */
export const useCanGoBack = () => useContext(HistoryContext)
