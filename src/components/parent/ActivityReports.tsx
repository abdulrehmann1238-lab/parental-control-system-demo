import React, { useState } from 'react';
import { 
  BarChart3, 
  Globe, 
  MessageSquare, 
  Smartphone, 
  Download, 
  Calendar, 
  Users, 
  ShieldCheck, 
  FileText,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { 
  WEB_CATEGORY_REPORTS, 
  COMMUNICATION_SAMPLE_SUMMARY, 
  EMMA_SCREEN_TIME_HISTORY, 
  NOAH_SCREEN_TIME_HISTORY 
} from '../../data/mockData';

export const ActivityReports: React.FC = () => {
  const { familyMembers, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'device' | 'web' | 'communication'>('overview');
  const [selectedMember, setSelectedMember] = useState<'all' | 'Emma' | 'Noah'>('all');
  const [dateRange, setDateRange] = useState<'today' | '7days' | '30days'>('7days');

  const chartData = selectedMember === 'Noah' 
    ? NOAH_SCREEN_TIME_HISTORY 
    : selectedMember === 'Emma' 
    ? EMMA_SCREEN_TIME_HISTORY 
    : EMMA_SCREEN_TIME_HISTORY.map((item, idx) => ({
        ...item,
        screenTimeMinutes: item.screenTimeMinutes + (NOAH_SCREEN_TIME_HISTORY[idx]?.screenTimeMinutes || 0),
        productiveMinutes: item.productiveMinutes + (NOAH_SCREEN_TIME_HISTORY[idx]?.productiveMinutes || 0),
        socialMinutes: item.socialMinutes + (NOAH_SCREEN_TIME_HISTORY[idx]?.socialMinutes || 0),
        gamesMinutes: item.gamesMinutes + (NOAH_SCREEN_TIME_HISTORY[idx]?.gamesMinutes || 0),
        entertainmentMinutes: item.entertainmentMinutes + (NOAH_SCREEN_TIME_HISTORY[idx]?.entertainmentMinutes || 0),
      }));

  const handleExportReport = () => {
    const reportText = `========================================================
AEGISFAMILY DIGITAL WELLBEING REPORT
Generated: ${new Date().toLocaleString()}
Family Profile: Jenkins Family (Sarah Jenkins)
Reporting Window: ${dateRange.toUpperCase()}
Target Subject: ${selectedMember.toUpperCase()}
========================================================

1. SCREEN TIME & HABITS SUMMARY:
- Average Daily Screen Time: 3h 24m
- Educational & Productive Usage: 42%
- Gaming & Recreation Usage: 28%
- Social & Communication: 18%
- Media & Video: 12%

2. WEB ACTIVITY SUMMARY (AGGREGATE CATEGORIES ONLY):
- Education & Reference: 14.5 hours (38%)
- Video & Media Streaming: 9.2 hours (24%)
- Communication & Social: 6.9 hours (18%)
- Gaming & Interactive: 5.4 hours (14%)
- Creative Tools & Arts: 2.3 hours (6%)

3. COMMUNICATION SUMMARY (PRIVACY PRESERVING):
- Total Calls Exchanged: ${COMMUNICATION_SAMPLE_SUMMARY.totalCalls}
- Total Messages Exchanged: ${COMMUNICATION_SAMPLE_SUMMARY.totalMessages}
- Safe Pre-Authorized Contacts: ${COMMUNICATION_SAMPLE_SUMMARY.safeContactsCount}
- Unknown Contact Interceptions: 0
- Privacy Compliance: Message contents and audio streams are never captured, processed, or saved.

4. COMPLIANCE & SAFETY ASSURANCE:
This report is generated strictly in accordance with consent-based family transparency standards.
========================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AegisFamily_Activity_Report_${selectedMember}_${dateRange}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast('Report Exported', 'Sample wellbeing report downloaded successfully.', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sage-100 text-sage-800 text-[10px] font-bold uppercase tracking-wider mb-1">
            <ShieldCheck size={12} />
            Privacy-Respecting Aggregate Insights
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Activity Reports &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-0.5">
            Transparent summaries of device health, application trends, and digital wellbeing.
          </p>
        </div>

        {/* Date & Member Selectors + Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Member Selector */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-charcoal-200 text-xs">
            <Users size={14} className="text-charcoal-400" />
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value as any)}
              className="bg-transparent border-none outline-none font-semibold text-charcoal-800"
            >
              <option value="all">Entire Family</option>
              <option value="Emma">Emma only</option>
              <option value="Noah">Noah only</option>
            </select>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-charcoal-200 text-xs">
            <Calendar size={14} className="text-charcoal-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="bg-transparent border-none outline-none font-semibold text-charcoal-800"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-ivory-300 pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: <BarChart3 size={15} /> },
          { id: 'device', label: 'Device Activity', icon: <Smartphone size={15} /> },
          { id: 'web', label: 'Web Activity', icon: <Globe size={15} /> },
          { id: 'communication', label: 'Communication Activity', icon: <MessageSquare size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-sage-600 text-white shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Explicit Privacy Banner */}
      <div className="p-3.5 bg-sage-50 rounded-xl border border-sage-200 flex items-start gap-2.5 text-xs text-sage-800">
        <ShieldCheck size={16} className="text-sage-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Privacy Guarantee: </span>
          All data displayed is anonymized aggregate telemetry. AegisFamily never reads or stores private messages, phone call recordings, or browsing keystrokes.
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-heading font-bold text-base text-charcoal-800">
                  Daily Activity Distribution (Minutes)
                </h3>
                <p className="text-xs text-charcoal-500">
                  Categorized usage across education, social, games, and entertainment.
                </p>
              </div>
              <span className="text-xs font-semibold text-sage-600 bg-sage-50 px-2.5 py-1 rounded-md">
                Healthy Habit Balance
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(val: any, name: string) => [`${val} mins`, name]}
                    contentStyle={{ backgroundColor: '#252B2A', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="productiveMinutes" name="Education" fill="#58786B" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="socialMinutes" name="Social" fill="#7893A5" stackId="a" />
                  <Bar dataKey="gamesMinutes" name="Games" fill="#C88A3A" stackId="a" />
                  <Bar dataKey="entertainmentMinutes" name="Entertainment" fill="#BD826E" stackId="a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-ivory-200 flex flex-wrap items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#58786B]" /><span>Education &amp; Reference</span></div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#7893A5]" /><span>Social &amp; Communication</span></div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#C88A3A]" /><span>Gaming</span></div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#BD826E]" /><span>Media &amp; Entertainment</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Device Activity */}
      {activeTab === 'device' && (
        <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-base text-charcoal-800">
            Supported Device Activity Events
          </h3>
          <p className="text-xs text-charcoal-500">
            System status updates, charging cycles, and connectivity changes.
          </p>

          <div className="divide-y divide-ivory-200 text-xs">
            {[
              { event: 'Screen On Session Ended', target: "Emma's iPhone 15 Pro", duration: '45m active session', time: '14:22' },
              { event: 'Device Connected to Home Wi-Fi', target: "Noah's Galaxy S24", duration: 'Full Signal (5 GHz)', time: '13:50' },
              { event: 'Battery Reached 85%', target: "Emma's iPhone 15 Pro", duration: 'Fast charging', time: '11:15' },
              { event: 'App Category Quota Notice', target: "Noah's Galaxy S24", duration: 'Gaming: 30m remaining', time: '10:05' },
              { event: 'Morning Wake Sync Completed', target: 'Both Devices', duration: 'Telemetry synced', time: '07:02' },
            ].map((row, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-charcoal-800">{row.event}</p>
                  <p className="text-[11px] text-charcoal-500">{row.target} • {row.duration}</p>
                </div>
                <span className="font-mono text-charcoal-400 text-[11px]">{row.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Web Activity */}
      {activeTab === 'web' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle">
            <h3 className="font-heading font-bold text-base text-charcoal-800 mb-1">
              Website Category Distribution
            </h3>
            <p className="text-xs text-charcoal-500 mb-6">
              Aggregate web categories accessed on enrolled companion devices.
            </p>

            <div className="space-y-3">
              {WEB_CATEGORY_REPORTS.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-charcoal-800">
                    <span>{cat.category}</span>
                    <span>{cat.hours} hrs ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-charcoal-800 mb-1">
                Content Safety Filtering
              </h3>
              <p className="text-xs text-charcoal-500 mb-4">
                Platform filter standing across both enrolled family devices.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-ivory-50 border border-ivory-200 flex justify-between items-center">
                  <span className="font-semibold text-charcoal-800">SafeSearch Enforcement</span>
                  <span className="text-status-success font-bold">ACTIVE (Google &amp; Bing)</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory-50 border border-ivory-200 flex justify-between items-center">
                  <span className="font-semibold text-charcoal-800">Adult Content Filtering</span>
                  <span className="text-status-success font-bold">RESTRICTED</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory-50 border border-ivory-200 flex justify-between items-center">
                  <span className="font-semibold text-charcoal-800">Phishing &amp; Malware Defense</span>
                  <span className="text-status-success font-bold">ENABLED</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-charcoal-400 mt-4">
              Individual URL browsing history is aggregated to protect youth privacy and uphold family trust.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Communication Activity */}
      {activeTab === 'communication' && (
        <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-6">
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800">
              Communication Activity Overview (Privacy Safe)
            </h3>
            <p className="text-xs text-charcoal-500 mt-0.5">
              High-level interaction counters without inspecting message contents or listening to calls.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-ivory-50 border border-charcoal-100 text-center">
              <span className="text-[10px] text-charcoal-400 uppercase font-semibold">Total Verified Calls</span>
              <p className="font-heading font-extrabold text-2xl text-charcoal-800 mt-1">
                {COMMUNICATION_SAMPLE_SUMMARY.totalCalls}
              </p>
              <span className="text-[10px] text-sage-600 font-medium">All from pre-approved family</span>
            </div>

            <div className="p-4 rounded-xl bg-ivory-50 border border-charcoal-100 text-center">
              <span className="text-[10px] text-charcoal-400 uppercase font-semibold">Messages Exchanged</span>
              <p className="font-heading font-extrabold text-2xl text-charcoal-800 mt-1">
                {COMMUNICATION_SAMPLE_SUMMARY.totalMessages}
              </p>
              <span className="text-[10px] text-sage-600 font-medium">Zero flagged contacts</span>
            </div>

            <div className="p-4 rounded-xl bg-ivory-50 border border-charcoal-100 text-center">
              <span className="text-[10px] text-charcoal-400 uppercase font-semibold">Safe Contact Circle</span>
              <p className="font-heading font-extrabold text-2xl text-charcoal-800 mt-1">
                {COMMUNICATION_SAMPLE_SUMMARY.safeContactsCount}
              </p>
              <span className="text-[10px] text-charcoal-400 font-medium">Mom, Dad, Grandparents, Friends</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-ivory-100 border border-ivory-300 text-xs text-charcoal-600 leading-relaxed">
            <strong>Privacy Note: </strong> {COMMUNICATION_SAMPLE_SUMMARY.note}
          </div>
        </div>
      )}

    </div>
  );
};
