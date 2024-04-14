"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSendUserOperations } from "@/hooks/sendUserOperations";
import { toast } from "sonner";
import { encodeFunctionData, parseAbi } from "viem";

export function FaucetCard() {
  // const { sendUserOperation, isPendingUserOperation } = useExampleUserOp();
  const { sendUserOpsAsync, isPending } = useSendUserOperations();

  const sendUserOperation = async () => {
    toast.promise(
      sendUserOpsAsync([
        {
          to: "0x34bE7f35132E97915633BC1fc020364EA5134863",
          value: BigInt(0),
          data: encodeFunctionData({
            abi: parseAbi(["function mint(address _to) public"]),
            functionName: "mint",
            args: ["0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a"],
          }),
        },
      ]),
      {
        loading: "Minting...",
        success: "Minted!",
        error: "Failed to mint",
      }
    );
  };

  return (
    <Card>
      <CardHeader className="pt-0 p-4">
        <CardTitle>USDC Faucet</CardTitle>
        <CardDescription className="pt-4">Claim 420 USDC into your Smart Account</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <Button variant="secondary" className="w-full" onClick={() => sendUserOperation()} disabled={isPending}>
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Minting..." : "Mint"}
        </Button>
      </CardContent>
    </Card>
  );
}
