import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductCard";
import products from "../data/product";
import { ArrowLeft, Filter, Grid, List } from "lucide-react";

const Category = () => {
  const { type } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  // Filter products by category
  useEffect(() => {
    const filtered = products.filter(product => product.category === type);
    setFilteredProducts(filtered);
  }, [type]);

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

  // Category info
  const getCategoryInfo = () => {
    switch (type) {
      case "FACE":
        return {
          name: "Face Products",
          description: "Enhance your natural glow with our premium face collection",
          emoji: "✨",
          gradient: "from-orange-400 to-pink-600"
        };
      case "LIP":
        return {
          name: "Lip Products", 
          description: "Bold, beautiful lips that make a statement",
          emoji: "💋",
          gradient: "from-pink-500 to-red-600"
        };
      case "EYES":
        return {
          name: "Eye Products",
          description: "Define and dramatize with our eye collection",
          emoji: "👁️",
          gradient: "from-purple-500 to-indigo-600"
        };
      default:
        return {
          name: "Products",
          description: "Discover our collection",
          emoji: "💄",
          gradient: "from-pink-500 to-purple-600"
        };
    }
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-pink-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{categoryInfo.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-br ${categoryInfo.gradient} py-16 px-4`}>
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {categoryInfo.description}
          </p>
          <div className="mt-6">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {filteredProducts.length} Products Available
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Back Button */}
          <Link
            to="/products"
            className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            All Products
          </Link>

          {/* Sort & View Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bestseller">Best Sellers First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-8">
              We couldn't find any products in this category.
            </p>
            <Link
              to="/products"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Browse All Products
            </Link>
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.category}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-pink-600">
                          ₹{product.price}
                        </span>
                        {product.bestSeller && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Bestseller
                          </span>
                        )}
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
      </div>
    </div>
  );
};

export default Category;