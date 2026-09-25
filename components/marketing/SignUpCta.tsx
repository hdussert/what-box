import SignUpButton from '@/components/marketing/SignUpButton'

const SignUpCta = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2 className="text-3xl font-bold">Ready to find your things?</h2>
      <p className="text-muted-foreground">
        Create your first box in under a minute.
      </p>
      <SignUpButton size="lg" />
    </div>
  )
}

export default SignUpCta
