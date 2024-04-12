"use client";

import { FC, PropsWithChildren } from "react";
import { AccountDropdown } from "./account-dropdown";
import { SearchInput } from "./SearchInput";
import { SideNav } from "./SideNav";
import { FaucetCard } from "./FaucetCard";
import { TurnkeyIframe } from "./TurnkeyIframe";
import { SidebarSheetButton } from "./SidebarSheetButton";
import { NotificationButton } from "./NotificationButton";
import { Logo } from "./Logo";

export const AppShell: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo />
            <NotificationButton />
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
          <SidebarSheetButton>
            <SideNav />
            <div className="mt-auto">
              <FaucetCard />
            </div>
          </SidebarSheetButton>
          <div className="w-full flex-1">
            <SearchInput />
          </div>
          <AccountDropdown />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
      <TurnkeyIframe />
    </div>
  );
};
