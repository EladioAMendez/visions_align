"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  title?: string;
  company?: string;
}

interface PlaybookWithStakeholder {
  id: string;
  status: string;
  createdAt: Date;
  stakeholder: Stakeholder;
}

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

interface User {
  id: string;
  name?: string;
  email: string;
  planTier: string;
  playbookCredits: number;
  playbooks: PlaybookWithStakeholder[];
  stakeholders: Stakeholder[];
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
      case 'COMPLETED': return 'bg-slate-800 text-emerald-300 border-emerald-800/30';
      case 'IN_PROGRESS': return 'bg-slate-800 text-amber-300 border-amber-800/30';
      case 'DRAFT': return 'bg-slate-800 text-slate-300 border-slate-700';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
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
        className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 mb-8"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Generate New Playbook</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <select
              value={selectedStakeholder}
              onChange={(e) => setSelectedStakeholder(e.target.value)}
              className="bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isGenerating}
            >
              <option value="" className="bg-slate-800 text-white">Select a stakeholder...</option>
              {stakeholders.map(stakeholder => (
                <option key={stakeholder.id} value={stakeholder.id} className="bg-slate-800 text-white">
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
          <p className="text-slate-400 text-sm mt-2">
            You need to add stakeholders first. 
            <button
              onClick={() => router.push('/dashboard/stakeholders')}
              className="text-blue-400 hover:text-blue-300 ml-1 transition-colors"
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
        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Playbooks</p>
              <p className="text-2xl font-bold text-white mt-1">{playbooks.length}</p>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800/30">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
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

        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">In Progress</p>
              <p className="text-2xl font-bold text-white mt-1">
                {playbooks.filter(p => p.status === 'IN_PROGRESS').length}
              </p>
            </div>
            <div className="bg-amber-900/30 rounded-lg p-3 border border-amber-800/30">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-white mt-1">
                {playbooks.filter(p => p.status === 'COMPLETED').length}
              </p>
            </div>
            <div className="bg-emerald-900/30 rounded-lg p-3 border border-emerald-800/30">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
          className="text-center py-12 bg-slate-900 rounded-lg shadow-lg border border-slate-700"
        >
          <div className="bg-slate-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            {playbooks.length === 0 ? "No playbooks yet" : "No playbooks match your search"}
          </h3>
          <p className="text-slate-400 mb-6">
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
                className="bg-slate-800 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="bg-slate-800 text-white">Select stakeholder...</option>
                {stakeholders.map(stakeholder => (
                  <option key={stakeholder.id} value={stakeholder.id} className="bg-slate-800 text-white">
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
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-700 hover:border-slate-600 hover:shadow-xl transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedPlaybook(playbook)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors mb-1 line-clamp-2">
                    {playbook.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-2">
                    {playbook.stakeholder.name} • {playbook.stakeholder.role}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(playbook.status)}`}>
                      {playbook.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getInfluenceColor(playbook.stakeholder.influence)}`}>
                      {playbook.stakeholder.influence} Influence
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlaybook(playbook);
                    }}
                    className="text-slate-400 hover:text-blue-400 p-2 rounded-lg hover:bg-slate-800 transition-all"
                    title="View playbook"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlaybook(playbook.id);
                    }}
                    className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition-all"
                    title="Delete playbook"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <div className="flex justify-between items-center text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Created {new Date(playbook.createdAt).toLocaleDateString()}
                  </span>
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
            className="bg-slate-900 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-slate-700"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedPlaybook.title}</h2>
                <div className="flex items-center gap-4">
                  <p className="text-slate-400 text-sm">Stakeholder • {selectedPlaybook.stakeholder.role}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedPlaybook.status)}`}>
                    {selectedPlaybook.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlaybook(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="prose max-w-none">
              {selectedPlaybook.content ? (
                <div 
                  className="text-white leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedPlaybook.content.replace(/\n/g, '<br>') 
                  }}
                />
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <p>This playbook is still being generated...</p>
                  <div className="loading loading-spinner loading-md mt-4"></div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-700 pt-4 mt-6">
              <div className="flex justify-between items-center text-sm text-slate-400">
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
