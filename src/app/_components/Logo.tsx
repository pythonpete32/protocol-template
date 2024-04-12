"use client";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

export const Logo: FC = () => (
  <Link href="/" className="flex items-center gap-2 font-semibold">
    <Package2 className="h-6 w-6" />
    <span className="">Acme Inc</span>
  </Link>
);
