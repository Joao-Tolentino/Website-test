import { Link } from 'react-router-dom'
import { Instagram, Mail, Globe, Bot, BadgeDollarSign, ArrowRight, Sparkles } from 'lucide-react'

const projetos = [
  'Projeto Web 1',
  'Projeto Web 2',
  'Projeto Web 3',
  'Projeto Web 4',
  'Projeto Web 5',
  'Projeto Web 6',
]

export default function Institucional() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-40 bg-linear-to-r from-blue-950 to-blue-700 text-orange-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
            <div className="text-sm uppercase text-center md:text-left">Logo / Automafy</div>
            <h1 className="text-center text-lg md:text-xl font-bold uppercase">Nome Empresa</h1>
            <div className="flex items-center justify-center md:justify-end gap-2 text-xs">
              <span>Contato:</span>
              <a href="https://instagram.com/yourprofile" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                <Instagram size={16} />
              </a>
              <a href="mailto:hello@example.com" className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                <Mail size={16} />
              </a>
            </div>
          </div>
          <nav className="mt-3 flex flex-wrap items-center justify-center gap-5 text-sm uppercase">
            <a href="#web" className="hover:text-orange-300 transition">Websites</a>
            <a href="#automacao" className="hover:text-orange-300 transition">Automacao</a>
            <a href="#precos" className="hover:text-orange-300 transition">Precos</a>
            <a href="#sobre" className="hover:text-orange-300 transition">Sobre</a>
            <Link
              to="/vitrine"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-400 transition shadow-md"
            >
              Ver Vitrine
              <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="rounded-2xl bg-linear-to-r from-blue-900 to-indigo-700 px-6 py-7 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-wide">
                <Sparkles size={14} />
                Destaque
              </div>
              <h2 className="text-2xl font-bold">Quer ver os templates em acao?</h2>
              <p className="mt-1 text-sm text-blue-100">
                Acesse a vitrine para navegar pelos segmentos e exemplos completos.
              </p>
            </div>
            <Link
              to="/vitrine"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-400 transition shadow-lg"
            >
              Abrir Vitrine Agora
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section id="web" className="bg-cyan-50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-1">Trabalhos Feitos Anteriormente</h2>
          <p className="text-gray-600 mb-4">Estrutura inspirada no repositório estático original.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {projetos.map((item) => (
              <div key={item} className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-md transition">
                <div className="h-24 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                  <Globe size={20} />
                </div>
                <p className="text-sm font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="automacao" className="bg-green-50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Sistemas de Automacao</h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <p className="text-gray-700">
              Aqui entra o bloco institucional de automacao: integracoes, rotinas, notificacoes
              e reducao de tarefas manuais para o cliente.
            </p>
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 flex items-center justify-center text-gray-500">
              <Bot size={28} />
            </div>
          </div>
        </section>

        <section id="precos" className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Precos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {['Essencial', 'Profissional', 'Escala'].map((plano, idx) => (
              <div key={plano} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                  <BadgeDollarSign size={18} />
                  {plano}
                </div>
                <p className="text-2xl font-bold mt-3">R$ {(idx + 1) * 497}</p>
                <p className="text-sm text-gray-500 mt-2">Valores demonstrativos para vitrine.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="sobre" className="bg-yellow-50 rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Sobre Nos</h2>
          <p className="text-gray-700">
            Esta pagina traz a identidade do repositório original em formato React para manter a
            mescla consistente: mesma proposta institucional, com estrutura mais escalavel.
          </p>
        </section>
      </main>
    </div>
  )
}
