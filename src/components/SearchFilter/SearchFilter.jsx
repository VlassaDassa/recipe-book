import './SearchFilter.css'

const CATEGORY_ICONS = {
  'Все': '📋',
  'Завтрак': '🍳',
  'Обед': '🍲',
  'Ужин': '🍝',
  'Суп': '🥣',
  'Салат': '🥗',
  'Десерт': '🍰',
  'Выпечка': '🥐',
  'Напиток': '🍹',
  'Соус': '🥫',
  'Другое': '👩🏻‍🍳'
}

function SearchFilter({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  totalResults 
}) {
  const categories = Object.keys(CATEGORY_ICONS)

  return (
    <div className="search-section">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="🔍 Поиск по названию..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="filter-buttons">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {CATEGORY_ICONS[cat]} {cat}
          </button>
        ))}
      </div>
      <div className="results-count">
        Найдено рецептов: {totalResults}
      </div>
    </div>
  )
}

export default SearchFilter