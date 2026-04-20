import { useEffect } from 'react'
import './RecipeForm.css'
import { useFormValidation } from '../../hooks/useFormValidation'

const CATEGORIES = ['Завтрак', 'Обед', 'Ужин', 'Десерт', 'Выпечка', 'Салат', 'Суп', 'Соус', 'Напиток', 'Другое']
const DIFFICULTIES = ['Легко', 'Средне', 'Сложно']
const UNITS = ['гр', 'кг', 'мл', 'л', 'шт', 'ст.л', 'ч.л', 'по вкусу']

function RecipeForm({ isOpen, editingId, formData, setFormData, onSave, onClose }) {
  const { errors, isValid, resetErrors } = useFormValidation(formData, editingId)

  // Сбрасываем ошибки при открытии/закрытии формы
  useEffect(() => {
    if (!isOpen) {
      resetErrors()
    }
  }, [isOpen])

  // Обработчик сохранения
  const handleSubmit = () => {
    if (isValid) {
      onSave()
    }
  }

  // Вспомогательная функция для класса поля с ошибкой
  const getFieldClassName = (fieldName) => {
    return `form-group ${errors[fieldName] ? 'has-error' : ''}`
  }

  return (
    <div className={`form-panel ${isOpen ? 'open' : ''}`}>
      <div className="form-panel-header">
        <h2>{editingId ? '✏️ Редактирование' : '🆕 Новый рецепт'}</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="form-panel-body">
        {/* Название */}
        <div className={getFieldClassName('title')}>
          <label>Название рецепта *</label>
          <input 
            type="text" 
            placeholder="Например: Борщ"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-row">
          {/* Категория */}
          <div className="form-group">
            <label>Категория</label>
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          
          {/* Время */}
          <div className={getFieldClassName('time')}>
            <label>Время (мин) *</label>
            <input 
              type="number" 
              placeholder="90" 
              value={formData.time} 
              onChange={(e) => setFormData({...formData, time: e.target.value})} 
            />
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>
        </div>

        <div className="form-row">
          {/* Порции */}
          <div className={getFieldClassName('servings')}>
            <label>Порций</label>
            <input 
              type="number" 
              placeholder="4" 
              value={formData.servings} 
              onChange={(e) => setFormData({...formData, servings: e.target.value})} 
            />
            {errors.servings && <span className="error-message">{errors.servings}</span>}
          </div>
          
          {/* Калории */}
          <div className={getFieldClassName('calories')}>
            <label>Калорий (ккал)</label>
            <input 
              type="number" 
              placeholder="350" 
              value={formData.calories} 
              onChange={(e) => setFormData({...formData, calories: e.target.value})} 
            />
            {errors.calories && <span className="error-message">{errors.calories}</span>}
          </div>
        </div>

        {/* Сложность */}
        <div className="form-group">
          <label>Сложность</label>
          <select value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})}>
            {DIFFICULTIES.map(diff => <option key={diff}>{diff}</option>)}
          </select>
        </div>

        {/* Ссылка на фото */}
        <div className={getFieldClassName('image')}>
          <label>Ссылка на фото *</label>
          <input 
            type="text" 
            placeholder="https://..." 
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})} 
          />
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        {/* Ингредиенты */}
        <div className={`form-section ${errors.ingredients ? 'has-error' : ''}`}>
          <label>🥕 Ингредиенты * (минимум 3)</label>
          {formData.ingredients.map((ing, index) => {
  const isByTaste = ing.unit === 'по вкусу'
  
  return (
    <div key={index} className="ingredient-row">
      <input 
        placeholder="Название" 
        value={ing.name} 
        onChange={(e) => {
          const newIngs = [...formData.ingredients]
          newIngs[index].name = e.target.value
          setFormData({...formData, ingredients: newIngs})
        }} 
      />
      
      {/* Поле количества — блокируется, если выбрано "по вкусу" */}
      <input 
        type={isByTaste ? "text" : "number"}
        placeholder={isByTaste ? "—" : "Кол-во"}
        value={isByTaste ? "" : ing.amount}
        style={{width: '80px'}}
        min={isByTaste ? undefined : "0.1"}
        step={isByTaste ? undefined : "0.1"}
        disabled={isByTaste}
        onChange={(e) => {
          const newIngs = [...formData.ingredients]
          newIngs[index].amount = e.target.value
          setFormData({...formData, ingredients: newIngs})
        }} 
      />
      
      <select 
        value={ing.unit} 
        style={{width: '90px'}} 
        onChange={(e) => {
          const newUnit = e.target.value
          const newIngs = [...formData.ingredients]
          newIngs[index].unit = newUnit
          
          // Если выбрали "по вкусу" — очищаем количество
          if (newUnit === 'по вкусу') {
            newIngs[index].amount = ''
          }
          
          setFormData({...formData, ingredients: newIngs})
        }}
      >
        {UNITS.map(u => <option key={u}>{u}</option>)}
      </select>
      
      <button 
        type="button" 
        className="remove-btn" 
        onClick={() => {
          if (formData.ingredients.length > 1) {
            setFormData({...formData, ingredients: formData.ingredients.filter((_, i) => i !== index)})
          }
        }}
      >
        🗑️
      </button>
    </div>
  )
})}
          {errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
          <button 
            type="button" 
            className="add-more-btn" 
            onClick={() => setFormData({...formData, ingredients: [...formData.ingredients, { name: '', amount: '', unit: 'гр' }]})}
          >
            + Добавить ингредиент
          </button>
        </div>

        {/* Шаги */}
        <div className={`form-section ${errors.steps ? 'has-error' : ''}`}>
          <label>📝 Шаги приготовления * (минимум 3)</label>
          {formData.steps.map((step, index) => (
            <div key={index} className="step-row">
              <span className="step-number">{index + 1}</span>
              <input 
                placeholder={`Шаг ${index + 1}`} 
                value={step} 
                onChange={(e) => {
                  const newSteps = [...formData.steps]
                  newSteps[index] = e.target.value
                  setFormData({...formData, steps: newSteps})
                }} 
              />
              <button 
                type="button" 
                className="remove-btn" 
                onClick={() => {
                  if (formData.steps.length > 1) {
                    setFormData({...formData, steps: formData.steps.filter((_, i) => i !== index)})
                  }
                }}
              >
                🗑️
              </button>
            </div>
          ))}
          {errors.steps && <span className="error-message">{errors.steps}</span>}
          <button 
            type="button" 
            className="add-more-btn" 
            onClick={() => setFormData({...formData, steps: [...formData.steps, '']})}
          >
            + Добавить шаг
          </button>
        </div>
        
        {/* Кнопки */}
        <div className="form-actions">
          <button className="cancel-btn" onClick={onClose}>Отмена</button>
          <button 
            className={`save-btn ${!isValid ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeForm