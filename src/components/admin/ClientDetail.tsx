import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  UserCheck, 
  UserX, 
  Smartphone, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

export const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clients, devices, activityLogs, suspendClient, reactivateClient, updateClientSubscription } = useApp();

  const client = clients.find((c) => c.id === id);
  const clientDevices = devices.filter((d) => d.clientId === id);
  const clientLogs = activityLogs.filter((l) => l.affectedAccount.includes(id || ''));

  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'Free' | 'Standard' | 'Premium'>('Premium');

  if (!client) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-charcoal-800">Client Account Not Found</h2>
        <p className="text-xs text-charcoal-500">The requested account identifier does not exist in the platform registry.</p>
        <Link to="/admin/clients" className="inline-flex items-center gap-2 text-xs font-semibold text-sage-600 hover:underline">
          <ArrowLeft size={14} /> Back to Client Directory
        </Link>
      </div>
    );
  }

  const isSuspended = client.status === 'Suspended';

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/clients')}
            className="p-2 rounded-xl bg-white border border-charcoal-200 text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-100 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-2xl text-charcoal-800 tracking-tight">
                {client.clientName}
              </h1>
              <span className="font-mono text-xs text-charcoal-400 bg-ivory-200 px-2 py-0.5 rounded">
                {client.id}
              </span>
            </div>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Client Account Overview &amp; Enrolled Device Profiles
            </p>
          </div>
        </div>

        {/* Access State Button */}
        <div className="flex items-center gap-2">
          {isSuspended ? (
            <button
              onClick={() => setShowReactivateModal(true)}
              className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserCheck size={14} />
              <span>Reactivate Client Access</span>
            </button>
          ) : (
            <button
              onClick={() => setShowSuspendModal(true)}
              className="px-4 py-2 bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserX size={14} />
              <span>Suspend Client Access</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Info + Subscription */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Client Profile Card (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-6">
          
          <div className="flex items-center gap-4">
            <img
              src={client.avatar}
              alt={client.clientName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-ivory-300 shadow-xs"
            />
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal-800">{client.clientName}</h3>
              <p className="text-xs text-charcoal-500 font-mono">{client.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                  isSuspended 
                    ? 'bg-terracotta-100 text-terracotta-700 border-terracotta-300' 
                    : 'bg-status-success-bg text-status-success border-status-success/30'
                }`}>
                  {client.status}
                </span>
                <span className="text-[11px] text-charcoal-400">
                  Last login: {client.lastLogin}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-200 space-y-3 text-xs">
            <div className="flex items-center justify-between py-1">
              <span className="text-charcoal-500 flex items-center gap-2">
                <Calendar size={14} /> Registered Date
              </span>
              <span className="font-semibold text-charcoal-800">{client.registeredDate}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-charcoal-500 flex items-center gap-2">
                <Phone size={14} /> Phone Contact
              </span>
              <span className="font-mono text-charcoal-800">{client.phone}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-charcoal-500 flex items-center gap-2">
                <Smartphone size={14} /> Connected Devices
              </span>
              <span className="font-semibold text-charcoal-800">{clientDevices.length} Enrolled</span>
            </div>
          </div>

          {/* Account Access Management Section */}
          <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-300 space-y-2">
            <h4 className="text-xs font-bold text-charcoal-800 flex items-center gap-1.5">
              <Lock size={14} className="text-sage-600" />
              Administrative Access Management
            </h4>
            <p className="text-[11px] text-charcoal-500 leading-relaxed">
              Status changes take effect instantaneously across parent authentication sessions and companion synchronization workers.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  setSelectedPlan(client.subscription);
                  setShowPlanModal(true);
                }}
                className="w-full py-1.5 rounded-lg bg-white border border-charcoal-200 text-charcoal-700 font-semibold text-xs hover:bg-ivory-200 transition-colors"
              >
                Change Subscription Plan
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Subscription & Enrolled Devices (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Subscription Banner */}
          <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">
                Active Subscription
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="font-heading font-extrabold text-2xl text-charcoal-800">
                  {client.subscription} Plan
                </h3>
                <span className="text-xs font-semibold text-sage-600 font-mono">
                  ${client.monthlyCost.toFixed(2)} / month
                </span>
              </div>
              <p className="text-xs text-charcoal-500 mt-1">
                Billed monthly via simulated platform invoicing.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedPlan(client.subscription);
                setShowPlanModal(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <CreditCard size={14} />
              Modify Tier
            </button>
          </div>

          {/* Enrolled Devices Section */}
          <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle">
            <h3 className="font-heading font-bold text-base text-charcoal-800 mb-3">
              Enrolled Devices ({clientDevices.length})
            </h3>
            
            {clientDevices.length === 0 ? (
              <p className="text-xs text-charcoal-400 py-4">No devices currently enrolled for this client.</p>
            ) : (
              <div className="space-y-3">
                {clientDevices.map((device) => (
                  <div
                    key={device.id}
                    className="p-4 rounded-xl bg-ivory-50 border border-charcoal-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-charcoal-800">{device.deviceName}</h4>
                        <p className="text-[11px] text-charcoal-500">
                          {device.model} • {device.osVersion}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-status-success">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                        {device.enrollmentStatus}
                      </span>
                      <p className="text-[10px] text-charcoal-400 mt-0.5">
                        Sync: {device.lastSync}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Client Activity Audit Records */}
          <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle">
            <h3 className="font-heading font-bold text-base text-charcoal-800 mb-3">
              Recent Administrative History
            </h3>
            {clientLogs.length === 0 ? (
              <p className="text-xs text-charcoal-400 py-3">No administrative actions recorded for this client.</p>
            ) : (
              <div className="divide-y divide-ivory-200">
                {clientLogs.map((log) => (
                  <div key={log.id} className="py-2.5 text-xs flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-charcoal-800">{log.action}</p>
                      <p className="text-[11px] text-charcoal-500">{log.details}</p>
                    </div>
                    <span className="text-[10px] font-mono text-charcoal-400 shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Plan Modification Modal */}
      <Modal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        title="Change Subscription Tier"
        subtitle={`Select a simulated plan for ${client.clientName}`}
      >
        <div className="space-y-3">
          {(['Free', 'Standard', 'Premium'] as const).map((tier) => (
            <label
              key={tier}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                selectedPlan === tier
                  ? 'border-sage-500 bg-sage-50/60'
                  : 'border-charcoal-200 hover:bg-ivory-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  value={tier}
                  checked={selectedPlan === tier}
                  onChange={() => setSelectedPlan(tier)}
                  className="text-sage-600 focus:ring-sage-500"
                />
                <div>
                  <p className="text-xs font-bold text-charcoal-800">{tier} Plan</p>
                  <p className="text-[11px] text-charcoal-500">
                    {tier === 'Free' ? '$0/month • 1 device' : tier === 'Standard' ? '$9.99/month • 3 devices' : '$19.99/month • up to 10 devices'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-charcoal-700">
                {tier === 'Free' ? '$0' : tier === 'Standard' ? '$9.99' : '$19.99'}/mo
              </span>
            </label>
          ))}

          <div className="pt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowPlanModal(false)}
              className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-ivory-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                updateClientSubscription(client.id, selectedPlan);
                setShowPlanModal(false);
              }}
              className="px-5 py-2 text-xs font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-xl shadow-xs"
            >
              Save New Plan
            </button>
          </div>
        </div>
      </Modal>

      {/* Suspend Confirmation Modal */}
      <Modal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        title="Confirm Client Suspension"
      >
        <div className="space-y-4 text-xs">
          <p className="text-charcoal-600">
            Are you sure you want to suspend <span className="font-bold text-charcoal-800">{client.clientName}</span>? Their access will immediately be restricted across the parent portal.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowSuspendModal(false)}
              className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-ivory-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                suspendClient(client.id, 'Manual administrative suspension from detail view.');
                setShowSuspendModal(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-terracotta-600 hover:bg-terracotta-700 rounded-xl"
            >
              Suspend Access
            </button>
          </div>
        </div>
      </Modal>

      {/* Reactivate Modal */}
      <Modal
        isOpen={showReactivateModal}
        onClose={() => setShowReactivateModal(false)}
        title="Confirm Client Reactivation"
      >
        <div className="space-y-4 text-xs">
          <p className="text-charcoal-600">
            Reactivate full access for <span className="font-bold text-charcoal-800">{client.clientName}</span>?
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowReactivateModal(false)}
              className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-ivory-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                reactivateClient(client.id);
                setShowReactivateModal(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-xl"
            >
              Reactivate Access
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
