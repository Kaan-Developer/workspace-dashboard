import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const items = [
  { label: "7 days", value: "7 days" },
  { label: "30 days", value: "30 days" },
]

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Last</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
