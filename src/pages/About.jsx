// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Award, Users, Sparkles, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10M+', color: 'pink' },
    { icon: Globe, label: 'Countries', value: '50+', color: 'purple' },
    { icon: Award, label: 'Beauty Awards', value: '25+', color: 'pink' },
    { icon: Star, label: 'Average Rating', value: '4.8/5', color: 'purple' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Cruelty-Free',
      description: 'We believe beauty should never come at the expense of our furry friends. All our products are 100% cruelty-free.',
      color: 'pink'
    },
    {
      icon: Sparkles,
      title: 'Premium Quality',
      description: 'We use only the finest ingredients and cutting-edge formulations to create products that deliver exceptional results.',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Inclusive Beauty',
      description: 'Beauty comes in all forms. Our diverse range of shades and products celebrates every skin tone and type.',
      color: 'pink'
    },
    {
      icon: Globe,
      title: 'Sustainable Future',
      description: 'We are committed to reducing our environmental impact through sustainable packaging and responsible sourcing.',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/5 to-purple-600/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <Sparkles className="w-8 h-8 text-pink-500" />
              <span className="text-pink-600 font-semibold text-lg">About Us</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Redefining Beauty,
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {' '}One Product at a Time
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Since our launch, Kylie Cosmetics has been at the forefront of beauty innovation, 
              creating products that empower you to express your unique style and embrace your natural beauty.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  What started as a passion project has grown into a global beauty empire. 
                  Kylie Cosmetics was born from the desire to create high-quality, accessible 
                  beauty products that make everyone feel confident and beautiful.
                </p>
                <p>
                  Our journey began with the iconic Lip Kits, and since then, we've expanded 
                  our range to include everything from eyeshadows to skincare. Each product 
                  is carefully crafted with love, attention to detail, and a commitment to excellence.
                </p>
                <p>
                  Today, we're proud to serve millions of customers worldwide, helping them 
                  express their creativity and embrace their unique beauty. This is just the 
                  beginning of our story.
                </p>
              </div>
            </motion.div>

            {/* Story Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-300 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-15"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from product development to customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow group"
              >
                <div className={`w-16 h-16 bg-${value.color}-100 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-8 h-8 text-${value.color}-500`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Behind every great product is an incredible team of passionate individuals dedicated to bringing you the best in beauty.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Head of Product Development',
                image: '/api/placeholder/300/300'
              },
              {
                name: 'Michael Chen',
                role: 'Creative Director',
                image: '/api/placeholder/300/300'
              },
              {
                name: 'Emily Rodriguez',
                role: 'Customer Experience Lead',
                image: '/api/placeholder/300/300'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-pink-200 to-purple-300 rounded-full overflow-hidden group-hover:scale-105 transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed opacity-95">
              "To empower everyone to feel confident and beautiful in their own skin by providing 
              high-quality, innovative beauty products that celebrate individuality and self-expression. 
              We believe that beauty is not one-size-fits-all, and our mission is to create products 
              that help you discover and embrace your unique beauty."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions about our products or want to learn more about our brand? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <a
                href="mailto:hello@kyliecosmetics.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white font-semibold rounded-xl transition-colors"
              >
                Follow Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;