import { Archive, MoreHorizontal, Pencil, Pin, RotateCcw, Save, Trash2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import { CategoryPill } from "@/components/shared/CategoryPill";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getThoughtPreview,
  getThoughtTitle,
  useWorkspaceStore,
} from "@/store/workspace-store";
import { formatThoughtTime } from "@/utils/date";
import { type Thought } from "@/types/thought";

const tintByCategory = {
  idea: "from-category-idea/10 to-surface border-category-idea/15",
  problem: "from-category-problem/12 to-surface border-category-problem/15",
  task: "from-category-task/12 to-surface border-category-task/15",
  research: "from-category-research/12 to-surface border-category-research/15",
  custom: "from-primary/10 to-surface border-primary/15",
} satisfies Record<Thought["category"], string>;

type ThoughtCardProps = {
  thought: Thought;
  mode?: "active" | "archive" | "bin";
};

function ThoughtCardBase({ thought, mode = "active" }: ThoughtCardProps) {
  const togglePin = useWorkspaceStore((state) => state.togglePin);
  const archiveThought = useWorkspaceStore((state) => state.archiveThought);
  const deleteThought = useWorkspaceStore((state) => state.deleteThought);
  const restoreThought = useWorkspaceStore((state) => state.restoreThought);
  const permanentlyDeleteThought = useWorkspaceStore((state) => state.permanentlyDeleteThought);
  const updateThought = useWorkspaceStore((state) => state.updateThought);
  const addTag = useWorkspaceStore((state) => state.addTag);
  const removeTag = useWorkspaceStore((state) => state.removeTag);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(thought.content);
  const [tagDraft, setTagDraft] = useState("");

  const title = getThoughtTitle(thought);
  const preview = getThoughtPreview(thought);

  function saveEdit() {
    if (!draft.trim()) return;
    updateThought(thought.id, { content: draft });
    setIsEditing(false);
  }

  function addDraftTag() {
    if (!tagDraft.trim()) return;
    addTag(thought.id, tagDraft);
    setTagDraft("");
  }

  function handleTagKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addDraftTag();
    }
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "min-h-56 overflow-hidden bg-gradient-to-br p-4 transition duration-200 hover:shadow-md sm:p-5",
          tintByCategory[thought.category],
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <CategoryPill category={thought.category} />
          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Open thought actions">
            <MoreHorizontal size={17} aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-6 space-y-2">
          {isEditing ? (
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-h-28 w-full resize-none rounded-sm border border-border bg-surface/80 p-3 text-body text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              aria-label="Edit thought"
            />
          ) : (
            <>
              <h2 className="text-h3 text-text-primary">{title}</h2>
              <p className="whitespace-pre-line text-body text-text-secondary">{preview}</p>
            </>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {thought.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="inline-flex items-center gap-1 rounded-sm bg-primary/8 px-2 py-1 text-small font-medium text-text-secondary transition hover:bg-primary/12 hover:text-text-primary"
              onClick={() => removeTag(thought.id, tag)}
              aria-label={`Remove ${tag} tag`}
            >
              #{tag}
              <X size={12} aria-hidden="true" />
            </button>
          ))}
          {mode === "active" ? (
            <label className="inline-flex h-7 items-center rounded-sm border border-border bg-surface/70 px-2">
              <span className="sr-only">Add tag</span>
              <input
                value={tagDraft}
                onChange={(event) => setTagDraft(event.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={addDraftTag}
                placeholder="#tag"
                className="w-16 bg-transparent text-small text-text-primary outline-none placeholder:text-text-secondary/60"
              />
            </label>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <time className="text-small text-text-secondary">{formatThoughtTime(thought.createdAt)}</time>
          <div className="flex items-center gap-1">
            {mode === "bin" ? (
              <>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => restoreThought(thought.id)} aria-label="Restore thought">
                  <RotateCcw size={16} aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-category-problem" onClick={() => permanentlyDeleteThought(thought.id)} aria-label="Permanently delete thought">
                  <Trash2 size={16} aria-hidden="true" />
                </Button>
              </>
            ) : mode === "archive" ? (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => restoreThought(thought.id)} aria-label="Restore thought">
                <RotateCcw size={16} aria-hidden="true" />
              </Button>
            ) : (
              <>
                {isEditing ? (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={saveEdit} aria-label="Save thought">
                      <Save size={16} aria-hidden="true" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(false)} aria-label="Cancel edit">
                      <X size={16} aria-hidden="true" />
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)} aria-label="Edit thought">
                    <Pencil size={16} aria-hidden="true" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => archiveThought(thought.id)} aria-label="Archive thought">
                  <Archive size={16} aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-category-problem" onClick={() => deleteThought(thought.id)} aria-label="Delete thought">
                  <Trash2 size={16} aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("h-8 w-8", thought.pinned && "text-primary")}
                  onClick={() => togglePin(thought.id)}
                  aria-label={thought.pinned ? "Unpin thought" : "Pin thought"}
                >
                  <Pin size={16} fill={thought.pinned ? "currentColor" : "none"} aria-hidden="true" />
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export function ThoughtCard(props: ThoughtCardProps) {
  return <ThoughtCardBase {...props} />;
}

export function ProblemCard(props: ThoughtCardProps) {
  return <ThoughtCardBase {...props} />;
}

export function TaskCard(props: ThoughtCardProps) {
  return <ThoughtCardBase {...props} />;
}

export function ResearchCard(props: ThoughtCardProps) {
  return <ThoughtCardBase {...props} />;
}
