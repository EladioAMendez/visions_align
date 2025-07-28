"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  department: string;
  influence: string;
  relationship: string;
  notes: string | null;
  createdAt: Date;
  playbooks: Array<{
    id: string;
    title: string;
    status: string;
    createdAt: Date;
  }>;
  _count: {
    playbooks: number;
  };
}

interface User {
  id: string;
  name: string | null;
  email: string;
  planTier: string;
}

interface Props {
  user: User;
  stakeholders: Stakeholder[];
}

export default function StakeholdersClient({ user, stakeholders }: Props) {
  const router = useRouter();
  const [isAddingStakeholder, setIsAddingStakeholder] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [newStakeholder, setNewStakeholder] = useState({
    name: "",
    role: "",
    department: "",
    influence: "MEDIUM",
    relationship: "NEUTRAL",
    notes: "",
  });

  const handleAddStakeholder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newStakeholder.name.trim() || !newStakeholder.role.trim()) {
      toast.error("Name and role are required");
      return;
    }

    try {
      const response = await fetch('/api/stakeholders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStakeholder),
      });

      if (response.ok) {
        toast.success("Stakeholder added successfully!");
        setNewStakeholder({
          name: "",
          role: "",
          department: "",
          influence: "MEDIUM",
          relationship: "NEUTRAL",
          notes: "",
        });
        setIsAddingStakeholder(false);
        router.refresh();
      } else {
        throw new Error('Failed to add stakeholder');
      }
    } catch (error) {
      toast.error("Failed to add stakeholder");
    }
  };

  const handleDeleteStakeholder = async (stakeholderId: string) => {
    if (!confirm("Are you sure you want to delete this stakeholder? This will also delete all associated playbooks.")) {
      return;
    }

    try {
      const response = await fetch(`/api/stakeholders/${stakeholderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Stakeholder deleted successfully!");
        router.refresh();
      } else {
        throw new Error('Failed to delete stakeholder');
      }
    } catch (error) {
      toast.error("Failed to delete stakeholder");
    }
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'ALLY': return 'bg-green-100 text-green-800 border-green-200';
      case 'NEUTRAL': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'SKEPTICAL': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'OPPONENT': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stakeholders</h1>
          <p className="text-gray-600">Manage your key stakeholders and their relationships</p>
        </div>
        <button
          onClick={() => setIsAddingStakeholder(true)}
          className="btn btn-primary"
        >
          + Add New Stakeholder
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Stakeholders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stakeholders.length}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">High Influence</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stakeholders.filter(s => s.influence === 'HIGH').length}
              </p>
            </div>
            <div className="bg-red-100 rounded-lg p-3">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Allies</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stakeholders.filter(s => s.relationship === 'ALLY').length}
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <span className="text-2xl">🤝</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Playbooks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stakeholders.reduce((sum, s) => sum + s._count.playbooks, 0)}
              </p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stakeholders Grid */}
      {stakeholders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stakeholders yet</h3>
          <p className="text-gray-600 mb-6">Add your first stakeholder to start building relationships</p>
          <button
            onClick={() => setIsAddingStakeholder(true)}
            className="btn btn-primary"
          >
            Add Your First Stakeholder
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stakeholders.map((stakeholder, index) => (
            <motion.div
              key={stakeholder.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{stakeholder.name}</h3>
                  <p className="text-gray-600 text-sm">{stakeholder.role}</p>
                  {stakeholder.department && (
                    <p className="text-gray-500 text-xs">{stakeholder.department}</p>
                  )}
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setSelectedStakeholder(stakeholder)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => handleDeleteStakeholder(stakeholder.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getInfluenceColor(stakeholder.influence)}`}>
                  {stakeholder.influence} Influence
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getRelationshipColor(stakeholder.relationship)}`}>
                  {stakeholder.relationship}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{stakeholder._count.playbooks} playbooks</span>
                  <span>{new Date(stakeholder.createdAt).toLocaleDateString()}</span>
                </div>
                
                {stakeholder.playbooks.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Recent playbooks:</p>
                    {stakeholder.playbooks.slice(0, 2).map(playbook => (
                      <p key={playbook.id} className="text-xs text-gray-600 truncate">
                        • {playbook.title}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add Stakeholder Modal */}
      {isAddingStakeholder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Stakeholder</h2>
              <button
                onClick={() => setIsAddingStakeholder(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddStakeholder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={newStakeholder.name}
                  onChange={(e) => setNewStakeholder({...newStakeholder, name: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="e.g., Sarah Johnson"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  value={newStakeholder.role}
                  onChange={(e) => setNewStakeholder({...newStakeholder, role: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="e.g., VP of Engineering"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={newStakeholder.department}
                  onChange={(e) => setNewStakeholder({...newStakeholder, department: e.target.value})}
                  className="input input-bordered w-full"
                  placeholder="e.g., Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Influence Level
                </label>
                <select
                  value={newStakeholder.influence}
                  onChange={(e) => setNewStakeholder({...newStakeholder, influence: e.target.value})}
                  className="select select-bordered w-full"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <select
                  value={newStakeholder.relationship}
                  onChange={(e) => setNewStakeholder({...newStakeholder, relationship: e.target.value})}
                  className="select select-bordered w-full"
                >
                  <option value="ALLY">Ally</option>
                  <option value="NEUTRAL">Neutral</option>
                  <option value="SKEPTICAL">Skeptical</option>
                  <option value="OPPONENT">Opponent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={newStakeholder.notes}
                  onChange={(e) => setNewStakeholder({...newStakeholder, notes: e.target.value})}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  placeholder="Any additional notes about this stakeholder..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingStakeholder(false)}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                >
                  Add Stakeholder
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Stakeholder Details Modal */}
      {selectedStakeholder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{selectedStakeholder.name}</h2>
              <button
                onClick={() => setSelectedStakeholder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Role</p>
                  <p className="text-gray-900">{selectedStakeholder.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Department</p>
                  <p className="text-gray-900">{selectedStakeholder.department || 'Not specified'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Influence</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getInfluenceColor(selectedStakeholder.influence)}`}>
                    {selectedStakeholder.influence}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Relationship</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getRelationshipColor(selectedStakeholder.relationship)}`}>
                    {selectedStakeholder.relationship}
                  </span>
                </div>
              </div>

              {selectedStakeholder.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded">{selectedStakeholder.notes}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Playbooks ({selectedStakeholder._count.playbooks})
                </p>
                {selectedStakeholder.playbooks.length > 0 ? (
                  <div className="space-y-2">
                    {selectedStakeholder.playbooks.map(playbook => (
                      <div key={playbook.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-900">{playbook.title}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          playbook.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          playbook.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {playbook.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No playbooks generated yet</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
