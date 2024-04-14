import { useMutation } from "@tanstack/react-query";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { createPublicClient, http } from "viem";
import { CHAIN, BUNDLER_URL, PAYMASTER_URL, entryPoint, PASSKEY_SERVER_URL } from "../config/settings";
import { getPasskeyValidator } from "@zerodev/passkey-validator";

export const useLoginAccount = () => {
  const publicClient = createPublicClient({
    transport: http(BUNDLER_URL),
  });

  const mutationFn = async () => {
    const passkeyValidator = await getPasskeyValidator(publicClient, {
      passkeyServerUrl: PASSKEY_SERVER_URL,
      entryPoint,
    });

    return createKernelAccount(publicClient, {
      entryPoint,
      plugins: {
        sudo: passkeyValidator,
      },
    });
  };

  const {
    data: kernelAccount,
    mutate: getAccount,
    mutateAsync: getAccountAsync,
    ...rest
  } = useMutation({
    mutationFn,
    onSettled(data, error, variables, context) {
      console.log("settled", { data, error, variables, context });
    },
  });

  const kernelClient = kernelAccount
    ? createKernelAccountClient({
        account: kernelAccount,
        chain: CHAIN,
        bundlerTransport: http(BUNDLER_URL),
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        middleware: {
          sponsorUserOperation: async ({ userOperation }) => {
            const zeroDevPaymaster = await createZeroDevPaymasterClient({
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
      })
    : undefined;

  return { kernelAccount, kernelClient, getAccount, getAccountAsync, ...rest };
};
