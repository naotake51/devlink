"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilePenLineIcon } from "lucide-react";
import { useState } from "react";
import { ProjectApplicationForm } from "./project-application-form";

interface ProjectApplicationModalProps {
  project: {
    id: string;
  };
}

export function ProjectApplicationModal({
  project,
}: ProjectApplicationModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          応募
          <FilePenLineIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-2xl lg:min-w-3xl xl:min-w-4xl">
        <DialogHeader>
          <DialogTitle>プロジェクトに応募する</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ProjectApplicationForm
          project={project}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
