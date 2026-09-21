import {
  Camera,
  List,
  PackageCheck,
  PackageOpen,
  PackageSearch,
  QrCode,
  ScanSearch,
} from 'lucide-react'

const STORING_STEPS = [
  {
    title: 'Create a box',
    description: 'Create a new box',
    icon: PackageOpen,
  },
  {
    title: 'Take pictures',
    description: 'List the items stored inside',
    icon: Camera,
  },
  {
    title: 'Print QR code',
    description: 'Print and stick the QR code on the box',
    icon: QrCode,
  },
  {
    title: 'Done!',
    description: 'Your box is ready !',
    icon: PackageCheck,
  },
]

const IconListItem = ({
  description,
  icon: Icon,
}: {
  description: string
  icon: React.ComponentType<{ className?: string }>
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Icon />
        {description}
      </div>
    </div>
  )
}

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-3xl font-bold text-center">How does it work?</h2>

      <div className="flex flex-col gap-2 my-4">
        {STORING_STEPS.map(({ title, description, icon: Icon }) => (
          <IconListItem key={title} description={description} icon={Icon} />
        ))}
        <br />
        <IconListItem
          description="Search to quickly find any item"
          icon={PackageSearch}
        />
        <IconListItem
          description="Scan a box's QR code to see what's inside"
          icon={ScanSearch}
        />
        <IconListItem description="Keep track of what you own" icon={List} />
      </div>
    </div>
  )
}

export default HowItWorks
