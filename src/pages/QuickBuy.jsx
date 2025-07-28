// src/pages/QuickBuy.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // ✅ added for product detail routing
import ProductCard from '../components/ui/ProductCard';
import { Star, TrendingUp, Award } from 'lucide-react';
import productsData from '../data/product';

const QuickBuy = ({ addToCart }) => {
  const [bestSellers, setBestSellers] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const actualBestSellers = productsData.filter(product => product.bestSeller);
    const displayBestSellers = actualBestSellers.length >= 4
      ? actualBestSellers.slice(0, 4)
      : productsData.slice(0, 4);

    const enhancedBestSellers = displayBestSellers.map((product, index) => ({
      ...product,
      rating: 4.8 - (index * 0.1),
      reviewCount: 2341 - (index * 200),
      originalPrice: index % 2 === 0 ? product.price * 1.2 : undefined,
      // badge: index === 0 ? 'Best Seller' : index === 1 ? 'Trending' : index === 2 ? 'Fan Favorite' : 'Popular'
    }));

    const remainingProducts = productsData.filter(p => !actualBestSellers.includes(p)).slice(0, 2);
    const enhancedFeatured = remainingProducts.map((product, index) => ({
      ...product,
      rating: 4.4 - (index * 0.1),
      reviewCount: 889 - (index * 200),
      originalPrice: index % 2 === 0 ? product.price * 1.15 : undefined,
      badge: index === 0 ? 'New' : 'Limited Edition'
    }));

    setBestSellers(enhancedBestSellers);
    setFeaturedProducts(enhancedFeatured);
  }, []);

  const handleQuickAdd = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold text-gray-900">Best Sellers</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shop our most popular products loved by millions. These fan favorites are flying off the shelves!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[{
            icon: <Star className="w-6 h-6 text-pink-500" />,
            value: '4.7/5',
            label: 'Average Rating',
            bg: 'bg-pink-100'
          }, {
            icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
            value: '50K+',
            label: 'Happy Customers',
            bg: 'bg-purple-100'
          }, {
            icon: <Award className="w-6 h-6 text-green-500" />,
            value: '98%',
            label: 'Would Recommend',
            bg: 'bg-green-100'
          }].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Best Sellers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-1 h-8 bg-pink-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Top Picks</h2>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="relative">
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-10 bg-pink-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                      {product.badge}
                    </div>
                  )}
                  <Link to={`/product/${product.id}`}>
                    <ProductCard product={product} addToCart={handleQuickAdd} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
              <h2 className="text-3xl font-bold text-gray-900">Featured This Week</h2>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="relative">
                    {product.badge && (
                      <div className="absolute top-2 left-2 z-10 bg-purple-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                        {product.badge}
                      </div>
                    )}
                    <Link to={`/product/${product.id}`}>
                      <ProductCard product={product} addToCart={handleQuickAdd} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Buy Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Why Shop Best Sellers?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Star className="w-6 h-6 text-white" />, title: 'Tried & Tested', desc: 'Thousands of 5-star reviews from real customers' },
              { icon: <TrendingUp className="w-6 h-6 text-white" />, title: 'Trending Now', desc: 'What everyone is talking about on social media' },
              { icon: <Award className="w-6 h-6 text-white" />, title: 'Award Winners', desc: 'Featured in top beauty magazines worldwide' },
            ].map((item, i) => (
              <div key={i}>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickBuy;
