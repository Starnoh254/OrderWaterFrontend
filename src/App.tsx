import './App.css'
import { Routes, Route } from 'react-router-dom'
import Order from './pages/Order'


function App() {
  return (
    <Routes>
      <Route path="/order" element={<Order />} />
    </Routes>
  )
}

export default App
