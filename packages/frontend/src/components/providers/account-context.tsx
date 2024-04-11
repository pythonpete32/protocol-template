import { AlchemySigner } from "@alchemy/aa-alchemy";
import { createContext, useEffect, useState, useContext } from "react";

interface AccountContextValue {
  signer: AlchemySigner | undefined;
}

export const AccountContext = createContext<AccountContextValue>({ signer: undefined });

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [signer, setSigner] = useState<AlchemySigner | undefined>(undefined);

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

  return <AccountContext.Provider value={{ signer }}>{children}</AccountContext.Provider>;
}

export function useAccount(): AccountContextValue {
  const signer = useContext(AccountContext);
  if (!signer) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return signer;
}
