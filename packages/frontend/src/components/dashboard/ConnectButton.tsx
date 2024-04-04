"use client";
import { Button } from "@/components/ui/button";
import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import { FC } from "react";
import { Dialog, DialogContentInvisible, DialogTrigger } from "../ui/dialog";

export const ConnectButton: FC<{ className?: string }> = ({ className }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className={className} data-testid="exampleChild">
          Signup or Login
        </Button>
      </DialogTrigger>
      <DialogContentInvisible>
        <DynamicEmbeddedWidget background="default" />
      </DialogContentInvisible>
    </Dialog>
  );
};
