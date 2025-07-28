"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import config from "@/config";

interface User {
  id: string;
  name: string | null;
  email: string;
  planTier: string;
  hasAccess: boolean;
  stripeCustomerId: string | null;
  stripePriceId: string | null;
  createdAt: Date;
  _count: {
    stakeholders: number;
    playbooks: number;
  };
}

interface Props {
  user: User;
}

export default function BillingClient({ user }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const currentPlan = config.stripe.plans.find(plan => plan.name === user.planTier) || config.stripe.plans[0];
  const isFreePlan = user.planTier === 'FREE';
  const isPaidPlan = user.planTier === 'PRO' || user.planTier === 'DIRECTOR';

  const handleUpgrade = async (priceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      toast.error('Failed to start upgrade process');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        throw new Error('Failed to access customer portal');
      }
    } catch (error) {
      toast.error('Failed to access billing portal');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanFeatures = (planName: string) => {
    switch (planName) {
      case 'FREE':
        return [
          '3 stakeholders',
          '5 playbooks per month',
          'Basic AI insights',
          'Email support'
        ];
      case 'PRO':
        return [
          '25 stakeholders',
          'Unlimited playbooks',
          'Advanced AI insights',
          'Priority support',
          'Export to PDF',
          'Meeting prep templates'
        ];
      case 'DIRECTOR':
        return [
          'Unlimited stakeholders',
          'Unlimited playbooks',
          'Executive AI insights',
          'White-glove support',
          'Custom branding',
          'Team collaboration',
          'Advanced analytics'
        ];
      default:
        return [];
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Current Plan</h2>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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
          {isPaidPlan && (
            <button
              onClick={handleManageSubscription}
              disabled={isLoading}
              className="btn btn-outline"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Loading...
                </>
              ) : (
                'Manage Subscription'
              )}
            </button>
          )}
        </div>

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
              {new Date().getMonth() - new Date(user.createdAt).getMonth() + 1}
            </div>
            <div className="text-sm text-gray-600">Months Active</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Your Plan Includes:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {getPlanFeatures(user.planTier).map((feature, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Upgrade Options */}
      {isFreePlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upgrade Your Plan</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {config.stripe.plans.filter(plan => plan.name !== 'FREE').map((plan, index) => (
              <motion.div
                key={plan.priceId}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`bg-white rounded-lg p-6 shadow-sm border-2 ${
                  plan.isMostPopular ? 'border-blue-500' : 'border-gray-200'
                } relative`}
              >
                {plan.isMostPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {getPlanFeatures(plan.name).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleUpgrade(plan.priceId)}
                  disabled={isLoading}
                  className={`btn w-full ${
                    plan.isMostPopular ? 'btn-primary' : 'btn-outline'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Email</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Account Created</span>
            <span className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-600">Customer ID</span>
            <span className="text-gray-900 font-mono text-sm">
              {user.stripeCustomerId || 'Not available'}
            </span>
          </div>

          {isPaidPlan && (
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Subscription Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          )}
        </div>

        {isPaidPlan && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              Need to update your payment method, download invoices, or cancel your subscription? 
              Use the customer portal to manage all billing-related tasks.
            </p>
            <button
              onClick={handleManageSubscription}
              disabled={isLoading}
              className="btn btn-outline"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Loading...
                </>
              ) : (
                'Open Billing Portal'
              )}
            </button>
          </div>
        )}

        {isFreePlan && (
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Ready to unlock more stakeholders and unlimited playbooks?
            </p>
            <button
              onClick={() => handleUpgrade(config.stripe.plans.find(p => p.isMostPopular)?.priceId || '')}
              disabled={isLoading}
              className="btn btn-primary"
            >
              Upgrade Now
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
