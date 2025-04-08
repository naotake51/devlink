"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useState } from "react";
import { signInWithGithub } from "../actions";

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
        Githubでログイン
        {status === "executing" && <LoaderIcon className="animate-spin" />}
      </Button>
    </>
  );
}
