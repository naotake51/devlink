"use client";

import { Button } from "@/components/ui/button";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useState } from "react";
import { signInWithGmail } from "../actions";

export function SignInWithGmail() {
  const [message, setMessage] = useState<string | null>(null);

  const { execute, status } = useAction(signInWithGmail, {
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
          src="/gmail.svg"
          alt="Gmail"
          className="mr-2 h-4 w-4"
          width={16}
          height={16}
        />
        {status === "executing" ? "Gmailでログイン中..." : "Gmailでログイン"}
      </Button>
    </>
  );
}
