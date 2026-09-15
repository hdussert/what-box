interface ForgotPasswordTemplateProps {
  firstName: string
  link: string
}

export function ForgotPasswordEmailTemplate({
  firstName,
  link,
}: ForgotPasswordTemplateProps) {
  return (
    <div>
      <h1>Hello {firstName} !</h1>
      <p>
        You can change your password using <a href={link}>this link</a>
      </p>
    </div>
  )
}
