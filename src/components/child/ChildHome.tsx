import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Hourglass, 
  Users, 
  ArrowRight, 
  Bell, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChildHome: React.FC = () => {
  const { familyMembers, devices } = useApp();
  const [showWelcome, setShowWelcome] = useState(false);

  // Default to Emma's companion status
  const member = familyMembers[0]; // Emma
  const device = devices.find(d => d.id === member.deviceId) || devices[0];

  const hoursUsed = Math.floor(member.todayScreenTimeMinutes / 60);
  const minsUsed = member.todayScreenTimeMinutes % 60;
  const hoursLimit = Math.floor(member.screenTimeLimitMinutes / 60);
  const remainingMins = Math.max(0, member.screenTimeLimitMinutes - member.todayScreenTimeMinutes);

  // If in Welcome mode (PRD 9.1)
  if (showWelcome) {
    return (
      <div className="flex flex-col items-center text-center justify-between min-h-[500px] py-6 px-2">
        <div className="w-16 h-16 rounded-3xl bg-sage-50 text-sage-600 border border-sage-200 flex items-center justify-center shadow-soft mb-4">
          <ShieldCheck size={36} />
        </div>

        <div>
          <h2 className="font-heading font-extrabold text-2xl text-charcoal-800 tracking-tight leading-tight">
            Your Family, Connected.
          </h2>
          <p className="text-xs text-charcoal-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Manage your device permissions and family safety preferences.
          </p>
        </div>

        <div className="w-full space-y-3 pt-6">
          <Link
            to="/child/enrollment"
            className="w-full py-3 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-soft flex items-center justify-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            to="/child/permissions"
            className="w-full py-3 bg-white border border-charcoal-200 text-charcoal-700 font-semibold text-xs rounded-xl hover:bg-ivory-100 flex items-center justify-center gap-1.5"
          >
            Learn About Permissions
          </Link>
        </div>

        <button
          onClick={() => setShowWelcome(false)}
          className="text-[11px] text-sage-600 font-medium underline mt-4"
        >
          &larr; Switch to Active Device View
        </button>
      </div>
    );
  }

  // Active Companion Home View (PRD 9.3)
  return (
    <div className="space-y-4">
      
      {/* Top Welcome Switcher Link */}
      <div className="flex items-center justify-between pb-1">
        <div>
          <h2 className="font-heading font-bold text-base text-charcoal-800">
            Hi, {member.name}
          </h2>
          <p className="text-[10px] text-charcoal-400">
            Aegis Family Protection Active
          </p>
        </div>
        <button
          onClick={() => setShowWelcome(true)}
          className="text-[10px] font-semibold text-sage-700 bg-sage-50 border border-sage-200 px-2 py-0.5 rounded-full"
        >
          View Intro Screen
        </button>
      </div>

      {/* 1. Device Connection Status */}
      <div className="bg-white p-3.5 rounded-2xl border border-charcoal-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-status-success-bg text-status-success flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-charcoal-400">Device Connection</p>
            <p className="text-xs font-bold text-charcoal-800">Protected &amp; Synchronized</p>
          </div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
      </div>

      {/* 2. Family Connection Status */}
      <div className="bg-white p-3.5 rounded-2xl border border-charcoal-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slateBlue-100 text-slateBlue-700 flex items-center justify-center">
            <Users size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-charcoal-400">Family Account</p>
            <p className="text-xs font-bold text-charcoal-800">Paired with Sarah Jenkins</p>
          </div>
        </div>
        <span className="text-[10px] text-sage-600 font-semibold bg-sage-50 px-2 py-0.5 rounded">
          Active
        </span>
      </div>

      {/* 3. Screen Time Summary */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-100 shadow-xs space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-charcoal-800 flex items-center gap-1.5">
            <Hourglass size={14} className="text-sand-300" />
            Today's Screen Time
          </span>
          <span className="text-[11px] font-semibold text-sage-600">
            {Math.floor(remainingMins / 60)}h {remainingMins % 60}m left
          </span>
        </div>

        <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-sage-600 rounded-full"
            style={{ width: `${Math.min(100, Math.round((member.todayScreenTimeMinutes / member.screenTimeLimitMinutes) * 100))}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-charcoal-400">
          <span>Used: {hoursUsed}h {minsUsed}m</span>
          <span>Goal: {hoursLimit}h {member.screenTimeLimitMinutes % 60 > 0 ? `${member.screenTimeLimitMinutes % 60}m` : ''}</span>
        </div>
      </div>

      {/* 4. Location-Sharing Status */}
      <div className="bg-white p-3.5 rounded-2xl border border-charcoal-100 shadow-xs flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center shrink-0 mt-0.5">
          <MapPin size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase font-bold text-charcoal-400">Current Safe Zone</p>
          <p className="text-xs font-bold text-charcoal-800 truncate">{member.currentMockLocation.landmark}</p>
          <p className="text-[10px] text-charcoal-500 mt-0.5">
            Verified with GPS • {member.currentMockLocation.timestamp}
          </p>
        </div>
      </div>

      {/* 5. Permission Overview Card */}
      <div className="bg-white p-3.5 rounded-2xl border border-charcoal-100 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-charcoal-700">Active Permissions</span>
          <Link to="/child/permissions" className="text-[10px] text-sage-600 font-semibold hover:underline">
            Manage &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
          {Object.entries(device.permissions).map(([key, enabled]) => (
            <div key={key} className="p-1.5 rounded-lg bg-ivory-100 flex items-center justify-between">
              <span className="capitalize text-charcoal-600 truncate">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className={`font-bold ${enabled ? 'text-status-success' : 'text-charcoal-400'}`}>
                {enabled ? 'ON' : 'OFF'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Recent Safety Notification */}
      <div className="p-3 bg-sage-50 rounded-2xl border border-sage-200/70 text-xs flex items-start gap-2.5">
        <Bell size={15} className="text-sage-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sage-800 text-[11px]">Safe Arrival Verified</p>
          <p className="text-[10px] text-sage-700 mt-0.5">
            Your parent received notification that you reached Lincoln Park Community Center.
          </p>
        </div>
      </div>

    </div>
  );
};
