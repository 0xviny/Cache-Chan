"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Database, BarChart3, Settings, Users, LogOut, Menu, X, Key } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = api.getUser();
    setName(user?.name || null);
  }, []);

  const handleLogout = () => {
    api.clearCredentials();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-dark-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-card border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href="/" className="flex items-center">
            <Database className="h-8 w-8 text-purple-neon" />
            <span className="ml-2 text-xl font-bold text-white">CacheChan</span>
          </Link>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="py-4">
          <nav className="px-2 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-purple-neon/10 hover:text-white rounded-md group"
            >
              <BarChart3 className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/api-keys"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-purple-neon/10 hover:text-white rounded-md group"
            >
              <Key className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
              API Keys
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-purple-neon/10 hover:text-white rounded-md group"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
              Configurações
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-purple-neon/10 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>

      <div className="md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 bg-dark-card border-b border-white/10">
          <button
            type="button"
            className="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-neon md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Button variant="ghost" className="flex items-center rounded-full">
                    <span className="h-8 w-8 rounded-full bg-purple-neon/20 flex items-center justify-center text-white text-sm">
                      {name
                        ? name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .substring(0, 2)
                        : "?"}
                    </span>
                    <span className="ml-2 text-sm font-medium text-white">
                      {name || "Carregando..."}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
