"use client";
import { Button } from "@/components/ui/button";
import { FC, useCallback } from "react";
import { Address } from "@alchemy/aa-core";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../providers/account-context";

export const TestView: FC = () => {
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
