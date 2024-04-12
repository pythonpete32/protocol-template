"use client";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { FC } from "react";

export const NotificationButton: FC = () => {
  return (
    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
      <Bell className="h-4 w-4" />
      <span className="sr-only">Toggle notifications</span>
    </Button>
  );
};
