import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/product";
import ProductCard from "../components/ui/ProductCard";
import { Filter, Grid, List, Search, Star } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("ALL");
  const [viewMode, setViewMode] = useState("grid");

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterBy === "ALL" || product.category === filterBy;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "bestseller":
        return b.bestSeller - a.bestSeller;
      default:
        return 0;
    }
  });

  const categories = ["ALL", "FACE", "LIP", "EYES"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Products
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover our complete collection of premium beauty products
          </p>
          <div className="mt-6">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {products.length} Products Available
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "ALL" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestseller">Best Sellers First</option>
              </select>

              <div className="flex items-center bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-pink-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-pink-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Quick Links */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterBy(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterBy === category
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-200"
              }`}
            >
              {category === "ALL" ? "All Products" : category}
              <span className="ml-2 text-xs opacity-75">
                ({category === "ALL" ? products.length : products.filter(p => p.category === category).length})
              </span>
            </button>
          ))}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            {searchTerm && (
              <span>Search results for "{searchTerm}" • </span>
            )}
            Showing {sortedProducts.length} of {products.length} products
          </div>
          
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-pink-600 hover:text-pink-700 text-sm font-medium"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Products Grid/List */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterBy("ALL");
              }}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
            }
          >
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={
                  viewMode === "grid"
                    ? "transform hover:scale-105 transition-all duration-300"
                    : "bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                }
              >
                {viewMode === "grid" ? (
                  <ProductCard product={product} />
                ) : (
                  // List View Layout
                  <div className="flex items-center p-6 space-x-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {product.name}
                        </h3>
                        {product.bestSeller && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                            <Star size={10} className="mr-1" />
                            Bestseller
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.category}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-pink-600">
                          ₹{product.price}
                        </span>
                        <div className="flex items-center space-x-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500">(4.0)</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Showing all {sortedProducts.length} products
            </p>
            <Link
              to="/quick-buy"
              className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              View Quick Buy Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;