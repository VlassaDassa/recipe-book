// Экспорт рецептов в JSON-файл
export const exportRecipes = (recipes) => {
  const dataStr = JSON.stringify(recipes, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
  const fileName = `recipes_${new Date().toISOString().slice(0, 10)}.json`
  
  const link = document.createElement('a')
  link.setAttribute('href', dataUri)
  link.setAttribute('download', fileName)
  link.click()
}

// Импорт рецептов из JSON-файла
export const importRecipesFromFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Файл не выбран'))
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result)
        if (Array.isArray(imported)) {
          resolve(imported)
        } else {
          reject(new Error('Файл должен содержать массив рецептов'))
        }
      } catch (error) {
        reject(new Error('Ошибка чтения файла. Убедитесь, что это JSON'))
      }
    }
    reader.readAsText(file)
  })
}