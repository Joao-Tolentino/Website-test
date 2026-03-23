import { useState } from 'react'
import BackToHome from '../../components/BackToHome'
import Modal from '../../components/Modal'
import { useToast } from '../../components/Toast'
import {
  Briefcase, TrendingUp, Target, BarChart3, Users, Shield,
  CheckCircle, ArrowRight, ChevronRight, Star, Award,
  Phone, Mail, MapPin, Clock, Zap, Building2, LineChart, Calendar, X
} from 'lucide-react'

const servicos = [
  { titulo: 'Estratégia Empresarial', desc: 'Planejamento de longo prazo e posicionamento competitivo', icon: Target, detalhes: 'Análise completa do mercado, definição de metas estratégicas, roadmap de crescimento e posicionamento competitivo.' },
  { titulo: 'Transformação Digital', desc: 'Modernize processos e adote tecnologias eficientes', icon: Zap, detalhes: 'Diagnóstico digital, seleção de ferramentas, migração de processos e treinamento de equipe para novas tecnologias.' },
  { titulo: 'Gestão Financeira', desc: 'Otimização de custos, fluxo de caixa e investimentos', icon: BarChart3, detalhes: 'Reestruturação financeira, planejamento de fluxo de caixa, análise de investimentos e redução de custos operacionais.' },
  { titulo: 'Gestão de Pessoas', desc: 'Cultura organizacional, recrutamento e treinamento', icon: Users, detalhes: 'Desenvolvimento de cultura, programas de retenção, planos de carreira e processos seletivos estratégicos.' },
  { titulo: 'Compliance & Governança', desc: 'Adequação regulatória e gestão de riscos', icon: Shield, detalhes: 'Mapeamento de riscos, adequação à LGPD, políticas internas e estruturação de governança corporativa.' },
  { titulo: 'Marketing Estratégico', desc: 'Posicionamento de marca e estratégias de crescimento', icon: TrendingUp, detalhes: 'Pesquisa de mercado, estratégia de branding, plano de marketing digital e métricas de performance.' },
]

const cases = [
  { empresa: 'LogiTech Transportes', resultado: '+45% de eficiência operacional', area: 'Transformação Digital', tempo: '8 meses', desc: 'Implementação de sistema integrado de gestão, automação de processos logísticos e treinamento de 200 colaboradores.' },
  { empresa: 'Grupo Alimentar BR', resultado: 'R$ 2.3M economizados/ano', area: 'Gestão Financeira', tempo: '6 meses', desc: 'Reestruturação de custos operacionais, renegociação com fornecedores e implementação de controles financeiros.' },
  { empresa: 'Construtora Horizonte', resultado: '+120% crescimento em vendas', area: 'Marketing Estratégico', tempo: '12 meses', desc: 'Reposicionamento de marca, estratégia digital completa e implementação de CRM de vendas.' },
]

