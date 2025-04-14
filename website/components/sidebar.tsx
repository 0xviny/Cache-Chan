"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, ChevronRight } from "lucide-react";

const menuItems = [
  {
    id: "introduction",
    title: "Introdução",
    items: [
      { href: "/docs/introduction/overview", label: "Visão Geral" },
      { href: "/docs/introduction/installation", label: "Instalação" },
      { href: "/docs/introduction/quick-start", label: "Início Rápido" },
    ],
  },
  {
    id: "core-concepts",
    title: "Conceitos Básicos",
    items: [
      { href: "/docs/core-concepts/caching-strategies", label: "Estratégias de Cache" },
      { href: "/docs/core-concepts/lru-cache", label: "Cache LRU" },
      { href: "/docs/core-concepts/ttl", label: "Time-To-Live (TTL)" },
    ],
  },
  {
    id: "integrations",
    title: "Integrações",
    items: [
      { href: "/docs/integrations/redis", label: "Redis" },
      { href: "/docs/integrations/mongodb", label: "MongoDB" },
      { href: "/docs/integrations/api-integration", label: "API REST" },
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    items: [
      { href: "/docs/dashboard/setup", label: "Configuração" },
      { href: "/docs/dashboard/api-keys", label: "API Keys" },
      { href: "/docs/dashboard/metrics", label: "Métricas" },
    ],
  },
];

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  // Determine which accordion items should be open
  const defaultOpen = menuItems
    .filter((item) => item.items.some((sub) => pathname.startsWith(sub.href.split("#")[0])))
    .map((item) => item.id);

  return (
    <div className="md:w-1/4">
      <div className="neumorphism rounded-lg p-4 sticky top-24">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar na documentação..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={defaultOpen}>
          {menuItems.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm py-1 flex items-center ${
                        pathname === item.href
                          ? "text-white font-semibold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      <ChevronRight className="h-3 w-3 mr-1" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
