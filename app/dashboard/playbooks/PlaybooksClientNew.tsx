"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Stakeholder {
  id: string;
  name: string;
  title?: string;
  company?: string;
}

interface PlaybookWithStakeholder {
  id: string;
  status: string;
  createdAt: Date;
  stakeholder: Stakeholder;
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
}

export default function PlaybooksClient({ user }: Props) {
  const [selectedPlaybook, setSelectedPlaybook] = useState<PlaybookWithStakeholder | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const router = useRouter();

  const { playbooks, stakeholders, playbookCredits, planTier } = user;

  const filteredPlaybooks = playbooks.filter(playbook => {
    const matchesSearch = playbook.stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || playbook.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'FAILED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleGeneratePlaybook = async (stakeholderId: string) => {
    if (playbookCredits <= 0 && planTier === 'STARTER') {
      toast.error('No playbook credits remaining. Upgrade your plan to continue.');
      return;
    }

    setIsGenerating(stakeholderId);
    
    try {
      const response = await fetch('/api/playbooks/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stakeholderId }),
      });

      if (response.ok) {
        toast.success('Playbook generation started! Check back in a few minutes.');
        router.refresh();
      } else {
        toast.error('Failed to generate playbook. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDeletePlaybook = async (playbookId: string) => {
    try {
      const response = await fetch(`/api/playbooks/${playbookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Playbook deleted successfully');
        router.refresh();
        setSelectedPlaybook(null);
      } else {
        toast.error('Failed to delete playbook');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with prominent Create Playbook CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Playbooks</h1>
              <p className="text-slate-400">Generate strategic playbooks for your stakeholders</p>
            </div>
            
            {/* Credits Display */}
            <div className="text-right">
              <p className="text-sm text-slate-400">Playbook Credits</p>
              <p className="text-2xl font-bold text-brand-sea-green">
                {planTier === 'STARTER' ? playbookCredits : '∞'}
              </p>
              <p className="text-xs text-slate-500">
                {planTier === 'STARTER' ? 'remaining' : 'unlimited'}
              </p>
            </div>
          </div>

          {/* Prominent Create New Playbook Section */}
          <div className="bg-gradient-to-r from-brand-sea-green to-blue-600 rounded-xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">🚀 Ready to Create Your Next Strategic Playbook?</h2>
                <p className="text-blue-100 mb-4">
                  Turn your next meeting into a strategic win. Generate AI-powered playbooks for your stakeholders.
                </p>
                <div className="flex items-center gap-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    ⚡ AI-Powered Analysis
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    📊 Data-Driven Insights
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    🎯 Executive-Ready
                  </span>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => router.push('/dashboard/stakeholders')}
                  className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors shadow-lg border border-slate-600"
                >
                  Choose Stakeholder →
                </button>
                <p className="text-xs text-blue-100 mt-2">
                  {stakeholders.length} stakeholders available
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Generate from Existing Stakeholders */}
        {stakeholders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Generate for Existing Stakeholders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stakeholders.slice(0, 6).map((stakeholder) => (
                <div key={stakeholder.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:shadow-lg hover:bg-slate-750 transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{stakeholder.name}</h4>
                      <p className="text-sm text-slate-400">
                        {stakeholder.title || stakeholder.company || 'Stakeholder'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleGeneratePlaybook(stakeholder.id)}
                      disabled={isGenerating === stakeholder.id || (playbookCredits <= 0 && planTier === 'STARTER')}
                      className="bg-brand-sea-green text-white px-4 py-2 rounded-lg hover:bg-brand-sea-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating === stakeholder.id ? (
                        <span className="flex items-center gap-2">
                          <span className="loading loading-spinner loading-sm"></span>
                          Generating...
                        </span>
                      ) : (
                        'Generate'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Playbooks</p>
                <p className="text-2xl font-bold text-white mt-1">{playbooks.length}</p>
              </div>
              <div className="bg-blue-600 rounded-lg p-3">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {playbooks.filter(p => p.status === 'COMPLETED').length}
                </p>
              </div>
              <div className="bg-green-600 rounded-lg p-3">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {playbooks.filter(p => p.status === 'PENDING').length}
                </p>
              </div>
              <div className="bg-yellow-600 rounded-lg p-3">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-700 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by stakeholder name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-sea-green focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-sea-green focus:border-transparent"
            >
              <option value="ALL" className="bg-slate-700 text-white">All Status</option>
              <option value="PENDING" className="bg-slate-700 text-white">Pending</option>
              <option value="COMPLETED" className="bg-slate-700 text-white">Completed</option>
              <option value="FAILED" className="bg-slate-700 text-white">Failed</option>
            </select>
          </div>
        </motion.div>

        {/* Playbooks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-lg shadow-sm border border-slate-700"
        >
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Your Playbooks</h2>
          </div>

          <div className="p-6">
            {filteredPlaybooks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-white mb-2">No playbooks yet</h3>
                <p className="text-slate-400 mb-6">Generate your first strategic playbook to get started</p>
                <button
                  onClick={() => router.push('/dashboard/stakeholders')}
                  className="bg-brand-sea-green text-white px-6 py-3 rounded-lg hover:bg-brand-sea-green/90 transition-colors"
                >
                  Create Your First Playbook
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPlaybooks.map((playbook) => (
                  <motion.div
                    key={playbook.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-slate-600 rounded-lg p-4 cursor-pointer hover:shadow-lg hover:bg-slate-750 transition-all bg-slate-700"
                    onClick={() => setSelectedPlaybook(playbook)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">
                          Playbook for {playbook.stakeholder.name}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {playbook.stakeholder.title || playbook.stakeholder.company || 'Stakeholder'}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                          Created {new Date(playbook.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(playbook.status)}`}>
                          {playbook.status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePlaybook(playbook.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Playbook Detail Modal */}
        {selectedPlaybook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPlaybook(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Playbook for {selectedPlaybook.stakeholder.name}
                    </h2>
                    <div className="flex items-center gap-4">
                      <p className="text-gray-600">
                        {selectedPlaybook.stakeholder.title || selectedPlaybook.stakeholder.company || 'Stakeholder'}
                      </p>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedPlaybook.status)}`}>
                        {selectedPlaybook.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPlaybook(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {selectedPlaybook.status === 'COMPLETED' ? (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Strategic Playbook Content</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600">
                        Playbook content would be displayed here when available from the AI generation process.
                      </p>
                    </div>
                  </div>
                ) : selectedPlaybook.status === 'PENDING' ? (
                  <div className="text-center py-8">
                    <div className="loading loading-spinner loading-lg text-brand-sea-green mb-4"></div>
                    <h3 className="font-semibold text-gray-900 mb-2">Generating Your Playbook</h3>
                    <p className="text-gray-600">
                      Our AI is analyzing your stakeholder and creating a strategic playbook. This usually takes 2-3 minutes.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h3 className="font-semibold text-gray-900 mb-2">Generation Failed</h3>
                    <p className="text-gray-600 mb-4">
                      There was an issue generating this playbook. Please try again.
                    </p>
                    <button
                      onClick={() => handleGeneratePlaybook(selectedPlaybook.stakeholder.id)}
                      className="bg-brand-sea-green text-white px-4 py-2 rounded-lg hover:bg-brand-sea-green/90 transition-colors"
                    >
                      Retry Generation
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
