import { type ThoughtCategory } from "@/types/navigation";

export type Thought = {
  id: string;
  content: string;
  category: ThoughtCategory;
  tags: string[];
  pinned: boolean;
  archived: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: ThoughtCategory | string;
  name: string;
  color: string;
  icon: string;
  isDefault: boolean;
};

export type FeedFilter = "recent" | "pinned" | "today" | "week" | "unresolved";

export type LayoutMode = "grid" | "list";
