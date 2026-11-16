import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Bell, 
  Lock, 
  Moon, 
  Sun, 
  Smartphone, 
  Save, 
  CheckCircle2, 
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSettings: React.FC = () => {
  const { addToast, resetAllDemoData } = useApp();

  // Settings interactive state
  const [adminName, setAdminName] = useState('Platform Owner');
  const [adminEmail, setAdminEmail] = useState('admin@demo.com');
  const [require2FA, setRequire2FA] = useState(true);
  const [ipWhitelisting, setIpWhitelisting] = useState(false);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState('30');
  const [emailAlertsOnSuspension, setEmailAlertsOnSuspension] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [telemetryHeartbeatRate, setTelemetryHeartbeatRate] = useState('2');

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Admin Settings Saved', 'Platform configuration updated successfully.', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
          Platform Administration Settings
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Configure security baselines, telemetry intervals, and administrative access controls.
        </p>
      </div>

      <form onSubmit={handleSavePreferences} className="space-y-6">
        
        {/* Owner Profile Section */}
        <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-ivory-200">
            <div className="w-8 h-8 rounded-lg bg-sage-50 text-sage-600 flex items-center justify-center">
              <User size={18} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-charcoal-800">Owner Profile</h3>
              <p className="text-xs text-charcoal-500">Root administrative operator credentials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Display Name</label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-500/20"
              />
            </div>
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Email Address</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-sage-500/20 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-ivory-200">
            <div className="w-8 h-8 rounded-lg bg-slateBlue-100 text-slateBlue-700 flex items-center justify-center">
              <Lock size={18} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-charcoal-800">Security &amp; Session Policies</h3>
              <p className="text-xs text-charcoal-500">Access enforcement and token timeouts</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 border border-charcoal-100">
              <div>
                <p className="font-semibold text-charcoal-800">Mandatory Multi-Factor Authentication (2FA)</p>
                <p className="text-charcoal-500 text-[11px]">Enforce hardware token or authenticator app for admin panel logins.</p>
              </div>
              <input
                type="checkbox"
                checked={require2FA}
                onChange={(e) => setRequire2FA(e.target.checked)}
                className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 border border-charcoal-100">
              <div>
                <p className="font-semibold text-charcoal-800">Session Inactivity Timeout</p>
                <p className="text-charcoal-500 text-[11px]">Automatically log out idle administrative sessions.</p>
              </div>
              <select
                value={sessionTimeoutMinutes}
                onChange={(e) => setSessionTimeoutMinutes(e.target.value)}
                className="bg-white border border-charcoal-200 rounded-lg px-2.5 py-1 text-xs text-charcoal-700"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 border border-charcoal-100">
              <div>
                <p className="font-semibold text-charcoal-800">Telemetry Ingestion Frequency</p>
                <p className="text-charcoal-500 text-[11px]">Heartbeat interval for child enrolled device synchronization.</p>
              </div>
              <select
                value={telemetryHeartbeatRate}
                onChange={(e) => setTelemetryHeartbeatRate(e.target.value)}
                className="bg-white border border-charcoal-200 rounded-lg px-2.5 py-1 text-xs text-charcoal-700"
              >
                <option value="1">Every 1 minute</option>
                <option value="2">Every 2 minutes (Balanced)</option>
                <option value="5">Every 5 minutes (Power saver)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-ivory-200">
            <div className="w-8 h-8 rounded-lg bg-terracotta-100 text-terracotta-600 flex items-center justify-center">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-charcoal-800">Alert Routing &amp; Notifications</h3>
              <p className="text-xs text-charcoal-500">Configure critical administrative dispatch triggers</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 border border-charcoal-100 cursor-pointer">
              <span className="font-semibold text-charcoal-800">Email Alerts on Account Suspension Events</span>
              <input
                type="checkbox"
                checked={emailAlertsOnSuspension}
                onChange={(e) => setEmailAlertsOnSuspension(e.target.checked)}
                className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl bg-ivory-50 border border-charcoal-100 cursor-pointer">
              <span className="font-semibold text-charcoal-800">Weekly Platform Health Digest</span>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
              />
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={resetAllDemoData}
            className="px-4 py-2 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 bg-ivory-200 hover:bg-ivory-300 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RotateCcw size={13} />
            Reset Demo State
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-soft hover:shadow-lift transition-all flex items-center gap-2"
          >
            <Save size={14} />
            Save Preferences
          </button>
        </div>

      </form>
    </div>
  );
};
