import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import ProductCard from "../components/ui/ProductCard";
import products from "../data/product";
import { ArrowRight, Star, Sparkles, Heart } from "lucide-react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const bestSellers = products.filter(product => product.bestSeller);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Sparkles className="text-pink-500 mr-2" size={24} />
                <span className="text-pink-600 font-medium">New Collection</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Unleash Your
                <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Inner Glow
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Discover premium cosmetics that enhance your natural beauty. From bold statement lips to radiant skin, find your perfect look.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                
                <Link
                  to="/quick-buy"
                  className="border-2 border-pink-500 text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Quick Buy
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-8 transform rotate-3 hover:rotate-6 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 transform -rotate-6 hover:-rotate-3 transition-transform duration-500">
                  <div className="text-center">
                    <div className="text-6xl mb-4">💄</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium Quality</h3>
                    <p className="text-gray-600">Cruelty-free & long-lasting formulas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 opacity-20">
          <Heart className="text-pink-400" size={40} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Star className="text-purple-400" size={32} />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections designed to enhance every feature
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Face", path: "/category/FACE", emoji: "✨", desc: "Glow & Radiance" },
              { name: "Lips", path: "/category/LIP", emoji: "💋", desc: "Bold & Beautiful" },
              { name: "Eyes", path: "/category/EYES", emoji: "👁️", desc: "Define & Dramatic" }
            ].map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="group bg-white rounded-2xl p-8 text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.desc}</p>
                <div className="text-pink-600 font-medium group-hover:text-pink-700">
                  Explore Collection →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="text-yellow-500 mr-2" size={24} />
              <span className="text-yellow-600 font-medium">Customer Favorites</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Best Sellers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most loved products that customers can't get enough of
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product) => (
              <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of beauty lovers who trust Kylie Cosmetics for their daily glow
          </p>
          <Link
            to="/quick-buy"
            className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-flex items-center"
          >
            Start Shopping
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;