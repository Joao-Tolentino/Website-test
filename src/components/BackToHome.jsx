import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackToHome() {
  return (
    <Link
      to="/vitrine"
      className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 text-sm font-medium"
    >
      <ArrowLeft size={16} />
      Voltar à Vitrine
    </Link>
  )
}
