import React from 'react';
import { X, Plus, Minus, ShoppingBag, Coffee } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useAppContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-coffee-50 shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-coffee-200 bg-coffee-100">
              <h2 className="font-serif text-xl font-semibold text-coffee-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" /> Your Order
              </h2>
              <button onClick={onClose} className="p-2 text-coffee-600 hover:text-coffee-900 hover:bg-coffee-200 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-coffee-400 space-y-4">
                  <ShoppingBag className="h-16 w-16 opacity-50" />
                  <p className="text-lg">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2 bg-coffee-900 text-coffee-50 rounded-md hover:bg-coffee-800 transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md shadow-sm" />
                      ) : (
                        <div className="w-20 h-20 bg-coffee-200 rounded-md flex items-center justify-center">
                          <Coffee className="h-8 w-8 text-coffee-400" />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-coffee-900">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-coffee-400 hover:text-red-500 transition-colors">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="text-coffee-600 text-sm">₹{item.price}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-coffee-300 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-coffee-600 hover:bg-coffee-200 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-coffee-600 hover:bg-coffee-200 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="font-medium text-coffee-900">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-coffee-200 bg-coffee-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-coffee-600 font-medium">Subtotal</span>
                  <span className="font-serif text-xl font-bold text-coffee-900">₹{cartTotal}</span>
                </div>
                <button 
                  className="w-full py-3 bg-coffee-900 text-coffee-50 rounded-md font-medium hover:bg-coffee-800 transition-colors shadow-md flex justify-center items-center gap-2"
                  onClick={() => {
                    alert('Checkout functionality would go here!');
                    onClose();
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
