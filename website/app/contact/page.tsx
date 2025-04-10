"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {
  Send,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface SupportThread {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  status: "open" | "closed" | "pending";
  lastMessageTimestamp: string;
  unreadCount: number;
  messages: SupportMessage[];
}

interface SupportMessage {
  id: string;
  threadId: string;
  userId: string;
  userName: string;
  userEmail: string;
  isAdmin: boolean;
  message: string;
  timestamp: string;
  read: boolean;
}

function extractApiData<T>(data: any): T {
  return data?.data ? data.data : data;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [threads, setThreads] = useState<SupportThread[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [threadMessages, setThreadMessages] = useState<SupportMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      if (api.isAuthenticated()) {
        const userData = await api.getUser();
        console.log("User Data:", userData);
        setUser(userData);
        if (userData.role === "admin") {
          loadAllSupportThreads();
        } else {
          loadSupportThreads();
        }
      }
    };
    fetchUser();
  }, []);

  const loadSupportThreads = async () => {
    try {
      const response = await api.listSupportThreads();
      console.log("Load Support Threads Response:", response);
      if (response.success && response.data) {
        const threadsData: SupportThread[] = extractApiData(response.data);
        setThreads(threadsData);
      } else {
        console.error("Failed to load threads:", response.error);
      }
    } catch (error) {
      console.error("Erro ao carregar threads:", error);
    }
  };

  const loadAllSupportThreads = async () => {
    try {
      const response = await api.listAllSupportThreads();
      console.log("Load All Support Threads Response:", response);
      if (response.success && response.data) {
        const threadsData: SupportThread[] = extractApiData(response.data);
        setThreads(threadsData);
      } else {
        console.error("Failed to load all threads:", response.error);
      }
    } catch (error) {
      console.error("Erro ao carregar todas as threads:", error);
    }
  };

  const loadThreadMessages = async (threadId: string) => {
    try {
      const response = await api.getSupportThread(threadId);
      console.log("Load Support Thread (messages) Response:", response);
      if (response.success && response.data) {
        const threadData: SupportThread = extractApiData(response.data);
        setThreadMessages(threadData.messages);
        setActiveThread(threadId);
        await api.markThreadAsRead(threadId);
        if (user?.role === "admin") loadAllSupportThreads();
        else loadSupportThreads();
      } else {
        console.error("Failed to load thread messages:", response.error);
      }
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  const handleCloseChat = async (threadId: string) => {
    try {
      const response = await api.closeSupportThread(threadId);
      if (response.success) {
        toast({
          title: "Chat fechado",
          description: "A conversa foi encerrada com sucesso.",
          variant: "default",
        });

        if (user?.role === "admin") loadAllSupportThreads();
        else loadSupportThreads();
        setActiveThread(null);
        setThreadMessages([]);
      } else {
        toast({
          title: "Erro ao fechar chat",
          description: response.error || "Não foi possível fechar a conversa.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao fechar chat:", error);
      toast({
        title: "Erro ao fechar chat",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [threadMessages]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Mensagem enviada com sucesso",
        description: "Entraremos em contato em breve.",
        variant: "default",
      });
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.createSupportThread(subject, message);
      console.log("Create Thread Response:", response);
      if (response.success) {
        toast({
          title: "Thread criada com sucesso",
          description: "Sua solicitação de suporte foi enviada.",
          variant: "default",
        });
        setSubject("");
        setMessage("");
        if (user?.role === "admin") loadAllSupportThreads();
        else loadSupportThreads();
      } else {
        toast({
          title: "Erro ao criar thread",
          description: response.error || "Ocorreu um erro ao criar sua solicitação de suporte.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating thread:", error);
      toast({
        title: "Erro ao criar thread",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!activeThread || !newMessage.trim()) return;
    setIsSendingMessage(true);
    try {
      const response = await api.sendSupportMessage(
        activeThread,
        newMessage,
        user?.role === "admin"
      );
      if (response.success) {
        const newMsg: SupportMessage = {
          id: Date.now().toString(),
          threadId: activeThread,
          userId: user?.id || "",
          userName: user?.name || "Você",
          userEmail: user?.email || "",
          isAdmin: user?.role === "admin" || false,
          message: newMessage,
          timestamp: new Date().toISOString(),
          read: false,
        };
        setThreadMessages([...threadMessages, newMsg]);
        setNewMessage("");
        if (user?.role === "admin") loadAllSupportThreads();
        else loadSupportThreads();
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: response.error || "Ocorreu um erro ao enviar sua mensagem.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-background">
      <Navbar />
      <motion.div
        className="flex-1 pt-24 pb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants}>
            <h1 className="text-3xl font-bold gradient-text text-center mb-8">Entre em Contato</h1>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="neumorphism">
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>Várias formas de entrar em contato conosco</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-purple-neon mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-400">
                        <a href="mailto:contato@cachechan.com" className="hover:text-purple-neon">
                          0xviny.dev@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-purple-neon mt-0.5" />
                    <div>
                      <h3 className="font-medium">Horário de Atendimento</h3>
                      <p className="text-gray-400">
                        Segunda a Sexta: 9h às 18h
                        <br />
                        Sábado: 9h às 13h
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link href="/docs" className="flex items-center justify-center w-full">
                      Consulte nossa documentação <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              {user ? (
                <Card className="neumorphism">
                  <CardHeader>
                    <CardTitle>
                      {user.role === "admin" ? "Gerenciar Suporte" : "Suporte ao Cliente"}
                    </CardTitle>
                    <CardDescription>
                      {user.role === "admin"
                        ? "Responda às solicitações de suporte"
                        : "Converse com nossa equipe de suporte"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs
                      defaultValue={user.role === "admin" ? "all-threads" : "threads"}
                      className="w-full"
                    >
                      <TabsList className="mb-4">
                        {user.role === "admin" ? (
                          <TabsTrigger value="all-threads">Todas as Conversas</TabsTrigger>
                        ) : (
                          <>
                            <TabsTrigger value="threads">Minhas Conversas</TabsTrigger>
                            <TabsTrigger value="new">Nova Conversa</TabsTrigger>
                          </>
                        )}
                      </TabsList>
                      <TabsContent value="all-threads">
                        {threads.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
                            <div className="border-r border-white/10 pr-4 overflow-y-auto">
                              {threads.map((thread) => (
                                <div
                                  key={thread.id}
                                  className={`p-3 rounded-md mb-2 cursor-pointer transition-colors ${
                                    activeThread === thread.id
                                      ? "bg-purple-neon/20 border-l-2 border-purple-neon"
                                      : "hover:bg-dark-background/50"
                                  }`}
                                  onClick={() => loadThreadMessages(thread.id)}
                                >
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-medium truncate">{thread.subject}</h3>
                                    {thread.unreadCount > 0 && (
                                      <span className="bg-purple-neon text-white text-xs px-2 py-1 rounded-full">
                                        {thread.unreadCount}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(thread.lastMessageTimestamp).toLocaleString()} -{" "}
                                    {thread.userName}
                                  </p>
                                  <div className="flex items-center mt-2">
                                    <span
                                      className={`h-2 w-2 rounded-full mr-2 ${
                                        thread.status === "open"
                                          ? "bg-green-500"
                                          : thread.status === "pending"
                                          ? "bg-yellow-500"
                                          : "bg-red-500"
                                      }`}
                                    ></span>
                                    <span className="text-xs capitalize">{thread.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {activeThread && (
                              <div className="md:col-span-2 flex flex-col h-full">
                                <div className="flex justify-end mb-4">
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleCloseChat(activeThread)}
                                  >
                                    Fechar Chat
                                  </Button>
                                </div>
                                <div className="flex-1 overflow-y-auto mb-4 p-4 bg-dark-background/30 rounded-md">
                                  {threadMessages.map((msg) => (
                                    <div
                                      key={msg.id}
                                      className={`mb-4 ${msg.isAdmin ? "text-left" : "text-right"}`}
                                    >
                                      <div
                                        className={`inline-block max-w-[80%] rounded-lg p-3 ${
                                          msg.isAdmin ? "bg-dark-card" : "bg-purple-neon/20"
                                        }`}
                                      >
                                        <p className="text-sm font-medium">{msg.userName}</p>
                                        <p className="mt-1">{msg.message}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                          {new Date(msg.timestamp).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  <div ref={messagesEndRef} />
                                </div>
                                <div className="flex gap-2">
                                  <Textarea
                                    placeholder="Digite sua resposta..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="resize-none bg-dark-background/50"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                      }
                                    }}
                                  />
                                  <Button
                                    className="bg-purple-neon hover:bg-purple-dark"
                                    onClick={handleSendMessage}
                                    disabled={isSendingMessage || !newMessage.trim()}
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[400px] text-center">
                            <MessageSquare className="h-16 w-16 text-gray-500 mb-4" />
                            <h3 className="text-xl font-medium mb-2">
                              Nenhuma conversa encontrada
                            </h3>
                            <p className="text-gray-400 mb-4">Não há conversas para gerenciar.</p>
                          </div>
                        )}
                      </TabsContent>
                      {user.role !== "admin" && (
                        <>
                          <TabsContent value="threads">
                            {threads.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
                                <div className="border-r border-white/10 pr-4 overflow-y-auto">
                                  {threads.map((thread) => (
                                    <div
                                      key={thread.id}
                                      className={`p-3 rounded-md mb-2 cursor-pointer transition-colors ${
                                        activeThread === thread.id
                                          ? "bg-purple-neon/20 border-l-2 border-purple-neon"
                                          : "hover:bg-dark-background/50"
                                      }`}
                                      onClick={() => loadThreadMessages(thread.id)}
                                    >
                                      <div className="flex justify-between items-start">
                                        <h3 className="font-medium truncate">{thread.subject}</h3>
                                        {thread.unreadCount > 0 && (
                                          <span className="bg-purple-neon text-white text-xs px-2 py-1 rounded-full">
                                            {thread.unreadCount}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-400 mt-1">
                                        {new Date(thread.lastMessageTimestamp).toLocaleString()}
                                      </p>
                                      <div className="flex items-center mt-2">
                                        <span
                                          className={`h-2 w-2 rounded-full mr-2 ${
                                            thread.status === "open"
                                              ? "bg-green-500"
                                              : thread.status === "pending"
                                              ? "bg-yellow-500"
                                              : "bg-red-500"
                                          }`}
                                        ></span>
                                        <span className="text-xs capitalize">{thread.status}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                {activeThread ? (
                                  <div className="md:col-span-2 flex flex-col h-full">
                                    <div className="flex justify-end mb-4">
                                      <Button
                                        variant="destructive"
                                        onClick={() => handleCloseChat(activeThread)}
                                      >
                                        Fechar Chat
                                      </Button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto mb-4 p-4 bg-dark-background/30 rounded-md">
                                      {threadMessages.map((msg) => (
                                        <div
                                          key={msg.id}
                                          className={`mb-4 ${
                                            msg.isAdmin ? "text-left" : "text-right"
                                          }`}
                                        >
                                          <div
                                            className={`inline-block max-w-[80%] rounded-lg p-3 ${
                                              msg.isAdmin ? "bg-dark-card" : "bg-purple-neon/20"
                                            }`}
                                          >
                                            <p className="text-sm font-medium">{msg.userName}</p>
                                            <p className="mt-1">{msg.message}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                              {new Date(msg.timestamp).toLocaleString()}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                      <div ref={messagesEndRef} />
                                    </div>
                                    <div className="flex gap-2">
                                      <Textarea
                                        placeholder="Digite sua mensagem..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="resize-none bg-dark-background/50"
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                          }
                                        }}
                                      />
                                      <Button
                                        className="bg-purple-neon hover:bg-purple-dark"
                                        onClick={handleSendMessage}
                                        disabled={isSendingMessage || !newMessage.trim()}
                                      >
                                        <Send className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-full text-center">
                                    <MessageSquare className="h-16 w-16 text-gray-500 mb-4" />
                                    <h3 className="text-xl font-medium mb-2">
                                      Nenhuma conversa selecionada
                                    </h3>
                                    <p className="text-gray-400 mb-4">
                                      Selecione uma conversa existente ou inicie uma nova.
                                    </p>
                                    <Button
                                      variant="outline"
                                      onClick={() => document.getElementById("new-tab")?.click()}
                                    >
                                      <PlusCircle className="mr-2 h-4 w-4" /> Nova Conversa
                                    </Button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                                <MessageSquare className="h-16 w-16 text-gray-500 mb-4" />
                                <h3 className="text-xl font-medium mb-2">
                                  Nenhuma conversa encontrada
                                </h3>
                                <p className="text-gray-400 mb-4">
                                  Você ainda não iniciou nenhuma conversa com nossa equipe de
                                  suporte.
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() => document.getElementById("new-tab")?.click()}
                                  id="new-tab"
                                >
                                  <PlusCircle className="mr-2 h-4 w-4" /> Iniciar Nova Conversa
                                </Button>
                              </div>
                            )}
                          </TabsContent>
                          <TabsContent value="new">
                            <form onSubmit={handleCreateThread} className="space-y-4">
                              <div>
                                <Label htmlFor="subject">Assunto</Label>
                                <Input
                                  id="subject"
                                  value={subject}
                                  onChange={(e) => setSubject(e.target.value)}
                                  placeholder="Ex: Problema com integração Redis"
                                  required
                                  className="bg-dark-background/50"
                                />
                              </div>
                              <div>
                                <Label htmlFor="message">Mensagem</Label>
                                <Textarea
                                  id="message"
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  placeholder="Descreva seu problema ou dúvida em detalhes..."
                                  required
                                  className="min-h-[200px] bg-dark-background/50"
                                />
                              </div>
                              <Button
                                type="submit"
                                className="w-full bg-purple-neon hover:bg-purple-dark"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  "Enviando..."
                                ) : (
                                  <>
                                    <Send className="mr-2 h-4 w-4" /> Iniciar Conversa
                                  </>
                                )}
                              </Button>
                            </form>
                          </TabsContent>
                        </>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card className="neumorphism">
                  <CardHeader>
                    <CardTitle>Envie uma Mensagem</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo para entrar em contato
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome completo"
                            required
                            className="bg-dark-background/50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            className="bg-dark-background/50"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Assunto da mensagem"
                          required
                          className="bg-dark-background/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Digite sua mensagem aqui..."
                          required
                          className="min-h-[200px] bg-dark-background/50"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-purple-neon hover:bg-purple-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>Enviando...</>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-gray-400 text-center">
                      Já possui uma conta?{" "}
                      <Link href="/login" className="text-purple-neon hover:text-purple-dark">
                        Faça login
                      </Link>{" "}
                      para acessar o suporte via chat.
                    </div>
                  </CardFooter>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
