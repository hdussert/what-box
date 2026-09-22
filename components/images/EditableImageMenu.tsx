'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IMAGE_MIME_TYPES } from '@/lib/image/const'
import { EllipsisVertical } from 'lucide-react'
import { useRef } from 'react'

type EditableImageMenuProps = {
  disabled?: boolean
  onReplace: (image: File) => void
  onDelete: () => void
}

/** The "..." menu shown over an already-uploaded image, to replace or remove it. */
const EditableImageMenu = ({
  disabled,
  onReplace,
  onDelete,
}: EditableImageMenuProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleReplace = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) {
      return
    }
    onReplace(file)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_MIME_TYPES.join(',')}
        onChange={handleReplace}
        className="sr-only"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            className="absolute top-0 right-0 rounded-tl-none rounded-br-none"
            disabled={disabled}
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => inputRef.current?.click()}>
            Replace this image
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={onDelete}>
            Remove this image
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default EditableImageMenu
