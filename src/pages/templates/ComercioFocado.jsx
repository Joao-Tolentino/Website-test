import { useState } from 'react'
import BackToHome from '../../components/BackToHome'
import Modal from '../../components/Modal'
import { useToast } from '../../components/Toast'
import {
  Search, Filter, Grid3X3, List, Star, ShoppingCart,
  Heart, Eye, Cpu, Wrench, Zap, ChevronDown,
  ArrowUpDown, Package, Truck, Shield, Headphones,
  Phone, Mail, MapPin, X, Plus, Minus, Trash2
} from 'lucide-react'

const categorias = ['Todos', 'Eletrônicos', 'Peças Automotivas', 'Gráfica', 'Informática', 'Ferramentas']

const produtos = [
  { id: 1, nome: 'Placa de Vídeo RTX 4060', preco: 2499.00, parcela: '12x R$ 208,25', categoria: 'Eletrônicos', rating: 4.8, reviews: 234, estoque: true },
  { id: 2, nome: 'Kit Pastilha de Freio Premium', preco: 189.90, parcela: '6x R$ 31,65', categoria: 'Peças Automotivas', rating: 4.5, reviews: 87, estoque: true },
  { id: 3, nome: 'Impressão Banner 3x1m', preco: 120.00, parcela: '3x R$ 40,00', categoria: 'Gráfica', rating: 4.9, reviews: 312, estoque: true },
  { id: 4, nome: 'SSD NVMe 1TB Gen4', preco: 449.00, parcela: '10x R$ 44,90', categoria: 'Informática', rating: 4.7, reviews: 156, estoque: true },
  { id: 5, nome: 'Kit Amortecedor Dianteiro', preco: 520.00, parcela: '8x R$ 65,00', categoria: 'Peças Automotivas', rating: 4.3, reviews: 42, estoque: false },
  { id: 6, nome: 'Cartão de Visita 1000un', preco: 89.90, parcela: '2x R$ 44,95', categoria: 'Gráfica', rating: 4.6, reviews: 528, estoque: true },
  { id: 7, nome: 'Furadeira de Impacto 700W', preco: 299.00, parcela: '6x R$ 49,83', categoria: 'Ferramentas', rating: 4.4, reviews: 98, estoque: true },
  { id: 8, nome: 'Monitor 27" 144Hz IPS', preco: 1299.00, parcela: '12x R$ 108,25', categoria: 'Eletrônicos', rating: 4.8, reviews: 201, estoque: true },
  { id: 9, nome: 'Flyer A5 Couché 5000un', preco: 260.00, parcela: '4x R$ 65,00', categoria: 'Gráfica', rating: 4.7, reviews: 189, estoque: true },
]

const faixas = [
  { label: 'Até R$ 100', min: 0, max: 100 },
  { label: 'R$ 100 - R$ 500', min: 100, max: 500 },
  { label: 'R$ 500 - R$ 1.000', min: 500, max: 1000 },
  { label: 'Acima de R$ 1.000', min: 1000, max: Infinity },
]

const ordenacoes = [
  { label: 'Relevância', fn: () => 0 },
  { label: 'Menor preço', fn: (a, b) => a.preco - b.preco },
  { label: 'Maior preço', fn: (a, b) => b.preco - a.preco },
  { label: 'Melhor avaliação', fn: (a, b) => b.rating - a.rating },
  { label: 'Mais vendidos', fn: (a, b) => b.reviews - a.reviews },
]

function fmt(v) { return `R$ ${v.toFixed(2).replace('.', ',')}` }

