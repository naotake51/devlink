import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";

const logoVariants = cva("font-bold", {
  variants: {
    size: {
      sm: "text-lg",
      md: "text-2xl",
      lg: "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface LogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoVariants> {
  asLink?: boolean;
  href?: string;
}

export function Logo({
  className,
  size,
  asLink = false,
  href = "/",
  ...props
}: LogoProps) {
  const logoContent = (
    <div className={cn(logoVariants({ size, className }))} {...props}>
      DevLink
    </div>
  );

  if (asLink) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
}
