import './RecipeCard.css'

const CATEGORY_EMOJI = {
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

function RecipeCard({ recipe, onEdit, onDelete, onClick }) {
  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="card-image">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          onError={(e) => {
            e.target.src = 'https://img.freepik.com/premium-vector/plate-food-with-drawing-food-it_788759-10547.jpg'
          }}
        />
      </div>
      <div className="card-content">
        <span className="card-category">
          {CATEGORY_EMOJI[recipe.category] || '🍽️'} {recipe.category}
        </span>
        <h3>{recipe.title}</h3>
        <div className="card-meta">
          <span>⏱️ {recipe.time} мин</span>
          <span>📊 {recipe.difficulty}</span>
        </div>
        <p className="ingredients-count">🥕 Ингредиентов: {recipe.ingredients.length}</p>
        <div className="card-actions">
          <button 
            className="edit-card-btn"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
          >
            ✏️
          </button>
          <button 
            className="delete-card-btn"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            🗑️ Удалить
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard