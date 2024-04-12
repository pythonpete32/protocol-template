"use client";
import { cn } from "@/lib/utils";
import { FC } from "react";

type MainSectionLayoutProps = {
  title: string;
  children: React.ReactNode;
  centered?: boolean;
};
export const MainSectionLayout: FC<MainSectionLayoutProps> = ({
  title,
  children,
  centered,
}) => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      <div
        className={cn(
          "flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm",
          centered && "items-center",
        )}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          {children}
        </div>
      </div>
    </>
  );
};
