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

import { useZeroDevContext } from "@/providers/account-context";
import { useLoginAccount } from "@/hooks/loginAccount";
import { toast } from "sonner";

export function AccountDropdown() {
  const { kernelAccount, logout } = useZeroDevContext();
  const loginAccount = useLoginAccount();

  const handleLogin = async () => {
    toast.promise(loginAccount.getAccountAsync(), {
      loading: "Logging in...",
      success: (data) => `Signed in with account ${data.address}`,
      error: "Failed to login.",
    });
  };

  if (!kernelAccount)
    return (
      <Button variant="default" size="sm" className="w-24" disabled={loginAccount.isPending} onClick={handleLogin}>
        {loginAccount.isPending ? "Signing In" : "Sign In"}
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

<button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Border Magic
  </span>
</button>;
