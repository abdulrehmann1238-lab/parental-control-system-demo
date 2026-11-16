import React, { useState } from 'react';
import { 
  Hourglass, 
  Moon, 
  Sun, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  TrendingDown, 
  Save, 
  Sparkles,
  Users
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { EMMA_SCREEN_TIME_HISTORY, NOAH_SCREEN_TIME_HISTORY } from '../../data/mockData';

export const ScreenTime: React.FC = () => {
  const { 
    familyMembers, 
    selectedMemberId, 
    setSelectedMemberId, 
    updateScreenTimeLimit, 
    updateSchedule 
  } = useApp();

  const currentMember = familyMembers.find(m => m.id === selectedMemberId) || familyMembers[0];

  // Local form state for goal and schedule
  const [goalMinutes, setGoalMinutes] = useState(currentMember.screenTimeLimitMinutes);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(currentMember.quietHoursEnabled);
  const [quietHoursStart, setQuietHoursStart] = useState(currentMember.quietHoursStart);
  const [quietHoursEnd, setQuietHoursEnd] = useState(currentMember.quietHoursEnd);
  const [bedtimeStart, setBedtimeStart] = useState(currentMember.bedtimeStart);
  const [bedtimeEnd, setBedtimeEnd] = useState(currentMember.bedtimeEnd);

  // Sync state when selected member changes
  const handleSelectMember = (id: string) => {
    setSelectedMemberId(id);
    const m = familyMembers.find(mem => mem.id === id);
    if (m) {
      setGoalMinutes(m.screenTimeLimitMinutes);
      setQuietHoursEnabled(m.quietHoursEnabled);
      setQuietHoursStart(m.quietHoursStart);
      setQuietHoursEnd(m.quietHoursEnd);
      setBedtimeStart(m.bedtimeStart);
      setBedtimeEnd(m.bedtimeEnd);
    }
  };

  const weeklyData = currentMember.name === 'Emma' ? EMMA_SCREEN_TIME_HISTORY : NOAH_SCREEN_TIME_HISTORY;
  const avgMinutes = Math.round(weeklyData.reduce((acc, d) => acc + d.screenTimeMinutes, 0) / weeklyData.length);
  const avgHours = Math.floor(avgMinutes / 60);
  const avgRemainingMins = avgMinutes % 60;

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateScreenTimeLimit(currentMember.id, goalMinutes);
    updateSchedule(currentMember.id, {
      quietHoursEnabled,
      quietHoursStart,
      quietHoursEnd,
      bedtimeStart,
      bedtimeEnd,
    });
  };

  return (
    <div className="space-y-8">
      
      {/* Header & Member Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Digital Wellbeing &amp; Screen Time
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Build healthy relationship with technology through balanced limits and evening quiet hours.
          </p>
        </div>

        {/* Member Selector */}
        <div className="p-1 bg-white border border-charcoal-200 rounded-xl shadow-xs flex items-center">
          {familyMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => handleSelectMember(member.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                currentMember.id === member.id
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-100'
              }`}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span>{member.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle">
          <span className="text-xs font-semibold text-charcoal-500">Today's Usage</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800">
              {Math.floor(currentMember.todayScreenTimeMinutes / 60)}h {currentMember.todayScreenTimeMinutes % 60}m
            </span>
            <span className="text-xs font-semibold text-sage-600">
              of {Math.floor(currentMember.screenTimeLimitMinutes / 60)}h {currentMember.screenTimeLimitMinutes % 60}m goal
            </span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">
            {currentMember.screenTimeLimitMinutes - currentMember.todayScreenTimeMinutes > 0
              ? `${Math.floor((currentMember.screenTimeLimitMinutes - currentMember.todayScreenTimeMinutes) / 60)}h ${(currentMember.screenTimeLimitMinutes - currentMember.todayScreenTimeMinutes) % 60}m remaining`
              : 'Daily goal reached'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle">
          <span className="text-xs font-semibold text-charcoal-500">7-Day Daily Average</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800">
              {avgHours}h {avgRemainingMins}m
            </span>
            <span className="text-xs font-semibold text-status-success flex items-center gap-0.5">
              <TrendingDown size={12} /> -14% vs last week
            </span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">Balanced educational distribution</p>
        </div>

        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle">
          <span className="text-xs font-semibold text-charcoal-500">Quiet Hours Tonight</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-heading font-extrabold text-3xl text-slateBlue-700">
              {currentMember.bedtimeStart}
            </span>
            <span className="text-xs font-semibold text-charcoal-500">
              until {currentMember.bedtimeEnd}
            </span>
          </div>
          <p className="text-[11px] text-status-success font-medium mt-1">
            {currentMember.quietHoursEnabled ? 'Schedule active & synchronized' : 'Disabled'}
          </p>
        </div>

      </div>

      {/* Weekly Graph & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weekly Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-heading font-bold text-base text-charcoal-800">
                Weekly Usage (Past 7 Days for {currentMember.name})
              </h3>
              <p className="text-xs text-charcoal-500">Total daily device active screen minutes</p>
            </div>
            <span className="text-xs font-semibold text-sage-600 bg-sage-50 px-2.5 py-1 rounded-md">
              Target: {Math.floor(currentMember.screenTimeLimitMinutes / 60)}h/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#737C78' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(val: any) => [`${Math.floor(Number(val) / 60)}h ${Number(val) % 60}m`, 'Screen Time']}
                  contentStyle={{ backgroundColor: '#252B2A', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="screenTimeMinutes" fill="#58786B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most-Used App Categories (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800 mb-1">
              Top Categories
            </h3>
            <p className="text-xs text-charcoal-500 mb-4">
              Aggregate distribution this week
            </p>

            <div className="space-y-3.5">
              {[
                { name: 'Education & Study', hours: '5.2h', pct: 40, color: '#58786B' },
                { name: 'Creative & Music', hours: '2.8h', pct: 25, color: '#7893A5' },
                { name: 'Gaming (Roblox, Minecraft)', hours: '2.4h', pct: 20, color: '#C88A3A' },
                { name: 'Streaming & Video', hours: '1.8h', pct: 15, color: '#BD826E' },
              ].map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-charcoal-800">{cat.name}</span>
                    <span className="text-charcoal-500">{cat.hours} ({cat.pct}%)</span>
                  </div>
                  <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-ivory-200 text-[11px] text-charcoal-500">
            Educational apps are exempt from daily recreational quota.
          </div>
        </div>

      </div>

      {/* Goal & Schedule Configuration Form */}
      <form onSubmit={handleSaveAll} className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-6">
        <div>
          <h3 className="font-heading font-bold text-base text-charcoal-800">
            Configure Wellbeing Rules for {currentMember.name}
          </h3>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Adjust limits, quiet hours, and bedtime schedules. Changes sync directly to the child companion app.
          </p>
        </div>

        {/* Goal Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-charcoal-700">
              Daily Recreational Screen-Time Goal:
            </label>
            <span className="font-bold text-base text-sage-700 font-heading">
              {Math.floor(goalMinutes / 60)} hours {goalMinutes % 60 > 0 ? `${goalMinutes % 60} mins` : ''}
            </span>
          </div>
          <input
            type="range"
            min="60"
            max="360"
            step="15"
            value={goalMinutes}
            onChange={(e) => setGoalMinutes(Number(e.target.value))}
            className="w-full accent-sage-600 cursor-pointer h-2 bg-ivory-200 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-charcoal-400">
            <span>1 hour</span>
            <span>2 hours</span>
            <span>3 hours (Recommended)</span>
            <span>4 hours</span>
            <span>6 hours</span>
          </div>
        </div>

        {/* Quiet Hours & Bedtime Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-ivory-200 text-xs">
          
          {/* Bedtime Schedule */}
          <div className="space-y-3 p-4 rounded-xl bg-ivory-50 border border-charcoal-100">
            <div className="flex items-center gap-2">
              <Moon size={16} className="text-slateBlue-700" />
              <h4 className="font-bold text-charcoal-800">Bedtime Downtime</h4>
            </div>
            <p className="text-[11px] text-charcoal-500">
              Encourages healthy sleep by dimming screen and pausing entertainment notifications.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">Starts at</label>
                <input
                  type="time"
                  value={bedtimeStart}
                  onChange={(e) => setBedtimeStart(e.target.value)}
                  className="w-full p-2 bg-white border border-charcoal-200 rounded-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">Ends at</label>
                <input
                  type="time"
                  value={bedtimeEnd}
                  onChange={(e) => setBedtimeEnd(e.target.value)}
                  className="w-full p-2 bg-white border border-charcoal-200 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>

          {/* Quiet Hours Toggle */}
          <div className="space-y-3 p-4 rounded-xl bg-ivory-50 border border-charcoal-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-sand-300" />
                <h4 className="font-bold text-charcoal-800">Quiet Study Hours</h4>
              </div>
              <input
                type="checkbox"
                checked={quietHoursEnabled}
                onChange={(e) => setQuietHoursEnabled(e.target.checked)}
                className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
              />
            </div>
            <p className="text-[11px] text-charcoal-500">
              Enables focused study mode during homework hours.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">Starts at</label>
                <input
                  type="time"
                  value={quietHoursStart}
                  onChange={(e) => setQuietHoursStart(e.target.value)}
                  disabled={!quietHoursEnabled}
                  className="w-full p-2 bg-white border border-charcoal-200 rounded-lg font-mono disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-charcoal-600 mb-1">Ends at</label>
                <input
                  type="time"
                  value={quietHoursEnd}
                  onChange={(e) => setQuietHoursEnd(e.target.value)}
                  disabled={!quietHoursEnabled}
                  className="w-full p-2 bg-white border border-charcoal-200 rounded-lg font-mono disabled:opacity-50"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-soft hover:shadow-lift transition-all flex items-center gap-2"
          >
            <Save size={14} />
            <span>Save Wellbeing Schedule</span>
          </button>
        </div>
      </form>

    </div>
  );
};
