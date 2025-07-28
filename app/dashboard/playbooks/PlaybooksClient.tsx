"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Playbook {
  id: string;
  title: string;
  status: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  stakeholder: {
    id: string;
    name: string;
    role: string;
    influence: string;
    relationship: string;
  };
}

interface Stakeholder {
  id: string;
  name: string;
  role: string;
}

interface User {
  id: string;
  name: string | null;
  email: string;
  planTier: string;
}

interface Props {
  user: User;
  playbooks: Playbook[];
  stakeholders: Stakeholder[];
}

export default function PlaybooksClient({ user, playbooks, stakeholders }: Props) {
  const router = useRouter();
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlaybooks = playbooks.filter(playbook => {
    const matchesSearch = playbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         playbook.stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || playbook.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleGeneratePlaybook = async () => {
    if (!selectedStakeholder) {
      toast.error("Please select a stakeholder");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/playbooks/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stakeholderId: selectedStakeholder }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Playbook generated successfully!");
        setSelectedStakeholder("");
        router.refresh();
      } else {
        throw new Error('Failed to generate playbook');
      }
    } catch (error) {
      toast.error("Failed to generate playbook");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeletePlaybook = async (playbookId: string) => {
    if (!confirm("Are you sure you want to delete this playbook?")) {
      return;
    }

    try {
      const response = await fetch(`/api/playbooks/${playbookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Playbook deleted successfully!");
        router.refresh();
      } else {
        throw new Error('Failed to delete playbook');
      }
    } catch (error) {
      toast.error("Failed to delete playbook");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DRAFT': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Playbooks</h1>
          <p className="text-gray-600">Generate and manage your stakeholder engagement playbooks</p>
        </div>
      </motion.div>

      {/* Generate New Playbook */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate New Playbook</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <select
              value={selectedStakeholder}
              onChange={(e) => setSelectedStakeholder(e.target.value)}
              className="select select-bordered w-full"
              disabled={isGenerating}
            >
              <option value="">Select a stakeholder...</option>
              {stakeholders.map(stakeholder => (
                <option key={stakeholder.id} value={stakeholder.id}>
                  {stakeholder.name} - {stakeholder.role}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGeneratePlaybook}
            disabled={isGenerating || !selectedStakeholder}
            className="btn btn-primary"
          >
            {isGenerating ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Generating...
              </>
            ) : (
              'Generate Playbook'
            )}
          </button>
        </div>
        {stakeholders.length === 0 && (
          <p className="text-gray-500 text-sm mt-2">
            You need to add stakeholders first. 
            <button
              onClick={() => router.push('/dashboard/stakeholders')}
              className="text-blue-600 hover:text-blue-800 ml-1"
            >
              Add stakeholders →
            </button>
          </p>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search playbooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select select-bordered"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Playbooks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{playbooks.length}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {playbooks.filter(p => p.status === 'COMPLETED').length}
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {playbooks.filter(p => p.status === 'IN_PROGRESS').length}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-3">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">High Priority</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {playbooks.filter(p => p.stakeholder.influence === 'HIGH').length}
              </p>
            </div>
            <div className="bg-red-100 rounded-lg p-3">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Playbooks List */}
      {filteredPlaybooks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {playbooks.length === 0 ? "No playbooks yet" : "No playbooks match your search"}
          </h3>
          <p className="text-gray-600 mb-6">
            {playbooks.length === 0 
              ? "Generate your first playbook to start engaging with stakeholders"
              : "Try adjusting your search or filters"
            }
          </p>
          {playbooks.length === 0 && stakeholders.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <select
                value={selectedStakeholder}
                onChange={(e) => setSelectedStakeholder(e.target.value)}
                className="select select-bordered"
              >
                <option value="">Select a stakeholder...</option>
                {stakeholders.map(stakeholder => (
                  <option key={stakeholder.id} value={stakeholder.id}>
                    {stakeholder.name} - {stakeholder.role}
                  </option>
                ))}
              </select>
              <button
                onClick={handleGeneratePlaybook}
                disabled={!selectedStakeholder}
                className="btn btn-primary"
              >
                Generate First Playbook
              </button>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredPlaybooks.map((playbook, index) => (
            <motion.div
              key={playbook.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {playbook.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {playbook.stakeholder.name} • {playbook.stakeholder.role}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(playbook.status)}`}>
                      {playbook.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getInfluenceColor(playbook.stakeholder.influence)}`}>
                      {playbook.stakeholder.influence} Influence
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1 ml-4">
                  <button
                    onClick={() => setSelectedPlaybook(playbook)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                    title="View playbook"
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => handleDeletePlaybook(playbook.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                    title="Delete playbook"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Created {new Date(playbook.createdAt).toLocaleDateString()}</span>
                  <span>Updated {new Date(playbook.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Playbook Details Modal */}
      {selectedPlaybook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPlaybook.title}</h2>
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">
                    {selectedPlaybook.stakeholder.name} • {selectedPlaybook.stakeholder.role}
                  </p>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedPlaybook.status)}`}>
                    {selectedPlaybook.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlaybook(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="prose max-w-none">
              {selectedPlaybook.content ? (
                <div 
                  className="text-gray-900 leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedPlaybook.content.replace(/\n/g, '<br>') 
                  }}
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>This playbook is still being generated...</p>
                  <div className="loading loading-spinner loading-md mt-4"></div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Created: {new Date(selectedPlaybook.createdAt).toLocaleString()}</span>
                <span>Last updated: {new Date(selectedPlaybook.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
