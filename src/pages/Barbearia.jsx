import { useState, useRef } from 'react'
import BackToHome from '../components/BackToHome'
import Modal from '../components/Modal'
import { useToast } from '../components/Toast'
import {
  Scissors, Clock, MapPin, Phone, Star, ArrowRight,
  Instagram, Calendar, Users, Award, ChevronRight,
  CheckCircle, CreditCard, Sparkles, X
} from 'lucide-react'

const servicos = [
  { id: 1, nome: 'Corte Clássico', preco: 45, duracao: '30 min', desc: 'Corte na tesoura ou máquina com acabamento perfeito' },
  { id: 2, nome: 'Barba Completa', preco: 35, duracao: '25 min', desc: 'Barba com toalha quente, navalha e hidratação' },
  { id: 3, nome: 'Corte + Barba', preco: 70, duracao: '50 min', desc: 'Combo completo com desconto especial' },
  { id: 4, nome: 'Degradê Personalizado', preco: 55, duracao: '40 min', desc: 'Fade na medida com design e pigmentação' },
  { id: 5, nome: 'Relaxamento Capilar', preco: 80, duracao: '45 min', desc: 'Tratamento para cabelos crespos e cacheados' },
  { id: 6, nome: 'Sobrancelha', preco: 20, duracao: '15 min', desc: 'Design de sobrancelha com navalha' },
  { id: 7, nome: 'Hidratação Profunda', preco: 40, duracao: '30 min', desc: 'Tratamento nutritivo para cabelo e barba' },
  { id: 8, nome: 'Pigmentação de Barba', preco: 60, duracao: '35 min', desc: 'Cobertura de falhas e uniformização' },
]

const barbeiros = [
  { id: 0, nome: 'Lucas Silva', especialidade: 'Degradê & Designs', exp: '8 anos', rating: 4.9 },
  { id: 1, nome: 'André Costa', especialidade: 'Barbas & Tratamentos', exp: '12 anos', rating: 4.8 },
  { id: 2, nome: 'Felipe Santos', especialidade: 'Cortes Clássicos', exp: '6 anos', rating: 4.9 },
  { id: 3, nome: 'Bruno Reis', especialidade: 'Afro & Crespos', exp: '10 anos', rating: 4.7 },
]

const horarios = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30']

