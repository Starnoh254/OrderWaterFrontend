import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Order from './pages/Order'
import Orders from './pages/Orders'

function App() {
  return (
    <div>
      <header className="p-4 bg-white shadow-sm">
        <nav className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/" className="text-primary font-medium">
            New Order
          </Link>
          <Link to="/orders" className="text-primary/80">
            All Orders
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
