import { LuChevronsUpDown, LuLogOut, LuUser } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SidebarProfileProps = {
    name: string;
    email: string;
    onAccount?: () => void;
    onLogout?: () => void;
}

const SidebarProfile  = ({name, email, onAccount, onLogout}: SidebarProfileProps) => {
    return (
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-sidebar-accent focus-visible:outline-2 focus-visible:outline-sidebar-ring"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent">
            <LuUser size={18} aria-hidden="true" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">
              {name}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {email}
            </span>
          </span>

          <LuChevronsUpDown size={16} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={8}
        className="w-56"
      >
        <DropdownMenuLabel>
          <span className="block text-sm text-foreground">{name}</span>
          <span className="block truncate font-normal">{email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={onAccount}>
          <LuUser aria-hidden="true" />
          Account
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={onLogout}>
          <LuLogOut aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    )
}

export default SidebarProfile;