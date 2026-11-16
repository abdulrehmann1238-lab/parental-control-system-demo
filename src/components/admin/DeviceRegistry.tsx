import React, { useState } from 'react';
import { 
  Smartphone, 
  Apple, 
  Search, 
  Filter, 
  Wifi, 
  Battery, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical, 
  ShieldCheck, 
  Eye, 
  RefreshCw 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Device, EnrollmentStatus } from '../../types';
import { Modal } from '../common/Modal';

export const DeviceRegistry: React.FC = () => {
  const { devices, updateDeviceEnrollmentStatus } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'iOS' | 'Android'>('All');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceDetailModal, setDeviceDetailModal] = useState<Device | null>(null);

  const filteredDevices = devices.filter((d) => {
    const matchesSearch =
      d.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlatform = platformFilter === 'All' || d.platform === platformFilter;

    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Device Registry
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Global catalog of registered companion mobile endpoints and telemetry heartbeats.
          </p>
        </div>
        <div className="text-xs text-charcoal-500 font-medium">
          Showing <span className="font-bold text-charcoal-800">{filteredDevices.length}</span> enrolled endpoints
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-charcoal-100 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by device, model, or client..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-ivory-50 border border-charcoal-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 text-charcoal-800 placeholder:text-charcoal-400"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-charcoal-400" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-charcoal-500 font-medium">Platform:</span>
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value as any)}
            className="bg-ivory-50 border border-charcoal-200 rounded-xl px-3 py-1.5 text-xs font-medium text-charcoal-700"
          >
            <option value="All">All Platforms</option>
            <option value="iOS">Apple iOS</option>
            <option value="Android">Google Android</option>
          </select>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-white rounded-2xl border border-charcoal-100 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-ivory-100/70 border-b border-ivory-300 text-charcoal-600 font-semibold select-none">
                <th className="py-3.5 px-4">Device Name</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Associated Client</th>
                <th className="py-3.5 px-4">Enrollment Status</th>
                <th className="py-3.5 px-4">Last Connection</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200">
              {filteredDevices.map((device) => {
                const isOnline = device.enrollmentStatus === 'Enrolled';

                return (
                  <tr key={device.id} className="hover:bg-ivory-50/70 transition-colors">
                    {/* Device Name & Model */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          device.platform === 'iOS' 
                            ? 'bg-slateBlue-100 text-slateBlue-700' 
                            : 'bg-sage-100 text-sage-700'
                        }`}>
                          {device.platform === 'iOS' ? <Apple size={18} /> : <Smartphone size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-charcoal-800">{device.deviceName}</p>
                          <p className="text-[11px] text-charcoal-500 font-mono">{device.model}</p>
                        </div>
                      </div>
                    </td>

                    {/* Platform */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-charcoal-700">{device.platform}</span>
                      <p className="text-[10px] text-charcoal-400">{device.osVersion}</p>
                    </td>

                    {/* Client */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-charcoal-800">{device.clientName}</span>
                      <p className="text-[10px] font-mono text-charcoal-400">{device.clientId}</p>
                    </td>

                    {/* Enrollment Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        device.enrollmentStatus === 'Enrolled'
                          ? 'bg-status-success-bg text-status-success border-status-success/30'
                          : device.enrollmentStatus === 'Pending'
                          ? 'bg-sand-200 text-charcoal-700 border-sand-300'
                          : 'bg-terracotta-100 text-terracotta-700 border-terracotta-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          device.enrollmentStatus === 'Enrolled' ? 'bg-status-success' : 'bg-amber-500'
                        }`} />
                        {device.enrollmentStatus}
                      </span>
                    </td>

                    {/* Connection */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 text-charcoal-600">
                        <Battery size={13} className="text-sage-600" />
                        <span>{device.batteryLevel}%</span>
                        <span className="text-charcoal-400">•</span>
                        <span className="text-[11px] text-charcoal-500">{device.lastSync}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setDeviceDetailModal(device)}
                          className="px-2.5 py-1 bg-ivory-200 hover:bg-ivory-300 text-charcoal-700 font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Eye size={12} />
                          Details
                        </button>
                        <button
                          onClick={() => {
                            const nextStatus: EnrollmentStatus = 
                              device.enrollmentStatus === 'Enrolled' ? 'Disconnected' : 'Enrolled';
                            updateDeviceEnrollmentStatus(device.id, nextStatus);
                          }}
                          className="px-2.5 py-1 bg-white border border-charcoal-200 hover:bg-ivory-100 text-charcoal-700 font-semibold text-[11px] rounded-lg transition-colors"
                        >
                          {device.enrollmentStatus === 'Enrolled' ? 'Simulate Disconnect' : 'Reconnect'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Details Modal */}
      <Modal
        isOpen={!!deviceDetailModal}
        onClose={() => setDeviceDetailModal(null)}
        title={deviceDetailModal?.deviceName || 'Device Enrollment Details'}
        subtitle="Transparent hardware telemetry & authorized permissions"
      >
        {deviceDetailModal && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-ivory-100 border border-charcoal-100 space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Device ID:</span>
                <span className="font-mono font-semibold text-charcoal-800">{deviceDetailModal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Hardware Model:</span>
                <span className="font-semibold text-charcoal-800">{deviceDetailModal.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Operating System:</span>
                <span className="font-semibold text-charcoal-800">{deviceDetailModal.osVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Assigned Family Member:</span>
                <span className="font-semibold text-charcoal-800">{deviceDetailModal.assignedUser}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Battery Level:</span>
                <span className="font-semibold text-charcoal-800">{deviceDetailModal.batteryLevel}%</span>
              </div>
            </div>

            <h4 className="font-bold text-xs text-charcoal-800 pt-1">
              Active Authorized Permissions
            </h4>
            <div className="space-y-2">
              {Object.entries(deviceDetailModal.permissions).map(([perm, enabled]) => (
                <div key={perm} className="flex items-center justify-between p-2.5 rounded-lg bg-ivory-50 border border-ivory-200">
                  <span className="capitalize font-medium text-charcoal-700">
                    {perm.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    enabled ? 'bg-status-success-bg text-status-success' : 'bg-ivory-200 text-charcoal-500'
                  }`}>
                    {enabled ? 'Authorized' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-ivory-300 flex justify-end">
              <button
                onClick={() => setDeviceDetailModal(null)}
                className="px-4 py-2 bg-sage-600 text-white font-semibold rounded-xl text-xs"
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
