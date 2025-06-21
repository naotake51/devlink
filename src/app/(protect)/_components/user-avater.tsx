import { Prisma } from "@/__generated__/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import "server-only";

export const profileSelectForUserAvatar = {
  id: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.ProfileSelect;

type ProfilePayloadForUserAvatar = Prisma.ProfileGetPayload<{
  select: typeof profileSelectForUserAvatar;
}>;

const getFallbackAvatarInitial = (displayName: string) =>
  displayName.charAt(0).toUpperCase() ?? "U";

const getFallbackAvatarColorClass = (id: string): string => {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
  ];
  let hashCode = 0;
  for (let i = 0; i < id.length; i++) {
    hashCode += id.charCodeAt(i);
  }
  const index = hashCode % colors.length;
  return colors[index];
};

const userAvatarVariants = cva("", {
  variants: {
    size: {
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface UserAvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userAvatarVariants> {
  profile: ProfilePayloadForUserAvatar;
}

export async function UserAvatar({
  className,
  size,
  profile,
}: UserAvatarProps) {
  return (
    <Avatar className={cn(userAvatarVariants({ size, className }))}>
      <AvatarImage
        src={profile.avatarUrl ?? undefined}
        alt={profile.displayName}
      />
      <AvatarFallback asChild>
        {profile.avatarUrl ? (
          <Skeleton />
        ) : (
          <div
            className={clsx(
              "text-white",
              getFallbackAvatarColorClass(profile.id),
            )}
          >
            {getFallbackAvatarInitial(profile.displayName)}
          </div>
        )}
      </AvatarFallback>
    </Avatar>
  );
}
