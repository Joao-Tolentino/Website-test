import { useState, useRef } from 'react'
import BackToHome from '../../components/BackToHome'
import Modal from '../../components/Modal'
import { useToast } from '../../components/Toast'
import {
  Star, ArrowRight, Check, Clock, Award, Users,
  Camera, Palette, PenTool, Lightbulb, MessageSquare,
  Phone, Mail, MapPin, Instagram, ChevronRight, Quote, X
} from 'lucide-react'

const servicos = [
  { nome: 'Design de Marca', desc: 'Identidade visual completa para o seu negócio', icon: Palette, preco: 'A partir de R$ 1.500', detalhes: 'Inclui logotipo, paleta de cores, tipografia, papelaria e manual de marca. Prazo médio de 30 dias.' },
  { nome: 'Fotografia', desc: 'Ensaios profissionais, produtos e eventos', icon: Camera, preco: 'A partir de R$ 800', detalhes: 'Cobertura fotográfica profissional com edição, tratamento e entrega em alta resolução. Ensaios de 2 a 4 horas.' },
  { nome: 'Ilustração', desc: 'Arte personalizada para projetos criativos', icon: PenTool, preco: 'A partir de R$ 600', detalhes: 'Ilustrações digitais personalizadas para livros, embalagens, redes sociais e materiais impressos.' },
  { nome: 'Consultoria Criativa', desc: 'Direção de arte e estratégia visual', icon: Lightbulb, preco: 'A partir de R$ 300/h', detalhes: 'Sessões de consultoria para definir direção criativa, posicionamento visual e estratégia de marca.' },
]

const portfolio = [
  { titulo: 'Rebranding Café Aurora', categoria: 'Design de Marca', desc: 'Redesign completo da identidade visual, incluindo novo logotipo, embalagens e material promocional.' },
  { titulo: 'Catálogo Primavera 2025', categoria: 'Fotografia', desc: 'Ensaio fotográfico para catálogo sazonal de moda, com 120 fotos tratadas.' },
  { titulo: 'Identidade Startup Tech', categoria: 'Design de Marca', desc: 'Criação de marca do zero para startup de tecnologia, incluindo app e web design.' },
  { titulo: 'Ilustrações Livro Infantil', categoria: 'Ilustração', desc: '24 ilustrações digitais para livro infantil publicado pela Editora Lumiar.' },
  { titulo: 'Ensaio Restaurante Premium', categoria: 'Fotografia', desc: 'Fotografia gastronômica e de ambiente para cardápio e redes sociais.' },
  { titulo: 'Branding Loja Online', categoria: 'Design de Marca', desc: 'Identidade visual e design de e-commerce para loja de produtos artesanais.' },
]

const depoimentos = [
  { nome: 'Marina Costa', cargo: 'CEO, Café Aurora', texto: 'Trabalho impecável! A nova identidade visual elevou completamente a percepção da nossa marca.' },
  { nome: 'Carlos Mendes', cargo: 'Diretor, TechStart', texto: 'Profissionalismo e criatividade em cada detalhe. Superou todas as nossas expectativas.' },
  { nome: 'Ana Lucia', cargo: 'Editora, Lumiar Livros', texto: 'As ilustrações ficaram mágicas. Nosso livro ganhou vida com o talento desse profissional.' },
]

