import { etherscanLink, jiffyscanLink } from "@/config/settings";
import { useZeroDevContext } from "@/providers/account-context";
import { UserOperationsType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Address } from "viem";

export const useSendUserOperations = () => {
  const { kernelClient, bundlerClient } = useZeroDevContext();
  const mutationFn = async (operations: UserOperationsType) => {
    return kernelClient.sendUserOperation({
      userOperation: {
        callData: await kernelClient.account.encodeCallData(operations),
      },
    });
  };

  const { mutateAsync: sendUserOpsAsync, ...rest } = useMutation({
    mutationFn,
    onSettled: (data, error, variables, context) => console.log({ data, error, variables, context }),
  });

  const sendUserOperation = async (userOps: UserOperationsType) => {
    const toastId = toast.loading("Sending Transaction...");
    try {
      const userOpHash = await sendUserOpsAsync(userOps);

      toast.loading(`User Operation Submitted`, {
        id: toastId,
        action: {
          label: "View on JiffyScan",
          onClick: () => window.open(jiffyscanLink(userOpHash), "_blank"),
        },
      });

      const receipt = await bundlerClient.waitForUserOperationReceipt({
        hash: userOpHash,
      });

      toast.success(`Transaction Mined`, {
        id: toastId,
        action: {
          label: "View on Etherscan Link",
          onClick: () => window.open(etherscanLink(receipt.receipt.transactionHash), "_blank"),
        },
      });
      console.log("receipt", receipt);
    } catch (error) {
      toast.error("Transaction Failed", { id: toastId });
      console.error(error);
    }
  };

  return { sendUserOperation, ...rest };
};
