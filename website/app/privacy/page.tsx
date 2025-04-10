"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
              Política de Privacidade
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
                <h2 className="text-xl font-semibold mt-8 mb-4">1. Introdução</h2>
                <p className="text-gray-300 mb-4">
                  A CacheChan ("nós", "nosso" ou "nossa") está comprometida em proteger sua
                  privacidade. Esta Política de Privacidade explica como coletamos, usamos,
                  divulgamos e protegemos suas informações quando você utiliza nosso serviço de
                  cache distribuído ("Serviço").
                </p>
                <p className="text-gray-300 mb-4">
                  Ao utilizar nosso Serviço, você concorda com a coleta e uso de informações de
                  acordo com esta política. As informações pessoais que coletamos são usadas apenas
                  para fornecer e melhorar o Serviço. Não usaremos ou compartilharemos suas
                  informações com ninguém, exceto conforme descrito nesta Política de Privacidade.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">2. Coleta e Uso de Informações</h2>
                <p className="text-gray-300 mb-4">
                  Para uma melhor experiência ao usar nosso Serviço, podemos solicitar que você nos
                  forneça certas informações pessoalmente identificáveis, incluindo, mas não se
                  limitando a, seu nome, endereço de e-mail e informações da empresa. As informações
                  que solicitamos serão retidas por nós e usadas conforme descrito nesta política de
                  privacidade.
                </p>
                <p className="text-gray-300 mb-4">
                  O Serviço utiliza serviços de terceiros que podem coletar informações usadas para
                  identificá-lo. Recomendamos que você revise as políticas de privacidade dos
                  provedores de serviços terceirizados usados pelo Serviço.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">3. Dados de Cache</h2>
                <p className="text-gray-300 mb-4">
                  Nosso Serviço permite que você armazene dados em nosso sistema de cache. Embora
                  tenhamos acesso a esses dados para fornecer o Serviço, não monitoramos, revisamos
                  ou usamos o conteúdo dos seus dados de cache para qualquer finalidade além de
                  fornecer o Serviço, a menos que exigido por lei.
                </p>
                <p className="text-gray-300 mb-4">
                  Você é responsável por garantir que tem o direito de armazenar quaisquer dados que
                  coloca em nosso sistema de cache e que o armazenamento desses dados não viola
                  nenhuma lei ou regulamento aplicável.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">4. Dados de Log</h2>
                <p className="text-gray-300 mb-4">
                  Queremos informar que sempre que você utiliza nosso Serviço, em caso de erro no
                  aplicativo, coletamos dados e informações (através de produtos de terceiros) em
                  seu dispositivo chamados Dados de Log. Esses Dados de Log podem incluir
                  informações como o endereço de Protocolo de Internet ("IP") do seu dispositivo,
                  nome do dispositivo, versão do sistema operacional, configuração do aplicativo ao
                  utilizar nosso Serviço, hora e data de uso do Serviço e outras estatísticas.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">5. Cookies</h2>
                <p className="text-gray-300 mb-4">
                  Cookies são arquivos com uma pequena quantidade de dados que são comumente usados
                  como identificadores únicos anônimos. Eles são enviados para o seu navegador a
                  partir dos sites que você visita e são armazenados na memória interna do seu
                  dispositivo.
                </p>
                <p className="text-gray-300 mb-4">
                  Este Serviço usa esses "cookies" explicitamente para coletar informações e
                  melhorar nosso Serviço. Você tem a opção de aceitar ou recusar esses cookies e
                  saber quando um cookie está sendo enviado ao seu dispositivo. Se você optar por
                  recusar nossos cookies, talvez não consiga usar algumas partes deste Serviço.
                </p>
                <p className="text-gray-300 mb-4">
                  Para mais informações sobre como usamos cookies, consulte nossa{" "}
                  <Link href="/cookies" className="text-purple-neon hover:text-purple-dark">
                    Política de Cookies
                  </Link>
                  .
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">6. Segurança</h2>
                <p className="text-gray-300 mb-4">
                  Valorizamos sua confiança em nos fornecer suas informações pessoais, portanto,
                  estamos nos esforçando para usar meios comercialmente aceitáveis de protegê-las.
                  Mas lembre-se que nenhum método de transmissão pela internet, ou método de
                  armazenamento eletrônico é 100% seguro e confiável, e não podemos garantir sua
                  segurança absoluta.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">7. Links para Outros Sites</h2>
                <p className="text-gray-300 mb-4">
                  Este Serviço pode conter links para outros sites. Se você clicar em um link de
                  terceiros, você será direcionado para esse site. Observe que esses sites externos
                  não são operados por nós. Portanto, recomendamos fortemente que você revise a
                  Política de Privacidade desses sites. Não temos controle e não assumimos
                  responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites ou
                  serviços de terceiros.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">8. Privacidade Infantil</h2>
                <p className="text-gray-300 mb-4">
                  Estes Serviços não se dirigem a ninguém com menos de 13 anos. Não coletamos
                  intencionalmente informações pessoalmente identificáveis de crianças com menos de
                  13 anos. No caso de descobrirmos que uma criança com menos de 13 anos nos forneceu
                  informações pessoais, excluímos imediatamente essas informações de nossos
                  servidores. Se você é pai ou responsável e sabe que seu filho nos forneceu
                  informações pessoais, entre em contato conosco para que possamos tomar as medidas
                  necessárias.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">
                  9. Alterações a Esta Política de Privacidade
                </h2>
                <p className="text-gray-300 mb-4">
                  Podemos atualizar nossa Política de Privacidade de tempos em tempos. Assim,
                  recomendamos que você revise esta página periodicamente para quaisquer alterações.
                  Notificaremos você sobre quaisquer alterações publicando a nova Política de
                  Privacidade nesta página. Essas alterações entram em vigor imediatamente após
                  serem publicadas nesta página.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold mt-8 mb-4">10. Contato</h2>
                <p className="text-gray-300 mb-4">
                  Se você tiver dúvidas ou sugestões sobre nossa Política de Privacidade, não hesite
                  em nos contatar em{" "}
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
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <Link href="/terms" className="text-purple-neon hover:text-purple-dark">
                  Termos de Uso
                </Link>
                <Link href="/cookies" className="text-purple-neon hover:text-purple-dark">
                  Política de Cookies
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
