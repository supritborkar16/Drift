import { type ReactNode } from "react";
import { motion } from "framer-motion";

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthLayout({ eyebrow, title, description, children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070A18] px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(99,102,241,0.32),transparent_32rem),radial-gradient(circle_at_78%_24%,rgba(139,92,246,0.24),transparent_30rem),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.12),transparent_34rem)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08),transparent_34%,rgba(99,102,241,0.08)_68%,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.44)_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:42px_42px]" />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.34, ease: "easeOut" }}
        className="relative w-full max-w-5xl"
      >
        <div className="absolute -inset-px rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(99,102,241,0.22),rgba(255,255,255,0.06))] opacity-80 blur-[0.5px]" />
        <motion.section
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative grid min-h-[640px] overflow-hidden rounded-[28px] border border-white/14 bg-[#111426]/72 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl lg:grid-cols-[1.03fr_0.97fr]"
          aria-labelledby="auth-title"
        >
          <div className="relative hidden overflow-hidden border-r border-white/10 bg-[#101324] p-8 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(139,92,246,0.42),transparent_22rem),linear-gradient(150deg,rgba(99,102,241,0.5),rgba(8,12,28,0.78)_54%,rgba(7,10,24,1))]" />
            <div className="absolute left-10 right-10 top-12 h-52 rounded-full bg-primary/25 blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-56 bg-[linear-gradient(180deg,transparent,rgba(7,10,24,0.94))]" />
            <div className="relative flex h-full flex-col justify-between">
              <AuthLogo />
              <div className="space-y-5">
                <div className="h-px w-24 bg-white/22" />
                <p className="max-w-sm text-h2 font-semibold text-white">
                  A quiet surface for thoughts before they become work.
                </p>
                <p className="max-w-sm text-body text-white/58">
                  Drift keeps capture light, calm, and close to the moment.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center p-5 sm:p-8 lg:p-10">
            <div className="absolute inset-x-8 top-10 h-28 rounded-full bg-primary/12 blur-3xl" />
            <div className="relative w-full max-w-md">
              <div className="mb-10 flex items-center justify-between lg:hidden">
                <AuthLogo />
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-small font-medium text-white/72 shadow-sm backdrop-blur-xl">
                  {eyebrow}
                </span>
              </div>

              <div className="hidden lg:mb-10 lg:flex lg:justify-end">
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-small font-medium text-white/72 shadow-sm backdrop-blur-xl">
                  {eyebrow}
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.08, ease: "easeOut" }}
                className="space-y-3"
              >
                <h1 id="auth-title" className="text-[32px] font-semibold leading-[38px] tracking-normal text-white sm:text-[38px] sm:leading-[44px]">
                  {title}
                </h1>
                <p className="max-w-sm text-body text-white/58">{description}</p>
              </motion.div>

              <div className="mt-8">{children}</div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}

function AuthLogo() {
  return (
    <div className="group flex items-center gap-3" aria-label="Drift">
      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-primary/25">
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-6 w-6">
          <path
            d="M6 18.4c3.4-8.7 7-8.6 10.6.2 2.2 5.4 5.1 5.2 8.7-.6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3.5"
          />
        </svg>
      </div>
      <span className="text-h3 font-semibold text-white">Drift</span>
    </div>
  );
}
