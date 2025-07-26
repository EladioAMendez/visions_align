"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonAccount from "@/components/ButtonAccount";
import AddStakeholderModal from '@/components/AddStakeholderModal';
import type { Stakeholder } from "@/lib/generated/prisma";

interface DashboardClientProps {
  stakeholders: Stakeholder[];
}

export default function DashboardClient({ stakeholders }: DashboardClientProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [generatedPlaybook, setGeneratedPlaybook] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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

  

  return (
    <main className="min-h-screen p-8 pb-24 bg-slate-900 text-white">
      <AddStakeholderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStakeholderAdded={handleStakeholderAdded}
      />
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Dashboard</h1>
          <ButtonAccount />
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-brand-sea-green">Your Stakeholders</h2>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary">Add New Stakeholder</button>
          </div>
          <div className="space-y-4">
            {stakeholders.length > 0 ? (
              stakeholders.map((stakeholder) => (
                <div key={stakeholder.id} className="flex items-center justify-between bg-slate-700 p-4 rounded-lg">
                  <div>
                    <p className="font-bold text-white">{stakeholder.name}</p>
                    <a href={stakeholder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-brand-sea-green transition-colors">
                      {stakeholder.linkedinUrl}
                    </a>
                  </div>
                  <button 
                    onClick={() => generatePlaybook(stakeholder.id)} 
                    disabled={!!loadingId}
                    className="btn btn-primary w-full md:w-auto disabled:bg-slate-600 disabled:cursor-not-allowed"
                  >
                    {loadingId === stakeholder.id ? 'Generating...' : 'Generate Playbook'}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-400">You haven't added any stakeholders yet. Add one to get started!</p>
            )}
          </div>
        </div>

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
