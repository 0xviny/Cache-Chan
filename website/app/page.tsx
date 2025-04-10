import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Database, Clock, Zap, Key, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-background">
      <Navbar />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text animate-fade-up">
                Gerencie seu cache com performance, controle e elegância
              </h1>
              <p
                className="text-gray-300 text-lg mb-8 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                CacheChan é uma biblioteca de cache distribuído e local para aplicações .NET, com
                suporte a LRU, TTL e integração com dashboards analíticos via API Key.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <Link href="/docs">
                  <Button className="bg-purple-neon hover:bg-purple-dark text-white w-full sm:w-auto">
                    Comece agora
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            {/* <div
              className="md:w-1/2 mt-12 md:mt-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative neumorphism rounded-lg p-2 animate-pulse-glow">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Dashboard Preview"
                  width={800}
                  height={600}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="py-16 bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
            Recursos Poderosos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="neumorphism rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Políticas de Expiração</h3>
              <p className="text-gray-400">
                Suporte completo a políticas de expiração configuráveis, incluindo TTL
                (Time-To-Live) para controle preciso da validade dos dados em cache.
              </p>
            </div>

            <div className="neumorphism rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cache de Alta Performance</h3>
              <p className="text-gray-400">
                Implementação LRU (Least Recently Used) e in-memory otimizada para máxima
                performance e eficiência no uso de recursos.
              </p>
            </div>

            <div className="neumorphism rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Key className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">API REST Integrada</h3>
              <p className="text-gray-400">
                API REST completa com autenticação via API Key para integração segura com qualquer
                aplicação ou serviço.
              </p>
            </div>

            <div className="neumorphism rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Integração com Bancos</h3>
              <p className="text-gray-400">
                Suporte nativo para Redis e MongoDB, permitindo escalabilidade horizontal e
                persistência de dados quando necessário.
              </p>
            </div>

            <div className="neumorphism rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dashboard Analítico</h3>
              <p className="text-gray-400">
                Visualize métricas em tempo real, gerencie entradas de cache e monitore a
                performance do seu sistema através de um dashboard intuitivo.
              </p>
            </div>

            <div className="neumorphism rounded-lg p-6 transition-all duration-300 hover:translate-y-[-5px]">
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-neon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">.NET Nativo</h3>
              <p className="text-gray-400">
                Desenvolvido especificamente para o ecossistema .NET, garantindo compatibilidade e
                performance otimizada para suas aplicações.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Fácil de Implementar
              </h2>
              <p className="text-gray-300 mb-6">
                Integre o CacheChan em sua aplicação .NET em minutos com nossa API simples e
                intuitiva. Comece a usar cache distribuído sem complicações.
              </p>
              <Link href="/docs">
                <Button className="bg-purple-neon hover:bg-purple-dark text-white">
                  Ver Documentação
                </Button>
              </Link>
            </div>

            <div className="md:w-1/2 neumorphism rounded-lg overflow-hidden">
              <pre className="language-csharp p-6 text-sm md:text-base overflow-x-auto">
                <code className="text-gray-300">
                  {`// Instalar via NuGet
Install-Package CacheChan

// Configurar no Startup.cs
services.AddCacheChan(options => {
    options.UseRedis("connection-string");
    options.SetDefaultTTL(TimeSpan.FromMinutes(30));
    options.EnableLRU(maxItems: 1000);
});

// Usar em qualquer lugar da aplicação
public class ProductService
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
            await _cache.SetAsync(cacheKey, product, 
                TimeSpan.FromHours(1));
        }
        
        return product;
    }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-dark to-purple-neon">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Pronto para melhorar a performance da sua aplicação?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto">
              Junte-se a centenas de desenvolvedores que já estão usando CacheChan para otimizar
              suas aplicações .NET.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/docs">
                <Button className="bg-white text-purple-dark hover:bg-gray-100 w-full sm:w-auto">
                  Comece agora
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Fale com nossa equipe
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
