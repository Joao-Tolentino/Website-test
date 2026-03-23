import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import Vitrine from './pages/templates/Vitrine'
import Supermercado from './pages/templates/Supermercado'
import ComercioFocado from './pages/templates/ComercioFocado'
import ServicoIndividual from './pages/templates/ServicoIndividual'
import Consultoria from './pages/templates/Consultoria'
import Eventos from './pages/templates/Eventos'
import Restaurante from './pages/templates/Restaurante'
import Ensino from './pages/templates/Ensino'
import Logistica from './pages/templates/Logistica'
import Fornecedores from './pages/templates/Fornecedores'
import Imobiliaria from './pages/templates/Imobiliaria'
import Barbearia from './pages/templates/Barbearia'
import Institucional from './pages/templates/Institucional'
import Home from './pages/Home'
import AutomacaoPage from './pages/AutomacaoPage'
import PrecosPage from './pages/PrecosPage'
import SobrePage from './pages/SobrePage'
import WebPage from './pages/WebPage'

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vitrine" element={<Vitrine />} />
        <Route path="/supermercado" element={<Supermercado />} />
        <Route path="/comercio-focado" element={<ComercioFocado />} />
        <Route path="/servico-individual" element={<ServicoIndividual />} />
        <Route path="/consultoria" element={<Consultoria />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/restaurante" element={<Restaurante />} />
        <Route path="/ensino" element={<Ensino />} />
        <Route path="/logistica" element={<Logistica />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/imobiliaria" element={<Imobiliaria />} />
        <Route path="/barbearia" element={<Barbearia />} />
        <Route path="/institucional" element={<Institucional />} />
        <Route path="/web" element={<WebPage />} />
        <Route path="/automacao" element={<AutomacaoPage />} />
        <Route path="/precos" element={<PrecosPage />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Routes>
    </ToastProvider>
  )
}
