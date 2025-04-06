"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectSearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    if (searchQuery.trim()) {
      searchParams.set("q", searchQuery);
    }

    router.push(`/projects?${searchParams.toString()}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="プロジェクト名で検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="cursor-pointer">
          検索
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}
