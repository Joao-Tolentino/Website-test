import { useState, useRef } from 'react'
import BackToHome from '../components/BackToHome'
import Modal from '../components/Modal'
import { useToast } from '../components/Toast'
import {
  Truck, Package, MapPin, Clock, Shield, BarChart3,
  ArrowRight, ChevronRight, Search, Globe, Zap,
  CheckCircle, Phone, Mail, Building2, Users,
  TrendingUp, Star, FileText, Navigation, X, AlertCircle
} from 'lucide-react'

const servicos = [
  { titulo: 'Transporte Rodoviário', desc: 'Frota própria com rastreamento em tempo real', icon: Truck, detalhe: 'Todo território nacional' },
  { titulo: 'Logística Integrada', desc: 'Armazenagem, picking, packing e distribuição', icon: Package, detalhe: 'Centro de distribuição 20.000m²' },
  { titulo: 'Entrega Expressa', desc: 'Entregas urgentes com prazos reduzidos', icon: Zap, detalhe: 'Até 24h para capitais' },
  { titulo: 'Carga Internacional', desc: 'Importação e exportação com desembaraço', icon: Globe, detalhe: '+40 países atendidos' },
]

const numeros = [
  { num: '2.500+', label: 'Entregas/dia', icon: Package },
  { num: '350+', label: 'Veículos na frota', icon: Truck },
  { num: '99.2%', label: 'Entregas no prazo', icon: CheckCircle },
  { num: '800+', label: 'Clientes ativos', icon: Users },
]

const rastreioSimulado = {
  codigo: 'LG2026001234',
  status: 'Em trânsito',
  destino: 'São Paulo, SP',
  previsao: '18 Mar 2026',
  etapas: [
    { data: '15 Mar 08:30', local: 'Centro de Distribuição — Curitiba, PR', status: 'Coletado' },
    { data: '15 Mar 14:15', local: 'Hub Regional — Curitiba, PR', status: 'Em processamento' },
    { data: '16 Mar 06:00', local: 'Em trânsito — Rodovia BR-116', status: 'Em trânsito' },
    { data: '17 Mar 10:00', local: 'Hub São Paulo — Guarulhos, SP', status: 'Chegou no hub' },
    { data: '18 Mar', local: 'Previsão de entrega — São Paulo, SP', status: 'Previsto' },
  ]
}

