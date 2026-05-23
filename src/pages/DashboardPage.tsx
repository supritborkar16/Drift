import { useEffect, useMemo } from "react";
import { CaptureSection } from "@/features/dashboard/CaptureSection";
import { FilterTabs } from "@/features/dashboard/FilterTabs";
import { GreetingSection } from "@/features/dashboard/GreetingSection";
import { SidebarWidgets } from "@/features/dashboard/SidebarWidgets";
import { ThoughtGrid } from "@/features/dashboard/ThoughtGrid";
import { getVisibleThoughts, useWorkspaceStore } from "@/store/workspace-store";
import { type ThoughtCategory } from "@/types/navigation";

type DashboardPageProps = {
  activeCategory?: ThoughtCategory;
};

export function DashboardPage({ activeCategory }: DashboardPageProps) {
  const setActiveCategory = useWorkspaceStore((state) => state.setActiveCategory);
  const allThoughts = useWorkspaceStore((state) => state.thoughts);
  const activeFilter = useWorkspaceStore((state) => state.activeFilter);
  const storeActiveCategory = useWorkspaceStore((state) => state.activeCategory);
  const activeTags = useWorkspaceStore((state) => state.activeTags);
  const searchQuery = useWorkspaceStore((state) => state.searchQuery);
  const thoughts = useMemo(
    () =>
      getVisibleThoughts({
        thoughts: allThoughts,
        activeFilter,
        activeCategory: storeActiveCategory,
        activeTags,
        searchQuery,
      }),
    [activeFilter, activeTags, allThoughts, searchQuery, storeActiveCategory],
  );

  useEffect(() => {
    setActiveCategory(activeCategory);
    return () => setActiveCategory(undefined);
  }, [activeCategory, setActiveCategory]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5 sm:space-y-6">
        <GreetingSection />
        <CaptureSection activeCategory={activeCategory} />
        <FilterTabs />
        <ThoughtGrid
          thoughts={thoughts}
          emptyTitle={searchQuery ? "No matching thoughts" : "No thoughts yet"}
          emptyDescription={
            searchQuery
              ? "Try a softer search term or clear filters to widen the view."
              : "Capture what is on your mind. Drift will keep it light and organized."
          }
        />
      </div>

      <div className="min-w-0 xl:sticky xl:top-28 xl:self-start">
        <SidebarWidgets />
      </div>
    </div>
  );
}
