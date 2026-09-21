import { Button, buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

type ToolbarButtonProps = PropsWithChildren<
  {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
  } & VariantProps<typeof buttonVariants>
>

const ToolbarButton = ({ onClick, children, ...props }: ToolbarButtonProps) => (
  <Button variant="ghost" size="sm" onClick={onClick} {...props}>
    {children}
  </Button>
)

export default ToolbarButton
