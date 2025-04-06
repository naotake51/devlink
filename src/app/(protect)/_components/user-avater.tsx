import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import clsx from "clsx";
import "server-only";

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

export interface UserAvatarProps {
  profileId: string;
}

export async function UserAvatar({ profileId }: UserAvatarProps) {
  const supabase = await createClient();

  /**
   * TODO:: 複数箇所で使用されるようになったら、dataloaderを使って効率的にデータ取得するようにする
   */
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, avatar_url, display_name")
    .eq("id", profileId)
    .single();

  if (!profile) {
    throw new Error("Profile not found");
  }

  const fallbackAvatarInitial = getFallbackAvatarInitial(profile.display_name);
  const fallbackAvatarColorClass = getFallbackAvatarColorClass(profile.id);

  return (
    <Avatar>
      <AvatarImage
        src={profile.avatar_url ?? undefined}
        alt={profile.display_name}
      />
      <AvatarFallback className={clsx("text-white", fallbackAvatarColorClass)}>
        {fallbackAvatarInitial}
      </AvatarFallback>
    </Avatar>
  );
}
