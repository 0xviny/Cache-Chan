import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-background">
      <Navbar />

      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="neumorphism rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold mb-8 gradient-text">Termos de Uso</h1>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-4">
                Última atualização: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-300 mb-4">
                Ao acessar ou usar o serviço CacheChan, você concorda em cumprir estes Termos de Uso
                e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes
                termos, você está proibido de usar ou acessar este site.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso da Licença</h2>
              <p className="text-gray-300 mb-4">
                É concedida permissão para baixar temporariamente uma cópia dos materiais
                (informações ou software) no site CacheChan, apenas para visualização transitória
                pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de
                título, e sob esta licença você não pode:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-300">
                <li>Modificar ou copiar os materiais;</li>
                <li>
                  Usar os materiais para qualquer finalidade comercial ou para exibição pública;
                </li>
                <li>
                  Tentar descompilar ou fazer engenharia reversa de qualquer software contido no
                  site CacheChan;
                </li>
                <li>
                  Remover quaisquer direitos autorais ou outras notações de propriedade dos
                  materiais; ou
                </li>
                <li>
                  Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer
                  outro servidor.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. Isenção de Responsabilidade</h2>
              <p className="text-gray-300 mb-4">
                Os materiais no site da CacheChan são fornecidos 'como estão'. CacheChan não oferece
                garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras
                garantias, incluindo, sem limitação, garantias implícitas ou condições de
                comercialização, adequação a um fim específico ou não violação de propriedade
                intelectual ou outra violação de direitos.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Limitações</h2>
              <p className="text-gray-300 mb-4">
                Em nenhum caso o CacheChan ou seus fornecedores serão responsáveis por quaisquer
                danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a
                interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais
                em CacheChan, mesmo que CacheChan ou um representante autorizado da CacheChan tenha
                sido notificado oralmente ou por escrito da possibilidade de tais danos.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Precisão dos Materiais</h2>
              <p className="text-gray-300 mb-4">
                Os materiais exibidos no site da CacheChan podem incluir erros técnicos,
                tipográficos ou fotográficos. CacheChan não garante que qualquer material em seu
                site seja preciso, completo ou atual. CacheChan pode fazer alterações nos materiais
                contidos em seu site a qualquer momento, sem aviso prévio.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Links</h2>
              <p className="text-gray-300 mb-4">
                O CacheChan não analisou todos os sites vinculados ao seu site e não é responsável
                pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica
                endosso por CacheChan do site. O uso de qualquer site vinculado é por conta e risco
                do usuário.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Modificações</h2>
              <p className="text-gray-300 mb-4">
                O CacheChan pode revisar estes termos de serviço do site a qualquer momento, sem
                aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual
                desses termos de serviço.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Lei Aplicável</h2>
              <p className="text-gray-300 mb-4">
                Estes termos e condições são regidos e interpretados de acordo com as leis do Brasil
                e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele
                estado ou localidade.
              </p>

              <div className="mt-12 flex justify-between">
                <Link href="/privacy" className="text-purple-neon hover:text-purple-dark">
                  Política de Privacidade
                </Link>
                <Link href="/cookies" className="text-purple-neon hover:text-purple-dark">
                  Política de Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
