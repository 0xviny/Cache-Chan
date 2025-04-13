# CacheChan.Core

[![NuGet](https://img.shields.io/nuget/v/CacheChan.Core?style=flat-square)](https://www.nuget.org/packages/CacheChan.Core)
[![License](https://img.shields.io/github/license/0xviny/Cache-Chan?style=flat-square)](LICENSE)

**CacheChan.Core** é uma biblioteca de cache leve e extensível para .NET com suporte a TTL, LRU, coleta automática de métricas e uma API simples e intuitiva — tudo isso com apenas uma linha de código.

---

## ✨ Recursos

- 🔐 Suporte opcional a métricas via API Key
- 🧠 Política de Evicção LRU embutida
- ⏱️ TTL (Time To Live) para valores em cache
- 📊 Coleta automática de métricas (hits, misses, evictions)
- 🛠️ API de uso simples com ou sem DI
- 📦 Pronto para produção com extensibilidade

---

## 🚀 Instalação

Instale via NuGet:

```bash
dotnet add package CacheChan.Core
```

---

## ⚡ Uso Rápido

### Criar uma instância de cache com métricas:

```csharp
using CacheChan.Interfaces;
using CacheChan.Utils;

var cache = CacheFactory.CreateCache("sua-api-key-opcional");

cache.Set("usuario:123", new { Nome = "João", Idade = 25 });
var usuario = cache.Get<dynamic>("usuario:123");
cache.Remove("usuario:123");
```

> ✅ Se você fornecer uma API Key, as métricas de uso serão salvas automaticamente para visualização na dashboard.  
> ❌ Sem API Key? Sem problema! O cache ainda funciona normalmente, só não armazenará métricas.

---

## 🧪 Exemplo Sem Métricas (uso interno/local)

```csharp
var cache = CacheFactory.CreateCache(); // ou apenas ""

cache.Set("foo", "bar");
var resultado = cache.Get<string>("foo");
```

---

## Exemplo de Uso

```csharp
using CacheChan.Core.Configuration;
using CacheChan.Core.Interfaces;
using CacheChan.Core.Services;
using CacheChan.Core.Utils;
using System;

namespace CacheChanConsoleExample
{
    class Program
    {
        static void Main(string[] args)
        {
            // Configurações do cache
            var options = new CacheOptions
            {
                UseLru = true,  // Usando LRU
                LruCapacity = 1000,  // Capacidade do LRU
                DefaultExpirationMinutes = 30  // Expiração de 30 minutos
            };

            // Criando o cache manualmente através do CacheFactory
            var cache = CacheFactory.CreateCache(apiKey: "my-api-key", options: options);

            // Usando o cache
            cache.Set("key1", "Hello, CacheChan!");
            var value = cache.Get<string>("key1");

            Console.WriteLine($"Retrieved from cache: {value}");

            // Exemplo de uso com outro valor
            cache.Set("key2", "Goodbye, CacheChan!");
            value = cache.Get<string>("key2");
            Console.WriteLine($"Retrieved from cache: {value}");
        }
    }
}
```

## 📦 Pacote NuGet

- [CacheChan.Core no NuGet](https://www.nuget.org/packages/CacheChan.Core)

---

## 📄 Licença

MIT © [0xviny](https://github.com/0xviny)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [issues abertas](https://github.com/0xviny/Cache-Chan/issues) ou abra uma nova com ideias, bugs ou sugestões.

---

## 🌐 Links Úteis

- [Repositório no GitHub](https://github.com/0xviny/Cache-Chan)
- [Documentação](https://cachechan.vercel.app/)
