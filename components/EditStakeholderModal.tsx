"use client";

import { useState, FormEvent, useEffect } from 'react';

interface Stakeholder {
  id: string;
  name: string;
  linkedinUrl: string;
  title?: string;
  company?: string;
  influence: string;
  relationship: string;
}

interface EditStakeholderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStakeholderUpdated: () => void;
  stakeholder: Stakeholder | null;
}

export default function EditStakeholderModal({ isOpen, onClose, onStakeholderUpdated, stakeholder }: EditStakeholderModalProps) {
  const [name, setName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [influence, setInfluence] = useState('MEDIUM');
  const [relationship, setRelationship] = useState('NEUTRAL');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stakeholder) {
      setName(stakeholder.name);
      setLinkedinUrl(stakeholder.linkedinUrl);
      setTitle(stakeholder.title || '');
      setCompany(stakeholder.company || '');
      setInfluence(stakeholder.influence);
      setRelationship(stakeholder.relationship);
    }
  }, [stakeholder]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stakeholder) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/stakeholders/${stakeholder.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, linkedinUrl, title, company, influence, relationship }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update stakeholder');
      }

      onStakeholderUpdated();
      onClose();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !stakeholder) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">Edit Stakeholder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm text-white focus:ring-brand-sea-green focus:border-brand-sea-green"
              required
            />
          </div>
          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-slate-300">LinkedIn URL</label>
            <input
              id="linkedinUrl"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm text-white focus:ring-brand-sea-green focus:border-brand-sea-green"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm text-white focus:ring-brand-sea-green focus:border-brand-sea-green"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-300">Company</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm text-white focus:ring-brand-sea-green focus:border-brand-sea-green"
            />
          </div>
          <div>
            <label htmlFor="influence" className="block text-sm font-medium text-slate-300">Influence Level</label>
            <select
              id="influence"
              value={influence}
              onChange={(e) => setInfluence(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm text-white focus:ring-brand-sea-green focus:border-brand-sea-green"
            >
              <option value="HIGH">High Influence</option>
              <option value="MEDIUM">Medium Influence</option>
              <option value="LOW">Low Influence</option>
            </select>
          </div>
          <div>
            <label htmlFor="relationship" className="block text-sm font-medium text-slate-300">Relationship Status</label>
            <select
              id="relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm text-white focus:ring-brand-sea-green focus:border-brand-sea-green"
            >
              <option value="ALLY">Strong Ally</option>
              <option value="NEUTRAL">Neutral</option>
              <option value="SKEPTICAL">Skeptical</option>
              <option value="OPPONENT">Opponent</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Stakeholder'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
