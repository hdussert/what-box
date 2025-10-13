type TypographyProps = {
  children: React.ReactNode
  className?: string
}

const H1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`text-4xl font-extrabold ${className}`}>{children}</h1>
)

const H2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
)

const H3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={`text-xl font-bold ${className}`}>{children}</h3>
)

const P = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-base ${className}`}>{children}</p>
)

const Typography = { H1, H2, H3, P }
export default Typography
