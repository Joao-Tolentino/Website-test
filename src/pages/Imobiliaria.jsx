import { useState } from 'react'
import BackToHome from '../components/BackToHome'
import Modal from '../components/Modal'
import { useToast } from '../components/Toast'
import {
  Building2, Search, MapPin, Bed, Bath, Car, Maximize,
  Heart, Eye, ArrowRight, ChevronRight, Phone, Mail,
  Star, Filter, Grid3X3, List, Home, Key, TrendingUp,
  DollarSign, Users, Award, ChevronDown, Calendar, X, CheckCircle
} from 'lucide-react'

const tipos = ['Todos', 'Apartamento', 'Casa', 'Comercial', 'Terreno']

const imoveis = [
  { id: 1, titulo: 'Apartamento Alto Padrão', tipo: 'Apartamento', local: 'Jardins, São Paulo', preco: 'R$ 1.250.000', area: '142m²', quartos: 3, banheiros: 2, vagas: 2, modalidade: 'Venda', destaque: true, desc: 'Apartamento reformado com acabamento premium, piso em porcelanato, varanda gourmet e vista panorâmica.' },
  { id: 2, titulo: 'Casa com Piscina', tipo: 'Casa', local: 'Alphaville, Barueri', preco: 'R$ 2.800.000', area: '380m²', quartos: 4, banheiros: 3, vagas: 4, modalidade: 'Venda', destaque: true, desc: 'Casa em condomínio fechado com piscina, churrasqueira, jardim amplo e segurança 24h.' },
  { id: 3, titulo: 'Sala Comercial 50m²', tipo: 'Comercial', local: 'Paulista, São Paulo', preco: 'R$ 4.500/mês', area: '50m²', quartos: 0, banheiros: 1, vagas: 1, modalidade: 'Aluguel', destaque: false, desc: 'Sala comercial na Avenida Paulista com recepção, copa e ar-condicionado central.' },
  { id: 4, titulo: 'Cobertura Duplex', tipo: 'Apartamento', local: 'Vila Madalena, SP', preco: 'R$ 3.200.000', area: '280m²', quartos: 4, banheiros: 4, vagas: 3, modalidade: 'Venda', destaque: false, desc: 'Cobertura duplex com terraço, piscina privativa, churrasqueira e sala de estar ampla.' },
  { id: 5, titulo: 'Terreno 500m²', tipo: 'Terreno', local: 'Cotia, SP', preco: 'R$ 450.000', area: '500m²', quartos: 0, banheiros: 0, vagas: 0, modalidade: 'Venda', destaque: false, desc: 'Terreno plano em condomínio com infraestrutura completa, ideal para construção.' },
  { id: 6, titulo: 'Studio Mobiliado', tipo: 'Apartamento', local: 'Pinheiros, São Paulo', preco: 'R$ 3.200/mês', area: '35m²', quartos: 1, banheiros: 1, vagas: 0, modalidade: 'Aluguel', destaque: false, desc: 'Studio moderno e totalmente mobiliado, próximo ao metrô, ideal para jovens profissionais.' },
  { id: 7, titulo: 'Casa Térrea Moderna', tipo: 'Casa', local: 'Granja Viana, Cotia', preco: 'R$ 1.650.000', area: '220m²', quartos: 3, banheiros: 3, vagas: 2, modalidade: 'Venda', destaque: false, desc: 'Casa térrea com projeto moderno, cozinha integrada, suíte master e jardim.' },
  { id: 8, titulo: 'Loja de Rua 120m²', tipo: 'Comercial', local: 'Oscar Freire, SP', preco: 'R$ 18.000/mês', area: '120m²', quartos: 0, banheiros: 2, vagas: 0, modalidade: 'Aluguel', destaque: false, desc: 'Loja de rua em ponto nobre, alto fluxo de pedestres, ideal para varejo premium.' },
]

