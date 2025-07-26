import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Sparkles } from 'lucide-react';

// Import your new components
import EnhancedHero from './EnhancedHero';
import Newsletter from './Newsletter';
import { StaggerContainer, StaggerItem, Card3D } from '../components/common/PageTransition';

const Home = () => {
  // Your existing categories data
  const categories = [
    {
      id: 1,
      name: 'FACE',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop',
      count: '25+ Products'
    },
    {
      id: 2,
      name: 'LIP',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop',
      count: '30+ Products'
    },
    {
      id: 3,
      name: 'EYES',
      image: 'https://images.unsplash.com/photo-1522335772639-b2d6d77d6a2e?w=400&h=500&fit=crop',
      count: '20+ Products'
    }
  ];

  // Your existing bestsellers data
  const bestsellers = [
    {
      id: 1,
      name: 'Matte Liquid Lipstick',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
      rating: 4.8,
      isNew: true
    },
    {
      id: 2,
      name: 'Kylie Glow Highlighter',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      rating: 4.9,
      isBestseller: true
    },
    {
      id: 3,
      name: 'Perfect Eyeshadow Palette',
      price: 2499,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1522335772639-b2d6d77d6a2e?w=300&h=300&fit=crop',
      rating: 4.7,
      isLimited: true
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <StaggerItem>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Shop by Category
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Discover your perfect look with our curated collections
                </p>
              </div>
            </StaggerItem>

            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <StaggerItem key={category.id}>
                  <Card3D>
                    <Link to={`/category/${category.name.toLowerCase()}`}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="aspect-w-4 aspect-h-5">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        <div className="absolute bottom-6 left-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                          <p className="text-white/80">{category.count}</p>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="absolute bottom-6 right-6"
                        >
                          <ArrowRight className="w-6 h-6 text-white" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </Card3D>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <StaggerItem>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Bestsellers
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Our most loved products that everyone's talking about
                </p>
              </div>
            </StaggerItem>

            <div className="grid md:grid-cols-3 gap-8">
              {bestsellers.map((product, index) => (
                <StaggerItem key={product.id}>
                  <Card3D>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative"
                    >
                      {/* Product Badges */}
                      <div className="absolute top-4 left-4 z-10 space-y-2">
                        {product.isNew && (
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                            NEW
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            BESTSELLER
                          </span>
                        )}
                        {product.isLimited && (
                          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                            LIMITED
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </motion.button>

                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({product.rating})
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ₹{product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice}
                              </span>
                            )}
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all"
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </Card3D>
                </StaggerItem>
              ))}
            </div>

            <StaggerItem>
              <div className="text-center mt-12">
                <Link to="/quickbuy">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
                  >
                    View All Bestsellers
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter variant="default" />

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Cruelty-Free",
                  description: "100% cruelty-free and vegan formulas"
                },
                {
                  icon: <Heart className="w-8 h-8" />,
                  title: "Premium Quality",
                  description: "High-performance ingredients for lasting beauty"
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "Award Winning",
                  description: "Recognized by beauty experts worldwide"
                }
              ].map((feature, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="text-center p-8 bg-gray-800 rounded-2xl"
                  >
                    <div className="inline-flex p-4 bg-pink-600 rounded-full mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
};

export default Home;