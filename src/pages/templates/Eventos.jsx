import { useState, useRef } from 'react'
import BackToHome from '../../components/BackToHome'
import Modal from '../../components/Modal'
import { useToast } from '../../components/Toast'
import {
  Calendar, MapPin, Clock, Users, Ticket, Star,
  ArrowRight, ChevronRight, Music, Mic2, Camera,
  PartyPopper, Heart, Share2, Filter, Search, Phone, Mail,
  CheckCircle, X
} from 'lucide-react'

const eventosData = [
  { id: 1, titulo: 'Festival de Verão 2026', data: '15 Mar 2026', horario: '16h - 00h', local: 'Arena Parque Central', tipo: 'Festival', preco: 120, vagas: 12, destaque: true },
  { id: 2, titulo: 'Workshop de Fotografia', data: '22 Mar 2026', horario: '9h - 17h', local: 'Centro Cultural', tipo: 'Workshop', preco: 250, vagas: 30, destaque: false },
  { id: 3, titulo: 'Stand-up Comedy Night', data: '28 Mar 2026', horario: '20h - 23h', local: 'Teatro Municipal', tipo: 'Show', preco: 80, vagas: 150, destaque: false },
  { id: 4, titulo: 'Conferência Tech 2026', data: '05 Abr 2026', horario: '8h - 18h', local: 'Centro de Convenções', tipo: 'Conferência', preco: 450, vagas: 200, destaque: true },
  { id: 5, titulo: 'Feira Gastronômica', data: '12 Abr 2026', horario: '11h - 22h', local: 'Praça da Liberdade', tipo: 'Feira', preco: 0, vagas: 999, destaque: false },
  { id: 6, titulo: 'Show Acústico - Sunset', data: '19 Abr 2026', horario: '17h - 21h', local: 'Rooftop Sky Bar', tipo: 'Show', preco: 60, vagas: 80, destaque: false },
]

const tipos = ['Todos', 'Festival', 'Workshop', 'Show', 'Conferência', 'Feira']

