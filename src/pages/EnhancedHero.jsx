import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Heart, ShoppingBag } from 'lucide-react';

const EnhancedHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const heroSlides = [
        {
            title: "BEAUTY",
            subtitle: "REDEFINED",
            description: "Discover cosmetics that celebrate your unique beauty",
            cta: "Shop Collection",
            bg: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=800&fit=crop",
            accent: "from-pink-600 to-rose-600"
        },
        {
            title: "GLOW",
            subtitle: "LIKE NEVER BEFORE",
            description: "Premium skincare meets bold makeup artistry",
            cta: "Explore Products",
            bg: "https://images.unsplash.com/photo-1522335772639-b2d6d77d6a2e?w=1200&h=800&fit=crop",
            accent: "from-purple-600 to-pink-600"
        },
        {
            title: "YOUR",
            subtitle: "SIGNATURE LOOK",
            description: "Create looks that are authentically you",
            cta: "Find Your Shade",
            bg: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&h=800&fit=crop",
            accent: "from-rose-600 to-purple-600"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const currentHero = heroSlides[currentSlide];

    return (
        <div className="relative h-screen overflow-hidden bg-black">
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    x: mousePosition.x * 0.02,
                    y: mousePosition.y * 0.02
                }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${currentHero.bg}')` }}
                    />
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${currentHero.accent} opacity-60`} />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div> {/* THIS WAS THE MISSING CLOSING TAG */}


            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        {i % 3 === 0 && <Sparkles className="w-4 h-4 text-white/30" />}
                        {i % 3 === 1 && <Star className="w-3 h-3 text-pink-300/40" />}
                        {i % 3 === 2 && <Heart className="w-5 h-5 text-rose-300/30" />}
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
                <div className="text-center max-w-6xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            {/* Main Title */}
                            <motion.h1
                                className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white leading-none tracking-tighter mb-4"
                                style={{
                                    textShadow: '0 0 30px rgba(0,0,0,0.5)',
                                    WebkitTextStroke: '2px transparent',
                                    backgroundImage: `linear-gradient(45deg, white, #fbbf24)`,
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                }}
                            >
                                {currentHero.title}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.h2
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/90 mb-8 tracking-wide"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            >
                                {currentHero.subtitle}
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                {currentHero.description}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`group px-12 py-4 bg-gradient-to-r ${currentHero.accent} text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300`}
                                >
                                    <span className="flex items-center gap-3">
                                        {currentHero.cta}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-12 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                                >
                                    <span className="flex items-center gap-3">
                                        <ShoppingBag className="w-5 h-5" />
                                        View All Products
                                    </span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex gap-3">
                    {heroSlides.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 right-8 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2 text-white/70">
                    <span className="text-sm font-medium rotate-90 origin-center mb-4">SCROLL</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent" />
                </div>
            </motion.div>

            {/* Side Navigation */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 gap-y-10 flex flex-col items-center">
                {['Instagram', 'TikTok', 'YouTube'].map((social, index) => (
                    <motion.a
                        key={social}
                        href="#"
                        className="block text-white/60 hover:text-white text-sm font-medium transform -rotate-90 origin-center hover:scale-110 transition-all"
                        whileHover={{ x: 5 }}
                        style={{ transformOrigin: 'center center' }}
                    >
                        {social}
                    </motion.a>
                ))}
            </div>

            {/* Feature Tags */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 space-y-4">
                {['Cruelty Free', 'Vegan', 'Clean Beauty'].map((tag, index) => (
                    <motion.div
                        key={tag}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                        className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium border border-white/20"
                    >
                        {tag}
                    </motion.div>
                ))}
            </div>

            {/* Animated Border */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                    animate={{ x: [-100, window.innerWidth + 100] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                    animate={{ x: [window.innerWidth + 100, -100] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                />
            </div>
        </div >
    );
};

export default EnhancedHero;