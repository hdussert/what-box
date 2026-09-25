const STEPS = [
  {
    title: 'Create a box',
    description: 'Name it, like “Kitchen” or “Winter clothes”.',
  },
  {
    title: 'Add your items',
    description: 'List what goes inside, with a photo if you like.',
  },
  {
    title: 'Stick the label',
    description: 'Print its QR code and stick it on the box.',
  },
]

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-3xl font-bold text-center">How does it work?</h2>
      <ol className="flex flex-col gap-6">
        {STEPS.map(({ title, description }, index) => (
          <li key={title} className="flex items-start gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              {index + 1}
            </span>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default HowItWorks
