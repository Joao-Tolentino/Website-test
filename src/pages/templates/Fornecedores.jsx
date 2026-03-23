import { useState } from 'react'
import BackToHome from '../../components/BackToHome'
import Modal from '../../components/Modal'
import { useToast } from '../../components/Toast'
import {
  Package, Search, Filter, ArrowRight, ChevronRight,
  Truck, Shield, Clock, Star, Phone, Mail, MapPin,
  Building2, Users, BadgeCheck, FileText, Calculator,
  ShoppingCart, BarChart3, Handshake, X, Trash2, Plus, Minus
} from 'lucide-react'

const categorias = ['Todos', 'Construção', 'Elétrico', 'Hidráulico', 'Acabamento', 'Ferragens']

const produtos = [
  { id: 1, nome: 'Cimento CP-II 50kg', categoria: 'Construção', preco: 32.90, precoAtacado: 28.50, minimo: '50 sacos', estoque: 'Pronta entrega' },
  { id: 2, nome: 'Cabo Flexível 2.5mm 100m', categoria: 'Elétrico', preco: 189.00, precoAtacado: 155.00, minimo: '20 rolos', estoque: 'Pronta entrega' },
  { id: 3, nome: 'Tubo PVC 100mm 6m', categoria: 'Hidráulico', preco: 45.00, precoAtacado: 38.00, minimo: '30 barras', estoque: 'Pronta entrega' },
  { id: 4, nome: 'Porcelanato 60x60 Polido', categoria: 'Acabamento', preco: 59.90, precoAtacado: 48.00, minimo: '100 m²', estoque: '5 dias' },
  { id: 5, nome: 'Fechadura Inox Premium', categoria: 'Ferragens', preco: 120.00, precoAtacado: 95.00, minimo: '25 unidades', estoque: 'Pronta entrega' },
  { id: 6, nome: 'Argamassa AC-III 20kg', categoria: 'Construção', preco: 28.90, precoAtacado: 23.50, minimo: '40 sacos', estoque: 'Pronta entrega' },
  { id: 7, nome: 'Disjuntor Bipolar 32A', categoria: 'Elétrico', preco: 35.00, precoAtacado: 28.00, minimo: '50 unidades', estoque: '3 dias' },
  { id: 8, nome: 'Registro Gaveta 3/4"', categoria: 'Hidráulico', preco: 42.00, precoAtacado: 34.00, minimo: '30 unidades', estoque: 'Pronta entrega' },
]

function fmt(v) { return `R$ ${v.toFixed(2).replace('.', ',')}` }

