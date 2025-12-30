'use client'

import React, {
  ChangeEvent,
  createContext,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type ImagesInputContextValue = {
  inputRef: RefObject<HTMLInputElement | null>
  images: File[]
  previews: string[]
  handleImagesChange: (event: ChangeEvent<HTMLInputElement>) => void
  clearAll: () => void
  clear: (index: number) => void
}

const ImagesInputContext = createContext<ImagesInputContextValue | null>(null)

function useImagesInputState() {
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const clearAll = () => {
    setImages([])
    previews.forEach(URL.revokeObjectURL)
    setPreviews([])
  }

  const clear = (index: number) => {
    setImages((imgs) => imgs.filter((_, i) => i !== index))
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : []
    setImages((images) => images.concat(files))

    const newPreviews = files.map((f) => URL.createObjectURL(f))
    setPreviews((previews) => previews.concat(newPreviews))

    // Reset the input value to allow re-uploading the same file if needed
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  // Sync inputRef files with images state
  useEffect(() => {
    if (inputRef.current) {
      const dt = new DataTransfer()
      images.forEach((file) => dt.items.add(file))
      inputRef.current.files = dt.files
    }
  }, [images])

  // cleanup on unmount
  useEffect(() => clearAll, []) // clears previews if provider unmounts

  return useMemo(
    () => ({ inputRef, images, previews, handleImagesChange, clearAll, clear }),
    [images, previews]
  )
}

export function ImagesInputProvider({ children }: React.PropsWithChildren) {
  const value = useImagesInputState()
  return (
    <ImagesInputContext.Provider value={value}>
      {children}
    </ImagesInputContext.Provider>
  )
}

export function useImagesInput() {
  const ctx = useContext(ImagesInputContext)
  if (!ctx)
    throw new Error('useImagesInput must be used within ImagesInputProvider')
  return ctx
}
