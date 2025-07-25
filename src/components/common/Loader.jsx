import { useState, useEffect } from "react";

const Loader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            onComplete && onComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        {/* Counter */}
        <div className="text-white text-6xl md:text-8xl font-light mb-8 tracking-wider">
          {count.toString().padStart(3, '0')}
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-0.5 bg-gray-800 mx-auto mb-12">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-100"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* KC Logo Animation */}
        <div 
          className={`transition-all duration-1000 ${
            count === 100 ? 'scale-150 opacity-100' : 'scale-100 opacity-70'
          }`}
        >
          <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            KC
          </div>
          <div className="text-white text-sm md:text-base font-light tracking-widest mt-2">
            KYLIE COSMETICS
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-gray-400 text-xs md:text-sm mt-8 tracking-wider">
          {count < 100 ? 'LOADING...' : 'WELCOME'}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-40 animate-pulse delay-300" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-20 animate-pulse delay-700" />
      </div>
    </div>
  );
};

export default Loader;