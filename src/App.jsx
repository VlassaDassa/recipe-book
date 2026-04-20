import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import RecipeDetail from './components/RecipeDetail/RecipeDetail'
import { ToastContainer } from './components/Toast'

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App