export default function Logistica() {
  const toast = useToast()
  const [rastreio, setRastreio] = useState('')
  const [resultado, setResultado] = useState(null)
  const [buscando, setBuscando] = useState(false)
  const [cotacaoModal, setCotacaoModal] = useState(false)
  const [formCotacao, setFormCotacao] = useState({ nome: '', empresa: '', email: '', telefone: '', origem: '', destino: '', peso: '', tipo: 'Carga Geral' })
  const servicosRef = useRef(null)

  const handleRastrear = () => {
    if (!rastreio.trim()) {
      toast({ type: 'error', message: 'Informe o código de rastreamento' })
      return
    }
    setBuscando(true)
    setResultado(null)
    setTimeout(() => {
      setBuscando(false)
      if (rastreio.toUpperCase().includes('LG') || rastreio.length >= 6) {
        setResultado(rastreioSimulado)
        toast({ type: 'success', message: 'Encomenda localizada!' })
      } else {
        setResultado('not_found')
        toast({ type: 'error', message: 'Código não encontrado' })
      }
    }, 1500)
  }

  const handleCotacao = () => {
    if (!formCotacao.nome || !formCotacao.email || !formCotacao.origem || !formCotacao.destino) {
      toast({ type: 'error', message: 'Preencha os campos obrigatórios' })
      return
    }
    toast({ type: 'success', title: 'Cotação enviada!', message: 'Responderemos em até 2 horas' })
    setCotacaoModal(false)
    setFormCotacao({ nome: '', empresa: '', email: '', telefone: '', origem: '', destino: '', peso: '', tipo: 'Carga Geral' })
  }

  return (
    <div className="min-h-screen bg-white">
      <BackToHome />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Truck size={14} />
              Logística & Transporte
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Sua carga no <span className="text-emerald-400">destino certo</span>, no prazo certo
            </h1>
            <p className="text-lg text-teal-200 mb-8">
              Soluções logísticas completas para empresas que precisam de agilidade, segurança e rastreamento em tempo real.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCotacaoModal(true)}
                className="bg-emerald-500 hover:bg-emerald-600 px-8 py-3.5 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg shadow-emerald-500/30"
              >
                Solicitar Cotação <ArrowRight size={18} />
              </button>
              <button
                onClick={() => servicosRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/20 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/5 transition"
              >
                Nossos Serviços
              </button>
            </div>
          </div>

          {/* Rastreamento */}
          <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-xl">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Navigation size={16} className="text-emerald-400" /> Rastrear Encomenda
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={rastreio}
                onChange={(e) => setRastreio(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRastrear()}
                placeholder="Código de rastreamento (ex: LG2026001234)"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                onClick={handleRastrear}
                disabled={buscando}
                className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {buscando ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Buscando...</span>
                ) : (
                  <><Search size={16} /> Rastrear</>
                )}
              </button>
            </div>

            {resultado && resultado !== 'not_found' && (
              <div className="mt-4 bg-white/10 rounded-xl p-4 animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-teal-300">Código: {resultado.codigo}</p>
                    <p className="font-bold text-lg">{resultado.status}</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">Previsão: {resultado.previsao}</span>
                </div>
                <div className="space-y-3 mt-4">
                  {resultado.etapas.map((e, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${i <= 3 ? 'bg-emerald-400' : 'bg-white/20'}`} />
                        {i < resultado.etapas.length - 1 && <div className={`w-0.5 flex-1 ${i < 3 ? 'bg-emerald-400/50' : 'bg-white/10'}`} />}
                      </div>
                      <div className="pb-3">
                        <p className="text-xs text-teal-400">{e.data}</p>
                        <p className="text-sm font-medium">{e.status}</p>
                        <p className="text-xs text-teal-300">{e.local}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resultado === 'not_found' && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
                <AlertCircle size={20} className="text-red-400" />
                <div>
                  <p className="font-medium text-red-300">Código não encontrado</p>
                  <p className="text-xs text-red-400">Verifique o código e tente novamente. Exemplo: LG2026001234</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {numeros.map((n, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-lg text-center hover:shadow-xl transition-shadow">
              <n.icon size={24} className="text-teal-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{n.num}</p>
              <p className="text-sm text-gray-500">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section ref={servicosRef} className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Soluções</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Nossos Serviços</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicos.map((s, i) => (
            <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-teal-200 transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="bg-teal-100 p-3 rounded-xl group-hover:bg-teal-600 transition-colors">
                  <s.icon size={24} className="text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{s.titulo}</h3>
                  <p className="text-gray-500 text-sm mb-3">{s.desc}</p>
                  <span className="text-xs bg-teal-50 text-teal-600 px-2 py-1 rounded-full font-medium">{s.detalhe}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cobertura */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Cobertura</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Presença em Todo o Brasil</h2>
              <p className="text-gray-500 mb-8">
                Com centros de distribuição estrategicamente localizados, garantimos cobertura nacional com prazos competitivos.
              </p>
              <div className="space-y-4">
                {[
                  { regiao: 'Sudeste', prazo: '1-2 dias úteis', cidades: '850+ cidades' },
                  { regiao: 'Sul', prazo: '2-3 dias úteis', cidades: '620+ cidades' },
                  { regiao: 'Nordeste', prazo: '3-5 dias úteis', cidades: '480+ cidades' },
                  { regiao: 'Centro-Oeste', prazo: '2-4 dias úteis', cidades: '350+ cidades' },
                  { regiao: 'Norte', prazo: '5-7 dias úteis', cidades: '200+ cidades' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-teal-600" />
                      <span className="font-medium">{r.regiao}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Clock size={14} /> {r.prazo}</span>
                      <span className="text-teal-600 font-medium">{r.cidades}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-100 to-emerald-50 rounded-3xl h-96 flex items-center justify-center">
              <Globe size={120} className="text-teal-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Cotação Modal */}
      <Modal open={cotacaoModal} onClose={() => setCotacaoModal(false)} title="Solicitar Cotação" size="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nome *" value={formCotacao.nome} onChange={e => setFormCotacao({ ...formCotacao, nome: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="text" placeholder="Empresa" value={formCotacao.empresa} onChange={e => setFormCotacao({ ...formCotacao, empresa: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="email" placeholder="E-mail *" value={formCotacao.email} onChange={e => setFormCotacao({ ...formCotacao, email: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="tel" placeholder="Telefone" value={formCotacao.telefone} onChange={e => setFormCotacao({ ...formCotacao, telefone: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="text" placeholder="Cidade de origem *" value={formCotacao.origem} onChange={e => setFormCotacao({ ...formCotacao, origem: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="text" placeholder="Cidade de destino *" value={formCotacao.destino} onChange={e => setFormCotacao({ ...formCotacao, destino: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <input type="text" placeholder="Peso estimado (kg)" value={formCotacao.peso} onChange={e => setFormCotacao({ ...formCotacao, peso: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
          <select value={formCotacao.tipo} onChange={e => setFormCotacao({ ...formCotacao, tipo: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-600">
            <option>Carga Geral</option>
            <option>Carga Fracionada</option>
            <option>Carga Expressa</option>
            <option>Carga Internacional</option>
          </select>
        </div>
        <button onClick={handleCotacao} className="w-full mt-6 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition flex items-center justify-center gap-2">
          <FileText size={16} /> Enviar Cotação
        </button>
      </Modal>

      {/* CTA */}
      <section className="bg-teal-700 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solicite uma cotação sem compromisso</h2>
          <p className="text-teal-100 mb-8">Resposta em até 2 horas para cargas nacionais</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCotacaoModal(true)}
              className="bg-white text-teal-700 px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition flex items-center gap-2"
            >
              <FileText size={18} /> Fazer Cotação
            </button>
            <button className="border border-white/30 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2">
              <Phone size={18} /> (11) 3500-0000
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Truck size={20} className="text-emerald-400" />
            <span className="font-bold">VelozLog</span>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
