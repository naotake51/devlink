"use client";

import { signInWithGithub } from "../actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export function SignInWithGithub() {
  const [message, setMessage] = useState<string | null>(null);

  const { execute, status } = useAction(signInWithGithub, {
    onSuccess: ({ data }) => {
      if (data?.failure) {
        setMessage(data.failure);
      }
    },
    onError: () => {
      setMessage("システムエラー");
    },
  });

  const handleSignIn = () => {
    execute();
  };

  return (
    <>
      {message && <div className="text-destructive">{message}</div>}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={status === "executing"}
        onClick={handleSignIn}
      >
        <Image
          src="/github.svg"
          alt="Github"
          className="mr-2 h-4 w-4"
          width={16}
          height={16}
        />
        {status === "executing" ? "Githubでログイン中..." : "Githubでログイン"}
      </Button>
    </>
  );
}