export default function Imobiliaria() {
  const toast = useToast()
  const [tipoAtivo, setTipoAtivo] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [favoritos, setFavoritos] = useState([])
  const [detalhe, setDetalhe] = useState(null)
  const [contatoModal, setContatoModal] = useState(null)
  const [visitaModal, setVisitaModal] = useState(null)
  const [formContato, setFormContato] = useState({ nome: '', email: '', telefone: '', mensagem: '' })
  const [formVisita, setFormVisita] = useState({ nome: '', telefone: '', data: '', hora: '' })

  const imoveisFiltrados = imoveis.filter(im =>
    (tipoAtivo === 'Todos' || im.tipo === tipoAtivo) &&
    (im.titulo.toLowerCase().includes(busca.toLowerCase()) || im.local.toLowerCase().includes(busca.toLowerCase()))
  )

  const toggleFav = (id) => {
    setFavoritos(prev => {
      if (prev.includes(id)) {
        toast({ type: 'info', message: 'Removido dos favoritos' })
        return prev.filter(i => i !== id)
      }
      toast({ type: 'success', message: 'Adicionado aos favoritos' })
      return [...prev, id]
    })
  }

  const handleContato = () => {
    if (!formContato.nome || !formContato.email) { toast({ type: 'error', message: 'Preencha nome e e-mail' }); return }
    toast({ type: 'success', title: 'Mensagem enviada!', message: 'Um corretor entrará em contato em breve' })
    setContatoModal(null)
    setFormContato({ nome: '', email: '', telefone: '', mensagem: '' })
  }

  const handleVisita = () => {
    if (!formVisita.nome || !formVisita.data) { toast({ type: 'error', message: 'Preencha nome e data' }); return }
    toast({ type: 'success', title: 'Visita agendada!', message: `${formVisita.data} às ${formVisita.hora || 'a combinar'}` })
    setVisitaModal(null)
    setFormVisita({ nome: '', telefone: '', data: '', hora: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackToHome />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl" /></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6"><Building2 size={14} /> Imobiliária Premium</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">Encontre o <span className="text-sky-400">imóvel ideal</span> para você</h1>
            <p className="text-lg text-sky-200">Mais de 2.000 imóveis para venda e locação.</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-300" />
                <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por bairro, cidade ou tipo..." className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition text-sm" />
              </div>
              <select className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400">
                <option>Comprar</option><option>Alugar</option>
              </select>
              <button onClick={() => document.getElementById('listagem')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-sky-500 hover:bg-sky-600 rounded-xl px-6 py-3 font-semibold transition flex items-center justify-center gap-2 text-sm">
                <Search size={16} /> Buscar Imóveis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Building2, num: '2.000+', label: 'Imóveis' },
            { icon: Users, num: '45', label: 'Corretores' },
            { icon: Key, num: '500+', label: 'Negociados/ano' },
            { icon: Star, num: '4.9', label: 'Avaliação' },
          ].map((n, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-lg text-center hover:shadow-xl transition">
              <n.icon size={22} className="text-sky-600 mx-auto mb-2" /><p className="text-xl font-bold">{n.num}</p><p className="text-xs text-gray-500">{n.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destaques */}
      {imoveis.filter(i => i.destaque).length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-6">Imóveis em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {imoveis.filter(i => i.destaque).map((im) => (
              <div key={im.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer" onClick={() => setDetalhe(im)}>
                <div className="relative h-64 bg-gradient-to-br from-sky-100 to-blue-50 flex items-center justify-center">
                  <Home size={64} className="text-sky-200 group-hover:text-sky-300 transition-colors" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${im.modalidade === 'Venda' ? 'bg-sky-600 text-white' : 'bg-amber-500 text-white'}`}>{im.modalidade}</span>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); toggleFav(im.id) }} className="bg-white/90 p-2 rounded-full shadow hover:bg-white transition">
                      <Heart size={16} className={favoritos.includes(im.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-sky-600 transition-colors">{im.titulo}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} /> {im.local}</p>
                    </div>
                    <span className="text-xl font-bold text-sky-600">{im.preco}</span>
                  </div>
                  <div className="flex gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Maximize size={14} /> {im.area}</span>
                    {im.quartos > 0 && <span className="flex items-center gap-1"><Bed size={14} /> {im.quartos} quartos</span>}
                    {im.banheiros > 0 && <span className="flex items-center gap-1"><Bath size={14} /> {im.banheiros} banh.</span>}
                    {im.vagas > 0 && <span className="flex items-center gap-1"><Car size={14} /> {im.vagas} vagas</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Listagem */}
      <section id="listagem" className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Todos os Imóveis</h2>
          <div className="flex flex-wrap gap-2">
            {tipos.map(t => (
              <button key={t} onClick={() => setTipoAtivo(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${tipoAtivo === t ? 'bg-sky-600 text-white' : 'bg-white text-gray-600 hover:bg-sky-50 border'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {imoveisFiltrados.map((im) => (
            <div key={im.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer" onClick={() => setDetalhe(im)}>
              <div className="relative h-44 bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center">
                <Home size={40} className="text-sky-200 group-hover:text-sky-300 transition-colors" />
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold ${im.modalidade === 'Venda' ? 'bg-sky-600 text-white' : 'bg-amber-500 text-white'}`}>{im.modalidade}</span>
                <button onClick={(e) => { e.stopPropagation(); toggleFav(im.id) }} className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow">
                  <Heart size={14} className={favoritos.includes(im.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                </button>
              </div>
              <div className="p-4">
                <span className="text-xs text-sky-600 font-medium">{im.tipo}</span>
                <h3 className="font-bold mt-1 text-sm group-hover:text-sky-600 transition-colors">{im.titulo}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MapPin size={12} /> {im.local}</p>
                <div className="flex gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-0.5"><Maximize size={12} /> {im.area}</span>
                  {im.quartos > 0 && <span className="flex items-center gap-0.5"><Bed size={12} /> {im.quartos}</span>}
                  {im.vagas > 0 && <span className="flex items-center gap-0.5"><Car size={12} /> {im.vagas}</span>}
                </div>
                <p className="text-lg font-bold text-sky-600 mt-3">{im.preco}</p>
              </div>
            </div>
          ))}
        </div>
        {imoveisFiltrados.length === 0 && (
          <div className="text-center py-16">
            <Building2 size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum imóvel encontrado</p>
            <button onClick={() => { setBusca(''); setTipoAtivo('Todos') }} className="mt-3 text-sky-600 font-semibold hover:underline">Limpar filtros</button>
          </div>
        )}
      </section>

      {/* Detalhe Modal */}
      <Modal open={!!detalhe} onClose={() => setDetalhe(null)} title="Detalhes do Imóvel" size="lg">
        {detalhe && (
          <div>
            <div className="bg-gradient-to-br from-sky-100 to-blue-50 rounded-xl h-56 flex items-center justify-center mb-6">
              <Home size={80} className="text-sky-200" />
            </div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${detalhe.modalidade === 'Venda' ? 'bg-sky-100 text-sky-600' : 'bg-amber-100 text-amber-600'}`}>{detalhe.modalidade}</span>
                <h3 className="text-2xl font-bold mt-2">{detalhe.titulo}</h3>
                <p className="text-gray-500 flex items-center gap-1 mt-1"><MapPin size={14} /> {detalhe.local}</p>
              </div>
              <span className="text-2xl font-bold text-sky-600">{detalhe.preco}</span>
            </div>
            <p className="text-gray-600 mb-4">{detalhe.desc}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 bg-gray-50 rounded-xl p-4">
              <span className="flex items-center gap-1"><Maximize size={16} /> {detalhe.area}</span>
              {detalhe.quartos > 0 && <span className="flex items-center gap-1"><Bed size={16} /> {detalhe.quartos} quartos</span>}
              {detalhe.banheiros > 0 && <span className="flex items-center gap-1"><Bath size={16} /> {detalhe.banheiros} banheiros</span>}
              {detalhe.vagas > 0 && <span className="flex items-center gap-1"><Car size={16} /> {detalhe.vagas} vagas</span>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setDetalhe(null); setContatoModal(detalhe) }}
                className="flex-1 bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition flex items-center justify-center gap-2">
                <Phone size={16} /> Falar com Corretor
              </button>
              <button onClick={() => { setDetalhe(null); setVisitaModal(detalhe) }}
                className="flex-1 border border-sky-200 py-3 rounded-xl font-semibold text-sky-600 hover:bg-sky-50 transition flex items-center justify-center gap-2">
                <Calendar size={16} /> Agendar Visita
              </button>
              <button onClick={() => toggleFav(detalhe.id)}
                className={`p-3 rounded-xl border transition ${favoritos.includes(detalhe.id) ? 'bg-red-50 border-red-200' : 'hover:bg-gray-50'}`}>
                <Heart size={20} className={favoritos.includes(detalhe.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Contato Modal */}
      <Modal open={!!contatoModal} onClose={() => setContatoModal(null)} title="Falar com Corretor" size="sm">
        <div className="space-y-3">
          <input type="text" placeholder="Nome *" value={formContato.nome} onChange={e => setFormContato({ ...formContato, nome: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <input type="email" placeholder="E-mail *" value={formContato.email} onChange={e => setFormContato({ ...formContato, email: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <input type="tel" placeholder="Telefone" value={formContato.telefone} onChange={e => setFormContato({ ...formContato, telefone: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <textarea placeholder="Mensagem" rows={3} value={formContato.mensagem} onChange={e => setFormContato({ ...formContato, mensagem: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
        </div>
        <button onClick={handleContato} className="w-full mt-4 bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition">Enviar Mensagem</button>
      </Modal>

      {/* Visita Modal */}
      <Modal open={!!visitaModal} onClose={() => setVisitaModal(null)} title="Agendar Visita" size="sm">
        <div className="space-y-3">
          <input type="text" placeholder="Nome *" value={formVisita.nome} onChange={e => setFormVisita({ ...formVisita, nome: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <input type="tel" placeholder="Telefone" value={formVisita.telefone} onChange={e => setFormVisita({ ...formVisita, telefone: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <input type="date" value={formVisita.data} onChange={e => setFormVisita({ ...formVisita, data: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
          <input type="time" value={formVisita.hora} onChange={e => setFormVisita({ ...formVisita, hora: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <button onClick={handleVisita} className="w-full mt-4 bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition flex items-center justify-center gap-2">
          <Calendar size={16} /> Confirmar Visita
        </button>
      </Modal>

      {/* CTA */}
      <section className="bg-sky-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Não encontrou o imóvel ideal?</h2>
          <p className="text-sky-100 mb-8">Fale com um de nossos corretores e encontre a melhor opção para você.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setContatoModal({})} className="bg-white text-sky-700 px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition flex items-center gap-2">
              <Phone size={18} /> Falar com Corretor
            </button>
            <button onClick={() => setVisitaModal({})} className="border border-white/30 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2">
              <Calendar size={18} /> Agendar Visita
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><Building2 size={20} className="text-sky-400" /><span className="font-bold">Prime Imóveis</span></div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
