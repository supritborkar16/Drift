import { Pin, Shapes, Sparkles } from "lucide-react";
import { type ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { useWorkspaceStore } from "@/store/workspace-store";

export function ProfilePage() {
  const user = useAuthStore((state) => state.currentUser);
  const thoughts = useWorkspaceStore((state) => state.thoughts);
  const activeThoughts = thoughts.filter((thought) => !thought.deleted && !thought.archived);
  const activeCategories = new Set(activeThoughts.map((thought) => thought.category)).size;
  const pinnedThoughts = activeThoughts.filter((thought) => thought.pinned).length;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-primary/12 text-h1 text-primary">
            {user?.avatarInitials ?? "A"}
          </div>
          <div className="min-w-0">
            <h1 className="text-display text-text-primary">{user?.name ?? "Arjun"}</h1>
            <p className="mt-1 text-body text-text-secondary">{user?.email ?? "arjun@drift.local"}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <ProfileStat icon={<Sparkles size={18} />} label="Thoughts captured" value={activeThoughts.length} />
        <ProfileStat icon={<Shapes size={18} />} label="Active categories" value={activeCategories} />
        <ProfileStat icon={<Pin size={18} />} label="Pinned thoughts" value={pinnedThoughts} />
      </div>
    </div>
  );
}

type ProfileStatProps = {
  icon: ReactNode;
  label: string;
  value: number;
};

function ProfileStat({ icon, label, value }: ProfileStatProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-primary">{icon}</span>
        <span className="text-h1 text-text-primary">{value}</span>
      </div>
      <p className="mt-4 text-body text-text-secondary">{label}</p>
    </Card>
  );
}
