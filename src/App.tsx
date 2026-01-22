import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDemo from './ProductDemo'
import ProductDetails from './components/ProductDetails'
import Navbar from './components/Navbar'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Orders from './components/Orders'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="w-full min-h-screen bg-gray-50 uppercase-links">
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductDemo />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
