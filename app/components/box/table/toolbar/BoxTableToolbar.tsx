'use client'

import BoxTableDeleteButton from '@/app/components/box/table/toolbar/BoxTableDeleteButton'
import BoxTablePrintButton from '@/app/components/box/table/toolbar/BoxTablePrintButton'
import BoxTableSearchInput from './BoxTableSearchInput'

const BoxTableToolbar = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <BoxTableSearchInput />
      <div className="flex gap-2">
        <BoxTablePrintButton />
        <BoxTableDeleteButton />
      </div>
    </div>
  )
}

export default BoxTableToolbar
