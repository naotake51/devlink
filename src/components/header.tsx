import { Logo } from "@/components/logo";
import { ReactNode } from "react";

export interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="p-4 border-b">
      <div className="mx-auto flex justify-between items-center">
        <Logo size="md" asLink />
        {children}
      </div>
    </header>
  );
}
