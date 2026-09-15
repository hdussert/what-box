type SelectionCountProps = {
  count: number
}

const SelectionCount = ({ count }: SelectionCountProps) => {
  return (
    <p className="px-2 text-sm text-muted-foreground whitespace-nowrap">
      <span className="font-mono">{count}</span> selected
    </p>
  )
}

export default SelectionCount
