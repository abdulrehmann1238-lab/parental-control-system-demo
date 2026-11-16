import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { SubscriptionTier } from '../../types';
import { Modal } from '../common/Modal';

export const Subscriptions: React.FC = () => {
  const { subscriptionPlans, clients, updateClientSubscription } = useApp();

  const [selectedPlanForClientModal, setSelectedPlanForClientModal] = useState<SubscriptionTier | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');

  // Calculate dynamic stats from clients
  const freeClients = clients.filter(c => c.subscription === 'Free').length;
  const standardClients = clients.filter(c => c.subscription === 'Standard').length;
  const premiumClients = clients.filter(c => c.subscription === 'Premium').length;

  // Simulated total revenue
  const totalSimulatedRevenue = 
    (standardClients * 9.99 * 59) + (premiumClients * 19.99 * 12); // Realistic SaaS scaling

  const chartData = [
    { name: 'Free Basic', count: 312 + freeClients, revenue: 0, color: '#737C78' },
    { name: 'Family Standard', count: 590 + standardClients, revenue: 5894, color: '#7893A5' },
    { name: 'Family Premium', count: 244 + premiumClients, revenue: 4877, color: '#58786B' },
  ];

  const handleApplyPlanChange = () => {
    if (selectedClientId && selectedPlanForClientModal) {
      updateClientSubscription(selectedClientId, selectedPlanForClientModal);
      setSelectedPlanForClientModal(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
          Subscription &amp; Tier Management
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Monitor recurring plans, simulated revenue trajectories, and assign tiers to client accounts.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle">
          <span className="text-xs font-semibold text-charcoal-500">Total Active Subscriptions</span>
          <p className="font-heading font-extrabold text-3xl text-charcoal-800 mt-2">
            1,146
          </p>
          <span className="text-[11px] text-status-success font-medium flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> +14.2% YoY growth
          </span>
        </div>

        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle">
          <span className="text-xs font-semibold text-charcoal-500">Expiring / Renewal (Next 30 Days)</span>
          <p className="font-heading font-extrabold text-3xl text-charcoal-800 mt-2">
            94
          </p>
          <span className="text-[11px] text-charcoal-400 font-medium mt-1">
            96.8% auto-renewal retention
          </span>
        </div>

        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle">
          <span className="text-xs font-semibold text-charcoal-500">Simulated Monthly Run-Rate</span>
          <p className="font-heading font-extrabold text-3xl text-sage-600 mt-2 font-mono">
            ${totalSimulatedRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
          <span className="text-[11px] text-charcoal-400 font-medium mt-1">
            Clearly labeled demonstration figures
          </span>
        </div>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => {
          const isPremium = plan.id === 'Premium';

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-card-lg p-6 border shadow-subtle flex flex-col justify-between transition-all ${
                isPremium ? 'border-sage-500 ring-2 ring-sage-500/10' : 'border-charcoal-100'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isPremium ? 'bg-sage-100 text-sage-800' : 'bg-ivory-200 text-charcoal-700'
                  }`}>
                    {plan.name}
                  </span>
                  {isPremium && (
                    <span className="text-[10px] font-bold text-sage-600 bg-sage-50 px-2 py-0.5 rounded border border-sage-200">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mt-3">
                  <span className="font-heading font-extrabold text-3xl text-charcoal-800">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-charcoal-500">{plan.billingCycle}</span>
                </div>

                <p className="text-xs text-charcoal-500 mt-2">
                  Supports {plan.maxDevices === 1 ? '1 device' : `up to ${plan.maxDevices} devices`}.
                </p>

                <div className="mt-6 pt-5 border-t border-ivory-200 space-y-2.5">
                  <span className="text-[11px] uppercase font-bold text-charcoal-400">Included Features:</span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-700">
                      <Check size={14} className="text-sage-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-ivory-200">
                <button
                  onClick={() => setSelectedPlanForClientModal(plan.id)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    isPremium
                      ? 'bg-sage-600 hover:bg-sage-700 text-white shadow-xs'
                      : 'bg-ivory-200 hover:bg-ivory-300 text-charcoal-800'
                  }`}
                >
                  <span>Assign Plan to Client</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Distribution Visualization */}
      <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle">
        <h3 className="font-heading font-bold text-base text-charcoal-800 mb-1">
          Subscriber Distribution Across Tiers
        </h3>
        <p className="text-xs text-charcoal-500 mb-6">
          Aggregate active accounts across Free, Standard, and Family Premium plans.
        </p>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(val: any) => [`${val} client accounts`, 'Subscribers']}
                contentStyle={{ backgroundColor: '#252B2A', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assign Plan Modal */}
      <Modal
        isOpen={!!selectedPlanForClientModal}
        onClose={() => setSelectedPlanForClientModal(null)}
        title={`Assign ${selectedPlanForClientModal} Plan`}
        subtitle="Select a parent account to change their subscription"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
              Select Client Account
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full p-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl text-xs font-medium text-charcoal-800"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.clientName} ({c.id}) — Currently on {c.subscription}
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 rounded-xl bg-ivory-100 border border-ivory-300 text-charcoal-600">
            Selected tier will update the client's monthly simulated fee, device limit allowance, and platform activity records.
          </div>

          <div className="pt-3 border-t border-ivory-300 flex justify-end gap-2">
            <button
              onClick={() => setSelectedPlanForClientModal(null)}
              className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-ivory-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyPlanChange}
              className="px-5 py-2 text-xs font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-xl shadow-xs"
            >
              Apply Subscription Change
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
