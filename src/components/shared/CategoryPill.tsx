import { Circle, Lightbulb, Search, SquareCheck, TriangleAlert } from "lucide-react";
import { type ThoughtCategory } from "@/types/navigation";
import { cn } from "@/lib/utils";

const categoryMeta = {
  idea: {
    label: "Idea",
    icon: Lightbulb,
    className: "bg-category-idea/10 text-category-idea",
  },
  problem: {
    label: "Problem",
    icon: TriangleAlert,
    className: "bg-category-problem/10 text-category-problem",
  },
  task: {
    label: "Task",
    icon: SquareCheck,
    className: "bg-category-task/10 text-category-task",
  },
  research: {
    label: "Research",
    icon: Search,
    className: "bg-category-research/10 text-category-research",
  },
  custom: {
    label: "Custom",
    icon: Circle,
    className: "bg-primary/10 text-primary",
  },
} satisfies Record<ThoughtCategory, { label: string; icon: typeof Lightbulb; className: string }>;

type CategoryPillProps = {
  category: ThoughtCategory;
  active?: boolean;
  className?: string;
  label?: string;
};

export function CategoryPill({ category, active = false, className, label }: CategoryPillProps) {
  const meta = categoryMeta[category];
  const Icon = meta.icon;

  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-sm px-3 text-small font-medium transition",
        meta.className,
        active && "ring-2 ring-current/15",
        className,
      )}
    >
      <Icon aria-hidden="true" size={14} strokeWidth={2} />
      {label ?? meta.label}
    </span>
  );
}
