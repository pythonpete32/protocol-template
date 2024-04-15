import { useMutation } from "@tanstack/react-query";
import { createKernelAccount } from "@zerodev/sdk";
import { entryPoint, PASSKEY_SERVER_URL } from "../config/settings";
import { createPasskeyValidator } from "@zerodev/passkey-validator";
import { useZeroDevContext } from "@/providers/account-context";

export const useCreateAccount = () => {
  const { publicClient, setKernelAccount } = useZeroDevContext();

  const mutationFn = async (userName: string) => {
    if (!publicClient) throw new Error("Public client not found");

    const passkeyValidator = await createPasskeyValidator(publicClient, {
      passkeyName: userName,
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
    mutate: createAccount,
    mutateAsync: createAccountAsync,
    ...rest
  } = useMutation({ mutationFn, onSuccess: (data) => setKernelAccount(data) });
  rest.status;

  return { kernelAccount, createAccount, createAccountAsync, ...rest };
};
