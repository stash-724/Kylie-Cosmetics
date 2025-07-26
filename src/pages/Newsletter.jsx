import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Gift, Sparkles, Check, X } from 'lucide-react';

const Newsletter = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 2000);
  };

  // Default Newsletter Section
  if (variant === 'default') {
    return (
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex p-4 bg-pink-100 rounded-full mb-6">
              <Mail className="w-8 h-8 text-pink-600" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay in the Loop
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be the first to know about new launches, exclusive offers, and beauty tips straight from our experts.
            </p>

            <div className="flex flex-wrap gap-6 justify-center mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-white rounded-full shadow-md">
                  <Gift className="w-5 h-5 text-pink-600" />
                </div>
                <span className="font-medium">Exclusive Offers</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-white rounded-full shadow-md">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <span className="font-medium">Beauty Tips</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-white rounded-full shadow-md">
                  <Mail className="w-5 h-5 text-pink-600" />
                </div>
                <span className="font-medium">New Launches</span>
              </div>
            </div>

            {!isSubscribed ? (
              <motion.form 
                onSubmit={handleSubmit}
                className="max-w-md mx-auto"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-lg transition-colors"
                      disabled={isLoading}
                    />
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 text-left"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      'Subscribe'
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md mx-auto p-6 bg-green-50 rounded-2xl border-2 border-green-200"
              >
                <div className="flex items-center justify-center gap-3 text-green-700">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">Welcome to our community! 🎉</h3>
                    <p className="text-sm">Check your inbox for a special welcome offer.</p>
                  </div>
                </div>
              </motion.div>
            )}

            <p className="text-sm text-gray-500 mt-6">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Popup Newsletter Modal
  if (variant === 'popup') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-50"></div>
          
          <div className="relative z-10">
            <button className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-pink-100 rounded-full mb-4">
                <Gift className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get 20% Off Your First Order!
              </h3>
              <p className="text-gray-600">
                Join our newsletter and unlock exclusive beauty deals.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
              />
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Claim My 20% Off
              </motion.button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Compact Footer Newsletter
  if (variant === 'footer') {
    return (
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Beautiful</h3>
              <p className="text-gray-300">
                Get beauty tips, exclusive offers, and new product alerts.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Newsletter;