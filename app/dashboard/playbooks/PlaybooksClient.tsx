"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState<string>("");
  const [selectedPlaybookType, setSelectedPlaybookType] = useState<string>("");
  const [selectedMeetingGoal, setSelectedMeetingGoal] = useState<string>("");
  const [meetingGoals, setMeetingGoals] = useState<Array<{value: string, label: string, description: string}>>([]);
  const router = useRouter();

  const { playbooks, stakeholders, playbookCredits, planTier } = user;

  // Fetch meeting goals and set default playbook type based on tier
  useEffect(() => {
    const fetchMeetingGoals = async () => {
      try {
        const response = await fetch('/api/meeting-goals');
        if (response.ok) {
          const goals = await response.json();
          setMeetingGoals(goals);
        }
      } catch (error) {
        console.error('Failed to fetch meeting goals:', error);
      }
    };

    fetchMeetingGoals();

    // Set default playbook type based on user tier
    if (planTier === 'STARTER') {
      setSelectedPlaybookType('STAKEHOLDER_ANALYSIS');
    } else if (planTier === 'PRO') {
      setSelectedPlaybookType('GOAL_ORIENTED');
    } else if (planTier === 'DIRECTOR') {
      setSelectedPlaybookType('RELATIONSHIP_ANALYSIS');
    }
  }, [planTier]);

  // Poll for playbook updates if there are pending playbooks
  useEffect(() => {
    const hasPendingPlaybooks = playbooks.some(p => p.status === 'PENDING');
    
    if (!hasPendingPlaybooks) return;

    const interval = setInterval(() => {
      router.refresh();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [playbooks, router]);

  // Show toast notification when playbooks are completed
  useEffect(() => {
    const completedPlaybooks = playbooks.filter(p => p.status === 'COMPLETED');
    
    // Check if there are newly completed playbooks (this is a simple approach)
    // In a real app, you might want to track this more sophisticatedly
    completedPlaybooks.forEach(playbook => {
      const timeSinceUpdate = Date.now() - new Date(playbook.createdAt).getTime();
      // Only show notification for recently completed playbooks (within last 30 seconds)
      if (timeSinceUpdate < 30000) {
        toast.success(`Playbook for ${playbook.stakeholder.name} is ready!`, {
          duration: 5000,
          icon: '🎉',
        });
      }
    });
  }, [playbooks]);

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

  const openGenerateModal = (stakeholderId: string) => {
    setSelectedStakeholder(stakeholderId);
    setShowGenerateModal(true);
  };

  const handleGeneratePlaybook = async () => {
    if (!selectedStakeholder) {
      toast.error('Please select a stakeholder.');
      return;
    }

    if (!selectedPlaybookType) {
      toast.error('Please select a playbook type.');
      return;
    }

    if (selectedPlaybookType === 'GOAL_ORIENTED' && !selectedMeetingGoal) {
      toast.error('Please select a meeting goal for Goal-Oriented Playbooks.');
      return;
    }

    if (playbookCredits <= 0 && planTier === 'STARTER') {
      toast.error('No playbook credits remaining. Upgrade your plan to continue.');
      return;
    }

    setIsGenerating(selectedStakeholder);
    
    try {
      const requestBody: any = {
        stakeholderId: selectedStakeholder,
        playbookType: selectedPlaybookType,
      };

      if (selectedPlaybookType === 'GOAL_ORIENTED') {
        requestBody.meetingGoal = selectedMeetingGoal;
      }

      const response = await fetch('/api/playbooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success('Playbook generation started! Check back in a few minutes.');
        setShowGenerateModal(false);
        setSelectedStakeholder('');
        setSelectedMeetingGoal('');
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to generate playbook. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsGenerating(null);
    }
  };

  const handleDeletePlaybook = async (playbookId: string) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this playbook? This action cannot be undone.'
    );
    
    if (!confirmed) {
      return;
    }

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
                      onClick={() => openGenerateModal(stakeholder.id)}
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
                      onClick={() => openGenerateModal(selectedPlaybook.stakeholder.id)}
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

      {/* Enhanced Playbook Generation Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-lg p-6 max-w-md w-full border border-slate-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Generate Strategic Playbook</h2>
              <button
                onClick={() => {
                  setShowGenerateModal(false);
                  setSelectedStakeholder('');
                  setSelectedMeetingGoal('');
                }}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Stakeholder Display */}
              {selectedStakeholder && (
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Selected Stakeholder</p>
                  <p className="text-white font-medium">
                    {stakeholders.find(s => s.id === selectedStakeholder)?.name}
                  </p>
                  <p className="text-sm text-slate-400">
                    {stakeholders.find(s => s.id === selectedStakeholder)?.title} at{' '}
                    {stakeholders.find(s => s.id === selectedStakeholder)?.company}
                  </p>
                </div>
              )}

              {/* Playbook Type Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Playbook Type
                </label>
                <div className="space-y-2">
                  {planTier === 'STARTER' && (
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Stakeholder Analysis</p>
                          <p className="text-sm text-slate-400">Decode stakeholder psychology</p>
                        </div>
                        <div className="w-4 h-4 bg-brand-sea-green rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(planTier === 'PRO' || planTier === 'DIRECTOR') && (
                    <>
                      <label className="flex items-center p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-brand-sea-green transition-colors">
                        <input
                          type="radio"
                          name="playbookType"
                          value="STAKEHOLDER_ANALYSIS"
                          checked={selectedPlaybookType === 'STAKEHOLDER_ANALYSIS'}
                          onChange={(e) => setSelectedPlaybookType(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <p className="text-white font-medium">Stakeholder Analysis</p>
                            <p className="text-sm text-slate-400">Decode stakeholder psychology</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedPlaybookType === 'STAKEHOLDER_ANALYSIS' 
                              ? 'bg-brand-sea-green border-brand-sea-green' 
                              : 'border-slate-500'
                          }`}>
                            {selectedPlaybookType === 'STAKEHOLDER_ANALYSIS' && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-brand-sea-green transition-colors">
                        <input
                          type="radio"
                          name="playbookType"
                          value="GOAL_ORIENTED"
                          checked={selectedPlaybookType === 'GOAL_ORIENTED'}
                          onChange={(e) => setSelectedPlaybookType(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <p className="text-white font-medium">Goal-Oriented Playbook</p>
                            <p className="text-sm text-slate-400">Win the Meeting - Tactical mastery</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedPlaybookType === 'GOAL_ORIENTED' 
                              ? 'bg-brand-sea-green border-brand-sea-green' 
                              : 'border-slate-500'
                          }`}>
                            {selectedPlaybookType === 'GOAL_ORIENTED' && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </label>
                    </>
                  )}
                  
                  {planTier === 'DIRECTOR' && (
                    <label className="flex items-center p-3 bg-slate-800 rounded-lg border border-slate-600 cursor-pointer hover:border-brand-sea-green transition-colors">
                      <input
                        type="radio"
                        name="playbookType"
                        value="RELATIONSHIP_ANALYSIS"
                        checked={selectedPlaybookType === 'RELATIONSHIP_ANALYSIS'}
                        onChange={(e) => setSelectedPlaybookType(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p className="text-white font-medium">Relationship Analysis</p>
                          <p className="text-sm text-slate-400">Win the Promotion - Relational mastery</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedPlaybookType === 'RELATIONSHIP_ANALYSIS' 
                            ? 'bg-brand-sea-green border-brand-sea-green' 
                            : 'border-slate-500'
                        }`}>
                          {selectedPlaybookType === 'RELATIONSHIP_ANALYSIS' && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              {/* Meeting Goal Selection (only for Goal-Oriented Playbooks) */}
              {selectedPlaybookType === 'GOAL_ORIENTED' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meeting Goal
                  </label>
                  <select
                    value={selectedMeetingGoal}
                    onChange={(e) => setSelectedMeetingGoal(e.target.value)}
                    className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-brand-sea-green focus:outline-none"
                  >
                    <option value="">Select your meeting objective...</option>
                    {meetingGoals.map((goal) => (
                      <option key={goal.value} value={goal.value}>
                        {goal.label}
                      </option>
                    ))}
                  </select>
                  {selectedMeetingGoal && (
                    <p className="text-sm text-slate-400 mt-2">
                      {meetingGoals.find(g => g.value === selectedMeetingGoal)?.description}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowGenerateModal(false);
                    setSelectedStakeholder('');
                    setSelectedMeetingGoal('');
                  }}
                  className="flex-1 px-4 py-2 text-slate-400 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGeneratePlaybook}
                  disabled={isGenerating !== null || !selectedPlaybookType || (selectedPlaybookType === 'GOAL_ORIENTED' && !selectedMeetingGoal)}
                  className="flex-1 px-4 py-2 bg-brand-sea-green text-white rounded-lg hover:bg-brand-sea-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating...' : 'Generate Playbook'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
