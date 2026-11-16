import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Trash2, 
  ShieldAlert, 
  Smartphone, 
  Hourglass, 
  User, 
  CheckCheck, 
  Filter 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsCenter: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'device' | 'safety' | 'account'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'device') return n.type === 'device';
    if (activeFilter === 'safety') return n.type === 'safety';
    if (activeFilter === 'account') return n.type === 'account';
    return true;
  });

  const unreadTotal = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Family Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Real-time safe zone arrivals, daily screen-time alerts, and device sync notices.
          </p>
        </div>

        {unreadTotal > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3.5 py-2 bg-white hover:bg-ivory-100 text-sage-700 font-semibold text-xs rounded-xl border border-charcoal-200 shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <CheckCheck size={14} />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ivory-300 pb-2">
        {[
          { id: 'all', label: 'All Notifications', count: notifications.length },
          { id: 'unread', label: 'Unread', count: unreadTotal },
          { id: 'safety', label: 'Safety & Zones' },
          { id: 'device', label: 'Device Status' },
          { id: 'account', label: 'Account & Summary' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeFilter === tab.id
                ? 'bg-sage-600 text-white shadow-xs'
                : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-ivory-200 text-charcoal-600'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-charcoal-100 text-charcoal-400 space-y-2">
            <Bell size={28} className="mx-auto opacity-40 text-charcoal-400" />
            <p className="text-xs font-medium">No notifications in this category.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const icons = {
              safety: <ShieldAlert className="text-terracotta-500" size={18} />,
              device: <Smartphone className="text-sage-600" size={18} />,
              screen_time: <Hourglass className="text-sand-300" size={18} />,
              account: <User className="text-slateBlue-700" size={18} />,
            };

            return (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  notif.read
                    ? 'bg-white border-charcoal-100/80 text-charcoal-700'
                    : 'bg-white border-sage-200 shadow-soft ring-1 ring-sage-500/10'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    notif.read ? 'bg-ivory-100 text-charcoal-400' : 'bg-sage-50 text-sage-600'
                  }`}>
                    {icons[notif.type] || <Bell size={18} />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-charcoal-800">
                        {notif.title}
                      </h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-terracotta-500" />
                      )}
                    </div>
                    <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-charcoal-400 font-mono">
                      <span>{notif.timestamp}</span>
                      {notif.memberName && (
                        <span>• Subject: {notif.memberName}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {!notif.read && (
                    <button
                      onClick={() => markNotificationAsRead(notif.id)}
                      title="Mark as read"
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-sage-700 hover:bg-ivory-200 transition-colors"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    title="Delete notification"
                    className="p-1.5 rounded-lg text-charcoal-400 hover:text-status-critical hover:bg-status-critical-bg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
