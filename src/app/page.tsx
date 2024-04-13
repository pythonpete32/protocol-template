"use client";

import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export function Home() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "apps",
    },
    {
      text: "with",
    },
    {
      text: "Protocol",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Template.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Button asChild size="lg">
          <Link href="/login">Signup / Signin</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
