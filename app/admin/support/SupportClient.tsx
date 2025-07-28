"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SupportIssue {
  id: string;
  user: string;
  subject: string;
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

interface SystemStats {
  uptime: string;
  responseTime: string;
  errorRate: string;
  activeUsers: number;
}

interface SupportClientProps {
  totalUsers: number;
  recentIssues: SupportIssue[];
  systemStats: SystemStats;
}

export default function SupportClient({ totalUsers, recentIssues, systemStats }: SupportClientProps) {
  const [selectedIssue, setSelectedIssue] = useState<SupportIssue | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-green-600";
      default: return "bg-slate-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-600";
      case "pending": return "bg-yellow-600";
      case "resolved": return "bg-green-600";
      default: return "bg-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Support Dashboard</h1>
          <p className="text-slate-400">Monitor system health and user support requests</p>
        </motion.div>

        {/* System Health Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">System Uptime</p>
                <p className="text-2xl font-bold text-green-400">{systemStats.uptime}</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Response Time</p>
                <p className="text-2xl font-bold text-blue-400">{systemStats.responseTime}</p>
              </div>
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Error Rate</p>
                <p className="text-2xl font-bold text-yellow-400">{systemStats.errorRate}</p>
              </div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-purple-400">{systemStats.activeUsers}</p>
              </div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Support Issues */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-lg border border-slate-700"
          >
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-semibold text-white">Recent Support Issues</h2>
              <p className="text-slate-400 text-sm mt-1">Latest user support requests</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <motion.div
                    key={issue.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600 transition-colors"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-white font-medium">{issue.subject}</p>
                        <p className="text-slate-400 text-sm">{issue.user}</p>
                        <p className="text-slate-500 text-xs mt-1">
                          {new Date(issue.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getPriorityColor(issue.priority)}`}>
                          {issue.priority}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {recentIssues.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-400">No recent support issues</p>
                  <p className="text-slate-500 text-sm">All systems running smoothly! 🎉</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Support Actions & Tools */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-lg border border-slate-700"
          >
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-semibold text-white">Support Tools</h2>
              <p className="text-slate-400 text-sm mt-1">Quick actions and system management</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Send System Announcement
                </button>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Export User Data
                </button>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Run System Health Check
                </button>
                
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  View Error Logs
                </button>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="text-white font-medium mb-3">Quick Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Users:</span>
                      <span className="text-white font-medium">{totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Open Issues:</span>
                      <span className="text-red-400 font-medium">
                        {recentIssues.filter(i => i.status === 'open').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pending Issues:</span>
                      <span className="text-yellow-400 font-medium">
                        {recentIssues.filter(i => i.status === 'pending').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Issue Detail Modal */}
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 rounded-lg border border-slate-700 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedIssue.subject}</h3>
                    <p className="text-slate-400 text-sm">{selectedIssue.user}</p>
                  </div>
                  <button
                    onClick={() => setSelectedIssue(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getPriorityColor(selectedIssue.priority)}`}>
                      {selectedIssue.priority} priority
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(selectedIssue.status)}`}>
                      {selectedIssue.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-slate-400 text-sm">Created:</p>
                    <p className="text-white">{new Date(selectedIssue.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Mark Resolved
                    </button>
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Contact User
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
