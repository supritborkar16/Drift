import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  LogIn,
  LogOut,
  Moon,
  Settings,
  Sun,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useThemeStore } from "@/store/theme-store";

export function ProfileDropdown() {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.currentUser);
  const isOpen = useAuthStore((state) => state.isProfileMenuOpen);
  const toggleProfileMenu = useAuthStore((state) => state.toggleProfileMenu);
  const setProfileMenuOpen = useAuthStore((state) => state.setProfileMenuOpen);
  const signOut = useAuthStore((state) => state.signOut);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setProfileMenuOpen]);

  function close() {
    setProfileMenuOpen(false);
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className="h-10 w-10 rounded-sm border border-border bg-surface shadow-sm outline-none transition hover:-translate-y-0.5 hover:ring-2 hover:ring-primary/20 focus-visible:ring-2 focus-visible:ring-primary/30"
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggleProfileMenu}
      >
        <span className="flex h-full w-full items-center justify-center rounded-sm bg-primary/12 text-small font-semibold text-primary">
          {currentUser?.avatarInitials ?? "?"}
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-12 z-50 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border bg-surface/94 p-2 shadow-lg backdrop-blur-xl"
            role="menu"
          >
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 rounded-md px-3 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/12 text-body font-semibold text-primary">
                    {currentUser?.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-body font-semibold text-text-primary">
                      {currentUser?.name}
                    </p>
                    <p className="truncate text-small text-text-secondary">{currentUser?.email}</p>
                  </div>
                </div>

                <MenuLink to="/profile" icon={<User size={16} />} onClick={close}>
                  Profile
                </MenuLink>
                <MenuLink to="/settings" icon={<Settings size={16} />} onClick={close}>
                  Settings
                </MenuLink>

                <div className="my-2 h-px bg-border" />

                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-body text-text-primary outline-none transition hover:bg-primary/8 focus-visible:ring-2 focus-visible:ring-primary/30"
                  onClick={toggleTheme}
                >
                  <span className="flex items-center gap-3">
                    {isDark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
                    Appearance
                  </span>
                  <span
                    className={cn(
                      "relative h-6 w-11 rounded-full bg-primary/12 transition",
                      isDark && "bg-primary",
                    )}
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        "absolute left-1 top-1 h-4 w-4 rounded-full bg-surface shadow-sm transition",
                        isDark && "translate-x-5",
                      )}
                    />
                  </span>
                </button>

                <MenuLink to="/archive" icon={<Archive size={16} />} onClick={close}>
                  Archive
                </MenuLink>
                <MenuLink to="/bin" icon={<Trash2 size={16} />} onClick={close}>
                  Bin
                </MenuLink>

                <div className="my-2 h-px bg-border" />

                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-body text-category-problem outline-none transition hover:bg-category-problem/10 focus-visible:ring-2 focus-visible:ring-category-problem/20"
                  onClick={() => {
                    signOut();
                    navigate("/login", { replace: true });
                  }}
                >
                  <LogOut size={16} aria-hidden="true" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <MenuLink to="/login" icon={<LogIn size={16} />} onClick={close}>
                  Sign In
                </MenuLink>
                <MenuLink to="/register" icon={<UserPlus size={16} />} onClick={close}>
                  Create Account
                </MenuLink>
              </>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type MenuLinkProps = {
  to: string;
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
};

function MenuLink({ to, icon, children, onClick }: MenuLinkProps) {
  return (
    <Link
      to={to}
      role="menuitem"
      onClick={onClick}
      className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-body text-text-primary outline-none transition hover:bg-primary/8 focus-visible:ring-2 focus-visible:ring-primary/30"
    >
      <span className="text-text-secondary">{icon}</span>
      {children}
    </Link>
  );
}
