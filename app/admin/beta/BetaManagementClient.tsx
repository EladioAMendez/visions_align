"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface BetaUser {
  id: string;
  name: string | null;
  email: string;
  planTier: string;
  hasAccess: boolean;
  createdAt: Date;
  _count: {
    stakeholders: number;
    playbooks: number;
  };
}

interface PendingRequest {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
}

interface RecentSignup {
  id: string;
  name: string | null;
  email: string;
  planTier: string;
  hasAccess: boolean;
  createdAt: Date;
}

interface Props {
  betaUsers: BetaUser[];
  pendingRequests: PendingRequest[];
  recentSignups: RecentSignup[];
}

export default function BetaManagementClient({ betaUsers, pendingRequests, recentSignups }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  const handleGrantAccess = async (userId: string, email: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/admin/toggle-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, hasAccess: true }),
      });

      if (response.ok) {
        toast.success(`Beta access granted to ${email}!`);
        window.location.reload();
      } else {
        throw new Error('Failed to grant access');
      }
    } catch (error) {
      toast.error('Failed to grant beta access');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkGrantAccess = async () => {
    if (selectedEmails.length === 0) {
      toast.error('Please select users first');
      return;
    }

    setIsProcessing(true);
    try {
      const promises = selectedEmails.map(email => {
        const user = pendingRequests.find(u => u.email === email);
        if (user) {
          return fetch('/api/admin/toggle-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, hasAccess: true }),
          });
        }
        return Promise.resolve();
      });

      await Promise.all(promises);
      toast.success(`Beta access granted to ${selectedEmails.length} users!`);
      setSelectedEmails([]);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to grant bulk access');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleEmailSelection = (email: string) => {
    setSelectedEmails(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Beta Management</h1>
        <p className="text-slate-400">Control beta access and monitor beta user activity</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Active Beta Users</p>
              <p className="text-2xl font-bold text-white mt-1">{betaUsers.length}</p>
            </div>
            <div className="bg-green-600 rounded-lg p-3">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pending Requests</p>
              <p className="text-2xl font-bold text-white mt-1">{pendingRequests.length}</p>
            </div>
            <div className="bg-yellow-600 rounded-lg p-3">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">New Signups (7d)</p>
              <p className="text-2xl font-bold text-white mt-1">{recentSignups.length}</p>
            </div>
            <div className="bg-blue-600 rounded-lg p-3">
              <span className="text-2xl">🆕</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">Total Playbooks</p>
              <p className="text-2xl font-bold text-white mt-1">
                {betaUsers.reduce((sum, user) => sum + user._count.playbooks, 0)}
              </p>
            </div>
            <div className="bg-purple-600 rounded-lg p-3">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pending Beta Requests */}
      {pendingRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-lg border border-slate-700 mb-8"
        >
          <div className="p-6 border-b border-slate-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Pending Beta Requests</h2>
              {selectedEmails.length > 0 && (
                <button
                  onClick={handleBulkGrantAccess}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
                >
                  Grant Access to {selectedEmails.length} Users
                </button>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmails(pendingRequests.map(u => u.email));
                        } else {
                          setSelectedEmails([]);
                        }
                      }}
                      checked={selectedEmails.length === pendingRequests.length && pendingRequests.length > 0}
                      className="rounded border-slate-600 bg-slate-700 text-red-600 focus:ring-red-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Requested
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {pendingRequests.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="hover:bg-slate-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(user.email)}
                        onChange={() => toggleEmailSelection(user.email)}
                        className="rounded border-slate-600 bg-slate-700 text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {user.name || "Anonymous"}
                        </p>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleGrantAccess(user.id, user.email)}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors disabled:opacity-50"
                      >
                        Grant Access
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Active Beta Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800 rounded-lg border border-slate-700 mb-8"
      >
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Active Beta Users</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {betaUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="hover:bg-slate-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.planTier === 'DIRECTOR' ? 'bg-purple-600 text-white' :
                      user.planTier === 'PRO' ? 'bg-blue-600 text-white' :
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {user.planTier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <div>
                      <p>{user._count.stakeholders} stakeholders</p>
                      <p>{user._count.playbooks} playbooks</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Signups */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800 rounded-lg border border-slate-700"
      >
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Recent Signups (Last 7 Days)</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Signed Up
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {recentSignups.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="hover:bg-slate-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-slate-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.hasAccess ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {user.hasAccess ? 'Beta Access' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
