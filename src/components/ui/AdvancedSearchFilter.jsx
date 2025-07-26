import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, X, ChevronDown, Star, 
  Palette, DollarSign, Tag, Grid, List,
  SlidersHorizontal, Heart, ShoppingCart
} from 'lucide-react';

const AdvancedSearchFilter = ({ products, onFilteredProducts, className = "" }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 5000],
    colors: [],
    ratings: 0,
    tags: [],
    inStock: false,
    onSale: false
  });
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Available filter options
  const filterOptions = {
    categories: ['FACE', 'LIP', 'EYES', 'SKINCARE', 'TOOLS'],
    colors: [
      { name: 'Red', value: '#ef4444', count: 15 },
      { name: 'Pink', value: '#ec4899', count: 22 },
      { name: 'Purple', value: '#8b5cf6', count: 18 },
      { name: 'Orange', value: '#f97316', count: 12 },
      { name: 'Brown', value: '#a3a3a3', count: 20 },
      { name: 'Black', value: '#000000', count: 8 },
      { name: 'Nude', value: '#d4b5a0', count: 25 }
    ],
    tags: ['Vegan', 'Cruelty-Free', 'Organic', 'Long-lasting', 'Waterproof', 'Matte', 'Glossy'],
    sortOptions: [
      { value: 'popular', label: 'Most Popular' },
      { value: 'newest', label: 'Newest First' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'name', label: 'Alphabetical' }
    ]
  };

  // Search and filter logic
  const filteredProducts = useMemo(() => {
    setIsSearching(true);
    
    let filtered = products.filter(product => {
      // Text search
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = filters.category.length === 0 || 
        filters.category.includes(product.category);

      // Price filter
      const matchesPrice = product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];

      // Rating filter
      const matchesRating = filters.ratings === 0 || 
        (product.rating >= filters.ratings);

      // Stock filter
      const matchesStock = !filters.inStock || product.inStock;

      // Sale filter
      const matchesSale = !filters.onSale || product.onSale;

      return matchesSearch && matchesCategory && matchesPrice && 
             matchesRating && matchesStock && matchesSale;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
        case 'name':
          return a.name.localeCompare(b.name);
        default: // popular
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    setTimeout(() => setIsSearching(false), 300);
    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  useEffect(() => {
    onFilteredProducts(filteredProducts);
  }, [filteredProducts, onFilteredProducts]);

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 5000],
      colors: [],
      ratings: 0,
      tags: [],
      inStock: false,
      onSale: false
    });
    setSearchQuery('');
  };

  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, colors, categories..."
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-full focus:border-pink-500 focus:outline-none transition-all text-lg"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 z-50 overflow-hidden"
            >
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Quick Suggestions
                </h4>
                <div className="space-y-1">
                  {['Lipstick', 'Foundation', 'Eyeshadow', 'Mascara'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
              showFilters 
                ? 'bg-pink-500 text-white border-pink-500' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-pink-500'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          {/* Active Filters Count */}
          {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f) && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm"
            >
              <span>Active filters</span>
              <button
                onClick={clearFilters}
                className="p-1 hover:bg-pink-200 dark:hover:bg-pink-800 rounded-full transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 pr-10 focus:border-pink-500 focus:outline-none cursor-pointer"
            >
              {filterOptions.sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border-2 border-gray-200 dark:border-gray-600 rounded-full overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-pink-500 text-white' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list' 
                  ? 'bg-pink-500 text-white' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-600 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.categories.map(category => (
                    <motion.button
                      key={category}
                      onClick={() => toggleFilter('category', category)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        filters.category.includes(category)
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-pink-500'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                </h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>₹0</span>
                    <span>₹5000</span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Colors
                </h4>
                <div className="flex flex-wrap gap-3">
                  {filterOptions.colors.map(color => (
                    <motion.button
                      key={color.name}
                      onClick={() => toggleFilter('colors', color.name)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative w-10 h-10 rounded-full border-4 transition-all ${
                        filters.colors.includes(color.name)
                          ? 'border-pink-500 scale-110'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={`${color.name} (${color.count} products)`}
                    >
                      {filters.colors.includes(color.name) && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Minimum Rating
                </h4>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map(rating => (
                    <motion.button
                      key={rating}
                      onClick={() => setFilters(prev => ({ ...prev, ratings: rating }))}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1 px-3 py-2 rounded-full border-2 transition-all ${
                        filters.ratings === rating
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                      }`}
                    >
                      {rating === 0 ? 'All' : (
                        <>
                          <Star className="w-4 h-4 fill-current" />
                          <span>{rating}+</span>
                        </>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Quick Filters
                </h4>
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    onClick={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      filters.inStock
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    In Stock Only
                  </motion.button>
                  <motion.button
                    onClick={() => setFilters(prev => ({ ...prev, onSale: !prev.onSale }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      filters.onSale
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    On Sale
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          {isSearching ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
              <span>Searching...</span>
            </div>
          ) : (
            <span>
              Showing {filteredProducts.length} of {products.length} products
            </span>
          )}
        </div>
        
        {filteredProducts.length === 0 && !isSearching && (
          <motion.button
            onClick={clearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-pink-600 hover:text-pink-700 font-medium"
          >
            Clear all filters
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearchFilter;