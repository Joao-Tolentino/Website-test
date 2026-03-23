import { useState, useRef } from 'react'
import BackToHome from '../../components/BackToHome'
import Modal from '../../components/Modal'
import { useToast } from '../../components/Toast'
import {
  GraduationCap, BookOpen, Users, Clock, Star, Award,
  ArrowRight, ChevronRight, Play, Monitor, FileText,
  CheckCircle, Calendar, Globe, Phone, Mail, MapPin,
  TrendingUp, Lightbulb, Target, X
} from 'lucide-react'

const cursos = [
  { id: 1, titulo: 'Desenvolvimento Web Full Stack', area: 'Tecnologia', duracao: '12 meses', formato: 'Online', preco: 297, vagas: 40, rating: 4.9, alunos: 1240, nivel: 'Intermediário' },
  { id: 2, titulo: 'Design UX/UI Avançado', area: 'Design', duracao: '8 meses', formato: 'Online', preco: 247, vagas: 30, rating: 4.8, alunos: 890, nivel: 'Avançado' },
  { id: 3, titulo: 'Marketing Digital Estratégico', area: 'Marketing', duracao: '6 meses', formato: 'Híbrido', preco: 197, vagas: 50, rating: 4.7, alunos: 2100, nivel: 'Iniciante' },
  { id: 4, titulo: 'Data Science & Analytics', area: 'Dados', duracao: '10 meses', formato: 'Online', preco: 347, vagas: 25, rating: 4.9, alunos: 670, nivel: 'Intermediário' },
  { id: 5, titulo: 'Gestão de Projetos Ágeis', area: 'Gestão', duracao: '4 meses', formato: 'Presencial', preco: 187, vagas: 35, rating: 4.6, alunos: 1560, nivel: 'Iniciante' },
  { id: 6, titulo: 'Inteligência Artificial Aplicada', area: 'Tecnologia', duracao: '8 meses', formato: 'Online', preco: 397, vagas: 20, rating: 4.8, alunos: 430, nivel: 'Avançado' },
]

const areas = ['Todos', 'Tecnologia', 'Design', 'Marketing', 'Dados', 'Gestão']

const depoimentos = [
  { nome: 'Rafael Lima', curso: 'Full Stack', texto: 'O curso mudou minha carreira completamente. Em 6 meses já estava trabalhando como dev.', foto: '' },
  { nome: 'Camila Santos', curso: 'UX/UI Design', texto: 'Conteúdo muito prático e professores que realmente atuam no mercado. Recomendo demais!', foto: '' },
  { nome: 'Pedro Oliveira', curso: 'Data Science', texto: 'A didática é excelente e o suporte aos alunos é diferenciado. Valeu cada centavo.', foto: '' },
]

export default function Ensino() {
  const toast = useToast()
  const [areaAtiva, setAreaAtiva] = useState('Todos')
  const [matriculaModal, setMatriculaModal] = useState(null)
  const [aulaGratisModal, setAulaGratisModal] = useState(false)
  const [matriculas, setMatriculas] = useState([])
  const [formMatricula, setFormMatricula] = useState({ nome: '', email: '', telefone: '' })
  const cursosRef = useRef(null)

  const cursosFiltrados = cursos.filter(c =>
    areaAtiva === 'Todos' || c.area === areaAtiva
  )

  const handleMatricula = () => {
    if (!formMatricula.nome || !formMatricula.email) {
      toast({ type: 'error', message: 'Preencha nome e e-mail' })
      return
    }
    setMatriculas(prev => [...prev, matriculaModal.id])
    toast({ type: 'success', title: 'Matrícula realizada!', message: `Bem-vindo ao curso ${matriculaModal.titulo}` })
    setMatriculaModal(null)
    setFormMatricula({ nome: '', email: '', telefone: '' })
  }

  const handleAulaGratis = () => {
    if (!formMatricula.nome || !formMatricula.email) {
      toast({ type: 'error', message: 'Preencha nome e e-mail' })
      return
    }
    toast({ type: 'success', title: 'Aula liberada!', message: 'Confira seu e-mail para acessar a aula gratuita' })
    setAulaGratisModal(false)
    setFormMatricula({ nome: '', email: '', telefone: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      <BackToHome />

      {/* HEADER SECTION */}
      <header className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-violet-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                <GraduationCap size={14} />
                Plataforma de Ensino
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Aprenda com quem <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">faz acontecer</span>
              </h1>
              <p className="text-lg text-blue-200 mb-8">
                Cursos práticos com profissionais do mercado. Certificação reconhecida e suporte completo na sua jornada de aprendizado.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => cursosRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-indigo-900 px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition flex items-center gap-2"
                >
                  Explorar Cursos <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setAulaGratisModal(true)}
                  className="border border-white/20 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/5 transition flex items-center gap-2"
                >
                  <Play size={18} /> Aula Grátis
                </button>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { num: '15.000+', label: 'Alunos Formados', icon: Users },
                { num: '50+', label: 'Cursos Ativos', icon: BookOpen },
                { num: '4.8', label: 'Avaliação Média', icon: Star },
                { num: '92%', label: 'Empregabilidade', icon: TrendingUp },
              ].map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                  <s.icon size={24} className="text-cyan-400 mb-3" />
                  <p className="text-2xl font-bold">{s.num}</p>
                  <p className="text-sm text-blue-300">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Diferenciais */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Monitor, titulo: 'Aulas ao Vivo', desc: 'Interaja em tempo real com os professores' },
            { icon: FileText, titulo: 'Material Exclusivo', desc: 'Apostilas, exercícios e projetos práticos' },
            { icon: Award, titulo: 'Certificado', desc: 'Reconhecido pelo mercado de trabalho' },
            { icon: Lightbulb, titulo: 'Mentoria', desc: 'Acompanhamento individual de carreira' },
          ].map((d, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex p-3 bg-indigo-100 rounded-xl mb-3 group-hover:bg-indigo-600 transition-colors">
                <d.icon size={24} className="text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold mb-1">{d.titulo}</h3>
              <p className="text-sm text-gray-500">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos */}
      <section ref={cursosRef} className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Catálogo</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Nossos Cursos</h2>
          </div>

          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {areas.map(a => (
              <button
                key={a}
                onClick={() => setAreaAtiva(a)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  areaAtiva === a ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-indigo-50'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosFiltrados.map((c) => {
              const matriculado = matriculas.includes(c.id)
              return (
                <div key={c.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                  <div className="h-40 bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center relative">
                    <BookOpen size={48} className="text-indigo-200 group-hover:text-indigo-400 transition-colors" />
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-lg font-medium">{c.formato}</span>
                    <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-lg font-medium ${
                      c.nivel === 'Iniciante' ? 'bg-green-100 text-green-600' :
                      c.nivel === 'Intermediário' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>{c.nivel}</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-indigo-600 font-medium">{c.area}</span>
                    <h3 className="font-bold mt-1 mb-2 group-hover:text-indigo-600 transition-colors">{c.titulo}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Clock size={14} /> {c.duracao}</span>
                      <span className="flex items-center gap-1"><Users size={14} /> {c.alunos}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className={j < Math.floor(c.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{c.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-700">R$ {c.preco}/mês</span>
                      <button
                        onClick={() => matriculado ? null : setMatriculaModal(c)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          matriculado
                            ? 'bg-green-100 text-green-700'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {matriculado ? 'Matriculado' : 'Matricular'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Matrícula Modal */}
      <Modal open={!!matriculaModal} onClose={() => setMatriculaModal(null)} title="Matrícula">
        {matriculaModal && (
          <div>
            <div className="bg-indigo-50 rounded-xl p-4 mb-6">
              <h3 className="font-bold text-indigo-800">{matriculaModal.titulo}</h3>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-indigo-600">
                <span>{matriculaModal.duracao}</span>
                <span>•</span>
                <span>{matriculaModal.formato}</span>
                <span>•</span>
                <span>{matriculaModal.nivel}</span>
              </div>
              <p className="text-xl font-bold text-indigo-700 mt-3">R$ {matriculaModal.preco}/mês</p>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Nome completo *" value={formMatricula.nome} onChange={e => setFormMatricula({ ...formMatricula, nome: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="email" placeholder="E-mail *" value={formMatricula.email} onChange={e => setFormMatricula({ ...formMatricula, email: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="tel" placeholder="Telefone" value={formMatricula.telefone} onChange={e => setFormMatricula({ ...formMatricula, telefone: e.target.value })}
                className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <button onClick={handleMatricula} className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <GraduationCap size={16} /> Confirmar Matrícula
            </button>
          </div>
        )}
      </Modal>

      {/* Aula Grátis Modal */}
      <Modal open={aulaGratisModal} onClose={() => setAulaGratisModal(false)} title="Aula Gratuita" size="sm">
        <div className="text-center mb-6">
          <Play size={40} className="text-indigo-600 mx-auto mb-3" />
          <p className="text-gray-600 text-sm">Experimente uma aula gratuita de qualquer curso. Sem compromisso!</p>
        </div>
        <div className="space-y-3">
          <input type="text" placeholder="Seu nome *" value={formMatricula.nome} onChange={e => setFormMatricula({ ...formMatricula, nome: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="email" placeholder="Seu e-mail *" value={formMatricula.email} onChange={e => setFormMatricula({ ...formMatricula, email: e.target.value })}
            className="w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button onClick={handleAulaGratis} className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
          <Play size={16} /> Acessar Aula Grátis
        </button>
      </Modal>

      {/* Depoimentos */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Depoimentos</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Quem já estudou recomenda</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {depoimentos.map((d, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">"{d.texto}"</p>
              <div>
                <p className="font-semibold">{d.nome}</p>
                <p className="text-sm text-indigo-600">Aluno — {d.curso}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comece sua jornada de aprendizado</h2>
          <p className="text-indigo-100 mb-8">Primeira aula gratuita em qualquer curso. Sem compromisso.</p>
          <button
            onClick={() => setAulaGratisModal(true)}
            className="bg-white text-indigo-700 px-8 py-3.5 rounded-lg font-semibold hover:shadow-xl transition flex items-center gap-2 mx-auto"
          >
            <GraduationCap size={18} /> Começar Agora
          </button>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-indigo-950 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2"><GraduationCap size={20} className="text-blue-400" /><span className="font-bold">Educa+</span></div>
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
