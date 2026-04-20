import Header from '../../components/Header/Header'
import SearchFilter from '../../components/SearchFilter/SearchFilter'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import RecipeForm from '../../components/RecipeForm/RecipeForm'
import { useRecipes } from '../../hooks/useRecipes'
import { useRecipeForm } from '../../hooks/useRecipeForm'
import { useRecipeFilters } from '../../hooks/useRecipeFilters'
import { exportRecipes, importRecipesFromFile } from '../../utils/fileHandlers'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from '../../components/Toast'
import './MainPage.css'

function MainPage() {
  const navigate = useNavigate()
  
  // Кастомные хуки
  const { recipes, addRecipe, updateRecipe, deleteRecipe, importRecipes } = useRecipes()
  const { filteredRecipes, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useRecipeFilters(recipes)
  const {
    isFormOpen,
    editingId,
    formData,
    setFormData,
    openAddForm,
    openEditForm,
    closeForm,
    getPreparedFormData
  } = useRecipeForm()

  // Обработчик сохранения рецепта
  const handleSaveRecipe = () => {
    const preparedData = getPreparedFormData()
    
  
    if (editingId) {
      updateRecipe(editingId, preparedData)
       toast.success(`✅ Рецепт "${preparedData.title}" обновлён!`)
    } else {
      addRecipe(preparedData)
       toast.success(`✅ Рецепт "${preparedData.title}" добавлен!`)
    }
    closeForm()
  }

  // Обработчик импорта
  const handleImport = async (event) => {
    const file = event.target.files[0]
    try {
      const importedRecipes = await importRecipesFromFile(file)
      const count = importRecipes(importedRecipes)
       toast.success(`✅ Загружено ${count} рецептов!`)
    } catch (error) {
      toast.error(`❌ ${error.message}`)
    }
    event.target.value = ''
  }

  // Экспорт функции редактирования для RecipeDetail
  useEffect(() => {
    window.openEditForm = openEditForm
    return () => {
      window.openEditForm = null
    }
  }, [openEditForm])

  return (
    <div className="app">
      <Header 
        onExport={() => exportRecipes(recipes)} 
        onImport={handleImport} 
        onAdd={openAddForm} 
      />

      <SearchFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalResults={filteredRecipes.length}
      />

      <main className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <div className="empty-state">
            {recipes.length === 0 ? (
              <>
                <p>У тебя пока нет рецептов.</p>
                <p>Нажми кнопку "Добавить рецепт" сверху.</p>
              </>
            ) : (
              <>
                <p>🔍 Ничего не найдено</p>
                <p>Попробуй изменить запрос или выбери другую категорию.</p>
              </>
            )}
          </div>
        ) : (
          filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id}
              recipe={recipe}
              onEdit={() => openEditForm(recipe)}
              onDelete={() => {
                deleteRecipe(recipe.id)
                toast.info(`🗑️ Рецепт "${recipe.title}" удалён`)
              }}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))
        )}
      </main>

      <RecipeForm 
        isOpen={isFormOpen}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveRecipe}
        onClose={closeForm}
      />
      
      {isFormOpen && <div className="overlay" onClick={closeForm}></div>}
    </div>
  )
}

export default MainPage