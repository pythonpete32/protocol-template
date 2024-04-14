"use client";

import { FC } from "react";
import { useZeroDevContext } from "@/providers/account-context";

export const TestView: FC = () => {
  const { kernelAccount } = useZeroDevContext();

  if (kernelAccount)
    return (
      <div>
        <div>Account Address</div>
        {kernelAccount.address}
      </div>
    );
  else return <h3 className="text-2xl font-bold tracking-tight">Sign in</h3>;
};
