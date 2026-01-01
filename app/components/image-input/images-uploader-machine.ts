import {
  ImageUploadActorRef,
  imageUploadMachine,
} from '@/app/components/image-input/image-upload-machine'
import { createMachine, enqueueActions, spawnChild } from 'xstate'

export type UploadItem = {
  id: string
  previewUrl: string
}

type Ctx = {
  boxId: string
  concurrency: number
  items: UploadItem[]
}

type AddFilesEvent = { type: 'ADD_FILES'; files: File[] }
type PumpEvent = { type: 'PUMP' }
type CompletedEvent = { type: 'COMPLETED'; uploadId: string }
type AbortedEvent = { type: 'ABORTED'; uploadId: string }

type Event = AddFilesEvent | PumpEvent | CompletedEvent | AbortedEvent

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

function getUploadStatus(
  actor: ImageUploadActorRef | undefined
): UploadStatus | undefined {
  return actor?.getSnapshot?.().context?.status as UploadStatus | undefined
}

function isStartableStatus(status: UploadStatus | undefined) {
  return status === 'idle' || status === 'error'
}

export const imagesUploaderMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEsC2BDGsCqAHANgPboRgBOAdGWCQJ4DEAggCLMD6AYgJIAyAogGUA2gAYAuolC5CsZABdkhAHaSQAD0QBaAIwiAnBQCsAdm3G95gGwAmawGZj1ywBoQtRNe0AWCtr2G9PWsAwMc7PQBfCNc0TDg8IhJyKhoIBgBhAHkAWQAFfgAVPmZRCSQQaVkFZVUNBG1LbQoADms9OxERY0tjEUM7O2bXdwRrTpbm5tMO42Nmyz0vQyiYjCwE4lJKajomACFMgCUikvFVSvlFFXK6hqbW9s7u3v6vYa1Blq9tJ06FzxETi8KxAsXWBE2yR2aXouWweVK5xklxqNy02gGFG6S2CGOaIgcU3eCE0wSMAz0+MMXlMXQ6yxBSkIpHg5TB8QhSTISKqV1q6OaTWxhlxgwJc2MxJ0Tl8lm+ehErRphn0DNWcRwnK2KToPJR11AdUsIgo-gxFJm1MFbzciG09ooYzG3kmzS8lOBUQiQA */
    id: 'imagesUploader',
    types: {} as {
      context: Ctx
      events: Event
      input: { boxId: string; concurrency?: number }
    },
    context: ({ input }) => ({
      boxId: input.boxId,
      concurrency: input.concurrency ?? 2,
      items: [],
    }),
    initial: 'ready',
    states: {
      ready: {
        on: {
          ADD_FILES: { actions: 'spawnFiles' },
          COMPLETED: { actions: ['startMoreIfPossible', 'removeItem'] },
          ABORTED: { actions: ['startMoreIfPossible', 'removeItem'] },
          PUMP: { actions: 'startMoreIfPossible' },
        },
      },
    },
  },
  {
    actions: {
      removeItem: enqueueActions(({ context, event, enqueue }) => {
        if (event.type !== 'COMPLETED') return

        console.log('Removing item', event.uploadId)
        // Revoke preview URL to prevent memory leaks
        const item = context.items.find((i) => i.id === event.uploadId)
        if (item) {
          URL.revokeObjectURL(item.previewUrl)
        }

        enqueue.assign({
          items: ({ context }) =>
            context.items.filter((item) => item.id !== event.uploadId),
        })
      }),
      spawnFiles: enqueueActions(({ context, event, enqueue }) => {
        if (event.type !== 'ADD_FILES') return

        event.files.forEach((file) => {
          const uploadId = crypto.randomUUID()
          const previewUrl = URL.createObjectURL(file)

          enqueue(
            spawnChild(imageUploadMachine, {
              id: uploadId,
              input: { id: uploadId, boxId: context.boxId, file, previewUrl },
            })
          )

          enqueue.assign({
            items: ({ context }) =>
              context.items.concat({ id: uploadId, previewUrl }),
          })
        })
      }),

      startMoreIfPossible: enqueueActions(({ context, self }) => {
        const snap = self.getSnapshot()
        const children = snap.children as Record<
          string,
          ImageUploadActorRef | undefined
        >

        const itemActors = context.items.map((item) => ({
          item,
          actor: children[item.id],
        }))

        const uploadingCount = itemActors.filter(
          ({ actor }) => getUploadStatus(actor) === 'uploading'
        ).length

        const availableSlots = Math.max(0, context.concurrency - uploadingCount)
        if (availableSlots === 0) return

        const startableActors = itemActors
          .map(({ actor }) => actor)
          .filter((actor) => isStartableStatus(getUploadStatus(actor)))
          .slice(0, availableSlots)

        startableActors.forEach((actor) => {
          actor?.send({ type: 'START' })
        })
      }),
    },
  }
)
