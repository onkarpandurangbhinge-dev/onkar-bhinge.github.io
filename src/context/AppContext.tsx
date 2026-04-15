import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

interface AppContextType {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const initialMenu: MenuItem[] = [
  { id: 1, name: "Cappuccino", price: 120, category: "Beverages", image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800", description: "Rich espresso topped with frothy milk." },
  { id: 2, name: "Cold Coffee", price: 150, category: "Beverages", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800", description: "Chilled creamy coffee blend." },
  { id: 3, name: "Chocolate Croissant", price: 90, category: "Bakery", image: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&q=80&w=800", description: "Flaky pastry filled with rich dark chocolate." },
  { id: 4, name: "Veg Sandwich", price: 110, category: "Snacks", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800", description: "Fresh veggies and cheese grilled to perfection." },
  { id: 5, name: "Blueberry Muffin", price: 80, category: "Bakery", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=800", description: "Soft muffin bursting with fresh blueberries." },
  { id: 6, name: "Custom Celebration Cake", price: 850, category: "Custom Cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800", description: "Made to order for your special occasions. Price starts at ₹850/kg." },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      menuItems, setMenuItems,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
