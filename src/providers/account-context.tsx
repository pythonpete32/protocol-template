import { createContext, useEffect, useState, useContext } from "react";
import { createPublicClient, http } from "viem";
import type { Chain, PublicClient, Transport } from "viem";
import {
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  type KernelAccountClient,
  type KernelSmartAccount,
} from "@zerodev/sdk";
import type { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types";
import { BUNDLER_URL, CHAIN, PAYMASTER_URL, entryPoint } from "@/config/settings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// TODO: fix this type
type KernelClient = KernelAccountClient<any> | any;
type KernelAccount = KernelSmartAccount<ENTRYPOINT_ADDRESS_V07_TYPE, Transport, Chain | undefined>;

interface AccountContextValue {
  kernelAccount: KernelAccount | undefined;
  kernelClient: KernelClient | undefined;
  publicClient: PublicClient | undefined;
  setKernelAccount: React.Dispatch<React.SetStateAction<KernelAccount | undefined>>;
  logout: () => void;
}

export const AccountContext = createContext<AccountContextValue>({
  kernelAccount: undefined,
  kernelClient: undefined,
  publicClient: undefined,
  setKernelAccount: () => {},
  logout: () => {},
});

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [kernelAccount, setKernelAccount] = useState<KernelAccount | undefined>(undefined);
  const [kernelClient, setKernelClient] = useState<KernelClient | undefined>(undefined);
  const [publicClient, setPublicClient] = useState<PublicClient | undefined>(undefined);
  const router = useRouter();

  const logout = () => {
    setKernelAccount(undefined);
    setKernelAccount(undefined);
    setPublicClient(undefined);
    toast("Logging out...");
    router.push("/login");
  };

  // setPublicClient,
  useEffect(() => {
    const publicClient = createPublicClient({
      transport: http(BUNDLER_URL),
    });

    setPublicClient(publicClient);
  }, []);

  // setKernelClient,
  useEffect(() => {
    const kernelClient = createKernelAccountClient({
      account: kernelAccount,
      chain: CHAIN,
      bundlerTransport: http(BUNDLER_URL),
      entryPoint,
      middleware: {
        sponsorUserOperation: async ({ userOperation }) => {
          const zeroDevPaymaster = createZeroDevPaymasterClient({
            chain: CHAIN,
            transport: http(PAYMASTER_URL),
            entryPoint,
          });
          return zeroDevPaymaster.sponsorUserOperation({
            userOperation,
            entryPoint,
          });
        },
      },
    });
    setKernelClient(kernelClient);
  }, [kernelAccount]);

  return (
    <AccountContext.Provider
      value={{
        kernelAccount,
        kernelClient,
        publicClient,
        setKernelAccount,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useZeroDevContext(): AccountContextValue {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
