import { useState, useEffect } from 'react'
import { recipesAPI } from '../api/client'
import { useAuth } from '../context/AuthContext'
import { DEMO_RECIPES } from '../utils/constants'
import { toast } from '../components/Toast'

export function useRecipes() {
  const { user } = useAuth()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  // Загружаем рецепты при изменении пользователя
  useEffect(() => {
    async function loadRecipes() {
      if (user) {
        // Пользователь вошёл — грузим его рецепты из базы
        try {
          setLoading(true)
          const data = await recipesAPI.getAll()
          setRecipes(data)
        } catch (err) {
          toast.error('Не удалось загрузить рецепты')
          console.error(err)
          setRecipes([])
        } finally {
          setLoading(false)
        }
      } else {
        // Гость — показываем демо-рецепты (или пусто)
        setRecipes(DEMO_RECIPES)
        setLoading(false)
      }
    }
    
    loadRecipes()
  }, [user])

  // Добавить рецепт
  const addRecipe = async (recipeData) => {
    if (!user) {
      toast.error('Войдите, чтобы добавлять рецепты')
      return null
    }

    try {
      const newRecipe = await recipesAPI.create({
        ...recipeData,
        is_public: false // По умолчанию приватный
      })
      setRecipes([newRecipe, ...recipes])
      toast.success(`✅ Рецепт "${newRecipe.title}" добавлен!`)
      return newRecipe
    } catch (err) {
      toast.error('Не удалось добавить рецепт')
      console.error(err)
      return null
    }
  }

  // Обновить рецепт
  const updateRecipe = async (id, recipeData) => {
    if (!user) {
      toast.error('Войдите, чтобы редактировать рецепты')
      return
    }

    try {
      const updatedRecipe = await recipesAPI.update(id, {
        ...recipeData,
        is_public: recipeData.is_public || false
      })
      setRecipes(recipes.map(r => r.id === id ? updatedRecipe : r))
      toast.success(`✅ Рецепт "${updatedRecipe.title}" обновлён!`)
    } catch (err) {
      toast.error('Не удалось обновить рецепт')
      console.error(err)
    }
  }

  // Удалить рецепт
  const deleteRecipe = async (id) => {
    if (!user) {
      toast.error('Войдите, чтобы удалять рецепты')
      return
    }

    try {
      const recipeToDelete = recipes.find(r => r.id === id)
      await recipesAPI.delete(id)
      setRecipes(recipes.filter(r => r.id !== id))
      if (recipeToDelete) {
        toast.info(`🗑️ Рецепт "${recipeToDelete.title}" удалён`)
      }
    } catch (err) {
      toast.error('Не удалось удалить рецепт')
      console.error(err)
    }
  }

  // Импорт рецептов (пока оставим как есть, потом можно доработать)
  const importRecipes = (importedRecipes) => {
    if (!user) {
      toast.error('Войдите, чтобы импортировать рецепты')
      return 0
    }
    // TODO: реализовать импорт через API
    toast.info('Импорт пока в разработке')
    return 0
  }

  return {
    recipes,
    loading,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    importRecipes
  }
}