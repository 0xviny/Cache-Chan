import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar";

type Subsection = {
  id: string;
  title: string;
  content: string;
  code?: string;
};

type Section = {
  id: string;
  title: string;
  subsections: Subsection[];
};

const sections: Section[] = [
  {
    id: "introduction",
    title: "Introdução",
    subsections: [
      {
        id: "overview",
        title: "Visão Geral",
        content: `
          O CacheChan é uma biblioteca para cache distribuído e local em aplicações .NET. Com suporte a LRU, TTL e integração com dashboards analíticos, o CacheChan simplifica a implementação de estratégias de cache eficientes.

          Além das operações de cache, o CacheChan registra automaticamente métricas de uso (como hits, misses, set e remove) caso você informe sua API Key. Essa integração permite que você visualize o desempenho e a eficiência do cache diretamente na sua dashboard.
        `,
      },
      {
        id: "installation",
        title: "Instalação",
        content: `
          Instale o CacheChan utilizando o NuGet Package Manager ou o .NET CLI.
        `,
        code: `
Install-Package CacheChan

# Ou com .NET CLI
dotnet add package CacheChan
        `,
      },
      {
        id: "quick-start",
        title: "Início Rápido",
        content: `
          O uso do CacheChan é simples e direto. Ao criar a instância do cache, você pode optar por registrar métricas automaticamente. Basta informar sua API Key ao criá-lo – se a API Key for fornecida, todas as operações serão registradas; caso contrário, o cache funcionará de forma convencional.

          Em resumo, o usuário só precisa chamar \`CacheFactory.CreateCache()\` e, opcionalmente, passar a sua API Key. Se a API Key for informada, todas as operações de cache serão registradas automaticamente para exibição na dashboard.
        `,
        code: `
// Exemplo de uso em uma aplicação .NET
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
}
        `,
      },
    ],
  },
  {
    id: "core-concepts",
    title: "Conceitos Básicos",
    subsections: [
      {
        id: "caching-strategies",
        title: "Estratégias de Cache",
        content: `
          CacheChan suporta várias estratégias de cache, incluindo cache local, distribuído e híbrido. Escolher a estratégia certa depende dos requisitos de desempenho e escalabilidade da sua aplicação.

          - Cache Local: Ideal para aplicações single-node com baixa latência.
          - Cache Distribuído: Recomendado para sistemas escaláveis com múltiplos nós.
          - Cache Híbrido: Combina benefícios de ambos para cenários complexos.
        `,
      },
      {
        id: "lru-cache",
        title: "Cache LRU",
        content: `
          O CacheChan implementa um algoritmo Least Recently Used (LRU) para gerenciar entradas no cache. Quando o limite de capacidade é atingido, os itens menos recentemente usados são removidos automaticamente.

          Você pode configurar o tamanho máximo do cache ao inicializar a instância.
        `,
        code: `
ICacheService cache = CacheFactory.CreateCache(maxSize: 1000); // Cache LRU com 1000 itens
cache.Set("key", "value");
        `,
      },
      {
        id: "ttl",
        title: "Time-To-Live (TTL)",
        content: `
          O CacheChan permite definir um tempo de vida (TTL) para cada entrada no cache. Após o período de TTL expirar, a entrada é automaticamente removida.

          Isso é útil para dados que precisam ser atualizados periodicamente, como sessões de usuário ou resultados de consultas temporárias.
        `,
        code: `
ICacheService cache = CacheFactory.CreateCache();
cache.Set("key", "value", TimeSpan.FromMinutes(30)); // Expira em 30 minutos
        `,
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrações",
    subsections: [
      {
        id: "redis",
        title: "Redis",
        content: `
          CacheChan oferece suporte nativo ao Redis como backend de cache distribuído. Para usar o Redis, configure a conexão ao criar a instância do cache.

          O Redis é ideal para aplicações que requerem alta disponibilidade e escalabilidade.
        `,
        code: `
ICacheService cache = CacheFactory.CreateRedisCache("redis://localhost:6379");
cache.Set("key", "value");
        `,
      },
      {
        id: "mongodb",
        title: "MongoDB",
        content: `
          Para cenários onde o cache precisa persistir dados, o CacheChan suporta MongoDB como backend. Isso permite armazenar entradas de cache em coleções MongoDB com índices otimizados.
        `,
        code: `
ICacheService cache = CacheFactory.CreateMongoCache("mongodb://localhost:27017", "cacheDb");
cache.Set("key", "value");
        `,
      },
      {
        id: "api-integration",
        title: "API REST",
        content: `
          CacheChan pode ser integrado a APIs REST para sincronizar dados em cache com serviços externos. Isso é útil para cenários onde o cache precisa refletir dados de um backend remoto.
        `,
        code: `
ICacheService cache = CacheFactory.CreateCache();
cache.Set("key", await FetchFromApi("https://api.example.com/data"));
        `,
      },
    ],
  },
  {
    id: "dashboard",
    title: "Dashboard",
    subsections: [
      {
        id: "setup",
        title: "Configuração",
        content: `
          Para configurar o dashboard do CacheChan, você precisa registrar sua aplicação no portal CacheChan e obter uma API Key. Essa chave será usada para autenticar e enviar métricas ao dashboard.
        `,
        code: `
ICacheService cache = CacheFactory.CreateCache("sua-api-key");
        `,
      },
      {
        id: "api-keys",
        title: "API Keys",
        content: `
          As API Keys são usadas para autenticar sua aplicação com o dashboard CacheChan. Você pode gerar múltiplas chaves para diferentes ambientes (produção, desenvolvimento, etc.).
        `,
      },
      {
        id: "metrics",
        title: "Métricas",
        content: `
          O dashboard exibe métricas detalhadas, incluindo:

          - Cache Hits: Quantidade de vezes que um item foi encontrado no cache.
          - Cache Misses: Quantidade de vezes que um item não foi encontrado.
          - Operações: Total de operações de set, get e remove.

          Essas métricas ajudam a otimizar a configuração do cache.
        `,
      },
    ],
  },
];

export default function SubsectionPage({
  params,
}: {
  params: { section: string; subsection: string };
}) {
  const section = sections.find((s) => s.id === params.section);
  if (!section) {
    notFound();
  }

  const subsection = section.subsections.find((sub) => sub.id === params.subsection);
  if (!subsection) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />
        <div className="md:w-3/4">
          <div className="neumorphism rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-6 gradient-text">{section.title}</h1>
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">{subsection.title}</h2>
              <p className="text-gray-300 mb-4 whitespace-pre-wrap">{subsection.content}</p>
              {subsection.code && (
                <div className="bg-dark-background rounded-md p-4 mb-6">
                  <pre className="text-gray-300 overflow-x-auto">
                    <code>{subsection.code}</code>
                  </pre>
                </div>
              )}
            </section>
            <div className="mt-8">
              <Link href="/docs">
                <Button className="bg-purple-neon hover:bg-purple-dark">
                  Voltar à Documentação
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
