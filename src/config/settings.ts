import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { sepolia } from "viem/chains";

export const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_RPC!;
export const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_RPC!;
export const PASSKEY_SERVER_URL = process.env.NEXT_PUBLIC_PASSKEY_SERVER!;
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;
export const CHAIN = sepolia;
export const entryPoint = ENTRYPOINT_ADDRESS_V07;

export const jiffyscanLink = (hash: `0x${string}`) => `https://jiffyscan.xyz/userOpHash/${hash}`;
export const etherscanLink = (hash: `0x${string}`) => `https://sepolia.etherscan.io/tx/${hash}`;

export const wagmiConfig = createConfig({
  ssr: true,
  storage: createStorage({ storage: cookieStorage }),
  multiInjectedProviderDiscovery: false,
  chains: [sepolia],
  transports: { [sepolia.id]: http(RPC_URL ?? undefined) },
});
