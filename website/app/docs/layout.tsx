import type React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-dark-background">
      <Navbar />
      <div className="flex-1 pt-16">{children}</div>
      <Footer />
    </div>
  );
}
