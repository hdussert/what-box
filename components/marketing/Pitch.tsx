import MarketingGlow from '@/components/marketing/MarketingGlow'
import MarketingSection from '@/components/marketing/MarketingSection'
import MarketingTitle from '@/components/marketing/MarketingTitle'
import { SAMPLE_BOX } from '@/components/marketing/const'
import { Badge } from '@/components/ui/badge'

// Everyday questions and WhatBox's answer: where an item is (search), or
// what a box holds (scan).
const QUESTIONS = [
  { question: 'Where are the blankets?', box: 'P3LW8D', answer: 'Bedroom' },
  {
    question: 'Which box has the phone chargers?',
    box: '4A9TZ1',
    answer: 'Office',
  },
  {
    question: "What's in that one?",
    box: SAMPLE_BOX.shortId,
    answer: 'Plates, mugs, kettle',
  },
]

const Pitch = () => {
  return (
    <MarketingSection id="why" className="scroll-mt-[20svh] gap-4">
      <MarketingGlow className="top-1/2 left-1/2" />
      <MarketingTitle>No more digging around!</MarketingTitle>
      <ul className="my-4 flex w-full max-w-lg flex-col gap-4">
        {QUESTIONS.map(({ question, box, answer }) => (
          <li
            key={box}
            className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2 italic">
              {question}
            </p>
            <Badge variant="soft" className="self-end sm:self-auto">
              <span className="font-mono font-bold">BOX {box}</span> · {answer}
            </Badge>
          </li>
        ))}
      </ul>
      <p>
        Search for an item to find its box, or scan a box to see what&apos;s
        inside: <strong>WhatBox</strong> answers in seconds.
      </p>
    </MarketingSection>
  )
}

export default Pitch
