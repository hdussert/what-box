'use client'

import { UpdateBoxState, updateBoxAction } from '@/actions/boxes/update-box'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Box } from '@/db/schema'
import { Check, LoaderCircle, X } from 'lucide-react'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

type UpdateBoxFormProps = {
  box: Pick<Box, 'id' | 'name'>
  onCancel: () => void
  onSuccess: () => void
}

const UpdateBoxForm = ({ box, onCancel, onSuccess }: UpdateBoxFormProps) => {
  const initialState: UpdateBoxState = {
    success: false,
    message: '',
    errors: undefined,
    values: {
      id: box.id,
      name: box.name,
    },
  }

  const [name, setName] = useState(box.name)

  const [state, formAction, isPending] = useActionState(
    updateBoxAction,
    initialState,
  )

  useEffect(() => {
    if (!state.message) {
      return
    }

    if (state.success) {
      toast.success(state.message)
      onSuccess()
    } else {
      toast.error(state.message)
    }
  }, [state, onSuccess])

  return (
    <form action={formAction} className="flex flex-col gap-1">
      <input type="hidden" name="id" value={box.id} />

      <div className="flex min-h-9 items-center justify-center px-12">
        <div className="relative min-w-24 max-w-full">
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" w-auto min-w-24 max-w-full px-3 text-center text-2xl leading-[normal] font-bold uppercase md:text-2xl"
            disabled={isPending}
            autoFocus
          />
          <div className="absolute top-1/2 left-full ml-1 flex -translate-y-1/2 gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              type="submit"
              aria-label="Save"
              disabled={isPending}
            >
              {isPending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Check />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              aria-label="Cancel"
              onClick={onCancel}
              disabled={isPending}
            >
              <X />
            </Button>
          </div>
        </div>
      </div>
      <FieldError className="text-center">{state.errors?.name?.[0]}</FieldError>
    </form>
  )
}

export default UpdateBoxForm
