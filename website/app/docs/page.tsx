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

              <AccordionItem value="api-reference">
                <AccordionTrigger>Referência da API</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="/docs#cache-service"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> ICacheService
                    </Link>
                    <Link
                      href="/docs#cache-options"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> CacheOptions
                    </Link>
                    <Link
                      href="/docs#distributed-cache"
                      className="text-sm py-1 text-gray-400 hover:text-white flex items-center"
                    >
                      <ChevronRight className="h-3 w-3 mr-1" /> Cache Distribuído
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

        <div className="md:w-3/4">
          <div className="neumorphism rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6 gradient-text" id="overview">
              Documentação do CacheChan
            </h1>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
              <p className="text-gray-300 mb-4">
                CacheChan é uma biblioteca de cache distribuído e local para aplicações .NET, com
                suporte a LRU, TTL e integração com dashboards analíticos via API Key.
              </p>
              <p className="text-gray-300 mb-4">
                Projetado para ser fácil de usar e altamente configurável, o CacheChan permite que
                você implemente estratégias de cache eficientes em sua aplicação com o mínimo de
                esforço.
              </p>
            </section>

            <section className="mb-12" id="installation">
              <h2 className="text-2xl font-semibold mb-4">Instalação</h2>
              <p className="text-gray-300 mb-4">
                Você pode instalar o CacheChan via NuGet Package Manager:
              </p>

              <div className="bg-dark-background rounded-md p-4 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>Install-Package CacheChan</code>
                </pre>
              </div>

              <p className="text-gray-300 mb-4">Ou usando o .NET CLI:</p>

              <div className="bg-dark-background rounded-md p-4 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>dotnet add package CacheChan</code>
                </pre>
              </div>
            </section>

            <section className="mb-12" id="quick-start">
              <h2 className="text-2xl font-semibold mb-4">Início Rápido</h2>
              <p className="text-gray-300 mb-4">
                Para começar a usar o CacheChan, adicione-o ao seu contêiner de serviços no método
                <code className="bg-dark-background px-1 py-0.5 rounded text-purple-neon">
                  ConfigureServices
                </code>
                :
              </p>

              <div className="bg-dark-background rounded-md p-4 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>{`// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    // Adicionar CacheChan com configuração padrão
    services.AddCacheChan();
    
    // Ou com configurações personalizadas
    services.AddCacheChan(options => {
        options.UseInMemory(); // Cache local
        // ou
        options.UseRedis("sua-connection-string"); // Cache distribuído
        
        options.SetDefaultTTL(TimeSpan.FromMinutes(30));
        options.EnableLRU(maxItems: 1000);
    });
    
    // Outros serviços...
}`}</code>
                </pre>
              </div>

              <p className="text-gray-300 mb-4">
                Agora você pode injetar{" "}
                <code className="bg-dark-background px-1 py-0.5 rounded text-purple-neon">
                  ICacheService
                </code>{" "}
                em suas classes:
              </p>

              <div className="bg-dark-background rounded-md p-4 mb-6">
                <pre className="text-gray-300 overflow-x-auto">
                  <code>{`public class ProductService
{
    private readonly ICacheService _cache;
    
    public ProductService(ICacheService cache)
    {
        _cache = cache;
    }
    
    public async Task<Product> GetProductAsync(int id)
    {
        // Tentar obter do cache primeiro
        var cacheKey = $"product:{id}";
        var product = await _cache.GetAsync<Product>(cacheKey);
        
        if (product == null)
        {
            // Buscar do banco de dados
            product = await _dbContext.Products.FindAsync(id);
            
            // Armazenar no cache
            await _cache.SetAsync(cacheKey, product, TimeSpan.FromHours(1));
        }
        
        return product;
    }
}`}</code>
                </pre>
              </div>

              <div className="mt-8">
                <Link href="/docs/advanced">
                  <Button className="bg-purple-neon hover:bg-purple-dark">
                    Continuar para Conceitos Avançados
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
