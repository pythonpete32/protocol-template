import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { sepolia } from "viem/chains";

export const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_RPC!;
export const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_RPC!;
export const PASSKEY_SERVER_URL = process.env.NEXT_PUBLIC_PASSKEY_SERVER!;
export const CHAIN = sepolia;
export const entryPoint = ENTRYPOINT_ADDRESS_V07;
