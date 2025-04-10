"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-background">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="neumorphism rounded-lg p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-3xl font-bold mb-8 gradient-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Política de Cookies
            </motion.h1>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Última atualização: {new Date().toLocaleDateString()}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">1. O que são Cookies?</h2>
                <p className="text-gray-300 mb-4">
                  Cookies são pequenos arquivos de texto que são armazenados no seu computador ou
                  dispositivo móvel quando você visita um site. Eles são amplamente utilizados para
                  fazer os sites funcionarem, ou funcionarem de forma mais eficiente, bem como para
                  fornecer informações aos proprietários do site.
                </p>
                <p className="text-gray-300 mb-4">
                  Os cookies permitem que um site reconheça seu dispositivo e lembre-se de
                  informações sobre sua visita, como suas preferências de idioma ou informações de
                  login. Isso pode melhorar sua experiência de navegação, tornando o site mais
                  personalizado e eficiente.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">2. Como Usamos os Cookies</h2>
                <p className="text-gray-300 mb-4">
                  O CacheChan utiliza cookies para diversos propósitos, incluindo:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-300">
                  <li>
                    Cookies essenciais: Necessários para o funcionamento básico do site, como
                    autenticação e segurança.
                  </li>
                  <li>
                    Cookies de preferências: Permitem que o site lembre de informações que mudam a
                    forma como o site se comporta ou aparece.
                  </li>
                  <li>
                    Cookies estatísticos: Ajudam-nos a entender como os visitantes interagem com o
                    site, coletando e relatando informações anonimamente.
                  </li>
                  <li>
                    Cookies de marketing: Usados para rastrear visitantes em sites. A intenção é
                    exibir anúncios relevantes e envolventes para o usuário individual.
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">
                  3. Tipos de Cookies que Utilizamos
                </h2>
                <p className="text-gray-300 mb-4">
                  Especificamente, utilizamos os seguintes cookies:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-300">
                  <li>
                    <strong>Cookies de sessão:</strong> Armazenam informações temporárias durante
                    sua sessão de navegação e são excluídos quando você fecha o navegador.
                  </li>
                  <li>
                    <strong>Cookies persistentes:</strong> Permanecem no seu dispositivo por um
                    período específico ou até que você os exclua manualmente.
                  </li>
                  <li>
                    <strong>Cookies de autenticação:</strong> Utilizados para identificar usuários
                    registrados e fornecer acesso seguro às áreas protegidas do site.
                  </li>
                  <li>
                    <strong>Cookies de análise:</strong> Coletam informações sobre como você usa
                    nosso site, permitindo-nos melhorar sua funcionalidade.
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies de Terceiros</h2>
                <p className="text-gray-300 mb-4">
                  Além dos cookies que definimos quando você visita nosso site, também podemos
                  permitir que terceiros selecionados definam cookies quando você visita nosso site.
                  Esses terceiros incluem:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-300">
                  <li>Provedores de análise (como Google Analytics)</li>
                  <li>Plataformas de mídia social (como Facebook, Twitter, LinkedIn)</li>
                  <li>Serviços de publicidade</li>
                  <li>
                    Provedores de funcionalidades (como botões de compartilhamento, vídeos
                    incorporados)
                  </li>
                </ul>
                <p className="text-gray-300 mb-4">
                  Esses cookies de terceiros são governados pelas políticas de privacidade das
                  respectivas empresas e não pelo CacheChan.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">5. Gerenciando Cookies</h2>
                <p className="text-gray-300 mb-4">
                  A maioria dos navegadores permite que você controle cookies através das
                  configurações de preferências. Você pode:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-300">
                  <li>Bloquear todos os cookies</li>
                  <li>Excluir cookies existentes</li>
                  <li>Permitir apenas cookies de sites que você visita diretamente</li>
                  <li>Bloquear cookies de terceiros</li>
                  <li>Configurar seu navegador para perguntar antes de aceitar cookies</li>
                </ul>
                <p className="text-gray-300 mb-4">
                  Observe que restringir cookies pode impactar sua experiência em nosso site, pois
                  algumas funcionalidades podem não funcionar corretamente.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">
                  6. Cookies Específicos Utilizados
                </h2>
                <p className="text-gray-300 mb-4">
                  Abaixo está uma lista dos principais cookies que utilizamos:
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse text-gray-300">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-4">Nome do Cookie</th>
                        <th className="text-left py-2 px-4">Propósito</th>
                        <th className="text-left py-2 px-4">Duração</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-4">session</td>
                        <td className="py-2 px-4">Gerencia a sessão do usuário</td>
                        <td className="py-2 px-4">Sessão</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-4">token</td>
                        <td className="py-2 px-4">Autenticação do usuário</td>
                        <td className="py-2 px-4">30 dias</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-4">sidebar:state</td>
                        <td className="py-2 px-4">Lembra o estado da barra lateral</td>
                        <td className="py-2 px-4">7 dias</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-4">theme</td>
                        <td className="py-2 px-4">Armazena preferência de tema</td>
                        <td className="py-2 px-4">1 ano</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-2 px-4">_ga</td>
                        <td className="py-2 px-4">Google Analytics</td>
                        <td className="py-2 px-4">2 anos</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">
                  7. Alterações à Nossa Política de Cookies
                </h2>
                <p className="text-gray-300 mb-4">
                  Podemos atualizar nossa Política de Cookies de tempos em tempos. Quaisquer
                  alterações serão publicadas nesta página e, se as alterações forem significativas,
                  forneceremos um aviso mais proeminente.
                </p>
                <p className="text-gray-300 mb-4">
                  Recomendamos que você revise periodicamente esta política para se manter informado
                  sobre como estamos utilizando cookies.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">8. Contato</h2>
                <p className="text-gray-300 mb-4">
                  Se você tiver dúvidas sobre nossa Política de Cookies, entre em contato conosco em{" "}
                  <a
                    href="mailto:privacy@cachechan.com"
                    className="text-purple-neon hover:text-purple-dark"
                  >
                    privacy@cachechan.com
                  </a>
                  .
                </p>
              </motion.div>

              <motion.div
                className="mt-12 flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <Link href="/terms" className="text-purple-neon hover:text-purple-dark">
                  Termos de Uso
                </Link>
                <Link href="/privacy" className="text-purple-neon hover:text-purple-dark">
                  Política de Privacidade
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
