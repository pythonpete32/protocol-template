"use client";

import { Bell, Menu, Package2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AccountDropdown } from "./account-dropdown";
import { SearchInput } from "./SearchInput";
import { SideNav } from "./SideNav";
import { MainSectionLayout } from "./MainSectionLayout";
import { FaucetCard } from "./FaucetCard";
import { TurnkeyIframe } from "./TurnkeyIframe";

import { FC, useCallback } from "react";
import { Address } from "@alchemy/aa-core";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../providers/account-context";

export function Dashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <SideNav />
          </div>
          <div className="mt-auto p-4">
            <FaucetCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SideNav />
              <div className="mt-auto">
                <FaucetCard />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <SearchInput />
          </div>
          <AccountDropdown />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <MainSectionLayout title="Inventory" centered>
            <TestView />
          </MainSectionLayout>
        </main>
      </div>
      <TurnkeyIframe />
    </div>
  );
}

const TestView: FC = () => {
  const { user, account, provider } = useAccount();

  const sendUO = useCallback(async () => {
    if (provider == null || account == null) return;

    const vitalik: Address = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

    const { hash } = await provider.sendUserOperation({
      uo: { data: "0x00", target: vitalik },
    });

    const txnHash = await provider.waitForUserOperationTransaction({
      hash,
    });

    return { uoHash: hash, txnHash };
  }, [provider, account]);

  const {
    mutate: sendUserOperation,
    data,
    isPending: isPendingUserOperation,
    isError: isSendUserOperationError,
  } = useMutation({
    mutationFn: sendUO,
    onSettled(data, error, variables, context) {
      console.log({ data, error, variables, context, provider, account });
    },
  });

  if (!user || !account)
    return (
      <>
        <h3 className="text-2xl font-bold tracking-tight">Sign in</h3>
        <p className="text-sm text-muted-foreground">You can start selling as soon as you add a product.</p>
        <Button className="mt-4">Add Product</Button>
      </>
    );

  return (
    <>
      <div>
        <div>Account Address</div>
        {provider?.account?.address}
      </div>

      <Button variant="secondary" className="w-full" onClick={() => sendUserOperation()}>
        Send User Operation
      </Button>
      {isPendingUserOperation && <div>Sending...</div>}
      {isSendUserOperationError && <div>Error sending user operation</div>}
      {data && (
        <div>
          <div>UO Hash</div>
          {data.uoHash}
          <div>TX Hash</div>
          {data.txnHash}
        </div>
      )}
    </>
  );
};
