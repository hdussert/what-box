import { UpdateItemState, updateItemAction } from '@/actions/items/update-item'
import ToolbarButton from '@/components/ToolbarButton'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Item } from '@/db/schema'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

type UpdateItemFormProps = {
  item: Item
  onCancel: () => void
  onSuccess: () => void
}

const UpdateItemForm = ({ item, onCancel, onSuccess }: UpdateItemFormProps) => {
  const formId = `update-item-${item.id}`

  const initialState: UpdateItemState = {
    success: false,
    message: '',
    errors: undefined,
    values: {
      id: item.id,
      boxId: item.boxId,
      name: item.name,
      quantity: item.quantity,
    },
  }

  const [state, formAction, isPending] = useActionState(
    updateItemAction,
    initialState,
  )

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
      onSuccess()
    } else {
      toast.error(state.message)
    }
  }, [state.message, state.success, onSuccess])

  return (
    <>
      <form
        id={formId}
        action={formAction}
        className="flex flex-col flex-1 my-auto gap-1"
      >
        <input type="hidden" name="id" value={item.id} />
        <input type="hidden" name="boxId" value={item.boxId} />

        <Field>
          <Input
            name="name"
            defaultValue={item.name}
            className="md:text-base font-semibold max-w-2xs"
            disabled={isPending}
          />
          <FieldError>{state.errors?.name?.[0]}</FieldError>
        </Field>

        <Field>
          <Input
            name="quantity"
            type="number"
            defaultValue={item.quantity}
            className="md:text-base max-w-2xs"
            disabled={isPending}
          />
          <FieldError>{state.errors?.quantity?.[0]}</FieldError>
        </Field>
      </form>

      <div className="absolute bottom-2 right-2 animate-in fade-in">
        <Button
          variant="ghost"
          size="sm"
          type="submit"
          form={formId}
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Accept'}
        </Button>

        <ToolbarButton onClick={onCancel} disabled={isPending}>
          Cancel
        </ToolbarButton>
      </div>
    </>
  )
}

export default UpdateItemForm
