import * as React from "react";
import { formatUnits } from "viem";
import { useBlockNumber, useReadContract } from "wagmi";

import { ErrorMessage } from "@/components/buidl/error-message";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";

const erc20BalanceOfAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const erc20DecimalsAbi = [
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

function trimFormattedBalance(balance: string | undefined, decimals = 4) {
  if (!balance) {
    return "0";
  }
  const [integer, decimal] = balance.split(".");
  if (!decimal) return integer;

  const trimmedDecimal = decimal.slice(0, decimals);
  return `${integer}.${trimmedDecimal}`;
}

export type Erc20BalanceProps = React.HTMLAttributes<HTMLDivElement> & {
  address: `0x${string}`;
  chainId?: number;
  account?: `0x${string}`;
  formatDecimals?: number;
  displayLoading?: boolean;
  displayError?: boolean;
};

const Erc20Balance = React.forwardRef<HTMLDivElement, Erc20BalanceProps>(
  ({ chainId, address, account, formatDecimals = 4, displayLoading = true, displayError = true, ...props }, ref) => {
    const selectedAccount = account;

    const {
      data: decimals,
      isLoading: isLoadingDecimals,
      isError: isErrorDecimals,
      error: errorDecimals,
    } = useReadContract({
      address,
      abi: erc20DecimalsAbi,
      functionName: "decimals",
      chainId: chainId ? Number(chainId) : undefined,
    });

    const {
      data: balance,
      isLoading: isLoadingBalance,
      isError: isErrorBalance,
      error: errorBalance,
      queryKey,
    } = useReadContract({
      address,
      abi: erc20BalanceOfAbi,
      functionName: "balanceOf",
      args: selectedAccount ? [selectedAccount] : undefined,
      chainId,
      query: { enabled: !!selectedAccount },
    });

    // Watch Mode
    const queryClient = useQueryClient();
    const { data: blockNumber } = useBlockNumber({ watch: true });
    React.useEffect(() => {
      queryClient.invalidateQueries({ queryKey });
    }, [blockNumber, queryClient, queryKey]);

    if (displayLoading && (isLoadingDecimals || isLoadingBalance)) {
      return <Skeleton className="h-6 w-16" {...props} />;
    }

    if (displayError && (isErrorDecimals || isErrorBalance)) {
      return (
        <ErrorMessage
          defaultErrorMessage="Error while fetching ERC20 data"
          error={errorDecimals ?? errorBalance}
          {...props}
        />
      );
    }

    if (balance === undefined || decimals === undefined) {
      return null;
    }

    return (
      <div ref={ref} {...props}>
        {trimFormattedBalance(formatUnits(balance, decimals), formatDecimals)}
      </div>
    );
  }
);

Erc20Balance.displayName = "Erc20Balance";

export { Erc20Balance };
