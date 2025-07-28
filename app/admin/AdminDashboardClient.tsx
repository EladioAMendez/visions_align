"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  paidUsers: number;
  totalStakeholders: number;
  totalPlaybooks: number;
  conversionRate: string;
}

interface RecentUser {
  id: string;
  name: string | null;
  email: string;
  planTier: string;
  createdAt: Date;
  hasAccess: boolean;
}

interface RecentPlaybook {
  id: string;
  status: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string;
  };
  stakeholder: {
    name: string;
  };
}

interface Props {
  stats: AdminStats;
  recentUsers: RecentUser[];
  recentPlaybooks: RecentPlaybook[];
}

export default function AdminDashboardClient({ stats, recentUsers, recentPlaybooks }: Props) {
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: "👥",
      color: "bg-blue-600",
      change: "+12% this week"
    },
    {
      title: "Active Users (7d)",
      value: stats.activeUsers,
      icon: "⚡",
      color: "bg-green-600",
      change: "+8% this week"
    },
    {
      title: "Paid Users",
      value: stats.paidUsers,
      icon: "💎",
      color: "bg-purple-600",
      change: `${stats.conversionRate}% conversion`
    },
    {
      title: "Total Playbooks",
      value: stats.totalPlaybooks,
      icon: "📋",
      color: "bg-orange-600",
      change: "+23% this week"
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View, edit, and upgrade user accounts",
      href: "/admin/users",
      icon: "👤",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Beta Management",
      description: "Control beta access and feature flags",
      href: "/admin/beta",
      icon: "🧪",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Analytics",
      description: "View detailed usage and conversion metrics",
      href: "/admin/analytics",
      icon: "📊",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Support",
      description: "Help users and manage support tickets",
      href: "/admin/support",
      icon: "🎧",
      color: "bg-orange-500 hover:bg-orange-600"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Monitor your VisionsAlign platform and manage beta users</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value.toLocaleString()}</p>
                <p className="text-green-400 text-xs mt-1">{stat.change}</p>
              </div>
              <div className={`${stat.color} rounded-lg p-3`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={action.href}
                className={`${action.color} text-white p-4 rounded-lg block transition-all duration-200 shadow-lg hover:shadow-xl`}
              >
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2">{action.icon}</span>
                  <h3 className="font-semibold">{action.title}</h3>
                </div>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800 rounded-lg p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Users</h2>
            <Link
              href="/admin/users"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{user.name || "Anonymous"}</p>
                  <p className="text-slate-400 text-sm">{user.email}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.planTier === 'DIRECTOR' ? 'bg-purple-600 text-white' :
                    user.planTier === 'PRO' ? 'bg-blue-600 text-white' :
                    'bg-slate-600 text-slate-300'
                  }`}>
                    {user.planTier}
                  </span>
                  {user.hasAccess && (
                    <div className="text-green-400 text-xs mt-1">✓ Access</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Playbooks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-lg p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Playbooks</h2>
            <Link
              href="/admin/analytics"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              View Analytics →
            </Link>
          </div>
          <div className="space-y-3">
            {recentPlaybooks.map((playbook, index) => (
              <motion.div
                key={playbook.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm line-clamp-1">
                      Playbook for {playbook.stakeholder.name}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {playbook.user.name || playbook.user.email} → {playbook.stakeholder.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(playbook.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ml-2 ${
                    playbook.status === 'COMPLETED' ? 'bg-green-600 text-white' :
                    playbook.status === 'PENDING' ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {playbook.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
