import { Filter, Grid2X2, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/workspace-store";
import { type FeedFilter } from "@/types/thought";

const tabs = [
  { label: "Recent", value: "recent" },
  { label: "Pinned", value: "pinned" },
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "Unresolved", value: "unresolved" },
] satisfies Array<{ label: string; value: FeedFilter }>;

export function FilterTabs() {
  const activeFilter = useWorkspaceStore((state) => state.activeFilter);
  const setActiveFilter = useWorkspaceStore((state) => state.setActiveFilter);
  const layoutMode = useWorkspaceStore((state) => state.layoutMode);
  const setLayoutMode = useWorkspaceStore((state) => state.setLayoutMode);
  const setFilterPanelOpen = useWorkspaceStore((state) => state.setFilterPanelOpen);
  const thoughts = useWorkspaceStore((state) => state.thoughts);

  const counts = {
    recent: thoughts.filter((thought) => !thought.archived && !thought.deleted).length,
    pinned: thoughts.filter((thought) => thought.pinned && !thought.archived && !thought.deleted).length,
    today: thoughts.filter((thought) => {
      const created = new Date(thought.createdAt);
      const now = new Date();
      return (
        !thought.archived &&
        !thought.deleted &&
        created.getFullYear() === now.getFullYear() &&
        created.getMonth() === now.getMonth() &&
        created.getDate() === now.getDate()
      );
    }).length,
    week: thoughts.filter((thought) => !thought.archived && !thought.deleted).length,
    unresolved: thoughts.filter(
      (thought) =>
        !thought.archived &&
        !thought.deleted &&
        (thought.category === "problem" || thought.category === "task"),
    ).length,
  } satisfies Record<FeedFilter, number>;

  return (
    <section
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface/78 p-2 shadow-sm backdrop-blur-xl md:flex-row md:items-center md:justify-between"
      aria-label="Thought filters"
    >
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            type="button"
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-2 rounded-sm px-3 text-small font-medium text-text-secondary outline-none transition hover:bg-primary/8 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary/30",
              activeFilter === tab.value && "bg-primary/10 text-primary",
            )}
            aria-pressed={activeFilter === tab.value}
            onClick={() => setActiveFilter(tab.value)}
          >
            {tab.label}
            {counts[tab.value] ? (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] leading-none text-primary">
                {counts[tab.value]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setFilterPanelOpen(true)}>
          <Filter size={15} aria-hidden="true" />
          Filter
        </Button>
        <div className="flex rounded-sm border border-border bg-background/60 p-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", layoutMode === "grid" && "bg-surface")}
            aria-label="Grid layout"
            onClick={() => setLayoutMode("grid")}
          >
            <Grid2X2 size={15} aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", layoutMode === "list" && "bg-surface")}
            aria-label="List layout"
            onClick={() => setLayoutMode("list")}
          >
            <Rows3 size={15} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
