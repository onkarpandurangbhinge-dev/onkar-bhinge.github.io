import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-coffee-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-coffee-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether it's a custom cake inquiry or just to say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-coffee-100"
          >
            <h2 className="text-2xl font-serif font-bold text-coffee-900 mb-8">Visit Brew Haven</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-coffee-100 rounded-full text-coffee-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-900 mb-1">Address</h3>
                  <p className="text-coffee-600">Shop No. 12, Hill View Plaza<br/>Near Lonavala Lake<br/>Lonavala, Maharashtra 410401<br/>India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-coffee-100 rounded-full text-coffee-700">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-900 mb-1">Phone</h3>
                  <p className="text-coffee-600">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-coffee-100 rounded-full text-coffee-700">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-900 mb-1">Email</h3>
                  <p className="text-coffee-600">contact@brewhaven.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-coffee-100 rounded-full text-coffee-700">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-coffee-900 mb-1">Business Hours</h3>
                  <table className="text-coffee-600 text-sm w-full max-w-xs">
                    <tbody>
                      <tr><td className="py-1">Mon - Thu</td><td className="py-1 text-right">8:00 AM - 10:00 PM</td></tr>
                      <tr><td className="py-1">Friday</td><td className="py-1 text-right">8:00 AM - 11:00 PM</td></tr>
                      <tr><td className="py-1">Sat - Sun</td><td className="py-1 text-right">7:30 AM - 11:30 PM</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-coffee-100"
          >
            <h2 className="text-2xl font-serif font-bold text-coffee-900 mb-8">Send a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-coffee-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-md border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-coffee-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-md border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-coffee-900 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-md border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-shadow resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-coffee-900 text-coffee-50 rounded-md font-medium hover:bg-coffee-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
