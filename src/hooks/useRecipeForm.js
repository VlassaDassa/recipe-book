import { useState } from 'react'

const INITIAL_FORM_DATA = {
  title: '',
  category: 'Завтрак',
  time: '',
  difficulty: 'Легко',
  servings: '',
  calories: '',
  ingredients: [{ name: '', amount: '', unit: 'гр' }],
  steps: [''],
  image: ''
}

export function useRecipeForm() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)

  // Открыть форму для добавления
  const openAddForm = () => {
    setEditingId(null)
    setFormData(INITIAL_FORM_DATA)
    setIsFormOpen(true)
  }

  // Открыть форму для редактирования
  const openEditForm = (recipe) => {
    setEditingId(recipe.id)
    setFormData({
      title: recipe.title || '',
      category: recipe.category || 'Завтрак',
      time: recipe.time || '',
      difficulty: recipe.difficulty || 'Легко',
      servings: recipe.servings || '',
      calories: recipe.calories || '',
      ingredients: recipe.ingredients?.length ? recipe.ingredients : [{ name: '', amount: '', unit: 'гр' }],
      steps: recipe.steps?.length ? recipe.steps : [''],
      image: recipe.image || ''
    })
    setIsFormOpen(true)
  }

  // Закрыть форму и сбросить данные
  const closeForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setFormData(INITIAL_FORM_DATA)
  }

  // Подготовить данные для сохранения (отфильтровать пустые поля)
  const getPreparedFormData = () => {
    return {
      title: formData.title.trim(),
      category: formData.category,
      time: Number(formData.time) || 0,
      difficulty: formData.difficulty,
      servings: Number(formData.servings) || 0,
      calories: Number(formData.calories) || 0,
      ingredients: formData.ingredients.filter(ing => ing.name.trim() !== ''),
      steps: formData.steps.filter(step => step.trim() !== ''),
      image: formData.image.trim()
    }
  }

  return {
    isFormOpen,
    editingId,
    formData,
    setFormData,
    openAddForm,
    openEditForm,
    closeForm,
    getPreparedFormData
  }
}