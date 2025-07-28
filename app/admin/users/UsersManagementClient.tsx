"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  name: string | null;
  email: string;
  planTier: string;
  hasAccess: boolean;
  stripeCustomerId: string | null;
  stripePriceId: string | null;
  createdAt: Date;
  updatedAt: Date;
  stakeholders: Array<{
    id: string;
    name: string;
  }>;
  playbooks: Array<{
    id: string;
    status: string;
    createdAt: Date;
  }>;
  _count: {
    stakeholders: number;
    playbooks: number;
  };
}

interface Props {
  users: User[];
}

export default function UsersManagementClient({ users }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTier, setFilterTier] = useState("ALL");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === "ALL" || user.planTier === filterTier;
    return matchesSearch && matchesTier;
  });

  const handleUpgradeUser = async (userId: string, newTier: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch('/api/admin/upgrade-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, planTier: newTier, hasAccess: true }),
      });

      if (response.ok) {
        toast.success(`User upgraded to ${newTier} successfully!`);
        window.location.reload(); // Refresh to show updated data
      } else {
        throw new Error('Failed to upgrade user');
      }
    } catch (error) {
      toast.error('Failed to upgrade user');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleAccess = async (userId: string, hasAccess: boolean) => {
    setIsUpdating(true);
    try {
      const response = await fetch('/api/admin/toggle-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, hasAccess: !hasAccess }),
      });

      if (response.ok) {
        toast.success(`User access ${!hasAccess ? 'granted' : 'revoked'} successfully!`);
        window.location.reload();
      } else {
        throw new Error('Failed to toggle access');
      }
    } catch (error) {
      toast.error('Failed to toggle access');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-slate-400">Manage user accounts, upgrades, and beta access</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Filter by Plan
            </label>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="ALL">All Plans</option>
              <option value="STARTER">Starter</option>
              <option value="PRO">Pro</option>
              <option value="DIRECTOR">Director</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-white">{users.length}</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Starter Users</p>
          <p className="text-2xl font-bold text-white">
            {users.filter(u => u.planTier === 'STARTER').length}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Pro Users</p>
          <p className="text-2xl font-bold text-white">
            {users.filter(u => u.planTier === 'PRO').length}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm">Director Users</p>
          <p className="text-2xl font-bold text-white">
            {users.filter(u => u.planTier === 'DIRECTOR').length}
          </p>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
      >
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
                  Access
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers.map((user, index) => (
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.hasAccess ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {user.hasAccess ? 'Granted' : 'Denied'}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      {/* Upgrade Buttons */}
                      {user.planTier !== 'PRO' && (
                        <button
                          onClick={() => handleUpgradeUser(user.id, 'PRO')}
                          disabled={isUpdating}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors disabled:opacity-50"
                        >
                          → Pro
                        </button>
                      )}
                      {user.planTier !== 'DIRECTOR' && (
                        <button
                          onClick={() => handleUpgradeUser(user.id, 'DIRECTOR')}
                          disabled={isUpdating}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs transition-colors disabled:opacity-50"
                        >
                          → Director
                        </button>
                      )}
                      
                      {/* Access Toggle */}
                      <button
                        onClick={() => handleToggleAccess(user.id, user.hasAccess)}
                        disabled={isUpdating}
                        className={`px-2 py-1 rounded text-xs transition-colors disabled:opacity-50 ${
                          user.hasAccess 
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {user.hasAccess ? 'Revoke' : 'Grant'}
                      </button>
                      
                      {/* View Details */}
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="bg-slate-600 hover:bg-slate-500 text-white px-2 py-1 rounded text-xs transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Basic Info</h3>
                <div className="bg-slate-700 rounded p-4 space-y-2">
                  <p className="text-slate-300"><strong>Name:</strong> {selectedUser.name || "Anonymous"}</p>
                  <p className="text-slate-300"><strong>Email:</strong> {selectedUser.email}</p>
                  <p className="text-slate-300"><strong>Plan:</strong> {selectedUser.planTier}</p>
                  <p className="text-slate-300"><strong>Access:</strong> {selectedUser.hasAccess ? "Granted" : "Denied"}</p>
                  <p className="text-slate-300"><strong>Joined:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Stakeholders ({selectedUser._count.stakeholders})</h3>
                <div className="bg-slate-700 rounded p-4">
                  {selectedUser.stakeholders.length > 0 ? (
                    <div className="space-y-2">
                      {selectedUser.stakeholders.map(stakeholder => (
                        <p key={stakeholder.id} className="text-slate-300">• {stakeholder.name}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400">No stakeholders added yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Recent Playbooks ({selectedUser._count.playbooks})</h3>
                <div className="bg-slate-700 rounded p-4">
                  {selectedUser.playbooks.length > 0 ? (
                    <div className="space-y-2">
                      {selectedUser.playbooks.map(playbook => (
                        <div key={playbook.id} className="flex justify-between items-center">
                          <p className="text-slate-300">Playbook #{playbook.id.slice(-8)}</p>
                          <span className={`px-2 py-1 rounded text-xs ${
                            playbook.status === 'COMPLETED' ? 'bg-green-600' :
                            playbook.status === 'PENDING' ? 'bg-yellow-600' :
                            'bg-red-600'
                          } text-white`}>
                            {playbook.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400">No playbooks generated yet</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
