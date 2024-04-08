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
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { ConnectButton } from "./ConnectButton";

export function AccountDropdown() {
  // const isLoggedIn = useIsLoggedIn();
  const isLoggedIn = false
  // const { handleLogOut } = useDynamicContext();
  const handleLogOut = () => {console.log('logout')}

  if (!isLoggedIn) return <ConnectButton />;

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
        <DropdownMenuItem onClick={() => handleLogOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
