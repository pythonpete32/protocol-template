"use client";

import { ReactNode, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

import { AccountProvider } from "./account-context";
import { type State, WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/config/settings";

type Props = {
  children: ReactNode;
  initialState: State | undefined;
};

export const Providers = ({ children, initialState }: Props) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <Suspense>
            <AccountProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster />
            </AccountProvider>
          </Suspense>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
