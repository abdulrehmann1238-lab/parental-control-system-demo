import React from 'react';
import { 
  Hourglass, 
  Moon, 
  Sun, 
  Sparkles, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  Award 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EMMA_SCREEN_TIME_HISTORY } from '../../data/mockData';

export const ChildWellbeing: React.FC = () => {
  const { familyMembers } = useApp();
  const member = familyMembers[0]; // Emma

  const hoursUsed = Math.floor(member.todayScreenTimeMinutes / 60);
  const minsUsed = member.todayScreenTimeMinutes % 60;
  const hoursGoal = Math.floor(member.screenTimeLimitMinutes / 60);
  const remainingMins = Math.max(0, member.screenTimeLimitMinutes - member.todayScreenTimeMinutes);

  const pct = Math.min(100, Math.round((member.todayScreenTimeMinutes / member.screenTimeLimitMinutes) * 100));

  return (
    <div className="space-y-4 text-xs">
      
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-base text-charcoal-800">
          Digital Wellbeing
        </h2>
        <p className="text-[11px] text-charcoal-500 mt-0.5">
          Track your daily usage and maintain healthy screen habits.
        </p>
      </div>

      {/* Circular / Hero Progress Card */}
      <div className="bg-white p-5 rounded-2xl border border-charcoal-100 shadow-soft text-center space-y-3">
        <span className="text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">
          Daily Screen Allowance
        </span>

        {/* Circular Progress Meter */}
        <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#F1F2ED"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Animated Progress ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#58786B"
              strokeWidth="9"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * pct) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center text */}
          <div className="absolute flex flex-col items-center">
            <span className="font-heading font-extrabold text-2xl text-charcoal-800 leading-none">
              {hoursUsed}h {minsUsed}m
            </span>
            <span className="text-[10px] text-charcoal-400 mt-1">Used today</span>
          </div>
        </div>

        {/* Remaining Goal Text */}
        <div className="p-2.5 rounded-xl bg-sage-50 border border-sage-100 flex items-center justify-center gap-2 text-sage-800 font-semibold text-xs">
          <Sparkles size={14} className="text-sage-600" />
          <span>
            {Math.floor(remainingMins / 60)}h {remainingMins % 60}m remaining of your {hoursGoal}h goal
          </span>
        </div>
      </div>

      {/* Bedtime & Quiet Hours Schedule Status */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Bedtime */}
        <div className="p-3.5 bg-white rounded-2xl border border-charcoal-100 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-slateBlue-700">
            <Moon size={15} />
            <span className="font-bold text-[11px]">Bedtime</span>
          </div>
          <p className="font-heading font-extrabold text-base text-charcoal-800">
            {member.bedtimeStart}
          </p>
          <p className="text-[10px] text-charcoal-400">
            Starts at 9:30 PM tonight
          </p>
        </div>

        {/* Quiet Hours */}
        <div className="p-3.5 bg-white rounded-2xl border border-charcoal-100 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-sand-300">
            <Sun size={15} />
            <span className="font-bold text-[11px]">Quiet Study</span>
          </div>
          <p className="font-heading font-extrabold text-base text-charcoal-800">
            {member.quietHoursStart}
          </p>
          <p className="text-[10px] text-charcoal-400">
            Downtime reminders active
          </p>
        </div>

      </div>

      {/* Weekly Consistency Badge */}
      <div className="p-3.5 bg-white rounded-2xl border border-charcoal-100 shadow-xs flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
          <Award size={20} />
        </div>
        <div>
          <p className="font-bold text-charcoal-800">Balanced Habits Streak: 5 Days</p>
          <p className="text-[10px] text-charcoal-500 mt-0.5">
            You stayed within your daily screen goal for 5 days in a row!
          </p>
        </div>
      </div>

      {/* 7-Day Mini Bar Overview */}
      <div className="p-3.5 bg-white rounded-2xl border border-charcoal-100 shadow-xs space-y-2">
        <span className="text-[11px] font-bold text-charcoal-700">Past 7 Days History</span>
        <div className="flex items-end justify-between gap-1.5 h-20 pt-2">
          {EMMA_SCREEN_TIME_HISTORY.map((d, idx) => {
            const hPct = Math.min(100, (d.screenTimeMinutes / 270) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div
                  className="w-full max-w-[18px] bg-sage-500/80 rounded-t-md hover:bg-sage-600 transition-all"
                  style={{ height: `${hPct}%` }}
                  title={`${d.day}: ${Math.floor(d.screenTimeMinutes / 60)}h ${d.screenTimeMinutes % 60}m`}
                />
                <span className="text-[9px] text-charcoal-400">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
