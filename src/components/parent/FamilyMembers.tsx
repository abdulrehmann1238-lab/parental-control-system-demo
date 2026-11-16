import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Smartphone, 
  Hourglass, 
  MapPin, 
  Moon, 
  CheckCircle2, 
  Settings, 
  ArrowRight,
  Apple
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { useNavigate } from 'react-router-dom';

export const FamilyMembers: React.FC = () => {
  const { familyMembers, updateScreenTimeLimit, updateSchedule, setSelectedMemberId, addToast } = useApp();
  const navigate = useNavigate();

  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAge, setNewMemberAge] = useState('8');
  const [newMemberRole, setNewMemberRole] = useState('Child');

  const handleSaveGoal = () => {
    if (editingMember) {
      updateScreenTimeLimit(editingMember.id, editingMember.screenTimeLimitMinutes);
      updateSchedule(editingMember.id, {
        quietHoursEnabled: editingMember.quietHoursEnabled,
        bedtimeStart: editingMember.bedtimeStart,
        bedtimeEnd: editingMember.bedtimeEnd,
      });
      setEditingMember(null);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    addToast('Family Member Added', `${newMemberName} has been enrolled into your family profile.`, 'success');
    setShowAddModal(false);
    setNewMemberName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
            Family Member Profiles
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Personalized guidelines, enrolled device associations, and bedtime boundaries.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Add Family Member</span>
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {familyMembers.map((member) => {
          const isIOS = member.platform === 'iOS';

          return (
            <div
              key={member.id}
              className="bg-white rounded-card-lg p-6 border border-charcoal-100 shadow-subtle flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between pb-4 border-b border-ivory-200">
                  <div className="flex items-center gap-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-ivory-300 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-lg text-charcoal-800">{member.name}</h3>
                        <span className="text-xs text-charcoal-400 font-medium">({member.age} yrs)</span>
                      </div>
                      <p className="text-xs text-sage-600 font-semibold">{member.relationship}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditingMember({ ...member })}
                    className="p-2 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-charcoal-600 transition-colors"
                    title="Edit Guidelines & Schedules"
                  >
                    <Settings size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="py-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-500 flex items-center gap-2">
                      {isIOS ? <Apple size={14} className="text-slateBlue-700" /> : <Smartphone size={14} className="text-sage-600" />}
                      Enrolled Device:
                    </span>
                    <span className="font-semibold text-charcoal-800">{member.deviceName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-500 flex items-center gap-2">
                      <Hourglass size={14} className="text-sand-300" />
                      Daily Screen-Time Goal:
                    </span>
                    <span className="font-semibold text-charcoal-800">
                      {Math.floor(member.screenTimeLimitMinutes / 60)}h {member.screenTimeLimitMinutes % 60 > 0 ? `${member.screenTimeLimitMinutes % 60}m` : ''}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-500 flex items-center gap-2">
                      <Moon size={14} className="text-slateBlue-400" />
                      Bedtime Downtime:
                    </span>
                    <span className="font-semibold text-charcoal-800">
                      {member.bedtimeStart} – {member.bedtimeEnd}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-charcoal-500 flex items-center gap-2">
                      <MapPin size={14} className="text-terracotta-500" />
                      Current Location:
                    </span>
                    <span className="font-semibold text-charcoal-800 truncate max-w-[200px]" title={member.currentMockLocation.landmark}>
                      {member.currentMockLocation.landmark}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-ivory-200 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedMemberId(member.id);
                    navigate('/parent/screen-time');
                  }}
                  className="flex-1 py-2 bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 font-semibold text-xs rounded-xl transition-colors text-center"
                >
                  Screen Time
                </button>
                <button
                  onClick={() => {
                    setSelectedMemberId(member.id);
                    navigate('/parent/location');
                  }}
                  className="flex-1 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors text-center"
                >
                  View Location
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Member Schedule Modal */}
      <Modal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        title={`Edit Rules for ${editingMember?.name || ''}`}
        subtitle="Configure daily time allowance and evening quiet hours"
      >
        {editingMember && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">
                Daily Screen Time Goal (Minutes: {editingMember.screenTimeLimitMinutes}m = {Math.floor(editingMember.screenTimeLimitMinutes / 60)}h {editingMember.screenTimeLimitMinutes % 60}m)
              </label>
              <input
                type="range"
                min="60"
                max="360"
                step="15"
                value={editingMember.screenTimeLimitMinutes}
                onChange={(e) => setEditingMember({ ...editingMember, screenTimeLimitMinutes: Number(e.target.value) })}
                className="w-full accent-sage-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Bedtime Starts</label>
                <input
                  type="time"
                  value={editingMember.bedtimeStart}
                  onChange={(e) => setEditingMember({ ...editingMember, bedtimeStart: e.target.value })}
                  className="w-full p-2 bg-ivory-50 border border-charcoal-200 rounded-xl font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-charcoal-700 mb-1">Bedtime Ends</label>
                <input
                  type="time"
                  value={editingMember.bedtimeEnd}
                  onChange={(e) => setEditingMember({ ...editingMember, bedtimeEnd: e.target.value })}
                  className="w-full p-2 bg-ivory-50 border border-charcoal-200 rounded-xl font-mono text-xs"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 p-3 bg-ivory-100 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={editingMember.quietHoursEnabled}
                onChange={(e) => setEditingMember({ ...editingMember, quietHoursEnabled: e.target.checked })}
                className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
              />
              <span className="font-semibold text-charcoal-800">
                Enforce Quiet Hours &amp; Downtime Notifications
              </span>
            </label>

            <div className="pt-3 border-t border-ivory-300 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-4 py-2 text-charcoal-600 hover:bg-ivory-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveGoal}
                className="px-5 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-xl"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Member Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Family Member"
        subtitle="Create an enrolled profile for a child or dependent"
      >
        <form onSubmit={handleAddMember} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Name</label>
            <input
              type="text"
              required
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="e.g. Leo"
              className="w-full p-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Age</label>
              <input
                type="number"
                min="3"
                max="18"
                value={newMemberAge}
                onChange={(e) => setNewMemberAge(e.target.value)}
                className="w-full p-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-charcoal-700 mb-1">Relationship</label>
              <select
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                className="w-full p-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl"
              >
                <option value="Daughter">Daughter</option>
                <option value="Son">Son</option>
                <option value="Dependent">Dependent</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-ivory-100 rounded-xl text-charcoal-600">
            Once added, you can pair their mobile device via the Child Companion onboarding QR code.
          </div>

          <div className="pt-3 border-t border-ivory-300 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-charcoal-600 hover:bg-ivory-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-xl"
            >
              Create Profile
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
