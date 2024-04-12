import { Activity, BookDown, CandlestickChart, Home } from "lucide-react";

export type MenuItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
};

export const menuItems: MenuItem[] = [
  { href: "/", icon: Home, label: "Dashboard" },
  { href: "/portfolio", icon: CandlestickChart, label: "Portfolio" },
  { href: "/depositors", icon: BookDown, label: "Depositors" },
  { href: "/activity", icon: Activity, label: "Activity" },
];
