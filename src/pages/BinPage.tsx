import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { ThoughtGrid } from "@/features/dashboard/ThoughtGrid";
import { getDeletedThoughts, useWorkspaceStore } from "@/store/workspace-store";

export function BinPage() {
  const allThoughts = useWorkspaceStore((state) => state.thoughts);
  const thoughts = useMemo(() => getDeletedThoughts({ thoughts: allThoughts }), [allThoughts]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-6">
        <section className="space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-category-problem/10 text-category-problem">
            <Trash2 size={18} aria-hidden="true" />
          </div>
          <h1 className="text-display text-text-primary">Bin</h1>
          <p className="max-w-2xl text-body text-text-secondary">
            Deleted thoughts rest here before they are permanently removed.
          </p>
        </section>

        <ThoughtGrid
          thoughts={thoughts}
          mode="bin"
          emptyTitle="Bin is empty"
          emptyDescription="Soft-deleted thoughts will show up here with restore and permanent delete actions."
        />
      </div>
    </div>
  );
}
