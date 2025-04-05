import { ReactNode } from "react";
import "server-only";

export interface AppHeaderProps {
  children?: ReactNode;
}

export function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="py-4 px-4 border-b">
      <div className="mx-auto flex justify-between items-center">
        {children}
      </div>
    </header>
  );
}
