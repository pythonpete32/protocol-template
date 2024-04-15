"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSendUserOperations } from "@/hooks/sendUserOperations";
import { encodeFunctionData, parseAbi, zeroAddress } from "viem";
import { UserOperationsType } from "@/types";
import MockUSDC from "@/config/contracts/MockUSDC";
import { useZeroDevContext } from "@/providers/account-context";

export function FaucetCard() {
  const { sendUserOperation, isPending } = useSendUserOperations();
  const { kernelAccount } = useZeroDevContext();

  const transaction: UserOperationsType = [
    {
      to: MockUSDC.address,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: MockUSDC.abi,
        functionName: "faucet",
        // if kernelAccount is undefined, we cant even press the button anyway
        args: [kernelAccount?.address! ?? zeroAddress],
      }),
    },
  ];

  return (
    <Card>
      <CardHeader className="pt-0 p-4">
        <CardTitle>USDC Faucet</CardTitle>
        <CardDescription className="pt-4">Claim 420 USDC into your Smart Account</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => sendUserOperation(transaction)}
          disabled={isPending}
        >
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Minting..." : "Mint"}
        </Button>
      </CardContent>
    </Card>
  );
}
