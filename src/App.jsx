import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider, DarkModeSetup } from './components/common/DarkModeProvider';
import { PageTransition } from './components/common/PageTransition';

// Import your existing pages
import Home from './pages/Home';
import Products from './pages/Products';
import QuickBuy from './pages/QuickBuy';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Import new components
import About from './pages/About';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <DarkModeProvider>
      <DarkModeSetup />
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar />
          
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/quickbuy" element={<QuickBuy />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </PageTransition>
          
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;