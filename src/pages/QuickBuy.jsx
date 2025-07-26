// src/pages/QuickBuy.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import { Star, TrendingUp, Award } from 'lucide-react';

const QuickBuy = ({ addToCart }) => {
  const [bestSellers, setBestSellers] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Sample best sellers data - replace with your actual data source
  useEffect(() => {
    const sampleBestSellers = [
      {
        id: 1,
        name: 'Kylie Lip Kit - Candy K',
        category: 'Lips',
        price: 29.00,
        originalPrice: 35.00,
        image: '/api/placeholder/300/300',
        rating: 4.8,
        reviewCount: 2341,
        description: 'Our #1 bestselling lip kit with matte liquid lipstick and matching liner.',
        badge: 'Best Seller'
      },
      {
        id: 2,
        name: 'Kylie Cosmetics Eyeshadow Palette - Bronze',
        category: 'Eyes',
        price: 42.00,
        image: '/api/placeholder/300/300',
        rating: 4.7,
        reviewCount: 1892,
        description: 'Warm bronze tones perfect for any look.',
        badge: 'Trending'
      },
      {
        id: 3,
        name: 'Kylie Skin Face Wash',
        category: 'Skincare',
        price: 24.00,
        image: '/api/placeholder/300/300',
        rating: 4.6,
        reviewCount: 1567,
        description: 'Gentle daily cleanser for all skin types.',
        badge: 'Fan Favorite'
      },
      {
        id: 4,
        name: 'Kylie Glossy Lip Gloss - Like',
        category: 'Lips',
        price: 15.00,
        image: '/api/placeholder/300/300',
        rating: 4.5,
        reviewCount: 1234,
        description: 'High-shine gloss with moisturizing formula.',
        badge: 'Best Seller'
      }
    ];

    const sampleFeaturedProducts = [
      {
        id: 5,
        name: 'Kylie Skin Vitamin C Serum',
        category: 'Skincare',
        price: 28.00,
        image: '/api/placeholder/300/300',
        rating: 4.4,
        reviewCount: 889,
        description: 'Brightening serum with 10% Vitamin C.',
        badge: 'New'
      },
      {
        id: 6,
        name: 'Kylie Pressed Powder Blush',
        category: 'Face',
        price: 18.00,
        originalPrice: 22.00,
        image: '/api/placeholder/300/300',
        rating: 4.3,
        reviewCount: 667,
        description: 'Silky smooth powder blush for natural color.',
        badge: 'Limited Edition'
      }
    ];

    setBestSellers(sampleBestSellers);
    setFeaturedProducts(sampleFeaturedProducts);
  }, []);

  const handleQuickAdd = (product) => {
    addToCart(product);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              Best Sellers
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shop our most popular products loved by millions. These fan favorites are flying off the shelves!
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">4.7/5</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">50K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">98%</h3>
            <p className="text-gray-600">Would Recommend</p>
          </div>
        </motion.div>

        {/* Best Sellers Section */}
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
                <ProductCard
                  product={product}
                  addToCart={handleQuickAdd}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Products Section */}
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
                <ProductCard
                  product={product}
                  addToCart={handleQuickAdd}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Buy Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Why Shop Best Sellers?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Tried & Tested</h4>
              <p className="text-sm opacity-90">Thousands of 5-star reviews from real customers</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Trending Now</h4>
              <p className="text-sm opacity-90">What everyone is talking about on social media</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Award Winners</h4>
              <p className="text-sm opacity-90">Featured in top beauty magazines worldwide</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickBuy;