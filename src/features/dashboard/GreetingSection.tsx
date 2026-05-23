import { motion } from "framer-motion";

export function GreetingSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="space-y-2"
      aria-labelledby="dashboard-greeting"
    >
      <p className="text-body font-medium text-text-secondary">Good evening, Arjun ✨</p>
      <h1 id="dashboard-greeting" className="max-w-3xl text-display tracking-normal text-text-primary">
        What's on your mind?
      </h1>
    </motion.section>
  );
}
