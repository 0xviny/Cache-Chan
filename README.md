# CacheChan.Core

![NuGet](https://img.shields.io/nuget/v/CacheChan.Core?style=flat-square)
![License](https://img.shields.io/github/license/0xviny/Cache-Chan?style=flat-square)

**CacheChan.Core** é uma biblioteca de cache leve e flexível para .NET, com suporte a políticas de expiração, remoção e implementação de LRU (Least Recently Used).

---

## ✨ Recursos

- 🧠 Eviction Policy customizável (padrão LRU)
- ⏱️ TTL (Time to Live) para valores armazenados
- 📈 Métricas integradas de uso (hits, misses, evictions)
- 🧪 Totalmente testável e extensível

---

## 🚀 Instalação

Via NuGet:

```bash
dotnet add package CacheChan.Core
```

---

## 🛠️ Exemplo de Uso

```csharp
var metrics = new MetricsCollector();
var cache = new MemoryCache<string, string>(
    evictionPolicy: new LruEvictionPolicy<string>(),
    metrics: metrics
);

cache.Set("usuario:1", "João", TimeSpan.FromSeconds(10));
var valor = cache.Get("usuario:1");
```

---

## 📦 Pacote NuGet

- [NuGet CacheChan.Core](https://www.nuget.org/packages/CacheChan.Core)

---

## 📄 Licença

MIT © [0xviny](https://github.com/0xviny)