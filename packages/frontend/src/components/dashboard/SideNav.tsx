"use client";
import { useState } from "react";
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { href: "#", icon: Home, label: "Dashboard" },
  { href: "#", icon: ShoppingCart, label: "Orders", badge: 6 },
  { href: "#", icon: Package, label: "Products" },
  { href: "#", icon: Users, label: "Customers" },
  { href: "#", icon: LineChart, label: "Analytics" },
];

export function SideNav() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            activeItem === item.label ? "bg-muted text-primary" : ""
          }`}
          onClick={() => setActiveItem(item.label)}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
          {item.badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center">
              {item.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );
}