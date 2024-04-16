"use client";

import React from "react";
import { Activity, DollarSign, LucideIcon, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <BalanceCard />
      <StatCard title="Validators" icon={Users} mainText="2" />
      <StatCard title="Transactions" icon={Activity} mainText="420" />
    </div>
  );
}

interface StatCardProps {
  title: string;
  icon: LucideIcon;
  mainText: string;
  secondaryText?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, icon: Icon, mainText, secondaryText }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{mainText}</div>
      {secondaryText && <p className="text-xs text-muted-foreground">{secondaryText}</p>}
    </CardContent>
  </Card>
);

import { Erc20Balance } from "@/components/buidl/erc20-balance";
import MockUSDC from "@/config/contracts/MockUSDC";
import { useZeroDevContext } from "@/providers/account-context";

const BalanceCard: React.FC = () => {
  const { kernelAccount } = useZeroDevContext();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Erc20Balance address={MockUSDC.address} account={kernelAccount?.address} />
        </div>
      </CardContent>
    </Card>
  );
};
