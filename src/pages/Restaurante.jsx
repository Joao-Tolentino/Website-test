import { useState, useRef } from 'react'
import BackToHome from '../components/BackToHome'
import Modal from '../components/Modal'
import { useToast } from '../components/Toast'
import {
  UtensilsCrossed, Clock, MapPin, Phone, Star,
  ArrowRight, ChevronRight, Flame, Leaf, Wine,
  Coffee, IceCream, Instagram, Facebook, Award,
  CalendarCheck, Users, Heart, CheckCircle, Plus
} from 'lucide-react'

const categorias = ['Entradas', 'Pratos Principais', 'Massas', 'Sobremesas', 'Bebidas']

const cardapio = {
  'Entradas': [
    { nome: 'Bruschetta Clássica', desc: 'Pão italiano com tomate, manjericão e azeite trufado', preco: 32, tag: 'Popular' },
    { nome: 'Carpaccio de Salmão', desc: 'Fatias finas com alcaparras, cebola roxa e molho cítrico', preco: 48, tag: null },
    { nome: 'Tábua de Queijos Artesanais', desc: 'Seleção de 5 queijos com geleias da casa', preco: 65, tag: 'Chef' },
  ],
  'Pratos Principais': [
    { nome: 'Filé Mignon ao Molho Madeira', desc: 'Com risoto de funghi e legumes grelhados', preco: 89, tag: 'Best Seller' },
    { nome: 'Salmão Grelhado', desc: 'Sobre purê de batata doce com aspargos', preco: 78, tag: null },
    { nome: 'Risoto de Camarão', desc: 'Arroz arbório, camarões frescos, tomate seco e rúcula', preco: 72, tag: 'Popular' },
  ],
  'Massas': [
    { nome: 'Ravioli de Abóbora', desc: 'Massa fresca recheada com creme de sálvia e nozes', preco: 58, tag: 'Vegano' },
    { nome: 'Tagliatelle ao Ragú', desc: 'Massa artesanal com ragú de carne lenta', preco: 62, tag: null },
  ],
  'Sobremesas': [
    { nome: 'Petit Gâteau', desc: 'Bolo de chocolate quente com sorvete de baunilha', preco: 38, tag: 'Favorito' },
    { nome: 'Crème Brûlée', desc: 'Creme de baunilha com crosta de açúcar caramelizado', preco: 32, tag: null },
  ],
  'Bebidas': [
    { nome: 'Vinho Tinto - Malbec', desc: 'Argentina, safra 2020, encorpado', preco: 120, tag: null },
    { nome: 'Gin Tônica da Casa', desc: 'Gin artesanal, tônica premium, especiarias e limão', preco: 38, tag: 'Popular' },
  ],
}

