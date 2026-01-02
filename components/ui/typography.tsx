import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

const H1 = ({ className, ...props }: ComponentProps<'h1'>) => (
  <h1 className={cn('text-4xl font-bold', className)} {...props}>
    {props.children}
  </h1>
)

const H2 = ({ className, ...props }: ComponentProps<'h2'>) => (
  <h2 className={cn('text-2xl font-bold', className)} {...props}>
    {props.children}
  </h2>
)

const H3 = ({ className, ...props }: ComponentProps<'h3'>) => (
  <h3 className={cn('text-xl font-bold', className)} {...props}>
    {props.children}
  </h3>
)

const P = ({ className, ...props }: ComponentProps<'p'>) => (
  <p className={cn('text-base', className)} {...props}>
    {props.children}
  </p>
)

const Typography = { H1, H2, H3, P }
export default Typography
