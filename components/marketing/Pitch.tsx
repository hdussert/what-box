import MarketingSection from '@/components/marketing/MarketingSection'
import MarketingTitle from '@/components/marketing/MarketingTitle'

const Pitch = () => {
  return (
    <MarketingSection id="features" className="gap-4">
      <MarketingTitle>No more digging around!</MarketingTitle>
      <ul className="space-y-1">
        <li>
          <i>&ldquo;Where are the blankets?&rdquo;</i>
        </li>
        <li>
          <i>&ldquo;The cutlery, is it in the box at the back?&rdquo;</i>
        </li>
        <li>
          <i>&ldquo;What&apos;s in that one?&rdquo;</i>
        </li>
      </ul>
      <p>
        Save time by inventorying your items with <b>WhatBox</b>: everything is
        right at your fingertips.
      </p>
    </MarketingSection>
  )
}

export default Pitch
