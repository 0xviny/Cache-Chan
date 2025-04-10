"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Copy, Plus, RefreshCw, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  active: boolean;
  created: string;
  lastUsed: string;
  permissions: string[];
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [permissions, setPermissions] = useState({
    read: true,
    write: true,
    admin: false,
  });
  const { toast } = useToast();

  const loadApiKeys = async () => {
    setIsLoading(true);
    try {
      const response = await api.listApiKeys();

      if (response.success && response.data) {
        setApiKeys(response.data);
      } else {
        toast({
          title: "Erro ao carregar API Keys",
          description: response.error || "Não foi possível carregar as API Keys. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao carregar API Keys",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApiKeys();
  }, []);

  const handleCreateKey = async () => {
    setIsCreating(true);

    try {
      const permissionsArray = [];
      if (permissions.read) permissionsArray.push("read");
      if (permissions.write) permissionsArray.push("write");
      if (permissions.admin) permissionsArray.push("admin");

      const response = await api.createApiKey(newKeyName, permissionsArray);

      if (response.success && response.data) {
        const generatedKey = response.data.apiKey;
        setNewKey(generatedKey);
        setShowNewKeyDialog(true);
        loadApiKeys();

        toast({
          title: "API Key criada com sucesso",
          description: "Sua nova API Key foi gerada. Guarde-a em um local seguro.",
          variant: "default",
        });
      } else {
        toast({
          title: "Erro ao criar API Key",
          description: response.error || "Não foi possível criar a API Key. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao criar API Key",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
      setNewKeyName("");
      setPermissions({ read: true, write: true, admin: false });
    }
  };

  const toggleKeyStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await api.updateApiKeyStatus(id, !currentStatus);

      if (response.success) {
        setApiKeys(
          apiKeys.map((key) => (key.id === id ? { ...key, active: !currentStatus } : key))
        );

        toast({
          title: "Status da API Key atualizado",
          description: "O status da API Key foi atualizado com sucesso.",
          variant: "default",
        });
      } else {
        toast({
          title: "Erro ao atualizar status",
          description: response.error || "Não foi possível atualizar o status da API Key.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao atualizar status",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const deleteKey = async (id: string) => {
    try {
      const response = await api.deleteApiKey(id);

      if (response.success) {
        setApiKeys(apiKeys.filter((key) => key.id !== id));

        toast({
          title: "API Key removida",
          description: "A API Key foi removida com sucesso.",
          variant: "default",
        });
      } else {
        toast({
          title: "Erro ao remover API Key",
          description: response.error || "Não foi possível remover a API Key.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao remover API Key",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado para a área de transferência",
      description: "A API Key foi copiada para a área de transferência.",
      variant: "default",
    });
  };

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

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div className="flex items-center justify-between mb-6" variants={itemVariants}>
        <h1 className="text-2xl font-bold gradient-text">API Keys</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-neon hover:bg-purple-dark">
              <Plus className="mr-2 h-4 w-4" /> Nova API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="neumorphism border-white/10">
            <DialogHeader>
              <DialogTitle>Criar Nova API Key</DialogTitle>
              <DialogDescription>
                Crie uma nova API Key para integrar com seus serviços.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da API Key</Label>
                <Input
                  id="name"
                  placeholder="Ex: Produção, Desenvolvimento, etc."
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="bg-dark-background/50"
                  disabled={isCreating}
                />
              </div>

              <div className="grid gap-2">
                <Label>Permissões</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Leitura</span>
                  <Switch
                    checked={permissions.read}
                    onCheckedChange={(checked) => setPermissions({ ...permissions, read: checked })}
                    disabled={isCreating}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Escrita</span>
                  <Switch
                    checked={permissions.write}
                    onCheckedChange={(checked) =>
                      setPermissions({ ...permissions, write: checked })
                    }
                    disabled={isCreating}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Administração</span>
                  <Switch
                    checked={permissions.admin}
                    onCheckedChange={(checked) =>
                      setPermissions({ ...permissions, admin: checked })
                    }
                    disabled={isCreating}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setNewKeyName("")} disabled={isCreating}>
                Cancelar
              </Button>
              <Button
                className="bg-purple-neon hover:bg-purple-dark"
                onClick={handleCreateKey}
                disabled={!newKeyName || isCreating}
              >
                {isCreating ? "Criando..." : "Criar API Key"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
          <DialogContent className="neumorphism border-white/10">
            <DialogHeader>
              <DialogTitle>API Key Criada</DialogTitle>
              <DialogDescription>
                Guarde esta chave em um local seguro. Você não poderá vê-la novamente.
              </DialogDescription>
            </DialogHeader>

            <div className="bg-dark-background/50 p-4 rounded-md flex items-center justify-between">
              <code className="text-purple-neon text-sm break-all">{newKey}</code>
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(newKey)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center mt-2 p-2 bg-yellow-900/20 text-yellow-400 rounded-md text-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Esta é a única vez que você verá esta chave. Copie-a agora!
            </div>

            <DialogFooter>
              <Button
                className="bg-purple-neon hover:bg-purple-dark"
                onClick={() => setShowNewKeyDialog(false)}
              >
                Entendi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="neumorphism mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Suas API Keys</CardTitle>
                <CardDescription>
                  Gerencie as chaves de API para integrar com seus serviços.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                onClick={loadApiKeys}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Nome</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Chave</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Criada em
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Último uso
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.length > 0 ? (
                    apiKeys.map((apiKey, index) => (
                      <motion.tr
                        key={apiKey.id}
                        className="border-b border-white/5 hover:bg-dark-background/30"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-3 px-4 text-sm">{apiKey.name}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-400">•••••••••••••••••••••••</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-2 h-6 w-6"
                              onClick={() => copyToClipboard(apiKey.key)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${
                                apiKey.active ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></div>
                            <span>{apiKey.active ? "Ativa" : "Inativa"}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{apiKey.created}</td>
                        <td className="py-3 px-4 text-sm">{apiKey.lastUsed || "Nunca"}</td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleKeyStatus(apiKey.id, apiKey.active)}
                              className={
                                apiKey.active
                                  ? "text-yellow-500 hover:text-yellow-400"
                                  : "text-green-500 hover:text-green-400"
                              }
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteKey(apiKey.id)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-400">
                        {isLoading ? "Carregando API Keys..." : "Nenhuma API Key encontrada"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
