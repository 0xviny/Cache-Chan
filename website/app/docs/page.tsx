import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />
        <div className="md:w-3/4">
          <div className="neumorphism rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6 gradient-text">Documentação do CacheChan</h1>

            <section className="mb-12" id="overview">
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
                </code>{" "}
                e, opcionalmente, passar a sua API Key. Se a API Key for informada, todas as
                operações de cache serão registradas automaticamente para exibição na dashboard.
              </p>
              <div className="mt-8">
                <Link href="/docs/core-concepts/caching-strategies">
                  <Button className="bg-purple-neon hover:bg-purple-dark">
                    Continuar para Conceitos Básicos
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
