import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import QuickBuy from "./pages/QuickBuy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Home has its own Navbar/Footer for custom design */}
          <Route path="/" element={<Home />} />
          
          {/* Other routes with shared Navbar/Footer */}
          <Route path="/products" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Products />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/product/:id" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <ProductDetail />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/category/:type" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Category />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/quick-buy" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <QuickBuy />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/login" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Login />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="/signup" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Signup />
              </main>
              <Footer />
            </>
          } />
          
          <Route path="*" element={
            <>
              <Navbar />
              <main className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Page not found</p>
                  <a href="/" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors">
                    Go Home
                  </a>
                </div>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;