export default function ServicoIndividual() {
  const toast = useToast()
  const portfolioRef = useRef(null)
  const [servicoDetalhe, setServicoDetalhe] = useState(null)
  const [projetoDetalhe, setProjetoDetalhe] = useState(null)
  const [orcamentoModal, setOrcamentoModal] = useState(false)
  const [contatoModal, setContatoModal] = useState(false)
  const [formOrcamento, setFormOrcamento] = useState({ nome: '', email: '', telefone: '', servico: '', mensagem: '' })
  const [formContato, setFormContato] = useState({ nome: '', email: '', mensagem: '' })

  const handleOrcamento = () => {
    if (!formOrcamento.nome || !formOrcamento.email) { toast({ type: 'error', message: 'Preencha nome e e-mail' }); return }
    toast({ type: 'success', title: 'Orçamento solicitado!', message: 'Retornarei em até 24h com uma proposta personalizada' })
    setOrcamentoModal(false)
    setFormOrcamento({ nome: '', email: '', telefone: '', servico: '', mensagem: '' })
  }

  const handleContato = () => {
    if (!formContato.nome || !formContato.email || !formContato.mensagem) { toast({ type: 'error', message: 'Preencha todos os campos' }); return }
    toast({ type: 'success', title: 'Mensagem enviada!', message: 'Responderei o mais breve possível' })
    setContatoModal(false)
    setFormContato({ nome: '', email: '', mensagem: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      <BackToHome />

      {/* HEADER SECTION */}
      <header className="relative bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Award size={14} className="text-violet-300" />
              Profissional Certificado
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
              Design que <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-pink-300">Transforma</span> Negócios
            </h1>
            <p className="text-lg text-violet-200 mb-8 leading-relaxed">
              Criatividade estratégica para marcas que querem se destacar. Mais de 10 anos transformando ideias em experiências visuais memoráveis.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-violet-900 px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-white/20 transition flex items-center gap-2">
                Ver Portfólio <ArrowRight size={18} />
              </button>
              <button onClick={() => setOrcamentoModal(true)}
                className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                Solicitar Orçamento
              </button>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {[{ num: '200+', label: 'Projetos' }, { num: '150+', label: 'Clientes' }, { num: '10+', label: 'Anos' }].map((s, i) => (
              <div key={i} className="text-center"><p className="text-3xl font-bold">{s.num}</p><p className="text-sm text-violet-300">{s.label}</p></div>
            ))}
          </div>
        </div>
      </header>

      {/* Serviços */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Serviços</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">O que eu ofereço</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicos.map((s, i) => (
            <div key={i} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-violet-200 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-violet-100 p-3 rounded-xl group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <s.icon size={24} className="text-violet-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{s.nome}</h3>
                  <p className="text-gray-500 text-sm mb-3">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-violet-600 font-semibold text-sm">{s.preco}</span>
                    <button onClick={() => setServicoDetalhe(s)} className="text-sm text-gray-400 hover:text-violet-600 transition flex items-center gap-1">
                      Saiba mais <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Serviço Detalhe Modal */}
      <Modal open={!!servicoDetalhe} onClose={() => setServicoDetalhe(null)} title={servicoDetalhe?.nome || ''}>
        {servicoDetalhe && (
          <div>
            <div className="bg-violet-50 rounded-xl p-6 flex items-center gap-4 mb-6">
              <div className="bg-violet-600 p-3 rounded-xl"><servicoDetalhe.icon size={28} className="text-white" /></div>
              <div>
                <h3 className="font-bold text-lg">{servicoDetalhe.nome}</h3>
                <p className="text-violet-600 font-semibold">{servicoDetalhe.preco}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">{servicoDetalhe.detalhes}</p>
            <button onClick={() => { setServicoDetalhe(null); setOrcamentoModal(true); setFormOrcamento(prev => ({ ...prev, servico: servicoDetalhe.nome })) }}
              className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition">
              Solicitar Orçamento
            </button>
          </div>
        )}
      </Modal>

      {/* Portfolio */}
      <section ref={portfolioRef} className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Portfólio</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Trabalhos Recentes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <div key={i} onClick={() => setProjetoDetalhe(p)} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="h-56 bg-gradient-to-br from-violet-100 to-purple-50 flex items-center justify-center">
                  <Palette size={48} className="text-violet-200 group-hover:text-violet-400 transition-colors group-hover:scale-110 transform duration-300" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-violet-600 font-medium">{p.categoria}</span>
                  <h3 className="font-bold mt-1 group-hover:text-violet-600 transition-colors">{p.titulo}</h3>
                </div>
                <div className="absolute inset-0 bg-violet-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold flex items-center gap-2">Ver projeto <ArrowRight size={16} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projeto Detalhe Modal */}
      <Modal open={!!projetoDetalhe} onClose={() => setProjetoDetalhe(null)} title={projetoDetalhe?.titulo || ''}>
        {projetoDetalhe && (
          <div>
            <div className="bg-gradient-to-br from-violet-100 to-purple-50 rounded-xl h-48 flex items-center justify-center mb-6">
              <Palette size={64} className="text-violet-300" />
            </div>
            <span className="text-xs text-violet-600 font-medium">{projetoDetalhe.categoria}</span>
            <h3 className="text-xl font-bold mt-1 mb-3">{projetoDetalhe.titulo}</h3>
            <p className="text-gray-600 mb-6">{projetoDetalhe.desc}</p>
            <button onClick={() => { setProjetoDetalhe(null); setOrcamentoModal(true) }}
              className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition">
              Quero um projeto assim
            </button>
          </div>
        )}
      </Modal>

      {/* Orçamento Modal */}
      <Modal open={orcamentoModal} onClose={() => setOrcamentoModal(false)} title="Solicitar Orçamento">
        <div className="space-y-3">
          <input type="text" placeholder="Nome *" value={formOrcamento.nome} onChange={e => setFormOrcamento({ ...formOrcamento, nome: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          <input type="email" placeholder="E-mail *" value={formOrcamento.email} onChange={e => setFormOrcamento({ ...formOrcamento, email: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          <input type="tel" placeholder="Telefone" value={formOrcamento.telefone} onChange={e => setFormOrcamento({ ...formOrcamento, telefone: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          <select value={formOrcamento.servico} onChange={e => setFormOrcamento({ ...formOrcamento, servico: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-600">
            <option value="">Selecione o serviço</option>
            {servicos.map((s, i) => <option key={i} value={s.nome}>{s.nome}</option>)}
          </select>
          <textarea placeholder="Conte sobre seu projeto..." rows={4} value={formOrcamento.mensagem} onChange={e => setFormOrcamento({ ...formOrcamento, mensagem: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <button onClick={handleOrcamento} className="w-full mt-4 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition">
          Enviar Solicitação
        </button>
      </Modal>

      {/* Contato Modal */}
      <Modal open={contatoModal} onClose={() => setContatoModal(false)} title="Fale Comigo" size="sm">
        <div className="space-y-3">
          <input type="text" placeholder="Nome *" value={formContato.nome} onChange={e => setFormContato({ ...formContato, nome: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          <input type="email" placeholder="E-mail *" value={formContato.email} onChange={e => setFormContato({ ...formContato, email: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          <textarea placeholder="Sua mensagem *" rows={4} value={formContato.mensagem} onChange={e => setFormContato({ ...formContato, mensagem: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <button onClick={handleContato} className="w-full mt-4 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition">Enviar</button>
      </Modal>

      {/* Processo */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Processo</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Como eu trabalho</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', titulo: 'Briefing', desc: 'Entendo suas necessidades, objetivos e expectativas.' },
            { step: '02', titulo: 'Pesquisa', desc: 'Analiso o mercado, concorrência e referências.' },
            { step: '03', titulo: 'Criação', desc: 'Desenvolvo conceitos e apresento propostas.' },
            { step: '04', titulo: 'Entrega', desc: 'Refinamos juntos até a aprovação final.' },
          ].map((p, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl font-bold text-lg mb-4 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                {p.step}
              </div>
              <h3 className="font-bold mb-2">{p.titulo}</h3>
              <p className="text-sm text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-violet-950 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-violet-300 font-semibold text-sm uppercase tracking-wider">Depoimentos</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">O que dizem sobre mim</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {depoimentos.map((d, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <Quote size={24} className="text-violet-400 mb-4" />
                <p className="text-violet-100 mb-6 leading-relaxed">{d.texto}</p>
                <div>
                  <p className="font-semibold">{d.nome}</p>
                  <p className="text-sm text-violet-300">{d.cargo}</p>
                </div>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-3xl p-10 md:p-16 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Vamos criar algo incrível juntos?</h2>
          <p className="text-violet-200 max-w-xl mx-auto mb-8">
            Entre em contato e vamos conversar sobre como posso ajudar a transformar sua visão em realidade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setContatoModal(true)} className="bg-white text-violet-700 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition flex items-center gap-2">
              <MessageSquare size={18} /> Fale Comigo
            </button>
            <button className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition flex items-center gap-2">
              <Instagram size={18} /> @designer
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Studio Criativo — Todos os direitos reservados</p>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition flex items-center justify-center w-10 h-10">
              <ion-icon name="logo-instagram" style={{ fontSize: '20px' }}></ion-icon>
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition flex items-center justify-center w-10 h-10">
              <ion-icon name="mail-sharp" style={{ fontSize: '20px' }}></ion-icon>
            </a>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition"><Phone size={14} /> (11) 99000-0000</span>
            <span className="flex items-center gap-1 hover:text-white cursor-pointer transition"><Mail size={14} /> contato@studio.com</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
