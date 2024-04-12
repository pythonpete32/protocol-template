"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AccountProvider } from "./account-context";

export const Providers = (props: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <AccountProvider>
          <Suspense>{props.children}</Suspense>
          <ReactQueryDevtools initialIsOpen={false} />
        </AccountProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
