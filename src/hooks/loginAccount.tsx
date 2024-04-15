import { useMutation } from "@tanstack/react-query";
import { createKernelAccount } from "@zerodev/sdk";
import { entryPoint, PASSKEY_SERVER_URL } from "../config/settings";
import { getPasskeyValidator } from "@zerodev/passkey-validator";
import { useZeroDevContext } from "../providers/account-context";

export const useLoginAccount = () => {
  const { publicClient, setKernelAccount } = useZeroDevContext();

  const mutationFn = async () => {
    if (!publicClient) throw new Error("Public client not found");

    const passkeyValidator = await getPasskeyValidator(publicClient, {
      passkeyServerUrl: PASSKEY_SERVER_URL,
      entryPoint,
    });

    return createKernelAccount(publicClient, {
      entryPoint,
      plugins: { sudo: passkeyValidator },
    });
  };

  const {
    data: kernelAccount,
    mutate: getAccount,
    mutateAsync: getAccountAsync,
    ...rest
  } = useMutation({ mutationFn, onSuccess: (data) => setKernelAccount(data) });

  return { kernelAccount, getAccount, getAccountAsync, ...rest };
};
