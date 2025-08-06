"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface MeetingGoal {
  id: string;
  value: string;
  label: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function MeetingGoalsAdmin() {
  const [meetingGoals, setMeetingGoals] = useState<MeetingGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState<MeetingGoal | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    value: "",
    label: "",
    description: "",
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchMeetingGoals();
  }, []);

  const fetchMeetingGoals = async () => {
    try {
      const response = await fetch("/api/admin/meeting-goals");
      if (response.ok) {
        const goals = await response.json();
        setMeetingGoals(goals);
      } else {
        toast.error("Failed to fetch meeting goals");
      }
    } catch (error) {
      toast.error("Error fetching meeting goals");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingGoal ? "/api/admin/meeting-goals" : "/api/admin/meeting-goals";
      const method = editingGoal ? "PUT" : "POST";
      const body = editingGoal 
        ? { ...formData, id: editingGoal.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success(editingGoal ? "Meeting goal updated!" : "Meeting goal created!");
        setShowAddModal(false);
        setEditingGoal(null);
        setFormData({
          value: "",
          label: "",
          description: "",
          sortOrder: 0,
          isActive: true,
        });
        fetchMeetingGoals();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to save meeting goal");
      }
    } catch (error) {
      toast.error("Error saving meeting goal");
    }
  };

  const handleEdit = (goal: MeetingGoal) => {
    setEditingGoal(goal);
    setFormData({
      value: goal.value,
      label: goal.label,
      description: goal.description,
      sortOrder: goal.sortOrder,
      isActive: goal.isActive,
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meeting goal?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/meeting-goals?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Meeting goal deleted!");
        fetchMeetingGoals();
      } else {
        toast.error("Failed to delete meeting goal");
      }
    } catch (error) {
      toast.error("Error deleting meeting goal");
    }
  };

  const toggleActive = async (goal: MeetingGoal) => {
    try {
      const response = await fetch("/api/admin/meeting-goals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: goal.id,
          isActive: !goal.isActive,
        }),
      });

      if (response.ok) {
        toast.success(`Meeting goal ${!goal.isActive ? 'activated' : 'deactivated'}!`);
        fetchMeetingGoals();
      } else {
        toast.error("Failed to update meeting goal");
      }
    } catch (error) {
      toast.error("Error updating meeting goal");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="loading loading-spinner loading-lg text-brand-sea-green"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white">Current Meeting Goals</h2>
          <p className="text-slate-400 text-sm">
            {meetingGoals.filter(g => g.isActive).length} active goals
          </p>
        </div>
        <button
          onClick={() => {
            setEditingGoal(null);
            setFormData({
              value: "",
              label: "",
              description: "",
              sortOrder: meetingGoals.length,
              isActive: true,
            });
            setShowAddModal(true);
          }}
          className="bg-brand-sea-green text-white px-4 py-2 rounded-lg hover:bg-brand-sea-green/90 transition-colors"
        >
          Add New Goal
        </button>
      </div>

      {/* Meeting Goals List */}
      <div className="grid gap-4">
        {meetingGoals.map((goal) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-slate-800 rounded-lg p-6 border ${
              goal.isActive ? 'border-slate-700' : 'border-slate-600 opacity-60'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{goal.label}</h3>
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    {goal.value}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    goal.isActive 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-red-900 text-red-300'
                  }`}>
                    {goal.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-slate-400 mb-3">{goal.description}</p>
                <div className="text-xs text-slate-500">
                  Sort Order: {goal.sortOrder} | Created: {new Date(goal.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => toggleActive(goal)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    goal.isActive
                      ? 'bg-red-900 text-red-300 hover:bg-red-800'
                      : 'bg-green-900 text-green-300 hover:bg-green-800'
                  }`}
                >
                  {goal.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleEdit(goal)}
                  className="bg-blue-900 text-blue-300 px-3 py-1 rounded text-sm hover:bg-blue-800 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="bg-red-900 text-red-300 px-3 py-1 rounded text-sm hover:bg-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-lg p-6 max-w-md w-full border border-slate-700"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {editingGoal ? 'Edit Meeting Goal' : 'Add New Meeting Goal'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Label (Display Name)
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-brand-sea-green focus:outline-none"
                  placeholder="e.g., Project Update"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Value (Internal Code)
                </label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-brand-sea-green focus:outline-none"
                  placeholder="e.g., PROJECT_UPDATE (auto-formatted)"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Will be auto-formatted to uppercase with underscores
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-brand-sea-green focus:outline-none"
                  placeholder="e.g., Status reports, progress reviews, milestone check-ins"
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-brand-sea-green focus:outline-none"
                    min="0"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded"
                    />
                    Active
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingGoal(null);
                  }}
                  className="flex-1 px-4 py-2 text-slate-400 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brand-sea-green text-white rounded-lg hover:bg-brand-sea-green/90 transition-colors"
                >
                  {editingGoal ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
