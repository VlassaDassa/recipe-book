export const DEMO_RECIPES = [
  {
    id: 1,
    title: 'Борщ украинский',
    category: 'Суп',
    time: 90,
    difficulty: 'Сложно',
    servings: 6,
    calories: 350,
    ingredients: [
      { name: 'Свекла', amount: '2', unit: 'шт' },
      { name: 'Капуста', amount: '300', unit: 'гр' },
      { name: 'Картофель', amount: '3', unit: 'шт' }
    ],
    steps: [
      'Сварить бульон',
      'Нарезать овощи',
      'Добавить свеклу',
      'Варить до готовности'
    ],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80'
  },
  {
    id: 2,
    title: 'Омлет с сыром',
    category: 'Завтрак',
    time: 10,
    difficulty: 'Легко',
    servings: 1,
    calories: 280,
    ingredients: [
      { name: 'Яйца', amount: '3', unit: 'шт' },
      { name: 'Сыр', amount: '50', unit: 'гр' }
    ],
    steps: [
      'Взбить яйца',
      'Пожарить на сковороде',
      'Посыпать сыром'
    ],
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&q=80'
  }
]