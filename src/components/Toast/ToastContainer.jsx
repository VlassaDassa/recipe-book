import { useState, useEffect } from 'react'
import Toast from './Toast'

// Глобальная переменная для хранения функции добавления тоста
let globalAddToast = null

export function ToastContainer() {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  // Сохраняем функцию в глобальную переменную при монтировании
  useEffect(() => {
    globalAddToast = addToast
    return () => {
      globalAddToast = null
    }
  }, [])

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

// Экспортируем объект toast с методами
export const toast = {
  success: (message, duration) => {
    globalAddToast?.(message, 'success', duration)
  },
  error: (message, duration) => {
    globalAddToast?.(message, 'error', duration)
  },
  warning: (message, duration) => {
    globalAddToast?.(message, 'warning', duration)
  },
  info: (message, duration) => {
    globalAddToast?.(message, 'info', duration)
  }
}