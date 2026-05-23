import { type FormEvent, type ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  mode: "login" | "register";
  submitLabel: string;
  footer: ReactNode;
  onSubmit: (email: string, password: string) => void;
};

export function AuthForm({ mode, submitLabel, footer, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords should match.");
      return;
    }

    setError("");
    onSubmit(email.trim(), password);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.14, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <label className="block space-y-2">
        <span className="text-small font-medium text-white/58">Email</span>
        <Input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@drift.app"
          className="h-12 rounded-md border-white/10 bg-white/[0.065] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/32 hover:border-white/18 hover:bg-white/[0.085] focus:border-primary/70 focus:ring-primary/30"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-small font-medium text-white/58">Password</span>
        <Input
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          className="h-12 rounded-md border-white/10 bg-white/[0.065] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/32 hover:border-white/18 hover:bg-white/[0.085] focus:border-primary/70 focus:ring-primary/30"
        />
      </label>

      {mode === "register" ? (
        <label className="block space-y-2">
          <span className="text-small font-medium text-white/58">Confirm password</span>
          <Input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your password"
            className="h-12 rounded-md border-white/10 bg-white/[0.065] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/32 hover:border-white/18 hover:bg-white/[0.085] focus:border-primary/70 focus:ring-primary/30"
          />
        </label>
      ) : null}

      {error ? (
        <p className="rounded-sm border border-category-problem/20 bg-category-problem/10 px-3 py-2 text-small font-medium text-category-problem">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        className="h-12 w-full rounded-md bg-primary text-white shadow-[0_14px_34px_rgba(99,102,241,0.28)] transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_18px_42px_rgba(99,102,241,0.34)]"
      >
        {submitLabel}
      </Button>

      <div className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-small text-white/38">or continue with</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid gap-2 pt-1 sm:grid-cols-2">
        <Button
          type="button"
          variant="secondary"
          className="h-11 rounded-md border-white/10 bg-white/[0.055] text-white/78 shadow-none hover:-translate-y-0.5 hover:bg-white/[0.085]"
        >
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="h-11 rounded-md border border-white/10 bg-transparent text-white/72 hover:-translate-y-0.5 hover:bg-white/[0.07] hover:text-white"
        >
          Continue with Apple
        </Button>
      </div>

      <p className="pt-3 text-center text-body text-white/48">{footer}</p>
    </motion.form>
  );
}

export function AuthLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="font-medium text-white transition hover:text-primary">
      {children}
    </Link>
  );
}