export default function Fornecedores() {
  const toast = useToast()
  const [catAtiva, setCatAtiva] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [pedido, setPedido] = useState([])
  const [pedidoAberto, setPedidoAberto] = useState(false)
  const [orcamentoModal, setOrcamentoModal] = useState(false)
  const [formOrcamento, setFormOrcamento] = useState({ nome: '', empresa: '', email: '', telefone: '', mensagem: '' })

  const produtosFiltrados = produtos.filter(p =>
    (catAtiva === 'Todos' || p.categoria === catAtiva) &&
    p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  const addPedido = (p) => {
    setPedido(prev => {
      const ex = prev.find(i => i.id === p.id)
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qtd: i.qtd + 1 } : i)
      return [...prev, { ...p, qtd: 1 }]
    })
    toast({ type: 'cart', message: `${p.nome} adicionado ao pedido` })
  }

  const totalPedido = pedido.reduce((a, i) => a + i.precoAtacado * i.qtd, 0)
  const totalItens = pedido.reduce((a, i) => a + i.qtd, 0)

  const handleOrcamento = () => {
    if (!formOrcamento.nome || !formOrcamento.email) {
      toast({ type: 'error', message: 'Preencha nome e e-mail' })
      return
    }
    toast({ type: 'success', title: 'Orçamento enviado!', message: 'Responderemos em até 1 hora' })
    setOrcamentoModal(false)
    setFormOrcamento({ nome: '', empresa: '', email: '', telefone: '', mensagem: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackToHome />

      {/* HEADER SECTION */}
      <header className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-red-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg"><Package size={28} /></div>
            <div>
              <h1 className="text-2xl font-bold">MateriaPrime</h1>
              <p className="text-xs text-orange-200">Distribuidora de Materiais</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm text-orange-100">
              <span className="flex items-center gap-1"><Phone size={14} /> (11) 4200-5000</span>
              <span className="flex items-center gap-1"><Mail size={14} /> vendas@materiaprime.com</span>
            </div>
            <button onClick={() => setPedidoAberto(true)} className="relative flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl hover:bg-white/20 transition text-sm">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Pedido</span>
              {totalItens > 0 && <span className="bg-yellow-400 text-orange-800 text-xs font-bold px-1.5 py-0.5 rounded-full">{totalItens}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-600 to-orange-700 text-white pb-20 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Materiais de Qualidade com <span className="text-yellow-300">Preço de Atacado</span>
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              +5.000 produtos para construção, elétrica, hidráulica e acabamento. Condições especiais para revendedores e construtoras.
            </p>
            <div className="relative max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-300" />
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar produtos, códigos, marcas..."
                className="w-full pl-11 pr-10 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              />
              {busca && <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-300"><X size={16} /></button>}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, text: 'Entrega em Obra', sub: 'Frete próprio' },
            { icon: Calculator, text: 'Orçamento Online', sub: 'Em até 1 hora' },
            { icon: Handshake, text: 'Crédito Próprio', sub: 'Condições especiais' },
            { icon: BadgeCheck, text: 'Garantia Total', sub: 'Produtos certificados' },
          ].map((b, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-3 hover:shadow-xl transition">
              <div className="bg-orange-100 p-2 rounded-lg"><b.icon size={20} className="text-orange-600" /></div>
              <div>
                <p className="font-semibold text-sm">{b.text}</p>
                <p className="text-xs text-gray-400">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Catálogo */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Catálogo de Produtos</h2>
            <p className="text-gray-500 text-sm">{produtosFiltrados.length} produtos — Preços especiais para compras em volume</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCatAtiva(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                catAtiva === cat ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {produtosFiltrados.map((p) => {
            const noPedido = pedido.find(i => i.id === p.id)
            return (
              <div key={p.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all group">
                <div className="bg-orange-50 rounded-lg h-32 flex items-center justify-center mb-4">
                  <Package size={36} className="text-orange-200 group-hover:text-orange-400 transition-colors" />
                </div>
                <span className="text-xs text-orange-600 font-medium">{p.categoria}</span>
                <h3 className="font-semibold mt-1 text-sm">{p.nome}</h3>
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Varejo:</span>
                    <span className="line-through">{fmt(p.preco)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-600 font-medium">Atacado:</span>
                    <span className="text-lg font-bold text-orange-600">{fmt(p.precoAtacado)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>Min: {p.minimo}</span>
                  <span className={p.estoque === 'Pronta entrega' ? 'text-green-600' : 'text-yellow-600'}>{p.estoque}</span>
                </div>
                {noPedido ? (
                  <div className="w-full mt-4 flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                    <button onClick={() => setPedido(prev => prev.map(i => i.id === p.id ? { ...i, qtd: Math.max(1, i.qtd - 1) } : i))} className="p-1 hover:bg-orange-100 rounded"><Minus size={14} className="text-orange-700" /></button>
                    <span className="font-bold text-orange-700 text-sm">{noPedido.qtd} un</span>
                    <button onClick={() => setPedido(prev => prev.map(i => i.id === p.id ? { ...i, qtd: i.qtd + 1 } : i))} className="p-1 hover:bg-orange-100 rounded"><Plus size={14} className="text-orange-700" /></button>
                  </div>
                ) : (
                  <button onClick={() => addPedido(p)} className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition flex items-center justify-center gap-1">
                    <ShoppingCart size={14} /> Adicionar ao Pedido
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Order Drawer */}
      {pedidoAberto && (
        <div className="fixed inset-0 z-50" onClick={() => setPedidoAberto(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold flex items-center gap-2"><ShoppingCart size={20} className="text-orange-600" /> Meu Pedido ({totalItens})</h3>
              <button onClick={() => setPedidoAberto(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {pedido.length === 0 ? (
                <div className="text-center py-16">
                  <Package size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum item no pedido</p>
                </div>
              ) : pedido.map(item => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.nome}</p>
                    <p className="text-orange-600 font-bold text-sm">{fmt(item.precoAtacado)} × {item.qtd}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm">{fmt(item.precoAtacado * item.qtd)}</p>
                    <button onClick={() => setPedido(prev => prev.filter(i => i.id !== item.id))} className="text-red-400 hover:text-red-600 mt-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            {pedido.length > 0 && (
              <div className="border-t p-5 space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Atacado</span>
                  <span className="text-orange-600">{fmt(totalPedido)}</span>
                </div>
                <button onClick={() => {
                  toast({ type: 'success', title: 'Pedido enviado!', message: `Total: ${fmt(totalPedido)} — Aguarde contato` })
                  setPedido([]); setPedidoAberto(false)
                }} className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition">
                  Enviar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orçamento Modal */}
      <Modal open={orcamentoModal} onClose={() => setOrcamentoModal(false)} title="Solicitar Orçamento">
        <div className="space-y-3">
          <input type="text" placeholder="Nome *" value={formOrcamento.nome} onChange={e => setFormOrcamento({ ...formOrcamento, nome: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="text" placeholder="Empresa" value={formOrcamento.empresa} onChange={e => setFormOrcamento({ ...formOrcamento, empresa: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="email" placeholder="E-mail *" value={formOrcamento.email} onChange={e => setFormOrcamento({ ...formOrcamento, email: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="tel" placeholder="Telefone" value={formOrcamento.telefone} onChange={e => setFormOrcamento({ ...formOrcamento, telefone: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <textarea placeholder="Lista de materiais ou observações" rows={4} value={formOrcamento.mensagem} onChange={e => setFormOrcamento({ ...formOrcamento, mensagem: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
        </div>
        <button onClick={handleOrcamento} className="w-full mt-4 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition flex items-center justify-center gap-2">
          <FileText size={16} /> Enviar Orçamento
        </button>
      </Modal>

      {/* Para quem */}
      <section className="bg-orange-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Quem atendemos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { icon: Building2, label: 'Construtoras' },
              { icon: Users, label: 'Revendedores' },
              { icon: Handshake, label: 'Empreiteiros' },
              { icon: BarChart3, label: 'Incorporadoras' },
            ].map((q, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-white/20 transition">
                <q.icon size={32} className="mx-auto mb-3 opacity-90" />
                <span className="font-semibold">{q.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-10 md:p-16 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Precisa de um orçamento personalizado?</h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-8">
            Envie sua lista de materiais e receba uma proposta com preços exclusivos em até 1 hora.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setOrcamentoModal(true)} className="bg-white text-orange-700 px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition flex items-center gap-2">
              <FileText size={18} /> Solicitar Orçamento
            </button>
            <button className="border border-white/30 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2">
              <Phone size={18} /> Falar com Vendedor
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><Package size={20} className="text-orange-400" /><span className="font-bold">MateriaPrime</span></div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
