import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { CheckCircle, AlertCircle, X, Info, ShoppingCart } from 'lucide-react'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  cart: ShoppingCart,
}

const colors = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
  cart: 'bg-emerald-600',
}

function ToastItem({ toast, onRemove }) {
  const [exiting, setExiting] = useState(false)
  const Icon = icons[toast.type] || Info

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), toast.duration || 3000)
    return () => clearTimeout(timer)
  }, [toast.duration])

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(() => onRemove(toast.id), 300)
      return () => clearTimeout(timer)
    }
  }, [exiting, toast.id, onRemove])

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-white min-w-[300px] max-w-md transition-all duration-300 ${colors[toast.type]} ${exiting ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'}`}>
      <Icon size={18} className="shrink-0" />
      <div className="flex-1 min-w-0">
        {toast.title && <p className="font-semibold text-sm">{toast.title}</p>}
        <p className="text-sm opacity-95">{toast.message}</p>
      </div>
      <button onClick={() => setExiting(true)} className="shrink-0 hover:bg-white/20 p-1 rounded-lg transition">
        <X size={14} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx
}
