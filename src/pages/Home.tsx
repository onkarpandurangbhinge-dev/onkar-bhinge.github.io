import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const reviews = [
    { name: "Rahul Sharma", rating: 5, comment: "Amazing coffee and cozy vibe!" },
    { name: "Priya Desai", rating: 4, comment: "Loved the pastries, will visit again." },
    { name: "Amit Patil", rating: 5, comment: "Best café near Lonavala!" }
  ];

  const gallery = [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800", // Cafe Interior
    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800", // Coffee
    "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=80&w=800"  // Pastries
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472205-51a402302a8e?auto=format&fit=crop&q=80&w=2000" 
            alt="Cafe Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-coffee-900/60 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold text-coffee-50 mb-6"
          >
            Brew Haven Café
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-coffee-200 mb-10 font-light"
          >
            "Fresh Brews, Warm Moments"
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/menu" 
              className="px-8 py-4 bg-coffee-300 text-coffee-900 rounded-md font-semibold hover:bg-coffee-200 transition-colors flex items-center justify-center gap-2"
            >
              Order Online <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-transparent border-2 border-coffee-300 text-coffee-50 rounded-md font-semibold hover:bg-coffee-300/10 transition-colors flex items-center justify-center"
            >
              Visit Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4 bg-coffee-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-900 mb-6">Welcome to Your Local Haven</h2>
          <p className="text-lg text-coffee-700 leading-relaxed max-w-2xl mx-auto">
            Nestled near the serene Lonavala Lake, Brew Haven Café is your perfect escape. We specialize in artisanal coffee, freshly baked pastries, and custom celebration cakes made with love. Whether you're grabbing a quick takeaway or settling in for a cozy afternoon, we promise a warm moment in every cup.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-coffee-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-10 text-center">Our Vibe</h2>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
            {gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="flex-none w-[85vw] md:w-[400px] snap-center rounded-lg overflow-hidden shadow-lg aspect-[4/3]"
              >
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-coffee-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-coffee-100 flex flex-col items-center text-center">
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-coffee-700 italic mb-6 flex-grow">"{review.comment}"</p>
                <p className="font-semibold text-coffee-900">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-16 bg-coffee-900 text-coffee-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <MapPin className="h-8 w-8 text-coffee-300 mb-4" />
            <h3 className="font-serif text-xl font-semibold text-white mb-2">Location</h3>
            <p>Shop No. 12, Hill View Plaza<br/>Near Lonavala Lake, Lonavala</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 text-coffee-300 mb-4" />
            <h3 className="font-serif text-xl font-semibold text-white mb-2">Hours</h3>
            <p>Mon-Thu: 8am - 10pm<br/>Fri-Sun: 8am - 11:30pm</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="h-8 w-8 text-coffee-300 mb-4" />
            <h3 className="font-serif text-xl font-semibold text-white mb-2">Contact</h3>
            <p>+91 98765 43210<br/>contact@brewhaven.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
