import { Address } from "viem";

export type UserOperationsType = Array<{
  to: Address;
  value: BigInt;
  data: `0x${string}`;
}>;
