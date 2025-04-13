"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, ChevronRight } from "lucide-react";

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Menu Lateral */}
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

            <Accordion type="multiple" defaultValue={["getting-started"]}>
              <AccordionItem value="getting-started">
                <AccordionTrigger>Introdução</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/docs#overview"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Visão Geral
                    </Link>
                    <Link
                      href="/docs#installation"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Instalação
                    </Link>
                    <Link
                      href="/docs#quick-start"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Início Rápido
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="core-concepts">
                <AccordionTrigger>Conceitos Básicos</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/docs#caching-strategies"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Estratégias de Cache
                    </Link>
                    <Link
                      href="/docs#lru-cache"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Cache LRU
                    </Link>
                    <Link
                      href="/docs#ttl"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Time-To-Live (TTL)
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="integrations">
                <AccordionTrigger>Integrações</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/docs#redis"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Redis
                    </Link>
                    <Link
                      href="/docs#mongodb"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> MongoDB
                    </Link>
                    <Link
                      href="/docs#api-integration"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> API REST
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dashboard">
                <AccordionTrigger>Dashboard</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/docs#dashboard-setup"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Configuração
                    </Link>
                    <Link
                      href="/docs#api-keys"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> API Keys
                    </Link>
                    <Link
                      href="/docs#metrics"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Métricas
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="md:w-3/4">
          <div className="neumorphism rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6 gradient-text" id="overview">
              Documentação do CacheChan
            </h1>

            {/* Visão Geral */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
              <p className="text-gray-300 mb-4">
                O CacheChan é uma biblioteca para cache distribuído e local em aplicações .NET. Com
                suporte a LRU, TTL e integração com dashboards analíticos, o CacheChan simplifica a
                implementação de estratégias de cache eficientes.
              </p>
              <p className="text-gray-300 mb-4">
                Além das operações de cache, o CacheChan registra automaticamente métricas de uso
                (como hits, misses, set e remove) caso você informe sua API Key. Essa integração
                permite que você visualize o desempenho e a eficiência do cache diretamente na sua
                dashboard.
              </p>
            </section>

            {/* Instalação */}
            <section className="mb-12" id="installation">
              <h2 className="text-2xl font-semibold mb-4">Instalação</h2>
              <p className="text-gray-300 mb-4">
                Instale o CacheChan utilizando o NuGet Package Manager:
              </p>
              <div className="bg-dark-background rounded-md p-4 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>Install-Package CacheChan</code>
                </pre>
              </div>
              <p className="text-gray-300 mb-4">Ou com o .NET CLI:</p>
              <div className="bg-dark-background rounded-md p-4 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>dotnet add package CacheChan</code>
                </pre>
              </div>
            </section>

            {/* Início Rápido */}
            <section className="mb-12" id="quick-start">
              <h2 className="text-2xl font-semibold mb-4">Início Rápido</h2>
              <p className="text-gray-300 mb-4">
                O uso do CacheChan é simples e direto. Ao criar a instância do cache, você pode
                optar por registrar métricas automaticamente. Basta informar sua API Key ao criá-lo
                – se a API Key for fornecida, todas as operações serão registradas; caso contrário,
                o cache funcionará de forma convencional.
              </p>

              <div className="bg-dark-background rounded-md p-4 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>{`// Exemplo de uso em uma aplicação .NET

using CacheChan.Utils;
using CacheChan.Interfaces;

class Program
{
    static void Main()
    {
        // Criar cache com métricas (informa a API Key)
        ICacheService cacheComMetricas = CacheFactory.CreateCache("minha-api-key-123");
        
        // Operações de cache com registro automático das métricas
        cacheComMetricas.Set("user:123", new { Nome = "Vinícius", Idade = 23 });
        var user = cacheComMetricas.Get<dynamic>("user:123");
        cacheComMetricas.Remove("user:123");
        
        // Criar cache sem métricas (não informa a API Key)
        ICacheService cacheSemMetricas = CacheFactory.CreateCache();
        cacheSemMetricas.Set("teste", 42);
        var valor = cacheSemMetricas.Get<int>("teste");
    }
}`}</code>
                </pre>
              </div>

              <p className="text-gray-300 mb-4">
                Em resumo, o usuário só precisa chamar{" "}
                <code className="bg-dark-background px-1 py-0.5 rounded text-purple-neon">
                  CacheFactory.CreateCache()
                </code>
                e, opcionalmente, passar a sua API Key. Se a API Key for informada, todas as
                operações de cache serão registradas automaticamente para exibição na dashboard.
              </p>

              <div className="mt-8">
                <Link href="/docs/advanced">
                  <Button className="bg-purple-neon hover:bg-purple-dark">
                    Continuar para Conceitos Avançados
                  </Button>
                </Link>
              </div>
            </section>

            {/* Seções adicionais podem ser adicionadas conforme necessário */}
            <section className="mb-12" id="metrics">
              <h2 className="text-2xl font-semibold mb-4">Métricas e Integração com Dashboard</h2>
              <p className="text-gray-300 mb-4">
                As métricas são registradas automaticamente via a integração entre o{" "}
                <code>CacheMetricsDecorator</code> e o<code>MetricsService</code> interno da
                biblioteca.
              </p>
              <p className="text-gray-300 mb-4">
                Se o usuário informar sua API Key ao criar a instância do cache, todas as operações
                (como cache set, hit, miss, update e remove) serão acompanhadas e enviadas para o
                banco de dados ou dashboard configurada na aplicação.
              </p>
              <p className="text-gray-300 mb-4">
                Dessa forma, você pode acompanhar o desempenho do cache e tomar decisões de
                escalabilidade e ajustes de desempenho de forma transparente.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
