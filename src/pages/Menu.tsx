import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function Menu() {
  const { menuItems, addToCart, cart } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-coffee-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-900 mb-4">Our Menu</h1>
          <p className="text-lg text-coffee-600 max-w-2xl mx-auto">
            From freshly roasted coffee to custom celebration cakes, order online for pickup or dine-in.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-coffee-900 text-coffee-50' 
                  : 'bg-coffee-200 text-coffee-800 hover:bg-coffee-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-coffee-100 hover:shadow-md transition-shadow flex flex-col"
            >
              {item.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-coffee-900">{item.name}</h3>
                  <span className="text-lg font-semibold text-coffee-600">₹{item.price}</span>
                </div>
                <span className="inline-block px-2 py-1 bg-coffee-100 text-coffee-700 text-xs rounded-md mb-3 w-max">
                  {item.category}
                </span>
                {item.description && (
                  <p className="text-coffee-600 text-sm mb-6 flex-grow">{item.description}</p>
                )}
                
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={addedItems[item.id]}
                  className={`w-full py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-colors ${
                    addedItems[item.id] 
                      ? 'bg-green-600 text-white' 
                      : 'bg-coffee-900 text-coffee-50 hover:bg-coffee-800'
                  }`}
                >
                  {addedItems[item.id] ? (
                    <><Check className="h-5 w-5" /> Added to Cart</>
                  ) : (
                    <><Plus className="h-5 w-5" /> Add to Order</>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
