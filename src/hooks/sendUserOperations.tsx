import { useZeroDevContext } from "@/providers/account-context";
import { useMutation } from "@tanstack/react-query";
import { Address } from "viem";

export type UseSendUserOperationsType = Array<{
  to: Address;
  value: BigInt;
  data: `0x${string}`;
}>;

export const useSendUserOperations = () => {
  const { kernelClient } = useZeroDevContext();
  const mutationFn = async (operations: UseSendUserOperationsType) => {
    return kernelClient.sendUserOperation({
      userOperation: {
        callData: await kernelClient.account.encodeCallData(operations),
      },
    });
  };

  const {
    mutate: sendUserOps,
    mutateAsync: sendUserOpsAsync,
    ...rest
  } = useMutation({
    mutationFn,
    onSettled: (data, error, variables, context) => console.log({ data, error, variables, context }),
  });
  return { sendUserOps, sendUserOpsAsync, ...rest };
};
