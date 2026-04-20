import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { toast } from '../Toast'
import './AuthModal.css'

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, register } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (isLogin) {
        await login(username, password)
        toast.success(`Добро пожаловать, ${username}!`)
      } else {
        await register(username, password)
        toast.success('Регистрация успешна!')
      }
      onClose()
      setUsername('')
      setPassword('')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="auth-modal">
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Регистрация' : 'Вход'}
          </button>
        </p>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>
    </>
  )
}

export default AuthModal