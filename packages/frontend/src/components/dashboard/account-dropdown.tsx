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
import { useAuthenticateUser } from "@/hooks/authenticateUser";
import { AlchemySigner } from "@alchemy/aa-alchemy";
import { useState } from "react";

export function AccountDropdown({ signer }: { signer: AlchemySigner | undefined} ) {



  
  const { user, account } = useAuthenticateUser(signer);

  console.log({ user, account });


  const isLoggedIn = !!account

  const handleLogOut = () => {console.log('logout')}

  if (!isLoggedIn) return <ConnectButton signer={signer}/>;

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