export default function Consultoria() {
  const toast = useToast()
  const [servicoDetalhe, setServicoDetalhe] = useState(null)
  const [caseDetalhe, setCaseDetalhe] = useState(null)
  const [reuniaoModal, setReuniaoModal] = useState(false)
  const [mensagemModal, setMensagemModal] = useState(false)
  const [formReuniao, setFormReuniao] = useState({ nome: '', empresa: '', email: '', telefone: '', data: '', assunto: '' })
  const [formMensagem, setFormMensagem] = useState({ nome: '', email: '', mensagem: '' })

  const handleReuniao = () => {
    if (!formReuniao.nome || !formReuniao.email) { toast({ type: 'error', message: 'Preencha nome e e-mail' }); return }
    toast({ type: 'success', title: 'Reunião agendada!', message: 'Enviaremos um link de confirmação para seu e-mail' })
    setReuniaoModal(false)
    setFormReuniao({ nome: '', empresa: '', email: '', telefone: '', data: '', assunto: '' })
  }

  const handleMensagem = () => {
    if (!formMensagem.nome || !formMensagem.email || !formMensagem.mensagem) { toast({ type: 'error', message: 'Preencha todos os campos' }); return }
    toast({ type: 'success', title: 'Mensagem enviada!', message: 'Responderemos em até 24 horas' })
    setMensagemModal(false)
    setFormMensagem({ nome: '', email: '', mensagem: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      <BackToHome />

      {/* HEADER SECTION */}
      <header className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm mb-6"><Award size={14} /> Consultoria de Resultados</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transformamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Desafios</span> em Resultados
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Metodologias comprovadas e uma equipe de especialistas dedicados a impulsionar o crescimento sustentável do seu negócio.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setReuniaoModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3.5 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg shadow-blue-600/30">
                  Agende uma Reunião <ArrowRight size={18} />
                </button>
                <button onClick={() => document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-white/20 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/5 transition">
                  Nossos Cases
                </button>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { num: '500+', label: 'Projetos Entregues', icon: Briefcase },
                { num: '98%', label: 'Taxa de Sucesso', icon: Target },
                { num: '15+', label: 'Anos de Mercado', icon: Award },
                { num: '120+', label: 'Empresas Atendidas', icon: Building2 },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                  <s.icon size={24} className="text-blue-400 mb-3" /><p className="text-2xl font-bold">{s.num}</p><p className="text-sm text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Serviços */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Especialidades</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Áreas de Atuação</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Soluções completas para cada fase do seu negócio</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((s, i) => (
            <div key={i} onClick={() => setServicoDetalhe(s)}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-pointer">
              <div className="bg-blue-50 p-3 rounded-xl w-fit mb-4 group-hover:bg-blue-600 transition-colors">
                <s.icon size={24} className="text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">{s.titulo}</h3>
              <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
              <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Saiba mais <ChevronRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Serviço Detalhe Modal */}
      <Modal open={!!servicoDetalhe} onClose={() => setServicoDetalhe(null)} title={servicoDetalhe?.titulo || ''}>
        {servicoDetalhe && (
          <div>
            <div className="bg-blue-50 rounded-xl p-6 flex items-center gap-4 mb-6">
              <div className="bg-blue-600 p-3 rounded-xl"><servicoDetalhe.icon size={28} className="text-white" /></div>
              <div>
                <h3 className="font-bold text-lg">{servicoDetalhe.titulo}</h3>
                <p className="text-sm text-gray-500">{servicoDetalhe.desc}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{servicoDetalhe.detalhes}</p>
            <button onClick={() => { setServicoDetalhe(null); setReuniaoModal(true) }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <Calendar size={16} /> Agendar Consultoria
            </button>
          </div>
        )}
      </Modal>

      {/* Metodologia */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Metodologia</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Nosso Processo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', titulo: 'Diagnóstico', desc: 'Análise profunda do cenário atual da empresa', cor: 'bg-blue-600' },
              { step: '02', titulo: 'Planejamento', desc: 'Estratégia personalizada com metas claras', cor: 'bg-cyan-600' },
              { step: '03', titulo: 'Implementação', desc: 'Execução acompanhada com checkpoints', cor: 'bg-indigo-600' },
              { step: '04', titulo: 'Monitoramento', desc: 'KPIs e ajustes contínuos de rota', cor: 'bg-violet-600' },
            ].map((p, i) => (
              <div key={i} className="relative">
                <div className={`${p.cor} text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold mb-4`}>{p.step}</div>
                <h3 className="font-bold text-lg mb-2">{p.titulo}</h3>
                <p className="text-gray-500 text-sm">{p.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-6 left-16 w-full h-0.5 bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Resultados</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Cases de Sucesso</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="bg-gradient-to-br from-slate-900 to-gray-800 rounded-2xl p-6 text-white group hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => setCaseDetalhe(c)}>
              <span className="text-xs text-blue-400 font-medium">{c.area}</span>
              <h3 className="text-xl font-bold mt-2 mb-4">{c.empresa}</h3>
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <LineChart size={20} className="text-green-400 mb-2" />
                <p className="text-2xl font-bold text-green-400">{c.resultado}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center gap-1"><Clock size={14} /> {c.tempo}</span>
                <span className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition">
                  Ver case <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Detalhe Modal */}
      <Modal open={!!caseDetalhe} onClose={() => setCaseDetalhe(null)} title={caseDetalhe?.empresa || ''}>
        {caseDetalhe && (
          <div>
            <div className="bg-gradient-to-br from-slate-900 to-gray-800 rounded-xl p-6 text-white mb-6">
              <span className="text-xs text-blue-400 font-medium">{caseDetalhe.area}</span>
              <h3 className="text-xl font-bold mt-2">{caseDetalhe.empresa}</h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <p className="text-xs text-gray-400">Resultado</p>
                  <p className="text-lg font-bold text-green-400">{caseDetalhe.resultado}</p>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-2">
                  <p className="text-xs text-gray-400">Duração</p>
                  <p className="text-lg font-bold">{caseDetalhe.tempo}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{caseDetalhe.desc}</p>
            <button onClick={() => { setCaseDetalhe(null); setReuniaoModal(true) }}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Quero resultados assim
            </button>
          </div>
        )}
      </Modal>

      {/* Reunião Modal */}
      <Modal open={reuniaoModal} onClose={() => setReuniaoModal(false)} title="Agendar Reunião">
        <p className="text-gray-500 text-sm mb-4">Consultoria gratuita de 30 minutos. Sem compromisso.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" placeholder="Nome *" value={formReuniao.nome} onChange={e => setFormReuniao({ ...formReuniao, nome: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Empresa" value={formReuniao.empresa} onChange={e => setFormReuniao({ ...formReuniao, empresa: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="E-mail *" value={formReuniao.email} onChange={e => setFormReuniao({ ...formReuniao, email: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="tel" placeholder="Telefone" value={formReuniao.telefone} onChange={e => setFormReuniao({ ...formReuniao, telefone: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="date" value={formReuniao.data} onChange={e => setFormReuniao({ ...formReuniao, data: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <select value={formReuniao.assunto} onChange={e => setFormReuniao({ ...formReuniao, assunto: e.target.value })}
            className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
            <option value="">Assunto da reunião</option>
            {servicos.map((s, i) => <option key={i} value={s.titulo}>{s.titulo}</option>)}
          </select>
        </div>
        <button onClick={handleReuniao} className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <Calendar size={16} /> Confirmar Reunião
        </button>
      </Modal>

      {/* Mensagem Modal */}
      <Modal open={mensagemModal} onClose={() => setMensagemModal(false)} title="Enviar Mensagem" size="sm">
        <div className="space-y-3">
          <input type="text" placeholder="Nome *" value={formMensagem.nome} onChange={e => setFormMensagem({ ...formMensagem, nome: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="E-mail *" value={formMensagem.email} onChange={e => setFormMensagem({ ...formMensagem, email: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea placeholder="Sua mensagem *" rows={4} value={formMensagem.mensagem} onChange={e => setFormMensagem({ ...formMensagem, mensagem: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <button onClick={handleMensagem} className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">Enviar</button>
      </Modal>

      {/* CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para transformar seu negócio?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Agende uma consultoria gratuita de 30 minutos e descubra como podemos ajudar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setReuniaoModal(true)} className="bg-white text-blue-700 px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition flex items-center gap-2">
              <Phone size={18} /> Agendar Consultoria
            </button>
            <button onClick={() => setMensagemModal(true)} className="border border-white/30 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition flex items-center gap-2">
              <Mail size={18} /> Enviar Mensagem
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><Briefcase size={20} /><span className="font-bold">Apex Consultoria</span></div>
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
