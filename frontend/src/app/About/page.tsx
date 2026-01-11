'use client';

import Image from 'next/image';
import { FaTruck, FaShieldAlt, FaHeadset, FaRecycle, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

    return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: `translateY(${scrollY * 0.2}px)`
        }}
      />

      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center text-white" 
        style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}>
        <motion.div 
          className="text-center px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            About Our Store
          </h1>
          <motion.p 
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Discover the story behind our passion for quality products and exceptional customer service
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Founded in 2020, our e-commerce platform was born from a simple idea: to bring 
                high-quality products directly to your doorstep with unparalleled convenience 
                and customer service.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                What started as a small online store has grown into a trusted destination 
                for thousands of customers worldwide. We carefully curate every product 
                to ensure it meets our strict quality standards.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our mission is to make online shopping a delightful experience, offering 
                competitive prices, fast shipping, and a seamless shopping journey from 
                discovery to delivery.
              </p>
            </motion.div>

            <motion.div 
              className="relative"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Our team working together"
                  fill
                  className="object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl -z-10 blur-xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="relative py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our mission is to provide high-quality products that enhance the lives of our customers. We are committed to sustainability, innovation, and exceptional customer service.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaShieldAlt className="text-blue-600 text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-700">We uphold the highest standards of integrity in all our actions.</p>
            </div>
            <div className="text-center">
              <FaRecycle className="text-green-600 text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-700">We are committed to sustainable practices to protect our planet.</p>
            </div>
            <div className="text-center">
              <FaHeadset className="text-purple-600 text-6xl mb-4 mx-auto" />
              <h3 className="text-2xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-700">Our customers are at the heart of everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gray-900/90 text-white px-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { number: "50K+", label: "Happy Customers", color: "blue" },
              { number: "10K+", label: "Products Available", color: "green" },
              { number: "24/7", label: "Customer Support", color: "purple" },
              { number: "99%", label: "Satisfaction Rate", color: "orange" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
                variants={fadeInUp}
              >
                <div className={`text-5xl md:text-6xl font-bold text-${stat.color}-400 mb-4`}>
                  {stat.number}
                  </div>
                <p className="text-gray-300 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center text-gray-900 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Team
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { 
                name: "Sarah Johnson", 
                role: "CEO & Founder", 
                desc: "Passionate about creating exceptional shopping experiences for our customers.",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              { 
                name: "Michael Chen", 
                role: "Head of Operations", 
                desc: "Ensures smooth logistics and efficient order fulfillment.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              { 
                name: "Emily Rodriguez", 
                role: "Customer Success Manager", 
                desc: "Dedicated to making every customer interaction exceptional.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="relative py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic mb-4">"This platform has completely transformed the way I shop online. The quality and service are unmatched!"</p>
              <h4 className="text-gray-900 font-semibold">- Alex Johnson</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic mb-4">"I love the commitment to sustainability and the amazing product selection. Highly recommend!"</p>
              <h4 className="text-gray-900 font-semibold">- Maria Gonzalez</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Shop?
          </motion.h2>
          <motion.p 
            className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join thousands of satisfied customers and discover amazing products today
          </motion.p>
          <motion.button 
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Shopping
            <FaArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>

      {/* Footer Note */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p className="text-sm opacity-75">
          © 2024 Our Store. All rights reserved. Built with passion and love for great products.
        </p>
      </footer>
    </div>
  );
}