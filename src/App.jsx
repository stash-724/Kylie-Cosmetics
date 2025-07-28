// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Cart from './components/common/Cart';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader'; // ✅ Import loader here
import Home from './pages/Home';
import Products from './pages/Products';
import QuickBuy from './pages/QuickBuy';
import About from './pages/About';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ For loader state

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) removeItem(itemId);
    else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => setCartItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {!isLoaded ? (
          <Loader onComplete={() => setIsLoaded(true)} />
        ) : (
          <>
            <Navbar cartItemCount={cartItemCount} openCart={openCart} />
            <main>
              <Routes>
                <Route path="/" element={<Home addToCart={addToCart} />} />
                <Route path="/products" element={<Products addToCart={addToCart} />} />
                <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
                <Route path="/quickbuy" element={<QuickBuy addToCart={addToCart} />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Cart
              isOpen={isCartOpen}
              onClose={closeCart}
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onClearCart={clearCart}
            />
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
