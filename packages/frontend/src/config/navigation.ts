import { Activity, BookDown, CandlestickChart, Home } from "lucide-react";
export type MenuItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
};

export const menuItems: MenuItem[] = [
  { href: "#", icon: Home, label: "Dashboard" },
  { href: "#", icon: CandlestickChart, label: "Portfolio" },
  { href: "#", icon: BookDown, label: "Depositors" },
  { href: "#", icon: Activity, label: "Activity" },
];
