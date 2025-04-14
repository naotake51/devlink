"use client";

import { Input } from "@/components/ui/input";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

export interface DateInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange"> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <Input
        type="date"
        ref={ref}
        value={value ? value.toISOString().split("T")[0] : ""}
        onChange={(e) => {
          const value = e.target.value;
          onChange?.(value ? new Date(value) : null);
        }}
        {...props}
      />
    );
  },
);

DateInput.displayName = "DateInput";
