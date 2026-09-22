interface ForgotPasswordEmailTemplateProps {
  email: string
  link: string
}

export function ForgotPasswordEmailTemplate({
  email,
  link,
}: ForgotPasswordEmailTemplateProps) {
  return (
    <div>
      <h1>Hello {email} !</h1>
      <p>
        You can change your password using <a href={link}>this link</a>
      </p>
    </div>
  )
}
