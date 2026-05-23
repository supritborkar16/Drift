import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeJsonStorage } from "@/lib/storage";
import { isSameDay, isWithinLastDays } from "@/utils/date";
import { type ThoughtCategory } from "@/types/navigation";
import { type Category, type FeedFilter, type LayoutMode, type Thought } from "@/types/thought";

const now = new Date();
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

export const defaultCategories: Category[] = [
  { id: "idea", name: "Idea", color: "#8B5CF6", icon: "lightbulb", isDefault: true },
  { id: "problem", name: "Problem", color: "#F87171", icon: "triangle-alert", isDefault: true },
  { id: "task", name: "Task", color: "#14B8A6", icon: "square-check", isDefault: true },
  { id: "research", name: "Research", color: "#3B82F6", icon: "search", isDefault: true },
];

const seedThoughts: Thought[] = [
  {
    id: "habit-coach",
    content:
      "AI habit coach\nAn assistant that notices daily patterns and suggests one tiny improvement at a time. #habits #ideas",
    category: "idea",
    tags: ["habits", "ideas"],
    pinned: true,
    archived: false,
    deleted: false,
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
  },
  {
    id: "afternoon-focus",
    content:
      "Focus drops in the afternoon\nNeed a system to preserve energy after lunch without adding more rituals. #energy",
    category: "problem",
    tags: ["energy"],
    pinned: false,
    archived: false,
    deleted: false,
    createdAt: hoursAgo(3),
    updatedAt: hoursAgo(3),
  },
  {
    id: "design-feedback",
    content:
      "Respond to design feedback\nCheck the latest comments and decide which changes belong in this cycle. #design",
    category: "task",
    tags: ["design"],
    pinned: true,
    archived: false,
    deleted: false,
    createdAt: hoursAgo(4),
    updatedAt: hoursAgo(4),
  },
  {
    id: "calendar-patterns",
    content:
      "Calendar friction patterns\nReview lightweight scheduling tools and note how they reduce choice overload. #research",
    category: "research",
    tags: ["research"],
    pinned: false,
    archived: false,
    deleted: false,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: "weekly-review",
    content:
      "Gentle weekly review\nA short reflection flow that surfaces drift without making planning feel heavy. #reflection",
    category: "idea",
    tags: ["reflection"],
    pinned: false,
    archived: false,
    deleted: false,
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
];

type WorkspaceState = {
  thoughts: Thought[];
  categories: Category[];
  activeFilter: FeedFilter;
  activeCategory?: ThoughtCategory;
  activeTags: string[];
  layoutMode: LayoutMode;
  searchQuery: string;
  isFilterPanelOpen: boolean;
  createThought: (input: { content: string; category: ThoughtCategory; tags?: string[] }) => Thought | null;
  updateThought: (id: string, updates: Partial<Pick<Thought, "content" | "category" | "tags">>) => void;
  deleteThought: (id: string) => void;
  permanentlyDeleteThought: (id: string) => void;
  restoreThought: (id: string) => void;
  archiveThought: (id: string) => void;
  pinThought: (id: string) => void;
  togglePin: (id: string) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
  createCategory: (category: Omit<Category, "id" | "isDefault"> & { id?: string }) => void;
  updateCategory: (id: string, updates: Partial<Omit<Category, "id" | "isDefault">>) => void;
  setActiveFilter: (filter: FeedFilter) => void;
  setActiveCategory: (category?: ThoughtCategory) => void;
  toggleTagFilter: (tag: string) => void;
  setLayoutMode: (mode: LayoutMode) => void;
  setSearchQuery: (query: string) => void;
  setFilterPanelOpen: (open: boolean) => void;
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      thoughts: seedThoughts,
      categories: defaultCategories,
      activeFilter: "recent",
      activeCategory: undefined,
      activeTags: [],
      layoutMode: "grid",
      searchQuery: "",
      isFilterPanelOpen: false,
      createThought: ({ content, category, tags }) => {
        const trimmed = content.trim();
        if (!trimmed) {
          return null;
        }

        const timestamp = new Date().toISOString();
        const thought: Thought = {
          id: createId(),
          content: trimmed,
          category,
          tags: normalizeTags([...(tags ?? []), ...extractTags(trimmed)]),
          pinned: false,
          archived: false,
          deleted: false,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        set((state) => ({ thoughts: [thought, ...state.thoughts] }));
        return thought;
      },
      updateThought: (id, updates) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id
              ? {
                  ...thought,
                  ...updates,
                  tags: updates.tags ? normalizeTags(updates.tags) : thought.tags,
                  updatedAt: new Date().toISOString(),
                }
              : thought,
          ),
        })),
      deleteThought: (id) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id
              ? { ...thought, deleted: true, archived: false, updatedAt: new Date().toISOString() }
              : thought,
          ),
        })),
      permanentlyDeleteThought: (id) =>
        set((state) => ({ thoughts: state.thoughts.filter((thought) => thought.id !== id) })),
      restoreThought: (id) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id
              ? { ...thought, deleted: false, archived: false, updatedAt: new Date().toISOString() }
              : thought,
          ),
        })),
      archiveThought: (id) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id
              ? { ...thought, archived: true, deleted: false, updatedAt: new Date().toISOString() }
              : thought,
          ),
        })),
      pinThought: (id) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id ? { ...thought, pinned: true, updatedAt: new Date().toISOString() } : thought,
          ),
        })),
      togglePin: (id) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id
              ? { ...thought, pinned: !thought.pinned, updatedAt: new Date().toISOString() }
              : thought,
          ),
        })),
      addTag: (id, tag) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id
              ? { ...thought, tags: normalizeTags([...thought.tags, tag]), updatedAt: new Date().toISOString() }
              : thought,
          ),
        })),
      removeTag: (id, tag) =>
        set((state) => ({
          thoughts: state.thoughts.map((thought) =>
            thought.id === id
              ? {
                  ...thought,
                  tags: thought.tags.filter((item) => item !== normalizeTag(tag)),
                  updatedAt: new Date().toISOString(),
                }
              : thought,
          ),
        })),
      createCategory: (category) =>
        set((state) => ({
          categories: state.categories.some((item) => item.id === category.id)
            ? state.categories
            : [
                ...state.categories,
                {
              id: category.id ?? createId(),
                  name: category.name,
                  color: category.color,
                  icon: category.icon,
                  isDefault: false,
                },
              ],
        })),
      updateCategory: (id, updates) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...updates } : category,
          ),
        })),
      setActiveFilter: (activeFilter) => set({ activeFilter }),
      setActiveCategory: (activeCategory) => set({ activeCategory }),
      toggleTagFilter: (tag) =>
        set((state) => {
          const normalized = normalizeTag(tag);
          return {
            activeTags: state.activeTags.includes(normalized)
              ? state.activeTags.filter((item) => item !== normalized)
              : [...state.activeTags, normalized],
          };
        }),
      setLayoutMode: (layoutMode) => set({ layoutMode }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterPanelOpen: (isFilterPanelOpen) => set({ isFilterPanelOpen }),
    }),
    {
      name: "drift-workspace",
      storage: safeJsonStorage,
      partialize: (state) => ({
        thoughts: state.thoughts,
        categories: state.categories,
        activeFilter: state.activeFilter,
        activeCategory: state.activeCategory,
        activeTags: state.activeTags,
        layoutMode: state.layoutMode,
        searchQuery: state.searchQuery,
      }),
    },
  ),
);

