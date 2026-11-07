import { LuSearch } from "react-icons/lu"

import { Input } from "@/components/ui/input"

const Search = () => {
  return (
    <div className="relative w-full max-w-xs">
      <LuSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        aria-label="Search"
        placeholder="Search..."
        className="pl-8 pr-24"
      />
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
        12 results
      </span>
    </div>
  )
}

export default Search;