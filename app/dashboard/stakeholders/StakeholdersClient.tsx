"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Playbook {
  id: string;
  status: string;
  createdAt: Date;
}

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  department: string;
  influence: string;
  relationship: string;
  notes: string | null;
  createdAt: Date;
  playbooks: Array<Playbook>;
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
      case 'HIGH': return 'bg-slate-800 text-red-300 border-red-800/30';
      case 'MEDIUM': return 'bg-slate-800 text-amber-300 border-amber-800/30';
      case 'LOW': return 'bg-slate-800 text-emerald-300 border-emerald-800/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'ALLY': return 'bg-slate-800 text-emerald-300 border-emerald-800/30';
      case 'NEUTRAL': return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'SKEPTICAL': return 'bg-slate-800 text-amber-300 border-amber-800/30';
      case 'OPPONENT': return 'bg-slate-800 text-red-300 border-red-800/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
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
        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Stakeholders</p>
              <p className="text-2xl font-bold text-white mt-1">{stakeholders.length}</p>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800/30">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">High Influence</p>
              <p className="text-2xl font-bold text-gray-100 mt-1">
                {stakeholders.filter(s => s.influence === 'HIGH').length}
              </p>
            </div>
            <div className="bg-red-900/30 rounded-lg p-3 border border-red-800/30">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Allies</p>
              <p className="text-2xl font-bold text-white mt-1">
                {stakeholders.filter(s => s.relationship === 'ALLY').length}
              </p>
            </div>
            <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-800/30">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Playbooks</p>
              <p className="text-2xl font-bold text-white mt-1">
                {stakeholders.reduce((sum, s) => sum + s._count.playbooks, 0)}
              </p>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-800/30">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
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
          className="text-center py-12 bg-slate-900 rounded-lg shadow-lg border border-slate-700"
        >
          <div className="bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No stakeholders yet</h3>
          <p className="text-slate-400 mb-6">Add your first stakeholder to start building relationships</p>
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
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 hover:shadow-xl transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedStakeholder(stakeholder)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">{stakeholder.name}</h3>
                  <p className="text-slate-300 text-sm">{stakeholder.role}</p>
                  {stakeholder.department && (
                    <p className="text-slate-400 text-xs">{stakeholder.department}</p>
                  )}
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStakeholder(stakeholder);
                    }}
                    className="text-slate-400 hover:text-blue-400 p-2 rounded-lg hover:bg-slate-800 transition-all"
                    title="View details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteStakeholder(stakeholder.id);
                    }}
                    className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition-all"
                    title="Delete stakeholder"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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

              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between items-center text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {stakeholder._count.playbooks} playbooks
                  </span>
                  <span>{new Date(stakeholder.createdAt).toLocaleDateString()}</span>
                </div>
                
                {stakeholder.playbooks.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Recent playbooks:</p>
                    {stakeholder.playbooks.slice(0, 2).map(playbook => (
                      <p key={playbook.id} className="text-xs text-gray-600 truncate">
                        • Playbook ({playbook.status.toLowerCase()})
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
            className="bg-slate-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-700"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{selectedStakeholder.name}</h2>
              <button
                onClick={() => setSelectedStakeholder(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">Role</p>
                  <p className="text-white">{selectedStakeholder.role}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Department</p>
                  <p className="text-white">{selectedStakeholder.department || 'Not specified'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">Influence</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getInfluenceColor(selectedStakeholder.influence)}`}>
                    {selectedStakeholder.influence}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-400">Relationship</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getRelationshipColor(selectedStakeholder.relationship)}`}>
                    {selectedStakeholder.relationship}
                  </span>
                </div>
              </div>

              {selectedStakeholder.notes && (
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">Notes</p>
                  <p className="text-white bg-slate-800 p-3 rounded border border-slate-700">{selectedStakeholder.notes}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">
                  Playbooks ({selectedStakeholder._count.playbooks})
                </p>
                {selectedStakeholder.playbooks.length > 0 ? (
                  <div className="space-y-2">
                    {selectedStakeholder.playbooks.map(playbook => (
                      <div key={playbook.id} className="flex justify-between items-center p-2 bg-slate-800 rounded border border-slate-700">
                        <span className="text-sm text-white">Playbook #{playbook.id.slice(-6)}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${
                          playbook.status === 'COMPLETED' ? 'bg-slate-800 text-emerald-300 border-emerald-800/30' :
                          playbook.status === 'IN_PROGRESS' ? 'bg-slate-800 text-amber-300 border-amber-800/30' :
                          'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {playbook.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">No playbooks generated yet</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
