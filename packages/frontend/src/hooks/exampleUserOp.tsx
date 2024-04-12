"use client";
import { useCallback } from "react";
import { Address } from "viem";
import { useMutation } from "@tanstack/react-query";
import { useAccount } from "../components/providers/account-context";

export const useExampleUserOp = () => {
  const { provider } = useAccount();

  const sendUO = useCallback(async () => {
    if (provider == null) return;

    const vitalik: Address = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

    const { hash } = await provider.sendUserOperation({
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
    mutateAsync: sendUserOperationAsync,
    data,
    isPending: isPendingUserOperation,
    isError: isSendUserOperationError,
  } = useMutation({
    mutationFn: sendUO,
    onSettled(data, error) {
      console.log("useExampleUserOp() Settled", { data, error });
    },
  });

  return {
    sendUserOperation,
    sendUserOperationAsync,
    uoHash: data?.uoHash,
    txnHash: data?.txnHash,
    isPendingUserOperation,
    isSendUserOperationError,
  };
};
