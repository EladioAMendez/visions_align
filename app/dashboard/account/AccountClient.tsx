"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  planTier: string;
  hasAccess: boolean;
  linkedinUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    stakeholders: number;
    playbooks: number;
  };
}

interface Props {
  user: User;
}

export default function AccountClient({ user }: Props) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email,
    linkedinUrl: user.linkedinUrl || "",
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: profileData.name.trim(),
          linkedinUrl: profileData.linkedinUrl.trim() || null 
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        router.refresh();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Account deleted successfully");
        await signOut({ callbackUrl: "/" });
      } else {
        throw new Error('Failed to delete account');
      }
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
      >
        <div className="flex items-center mb-6">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Profile"}
              className="w-16 h-16 rounded-full border-2 border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
              <span className="text-2xl font-medium text-gray-600">
                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-900">{user.name || "Anonymous"}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                user.planTier === 'DIRECTOR' ? 'bg-purple-100 text-purple-800' :
                user.planTier === 'PRO' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {user.planTier} Plan
              </span>
              {user.hasAccess && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              className="input input-bordered w-full max-w-md"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              className="input input-bordered w-full max-w-md"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed. Contact support if you need to update your email.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile URL
              {user.planTier === 'DIRECTOR' && (
                <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                  Required for Relationship Playbooks
                </span>
              )}
            </label>
            <input
              type="url"
              value={profileData.linkedinUrl}
              onChange={(e) => setProfileData({...profileData, linkedinUrl: e.target.value})}
              className="input input-bordered w-full max-w-md"
              placeholder="https://linkedin.com/in/your-profile"
            />
            <p className="text-xs text-gray-500 mt-1">
              {user.planTier === 'DIRECTOR' 
                ? 'Required for The Connector AI to perform relationship analysis between you and stakeholders.'
                : 'Optional. Upgrade to Director tier to unlock relationship analysis features.'
              }
            </p>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </button>
        </form>
      </motion.div>

      {/* Account Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{user._count.stakeholders}</div>
            <div className="text-sm text-gray-600">Stakeholders</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{user._count.playbooks}</div>
            <div className="text-sm text-gray-600">Playbooks Generated</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {Math.floor((new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Account created: {new Date(user.createdAt).toLocaleDateString()}</span>
            <span>Last updated: {new Date(user.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Authentication</h3>
              <p className="text-sm text-gray-600">Signed in with Google OAuth</p>
            </div>
            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
              Secure
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Data Encryption</h3>
              <p className="text-sm text-gray-600">All data is encrypted in transit and at rest</p>
            </div>
            <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
              Protected
            </span>
          </div>
        </div>
      </motion.div>

      {/* Actions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Sign Out</h3>
              <p className="text-sm text-gray-600">Sign out of your account on this device</p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-outline"
            >
              Sign Out
            </button>
          </div>

          <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h3 className="font-medium text-red-900">Delete Account</h3>
              <p className="text-sm text-red-600">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn btn-error btn-outline"
            >
              Delete Account
            </button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h2>
              <p className="text-gray-600">
                This action cannot be undone. This will permanently delete your account 
                and remove all your stakeholders, playbooks, and data from our servers.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-red-900 mb-2">This will delete:</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• {user._count.stakeholders} stakeholders</li>
                <li>• {user._count.playbooks} playbooks</li>
                <li>• All account settings and preferences</li>
                <li>• Billing history and subscription data</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-ghost flex-1"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="btn btn-error flex-1"
              >
                {isDeleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
