import {
  ProblemCard,
  ResearchCard,
  TaskCard,
  ThoughtCard,
} from "@/features/dashboard/ThoughtCard";
import { EmptyState } from "@/features/dashboard/EmptyState";
import { useWorkspaceStore } from "@/store/workspace-store";
import { type Thought } from "@/types/thought";
import { cn } from "@/lib/utils";

type ThoughtGridProps = {
  thoughts: Thought[];
  mode?: "active" | "archive" | "bin";
  emptyTitle?: string;
  emptyDescription?: string;
};

export function ThoughtGrid({
  thoughts,
  mode = "active",
  emptyTitle = "No thoughts yet",
  emptyDescription = "Capture your first thought and Drift will keep it close.",
}: ThoughtGridProps) {
  const layoutMode = useWorkspaceStore((state) => state.layoutMode);

  if (thoughts.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <section
      aria-label="Thought feed"
      className={cn(
        "grid gap-4",
        layoutMode === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1",
      )}
    >
      {thoughts.map((thought) => {
        if (thought.category === "problem") {
          return <ProblemCard key={thought.id} thought={thought} mode={mode} />;
        }

        if (thought.category === "task") {
          return <TaskCard key={thought.id} thought={thought} mode={mode} />;
        }

        if (thought.category === "research") {
          return <ResearchCard key={thought.id} thought={thought} mode={mode} />;
        }

        return <ThoughtCard key={thought.id} thought={thought} mode={mode} />;
      })}
    </section>
  );
}
