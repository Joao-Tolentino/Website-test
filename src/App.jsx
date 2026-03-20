import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import Supermercado from './pages/Supermercado'
import ComercioFocado from './pages/ComercioFocado'
import ServicoIndividual from './pages/ServicoIndividual'
import Consultoria from './pages/Consultoria'
import Eventos from './pages/Eventos'
import Restaurante from './pages/Restaurante'
import Ensino from './pages/Ensino'
import Logistica from './pages/Logistica'
import Fornecedores from './pages/Fornecedores'
import Imobiliaria from './pages/Imobiliaria'
import Barbearia from './pages/Barbearia'
import Institucional from './pages/Institucional'

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Institucional />} />
        <Route path="/vitrine" element={<Home />} />
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
      </Routes>
    </ToastProvider>
  )
}
