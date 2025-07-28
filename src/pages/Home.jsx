import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { ArrowRight, Star, Heart, Sparkles, ShoppingBag } from 'lucide-react';

const Home = ({ addToCart }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Sample featured products for homepage
  useEffect(() => {
    const sampleFeatured = [
      {
        id: 1,
        name: 'Kylie Lip Kit - Candy K',
        category: 'Lips',
        price: 29.00,
        originalPrice: 35.00,
        image: '/images/matte_lip_kit_bare_prod.webp',
        rating: 4.8,
        reviewCount: 2341,
        description: 'Our signature matte liquid lipstick with lip liner.'
      },
      {
        id: 2,
        name: 'Kylie Cosmetics Eyeshadow Palette',
        category: 'Eyes',
        price: 42.00,
        image: '/images/eyeshadow-palette.jpg',
        rating: 4.7,
        reviewCount: 1892,
        description: '18 highly pigmented eyeshadow shades for any look.'
      },
      {
        id: 3,
        name: 'Kylie Skin Face Moisturizer',
        category: 'Skincare',
        price: 24.00,
        image: '/images/face-moisturizer.jpg',
        rating: 4.6,
        reviewCount: 1567,
        description: 'Hydrating daily moisturizer for all skin types.'
      }
    ];

    setFeaturedProducts(sampleFeatured);
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start space-x-2 mb-6"
              >
                <Sparkles className="w-6 h-6 text-pink-500" />
                <span className="text-pink-600 font-semibold">New Collection</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Beauty
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Redefined
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Discover premium cosmetics and skincare products designed to enhance your natural beauty and boost your confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-colors group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/quickbuy"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white font-semibold rounded-xl transition-colors"
                >
                  Best Sellers
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-pink-200 to-purple-300 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
                  <img className='object-cover w-full h-full' src="/images/desktop.webp" alt="Hero" />
                </div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-lg font-semibold mb-2">Featured Collection</p>
                  <p className="text-sm opacity-90">Discover our latest makeup essentials</p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Kylie Cosmetics?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to creating high-quality, cruelty-free products that celebrate your unique beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Premium Quality',
                description: 'High-performance formulas with carefully selected ingredients for exceptional results.',
                color: 'pink'
              },
              {
                icon: Heart,
                title: 'Cruelty-Free',
                description: 'All our products are cruelty-free and developed with love for animals and the environment.',
                color: 'purple'
              },
              {
                icon: Star,
                title: 'Trending Shades',
                description: 'Stay ahead of beauty trends with our curated collection of on-trend colors and finishes.',
                color: 'pink'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-6 bg-${feature.color}-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-500`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular products loved by beauty enthusiasts worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  addToCart={addToCart}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-colors group"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Look?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions of beauty lovers who trust Kylie Cosmetics for their daily beauty routine.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 hover:bg-gray-100 font-semibold rounded-xl transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                to="/quickbuy"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-pink-600 font-semibold rounded-xl transition-colors"
              >
                Shop Best Sellers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
