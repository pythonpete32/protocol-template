"use client";

import { PropsWithChildren, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

import { AccountProvider } from "./account-context";

export const Providers = (props: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <AccountProvider>
            {props.children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
          </AccountProvider>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
