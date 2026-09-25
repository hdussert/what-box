import MarketingSection from '@/components/marketing/MarketingSection'
import MarketingTitle from '@/components/marketing/MarketingTitle'
import SignUpButton from '@/components/marketing/SignUpButton'

const SignUpCta = () => {
  return (
    <MarketingSection className="gap-4">
      <MarketingTitle>Ready to find your things?</MarketingTitle>
      <p className="text-muted-foreground">
        Create your first box in under a minute.
      </p>
      <SignUpButton size="lg" />
    </MarketingSection>
  )
}

export default SignUpCta
