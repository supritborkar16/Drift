import { Bell, Menu, Search } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/layout/Logo";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import { cn } from "@/lib/utils";
import { type NavItem } from "@/types/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useWorkspaceStore } from "@/store/workspace-store";

const navItems: NavItem[] = [
  { label: "All Thoughts", path: "/" },
  { label: "Ideas", path: "/ideas" },
  { label: "Problems", path: "/problems" },
  { label: "Tasks", path: "/tasks" },
  { label: "Research", path: "/research" },
];

export function Navbar() {
  const searchQuery = useWorkspaceStore((state) => state.searchQuery);
  const setSearchQuery = useWorkspaceStore((state) => state.setSearchQuery);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const debouncedSearch = useDebouncedValue(localSearch, 140);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center gap-3 rounded-xl border border-border/80 bg-surface/82 px-3 shadow-lg backdrop-blur-xl sm:px-4 lg:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:flex-none">
          <Button className="lg:hidden" variant="icon" size="icon" aria-label="Open navigation">
            <Menu size={18} aria-hidden="true" />
          </Button>
          <Logo />
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn("relative rounded-sm px-3 py-2 text-small font-medium text-text-secondary transition hover:bg-primary/10 hover:text-text-primary", isActive && "bg-primary/10 text-text-primary")
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-sm bg-primary/10"
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden w-full max-w-[260px] items-center md:flex">
          <label className="relative w-full">
            <span className="sr-only">Search thoughts</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
              size={16}
              aria-hidden="true"
            />
            <Input
              className="h-9 rounded-md bg-background/60 pl-9 pr-12"
              placeholder="Search thoughts..."
              value={localSearch}
              onChange={(event) => setLocalSearch(event.target.value)}
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-sm bg-primary/8 px-1.5 py-0.5 text-[10px] font-medium text-text-secondary xl:block">
              Ctrl K
            </kbd>
          </label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="icon" size="icon" aria-label="Notifications">
            <Bell size={18} aria-hidden="true" />
          </Button>
          <ProfileDropdown />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-1 py-3 lg:hidden">
        <nav className="flex gap-2 overflow-x-auto px-1" aria-label="Mobile primary">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "shrink-0 rounded-sm border border-transparent px-3 py-2 text-small font-medium text-text-secondary transition hover:bg-surface",
                  isActive && "bg-primary/10 text-text-primary",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
