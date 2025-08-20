import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Order from './pages/Order'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold text-primary">Welcome</h1>
      <Link to="/order" className="text-primary underline">
        Place an order
      </Link>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Order />} />
    </Routes>
  )
}

export default App
