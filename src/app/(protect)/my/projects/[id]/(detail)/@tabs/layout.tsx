"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

/**
 * @private
 */
interface TabLayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export default function TabLayout({ children }: TabLayoutProps) {
  const p = useParams();
  const { id } = p;

  const selectedSegment = useSelectedLayoutSegment();

  const basePath = `/my/projects/${id}`;

  const tabs = [
    { label: "概要", segment: "overview" },
    { label: "メンバー", segment: "members" },
    { label: "Dev Point", segment: "dev-point" },
    { label: "Sprint", segment: "sprints" },
    { label: "メッセージ", segment: "threads" },
    { label: "決議", segment: "resolutions" },
    { label: "設定", segment: "settings" },
  ];

  return (
    <Tabs value={selectedSegment ?? undefined}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.segment} value={tab.segment} asChild>
            <Link href={`${basePath}/${tab.segment}`}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}
