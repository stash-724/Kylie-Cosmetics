import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                KC
              </div>
              <span className="text-xl font-semibold">Kylie Cosmetics</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover premium beauty products that enhance your natural glow. From bold lips to radiant skin, we've got everything you need to feel confident and beautiful.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-pink-400 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-pink-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/quickbuy" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Quick Buy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-pink-400" />
                <span className="text-gray-300">hello@kyliecosmetics.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-pink-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-pink-400" />
                <span className="text-gray-300">Los Angeles, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2025 Kylie Cosmetics. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-gray-300 hover:text-pink-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-300 hover:text-pink-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/shipping" className="text-gray-300 hover:text-pink-400 text-sm transition-colors">
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
