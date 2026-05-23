import { Command, Plus, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import { CategoryPill } from "@/components/shared/CategoryPill";
import { Button } from "@/components/ui/button";
import { type ThoughtCategory } from "@/types/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/workspace-store";

type CaptureSectionProps = {
  activeCategory?: ThoughtCategory;
};

export function CaptureSection({ activeCategory }: CaptureSectionProps) {
  const createThought = useWorkspaceStore((state) => state.createThought);
  const createCategory = useWorkspaceStore((state) => state.createCategory);
  const categories = useWorkspaceStore((state) => state.categories);
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ThoughtCategory>(activeCategory ?? "idea");
  const [error, setError] = useState("");
  const [captureKey, setCaptureKey] = useState(0);

  const activeSelection = activeCategory ?? selectedCategory;

  function handleCapture() {
    const thought = createThought({ content, category: activeSelection });
    if (!thought) {
      setError("Write a thought first.");
      return;
    }

    setContent("");
    setError("");
    setCaptureKey((value) => value + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleCapture();
    }
  }

  return (
    <motion.section
      key={captureKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
      aria-label="Capture a thought"
      className="rounded-xl border border-border bg-surface/88 p-4 shadow-md backdrop-blur-xl transition focus-within:border-primary/60 focus-within:shadow-lg sm:p-5"
    >
      <label className="block">
        <span className="sr-only">Write a thought</span>
        <textarea
          rows={5}
          placeholder="Write a thought..."
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
            if (error) setError("");
          }}
          onKeyDown={handleKeyDown}
          className="min-h-32 w-full resize-none border-0 bg-transparent text-h3 font-medium text-text-primary outline-none placeholder:text-text-secondary/65"
        />
      </label>
      {error ? <p className="mt-2 text-small font-medium text-category-problem">{error}</p> : null}

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={cn(
                "rounded-sm outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary/30",
              )}
              onClick={() => setSelectedCategory(category.id as ThoughtCategory)}
              aria-pressed={activeSelection === category.id}
              disabled={Boolean(activeCategory && activeCategory !== category.id)}
            >
              <CategoryPill
                category={category.id as ThoughtCategory}
                active={activeSelection === category.id}
                label={category.name}
              />
            </button>
          ))}
          <Button
            variant="secondary"
            size="sm"
            aria-label="Add category"
            onClick={() => {
              createCategory({
                id: "custom",
                name: "Custom",
                color: "#6366F1",
                icon: "circle",
              });
              setSelectedCategory("custom");
            }}
          >
            <Plus size={15} aria-hidden="true" />
            Add category
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary/8 px-2.5 py-1.5 text-small font-medium text-text-secondary">
            <Command size={13} aria-hidden="true" />
            Enter
          </span>
          <Button className="min-w-28 shadow-md" onClick={handleCapture}>
            Capture
            <Send size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
