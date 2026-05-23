import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Sparkles size={20} aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-h3 text-text-primary">{title}</h2>
      <p className="mt-2 max-w-sm text-body text-text-secondary">{description}</p>
    </Card>
  );
}
