"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useExampleUserOp } from "@/hooks/exampleUserOp";

export function FaucetCard() {
  const { sendUserOperation, isPendingUserOperation } = useExampleUserOp();

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
          onClick={() => sendUserOperation()}
          disabled={isPendingUserOperation}
        >
          {isPendingUserOperation && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isPendingUserOperation ? "Minting..." : "Mint"}
        </Button>
      </CardContent>
    </Card>
  );
}
