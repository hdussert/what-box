import { List, PackageSearch, ScanSearch } from 'lucide-react'

const FEATURES = [
  {
    title: 'Search',
    description: 'Find any item across all your boxes.',
    Icon: PackageSearch,
  },
  {
    title: 'Scan',
    description: 'Scan a box’s QR code to see what’s inside.',
    Icon: ScanSearch,
  },
  {
    title: 'Keep track',
    description: 'See everything you own in one place.',
    Icon: List,
  },
]

const Features = () => {
  return (
    <ul className="grid w-full max-w-3xl gap-8 sm:grid-cols-3">
      {FEATURES.map(({ title, description, Icon }) => (
        <li
          key={title}
          className="flex flex-col items-center gap-2 text-center"
        >
          <Icon className="size-8" />
          <h3 className="font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  )
}

export default Features
