import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, Download, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ActivityLogs: React.FC = () => {
  const { activityLogs, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.affectedAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminUser.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Timestamp', 'Action', 'Category', 'Affected Account', 'Status', 'Admin User', 'Details'];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.action}"`,
      `"${l.category}"`,
      `"${l.affectedAccount}"`,
      `"${l.status}"`,
      `"${l.adminUser}"`,
      `"${l.details.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aegis-admin-audit-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Audit Log Exported', 'CSV download initiated successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Administrative Activity Logs
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Immutable audit trail of administrator interactions, security holds, and system events.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-white hover:bg-ivory-100 text-charcoal-700 font-semibold text-xs rounded-xl border border-charcoal-200 shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download size={14} />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-100 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search action, account, or details..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-ivory-50 border border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 text-charcoal-800 placeholder:text-charcoal-400"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-charcoal-400" />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-charcoal-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-ivory-50 border border-charcoal-200 rounded-xl px-3 py-1.5 text-xs text-charcoal-700"
            >
              <option value="All">All Categories</option>
              <option value="Account">Account</option>
              <option value="Security">Security</option>
              <option value="Device">Device</option>
              <option value="Billing">Billing</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-charcoal-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-ivory-50 border border-charcoal-200 rounded-xl px-3 py-1.5 text-xs text-charcoal-700"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Info">Info</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-charcoal-100 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-ivory-100/70 border-b border-ivory-300 text-charcoal-600 font-semibold select-none">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Admin Action</th>
                <th className="py-3.5 px-4">Affected Account</th>
                <th className="py-3.5 px-4">Operator</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {filteredLogs.map((log) => {
                const statusBadge = 
                  log.status === 'Success' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-status-success">
                      <CheckCircle2 size={12} /> Success
                    </span>
                  ) : log.status === 'Warning' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-status-warning">
                      <AlertTriangle size={12} /> Warning
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slateBlue-700">
                      <Info size={12} /> Info
                    </span>
                  );

                return (
                  <tr key={log.id} className="hover:bg-ivory-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono text-charcoal-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-ivory-200 text-charcoal-700 uppercase">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-charcoal-800">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 text-charcoal-700 font-medium">
                      {log.affectedAccount}
                    </td>
                    <td className="py-3 px-4 text-charcoal-500">
                      {log.adminUser}
                    </td>
                    <td className="py-3 px-4">
                      {statusBadge}
                    </td>
                    <td className="py-3 px-4 text-charcoal-500 max-w-xs truncate" title={log.details}>
                      {log.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
