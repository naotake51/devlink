"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

interface TabNavigationPresentationalProps {
  basePath: string;
  tabs: { label: string; segment: string }[];
}

/**
 * @package
 */
export function TabNavigationPresentational({
  basePath,
  tabs,
}: TabNavigationPresentationalProps) {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <Tabs value={selectedSegment ?? undefined}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.segment} value={tab.segment} asChild>
            <Link href={`${basePath}/${tab.segment}`}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
