"use client";

import { useState } from "react";
import MainScreen from "./views/main_screen";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [playing, setPlaying] = useState(false);

  const startGame = () => {
    setPlaying(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-8 text-center">
      <h1 className="text-xl font-bold">GUESS THE PROGRAMMING LANGUAGE</h1>

      {playing ? (
        <MainScreen />
      ) : (
        <>
          <p className="pt-4 text-foreground/70 text-center max-w-md">
            Test your knowledge of programming languages by guessing the
            language of the displayed code snippet.
          </p>

          <Button
            onClick={startGame}
            className="mt-4 rounded cursor-pointer bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Start Game
          </Button>
        </>
      )}

      <div className="min-w-[300px]">
        <Separator className="my-4" />
      </div>

      <footer className="text-center text-sm text-foreground/70">
        Made by{" "}
        <Link
          href="https://razvansauciuc.dev"
          className="hover:text-foreground/80 transition ease-in-out duration-300"
        >
          Răzvan Sauciuc
        </Link>
        . All rights reserved.
      </footer>
    </main>
  );
}
