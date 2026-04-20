const API_URL = 'http://localhost:5000/api'

// Базовый fetch с токеном
async function apiClient(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  if (token) {
    headers['x-auth-token'] = token
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.error || 'Что-то пошло не так')
  }
  
  return data
}

// АВТОРИЗАЦИЯ
export const authAPI = {
  // Регистрация
  register: (username, password) => 
    apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
  
  // Вход
  login: (username, password) => 
    apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
}

// РЕЦЕПТЫ
export const recipesAPI = {
  // Получить все свои рецепты
  getAll: () => 
    apiClient('/recipes'),
  
  // Добавить рецепт
  create: (recipe) => 
    apiClient('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe)
    }),
  
  // Обновить рецепт
  update: (id, recipe) => 
    apiClient(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipe)
    }),
  
  // Удалить рецепт
  delete: (id) => 
    apiClient(`/recipes/${id}`, {
      method: 'DELETE'
    })
}

export default apiClient