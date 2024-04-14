"use client";
import React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { IconFingerprint, IconWallet } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { createPasskeyValidator, getPasskeyValidator } from "@zerodev/passkey-validator";
import { bundlerActions, ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { createPublicClient, http, parseAbi, encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";
import { toast } from "sonner";
import { useCreateAccount } from "@/hooks/createAccount";
import { Button } from "@/components/ui/button";
import { useLoginAccount } from "@/hooks/loginAccount";

let kernelAccount: any;
let kernelClient: any;

const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_RPC!;
const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_RPC!;
const PASSKEY_SERVER_URL = process.env.NEXT_PUBLIC_PASSKEY_SERVER!;
const CHAIN = sepolia;
const entryPoint = ENTRYPOINT_ADDRESS_V07;

const contractAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";
const contractABI = parseAbi([
  "function mint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
]);

const publicClient = createPublicClient({
  transport: http(BUNDLER_URL),
});

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  // const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSendingUserOp, setIsSendingUserOp] = useState(false);
  const [userOpHash, setUserOpHash] = useState("");
  const [userOpStatus, setUserOpStatus] = useState("");

  const { kernelAccount, kernelClient, createAccountAsync, isPending: isRegistering } = useCreateAccount();

  const loginAccount = useLoginAccount();

  // Function to be called when "Register" is clicked
  const handleRegister = () => {
    toast.promise(
      createAccountAsync(username, {
        onSuccess(data) {
          setAccountAddress(data.address);
        },
      }),
      {
        loading: "Registering...",
        success: "Register done.  Try sending UserOps.",
        error: "Failed to register.",
      }
    );
  };

  const handleLogin = async () => {
    toast.promise(
      loginAccount.getAccountAsync(undefined, {
        onSuccess(data) {
          setAccountAddress(data.address);
        },
      }),
      {
        loading: "Logging in...",
        success: "Login done.  Try sending UserOps.",
        error: "Failed to login.",
      }
    );
  };

  // Function to be called when "Login" is clicked
  const handleSendUserOp = async () => {
    setIsSendingUserOp(true);
    setUserOpStatus("Sending UserOp...");

    const userOpHash = await kernelClient.sendUserOperation({
      userOperation: {
        callData: await kernelAccount.encodeCallData({
          to: contractAddress,
          value: BigInt(0),
          data: encodeFunctionData({
            abi: contractABI,
            functionName: "mint",
            args: [kernelAccount.address],
          }),
        }),
      },
    });

    setUserOpHash(userOpHash);

    const bundlerClient = kernelClient.extend(bundlerActions(entryPoint));
    await bundlerClient.waitForUserOperationReceipt({
      hash: userOpHash,
    });

    // Update the message based on the count of UserOps
    const userOpMessage = `UserOp completed. <a href="https://jiffyscan.xyz/userOpHash/${userOpHash}?network=mumbai" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">Click here to view.</a>`;

    setUserOpStatus(userOpMessage);
    setIsSendingUserOp(false);
  };

  return (
    <div className="max-w-md w-full mx-auto p-4 md:p-8">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Welcome to Aceternity</h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow yet
      </p>

      <LabelInputContainer className="mb-4">
        <Label htmlFor="username">Username For your PassKey</Label>
        <Input id="username" placeholder="user name" type="text" onChange={(e) => setUsername(e.target.value)} />
      </LabelInputContainer>

      <Button
        onClick={handleRegister}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
        disabled={isRegistering || loginAccount.isPending}
      >
        Sign up &rarr;
        <BottomGradient />
      </Button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <Button
          onClick={handleLogin}
          disabled={isRegistering || loginAccount.isPending}
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconFingerprint className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">Signin with PassKey</span>
          <BottomGradient />
        </Button>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="submit"
        >
          <IconWallet className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">Signin with Web3 Wallet</span>
          <BottomGradient />
        </button>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
