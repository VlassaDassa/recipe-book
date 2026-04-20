import { useParams, useNavigate } from 'react-router-dom'
import { useRecipes } from '../../hooks/useRecipes'
import './RecipeDetail.css'
import { toast } from '../../components/Toast'

// Эмодзи для категорий
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

function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { recipes, loading, deleteRecipe } = useRecipes()
 
  // Проверка загрузки
  if (loading) {
    return (
      <div className="not-found">
        <p>⏳ Загрузка...</p>
      </div>
    )
  }

  const recipe = recipes.find(r => r.id === parseInt(id))
  
  // Если рецепт не найден
  if (!recipe) {
    return (
      <div className="not-found">
        <h2>Рецепт не найден</h2>
        <button onClick={() => navigate('/')}>← На главную</button>
      </div>
    )
  }
  
  // Обработчик удаления
  const handleDelete = () => {
    if (window.confirm('Удалить рецепт?')) {
      deleteRecipe(recipe.id)
       toast.info(`🗑️ Рецепт "${recipe.title}" удалён`)
      navigate('/')
    }
  }
  
  // Обработчик редактирования
  const handleEdit = () => {
    navigate('/')
    // Небольшая задержка, чтобы успел отработать navigate
    setTimeout(() => {
      window.openEditForm?.(recipe)
    }, 100)
  }

  // Получаем эмодзи категории
  const categoryEmoji = CATEGORY_EMOJI[recipe.category] || '🍽️'
  
  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      toast.success('🔗 Ссылка на рецепт скопирована!')
    }).catch(() => {
      toast.error('❌ Не удалось скопировать ссылку')
    })
  }
 
  return (
    <div className="recipe-detail-page">
      <div className="detail-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Назад к списку
        </button>
        
        <div className="detail-header">
          <div className="detail-actions">
            <button className="share-button" onClick={handleShare}>
              🔗 Поделиться
            </button>
            <button className="edit-button" onClick={handleEdit}>
              ✏️ Редактировать
            </button>
            <button className="delete-button" onClick={handleDelete}>
              🗑️ Удалить
            </button>
          </div>
        </div>
        
        <div className="detail-image">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            onError={(e) => {
              e.target.src = 'https://img.freepik.com/premium-vector/plate-food-with-drawing-food-it_788759-10547.jpg'
            }}
          />
        </div>
        
        <h1 className="detail-title">{recipe.title}</h1>
        
        <div className="detail-meta">
          <span className="detail-category">
            {categoryEmoji} {recipe.category}
          </span>
          <span className="detail-time">⏱️ {recipe.time} мин</span>
          <span className={`detail-difficulty difficulty-${recipe.difficulty.toLowerCase()}`}>
            📊 {recipe.difficulty}
          </span>
          {recipe.servings && (
            <span className="detail-servings">🍽️ {recipe.servings} порций</span>
          )}
          {recipe.calories && (
            <span className="detail-calories">🔥 {recipe.calories} ккал</span>
          )}
        </div>
        
        <div className="detail-section">
          <h2>🥕 Ингредиенты</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                <span className="ing-name">{ing.name}</span>
                <span className="ing-amount">{ing.amount} {ing.unit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="detail-section">
          <h2>📝 Приготовление</h2>
          <ol className="steps-list">
            {recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail