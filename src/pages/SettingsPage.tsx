import { Moon, Settings, SlidersHorizontal, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/theme-store";

const sections = [
  {
    title: "Account",
    description: "Basic identity and session preferences will live here.",
    icon: User,
  },
  {
    title: "Preferences",
    description: "Lightweight workspace defaults for future Drift sessions.",
    icon: SlidersHorizontal,
  },
  {
    title: "Future",
    description: "A calm place for integrations and sync settings when they arrive.",
    icon: Settings,
  },
];

export function SettingsPage() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="space-y-2">
        <h1 className="text-display text-text-primary">Settings</h1>
        <p className="max-w-2xl text-body text-text-secondary">
          Keep Drift quiet, personal, and easy to return to.
        </p>
      </section>

      <Card className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
              <Moon size={18} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-h3 text-text-primary">Appearance</h2>
              <p className="mt-1 text-body text-text-secondary">
                Switch between light and dark without leaving your flow.
              </p>
            </div>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === "dark" ? "Use light" : "Use dark"}
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary/8 text-primary">
                <Icon size={17} aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-h3 text-text-primary">{section.title}</h2>
              <p className="mt-2 text-body text-text-secondary">{section.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
