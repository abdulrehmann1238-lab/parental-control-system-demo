import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Smartphone, 
  Users, 
  Hourglass, 
  Bell, 
  MapPin, 
  Battery, 
  Wifi, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Apple 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentOverview: React.FC = () => {
  const { familyMembers, devices, notifications, setSelectedMemberId } = useApp();
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleMemberClick = (memberId: string) => {
    setSelectedMemberId(memberId);
    navigate('/parent/family');
  };

  const recentActivities = [
    {
      id: 'act-1',
      title: "Emma's device synchronized",
      desc: 'Telemetry heartbeat received. Battery at 84%, safe zone active.',
      time: '4 minutes ago',
      icon: <Wifi size={15} className="text-sage-600" />,
      type: 'connection'
    },
    {
      id: 'act-2',
      title: "Noah's screen-time summary updated",
      desc: '1h 45m used today (45m remaining of daily goal).',
      time: '12 minutes ago',
      icon: <Hourglass size={15} className="text-slateBlue-500" />,
      type: 'screen_time'
    },
    {
      id: 'act-3',
      title: 'Location sharing refreshed',
      desc: 'Noah checked in at Westside Middle School Athletics Soccer Field.',
      time: '45 minutes ago',
      icon: <MapPin size={15} className="text-terracotta-500" />,
      type: 'location'
    },
    {
      id: 'act-4',
      title: 'New device permission approved',
      desc: 'Emma re-authorized transparent Screen Time access on iOS 17.5.',
      time: '2 hours ago',
      icon: <ShieldCheck size={15} className="text-sage-600" />,
      type: 'security'
    },
    {
      id: 'act-5',
      title: 'Scheduled digital wellbeing reminder',
      desc: 'Bedtime downtime scheduled to begin at 9:00 PM tonight.',
      time: '5 hours ago',
      icon: <Clock size={15} className="text-charcoal-400" />,
      type: 'reminder'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Good afternoon, Sarah.
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1 font-normal">
            Here's your family's digital wellbeing overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/parent/location"
            className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <MapPin size={14} />
            <span>Open Family Map</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Connected Devices: 2 */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Connected Devices</span>
            <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center">
              <Smartphone size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              {devices.filter(d => d.clientId === 'CLT-8291').length}
            </span>
            <span className="text-xs font-semibold text-status-success">100% online</span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">iPhone 15 Pro &amp; Galaxy S24</p>
        </div>

        {/* Family Members: 2 */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Family Members</span>
            <div className="w-8 h-8 rounded-xl bg-slateBlue-100 text-slateBlue-700 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              {familyMembers.length}
            </span>
            <span className="text-xs font-semibold text-charcoal-500">Enrolled</span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">Emma (14) &amp; Noah (11)</p>
        </div>

        {/* Today's Screen Time: 3h 24m */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Today's Screen Time</span>
            <div className="w-8 h-8 rounded-xl bg-sand-200 text-charcoal-700 flex items-center justify-center">
              <Hourglass size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              3h 24m
            </span>
            <span className="text-xs font-semibold text-status-success">Balanced</span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">Across 2 children's devices</p>
        </div>

        {/* Pending Notifications: 3 */}
        <div className="bg-white p-5 rounded-card border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal-500">Pending Notifications</span>
            <div className="w-8 h-8 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center">
              <Bell size={16} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-charcoal-800 tracking-tight">
              {unreadNotifications}
            </span>
            <span className="text-xs font-semibold text-terracotta-500">Unread</span>
          </div>
          <p className="text-[11px] text-charcoal-400 mt-1">Safety &amp; goal updates</p>
        </div>

      </div>

      {/* Family Members Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-lg text-charcoal-800">
              Family Member Devices
            </h2>
            <p className="text-xs text-charcoal-500">
              Live device health, synchronized location, and screen time balance.
            </p>
          </div>
          <Link
            to="/parent/family"
            className="text-xs font-semibold text-sage-600 hover:text-sage-700 flex items-center gap-1"
          >
            <span>Manage Profiles</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {familyMembers.map((member) => {
            const isIOS = member.platform === 'iOS';
            const hoursUsed = Math.floor(member.todayScreenTimeMinutes / 60);
            const minsUsed = member.todayScreenTimeMinutes % 60;

            const hoursLimit = Math.floor(member.screenTimeLimitMinutes / 60);
            const minsLimit = member.screenTimeLimitMinutes % 60;
            const progress = Math.min(100, Math.round((member.todayScreenTimeMinutes / member.screenTimeLimitMinutes) * 100));

            return (
              <div
                key={member.id}
                className="bg-white rounded-card-lg p-6 border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Member Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-13 h-13 w-12 h-12 rounded-2xl object-cover border-2 border-ivory-300 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold text-base text-charcoal-800">
                            {member.name} ({member.age})
                          </h3>
                          <span className="text-[10px] uppercase font-semibold text-charcoal-400">
                            {member.relationship}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-500 flex items-center gap-1 mt-0.5">
                          {isIOS ? <Apple size={13} className="text-slateBlue-700" /> : <Smartphone size={13} className="text-sage-600" />}
                          <span>{member.deviceName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-status-success-bg text-status-success border border-status-success/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                        Connected
                      </span>
                      <p className="text-[10px] text-charcoal-400 mt-1">
                        Sync: {member.currentMockLocation.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Device Telemetry Pill Row */}
                  <div className="grid grid-cols-2 gap-2.5 mb-5 text-xs">
                    <div className="p-2.5 rounded-xl bg-ivory-100/70 border border-ivory-200 flex items-center gap-2">
                      <Battery size={15} className="text-sage-600" />
                      <span className="text-charcoal-700 font-medium">{member.currentMockLocation.batteryLevel}% Battery</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-ivory-100/70 border border-ivory-200 flex items-center gap-2 truncate">
                      <MapPin size={15} className="text-slateBlue-500 shrink-0" />
                      <span className="text-charcoal-700 font-medium truncate" title={member.currentMockLocation.landmark}>
                        {member.currentMockLocation.landmark}
                      </span>
                    </div>
                  </div>

                  {/* Screen Time Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-charcoal-500">Screen Time Today</span>
                      <span className="font-semibold text-charcoal-800">
                        {hoursUsed}h {minsUsed}m / {hoursLimit}h {minsLimit > 0 ? `${minsLimit}m` : ''}
                      </span>
                    </div>
                    <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sage-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal-400">
                    Bedtime: {member.bedtimeStart}
                  </span>
                  <button
                    onClick={() => handleMemberClick(member.id)}
                    className="px-4 py-1.5 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-card border border-charcoal-100 shadow-subtle p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-ivory-200">
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800">
              Family Activity Feed
            </h3>
            <p className="text-xs text-charcoal-500">
              Verified device check-ins, screen time milestone updates, and wellbeing reminders.
            </p>
          </div>
          <Link
            to="/parent/reports"
            className="text-xs font-semibold text-sage-600 hover:text-sage-700 flex items-center gap-1"
          >
            <span>Full Reports</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-ivory-200">
          {recentActivities.map((act) => (
            <div key={act.id} className="py-3.5 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-ivory-200 flex items-center justify-center shrink-0 mt-0.5">
                  {act.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-charcoal-800">{act.title}</h4>
                  <p className="text-[11px] text-charcoal-500 mt-0.5">{act.desc}</p>
                </div>
              </div>
              <span className="text-[11px] text-charcoal-400 font-mono shrink-0">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
