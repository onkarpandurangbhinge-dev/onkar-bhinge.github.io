import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Coffee, Menu, X, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import CartDrawer from './CartDrawer';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useAppContext();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu & Order', path: '/menu' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-coffee-900 text-coffee-50 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Coffee className="h-8 w-8 text-coffee-300" />
                <span className="font-serif text-xl font-bold tracking-wider">Brew Haven</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-coffee-300 ${
                    isActive(link.path) ? 'text-coffee-300 border-b-2 border-coffee-300' : 'text-coffee-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-coffee-100 hover:text-coffee-300 transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-coffee-900 transform translate-x-1/4 -translate-y-1/4 bg-coffee-300 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
               <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-coffee-100 hover:text-coffee-300 transition-colors"
              >
                <ShoppingBag className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-coffee-900 transform translate-x-1/4 -translate-y-1/4 bg-coffee-300 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-coffee-100 hover:text-coffee-300"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-coffee-800 border-t border-coffee-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(link.path) ? 'bg-coffee-900 text-coffee-300' : 'text-coffee-100 hover:bg-coffee-700 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-coffee-900 text-coffee-200 py-12 border-t border-coffee-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="h-6 w-6 text-coffee-300" />
              <span className="font-serif text-xl font-bold text-coffee-50">Brew Haven Café</span>
            </div>
            <p className="text-sm">"Fresh Brews, Warm Moments"</p>
            <p className="text-sm mt-4">Shop No. 12, Hill View Plaza<br/>Near Lonavala Lake<br/>Lonavala, Maharashtra 410401</p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-coffee-50 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-coffee-300 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-coffee-300 transition-colors">Menu & Order</Link></li>
              <li><Link to="/contact" className="hover:text-coffee-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-coffee-50 mb-4">Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>Mon - Thu: 8:00 AM - 10:00 PM</li>
              <li>Fri: 8:00 AM - 11:00 PM</li>
              <li>Sat - Sun: 7:30 AM - 11:30 PM</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-coffee-800 text-sm text-center">
          &copy; {new Date().getFullYear()} Brew Haven Café. All rights reserved.
        </div>
      </footer>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
