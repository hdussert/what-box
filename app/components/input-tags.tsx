import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useState } from 'react'

type InputTagsProps = {
  name?: string
}

const InputTags = ({ name }: InputTagsProps) => {
  const [tags, setTags] = useState<string[]>([])
  const [input, setInput] = useState('')

  const addTag = () => {
    const trimmed = input.trim()
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
    if (capitalized && !tags.includes(capitalized)) {
      setTags([...tags, capitalized])
      setInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <>
      <input type="hidden" name={name} value={tags} />
      <div>
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="mr-2">
            {tag}
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={(e) => {
                e.preventDefault()
                removeTag(tag)
              }}
            >
              <X />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Item... (optional)"
          name="items"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={(e) => {
            e.preventDefault()
            addTag()
          }}
        >
          Add
        </Button>
      </div>
    </>
  )
}

export default InputTags
