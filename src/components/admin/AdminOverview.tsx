import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Smartphone, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { useApp } from '../../context/AppContext';

const activityHistoryData = [
  { date: 'Nov 10', syncs: 14200, enrollments: 24 },
  { date: 'Nov 11', syncs: 15400, enrollments: 32 },
  { date: 'Nov 12', syncs: 16100, enrollments: 28 },
  { date: 'Nov 13', syncs: 15800, enrollments: 30 },
  { date: 'Nov 14', syncs: 17200, enrollments: 45 },
  { date: 'Nov 15', syncs: 18900, enrollments: 52 },
  { date: 'Nov 16', syncs: 19400, enrollments: 39 },
];

export const AdminOverview: React.FC = () => {
  const { clients, devices, activityLogs } = useApp();

  // Dynamic calculations based on state
  const activeCount = clients.filter(c => c.status === 'Active').length;
  const suspendedCount = clients.filter(c => c.status === 'Suspended').length;
  const pendingCount = clients.filter(c => c.status === 'Pending').length;

  const statusPieData = [
    { name: 'Active', value: 1146 + (activeCount - 10), color: '#58786B' },
    { name: 'Suspended', value: 138 + (suspendedCount - 2), color: '#BD826E' },
    { name: 'Pending', value: 48 + (pendingCount - 2), color: '#C88A3A' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Platform Executive Overview
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Global monitoring, account distribution, and device synchronization metrics.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/clients"
            className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Users size={14} />
            <span>Manage Clients</span>
          </Link>
          <Link
            to="/admin/devices"
            className="px-4 py-2 bg-white hover:bg-ivory-200 text-charcoal-700 font-semibold text-xs rounded-xl border border-charcoal-200 shadow-xs transition-all flex items-center gap-1.5"
          >
            <Smartphone size={14} />
            <span>Device Registry</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Client Accounts */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Total Client Accounts</span>
            <div className="w-9 h-9 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              1,284
            </span>
            <span className="text-xs font-semibold text-status-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +8.4%
            </span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">vs last month (+98 families)</p>
        </div>

        {/* Active Accounts */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Active Accounts</span>
            <div className="w-9 h-9 rounded-xl bg-status-success-bg text-status-success flex items-center justify-center">
              <UserCheck size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              {1146 + (activeCount - 10)}
            </span>
            <span className="text-xs font-semibold text-status-success flex items-center gap-0.5">
              <TrendingUp size={12} /> 89.2%
            </span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">Healthy active subscription status</p>
        </div>

        {/* Suspended Accounts */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Suspended Accounts</span>
            <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-500 flex items-center justify-center">
              <UserX size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              {138 + (suspendedCount - 2)}
            </span>
            <span className="text-xs font-semibold text-terracotta-500 flex items-center gap-0.5">
              <TrendingDown size={12} /> 10.8%
            </span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">Access holds &amp; billing pending</p>
        </div>

        {/* Enrolled Devices */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Enrolled Devices</span>
            <div className="w-9 h-9 rounded-xl bg-slateBlue-100 text-slateBlue-700 flex items-center justify-center">
              <Smartphone size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              1,892
            </span>
            <span className="text-xs font-semibold text-status-success flex items-center gap-0.5">
              <TrendingUp size={12} /> +12.1%
            </span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">1.47 avg devices per family</p>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Platform 7-Day Activity Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-charcoal-800">
                Platform Activity &amp; Device Heartbeats (7 Days)
              </h3>
              <p className="text-xs text-charcoal-500">
                Daily synchronized heartbeats across iOS and Android enrolled endpoints.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-charcoal-600">
                <span className="w-2.5 h-2.5 rounded-full bg-sage-500" />
                <span>Syncs</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="syncGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#58786B" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#58786B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(val: any) => [`${Number(val).toLocaleString()} telemetry heartbeats`, 'Syncs']}
                  contentStyle={{ backgroundColor: '#252B2A', borderRadius: '10px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="syncs" stroke="#58786B" strokeWidth={2.5} fillOpacity={1} fill="url(#syncGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Account Status Distribution Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800">
              Account Status Distribution
            </h3>
            <p className="text-xs text-charcoal-500">
              Current subscription standing
            </p>
          </div>

          <div className="h-52 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val} accounts`, 'Total']}
                  contentStyle={{ backgroundColor: '#252B2A', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-ivory-200">
            {statusPieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-charcoal-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-charcoal-800">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-card border border-charcoal-100 shadow-subtle p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-ivory-200">
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800">
              Recent Administrative Activity
            </h3>
            <p className="text-xs text-charcoal-500">
              Simulated real-time log of security events, enrollments, and status updates.
            </p>
          </div>
          <Link
            to="/admin/activity"
            className="text-xs font-semibold text-sage-600 hover:text-sage-700 flex items-center gap-1"
          >
            <span>View Full Log</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-ivory-200">
          {activityLogs.slice(0, 5).map((log) => {
            const statusColor = 
              log.status === 'Success' ? 'text-status-success bg-status-success-bg border-status-success/20' :
              log.status === 'Warning' ? 'text-status-warning bg-status-warning-bg border-status-warning/20' :
              'text-slateBlue-700 bg-slateBlue-100 border-slateBlue-200';

            return (
              <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border mt-0.5 ${statusColor}`}>
                    {log.category}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal-800">{log.action}</h4>
                    <p className="text-[11px] text-charcoal-500 mt-0.5">
                      Account: <span className="font-medium text-charcoal-700">{log.affectedAccount}</span> • {log.details}
                    </p>
                  </div>
                </div>
                <div className="text-[11px] text-charcoal-400 font-mono sm:text-right shrink-0">
                  {log.timestamp}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
