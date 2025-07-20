"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSelectedLayoutSegment } from "next/navigation";

interface TwoColumnsLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function TwoColumnsLayout({ left, right }: TwoColumnsLayoutProps) {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <>
      <Card className="p-0 overflow-auto hidden lg:block">
        <CardContent className="flex h-full w-full p-0">
          <div className="w-80 border-r">{left}</div>
          <div className="flex-1">{right}</div>
        </CardContent>
      </Card>
      <Card className="p-0 overflow-auto lg:hidden">
        <CardContent className="flex h-full w-full p-0">
          <div className="w-full">{selectedSegment ? right : left}</div>
        </CardContent>
      </Card>
    </>
  );
}
