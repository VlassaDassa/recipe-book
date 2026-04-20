import { useState, useEffect } from 'react'

export function useFormValidation(formData, editingId) {
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // 1. Название: от 2 до 40 символов
    const title = formData.title?.trim() || ''
    if (!title) {
      newErrors.title = 'Название обязательно'
    } else if (title.length < 2) {
      newErrors.title = 'Название должно быть не менее 2 символов'
    } else if (title.length > 40) {
      newErrors.title = 'Название должно быть не более 40 символов'
    }

    // 2. Время приготовления > 0
    const time = Number(formData.time)
    if (!formData.time || time <= 0) {
      newErrors.time = 'Время должно быть больше 0'
    }

    // 3. Количество порций > 0 (если указано)
    if (formData.servings) {
      const servings = Number(formData.servings)
      if (servings <= 0) {
        newErrors.servings = 'Количество порций должно быть больше 0'
      }
    }

    // 4. Калории > 0 (если указано)
    if (formData.calories) {
      const calories = Number(formData.calories)
      if (calories <= 0) {
        newErrors.calories = 'Калории должны быть больше 0'
      }
    }

    // 5. Ссылка на фото обязательна
    const image = formData.image?.trim() || ''
    if (!image) {
      newErrors.image = 'Ссылка на фото обязательна'
    } else if (!isValidUrl(image)) {
      newErrors.image = 'Введите корректную ссылку (https://...)'
    }

       // 6. Минимум 3 ингредиента с непустыми названиями и корректным количеством
    const ingredients = formData.ingredients || []
    const validIngredients = ingredients.filter(ing => ing.name?.trim() !== '')
    
    if (validIngredients.length < 3) {
      newErrors.ingredients = `Добавьте минимум 3 ингредиента (сейчас ${validIngredients.length})`
    } else {
      // Проверяем каждый ингредиент на корректное количество
      let hasIngredientError = false
      for (let i = 0; i < validIngredients.length; i++) {
        const ing = validIngredients[i]
        
        // Если единица измерения "по вкусу" — количество не требуется
        if (ing.unit === 'по вкусу') {
          continue
        }
        
        const amount = Number(ing.amount)
        if (!ing.amount || isNaN(amount) || amount <= 0) {
          hasIngredientError = true
          break
        }
      }
      if (hasIngredientError) {
        newErrors.ingredients = 'Укажите количество для каждого ингредиента (число > 0)'
      }
    }
    // 7. Минимум 3 шага приготовления
    const steps = formData.steps || []
    const validSteps = steps.filter(step => step?.trim() !== '')
    if (validSteps.length < 3) {
      newErrors.steps = `Добавьте минимум 3 шага (сейчас ${validSteps.length})`
    }

    setErrors(newErrors)
    setIsValid(Object.keys(newErrors).length === 0)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url) => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
    }
  }

  useEffect(() => {
    validateForm()
  }, [formData])

  const resetErrors = () => {
    setErrors({})
    setIsValid(false)
  }

  return {
    errors,
    isValid,
    validateForm,
    resetErrors
  }
}