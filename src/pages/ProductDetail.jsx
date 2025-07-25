import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
  RotateCcw 
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from same category
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(prev => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} x ${product.name} to cart`);
    // Show success message or update cart state
  };

  // Mock additional images (in real app, these would come from product data)
  const productImages = [
    product.image,
    product.image, // Placeholder for different angles
    product.image  // Placeholder for different angles
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-pink-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link to="/products" className="text-gray-500 hover:text-pink-600 transition-colors">
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <Link 
              to={`/category/${product.category}`} 
              className="text-gray-500 hover:text-pink-600 transition-colors"
            >
              {product.category}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-pink-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full transition-colors ${
                      isWishlisted 
                        ? 'text-red-500 bg-red-50' 
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) • 127 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-pink-600">
                  ₹{product.price}
                </span>
                {product.bestSeller && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-medium">
                    Bestseller
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                <ShoppingBag size={20} className="mr-2" />
                Add to Cart • ₹{(product.price * quantity).toLocaleString()}
              </button>
              
              <Link
                to="/quick-buy"
                className="w-full border-2 border-pink-500 text-pink-600 py-4 rounded-xl font-semibold hover:bg-pink-500 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                Buy Now
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="text-green-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over ₹999</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Authentic</p>
                  <p className="text-xs text-gray-500">100% genuine products</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <RotateCcw className="text-orange-500" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                You Might Also Like
              </h2>
              <p className="text-gray-600">
                More products from the {product.category.toLowerCase()} collection
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;