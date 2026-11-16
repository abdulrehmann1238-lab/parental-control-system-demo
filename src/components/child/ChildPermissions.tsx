import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Hourglass, 
  Bell, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Settings,
  Info 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DevicePermissions } from '../../types';
import { Modal } from '../common/Modal';

export const ChildPermissions: React.FC = () => {
  const { devices, toggleDevicePermission, familyMembers } = useApp();
  
  // Use Emma's iPhone by default (or Noah's)
  const childDevice = devices[0];
  const permissions = childDevice.permissions;

  const [activeModalPerm, setActiveModalPerm] = useState<keyof DevicePermissions | null>(null);

  const permissionItems = [
    {
      key: 'locationSharing' as keyof DevicePermissions,
      title: 'Location Sharing',
      description: 'Shares verified safe zone check-ins and current location breadcrumbs with family.',
      icon: <MapPin size={18} className="text-slateBlue-500" />,
      detail: 'This allows parents to see when you safely reach school, home, or athletics. Location is never shared with third-party advertisers.'
    },
    {
      key: 'appUsageSummary' as keyof DevicePermissions,
      title: 'Device Activity Summary',
      description: 'Summarizes high-level usage categories (Study, Games, Videos) without private content.',
      icon: <BarChart3 size={18} className="text-sage-600" />,
      detail: 'Reports total daily active minutes per app genre. Your personal files, photos, and chat logs are completely private and inaccessible.'
    },
    {
      key: 'notificationRelay' as keyof DevicePermissions,
      title: 'Notifications',
      description: 'Delivers friendly reminders for upcoming bedtime, quiet hours, and daily goals.',
      icon: <Bell size={18} className="text-terracotta-500" />,
      detail: 'Used to alert you 15 minutes before quiet study hours begin and when bedtime mode starts.'
    },
    {
      key: 'screenTimeAccess' as keyof DevicePermissions,
      title: 'Digital Wellbeing',
      description: 'Tracks recreational screen-time allowances to promote balanced digital habits.',
      icon: <Hourglass size={18} className="text-sand-300" />,
      detail: 'Helps ensure screen time does not interfere with sleep, schoolwork, and outdoor exercise.'
    },
  ];

  return (
    <div className="space-y-4 text-xs">
      
      {/* Header */}
      <div>
        <h2 className="font-heading font-extrabold text-base text-charcoal-800">
          Privacy &amp; Permissions
        </h2>
        <p className="text-[11px] text-charcoal-500 mt-0.5">
          Review and control what is shared with your family dashboard.
        </p>
      </div>

      {/* Assurance banner */}
      <div className="p-3 bg-ivory-50 rounded-xl border border-charcoal-100 flex items-start gap-2 text-[11px] text-charcoal-600">
        <ShieldCheck size={16} className="text-sage-600 shrink-0 mt-0.5" />
        <span>
          <strong>Zero Hidden Access:</strong> You have full visibility over every capability enabled on this device.
        </span>
      </div>

      {/* Permission Cards */}
      <div className="space-y-3">
        {permissionItems.map((item) => {
          const isEnabled = permissions[item.key];

          return (
            <div
              key={item.key}
              className={`p-3.5 rounded-2xl border transition-all ${
                isEnabled
                  ? 'bg-white border-sage-200 shadow-xs'
                  : 'bg-white border-charcoal-200/70 opacity-90'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-ivory-100 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-charcoal-800">{item.title}</h3>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold mt-0.5 ${
                      isEnabled ? 'text-status-success' : 'text-charcoal-400'
                    }`}>
                      {isEnabled ? (
                        <>
                          <CheckCircle2 size={11} /> Authorized
                        </>
                      ) : (
                        <>
                          <XCircle size={11} /> Disabled
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => toggleDevicePermission(childDevice.id, item.key)}
                  className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    isEnabled ? 'bg-sage-600' : 'bg-charcoal-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      isEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <p className="text-[11px] text-charcoal-500 leading-relaxed mb-3">
                {item.description}
              </p>

              <button
                onClick={() => setActiveModalPerm(item.key)}
                className="w-full py-1.5 bg-ivory-100 hover:bg-ivory-200 text-charcoal-700 font-semibold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <Info size={12} />
                <span>Learn How This Works</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Permission Detail Modal */}
      <Modal
        isOpen={!!activeModalPerm}
        onClose={() => setActiveModalPerm(null)}
        title={activeModalPerm ? permissionItems.find(p => p.key === activeModalPerm)?.title || '' : ''}
        subtitle="Transparent Permission Guarantee"
      >
        {activeModalPerm && (
          <div className="space-y-4 text-xs">
            <p className="text-charcoal-600 leading-relaxed">
              {permissionItems.find(p => p.key === activeModalPerm)?.detail}
            </p>

            <div className="p-3 bg-sage-50 rounded-xl border border-sage-200 text-sage-900 text-[11px]">
              This permission can be toggled by either you on this device or by your family administrator. All changes are logged for mutual family clarity.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModalPerm(null)}
                className="px-4 py-2 bg-sage-600 text-white font-semibold rounded-xl text-xs"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
