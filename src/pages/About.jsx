import { motion } from 'framer-motion';
import { Heart, Star, Award, Users, Sparkles, Instagram } from 'lucide-react';

const About = () => {
  const timelineData = [
    {
      year: "2023",
      title: "The Vision",
      description: "Started with a dream to create inclusive, high-quality cosmetics for every skin tone and style.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "First Launch",
      description: "Released our signature lip kit collection, featuring 12 versatile shades loved by beauty enthusiasts.",
      icon: <Heart className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Recognition",
      description: "Won 'Best New Beauty Brand' award and reached 100K+ satisfied customers worldwide.",
      icon: <Award className="w-6 h-6" />
    },
    {
      year: "2025",
      title: "Innovation",
      description: "Expanding into skincare and sustainable packaging, leading the future of clean beauty.",
      icon: <Star className="w-6 h-6" />
    }
  ];

  const achievements = [
    { number: "500K+", label: "Happy Customers", icon: <Users className="w-8 h-8" /> },
    { number: "50+", label: "Product Shades", icon: <Heart className="w-8 h-8" /> },
    { number: "25+", label: "Awards Won", icon: <Award className="w-8 h-8" /> },
    { number: "100%", label: "Cruelty Free", icon: <Sparkles className="w-8 h-8" /> }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Beauty Influencer",
      content: "These products have completely transformed my makeup routine. The quality is unmatched!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Arjun Patel",
      role: "Makeup Artist",
      content: "I use these products on all my clients. The pigmentation and lasting power are incredible.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Sneha Reddy",
      role: "Customer",
      content: "Finally found my perfect shade! The inclusive range is exactly what the industry needed.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=800&fit=crop')"
          }}
        ></div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Creating beauty that celebrates individuality, 
            <br />one shade at a time.
          </p>
        </motion.div>
      </motion.section>

      {/* Founder Message */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop" 
              alt="Founder" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              A Message From Our Founder
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                "I created this brand to give everyone access to high-quality cosmetics that make you feel confident and beautiful. Beauty should be inclusive, accessible, and authentic to who you are."
              </p>
              <p>
                "Every product in our line is carefully formulated with clean, vegan ingredients that are good for your skin. We never compromise on quality, pigmentation, or performance."
              </p>
              <p>
                "This is just the beginning. We're constantly innovating and creating new products that celebrate the diversity and uniqueness of every individual."
              </p>
            </div>
            <div className="pt-4">
              <p className="text-2xl font-semibold text-pink-600">xo, Founder 💕</p>
              <div className="flex items-center gap-4 mt-4">
                <Instagram className="w-6 h-6 text-pink-600" />
                <span className="text-gray-600">Follow @ourcosmetics for updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a simple idea to a global beauty revolution
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-200"></div>
            
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-pink-100 rounded-full text-pink-600">
                        {item.icon}
                      </div>
                      <span className="text-2xl font-bold text-pink-600">{item.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-600 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl hover:shadow-lg transition-all"
              >
                <div className="inline-flex p-4 bg-white rounded-full text-pink-600 mb-6 shadow-md">
                  {achievement.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{achievement.number}</h3>
                <p className="text-gray-600 font-medium">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-300">
              Real stories from our amazing community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Beauty Revolution
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of a community that celebrates individuality, authenticity, and the power of self-expression through beauty.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all"
            >
              Shop Our Collection
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;