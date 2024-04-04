"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export function FaucetCard() {
  return (
    <Card>
      <CardHeader className="pt-0 p-4">
        <CardTitle>Faucet</CardTitle>
        <CardDescription>
          Claim some USDC and ETH from the faucet
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Button variant="secondary" className="w-full">
          Mint
        </Button>
      </CardContent>
    </Card>
  );
}
