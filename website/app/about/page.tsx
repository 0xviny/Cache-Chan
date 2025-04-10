"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Database, Code, Users, Globe, Award, Zap } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Vinicius",
      role: "CEO & Fundador",
      bio: "Especialista em sistemas distribuídos com mais de 3 anos de experiência em empresas de tecnologia.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

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
    <div className="min-h-screen flex flex-col bg-dark-background">
      <Navbar />

      <motion.div
        className="flex-1 pt-24 pb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section
          className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          variants={itemVariants}
        >
          <div className="neumorphism rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                  Sobre o CacheChan
                </h1>
                <p className="text-gray-300 text-lg mb-6">
                  Somos uma equipe apaixonada por performance e escalabilidade. Nossa missão é
                  simplificar o gerenciamento de cache para desenvolvedores .NET, permitindo que
                  eles construam aplicações mais rápidas e eficientes.
                </p>
                <p className="text-gray-300 text-lg mb-6">
                  Fundada em 2022, a CacheChan nasceu da necessidade de uma solução de cache
                  distribuído que fosse fácil de usar, altamente configurável e com ferramentas de
                  monitoramento integradas.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button className="bg-purple-neon hover:bg-purple-dark">Fale Conosco</Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="outline">Nossa Documentação</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Nossa História</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              A jornada que nos trouxe até aqui e nossa visão para o futuro do gerenciamento de
              cache.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="neumorphism rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">O Problema</h3>
              <p className="text-gray-300">
                Tudo começou quando nossa equipe enfrentou desafios com soluções de cache existentes
                que eram complexas de configurar, difíceis de monitorar e não se integravam bem com
                o ecossistema .NET.
              </p>
            </motion.div>

            <motion.div
              className="neumorphism rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">A Solução</h3>
              <p className="text-gray-300">
                Em 2025, decidimos criar nossa própria solução de cache que fosse intuitiva,
                poderosa e com ferramentas de análise integradas. Assim nasceu o CacheChan, com foco
                na experiência do desenvolvedor.
              </p>
            </motion.div>

            <motion.div
              className="neumorphism rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-purple-neon" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hoje</h3>
              <p className="text-gray-300">
                Atualmente, o CacheChan é utilizado por pessoas em todo o mundo,
                ajudando desenvolvedores a criar aplicações mais rápidas e escaláveis com uma gestão
                de cache eficiente.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section className="bg-dark-card py-16 mb-16" variants={itemVariants}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">Nossos Valores</h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Princípios que guiam nosso trabalho e definem quem somos como empresa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="neumorphism rounded-lg p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-purple-neon" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Performance</h3>
                  <p className="text-gray-300">
                    Acreditamos que cada milissegundo importa. Nosso foco é criar soluções que
                    maximizem a velocidade e eficiência das aplicações de nossos clientes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="neumorphism rounded-lg p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-neon" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Comunidade</h3>
                  <p className="text-gray-300">
                    Valorizamos a comunidade de desenvolvedores e acreditamos no poder do feedback e
                    da colaboração para criar produtos melhores.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="neumorphism rounded-lg p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-purple-neon" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Excelência</h3>
                  <p className="text-gray-300">
                    Buscamos a excelência em tudo o que fazemos, desde o código que escrevemos até o
                    suporte que oferecemos aos nossos clientes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="neumorphism rounded-lg p-6 flex items-start gap-4 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="bg-purple-neon/20 p-3 rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <Code className="h-6 w-6 text-purple-neon" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Inovação</h3>
                  <p className="text-gray-300">
                    Estamos constantemente explorando novas tecnologias e abordagens para melhorar
                    nossos produtos e oferecer soluções inovadoras.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16"
          variants={itemVariants}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">Nossa Equipe</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Conheça as pessoas apaixonadas por tecnologia que estão por trás do CacheChan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="neumorphism rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-purple-neon mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="bg-gradient-to-r from-purple-dark to-purple-neon py-16"
          variants={itemVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Quer fazer parte da nossa história?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto">
              Estamos sempre em busca de talentos apaixonados por tecnologia e performance para se
              juntar à nossa equipe.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-white text-purple-dark hover:bg-gray-100 w-full sm:w-auto">
                  Entre em contato
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  );
}
