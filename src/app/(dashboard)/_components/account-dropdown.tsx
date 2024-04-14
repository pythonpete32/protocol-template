"use client";

import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConnectButton } from "./ConnectButton";
import { useZeroDevContext } from "@/providers/account-context";
import { ReloadIcon } from "@radix-ui/react-icons";

export function AccountDropdown() {
  const { kernelAccount, logout } = useZeroDevContext();

  // TODO: Make this into a button that opens a modal
  if (!kernelAccount)
    return (
      <Button variant="outline" size="icon" className="rounded-full" disabled>
        <ReloadIcon className="h-4 w-4 animate-spin" />
        <span className="sr-only">Toggle account menu</span>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <CircleUser className="h-4 w-4" />
          <span className="sr-only">Toggle account menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
