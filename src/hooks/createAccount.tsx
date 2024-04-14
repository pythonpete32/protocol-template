import { useMutation } from "@tanstack/react-query";
import { createKernelAccount, createKernelAccountClient, createZeroDevPaymasterClient } from "@zerodev/sdk";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { createPublicClient, http } from "viem";
import { CHAIN, BUNDLER_URL, PAYMASTER_URL, entryPoint, PASSKEY_SERVER_URL } from "../config/settings";
import { createPasskeyValidator } from "@zerodev/passkey-validator";

export const useCreateAccount = () => {
  const publicClient = createPublicClient({
    transport: http(BUNDLER_URL),
  });

  const mutationFn = async (userName: string) => {
    const passkeyValidator = await createPasskeyValidator(publicClient, {
      passkeyName: userName,
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
    mutate: createAccount,
    mutateAsync: createAccountAsync,
    ...rest
  } = useMutation({ mutationFn });

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

  return { kernelAccount, kernelClient, createAccount, createAccountAsync, ...rest };
};
