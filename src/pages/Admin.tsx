import React, { useState } from 'react';
import { useAppContext, MenuItem } from '../context/AppContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const { menuItems, setMenuItems } = useAppContext();
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEditClick = (item: MenuItem) => {
    setIsEditing(item.id);
    setEditForm(item);
  };

  const handleSaveEdit = () => {
    if (isEditing && editForm.name && editForm.price && editForm.category) {
      setMenuItems(prev => prev.map(item => item.id === isEditing ? { ...item, ...editForm } as MenuItem : item));
      setIsEditing(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditForm({});
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddNew = () => {
    if (editForm.name && editForm.price && editForm.category) {
      const newItem: MenuItem = {
        id: Date.now(),
        name: editForm.name,
        price: Number(editForm.price),
        category: editForm.category,
        image: editForm.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
        description: editForm.description || ''
      };
      setMenuItems(prev => [...prev, newItem]);
      setIsAdding(false);
      setEditForm({});
    }
  };

  return (
    <div className="min-h-screen bg-coffee-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-coffee-900">Menu Administration</h1>
            <p className="text-coffee-600 mt-2">Manage your cafe's offerings (Local State Only)</p>
          </div>
          <button 
            onClick={() => { setIsAdding(true); setEditForm({}); setIsEditing(null); }}
            className="px-4 py-2 bg-coffee-900 text-coffee-50 rounded-md hover:bg-coffee-800 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" /> Add New Item
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-coffee-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-coffee-100 text-coffee-900">
                  <th className="p-4 font-semibold">Image</th>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price (₹)</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {isAdding && (
                    <motion.tr 
                      initial={{ opacity: 0, backgroundColor: '#f8ede6' }}
                      animate={{ opacity: 1, backgroundColor: '#fff' }}
                      exit={{ opacity: 0 }}
                      className="border-b border-coffee-100 bg-coffee-50/50"
                    >
                      <td className="p-4">
                        <input 
                          type="text" 
                          placeholder="Image URL" 
                          className="w-full p-2 border border-coffee-200 rounded text-sm"
                          value={editForm.image || ''}
                          onChange={e => setEditForm({...editForm, image: e.target.value})}
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="text" 
                          placeholder="Item Name" 
                          className="w-full p-2 border border-coffee-200 rounded text-sm"
                          value={editForm.name || ''}
                          onChange={e => setEditForm({...editForm, name: e.target.value})}
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="text" 
                          placeholder="Category" 
                          className="w-full p-2 border border-coffee-200 rounded text-sm"
                          value={editForm.category || ''}
                          onChange={e => setEditForm({...editForm, category: e.target.value})}
                        />
                      </td>
                      <td className="p-4">
                        <input 
                          type="number" 
                          placeholder="Price" 
                          className="w-full p-2 border border-coffee-200 rounded text-sm"
                          value={editForm.price || ''}
                          onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                        />
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={handleAddNew} className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Save">
                          <Save className="h-5 w-5" />
                        </button>
                        <button onClick={() => setIsAdding(false)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Cancel">
                          <X className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  )}
                  {menuItems.map(item => (
                    <tr key={item.id} className="border-b border-coffee-100 hover:bg-coffee-50/50 transition-colors">
                      <td className="p-4">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        ) : (
                          <div className="w-12 h-12 bg-coffee-200 rounded flex items-center justify-center text-xs text-coffee-500">No Img</div>
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing === item.id ? (
                          <input 
                            type="text" 
                            className="w-full p-2 border border-coffee-200 rounded text-sm"
                            value={editForm.name || ''}
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                          />
                        ) : (
                          <span className="font-medium text-coffee-900">{item.name}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing === item.id ? (
                          <input 
                            type="text" 
                            className="w-full p-2 border border-coffee-200 rounded text-sm"
                            value={editForm.category || ''}
                            onChange={e => setEditForm({...editForm, category: e.target.value})}
                          />
                        ) : (
                          <span className="px-2 py-1 bg-coffee-100 text-coffee-700 text-xs rounded-md">{item.category}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {isEditing === item.id ? (
                          <input 
                            type="number" 
                            className="w-24 p-2 border border-coffee-200 rounded text-sm"
                            value={editForm.price || ''}
                            onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                          />
                        ) : (
                          <span className="text-coffee-600">₹{item.price}</span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {isEditing === item.id ? (
                          <>
                            <button onClick={handleSaveEdit} className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Save">
                              <Save className="h-5 w-5" />
                            </button>
                            <button onClick={handleCancelEdit} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Cancel">
                              <X className="h-5 w-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditClick(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                              <Edit2 className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
