import { useState, useEffect } from 'react'
import { DEMO_RECIPES } from '../utils/constants'

const STORAGE_KEY = 'myRecipes'

export function useRecipes() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
    return DEMO_RECIPES
  })

  // Сохранение в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  // Добавление нового рецепта
  const addRecipe = (recipeData) => {
    const newRecipe = {
      ...recipeData,
      id: Date.now(),
      image: recipeData.image || 'https://via.placeholder.com/400x200?text=No+Photo'
    }
    setRecipes([newRecipe, ...recipes])
    return newRecipe
  }

  // Обновление существующего рецепта
  const updateRecipe = (id, recipeData) => {
    setRecipes(recipes.map(r => 
      r.id === id 
        ? { ...r, ...recipeData }
        : r
    ))
  }

  // Удаление рецепта
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id))
  }

  // Импорт рецептов
  const importRecipes = (importedRecipes) => {
    setRecipes(importedRecipes)
    return importedRecipes.length
  }

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    importRecipes
  }
}