export default function ComercioFocado() {
  const toast = useToast()
  const [catAtiva, setCatAtiva] = useState('Todos')
  const [viewMode, setViewMode] = useState('grid')
  const [busca, setBusca] = useState('')
  const [faixaSel, setFaixaSel] = useState([])
  const [somenteEstoque, setSomenteEstoque] = useState(true)
  const [ordenacao, setOrdenacao] = useState(0)
  const [sortOpen, setSortOpen] = useState(false)
  const [carrinho, setCarrinho] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [quickView, setQuickView] = useState(null)

  const toggleFaixa = (idx) => {
    setFaixaSel(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])
  }

  let produtosFiltrados = produtos.filter(p => {
    const catOk = catAtiva === 'Todos' || p.categoria === catAtiva
    const buscaOk = !busca || p.nome.toLowerCase().includes(busca.toLowerCase())
    const estoqueOk = !somenteEstoque || p.estoque
    const faixaOk = faixaSel.length === 0 || faixaSel.some(idx => p.preco >= faixas[idx].min && p.preco < faixas[idx].max)
    return catOk && buscaOk && estoqueOk && faixaOk
  })

  if (ordenacao > 0) {
    produtosFiltrados = [...produtosFiltrados].sort(ordenacoes[ordenacao].fn)
  }

  const addCarrinho = (p) => {
    if (!p.estoque) return
    setCarrinho(prev => {
      const ex = prev.find(i => i.id === p.id)
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...p, qtd: 1 }]
    })
    toast({ type: 'cart', title: 'Adicionado!', message: p.nome })
  }

  const toggleFav = (p) => {
    setFavoritos(prev => {
      if (prev.includes(p.id)) {
        toast({ type: 'info', message: 'Removido dos favoritos' })
        return prev.filter(id => id !== p.id)
      }
      toast({ type: 'success', message: 'Adicionado aos favoritos' })
      return [...prev, p.id]
    })
  }

  const totalCarrinho = carrinho.reduce((a, i) => a + i.preco * i.qtd, 0)
  const totalItens = carrinho.reduce((a, i) => a + i.qtd, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <BackToHome />

      {/* HEADER SECTION */}
      <header className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <Cpu size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">TechParts</h1>
                <p className="text-xs text-blue-200">Eletrônicos • Peças • Gráfica</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm text-blue-200">
                <span className="flex items-center gap-1"><Phone size={14} /> (11) 4000-1234</span>
                <span className="flex items-center gap-1"><Mail size={14} /> contato@techparts.com</span>
              </div>
              <button onClick={() => setCarrinhoAberto(true)} className="relative flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl hover:bg-white/20 transition text-sm">
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Carrinho</span>
                {totalItens > 0 && <span className="bg-cyan-400 text-blue-900 text-xs font-bold px-1.5 py-0.5 rounded-full">{totalItens}</span>}
              </button>
            </div>
          </div>

          <div className="mt-6 relative max-w-2xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por produto, código, marca..."
              className="w-full pl-11 pr-10 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/20 transition"
            />
            {busca && (
              <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Benefits bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center gap-8 text-sm">
          {[
            { icon: Truck, text: 'Frete Grátis acima de R$ 300' },
            { icon: Shield, text: 'Garantia Estendida' },
            { icon: Package, text: 'Troca Fácil em 30 dias' },
            { icon: Headphones, text: 'Suporte Especializado' },
          ].map((b, i) => (
            <div key={i} className="hidden md:flex items-center gap-2 text-gray-600">
              <b.icon size={16} className="text-blue-600" />
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filtros */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl p-4 shadow-sm sticky top-4">
              <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                <Filter size={16} /> Filtros
              </h3>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase font-semibold">Categoria</p>
                {categorias.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCatAtiva(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      catAtiva === cat ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-xs text-gray-500 uppercase font-semibold">Faixa de Preço</p>
                {faixas.map((f, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faixaSel.includes(i)}
                      onChange={() => toggleFaixa(i)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {f.label}
                  </label>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-xs text-gray-500 uppercase font-semibold">Disponibilidade</p>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={somenteEstoque}
                    onChange={() => setSomenteEstoque(!somenteEstoque)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Em estoque
                </label>
              </div>

              {(faixaSel.length > 0 || catAtiva !== 'Todos' || busca) && (
                <button
                  onClick={() => { setFaixaSel([]); setCatAtiva('Todos'); setBusca(''); setSomenteEstoque(true) }}
                  className="w-full mt-4 text-sm text-blue-600 font-semibold hover:underline"
                >
                  Limpar todos os filtros
                </button>
              )}
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{produtosFiltrados.length}</span> produtos encontrados
              </p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition bg-white px-3 py-1.5 rounded-lg border"
                  >
                    <ArrowUpDown size={14} /> {ordenacoes[ordenacao].label} <ChevronDown size={14} />
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border rounded-xl shadow-xl z-20 py-1 min-w-[180px]">
                      {ordenacoes.map((o, i) => (
                        <button
                          key={i}
                          onClick={() => { setOrdenacao(i); setSortOpen(false) }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition ${i === ordenacao ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-600'}`}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}>
                    <Grid3X3 size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-400'}`}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-4'}>
              {produtosFiltrados.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  <div className={`bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative ${viewMode === 'list' ? 'w-48 h-auto' : 'h-48'}`}>
                    <Cpu size={48} className="text-gray-200 group-hover:text-blue-200 transition-colors" />
                    {!p.estoque && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Esgotado</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFav(p)}
                        className={`bg-white p-1.5 rounded-lg shadow transition ${favoritos.includes(p.id) ? 'bg-red-50' : 'hover:bg-red-50'}`}
                      >
                        <Heart size={14} className={favoritos.includes(p.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                      </button>
                      <button onClick={() => setQuickView(p)} className="bg-white p-1.5 rounded-lg shadow hover:bg-blue-50 transition">
                        <Eye size={14} className="text-gray-400 hover:text-blue-500" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <span className="text-xs text-blue-600 font-medium">{p.categoria}</span>
                    <h3 className="font-semibold mt-1 group-hover:text-blue-600 transition-colors">{p.nome}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < Math.floor(p.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">({p.reviews})</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-xl font-bold text-gray-900">{fmt(p.preco)}</p>
                      <p className="text-xs text-gray-500">{p.parcela} s/ juros</p>
                    </div>
                    <button
                      onClick={() => addCarrinho(p)}
                      disabled={!p.estoque}
                      className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                    >
                      <ShoppingCart size={14} /> {p.estoque ? 'Comprar' : 'Indisponível'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {produtosFiltrados.length === 0 && (
              <div className="text-center py-16">
                <Search size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
                <button
                  onClick={() => { setFaixaSel([]); setCatAtiva('Todos'); setBusca(''); setSomenteEstoque(false) }}
                  className="mt-3 text-blue-600 font-semibold hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      <Modal open={!!quickView} onClose={() => setQuickView(null)} title="Detalhes do Produto" size="lg">
        {quickView && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl h-64 flex items-center justify-center">
              <Cpu size={80} className="text-gray-200" />
            </div>
            <div className="md:w-1/2">
              <span className="text-xs text-blue-600 font-medium">{quickView.categoria}</span>
              <h3 className="text-2xl font-bold mt-1">{quickView.nome}</h3>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className={j < Math.floor(quickView.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                ))}
                <span className="text-sm text-gray-500 ml-2">{quickView.rating} ({quickView.reviews} avaliações)</span>
              </div>
              <p className="text-3xl font-bold mt-4">{fmt(quickView.preco)}</p>
              <p className="text-sm text-gray-500">{quickView.parcela} s/ juros</p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2"><Truck size={14} className="text-blue-600" /> Frete grátis para compras acima de R$ 300</p>
                <p className="flex items-center gap-2"><Shield size={14} className="text-blue-600" /> Garantia de 12 meses</p>
                <p className="flex items-center gap-2"><Package size={14} className="text-blue-600" /> {quickView.estoque ? 'Em estoque — envio em 24h' : 'Produto esgotado'}</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { addCarrinho(quickView); setQuickView(null) }}
                  disabled={!quickView.estoque}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} /> Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => toggleFav(quickView)}
                  className={`p-3 rounded-xl border transition ${favoritos.includes(quickView.id) ? 'bg-red-50 border-red-200' : 'hover:bg-gray-50'}`}
                >
                  <Heart size={20} className={favoritos.includes(quickView.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Cart Drawer */}
      {carrinhoAberto && (
        <div className="fixed inset-0 z-50" onClick={() => setCarrinhoAberto(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold flex items-center gap-2"><ShoppingCart size={20} className="text-blue-600" /> Carrinho ({totalItens})</h3>
              <button onClick={() => setCarrinhoAberto(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {carrinho.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                </div>
              ) : carrinho.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <Cpu size={20} className="text-blue-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.nome}</p>
                    <p className="text-blue-600 font-bold text-sm">{fmt(item.preco)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => setCarrinho(prev => prev.map(i => i.id === item.id ? { ...i, qtd: Math.max(1, i.qtd - 1) } : i))} className="w-6 h-6 rounded bg-white border flex items-center justify-center hover:bg-gray-100"><Minus size={12} /></button>
                      <span className="text-sm font-medium w-6 text-center">{item.qtd}</span>
                      <button onClick={() => setCarrinho(prev => prev.map(i => i.id === item.id ? { ...i, qtd: i.qtd + 1 } : i))} className="w-6 h-6 rounded bg-white border flex items-center justify-center hover:bg-gray-100"><Plus size={12} /></button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm">{fmt(item.preco * item.qtd)}</p>
                    <button onClick={() => setCarrinho(prev => prev.filter(i => i.id !== item.id))} className="text-red-400 hover:text-red-600 mt-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {carrinho.length > 0 && (
              <div className="border-t p-5 space-y-3">
                {totalCarrinho >= 300 && (
                  <div className="flex items-center gap-2 text-blue-600 text-sm bg-blue-50 p-2 rounded-lg"><Truck size={14} /> Frete grátis!</div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">{fmt(totalCarrinho)}</span>
                </div>
                <button
                  onClick={() => {
                    toast({ type: 'success', title: 'Pedido confirmado!', message: `Total: ${fmt(totalCarrinho)}` })
                    setCarrinho([])
                    setCarrinhoAberto(false)
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-blue-900 text-white py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-3">TechParts</h4>
            <p className="text-blue-300 text-sm">Seu parceiro em tecnologia, peças automotivas e serviços gráficos de qualidade.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-blue-300">
              <li className="hover:text-white cursor-pointer transition">Catálogo completo</li>
              <li className="hover:text-white cursor-pointer transition">Orçamentos</li>
              <li className="hover:text-white cursor-pointer transition">Assistência técnica</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-blue-300">
              <li className="flex items-center gap-2"><Phone size={14} /> (11) 4000-1234</li>
              <li className="flex items-center gap-2"><Mail size={14} /> contato@techparts.com</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Rua da Tecnologia, 500</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition flex items-center justify-center w-10 h-10">
                <ion-icon name="logo-instagram" style={{ fontSize: '20px' }}></ion-icon>
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition flex items-center justify-center w-10 h-10">
                <ion-icon name="mail-sharp" style={{ fontSize: '20px' }}></ion-icon>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