export default function Restaurante() {
  const toast = useToast()
  const [catAtiva, setCatAtiva] = useState('Entradas')
  const cardapioRef = useRef(null)
  const reservaRef = useRef(null)

  const [pedido, setPedido] = useState([])
  const [pedidoAberto, setPedidoAberto] = useState(false)

  const [reserva, setReserva] = useState({ nome: '', data: '', hora: '', pessoas: '2 pessoas', telefone: '' })
  const [reservaConfirmada, setReservaConfirmada] = useState(false)

  const addPedido = (item) => {
    setPedido(prev => {
      const ex = prev.find(p => p.nome === item.nome)
      if (ex) return prev.map(p => p.nome === item.nome ? { ...p, qtd: p.qtd + 1 } : p)
      return [...prev, { ...item, qtd: 1 }]
    })
    toast({ type: 'cart', message: `${item.nome} adicionado ao pedido` })
  }

  const removePedido = (nome) => {
    setPedido(prev => prev.filter(p => p.nome !== nome))
  }

  const totalPedido = pedido.reduce((a, i) => a + i.preco * i.qtd, 0)
  const totalItens = pedido.reduce((a, i) => a + i.qtd, 0)

  const handleReserva = () => {
    if (!reserva.nome || !reserva.data || !reserva.hora) {
      toast({ type: 'error', message: 'Preencha nome, data e horário' })
      return
    }
    setReservaConfirmada(true)
    toast({ type: 'success', title: 'Reserva confirmada!', message: `${reserva.data} às ${reserva.hora} para ${reserva.pessoas}` })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <BackToHome />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/90 via-stone-900/80 to-stone-900/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,130,70,0.15),transparent_70%)]" />
        <div className="relative text-center text-white px-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm mb-8">
            <Award size={14} className="text-amber-400" />
            Melhor Restaurante 2025
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
            Sabor & <span className="text-amber-400 italic">Elegância</span>
          </h1>
          <p className="text-lg text-stone-300 max-w-lg mx-auto mb-10">
            Uma experiência gastronômica única onde cada prato conta uma história de paixão e tradição.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => reservaRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-amber-600 hover:bg-amber-700 px-8 py-3.5 rounded-full font-semibold transition flex items-center gap-2 shadow-lg shadow-amber-600/30"
            >
              <CalendarCheck size={18} /> Reservar Mesa
            </button>
            <button
              onClick={() => cardapioRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/30 px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition"
            >
              Ver Cardápio
            </button>
          </div>

          <div className="mt-16 flex justify-center gap-12 text-center">
            {[
              { icon: Clock, label: 'Ter - Dom', sub: '18h às 00h' },
              { icon: MapPin, label: 'Centro', sub: 'Rua do Sabor, 200' },
              { icon: Phone, label: 'Reservas', sub: '(11) 5000-0000' },
            ].map((info, i) => (
              <div key={i} className="flex flex-col items-center group">
                <info.icon size={20} className="text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{info.label}</span>
                <span className="text-xs text-stone-400">{info.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Flame, titulo: 'Cozinha a Lenha', desc: 'Sabor autêntico com técnicas tradicionais' },
            { icon: Leaf, titulo: 'Ingredientes Orgânicos', desc: 'Do campo direto para sua mesa' },
            { icon: Wine, titulo: 'Carta de Vinhos', desc: '+200 rótulos nacionais e importados' },
          ].map((d, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center group">
              <div className="inline-flex p-3 bg-amber-100 rounded-xl mb-3 group-hover:bg-amber-600 transition-colors">
                <d.icon size={24} className="text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold mb-1">{d.titulo}</h3>
              <p className="text-sm text-gray-500">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cardápio */}
      <section ref={cardapioRef} className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Gastronomia</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">Nosso Cardápio</h2>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCatAtiva(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                catAtiva === cat
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                  : 'bg-white text-gray-600 hover:bg-amber-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* floating order button */}
        {totalItens > 0 && (
          <button
            onClick={() => setPedidoAberto(true)}
            className="fixed bottom-6 right-6 z-40 bg-amber-600 text-white px-6 py-3 rounded-full shadow-xl shadow-amber-600/30 font-semibold hover:bg-amber-700 transition flex items-center gap-2"
          >
            <UtensilsCrossed size={18} /> Meu Pedido ({totalItens})
          </button>
        )}

        <div className="max-w-2xl mx-auto space-y-4">
          {cardapio[catAtiva]?.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-5 flex items-start justify-between gap-4 hover:shadow-md transition-shadow group">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold group-hover:text-amber-600 transition-colors">{item.nome}</h3>
                  {item.tag && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      item.tag === 'Vegano' ? 'bg-green-100 text-green-600'
                      : item.tag === 'Chef' ? 'bg-purple-100 text-purple-600'
                      : 'bg-amber-100 text-amber-600'
                    }`}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg font-bold text-amber-600">R$ {item.preco}</span>
                <button
                  onClick={() => addPedido(item)}
                  className="p-2 rounded-lg bg-amber-100 hover:bg-amber-600 text-amber-600 hover:text-white transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pedido Modal */}
      <Modal open={pedidoAberto} onClose={() => setPedidoAberto(false)} title="Meu Pedido">
        {pedido.length === 0 ? (
          <div className="text-center py-12">
            <UtensilsCrossed size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum item no pedido</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {pedido.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                  <div>
                    <p className="font-medium text-sm">{item.nome}</p>
                    <p className="text-xs text-gray-500">{item.qtd}x R$ {item.preco}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-amber-600">R$ {item.preco * item.qtd}</span>
                    <button onClick={() => removePedido(item.nome)} className="text-red-400 hover:text-red-600 text-xs">Remover</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
              <span>Total</span>
              <span className="text-amber-600">R$ {totalPedido}</span>
            </div>
            <button
              onClick={() => {
                toast({ type: 'success', title: 'Pedido enviado!', message: 'O garçom trará seu pedido em instantes' })
                setPedido([])
                setPedidoAberto(false)
              }}
              className="w-full mt-4 bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition"
            >
              Enviar Pedido — R$ {totalPedido}
            </button>
          </>
        )}
      </Modal>

      {/* Reservas */}
      <section ref={reservaRef} className="bg-stone-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Reserve sua Mesa</h2>
          <p className="text-stone-400 mb-10 max-w-lg mx-auto">
            Garanta seu lugar para uma noite especial. Aceitamos reservas para grupos de até 20 pessoas.
          </p>

          {reservaConfirmada ? (
            <div className="bg-green-900/30 border border-green-700/30 rounded-2xl p-8 max-w-md mx-auto animate-fade-in">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Reserva Confirmada!</h3>
              <div className="space-y-1 text-stone-300 text-sm">
                <p><span className="text-white font-medium">Nome:</span> {reserva.nome}</p>
                <p><span className="text-white font-medium">Data:</span> {reserva.data}</p>
                <p><span className="text-white font-medium">Horário:</span> {reserva.hora}</p>
                <p><span className="text-white font-medium">Mesa:</span> {reserva.pessoas}</p>
              </div>
              <button
                onClick={() => { setReservaConfirmada(false); setReserva({ nome: '', data: '', hora: '', pessoas: '2 pessoas', telefone: '' }) }}
                className="mt-6 text-amber-400 font-semibold hover:underline text-sm"
              >
                Fazer nova reserva
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={reserva.nome}
                  onChange={e => setReserva({ ...reserva, nome: e.target.value })}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="tel"
                  placeholder="Telefone"
                  value={reserva.telefone}
                  onChange={e => setReserva({ ...reserva, telefone: e.target.value })}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="date"
                  value={reserva.data}
                  onChange={e => setReserva({ ...reserva, data: e.target.value })}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="time"
                  value={reserva.hora}
                  onChange={e => setReserva({ ...reserva, hora: e.target.value })}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <select
                value={reserva.pessoas}
                onChange={e => setReserva({ ...reserva, pessoas: e.target.value })}
                className="mt-4 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option>2 pessoas</option>
                <option>4 pessoas</option>
                <option>6 pessoas</option>
                <option>8+ pessoas</option>
              </select>
              <div>
                <button
                  onClick={handleReserva}
                  className="mt-6 bg-amber-600 hover:bg-amber-700 px-8 py-3.5 rounded-full font-semibold transition shadow-lg shadow-amber-600/30 flex items-center gap-2 mx-auto"
                >
                  <CalendarCheck size={18} /> Confirmar Reserva
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="bg-stone-950 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-display text-xl">
            <UtensilsCrossed size={20} className="text-amber-500" />
            <span className="font-bold">Alma Gastronomia</span>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"><Instagram size={18} /></button>
            <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"><Facebook size={18} /></button>
          </div>
          <p className="text-sm text-stone-500">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
