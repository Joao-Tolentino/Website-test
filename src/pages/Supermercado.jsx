import { useState, useEffect, useRef } from 'react'
import BackToHome from '../components/BackToHome'
import Modal from '../components/Modal'
import { useToast } from '../components/Toast'
import {
  ShoppingCart, Search, MapPin, Clock, Phone, Star,
  Truck, CreditCard, Percent, ChevronRight, Heart,
  Apple, Beef, Milk, Cookie, Wine, Sparkles, Tag,
  ArrowRight, BadgePercent, Gift, Users, X, Plus, Minus, Trash2
} from 'lucide-react'

const categorias = [
  { nome: 'Frutas & Verduras', icon: Apple, cor: 'bg-green-100 text-green-600' },
  { nome: 'Carnes', icon: Beef, cor: 'bg-red-100 text-red-600' },
  { nome: 'Laticínios', icon: Milk, cor: 'bg-blue-100 text-blue-600' },
  { nome: 'Padaria', icon: Cookie, cor: 'bg-amber-100 text-amber-600' },
  { nome: 'Bebidas', icon: Wine, cor: 'bg-purple-100 text-purple-600' },
  { nome: 'Limpeza', icon: Sparkles, cor: 'bg-cyan-100 text-cyan-600' },
]

const todosOsProdutos = [
  { id: 1, nome: 'Arroz Integral 5kg', precoOriginal: 28.90, preco: 19.90, desconto: '31%', categoria: 'Grãos', rating: 4 },
  { id: 2, nome: 'Filé de Frango 1kg', precoOriginal: 22.00, preco: 15.99, desconto: '27%', categoria: 'Carnes', rating: 4 },
  { id: 3, nome: 'Leite Integral 1L (12un)', precoOriginal: 59.00, preco: 45.90, desconto: '22%', categoria: 'Laticínios', rating: 5 },
  { id: 4, nome: 'Azeite Extra Virgem 500ml', precoOriginal: 35.90, preco: 24.90, desconto: '30%', categoria: 'Mercearia', rating: 4 },
  { id: 5, nome: 'Café Premium 500g', precoOriginal: 32.00, preco: 22.90, desconto: '28%', categoria: 'Bebidas', rating: 5 },
  { id: 6, nome: 'Sabão em Pó 2kg', precoOriginal: 18.90, preco: 12.90, desconto: '32%', categoria: 'Limpeza', rating: 3 },
  { id: 7, nome: 'Banana Prata 1kg', precoOriginal: 8.90, preco: 5.99, desconto: '33%', categoria: 'Frutas & Verduras', rating: 4 },
  { id: 8, nome: 'Queijo Mussarela 500g', precoOriginal: 24.90, preco: 18.90, desconto: '24%', categoria: 'Laticínios', rating: 4 },
  { id: 9, nome: 'Cerveja Premium 12un', precoOriginal: 48.00, preco: 35.90, desconto: '25%', categoria: 'Bebidas', rating: 5 },
  { id: 10, nome: 'Desinfetante 2L', precoOriginal: 12.90, preco: 8.90, desconto: '31%', categoria: 'Limpeza', rating: 3 },
  { id: 11, nome: 'Pão Francês 500g', precoOriginal: 9.90, preco: 6.90, desconto: '30%', categoria: 'Padaria', rating: 4 },
  { id: 12, nome: 'Picanha Bovina 1kg', precoOriginal: 79.90, preco: 59.90, desconto: '25%', categoria: 'Carnes', rating: 5 },
]

const banners = [
  { titulo: 'Ofertas da Semana', subtitulo: 'Até 40% OFF em produtos selecionados', cor: 'from-green-600 to-emerald-700' },
  { titulo: 'Frutas Frescas', subtitulo: 'Direto do produtor para sua mesa', cor: 'from-orange-500 to-red-600' },
  { titulo: 'Clube de Vantagens', subtitulo: 'Acumule pontos e troque por descontos', cor: 'from-purple-600 to-indigo-700' },
]

function fmt(v) {
  return `R$ ${v.toFixed(2).replace('.', ',')}`
}

