import { Button, buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

type ToolbarButtonProps = PropsWithChildren<
  {
    onClick?: () => void
  } & VariantProps<typeof buttonVariants>
>

const ToolbarButton = ({ onClick, children, ...props }: ToolbarButtonProps) => (
  <Button variant="ghost" onClick={onClick} {...props}>
    {children}
  </Button>
)

export default ToolbarButton
