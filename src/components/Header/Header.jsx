import './Header.css'

function Header({ onExport, onImport, onAdd }) {
  return (
    <header className="app-header">
      <h1>🍳 Мои рецепты</h1>
      <div className="header-actions">
        <button className="export-btn" onClick={onExport}>📁 Экспорт</button>
        <label className="import-btn">
          📂 Импорт
          <input type="file" accept=".json" onChange={onImport} style={{ display: 'none' }} />
        </label>
        <button className="add-button" onClick={onAdd}>+ Добавить</button>
      </div>
    </header>
  )
}

export default Header