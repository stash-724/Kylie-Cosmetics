import { useState } from "react";
import { 
  Star, 
  ShoppingBag, 
  Plus, 
  Minus, 
  X, 
  Zap,
  Heart,
  CheckCircle
} from "lucide-react";

// Mock products data since we don't have access to the external file
const mockProducts = [
  {
    id: "1",
    name: "Kylie Lip Kit - Candy K",
    price: 299,
    category: "Lips",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    description: "Long-lasting liquid lipstick with matching lip liner for the perfect pout.",
    bestSeller: true
  },
  {
    id: "2", 
    name: "Kylie Skin Face Wash",
    price: 199,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    description: "Gentle foaming cleanser that removes makeup and impurities without stripping skin.",
    bestSeller: true
  },
  {
    id: "3",
    name: "Kylie Cosmetics Blush",
    price: 249,
    category: "Face",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    description: "Buildable powder blush that gives you a natural, healthy-looking flush.",
    bestSeller: true
  },
  {
    id: "4",
    name: "Kylie Eye Palette",
    price: 399,
    category: "Eyes", 
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    description: "12 versatile shades ranging from everyday neutrals to bold statement colors.",
    bestSeller: true
  }
];

const QuickBuy = () => {
  const [cart, setCart] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Get only bestseller products
  const bestSellers = mockProducts.filter(product => product.bestSeller);

  const updateQuantity = (productId, change) => {
    setCart(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + change);
      
      if (newQty === 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [productId]: newQty };
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, qty]) => {
      const product = bestSellers.find(p => p.id === productId);
      return total + (product ? product.price * qty : 0);
    }, 0);
  };

  const handleCheckout = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCart({});
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center">
          <CheckCircle size={20} className="mr-2" />
          Order placed successfully!
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <div className="flex items-center justify-center mb-4">
            <Zap className="mr-2" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold">Quick Buy</h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Our bestselling products, ready for instant purchase. No browsing, just the favorites everyone loves.
          </p>
          <div className="mt-6">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              ⚡ {bestSellers.length} Bestsellers Available
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Bestselling Products
              </h2>
              <button className="text-pink-600 hover:text-pink-700 font-medium bg-transparent border-none cursor-pointer">
                View All Products →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bestSellers.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border"
                >
                  {/* Product Image */}
                  <div className="relative mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart size={16} className="text-gray-600" />
                    </button>
                    <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                      Bestseller
                    </span>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-gray-500 font-medium">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">
                        {product.name}
                      </h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-pink-600">
                        ₹{product.price}
                      </span>
                      
                      {cart[product.id] ? (
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(product.id, -1)}
                              className="p-1.5 hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-medium">
                              {cart[product.id]}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, 1)}
                              className="p-1.5 hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center text-sm font-medium"
                        >
                          <Plus size={16} className="mr-1" />
                          Add
                        </button>
                      )}
                    </div>

                    {/* Quick View Link */}
                    <button className="text-sm text-gray-500 hover:text-pink-600 transition-colors bg-transparent border-none cursor-pointer">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Quick Cart</h3>
                  <div className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">
                    {getTotalItems()} items
                  </div>
                </div>

                {Object.keys(cart).length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add products to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Cart Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {Object.entries(cart).map(([productId, quantity]) => {
                        const product = bestSellers.find(p => p.id === productId);
                        if (!product) return null;

                        return (
                          <div key={productId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-grow">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {product.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                ₹{product.price} × {quantity}
                              </p>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => updateQuantity(productId, -1)}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(productId, 1)}
                                className="p-1 hover:bg-gray-200 rounded"
                              >
                                <Plus size={12} />
                              </button>
                              <button
                                onClick={() => updateQuantity(productId, -quantity)}
                                className="p-1 hover:bg-red-100 text-red-500 rounded ml-2"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-green-600">
                          {getTotalPrice() > 999 ? 'Free' : '₹50'}
                        </span>
                      </div>
                      {getTotalPrice() <= 999 && (
                        <div className="text-xs text-gray-500 bg-green-50 p-2 rounded">
                          💡 Add ₹{999 - getTotalPrice()} more for free shipping!
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold pt-2 border-t">
                        <span>Total</span>
                        <span className="text-pink-600">
                          ₹{(getTotalPrice() + (getTotalPrice() > 999 ? 0 : 50)).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <Zap size={20} className="mr-2" />
                      Quick Checkout
                    </button>

                    {/* Security Note */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        🔒 Secure checkout • 30-day returns
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Info Cards */}
              <div className="mt-6 space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center">
                    <div className="text-green-600 mr-3">🚚</div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Free Shipping</p>
                      <p className="text-xs text-green-600">On orders over ₹999</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center">
                    <div className="text-blue-600 mr-3">⚡</div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Quick Delivery</p>
                      <p className="text-xs text-blue-600">2-3 business days</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center">
                    <div className="text-purple-600 mr-3">💎</div>
                    <div>
                      <p className="text-sm font-medium text-purple-800">Premium Quality</p>
                      <p className="text-xs text-purple-600">100% authentic products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Quick Buy Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Quick Buy?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Skip the browsing and get straight to our customer favorites. These bestsellers are loved by thousands!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-600">
                No need to browse hundreds of products. Just our proven bestsellers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Approved</h3>
              <p className="text-sm text-gray-600">
                Every product here is a bestseller with thousands of happy customers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect for Gifts</h3>
              <p className="text-sm text-gray-600">
                Not sure what to choose? These crowd favorites make perfect gifts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBuy;