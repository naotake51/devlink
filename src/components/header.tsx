import { Logo } from "@/components/logo";
import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="py-4 px-4 border-b">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Logo size="md" asLink />
        {children}
      </div>
    </header>
  );
}
