import { Archive } from "lucide-react";
import { useMemo } from "react";
import { ThoughtGrid } from "@/features/dashboard/ThoughtGrid";
import { getArchivedThoughts, useWorkspaceStore } from "@/store/workspace-store";

export function ArchivePage() {
  const allThoughts = useWorkspaceStore((state) => state.thoughts);
  const thoughts = useMemo(() => getArchivedThoughts({ thoughts: allThoughts }), [allThoughts]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-6">
        <section className="space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Archive size={18} aria-hidden="true" />
          </div>
          <h1 className="text-display text-text-primary">Archive</h1>
          <p className="max-w-2xl text-body text-text-secondary">
            Quiet storage for thoughts you want out of the main flow without losing their shape.
          </p>
        </section>

        <ThoughtGrid
          thoughts={thoughts}
          mode="archive"
          emptyTitle="Archive is clear"
          emptyDescription="Archived thoughts will appear here when you move them out of your active workspace."
        />
      </div>
    </div>
  );
}
