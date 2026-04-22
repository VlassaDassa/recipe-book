import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../AuthModal/AuthModal'
import './Header.css'

function Header({ onExport, onImport, onAdd }) {
  const { user, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
      <>
          <header className="app-header">
              <h1>🍳 Мои рецепты</h1>
              <div className="header-actions">
                  {user ? (
                      <>
                          <div className="user-profile">
                              <img
                                  src={
                                      user.avatar_url ||
                                      `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`
                                  }
                                  alt={user.username}
                                  className="user-avatar"
                              />
                              <span className="user-name">{user.username}</span>
                          </div>
                          <button className="logout-btn" onClick={logout}>
                              🚪 Выйти
                          </button>
                      </>
                  ) : (
                      <button
                          className="login-btn"
                          onClick={() => setShowAuthModal(true)}
                      >
                          🔐 Войти
                      </button>
                  )}
                  <button className="export-btn" onClick={onExport}>
                      📁 Экспорт
                  </button>
                  <label className="import-btn">
                      📂 Импорт
                      <input
                          type="file"
                          accept=".json"
                          onChange={onImport}
                          style={{ display: "none" }}
                      />
                  </label>
                  {user && (
                      <button className="add-button" onClick={onAdd}>
                          + Добавить
                      </button>
                  )}
              </div>
          </header>

          <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
          />
      </>
  );
}

export default Header