export default function Eventos() {
  const toast = useToast()
  const [tipoAtivo, setTipoAtivo] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [inscricaoModal, setInscricaoModal] = useState(null)
  const [inscricoes, setInscricoes] = useState([])
  const [formInscricao, setFormInscricao] = useState({ nome: '', email: '', qtd: 1 })
  const [emailNewsletter, setEmailNewsletter] = useState('')
  const eventosRef = useRef(null)

  const eventosFiltrados = eventosData.filter(e => {
    const tipoOk = tipoAtivo === 'Todos' || e.tipo === tipoAtivo
    const buscaOk = !busca || e.titulo.toLowerCase().includes(busca.toLowerCase()) || e.local.toLowerCase().includes(busca.toLowerCase())
    return tipoOk && buscaOk
  })

  const handleInscricao = () => {
    if (!formInscricao.nome || !formInscricao.email) {
      toast({ type: 'error', message: 'Preencha nome e e-mail' })
      return
    }
    setInscricoes(prev => [...prev, inscricaoModal.id])
    toast({ type: 'success', title: 'Inscrição confirmada!', message: `${inscricaoModal.titulo} — ${formInscricao.qtd} ingresso(s)` })
    setInscricaoModal(null)
    setFormInscricao({ nome: '', email: '', qtd: 1 })
  }

  const handleNewsletter = () => {
    if (!emailNewsletter || !emailNewsletter.includes('@')) {
      toast({ type: 'error', message: 'Informe um e-mail válido' })
      return
    }
    toast({ type: 'success', title: 'Inscrito!', message: 'Você receberá novidades no seu e-mail' })
    setEmailNewsletter('')
  }

  return (
    <div className="min-h-screen bg-white">
      <BackToHome />

      {/* HEADER SECTION */}
      <header className="relative bg-gradient-to-br from-pink-600 via-rose-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <PartyPopper size={14} />
              Eventos & Experiências
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Viva <span className="text-yellow-300">Momentos</span> Inesquecíveis
            </h1>
            <p className="text-lg text-pink-100 mb-8">
              Descubra os melhores eventos da cidade. Shows, workshops, conferências e muito mais em um só lugar.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => eventosRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-pink-700 px-8 py-3.5 rounded-full font-semibold hover:shadow-xl transition flex items-center gap-2"
              >
                Explorar Eventos <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-4 gap-4 max-w-lg">
            {[
              { icon: Music, label: 'Shows' },
              { icon: Mic2, label: 'Palestras' },
              { icon: Camera, label: 'Workshops' },
              { icon: PartyPopper, label: 'Festivais' },
            ].map((c, i) => (
              <button
                key={i}
                onClick={() => { setTipoAtivo(c.label === 'Palestras' ? 'Conferência' : c.label === 'Workshops' ? 'Workshop' : c.label === 'Festivais' ? 'Festival' : 'Show'); eventosRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition group"
              >
                <c.icon size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>


      {/* Filtros */}
      <section ref={eventosRef} className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {tipos.map(t => (
              <button
                key={t}
                onClick={() => setTipoAtivo(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  tipoAtivo === t ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar eventos..."
              className="pl-9 pr-8 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {busca && (
              <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Evento Destaque */}
      {eventosFiltrados.filter(e => e.destaque).length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventosFiltrados.filter(e => e.destaque).map((ev) => (
              <div key={ev.id} className="group relative bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <span className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  <Star size={12} /> Destaque
                </span>
                <h3 className="text-2xl font-bold mb-4">{ev.titulo}</h3>
                <div className="space-y-2 text-pink-100 text-sm">
                  <p className="flex items-center gap-2"><Calendar size={14} /> {ev.data}</p>
                  <p className="flex items-center gap-2"><Clock size={14} /> {ev.horario}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> {ev.local}</p>
                  <p className="flex items-center gap-2"><Users size={14} /> {ev.vagas < 20 ? `Últimas ${ev.vagas} vagas!` : `${ev.vagas} vagas`}</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-bold">{ev.preco > 0 ? `R$ ${ev.preco}` : 'Gratuito'}</span>
                  <button
                    onClick={() => inscricoes.includes(ev.id) ? null : setInscricaoModal(ev)}
                    className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 text-sm ${
                      inscricoes.includes(ev.id) ? 'bg-green-500 text-white' : 'bg-white text-pink-700 hover:shadow-lg'
                    }`}
                  >
                    {inscricoes.includes(ev.id) ? <><CheckCircle size={14} /> Inscrito</> : <><Ticket size={14} /> Garantir Ingresso</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lista de Eventos */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6">Próximos Eventos</h2>
        <div className="space-y-4">
          {eventosFiltrados.map((ev) => (
            <div key={ev.id} className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-pink-100 transition-all flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="bg-pink-50 rounded-xl p-4 text-center min-w-[80px]">
                <span className="text-2xl font-bold text-pink-600">{ev.data.split(' ')[0]}</span>
                <p className="text-xs text-pink-400 uppercase font-medium">{ev.data.split(' ')[1]}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">{ev.tipo}</span>
                  <span className="text-xs text-gray-400">{ev.vagas < 20 ? `Últimas ${ev.vagas} vagas!` : `${ev.vagas} vagas`}</span>
                </div>
                <h3 className="font-bold text-lg group-hover:text-pink-600 transition-colors">{ev.titulo}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={14} /> {ev.horario}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {ev.local}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-gray-800">{ev.preco > 0 ? `R$ ${ev.preco}` : 'Gratuito'}</span>
                <button
                  onClick={() => inscricoes.includes(ev.id) ? null : setInscricaoModal(ev)}
                  className={`px-5 py-2.5 rounded-full font-medium transition text-sm flex items-center gap-1 ${
                    inscricoes.includes(ev.id) ? 'bg-green-100 text-green-700' : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
                >
                  {inscricoes.includes(ev.id) ? <><CheckCircle size={14} /> Inscrito</> : <><Ticket size={14} /> Inscrever</>}
                </button>
              </div>
            </div>
          ))}
          {eventosFiltrados.length === 0 && (
            <div className="text-center py-16">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum evento encontrado</p>
              <button onClick={() => { setBusca(''); setTipoAtivo('Todos') }} className="mt-3 text-pink-600 font-semibold hover:underline">Limpar filtros</button>
            </div>
          )}
        </div>
      </section>

      {/* Inscricao Modal */}
      <Modal open={!!inscricaoModal} onClose={() => setInscricaoModal(null)} title="Inscrição no Evento">
        {inscricaoModal && (
          <div>
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl p-5 text-white mb-6">
              <h3 className="text-lg font-bold">{inscricaoModal.titulo}</h3>
              <div className="flex flex-wrap gap-3 mt-2 text-pink-100 text-sm">
                <span className="flex items-center gap-1"><Calendar size={14} /> {inscricaoModal.data}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {inscricaoModal.horario}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {inscricaoModal.local}</span>
              </div>
              <p className="text-2xl font-bold mt-3">{inscricaoModal.preco > 0 ? `R$ ${inscricaoModal.preco}` : 'Gratuito'}</p>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nome completo *"
                value={formInscricao.nome}
                onChange={e => setFormInscricao({ ...formInscricao, nome: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="email"
                placeholder="E-mail *"
                value={formInscricao.email}
                onChange={e => setFormInscricao({ ...formInscricao, email: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Ingressos:</label>
                <select
                  value={formInscricao.qtd}
                  onChange={e => setFormInscricao({ ...formInscricao, qtd: +e.target.value })}
                  className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                {inscricaoModal.preco > 0 && (
                  <span className="text-sm font-bold text-pink-600 ml-auto">
                    Total: R$ {inscricaoModal.preco * formInscricao.qtd}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleInscricao}
              className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition flex items-center justify-center gap-2"
            >
              <Ticket size={16} /> Confirmar Inscrição
            </button>
          </div>
        )}
      </Modal>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Não perca nenhum evento!</h2>
          <p className="text-pink-100 mb-8">Receba as novidades e promoções exclusivas no seu e-mail</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={emailNewsletter}
              onChange={e => setEmailNewsletter(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleNewsletter}
              className="bg-yellow-400 text-pink-800 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Assinar
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <PartyPopper size={20} className="text-pink-500" />
            <span className="font-bold">EventosBR</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition flex items-center justify-center w-10 h-10">
              <ion-icon name="logo-instagram" style={{ fontSize: '20px' }}></ion-icon>
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition flex items-center justify-center w-10 h-10">
              <ion-icon name="mail-sharp" style={{ fontSize: '20px' }}></ion-icon>
            </a>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