type VisibleThoughtInput = Pick<
  WorkspaceState,
  "thoughts" | "activeCategory" | "activeFilter" | "activeTags" | "searchQuery"
>;

type ThoughtListInput = Pick<WorkspaceState, "thoughts">;

export function getVisibleThoughts(state: VisibleThoughtInput) {
  return sortThoughts(
    state.thoughts.filter((thought) => {
      if (thought.deleted || thought.archived) return false;
      if (state.activeCategory && thought.category !== state.activeCategory) return false;
      if (!matchesFilter(thought, state.activeFilter)) return false;
      if (!matchesSearch(thought, state.searchQuery)) return false;
      if (!state.activeTags.every((tag) => thought.tags.includes(tag))) return false;
      return true;
    }),
  );
}

export function selectVisibleThoughts(state: WorkspaceState) {
  return getVisibleThoughts(state);
}

export function getArchivedThoughts(state: ThoughtListInput) {
  return sortThoughts(state.thoughts.filter((thought) => thought.archived && !thought.deleted));
}

export function selectArchivedThoughts(state: WorkspaceState) {
  return getArchivedThoughts(state);
}

export function getDeletedThoughts(state: ThoughtListInput) {
  return sortThoughts(state.thoughts.filter((thought) => thought.deleted));
}

export function selectDeletedThoughts(state: WorkspaceState) {
  return getDeletedThoughts(state);
}

export function getPinnedThoughts(state: ThoughtListInput) {
  return sortThoughts(state.thoughts.filter((thought) => thought.pinned && !thought.archived && !thought.deleted));
}

export function selectPinnedThoughts(state: WorkspaceState) {
  return getPinnedThoughts(state);
}

export function getUnresolvedThoughts(state: ThoughtListInput) {
  return sortThoughts(
    state.thoughts.filter(
      (thought) =>
        !thought.archived &&
        !thought.deleted &&
        (thought.category === "problem" || thought.category === "task"),
    ),
  );
}

export function selectUnresolvedThoughts(state: WorkspaceState) {
  return getUnresolvedThoughts(state);
}

export function getThoughtTitle(thought: Thought) {
  return thought.content.split("\n").find(Boolean)?.replace(/^#+\s*/, "") ?? "Untitled thought";
}

export function getThoughtPreview(thought: Thought) {
  const lines = thought.content.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.slice(1).join(" ") || lines[0] || "";
}

function matchesFilter(thought: Thought, filter: FeedFilter) {
  const createdAt = new Date(thought.createdAt);

  if (filter === "pinned") return thought.pinned;
  if (filter === "today") return isSameDay(createdAt, new Date());
  if (filter === "week") return isWithinLastDays(thought.createdAt, 7);
  if (filter === "unresolved") return thought.category === "problem" || thought.category === "task";
  return true;
}

function matchesSearch(thought: Thought, query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  return (
    thought.content.toLowerCase().includes(normalized) ||
    thought.tags.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

function sortThoughts(thoughts: Thought[]) {
  return [...thoughts].sort((left, right) => {
    if (left.pinned !== right.pinned) return left.pinned ? -1 : 1;
    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
  });
}

function extractTags(content: string) {
  return Array.from(content.matchAll(/#([\w-]+)/g)).map((match) => match[1]);
}

function normalizeTags(tags: string[]) {
  return Array.from(new Set(tags.map(normalizeTag).filter(Boolean)));
}

function normalizeTag(tag: string) {
  return tag.trim().replace(/^#/, "").toLowerCase();
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `thought-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
