import { Button, buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

type ToolbarButtonProps = PropsWithChildren<
  {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    className?: string
  } & VariantProps<typeof buttonVariants>
>

const ToolbarButton = ({
  onClick,
  children,
  variant = 'ghost',
  size = 'sm',
  ...props
}: ToolbarButtonProps) => (
  <Button variant={variant} size={size} onClick={onClick} {...props}>
    {children}
  </Button>
)

export default ToolbarButton
