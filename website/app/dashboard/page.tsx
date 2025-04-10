"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Database, Clock, Zap, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface Metrics {
  totalRequests: number;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
}

interface CacheItem {
  key: string;
  type: string;
  size: string;
  ttl?: number | null;
  created: string;
  status: string;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [previousMetrics, setPreviousMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentCacheEntries, setRecentCacheEntries] = useState<CacheItem[]>([]);
  const { toast } = useToast();

  const loadMetrics = async () => {
    setIsLoading(true);
    try {
      const response = await api.getMetrics();

      if (response.success && response.data) {
        setPreviousMetrics(metrics);
        setMetrics(response.data);
      } else {
        toast({
          title: "Erro ao carregar métricas",
          description: response.error || "Não foi possível carregar as métricas. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar métricas",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCacheItems = async () => {
    try {
      const response = await api.listCacheItems();

      if (response.success && response.data) {
        setRecentCacheEntries(response.data);
      } else {
        console.error("Erro ao carregar itens do cache:", response.error);
      }
    } catch (error) {
      console.error("Erro ao carregar itens do cache:", error);
    }
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  useEffect(() => {
    loadMetrics();
    loadCacheItems();

    const intervalId = setInterval(() => {
      loadMetrics();
      loadCacheItems();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const getTrendColor = (percentage: number) => {
    if (percentage > 0) return "text-green-500";
    if (percentage < 0) return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="flex items-center justify-between mb-6" variants={itemVariants}>
        <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
        <Button
          className="bg-purple-neon hover:bg-purple-dark"
          onClick={() => {
            loadMetrics();
            loadCacheItems();
          }}
          disabled={isLoading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Atualizando..." : "Atualizar Dados"}
        </Button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="neumorphism hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription>Total de Hits</CardDescription>
              <CardTitle className="text-2xl">
                {metrics?.hits?.toLocaleString() || "Carregando..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span
                  className={`${getTrendColor(
                    calculatePercentageChange(metrics?.hits || 0, previousMetrics?.hits || 0)
                  )} `}
                >
                  {isNaN(calculatePercentageChange(metrics?.hits || 0, previousMetrics?.hits || 0))
                    ? "Sem dados anteriores"
                    : `${calculatePercentageChange(
                        metrics?.hits || 0,
                        previousMetrics?.hits || 0
                      ).toFixed(1)}% em relação à semana passada`}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="neumorphism hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription>Cache Misses</CardDescription>
              <CardTitle className="text-2xl">
                {metrics?.misses?.toLocaleString() || "Carregando..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span
                  className={`${getTrendColor(
                    calculatePercentageChange(metrics?.misses || 0, previousMetrics?.misses || 0)
                  )} `}
                >
                  {isNaN(
                    calculatePercentageChange(metrics?.misses || 0, previousMetrics?.misses || 0)
                  )
                    ? "Sem dados anteriores"
                    : `${calculatePercentageChange(
                        metrics?.misses || 0,
                        previousMetrics?.misses || 0
                      ).toFixed(1)}% em relação à semana passada`}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="neumorphism hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription>Taxa de Acerto</CardDescription>
              <CardTitle className="text-2xl">
                {metrics ? `${(metrics.hitRate * 100).toFixed(1)}%` : "Carregando..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span
                  className={`${getTrendColor(
                    calculatePercentageChange(metrics?.hitRate || 0, previousMetrics?.hitRate || 0)
                  )} `}
                >
                  {isNaN(
                    calculatePercentageChange(metrics?.hitRate || 0, previousMetrics?.hitRate || 0)
                  )
                    ? "Sem dados anteriores"
                    : `${calculatePercentageChange(
                        metrics?.hitRate || 0,
                        previousMetrics?.hitRate || 0
                      ).toFixed(1)}% em relação à semana passada`}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="neumorphism hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardDescription>Evictions</CardDescription>
              <CardTitle className="text-2xl">
                {metrics?.evictions?.toLocaleString() || "Carregando..."}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                <span
                  className={`${getTrendColor(
                    calculatePercentageChange(
                      metrics?.evictions || 0,
                      previousMetrics?.evictions || 0
                    )
                  )} `}
                >
                  {isNaN(
                    calculatePercentageChange(
                      metrics?.evictions || 0,
                      previousMetrics?.evictions || 0
                    )
                  )
                    ? "Sem dados anteriores"
                    : `${calculatePercentageChange(
                        metrics?.evictions || 0,
                        previousMetrics?.evictions || 0
                      ).toFixed(1)}% em relação à semana passada`}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="performance" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="distribution">Distribuição</TabsTrigger>
            <TabsTrigger value="ttl">TTL</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card className="neumorphism">
              <CardHeader>
                <CardTitle>Performance do Cache ao Longo do Tempo</CardTitle>
                <CardDescription>Hits vs. Misses nas últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="w-full h-full bg-dark-background/50 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de Linha: Performance do Cache</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card className="neumorphism">
              <CardHeader>
                <CardTitle>Distribuição de Tipos de Cache</CardTitle>
                <CardDescription>Proporção de uso por tipo de armazenamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="w-full h-full bg-dark-background/50 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de Pizza: Distribuição de Cache</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ttl">
            <Card className="neumorphism">
              <CardHeader>
                <CardTitle>Análise de TTL</CardTitle>
                <CardDescription>Distribuição de expiração de cache por tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <div className="w-full h-full bg-dark-background/50 rounded-md flex items-center justify-center">
                    <p className="text-gray-400">Gráfico de Barras: Análise de TTL</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="neumorphism mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Entradas Recentes no Cache</CardTitle>
                <CardDescription>Últimas operações de cache</CardDescription>
              </div>
              <Button variant="outline">Ver Todas</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Chave</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Tamanho
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">TTL</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Criado em
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentCacheEntries.length > 0 ? (
                    recentCacheEntries.map((entry, index) => (
                      <motion.tr
                        key={index}
                        className="border-b border-white/5 hover:bg-dark-background/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-3 px-4 text-sm">{entry.key}</td>
                        <td className="py-3 px-4 text-sm">{entry.type}</td>
                        <td className="py-3 px-4 text-sm">{entry.size}</td>
                        <td className="py-3 px-4 text-sm">{entry.ttl}</td>
                        <td className="py-3 px-4 text-sm">{entry.created}</td>
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              entry.status === "Ativo"
                                ? "bg-green-900/30 text-green-400"
                                : entry.status === "Expirando"
                                ? "bg-yellow-900/30 text-yellow-400"
                                : "bg-red-900/30 text-red-400"
                            }`}
                          >
                            {entry.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-400">
                        {isLoading ? "Carregando dados..." : "Nenhum item de cache encontrado"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Card className="neumorphism hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-purple-neon" />
                <CardTitle className="text-lg">Uso de Memória</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <div className="flex justify-between mb-1 text-sm">
                  <span>
                    Utilizado:{" "}
                    {metrics?.totalRequests
                      ? `${(metrics.totalRequests / 1000).toFixed(1)} GB`
                      : "Carregando..."}
                  </span>
                  <span>Total: 2 GB</span>
                </div>
                <div className="w-full bg-dark-background rounded-full h-2.5">
                  <motion.div
                    className="bg-purple-neon h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: metrics?.totalRequests
                        ? `${(metrics.totalRequests / 2000) * 100}%`
                        : "0%",
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="neumorphism hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-purple-neon" />
                <CardTitle className="text-lg">Tempo Médio de Resposta</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">
                    {metrics?.totalRequests
                      ? `${(metrics.totalRequests / 100).toFixed(1)} ms`
                      : "Carregando..."}
                  </p>
                  <p className="text-sm text-gray-400">Últimas 24 horas</p>
                </div>
                <div className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {metrics && previousMetrics
                      ? `${calculatePercentageChange(
                          metrics.totalRequests,
                          previousMetrics.totalRequests
                        ).toFixed(1)}% mais rápido`
                      : "Sem dados anteriores"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="neumorphism hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-purple-neon" />
                <CardTitle className="text-lg">Requisições por Segundo</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">
                    {metrics?.totalRequests?.toLocaleString() || "Carregando..."}
                  </p>
                  <p className="text-sm text-gray-400">Média atual</p>
                </div>
                <div className="text-yellow-500 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {metrics && previousMetrics
                      ? `${calculatePercentageChange(
                          metrics.totalRequests,
                          previousMetrics.totalRequests
                        ).toFixed(1)}% de aumento`
                      : "Sem dados anteriores"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
