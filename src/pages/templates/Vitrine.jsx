import { Link } from 'react-router-dom'
import {
  ShoppingCart, Cpu, Wrench, Briefcase, PartyPopper,
  UtensilsCrossed, GraduationCap, Truck, Package,
  Building2, Scissors, ArrowRight, Sparkles
} from 'lucide-react'

const vitrines = [
  {
    title: 'Supermercado',
    desc: 'Ofertas, categorias de produtos, delivery e programa de fidelidade.',
    path: '/supermercado',
    icon: ShoppingCart,
    color: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50',
  },
  {
    title: 'Comércio Focado',
    desc: 'Peças, eletrônicos e gráfica com catálogo e busca inteligente.',
    path: '/comercio-focado',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Serviço Individual',
    desc: 'Portfólio profissional, agendamento e depoimentos de clientes.',
    path: '/servico-individual',
    icon: Wrench,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
  },
  {
    title: 'Consultoria',
    desc: 'Cases de sucesso, metodologias e captação de leads qualificados.',
    path: '/consultoria',
    icon: Briefcase,
    color: 'from-slate-600 to-gray-800',
    bg: 'bg-slate-50',
  },
  {
    title: 'Eventos',
    desc: 'Calendário de eventos, galeria, inscrições e informações de local.',
    path: '/eventos',
    icon: PartyPopper,
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
  },
  {
    title: 'Restaurante',
    desc: 'Cardápio digital, reservas online, ambiente e horários.',
    path: '/restaurante',
    icon: UtensilsCrossed,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Ensino',
    desc: 'Cursos, matrícula online, grade curricular e depoimentos.',
    path: '/ensino',
    icon: GraduationCap,
    color: 'from-indigo-500 to-blue-700',
    bg: 'bg-indigo-50',
  },
  {
    title: 'Logística',
    desc: 'Rastreamento de cargas, frota, cobertura e cotações.',
    path: '/logistica',
    icon: Truck,
    color: 'from-teal-500 to-green-700',
    bg: 'bg-teal-50',
  },
  {
    title: 'Fornecedores',
    desc: 'Catálogo B2B, preços por volume, parcerias e pedidos.',
    path: '/fornecedores',
    icon: Package,
    color: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50',
  },
  {
    title: 'Imobiliária',
    desc: 'Listagem de imóveis, filtros avançados, tour virtual e contato.',
    path: '/imobiliaria',
    icon: Building2,
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
  },
  {
    title: 'Barbearia',
    desc: 'Agendamento, serviços, galeria de cortes e equipe.',
    path: '/barbearia',
    icon: Scissors,
    color: 'from-stone-600 to-neutral-800',
    bg: 'bg-stone-50',
  },
]

export default function Vitrine() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* HEADER SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-r from-dark-900 via-dark-800 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8 animate-fade-in">
            <Sparkles size={16} className="text-accent-400" />
            <span>Portfólio de Templates</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 animate-fade-in-up">
            Nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-accent-400">Vitrine</span> Digital
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Explore os templates que criamos para diferentes segmentos. Cada página foi
            desenhada para maximizar conversões e encantar seus clientes.
          </p>
          <div className="mt-10 flex justify-center gap-4 animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {vitrines.length} templates disponíveis
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-8 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm">
          <p className="text-sm md:text-base text-gray-700">
            Deseja voltar ao nosso website? Acesse{' '}
            <Link to="/" className="font-semibold text-primary-700 hover:underline">
              Home
            </Link>
            .
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vitrines.map((v, i) => {
            const Icon = v.icon
            return (
              <Link
                key={v.path}
                to={v.path}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${v.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {v.desc}
                </p>
                <div className="flex items-center gap-2 text-primary-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver template <ArrowRight size={14} />
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-dark-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition flex items-center justify-center w-10 h-10">
              <ion-icon name="logo-instagram" style={{ fontSize: '20px' }}></ion-icon>
            </a>
            <a href="#" className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition flex items-center justify-center w-10 h-10">
              <ion-icon name="mail-sharp" style={{ fontSize: '20px' }}></ion-icon>
            </a>
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Agência Digital — Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  )
}
