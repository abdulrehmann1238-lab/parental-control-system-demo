import React, { useState } from 'react';
import { 
  Smartphone, 
  Apple, 
  Battery, 
  Wifi, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  ChevronRight, 
  MapPin, 
  Hourglass, 
  Bell, 
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Device, DevicePermissions } from '../../types';
import { Modal } from '../common/Modal';

export const ConnectedDevices: React.FC = () => {
  const { devices, toggleDevicePermission, addToast } = useApp();
  const parentDevices = devices.filter((d) => d.clientId === 'CLT-8291');

  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleSyncTest = (deviceName: string) => {
    addToast('Telemetry Synchronized', `Heartbeat ping received from ${deviceName}. Latency: 24ms.`, 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Connected Devices
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Manage enrolled endpoints, inspect transparent consent permissions, and verify telemetry status.
          </p>
        </div>
        <div className="text-xs text-charcoal-500 font-medium bg-white px-3 py-1.5 rounded-xl border border-charcoal-100 shadow-xs">
          {parentDevices.length} Enrolled Family Devices
        </div>
      </div>

      {/* Device Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {parentDevices.map((device) => {
          const isIOS = device.platform === 'iOS';

          return (
            <div
              key={device.id}
              className="bg-white rounded-card-lg p-6 border border-charcoal-100 shadow-subtle hover:shadow-soft transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      isIOS ? 'bg-slateBlue-100 text-slateBlue-700' : 'bg-sage-100 text-sage-700'
                    }`}>
                      {isIOS ? <Apple size={24} /> : <Smartphone size={24} />}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-charcoal-800">
                        {device.deviceName}
                      </h3>
                      <p className="text-xs text-charcoal-500">{device.model}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-status-success-bg text-status-success border border-status-success/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                    {device.enrollmentStatus}
                  </span>
                </div>

                {/* Telemetry Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-ivory-200 text-xs mb-4">
                  <div className="text-center p-2 rounded-xl bg-ivory-50">
                    <span className="text-[10px] text-charcoal-400 uppercase font-medium">Battery</span>
                    <p className="font-bold text-charcoal-800 flex items-center justify-center gap-1 mt-0.5">
                      <Battery size={13} className="text-sage-600" />
                      {device.batteryLevel}%
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-ivory-50">
                    <span className="text-[10px] text-charcoal-400 uppercase font-medium">OS Version</span>
                    <p className="font-bold text-charcoal-800 mt-0.5 truncate">{device.osVersion}</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-ivory-50">
                    <span className="text-[10px] text-charcoal-400 uppercase font-medium">Last Sync</span>
                    <p className="font-bold text-charcoal-800 mt-0.5 truncate">{device.lastSync}</p>
                  </div>
                </div>

                {/* Permissions Quick Overview */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-charcoal-500 uppercase tracking-wide">
                    Authorized Sharing Permissions
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(device.permissions).map(([perm, enabled]) => (
                      <div
                        key={perm}
                        className={`p-2 rounded-lg border flex items-center justify-between ${
                          enabled
                            ? 'bg-sage-50/70 border-sage-200 text-sage-800'
                            : 'bg-ivory-100 border-ivory-200 text-charcoal-400'
                        }`}
                      >
                        <span className="capitalize text-[11px] font-medium">
                          {perm.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-[10px] font-bold">
                          {enabled ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleSyncTest(device.deviceName)}
                  className="px-3 py-1.5 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-charcoal-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={12} />
                  <span>Test Sync</span>
                </button>
                <button
                  onClick={() => setSelectedDevice(device)}
                  className="px-4 py-1.5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Settings size={13} />
                  <span>Manage Permissions</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permission Management Modal */}
      <Modal
        isOpen={!!selectedDevice}
        onClose={() => setSelectedDevice(null)}
        title={selectedDevice ? `Permissions for ${selectedDevice.deviceName}` : ''}
        subtitle="Transparent, consent-based telemetry controls"
      >
        {selectedDevice && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-ivory-100 rounded-xl border border-charcoal-100 leading-relaxed text-charcoal-600">
              Toggling permissions here updates the authorized sharing configuration. 
              The child companion application will immediately reflect these privacy adjustments.
            </div>

            <div className="space-y-3">
              {[
                {
                  key: 'locationSharing' as keyof DevicePermissions,
                  title: 'Location Sharing',
                  desc: 'Periodic authorized GPS check-ins and safe zone arrival notifications.',
                  icon: <MapPin size={16} className="text-slateBlue-500" />
                },
                {
                  key: 'screenTimeAccess' as keyof DevicePermissions,
                  title: 'Screen Time Access',
                  desc: 'Aggregate daily usage totals and categorized app statistics.',
                  icon: <Hourglass size={16} className="text-sand-300" />
                },
                {
                  key: 'notificationRelay' as keyof DevicePermissions,
                  title: 'Notification Relay',
                  desc: 'Downtime warnings, quiet hours reminders, and safe zone alerts.',
                  icon: <Bell size={16} className="text-terracotta-500" />
                },
                {
                  key: 'appUsageSummary' as keyof DevicePermissions,
                  title: 'App Usage Summary',
                  desc: 'High-level application categories (Education, Entertainment, Games).',
                  icon: <BarChart3 size={16} className="text-sage-600" />
                },
              ].map((item) => {
                const currentDevice = devices.find(d => d.id === selectedDevice.id) || selectedDevice;
                const isEnabled = currentDevice.permissions[item.key];

                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl border border-charcoal-200 bg-white flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-ivory-100 shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-bold text-charcoal-800 text-xs">{item.title}</p>
                        <p className="text-[11px] text-charcoal-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleDevicePermission(selectedDevice.id, item.key)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isEnabled ? 'bg-sage-600' : 'bg-charcoal-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-ivory-300 flex justify-end">
              <button
                onClick={() => setSelectedDevice(null)}
                className="px-5 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
