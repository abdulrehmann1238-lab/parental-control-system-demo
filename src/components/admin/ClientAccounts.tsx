import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Eye, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  ShieldAlert, 
  CheckCircle2, 
  X,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ClientAccount, AccountStatus, SubscriptionTier } from '../../types';
import { Modal } from '../common/Modal';

export const ClientAccounts: React.FC = () => {
  const { clients, suspendClient, reactivateClient } = useApp();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | AccountStatus>('All');
  const [subscriptionFilter, setSubscriptionFilter] = useState<'All' | SubscriptionTier>('All');
  const [sortField, setSortField] = useState<'clientName' | 'registeredDate' | 'connectedDevicesCount'>('registeredDate');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Active dropdown menu for an account row
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modal states for Suspend / Reactivate
  const [selectedClientForSuspend, setSelectedClientForSuspend] = useState<ClientAccount | null>(null);
  const [selectedClientForReactivate, setSelectedClientForReactivate] = useState<ClientAccount | null>(null);
  const [suspensionReason, setSuspensionReason] = useState('Administrative hold: Pending family compliance review.');

  // Filtering & Sorting
  const filteredClients = useMemo(() => {
    return clients
      .filter((client) => {
        const matchesSearch =
          client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
        const matchesSub = subscriptionFilter === 'All' || client.subscription === subscriptionFilter;

        return matchesSearch && matchesStatus && matchesSub;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') {
          return sortAsc ? valA.localeCompare(valB as string) : (valB as string).localeCompare(valA);
        }
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [clients, searchTerm, statusFilter, subscriptionFilter, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / pageSize) || 1;
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredClients.slice(start, start + pageSize);
  }, [filteredClients, currentPage]);

  const handleSort = (field: 'clientName' | 'registeredDate' | 'connectedDevicesCount') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setSubscriptionFilter('All');
    setCurrentPage(1);
  };

  const handleConfirmSuspend = () => {
    if (selectedClientForSuspend) {
      suspendClient(selectedClientForSuspend.id, suspensionReason);
      setSelectedClientForSuspend(null);
    }
  };

  const handleConfirmReactivate = () => {
    if (selectedClientForReactivate) {
      reactivateClient(selectedClientForReactivate.id);
      setSelectedClientForReactivate(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Client Account Management
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Review parent registrations, toggle access authorization, and inspect connected devices.
          </p>
        </div>
        <div className="text-xs text-charcoal-500 font-medium">
          Showing <span className="font-bold text-charcoal-800">{filteredClients.length}</span> of {clients.length} registered accounts
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-100 shadow-subtle flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by client, email, or ID..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-ivory-50 border border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all text-charcoal-800 placeholder:text-charcoal-400"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-charcoal-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-charcoal-400 hover:text-charcoal-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-charcoal-500 font-medium hidden sm:inline">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-ivory-50 border border-charcoal-200 rounded-xl px-3 py-1.5 text-xs font-medium text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Subscription Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-charcoal-500 font-medium hidden sm:inline">Plan:</span>
            <select
              value={subscriptionFilter}
              onChange={(e) => {
                setSubscriptionFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="bg-ivory-50 border border-charcoal-200 rounded-xl px-3 py-1.5 text-xs font-medium text-charcoal-700 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
            >
              <option value="All">All Plans</option>
              <option value="Free">Free</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          {(searchTerm || statusFilter !== 'All' || subscriptionFilter !== 'All') && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-1.5 text-xs font-semibold text-charcoal-500 hover:text-charcoal-800 bg-ivory-200 hover:bg-ivory-300 rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

      </div>

      {/* Accounts Table Container */}
      <div className="bg-white rounded-2xl border border-charcoal-100 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-ivory-100/70 border-b border-ivory-300 text-charcoal-600 font-semibold select-none">
                <th 
                  onClick={() => handleSort('clientName')}
                  className="py-3.5 px-4 cursor-pointer hover:text-charcoal-900"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Client</span>
                    <ArrowUpDown size={12} className="text-charcoal-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Account ID</th>
                <th 
                  onClick={() => handleSort('registeredDate')}
                  className="py-3.5 px-4 cursor-pointer hover:text-charcoal-900"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Registered Date</span>
                    <ArrowUpDown size={12} className="text-charcoal-400" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('connectedDevicesCount')}
                  className="py-3.5 px-4 cursor-pointer hover:text-charcoal-900"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Connected Devices</span>
                    <ArrowUpDown size={12} className="text-charcoal-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Subscription</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {paginatedClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-charcoal-400">
                    No client accounts match your current filters.
                  </td>
                </tr>
              ) : (
                paginatedClients.map((client) => {
                  const isSuspended = client.status === 'Suspended';
                  const isPending = client.status === 'Pending';

                  const statusBadge = isSuspended ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-terracotta-100 text-terracotta-700 border border-terracotta-300/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                      Suspended
                    </span>
                  ) : isPending ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sand-200 text-charcoal-700 border border-sand-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-status-success-bg text-status-success border border-status-success/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                      Active
                    </span>
                  );

                  const subBadge = 
                    client.subscription === 'Premium' ? 'bg-sage-100 text-sage-800 border-sage-200' :
                    client.subscription === 'Standard' ? 'bg-slateBlue-100 text-slateBlue-700 border-slateBlue-200' :
                    'bg-ivory-200 text-charcoal-600 border-ivory-300';

                  return (
                    <tr 
                      key={client.id}
                      className="hover:bg-ivory-50/70 transition-colors group"
                    >
                      {/* Client */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={client.avatar}
                            alt={client.clientName}
                            className="w-8 h-8 rounded-full object-cover border border-charcoal-100"
                          />
                          <div>
                            <div className="font-semibold text-charcoal-800 flex items-center gap-1.5">
                              <span>{client.clientName}</span>
                              {client.id === 'CLT-8291' && (
                                <span className="bg-sage-50 text-sage-700 text-[10px] px-1.5 py-0.2 rounded font-mono font-medium">
                                  Demo Parent
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-charcoal-500 font-mono">
                              {client.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Account ID */}
                      <td className="py-3.5 px-4 font-mono text-charcoal-600 font-medium">
                        {client.id}
                      </td>

                      {/* Registered Date */}
                      <td className="py-3.5 px-4 text-charcoal-500">
                        {client.registeredDate}
                      </td>

                      {/* Devices */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-ivory-100 border border-charcoal-100 text-charcoal-700 font-medium">
                          <Smartphone size={13} className="text-charcoal-400" />
                          {client.connectedDevicesCount} {client.connectedDevicesCount === 1 ? 'device' : 'devices'}
                        </span>
                      </td>

                      {/* Subscription */}
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${subBadge}`}>
                          {client.subscription}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {statusBadge}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right relative">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => navigate(`/admin/clients/${client.id}`)}
                            title="View Full Account"
                            className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-ivory-200 transition-colors"
                          >
                            <Eye size={15} />
                          </button>

                          {isSuspended ? (
                            <button
                              onClick={() => setSelectedClientForReactivate(client)}
                              title="Reactivate Access"
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-status-success bg-status-success-bg border border-status-success/30 hover:bg-status-success/20 transition-colors flex items-center gap-1"
                            >
                              <UserCheck size={12} />
                              Reactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedClientForSuspend(client);
                                setSuspensionReason('Administrative hold: Simulated parent account restriction.');
                              }}
                              title="Suspend Access"
                              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-terracotta-700 bg-terracotta-100 border border-terracotta-300/40 hover:bg-terracotta-200 transition-colors flex items-center gap-1"
                            >
                              <UserX size={12} />
                              Suspend
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-ivory-300 flex items-center justify-between text-xs text-charcoal-500">
          <div>
            Page <span className="font-semibold text-charcoal-800">{currentPage}</span> of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-charcoal-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ivory-100 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-charcoal-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ivory-100 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Suspend Confirmation Modal */}
      <Modal
        isOpen={!!selectedClientForSuspend}
        onClose={() => setSelectedClientForSuspend(null)}
        title="Suspend Client Account Access"
        subtitle="Simulate immediate platform access revocation"
      >
        {selectedClientForSuspend && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-terracotta-100/60 border border-terracotta-300/40 text-charcoal-800 flex items-start gap-3">
              <ShieldAlert className="text-terracotta-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-sm text-terracotta-800">
                  Are you sure you want to suspend {selectedClientForSuspend.clientName}?
                </p>
                <p className="mt-1 text-charcoal-600 leading-relaxed text-[11px]">
                  When suspended, this parent’s simulated login credentials and companion device heartbeat synchronization will be placed on hold until reactivated.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-ivory-100 border border-charcoal-100 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Account ID:</span>
                <span className="font-mono font-semibold text-charcoal-800">{selectedClientForSuspend.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Email:</span>
                <span className="font-mono text-charcoal-800">{selectedClientForSuspend.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Connected Devices:</span>
                <span className="font-semibold text-charcoal-800">{selectedClientForSuspend.connectedDevicesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Current Plan:</span>
                <span className="font-semibold text-charcoal-800">{selectedClientForSuspend.subscription}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                Reason for Suspension (Simulated Audit Log)
              </label>
              <textarea
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 text-charcoal-800"
              />
            </div>

            <div className="pt-3 border-t border-ivory-300 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedClientForSuspend(null)}
                className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-ivory-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSuspend}
                className="px-5 py-2 text-xs font-semibold text-white bg-terracotta-600 hover:bg-terracotta-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <UserX size={14} />
                <span>Confirm Suspension</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reactivate Confirmation Modal */}
      <Modal
        isOpen={!!selectedClientForReactivate}
        onClose={() => setSelectedClientForReactivate(null)}
        title="Reactivate Client Account"
        subtitle="Restore full family dashboard and companion connectivity"
      >
        {selectedClientForReactivate && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-status-success-bg border border-status-success/30 text-charcoal-800 flex items-start gap-3">
              <CheckCircle2 className="text-status-success shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-sm text-charcoal-800">
                  Restore access for {selectedClientForReactivate.clientName}?
                </p>
                <p className="mt-1 text-charcoal-600 leading-relaxed text-[11px]">
                  This will immediately lift the administrative hold and restore active status for all associated family devices.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-ivory-300 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedClientForReactivate(null)}
                className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-ivory-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReactivate}
                className="px-5 py-2 text-xs font-semibold text-white bg-sage-600 hover:bg-sage-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <UserCheck size={14} />
                <span>Confirm Reactivation</span>
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
