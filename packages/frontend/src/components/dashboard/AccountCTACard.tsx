"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountCTACard() {
  return (
    <Card>
      <CardHeader className="pt-0 p-4">
        <CardTitle>Signup or Login</CardTitle>
        <CardDescription>Signup or Login to your Smart Account</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 p-4 ">
        <Button size="sm" className="w-full">
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}
