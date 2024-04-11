"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useAuthenticateUser } from "@/hooks/authenticateUser";
import { AlchemySigner, createAlchemySmartAccountClient } from "@alchemy/aa-alchemy";
import { useCallback, useState } from "react";
import { sepolia } from "viem/chains";
import { Address } from "viem";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../providers/account-context";

export function FaucetCard() {
  const { signer, account, provider } = useAccount();
  // const { account } = useAuthenticateUser();

  const sendUO = useCallback(async () => {
    if (provider == null) return;

    // console.log({ provider });

    const vitalik: Address = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

    const { hash } = await provider.sendUserOperation({
      // account,
      uo: {
        target: vitalik,
        data: "0x",
      },
    });

    const txnHash = await provider.waitForUserOperationTransaction({
      hash,
    });

    return { uoHash: hash, txnHash };
  }, [provider]);

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

  console.log({ data, isPendingUserOperation, isSendUserOperationError });

  return (
    <Card>
      <CardHeader className="pt-0 p-4">
        <CardTitle>Faucet</CardTitle>
        <CardDescription>Claim some USDC and ETH from the faucet</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Button variant="secondary" className="w-full" onClick={() => sendUserOperation()}>
          Mint
        </Button>
      </CardContent>
    </Card>
  );
}
