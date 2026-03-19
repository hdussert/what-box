import { PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import { toast } from 'sonner'
import { ActorRefFrom, assign, fromPromise, sendParent, setup } from 'xstate'

export type SingleContext = {
  id: string
  boxId: string
  file: File
  progress: number
  error?: string
}

type StartEvent = { type: 'START' }
type ProgressEvent = { type: 'PROGRESS'; progress: number }
type RetryEvent = { type: 'RETRY' }
type AbortEvent = { type: 'ABORT' }
type Event = StartEvent | ProgressEvent | AbortEvent | RetryEvent

function clampPct(p: number) {
  if (!Number.isFinite(p)) return 0
  return Math.max(0, Math.min(100, Math.round(p)))
}

type UploadFileInput = {
  context: SingleContext
  self: { send: (e: Event) => void }
}
const uploadFile = fromPromise<PutBlobResult, UploadFileInput>(
  async ({ input }) => {
    // Test error handling

    const { context, self } = input
    const { boxId, id, file } = context
    const filePath = `${boxId}/${id}-${file.name}`
    const blob = await upload(filePath, context.file, {
      access: 'public',
      handleUploadUrl: `/api/boxes/${context.boxId}/images/upload`,
      onUploadProgress: (p) => {
        self.send({ type: 'PROGRESS', progress: clampPct(p.percentage) })
      },
    })
    return blob
  }
)

type FileUploadMachine = typeof fileUploadMachine
export type FileUploadActorRef = ActorRefFrom<FileUploadMachine>

export const fileUploadMachine = setup({
  types: {} as {
    context: SingleContext
    events: Event
    input: {
      id: string
      userId: string
      boxId: string
      file: File
    }
  },
  actors: {
    uploadFile,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEsC2BDGBVADgGwHt0IA6ZCPMAYgGUAVAQQCU6BtABgF1FQcDZkAF2QEAdjxAAPRACYAjHJLsZAZhUA2AByaArAHY5muTM0AaEAE9EKgCwBOEjKc67dvXfY2NO9QF9f5miYYLiExCQArvhEEMiiUFQQYmBkogBuBADWKUHY0eFRYbHxCHEZAMbowmIcnLUSfALV4khSiD6aJDbs6p4yNuq9KnrmVggmel3d7HZG7MaadjL+gRh5RZH5xQlgAE67BLsk+FUAZoeoZGshW5tFcVCl6QSVzbX1rY1CIi2g0uMKJSqDTafSGBajRByPSdOw2GTqJYGaGadR6ZYBEC5G4bQoxB5UAAKTAA8gBxJgAURoNA+vH43zEEn+3RUJFmOh0ynUchUrlskIQcnsJBUMh0NnRXLsOjU+hWWOuoRiJD2B12VCpdCYAE06SAvs1mbJAco1FpdAYjCZBTIDKL2OjEY6vGiVDoFdjleE1YcqAwAEIklj6w0-Y0IdEkXlo6HsWzzewyQVGUVObSLeaaLy8-yY0QECBwCRerYNBlG1r-AC0ckF1fUSnYzemWk5cjsYs9Stu5Eo5aa4ariElgpUxnZ2dsPIRXgxq2C3tIeOIDwHjN+bQQagcSwlCmG-Wbdltekbxm6en3mj0Nn0HsxpY2sAi5XKcHgnwrQ7+iD07pIREz30VFehvFRbRsTo7xsLwbDkdQfDg7tF1uX1dnXStfwQUdLChVNER0GRZjtdQ+TsPw8yAA */
  id: 'imageUpload',
  context: ({ input }) => ({
    id: input.id,
    boxId: input.boxId,
    file: input.file,
    progress: 0,
  }),
  initial: 'idle',
  states: {
    idle: {
      entry: [
        assign({
          progress: ({ context }) => context.progress ?? 0,
        }),
        sendParent({ type: 'PUMP' }),
      ],
      on: { START: 'uploading' },
    },

    uploading: {
      entry: [assign({ error: () => undefined }), sendParent({ type: 'PUMP' })],
      invoke: {
        src: 'uploadFile',
        input: ({ context, self }) => ({ context, self }),
        onDone: {
          target: 'success',
          actions: sendParent(({ context }) => ({
            type: 'COMPLETED',
            uploadId: context.id,
          })),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) =>
              (event.error as Error)?.message ?? 'Upload failed',
          }),
        },
      },
      on: {
        PROGRESS: {
          actions: assign({
            progress: ({ event }) => event.progress,
          }),
        },
      },
    },

    success: {
      type: 'final',
    },

    error: {
      entry: [
        sendParent(({ context }) => ({
          type: 'FAILED',
          uploadId: context.id,
        })),
        () => toast.error('Image upload failed.'),
      ],
      on: {
        RETRY: 'idle',
      },
    },
  },
})
