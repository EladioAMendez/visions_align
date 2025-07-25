"use client";

import { useState } from 'react';
import ButtonAccount from "@/components/ButtonAccount";

export default function DashboardClient() {
  const [loading, setLoading] = useState(false);
  const [playbook, setPlaybook] = useState(null);

  const generatePlaybook = async () => {
    setLoading(true);
    setPlaybook(null);
    try {
      const response = await fetch('/api/playbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to generate playbook');
      }
      const data = await response.json();
      setPlaybook(data);
    } catch (error) {
      console.error(error);
      alert('Error generating playbook. Are you logged in?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 pb-24 bg-slate-900 text-white">
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Dashboard</h1>
          <ButtonAccount />
        </div>
        
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-brand-sea-green mb-4">Generate Your Playbook</h2>
          <p className="text-slate-300 mb-6">Click the button below to generate a sample AI-powered playbook for your next critical meeting. This demonstrates how VisionsAlign can decode stakeholder psychology and provide you with a strategic advantage.</p>
          <button 
            onClick={generatePlaybook} 
            disabled={loading}
            className="btn btn-primary w-full md:w-auto disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Sample Playbook'}
          </button>
        </div>

        {playbook && (
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg mt-8 animate-fade-in">
            <h3 className="text-2xl font-bold text-brand-sea-green mb-4">Your Generated Playbook</h3>
            <pre className="bg-slate-900 p-4 rounded-md text-sm text-slate-200 overflow-x-auto">
              {JSON.stringify(playbook, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}
