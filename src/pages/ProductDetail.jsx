import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import products from "../data/product";
import ProductCard from "../components/ui/ProductCard";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Eye,
  Award,
  Users,
  Sparkles,
  Gift,
  MessageSquare,
  X
} from "lucide-react";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [showImageModal, setShowImageModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from same category
      const related = products
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ ...product, quantity });
    }
    setAddedToCart(true);
    setNotification("Added to cart successfully!");
    setTimeout(() => {
      setAddedToCart(false);
      setNotification("");
    }, 3000);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    setNotification(isWishlisted ? "Removed from wishlist" : "Added to wishlist!");
    setTimeout(() => setNotification(""), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setNotification("Link copied to clipboard!");
      setTimeout(() => setNotification(""), 2000);
    }
  };

  // Use the same image multiple times for gallery effect
  const productImages = [product.image, product.image, product.image, product.image];

  const productFeatures = [
    { icon: Award, text: "Premium Quality", desc: "Authentic & tested" },
    { icon: Sparkles, text: "Cruelty Free", desc: "Never tested on animals" },
    { icon: Shield, text: "Dermatologist Tested", desc: "Safe for all skin types" },
    { icon: Gift, text: "Perfect Gift", desc: "Beautiful packaging included" }
  ];

  const tabs = [
    { id: "description", label: "Description", icon: MessageSquare },
    { id: "ingredients", label: "Ingredients", icon: Sparkles },
    { id: "reviews", label: "Reviews (127)", icon: Star },
    { id: "shipping", label: "Shipping", icon: Truck }
  ];

  // Generate sample reviews
  const sampleReviews = [
    {
      id: 1,
      name: "Priya M.",
      rating: 5,
      comment: "Absolutely love this product! The quality is amazing and it lasts all day. Highly recommend!",
      verified: true,
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Sneha K.",
      rating: 4,
      comment: "Great product for the price. The packaging is beautiful and the formula is smooth.",
      verified: true,
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Ria S.",
      rating: 5,
      comment: "This has become my go-to product. Perfect for daily use and the color is exactly as shown.",
      verified: true,
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 to-purple-50/30">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
          >
            <Check className="mr-2" size={18} />
            {notification}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with back button */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full transition-colors ${isWishlisted ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100'
                  }`}
              >
                <Heart className={isWishlisted ? 'fill-current' : ''} size={20} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg group">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setShowImageModal(true)}
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Eye className="text-white" size={32} />
              </div>

              {/* Best Seller Badge */}
              {product.bestSeller && (
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                      ? 'border-pink-500 ring-2 ring-pink-200'
                      : 'border-gray-200 hover:border-pink-300'
                    }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Product Title & Category */}
            <div>
              <p className="text-pink-600 font-medium mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.8) • 2,341 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-500 line-through">₹{Math.round(product.price * 1.2)}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                Save ₹{Math.round(product.price * 0.2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {productFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{feature.text}</p>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all flex items-center justify-center space-x-2 ${addedToCart
                      ? 'bg-green-500'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg transform hover:scale-105'
                    }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={20} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      <span>Add to Cart - ₹{product.price * quantity}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Truck size={20} />
                <span>Free delivery on orders above ₹999</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <RotateCcw size={20} />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Shield size={20} />
                <span>2-year warranty included</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 mb-16"
        >
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-pink-600'
                  }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose max-w-none"
              >
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  This premium product is carefully crafted with the finest ingredients to deliver exceptional results.
                  Perfect for daily use, it provides long-lasting benefits while being gentle on your skin.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Benefits:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Long-lasting formula</li>
                      <li>• Suitable for all skin types</li>
                      <li>• Easy to apply and blend</li>
                      <li>• Professional quality results</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">How to Use:</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Apply to clean, dry skin</li>
                      <li>• Blend evenly for best results</li>
                      <li>• Can be layered for intensity</li>
                      <li>• Remove with makeup remover</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "ingredients" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold mb-4">Key Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Vitamin E</h4>
                    <p className="text-sm text-gray-600">Antioxidant protection and moisturizing benefits</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Hyaluronic Acid</h4>
                    <p className="text-sm text-gray-600">Deep hydration and plumping effect</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Natural Oils</h4>
                    <p className="text-sm text-gray-600">Nourishing and conditioning properties</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Plant Extracts</h4>
                    <p className="text-sm text-gray-600">Soothing and calming benefits</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Always patch test before first use. Discontinue use if irritation occurs.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.8 out of 5</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {sampleReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{review.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            {review.verified && (
                              <>
                                <span className="flex items-center">
                                  <Check className="w-3 h-3 mr-1 text-green-500" />
                                  Verified Purchase
                                </span>
                                <span>•</span>
                              </>
                            )}
                            <span>{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-pink-600 hover:text-pink-700 font-medium">
                    View All Reviews
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "shipping" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold mb-6">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-4 flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-pink-600" />
                      Delivery Options
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Standard Delivery</p>
                          <p className="text-sm text-gray-600">3-5 business days</p>
                        </div>
                        <span className="text-green-600 font-medium">Free on ₹999+</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Express Delivery</p>
                          <p className="text-sm text-gray-600">1-2 business days</p>
                        </div>
                        <span className="font-medium">₹199</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Same Day Delivery</p>
                          <p className="text-sm text-gray-600">Available in select cities</p>
                        </div>
                        <span className="font-medium">₹299</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4 flex items-center">
                      <RotateCcw className="w-5 h-5 mr-2 text-pink-600" />
                      Return Policy
                    </h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>30-day return window from delivery date</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Free returns on all orders</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Items must be unused and in original packaging</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Refund processed within 5-7 business days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">You Might Also Like</h2>
              <Link
                to="/products"
                className="text-pink-600 hover:text-pink-700 font-medium flex items-center group"
              >
                View All
                <ArrowLeft className="ml-1 w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/product/${relatedProduct.id}`}>
                    <ProductCard
                      product={{
                        ...relatedProduct,
                        rating: 4.5 - (index * 0.1),
                        reviewCount: 1200 - (index * 100)
                      }}
                      addToCart={addToCart}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 bg-white/80 backdrop-blur-sm rounded-full p-2 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="aspect-square">
                <img
                  src={productImages[selectedImage]}
                  alt="Zoomed view"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Modal Thumbnails */}
              <div className="p-4 bg-gray-50">
                <div className="flex justify-center space-x-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                          ? 'border-pink-500'
                          : 'border-gray-200 hover:border-pink-300'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`Zoom ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
