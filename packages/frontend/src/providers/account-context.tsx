// account-context.tsx
import { useAuthenticateUser } from "@/hooks/authenticateUser";
import { MultiOwnerModularAccount } from "@alchemy/aa-accounts";
import {
  AlchemySigner,
  AlchemySmartAccountClient,
  AuthParams,
  User,
  createAlchemySmartAccountClient,
} from "@alchemy/aa-alchemy";
import { sepolia } from "@alchemy/aa-core";
import { UseMutateFunction } from "@tanstack/react-query";
import { createContext, useEffect, useState, useContext } from "react";
import { Chain, Transport } from "viem";

type MultiOwnerSmartAccountClient = AlchemySmartAccountClient<
  Transport,
  Chain,
  MultiOwnerModularAccount<AlchemySigner>
>;

interface AccountContextValue {
  signer: AlchemySigner | undefined;
  user: User | undefined;
  account: MultiOwnerModularAccount<AlchemySigner> | undefined;
  isLoadingUser: boolean;
  refetchUserDetails: () => void;
  isAuthenticatingUser: boolean;
  authenticateUser: UseMutateFunction<User, Error, AuthParams, unknown>;
  provider: MultiOwnerSmartAccountClient | undefined;
}

export const AccountContext = createContext<AccountContextValue>({
  signer: undefined,
  user: undefined,
  account: undefined,
  provider: undefined,
  isLoadingUser: false,
  refetchUserDetails: () => {},
  isAuthenticatingUser: false,
  authenticateUser: () => {},
});

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [signer, setSigner] = useState<AlchemySigner | undefined>(undefined);
  const [provider, setProvider] = useState<MultiOwnerSmartAccountClient | undefined>();

  const { user, account, isLoadingUser, refetchUserDetails, isAuthenticatingUser, authenticateUser } =
    useAuthenticateUser(signer);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const newSigner = new AlchemySigner({
      client: {
        connection: {
          rpcUrl: "/api/rpc",
        },
        iframeConfig: {
          iframeContainerId: "turnkey-iframe-container-id",
        },
      },
    });

    setSigner(newSigner);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || !account) {
      return;
    }

    const gasManagerPolicyId = process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID;

    if (gasManagerPolicyId == null) {
      throw new Error("Missing gas policy ID");
    }

    const newProvider = createAlchemySmartAccountClient({
      chain: sepolia,
      rpcUrl: "/api/rpc",
      account,
      gasManagerConfig: {
        policyId: gasManagerPolicyId,
      },
      opts: {
        txMaxRetries: 20,
      },
    });

    setProvider(newProvider);
  }, [account]);

  return (
    <AccountContext.Provider
      value={{
        signer,
        user,
        account,
        provider,
        isLoadingUser,
        refetchUserDetails,
        isAuthenticatingUser,
        authenticateUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount(): AccountContextValue {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}
