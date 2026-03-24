import {
  FileUploadActorRef,
  fileUploadMachine,
} from '@/app/components/box/image/machines/_file-upload-machine'
import {
  isStartable,
  isUploading,
} from '@/app/components/box/image/machines/utils'
import { v4 as generateUUID } from 'uuid'
import { createMachine, enqueueActions, spawnChild, stopChild } from 'xstate'
export type FilesUploadChildren = Record<string, FileUploadActorRef | undefined>

const MAX_CONCURRENT_UPLOADS = 2

export type Ctx = {
  boxId: string
}

// Events
type AddToQueueEvent = { type: 'ADD_TO_QUEUE'; files: File[] }
type CompletedEvent = { type: 'COMPLETED'; uploadId: string }
type FailedEvent = { type: 'FAILED'; uploadId: string }
type PumpEvent = { type: 'PUMP' }
type Event = AddToQueueEvent | PumpEvent | CompletedEvent | FailedEvent

/**
 * This machine manages the queue of files uploads.
 * It spawns a child machine for each file being uploaded, and ensures that only a certain number of uploads happen concurrently.
 */

export const filesUploaderMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QEsC2BDGsCqAHANgPboRgBOAdGWCQJ4DEAggCLMD6AYgJIAyAogGUA2gAYAuolC5CsZABdkhAHaSQAD0QBaAIwiAnBQCsAdm3G95gGwAmawGZj1ywBoQtRNe0AWCtr2G9PWsAwMc7PQBfCNc0TDg8IhJyKhoIBgBhAHkAWQAFfgAVPmZRCSQQaVkFZVUNBG1LbQoADms9OxERY0tjEUM7O2bXdwRrTpbm5tMO42Nmyz0vQyiYjCwE4lJKajomACFMgCUikvFVSvlFFXK6hqbW9s7u3v6vYa1Blq9tJ06FzxETi8KxAsXWBE2yR2aXouWweVK5xklxqNy02gGFG6S2CGOaIgcU3eCE0wSMAz0+MMXlMXQ6yxBSkIpHg5TB8QhSTISKqV1q6OaTWxhlxgwJc2MxJ0Tl8lm+ehErRphn0DNWcRwnK2KToPJR11AdUsIgo-gxFJm1MFbzciG09ooYzG3kmzS8lOBUQiQA */
    id: 'filesUploader',
    types: {} as {
      context: Ctx
      events: Event
      input: { boxId: string }
    },
    context: ({ input }) => ({
      boxId: input.boxId,
    }),
    initial: 'ready',
    states: {
      ready: {
        on: {
          ADD_TO_QUEUE: { actions: 'spawnFilesUploads' },
          COMPLETED: { actions: ['startNextUploads', 'stopChild'] },
          FAILED: { actions: 'startNextUploads' },
          PUMP: { actions: 'startNextUploads' },
        },
      },
    },
  },
  {
    actions: {
      // When new files are added, spawn a child machine for each file to handle its upload
      spawnFilesUploads: enqueueActions(({ context, event, enqueue }) => {
        if (event.type !== 'ADD_TO_QUEUE') return

        event.files.forEach((file) => {
          // Generate a unique ID for this upload item and create a preview URL for the file
          const uploadId = generateUUID()

          // TODO: if isImage(file) { ... }
          enqueue(
            spawnChild(fileUploadMachine, {
              id: uploadId,
              input: { id: uploadId, boxId: context.boxId, file },
            })
          )
        })
      }),

      startNextUploads: enqueueActions(({ self }) => {
        const snap = self.getSnapshot()
        const children = snap.children as Record<string, FileUploadActorRef>
        const fileUploadActors = Object.values(children).filter(
          (actor): actor is FileUploadActorRef => !!actor
        )

        const currentUploadsCount = fileUploadActors.filter((uploadActor) =>
          isUploading(uploadActor)
        ).length

        const availableSlots = Math.max(
          0,
          MAX_CONCURRENT_UPLOADS - currentUploadsCount
        )
        if (availableSlots === 0) return // No available slot, do nothing

        const startableActors = fileUploadActors
          .filter((actor) => isStartable(actor))
          .slice(0, availableSlots)

        startableActors.forEach((actor) => {
          actor?.send({ type: 'START' })
        })
      }),
      // When an upload completes, stop its child machine to clean up resources
      stopChild: enqueueActions(({ event, enqueue }) => {
        if (event.type !== 'COMPLETED') return
        enqueue(stopChild(event.uploadId))
      }),
    },
  }
)
