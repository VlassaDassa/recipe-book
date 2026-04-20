import { useState, useMemo } from 'react'

export function useRecipeFilters(recipes) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'Все' || recipe.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, selectedCategory])

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredRecipes
  }
}