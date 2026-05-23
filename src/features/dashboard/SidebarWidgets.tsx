import { ArrowUpRight, Circle, Pin } from "lucide-react";
import { type ReactNode } from "react";
import { CategoryPill } from "@/components/shared/CategoryPill";
import { Card } from "@/components/ui/card";
import {
  getPinnedThoughts,
  getThoughtTitle,
  getUnresolvedThoughts,
  useWorkspaceStore,
} from "@/store/workspace-store";
import { defaultCategories } from "@/store/workspace-store";
import { formatThoughtTime } from "@/utils/date";
import { useMemo } from "react";

export function SidebarWidgets() {
  const thoughts = useWorkspaceStore((state) => state.thoughts);
  const pinned = useMemo(() => getPinnedThoughts({ thoughts }).slice(0, 3), [thoughts]);
  const unresolved = useMemo(() => getUnresolvedThoughts({ thoughts }).slice(0, 3), [thoughts]);
  const activeThoughts = thoughts.filter((thought) => !thought.archived && !thought.deleted);

  return (
    <aside className="space-y-4" aria-label="Dashboard sidebar">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-h3 text-text-primary">Daily Stats</p>
            <p className="mt-1 text-small text-text-secondary">Captured today</p>
          </div>
          <span className="rounded-sm bg-primary/10 px-2.5 py-1 text-small font-semibold text-primary">
            {activeThoughts.length}
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {defaultCategories.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3">
              <CategoryPill
                category={item.id as "idea" | "problem" | "task" | "research"}
                label={item.id === "research" ? "Research" : `${item.name}s`}
              />
              <span className="text-body font-semibold text-text-primary">
                {activeThoughts.filter((thought) => thought.category === item.id).length}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <WidgetHeader title="Pinned Thoughts" icon={<Pin size={15} aria-hidden="true" />} />
        <div className="mt-4 space-y-3">
          {pinned.length ? pinned.map((thought) => (
            <MiniThought key={thought.id} title={getThoughtTitle(thought)} timestamp={formatThoughtTime(thought.createdAt)} />
          )) : <p className="text-body text-text-secondary">Pinned thoughts will wait here.</p>}
        </div>
      </Card>

      <Card className="p-5">
        <WidgetHeader title="Unresolved" icon={<Circle size={15} aria-hidden="true" />} />
        <div className="mt-4 space-y-3">
          {unresolved.length ? unresolved.map((thought) => (
            <MiniThought key={thought.id} title={getThoughtTitle(thought)} timestamp={formatThoughtTime(thought.createdAt)} />
          )) : <p className="text-body text-text-secondary">Nothing unresolved right now.</p>}
        </div>
      </Card>

      <Card className="bg-primary/8 p-5">
        <p className="text-h3 text-text-primary">
          One thought at a time,
          <br />
          clarity finds you.
        </p>
        <p className="mt-3 text-small text-text-secondary">A quiet place to let work become legible.</p>
      </Card>
    </aside>
  );
}

type WidgetHeaderProps = {
  title: string;
  icon: ReactNode;
};

function WidgetHeader({ title, icon }: WidgetHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-h3 text-text-primary">
        <span className="text-primary">{icon}</span>
        {title}
      </div>
      <ArrowUpRight size={15} className="text-text-secondary" aria-hidden="true" />
    </div>
  );
}

type MiniThoughtProps = {
  title: string;
  timestamp: string;
};

function MiniThought({ title, timestamp }: MiniThoughtProps) {
  return (
    <div className="rounded-sm border border-border bg-background/55 p-3 transition hover:bg-surface">
      <p className="line-clamp-1 text-body font-medium text-text-primary">{title}</p>
      <p className="mt-1 text-small text-text-secondary">{timestamp}</p>
    </div>
  );
}