export default function Barbearia() {
  const toast = useToast()
  const [horarioSel, setHorarioSel] = useState(null)
  const [barbeiroSel, setBarbeiroSel] = useState(null)
  const [servicosSel, setServicosSel] = useState([])
  const [nomeCliente, setNomeCliente] = useState('')
  const [telefoneCliente, setTelefoneCliente] = useState('')
  const [confirmado, setConfirmado] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)

  const servicosRef = useRef(null)
  const agendaRef = useRef(null)

  const toggleServico = (s) => {
    setServicosSel(prev => {
      if (prev.find(p => p.id === s.id)) return prev.filter(p => p.id !== s.id)
      return [...prev, s]
    })
  }

  const totalServicos = servicosSel.reduce((a, s) => a + s.preco, 0)

  const handleAgendar = () => {
    if (servicosSel.length === 0) {
      toast({ type: 'error', message: 'Selecione pelo menos um serviço' })
      servicosRef.current?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (barbeiroSel === null) {
      toast({ type: 'error', message: 'Selecione um barbeiro' })
      return
    }
    if (!horarioSel) {
      toast({ type: 'error', message: 'Selecione um horário' })
      return
    }
    if (!nomeCliente.trim()) {
      toast({ type: 'error', message: 'Informe seu nome' })
      return
    }
    setConfirmModal(true)
  }

  const confirmarAgendamento = () => {
    setConfirmado(true)
    setConfirmModal(false)
    toast({ type: 'success', title: 'Agendamento confirmado!', message: `${horarioSel} com ${barbeiros[barbeiroSel].nome}` })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <BackToHome />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(180,130,60,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-stone-950/80 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-700/30 px-4 py-2 rounded-full text-amber-400 text-sm mb-8">
              <Scissors size={14} />
              Barbearia Premium
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Estilo com <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 italic font-display">Atitude</span>
            </h1>
            <p className="text-lg text-stone-400 mb-10 leading-relaxed">
              Mais que uma barbearia — uma experiência. Cortes precisos, barbas impecáveis e um ambiente que define quem você é.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => agendaRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3.5 rounded-full font-semibold transition shadow-lg shadow-amber-600/30 flex items-center gap-2"
              >
                <Calendar size={18} /> Agendar Horário
              </button>
              <button
                onClick={() => servicosRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-stone-600 text-stone-300 px-8 py-3.5 rounded-full font-semibold hover:bg-stone-800 transition"
              >
                Ver Serviços
              </button>
            </div>

            <div className="mt-14 flex gap-8">
              {[
                { num: '10k+', label: 'Cortes/ano' },
                { num: '4.9', label: 'Avaliação' },
                { num: '8+', label: 'Anos' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.num}</p>
                  <p className="text-xs text-stone-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section ref={servicosRef} className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Serviços</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Nosso Menu</h2>
          <p className="text-gray-500 mt-2">Selecione os serviços desejados para agendar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicos.map((s) => {
            const sel = servicosSel.find(p => p.id === s.id)
            return (
              <button
                key={s.id}
                onClick={() => toggleServico(s)}
                className={`group bg-white rounded-xl p-5 flex items-center justify-between hover:shadow-lg border-2 transition-all cursor-pointer text-left ${
                  sel ? 'border-amber-500 shadow-lg shadow-amber-500/10' : 'border-transparent hover:border-amber-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg transition-colors ${sel ? 'bg-amber-600' : 'bg-amber-100 group-hover:bg-amber-600'}`}>
                    <Scissors size={18} className={`transition-colors ${sel ? 'text-white' : 'text-amber-600 group-hover:text-white'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold transition-colors ${sel ? 'text-amber-600' : 'group-hover:text-amber-600'}`}>{s.nome}</h3>
                      {sel && <CheckCircle size={14} className="text-amber-600" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Clock size={12} /> {s.duracao}</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-amber-600 whitespace-nowrap">R$ {s.preco}</span>
              </button>
            )
          })}
        </div>

        {servicosSel.length > 0 && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-amber-800">{servicosSel.length} serviço{servicosSel.length > 1 ? 's' : ''} selecionado{servicosSel.length > 1 ? 's' : ''}</p>
              <p className="text-sm text-amber-600">{servicosSel.map(s => s.nome).join(', ')}</p>
            </div>
            <span className="text-2xl font-bold text-amber-600">R$ {totalServicos}</span>
          </div>
        )}
      </section>

      {/* Equipe */}
      <section className="bg-stone-900 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Equipe</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Nossos Barbeiros</h2>
            <p className="text-stone-400 mt-2">Escolha seu barbeiro preferido</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {barbeiros.map((b) => (
              <div
                key={b.id}
                onClick={() => setBarbeiroSel(barbeiroSel === b.id ? null : b.id)}
                className={`rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  barbeiroSel === b.id
                    ? 'bg-amber-600 text-white shadow-xl shadow-amber-600/30 scale-105'
                    : 'bg-stone-800 text-white hover:bg-stone-700'
                }`}
              >
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  barbeiroSel === b.id ? 'bg-white/20' : 'bg-stone-700'
                }`}>
                  <Users size={32} className={barbeiroSel === b.id ? 'text-white' : 'text-stone-500'} />
                </div>
                <h3 className="font-bold text-lg">{b.nome}</h3>
                <p className={`text-sm mt-1 ${barbeiroSel === b.id ? 'text-amber-100' : 'text-stone-400'}`}>{b.especialidade}</p>
                <div className="flex items-center justify-center gap-1 mt-3">
                  <Star size={14} className={barbeiroSel === b.id ? 'text-yellow-300 fill-yellow-300' : 'text-yellow-500 fill-yellow-500'} />
                  <span className="text-sm font-medium">{b.rating}</span>
                  <span className={`text-xs ${barbeiroSel === b.id ? 'text-amber-200' : 'text-stone-500'}`}>• {b.exp}</span>
                </div>
                {barbeiroSel === b.id && <p className="text-xs mt-2 text-amber-200 font-medium">Selecionado</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agendamento */}
      <section ref={agendaRef} className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-widest">Agendamento</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Escolha seu Horário</h2>
          <p className="text-gray-500 mt-3">Horários disponíveis para hoje</p>
        </div>

        {confirmado ? (
          <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in">
            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Agendamento Confirmado!</h3>
            <div className="space-y-1 text-sm text-green-700 mb-6">
              <p><span className="font-medium">Cliente:</span> {nomeCliente}</p>
              <p><span className="font-medium">Barbeiro:</span> {barbeiros[barbeiroSel]?.nome}</p>
              <p><span className="font-medium">Horário:</span> {horarioSel}</p>
              <p><span className="font-medium">Serviços:</span> {servicosSel.map(s => s.nome).join(', ')}</p>
              <p><span className="font-medium">Total:</span> R$ {totalServicos}</p>
            </div>
            <button
              onClick={() => {
                setConfirmado(false)
                setHorarioSel(null)
                setBarbeiroSel(null)
                setServicosSel([])
                setNomeCliente('')
                setTelefoneCliente('')
              }}
              className="text-amber-600 font-semibold hover:underline"
            >
              Fazer novo agendamento
            </button>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            {/* progress */}
            <div className="flex items-center justify-center gap-2 mb-8 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${servicosSel.length > 0 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1. Serviços</span>
              <ChevronRight size={14} className="text-gray-300" />
              <span className={`px-3 py-1 rounded-full font-medium ${barbeiroSel !== null ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2. Barbeiro</span>
              <ChevronRight size={14} className="text-gray-300" />
              <span className={`px-3 py-1 rounded-full font-medium ${horarioSel ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3. Horário</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {horarios.map((h, i) => {
                const ocupado = [2, 5, 8, 11].includes(i)
                return (
                  <button
                    key={h}
                    disabled={ocupado}
                    onClick={() => setHorarioSel(h)}
                    className={`py-3 rounded-lg text-sm font-medium transition ${
                      ocupado
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through'
                        : horarioSel === h
                          ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                          : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-400 hover:text-amber-600'
                    }`}
                  >
                    {h}
                  </button>
                )
              })}
            </div>

            {(horarioSel || servicosSel.length > 0) && (
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6 animate-fade-in">
                <h3 className="font-bold text-amber-800 mb-4">Dados para agendamento</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <input
                    type="text"
                    placeholder="Seu nome *"
                    value={nomeCliente}
                    onChange={e => setNomeCliente(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="tel"
                    placeholder="Telefone (opcional)"
                    value={telefoneCliente}
                    onChange={e => setTelefoneCliente(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="bg-white rounded-lg p-3 mb-4 text-sm space-y-1">
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-700">Serviços:</span>{' '}
                    {servicosSel.length > 0 ? servicosSel.map(s => s.nome).join(', ') : <span className="text-red-400">Nenhum selecionado</span>}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-700">Barbeiro:</span>{' '}
                    {barbeiroSel !== null ? barbeiros[barbeiroSel].nome : <span className="text-red-400">Não selecionado</span>}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-medium text-gray-700">Horário:</span>{' '}
                    {horarioSel || <span className="text-red-400">Não selecionado</span>}
                  </p>
                  {servicosSel.length > 0 && (
                    <p className="text-amber-600 font-bold pt-1 border-t">Total: R$ {totalServicos}</p>
                  )}
                </div>

                <button
                  onClick={handleAgendar}
                  className="w-full bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2"
                >
                  <Calendar size={16} /> Confirmar Agendamento
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Confirmation Modal */}
      <Modal open={confirmModal} onClose={() => setConfirmModal(false)} title="Confirmar Agendamento" size="sm">
        <div className="text-center">
          <Calendar size={40} className="text-amber-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-4">Confirma os dados abaixo?</h3>
          <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2 text-left mb-6">
            <p><span className="font-medium">Nome:</span> {nomeCliente}</p>
            <p><span className="font-medium">Barbeiro:</span> {barbeiroSel !== null ? barbeiros[barbeiroSel].nome : ''}</p>
            <p><span className="font-medium">Horário:</span> {horarioSel}</p>
            <p><span className="font-medium">Serviços:</span> {servicosSel.map(s => s.nome).join(', ')}</p>
            <p className="font-bold text-amber-600 pt-2 border-t">Total: R$ {totalServicos}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setConfirmModal(false)} className="flex-1 border border-gray-200 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition">Voltar</button>
            <button onClick={confirmarAgendamento} className="flex-1 bg-amber-600 text-white py-2.5 rounded-xl font-semibold hover:bg-amber-700 transition">Confirmar</button>
          </div>
        </div>
      </Modal>

      {/* Info */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <Clock size={28} className="text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Horários</h3>
              <p className="text-stone-400 text-sm">Seg - Sex: 9h às 20h</p>
              <p className="text-stone-400 text-sm">Sábado: 9h às 18h</p>
              <p className="text-stone-400 text-sm">Domingo: Fechado</p>
            </div>
            <div>
              <MapPin size={28} className="text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Localização</h3>
              <p className="text-stone-400 text-sm">Rua do Estilo, 150</p>
              <p className="text-stone-400 text-sm">Centro — São Paulo, SP</p>
            </div>
            <div>
              <Phone size={28} className="text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Contato</h3>
              <p className="text-stone-400 text-sm">(11) 99000-1234</p>
              <p className="text-stone-400 text-sm">@barber.studio</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-stone-900 to-neutral-800 rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Primeira vez? Ganhe 20% OFF</h2>
            <p className="text-stone-400 max-w-md mx-auto mb-8">
              Agende seu primeiro corte e ganhe desconto especial de boas-vindas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => { agendaRef.current?.scrollIntoView({ behavior: 'smooth' }) }}
                className="bg-amber-600 hover:bg-amber-700 px-8 py-3.5 rounded-full font-semibold transition shadow-lg shadow-amber-600/30 flex items-center gap-2"
              >
                <Sparkles size={18} /> Quero Aproveitar
              </button>
              <button className="border border-stone-600 px-8 py-3.5 rounded-full font-semibold hover:bg-stone-700 transition flex items-center gap-2">
                <Instagram size={18} /> @barber.studio
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-stone-950 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Scissors size={20} className="text-amber-500" />
            <span className="font-bold text-lg">Barber Studio</span>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"><Instagram size={18} /></button>
          </div>
          <p className="text-sm text-stone-500">&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
