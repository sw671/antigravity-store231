import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductDemo from './ProductDemo'
import ProductDetails from './components/ProductDetails'
import Navbar from './components/Navbar'
import Checkout from './components/Checkout'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="w-full min-h-screen bg-gray-50 uppercase-links">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductDemo />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
