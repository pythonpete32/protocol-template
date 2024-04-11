"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { FC, useCallback, useState } from "react";
import { Dialog, DialogContentInvisible, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "../providers/account-context";

type ConnectButtonType = {
  className?: string;
};

export const ConnectButton: FC<ConnectButtonType> = ({ className }) => {
  const { isLoadingUser, isAuthenticatingUser } = useAccount();

  const isLoading = isLoadingUser || isAuthenticatingUser;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className={className} disabled={isLoading} data-testid="exampleChild">
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Signing in..." : "Signup or Login"}
        </Button>
      </DialogTrigger>
      <DialogContentInvisible>
        <LoginForm />
      </DialogContentInvisible>
    </Dialog>
  );
};

export function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);

  const { isAuthenticatingUser, authenticateUser } = useAccount();

  return (
    <>
      {!isAuthenticatingUser ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Log in to the Embedded Accounts Demo!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={onEmailChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => authenticateUser({ type: "email", email })}>
              Sign in
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-sm flex justify-center">
          <CardHeader>
            <Label>Check Email</Label>
          </CardHeader>
        </Card>
      )}
    </>
  );
}