export default function Supermercado() {
  const toast = useToast()
  const [bannerIdx, setBannerIdx] = useState(0)
  const [busca, setBusca] = useState('')
  const [catFiltro, setCatFiltro] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [favoritosAberto, setFavoritosAberto] = useState(false)
  const ofertasRef = useRef(null)

  // countdown
  const [countdown, setCountdown] = useState(() => {
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    return Math.max(0, Math.floor((end - new Date()) / 1000))
  })

  useEffect(() => {
    const t = setInterval(() => setCountdown(p => Math.max(0, p - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  const hh = String(Math.floor(countdown / 3600)).padStart(2, '0')
  const mm = String(Math.floor((countdown % 3600) / 60)).padStart(2, '0')
  const ss = String(countdown % 60).padStart(2, '0')

  // auto carousel
  useEffect(() => {
    const t = setInterval(() => setBannerIdx(p => (p + 1) % banners.length), 5000)
    return () => clearInterval(t)
  }, [])

  // filter
  const produtosFiltrados = todosOsProdutos.filter(p => {
    const buscaOk = !busca || p.nome.toLowerCase().includes(busca.toLowerCase()) || p.categoria.toLowerCase().includes(busca.toLowerCase())
    const catOk = !catFiltro || p.categoria === catFiltro
    return buscaOk && catOk
  })

  const addCarrinho = (produto) => {
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === produto.id)
      if (existe) return prev.map(i => i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...produto, qtd: 1 }]
    })
    toast({ type: 'cart', title: 'Adicionado ao carrinho', message: produto.nome })
  }

  const removeCarrinho = (id) => {
    setCarrinho(prev => prev.filter(i => i.id !== id))
  }

  const updateQtd = (id, delta) => {
    setCarrinho(prev => prev.map(i => {
      if (i.id !== id) return i
      const novaQtd = i.qtd + delta
      return novaQtd < 1 ? i : { ...i, qtd: novaQtd }
    }))
  }

  const toggleFavorito = (produto) => {
    setFavoritos(prev => {
      const existe = prev.find(f => f.id === produto.id)
      if (existe) {
        toast({ type: 'info', message: `${produto.nome} removido dos favoritos` })
        return prev.filter(f => f.id !== produto.id)
      }
      toast({ type: 'success', message: `${produto.nome} adicionado aos favoritos` })
      return [...prev, produto]
    })
  }

  const totalCarrinho = carrinho.reduce((acc, i) => acc + i.preco * i.qtd, 0)
  const totalItens = carrinho.reduce((acc, i) => acc + i.qtd, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <BackToHome />

      {/* Top bar */}
      <div className="bg-green-700 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><MapPin size={14} /> Av. Central, 1500 - Centro</span>
            <span className="hidden md:flex items-center gap-1"><Clock size={14} /> 7h às 22h</span>
          </div>
          <span className="flex items-center gap-1"><Phone size={14} /> (11) 3000-0000</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-700">SuperFresh</h1>
              <p className="text-xs text-gray-400">Mercado Online</p>
            </div>
          </div>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={busca}
                onChange={(e) => { setBusca(e.target.value); setCatFiltro(null) }}
                placeholder="Buscar produtos, marcas..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              />
              {busca && (
                <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setFavoritosAberto(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Heart size={20} className={favoritos.length > 0 ? 'text-red-500 fill-red-500' : 'text-gray-600'} />
              {favoritos.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{favoritos.length}</span>
              )}
            </button>
            <button onClick={() => setCarrinhoAberto(true)} className="relative flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition text-sm font-medium">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Carrinho</span>
              <span className="bg-white text-green-700 text-xs font-bold px-1.5 py-0.5 rounded-full">{totalItens}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Banner carousel */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className={`bg-gradient-to-r ${banners[bannerIdx].cor} rounded-2xl p-8 md:p-12 text-white relative overflow-hidden transition-all duration-500`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
              <BadgePercent size={14} /> Promoção
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{banners[bannerIdx].titulo}</h2>
            <p className="text-lg opacity-90 mb-6">{banners[bannerIdx].subtitulo}</p>
            <button
              onClick={() => ofertasRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-green-700 px-6 py-2.5 rounded-full font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              Ver ofertas <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex gap-2 mt-6">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setBannerIdx(i)}
                className={`w-3 h-3 rounded-full transition ${i === bannerIdx ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, text: 'Entrega Grátis', sub: 'Pedidos acima de R$ 150' },
            { icon: CreditCard, text: '10x sem juros', sub: 'Em todos os produtos' },
            { icon: Percent, text: 'Até 40% OFF', sub: 'Ofertas diárias' },
            { icon: Gift, text: 'Clube de Pontos', sub: 'Ganhe a cada compra' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition">
              <div className="bg-green-100 p-2 rounded-lg">
                <f.icon size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">{f.text}</p>
                <p className="text-xs text-gray-400">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Categorias</h2>
          {catFiltro && (
            <button onClick={() => setCatFiltro(null)} className="text-green-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              Limpar filtro <X size={14} />
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categorias.map((cat, i) => (
            <button
              key={i}
              onClick={() => { setCatFiltro(catFiltro === cat.nome ? null : cat.nome); setBusca('') }}
              className={`bg-white rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${catFiltro === cat.nome ? 'ring-2 ring-green-500 shadow-lg' : ''}`}
            >
              <div className={`p-3 rounded-xl ${cat.cor} group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <span className="text-sm font-medium text-gray-700">{cat.nome}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section ref={ofertasRef} className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {catFiltro ? `Produtos — ${catFiltro}` : busca ? `Resultados para "${busca}"` : 'Ofertas do Dia'}
            </h2>
            <p className="text-gray-500 text-sm">
              {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? 's' : ''} encontrado{produtosFiltrados.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-sm font-semibold">
            <Tag size={14} />
            Termina em {hh}:{mm}:{ss}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {produtosFiltrados.map((p) => {
            const isFav = favoritos.some(f => f.id === p.id)
            const noCarrinho = carrinho.find(c => c.id === p.id)
            return (
              <div key={p.id} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow group relative overflow-hidden">
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  -{p.desconto}
                </span>
                <button
                  onClick={() => toggleFavorito(p)}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow hover:shadow-md transition z-10"
                >
                  <Heart size={16} className={isFav ? 'text-red-500 fill-red-500' : 'text-gray-300 group-hover:text-gray-400'} />
                </button>
                <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-4 group-hover:bg-green-50 transition-colors">
                  <ShoppingCart size={40} className="text-gray-300 group-hover:text-green-300 transition-colors" />
                </div>
                <span className="text-xs text-green-600 font-medium">{p.categoria}</span>
                <h3 className="font-semibold mt-1">{p.nome}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-400 line-through">{fmt(p.precoOriginal)}</span>
                  <span className="text-xl font-bold text-green-600">{fmt(p.preco)}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className={j < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({Math.floor(Math.random() * 200 + 50)})</span>
                </div>
                {noCarrinho ? (
                  <div className="w-full mt-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <button onClick={() => updateQtd(p.id, -1)} className="p-1 hover:bg-green-100 rounded transition"><Minus size={16} className="text-green-700" /></button>
                    <span className="font-bold text-green-700">{noCarrinho.qtd} no carrinho</span>
                    <button onClick={() => updateQtd(p.id, 1)} className="p-1 hover:bg-green-100 rounded transition"><Plus size={16} className="text-green-700" /></button>
                  </div>
                ) : (
                  <button
                    onClick={() => addCarrinho(p)}
                    className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} /> Adicionar
                  </button>
                )}
              </div>
            )
          })}
        </div>
        {produtosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            <button onClick={() => { setBusca(''); setCatFiltro(null) }} className="mt-3 text-green-600 font-semibold hover:underline">Limpar filtros</button>
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 mt-16 mb-8">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '15.000+', label: 'Produtos', icon: ShoppingCart },
              { num: '50.000+', label: 'Clientes', icon: Users },
              { num: '98%', label: 'Satisfação', icon: Star },
              { num: '24h', label: 'Delivery', icon: Truck },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <s.icon size={28} className="mb-2 opacity-80" />
                <span className="text-3xl font-bold">{s.num}</span>
                <span className="text-sm opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {carrinhoAberto && (
        <div className="fixed inset-0 z-50" onClick={() => setCarrinhoAberto(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={20} className="text-green-600" /> Carrinho ({totalItens})
              </h3>
              <button onClick={() => setCarrinhoAberto(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {carrinho.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                  <button onClick={() => setCarrinhoAberto(false)} className="mt-3 text-green-600 font-semibold hover:underline">Continuar comprando</button>
                </div>
              ) : carrinho.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <ShoppingCart size={20} className="text-green-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.nome}</p>
                    <p className="text-green-600 font-bold text-sm">{fmt(item.preco)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQtd(item.id, -1)} className="w-6 h-6 rounded bg-white border flex items-center justify-center hover:bg-gray-100"><Minus size={12} /></button>
                      <span className="text-sm font-medium w-6 text-center">{item.qtd}</span>
                      <button onClick={() => updateQtd(item.id, 1)} className="w-6 h-6 rounded bg-white border flex items-center justify-center hover:bg-gray-100"><Plus size={12} /></button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm">{fmt(item.preco * item.qtd)}</p>
                    <button onClick={() => removeCarrinho(item.id)} className="text-red-400 hover:text-red-600 mt-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {carrinho.length > 0 && (
              <div className="border-t p-5 space-y-3">
                {totalCarrinho >= 150 && (
                  <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-2 rounded-lg">
                    <Truck size={14} /> Frete grátis aplicado!
                  </div>
                )}
                {totalCarrinho < 150 && (
                  <div className="text-sm text-gray-500">
                    Falta <span className="font-bold text-green-600">{fmt(150 - totalCarrinho)}</span> para frete grátis
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{fmt(totalCarrinho)}</span>
                </div>
                <button
                  onClick={() => {
                    toast({ type: 'success', title: 'Pedido realizado!', message: `Total: ${fmt(totalCarrinho)} — Entrega em 45 min` })
                    setCarrinho([])
                    setCarrinhoAberto(false)
                  }}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                >
                  Finalizar Compra — {fmt(totalCarrinho)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      <Modal open={favoritosAberto} onClose={() => setFavoritosAberto(false)} title={`Favoritos (${favoritos.length})`}>
        {favoritos.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum favorito ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {favoritos.map(p => (
              <div key={p.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <ShoppingCart size={16} className="text-green-300" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{p.nome}</p>
                  <p className="text-green-600 font-bold text-sm">{fmt(p.preco)}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { addCarrinho(p); setFavoritosAberto(false); setCarrinhoAberto(true) }}
                    className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
                  >
                    Comprar
                  </button>
                  <button onClick={() => toggleFavorito(p)} className="text-red-400 hover:text-red-600 p-1.5">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart size={24} />
                <span className="text-xl font-bold">SuperFresh</span>
              </div>
              <p className="text-green-300 text-sm">Qualidade e economia para toda a família, com entrega rápida na sua porta.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Institucional</h4>
              <ul className="space-y-2 text-sm text-green-300">
                <li className="hover:text-white cursor-pointer transition">Sobre nós</li>
                <li className="hover:text-white cursor-pointer transition">Nossas lojas</li>
                <li className="hover:text-white cursor-pointer transition">Trabalhe conosco</li>
                <li className="hover:text-white cursor-pointer transition">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Atendimento</h4>
              <ul className="space-y-2 text-sm text-green-300">
                <li className="hover:text-white cursor-pointer transition">Central de ajuda</li>
                <li className="hover:text-white cursor-pointer transition">Trocas e devoluções</li>
                <li className="hover:text-white cursor-pointer transition">Política de privacidade</li>
                <li className="hover:text-white cursor-pointer transition">Termos de uso</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contato</h4>
              <ul className="space-y-2 text-sm text-green-300">
                <li className="flex items-center gap-2"><Phone size={14} /> (11) 3000-0000</li>
                <li className="flex items-center gap-2"><MapPin size={14} /> Av. Central, 1500</li>
                <li className="flex items-center gap-2"><Clock size={14} /> 7h às 22h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-sm text-green-400">
            &copy; {new Date().getFullYear()} SuperFresh — Todos os direitos reservados
          </div>
        </div>
      </footer>
    </div>
  )
}
