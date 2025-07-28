"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import AddStakeholderModal from '@/components/AddStakeholderModal';
import type { Stakeholder, PlanTier, Playbook } from "@/lib/generated/prisma";

interface DashboardClientProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    planTier: PlanTier;
    playbookCredits: number;
    hasAccess: boolean;
    createdAt: Date;
  } | null;
  stakeholders: Stakeholder[];
  recentPlaybooks: (Playbook & {
    stakeholder: {
      name: string;
    };
  })[];
}

export default function DashboardClient({ user, stakeholders, recentPlaybooks }: DashboardClientProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [generatedPlaybook, setGeneratedPlaybook] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [actionsRef, actionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stakeholdersRef, stakeholdersInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleStakeholderAdded = () => {
    router.refresh();
  };

  const generatePlaybook = async (stakeholderId: string) => {
    setLoadingId(stakeholderId);
    setGeneratedPlaybook(null);
    try {
      const response = await fetch('/api/playbooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stakeholderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate playbook');
      }

      const data = await response.json();
      setGeneratedPlaybook(data);
    } catch (error) {
      console.error(error);
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setLoadingId(null);
    }
  };

  

  const getPlanDisplayName = (tier: PlanTier) => {
    switch (tier) {
      case 'PRO': return 'Pro';
      case 'DIRECTOR': return 'Director';
      case 'STARTER': return 'Starter';
      default: return 'Starter';
    }
  };

  const getPlanColor = (tier: PlanTier) => {
    switch (tier) {
      case 'PRO': return 'text-blue-400';
      case 'DIRECTOR': return 'text-purple-400';
      case 'STARTER': return 'text-green-400';
      default: return 'text-green-400';
    }
  };

  return (
    <main className="p-8 pb-24 bg-slate-900 text-white">
      <AddStakeholderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStakeholderAdded={handleStakeholderAdded}
      />
      <section className="max-w-6xl mx-auto space-y-8">
        {/* Header with Welcome Message */}
        <motion.div 
          ref={headerRef}
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div>
            <motion.h1 
              className="text-3xl md:text-4xl font-extrabold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Welcome back, {user?.name?.split(' ')[0] || 'there'}!
            </motion.h1>
            <motion.p 
              className="text-slate-400 mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              Ready to turn your next meeting into a strategic win?
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >

          </motion.div>
        </motion.div>

        {/* Plan & Credits Overview */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          {[
            {
              title: 'Current Plan',
              value: getPlanDisplayName(user?.planTier || 'STARTER'),
              color: getPlanColor(user?.planTier || 'STARTER'),
              extra: user?.planTier === 'STARTER' && (
                <Link href="/#pricing" className="text-sm text-brand-sea-green hover:underline mt-2 inline-block">
                  Upgrade Plan →
                </Link>
              )
            },
            {
              title: 'Playbook Credits',
              value: user?.playbookCredits || 0,
              color: 'text-brand-sea-green',
              subtitle: user?.planTier === 'STARTER' ? 'remaining this month' : 
                       user?.planTier === 'PRO' ? 'of 10 this month' : 
                       'unlimited'
            },
            {
              title: 'Stakeholders',
              value: stakeholders.length,
              color: 'text-white',
              subtitle: user?.planTier === 'STARTER' ? 'Add more with Pro' : 
                       user?.planTier === 'PRO' ? 'up to 25 total' : 
                       'unlimited'
            }
          ].map((stat, index) => (
            <motion.div 
              key={stat.title}
              className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-sm text-slate-400 mt-1">{stat.subtitle}</p>
              )}
              {stat.extra}
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          ref={actionsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={actionsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.div 
            className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={actionsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button 
                onClick={() => setIsModalOpen(true)} 
                className="btn btn-primary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                + Add New Stakeholder
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/dashboard/playbooks" 
                  className="block w-full bg-slate-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-slate-600 transition-colors text-center"
                >
                  View All Playbooks
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={actionsInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentPlaybooks.length > 0 ? (
                recentPlaybooks.slice(0, 3).map((playbook, index) => (
                  <motion.div 
                    key={playbook.id} 
                    className="flex items-center justify-between py-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={actionsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 * index, ease: 'easeOut' }}
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{playbook.stakeholder.name}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(playbook.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <motion.span 
                      className={`px-2 py-1 rounded text-xs ${
                        playbook.status === 'COMPLETED' ? 'bg-green-900 text-green-300' :
                        playbook.status === 'PENDING' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={actionsInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.2 + (0.1 * index), ease: 'easeOut' }}
                    >
                      {playbook.status.toLowerCase()}
                    </motion.span>
                  </motion.div>
                ))
              ) : (
                <motion.p 
                  className="text-slate-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={actionsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  No playbooks generated yet
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Stakeholders Section */}
        <motion.div 
          ref={stakeholdersRef}
          className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
          initial={{ opacity: 0, y: 40 }}
          animate={stakeholdersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <motion.div 
            className="flex justify-between items-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={stakeholdersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
          >
            <h2 className="text-2xl font-bold text-brand-sea-green">Your Stakeholders</h2>
            <motion.button 
              onClick={() => setIsModalOpen(true)} 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Add Stakeholder
            </motion.button>
          </motion.div>
          
          {stakeholders.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={stakeholdersInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            >
              {stakeholders.slice(0, 6).map((stakeholder, index) => (
                <motion.div 
                  key={stakeholder.id} 
                  className="bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={stakeholdersInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index, ease: 'easeOut' }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="mb-3">
                    <h4 className="font-bold text-white">{stakeholder.name}</h4>
                    {stakeholder.title && (
                      <p className="text-sm text-slate-400">{stakeholder.title}</p>
                    )}
                    {stakeholder.company && (
                      <p className="text-sm text-slate-500">{stakeholder.company}</p>
                    )}
                  </div>
                  <motion.button 
                    onClick={() => generatePlaybook(stakeholder.id)} 
                    disabled={!!loadingId || (user?.playbookCredits || 0) <= 0}
                    className="w-full btn btn-primary btn-sm disabled:bg-slate-600 disabled:cursor-not-allowed"
                    whileHover={!loadingId && (user?.playbookCredits || 0) > 0 ? { scale: 1.05 } : {}}
                    whileTap={!loadingId && (user?.playbookCredits || 0) > 0 ? { scale: 0.95 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    {loadingId === stakeholder.id ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Generating...
                      </motion.span>
                    ) : (
                      'Generate Playbook'
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={stakeholdersInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            >
              <motion.div 
                className="text-slate-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={stakeholdersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
              >
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              <motion.h3 
                className="text-lg font-medium text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={stakeholdersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
              >
                No stakeholders yet
              </motion.h3>
              <motion.p 
                className="text-slate-400 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={stakeholdersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9, ease: 'easeOut' }}
              >
                Add your first stakeholder to start generating personalized playbooks for your meetings.
              </motion.p>
              <motion.button 
                onClick={() => setIsModalOpen(true)} 
                className="btn btn-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={stakeholdersInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Your First Stakeholder
              </motion.button>
            </motion.div>
          )}
          
          {stakeholders.length > 6 && (
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={stakeholdersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
            >
              <Link 
                href="/dashboard/stakeholders" 
                className="text-brand-sea-green hover:underline"
              >
                View all {stakeholders.length} stakeholders →
              </Link>
            </motion.div>
          )}
        </motion.div>

        {generatedPlaybook && (
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-brand-sea-green mb-4">Your Generated Playbook</h3>
            <pre className="bg-slate-900 p-4 rounded-md text-sm text-slate-200 overflow-x-auto">
              {JSON.stringify(generatedPlaybook, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}
