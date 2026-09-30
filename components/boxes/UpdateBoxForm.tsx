'use client'

import { UpdateBoxState, updateBoxAction } from '@/actions/boxes/update-box'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Box } from '@/db/schema'
import { Check, X } from 'lucide-react'
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

      <div className="flex min-h-9 items-center gap-1">
        <Input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="min-w-0 flex-1 px-3 text-2xl leading-[normal] font-bold uppercase md:text-2xl"
          disabled={isPending}
          autoFocus
        />
        <Button
          variant="ghost"
          size="icon-sm"
          type="submit"
          aria-label="Save"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : <Check />}
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
      <FieldError>{state.errors?.name?.[0]}</FieldError>
    </form>
  )
}

export default UpdateBoxForm
