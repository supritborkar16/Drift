import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";

export function AppShell() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <Container className="py-5 sm:py-7 lg:py-8">
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="min-w-0"
        >
          <Outlet />
        </motion.main>
      </Container>
    </div>
  );
}
