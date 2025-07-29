"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DropdownOption {
  id: string;
  category: string;
  value: string;
  label: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  options: DropdownOption[];
}

export default function DropdownOptionsClient({ options: initialOptions }: Props) {
  const router = useRouter();
  const [options, setOptions] = useState<DropdownOption[]>(initialOptions);
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [editingOption, setEditingOption] = useState<DropdownOption | null>(null);
  const [newOption, setNewOption] = useState({
    category: "influence",
    value: "",
    label: "",
    description: "",
    sortOrder: 0,
  });

  // Group options by category
  const groupedOptions = options.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, DropdownOption[]>);

  const handleAddOption = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newOption.value.trim() || !newOption.label.trim()) {
      toast.error("Value and label are required");
      return;
    }

    try {
      const response = await fetch('/api/admin/dropdown-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOption),
      });

      if (response.ok) {
        const data = await response.json();
        setOptions([...options, data.option]);
        toast.success("Option added successfully!");
        setNewOption({
          category: "influence",
          value: "",
          label: "",
          description: "",
          sortOrder: 0,
        });
        setIsAddingOption(false);
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to add option");
      }
    } catch (error) {
      toast.error("Failed to add option");
    }
  };

  const handleUpdateOption = async (id: string, updates: Partial<DropdownOption>) => {
    try {
      const response = await fetch(`/api/admin/dropdown-options/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const data = await response.json();
        setOptions(options.map(opt => opt.id === id ? data.option : opt));
        toast.success("Option updated successfully!");
        setEditingOption(null);
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update option");
      }
    } catch (error) {
      toast.error("Failed to update option");
    }
  };

  const handleDeleteOption = async (id: string) => {
    if (!confirm("Are you sure you want to delete this option? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/dropdown-options/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setOptions(options.filter(opt => opt.id !== id));
        toast.success("Option deleted successfully!");
        router.refresh();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to delete option");
      }
    } catch (error) {
      toast.error("Failed to delete option");
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    await handleUpdateOption(id, { isActive: !isActive });
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dropdown Options Admin</h1>
            <p className="text-slate-400">Manage influence and relationship dropdown options</p>
          </div>
          <button
            onClick={() => setIsAddingOption(true)}
            className="bg-brand-sea-green text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-sea-green/90 transition-colors shadow-lg"
          >
            Add New Option
          </button>
        </motion.div>

        {/* Categories */}
        {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4 capitalize">
              {category} Options
            </h2>
            
            <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Label
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Sort Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {categoryOptions.map((option) => (
                      <tr key={option.id} className="hover:bg-slate-700/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {option.value}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                          {option.label}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-300 max-w-xs truncate">
                          {option.description || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                          {option.sortOrder}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            option.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {option.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => setEditingOption(option)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => toggleActive(option.id, option.isActive)}
                            className={`${
                              option.isActive 
                                ? 'text-yellow-400 hover:text-yellow-300' 
                                : 'text-green-400 hover:text-green-300'
                            }`}
                          >
                            {option.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleDeleteOption(option.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Option Modal */}
        {isAddingOption && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto border border-slate-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Add New Option</h2>
                <button
                  onClick={() => setIsAddingOption(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleAddOption} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newOption.category}
                    onChange={(e) => setNewOption({...newOption, category: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    required
                  >
                    <option value="influence">Influence</option>
                    <option value="relationship">Relationship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Value * (uppercase, no spaces)
                  </label>
                  <input
                    type="text"
                    value={newOption.value}
                    onChange={(e) => setNewOption({...newOption, value: e.target.value.toUpperCase().replace(/\s/g, '_')})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    placeholder="e.g., VERY_HIGH"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Label *
                  </label>
                  <input
                    type="text"
                    value={newOption.label}
                    onChange={(e) => setNewOption({...newOption, label: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    placeholder="e.g., Very High Influence"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newOption.description}
                    onChange={(e) => setNewOption({...newOption, description: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    placeholder="Optional description for admin reference"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={newOption.sortOrder}
                    onChange={(e) => setNewOption({...newOption, sortOrder: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    placeholder="0"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-brand-sea-green text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-sea-green/90 transition-colors"
                  >
                    Add Option
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingOption(false)}
                    className="flex-1 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Edit Option Modal */}
        {editingOption && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto border border-slate-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Edit Option</h2>
                <button
                  onClick={() => setEditingOption(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateOption(editingOption.id, {
                  value: editingOption.value,
                  label: editingOption.label,
                  description: editingOption.description,
                  sortOrder: editingOption.sortOrder,
                });
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Value * (uppercase, no spaces)
                  </label>
                  <input
                    type="text"
                    value={editingOption.value}
                    onChange={(e) => setEditingOption({...editingOption, value: e.target.value.toUpperCase().replace(/\s/g, '_')})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Label *
                  </label>
                  <input
                    type="text"
                    value={editingOption.label}
                    onChange={(e) => setEditingOption({...editingOption, label: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={editingOption.description || ''}
                    onChange={(e) => setEditingOption({...editingOption, description: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={editingOption.sortOrder}
                    onChange={(e) => setEditingOption({...editingOption, sortOrder: parseInt(e.target.value) || 0})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-brand-sea-green text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-sea-green/90 transition-colors"
                  >
                    Update Option
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingOption(null)}
                    className="flex-1 bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
