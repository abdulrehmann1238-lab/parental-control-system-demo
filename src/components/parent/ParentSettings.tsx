import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Lock, 
  Eye, 
  ShieldCheck, 
  Globe, 
  Save, 
  KeyRound, 
  Smartphone,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentSettings: React.FC = () => {
  const { addToast } = useApp();

  // Profile Form State
  const [parentName, setParentName] = useState('Sarah Jenkins');
  const [parentEmail, setParentEmail] = useState('parent@demo.com');
  const [parentPhone, setParentPhone] = useState('+1 (555) 234-8901');
  const [familyName, setFamilyName] = useState('Jenkins Family');

  // Preferences
  const [language, setLanguage] = useState('en-US');
  const [timezone, setTimezone] = useState('America/Chicago');
  const [themePreference, setThemePreference] = useState('light');

  // Privacy & Security Toggles
  const [hideExactCoordinates, setHideExactCoordinates] = useState(false);
  const [sendWeeklyDigest, setSendWeeklyDigest] = useState(true);
  const [crossFamilySharing, setCrossFamilySharing] = useState(true);

  // Password Demo State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile Saved', 'Parent account preferences updated successfully.', 'success');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      addToast('Password Error', 'Please enter your current demo password (demo123).', 'warning');
      return;
    }
    addToast('Password Changed', 'Simulated account security credentials updated.', 'success');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-charcoal-800 tracking-tight">
          Parent Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
          Manage family account details, privacy visibility boundaries, and notification preferences.
        </p>
      </div>

      {/* Profile & Family Name Form */}
      <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-ivory-200">
          <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center">
            <User size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800">Parent Profile</h3>
            <p className="text-xs text-charcoal-500">Contact information &amp; family identification</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Full Name</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Email Address</label>
            <input
              type="email"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Contact Phone</label>
            <input
              type="text"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Family Household Name</label>
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="pt-4 border-t border-ivory-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl text-charcoal-800"
            >
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es-ES">Español</option>
              <option value="fr-FR">Français</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Time Zone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl text-charcoal-800"
            >
              <option value="America/Chicago">Central Time (US &amp; Canada)</option>
              <option value="America/New_York">Eastern Time (US &amp; Canada)</option>
              <option value="America/Los_Angeles">Pacific Time (US &amp; Canada)</option>
              <option value="Europe/London">London (GMT)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Save size={14} />
            <span>Save Profile Information</span>
          </button>
        </div>
      </form>

      {/* Privacy & Location Visibility */}
      <div className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-ivory-200">
          <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-600 flex items-center justify-center">
            <Eye size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800">Privacy &amp; Data Visibility</h3>
            <p className="text-xs text-charcoal-500">Fine-tune family transparency preferences</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-50 border border-charcoal-100 cursor-pointer">
            <div>
              <p className="font-semibold text-charcoal-800">Weekly Digital Wellbeing Email Report</p>
              <p className="text-charcoal-500 text-[11px]">Receive summary of family milestones and educational time usage.</p>
            </div>
            <input
              type="checkbox"
              checked={sendWeeklyDigest}
              onChange={(e) => setSendWeeklyDigest(e.target.checked)}
              className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 rounded-xl bg-ivory-50 border border-charcoal-100 cursor-pointer">
            <div>
              <p className="font-semibold text-charcoal-800">Mutual Family Location Transparency</p>
              <p className="text-charcoal-500 text-[11px]">Allow children to view parent safe-arrival status inside their companion app.</p>
            </div>
            <input
              type="checkbox"
              checked={crossFamilySharing}
              onChange={(e) => setCrossFamilySharing(e.target.checked)}
              className="rounded border-charcoal-300 text-sage-600 focus:ring-sage-500 h-4 w-4"
            />
          </label>
        </div>
      </div>

      {/* Security & Password */}
      <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-card border border-charcoal-100 shadow-subtle space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-ivory-200">
          <div className="w-8 h-8 rounded-xl bg-slateBlue-100 text-slateBlue-700 flex items-center justify-center">
            <Lock size={18} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-charcoal-800">Security Credentials</h3>
            <p className="text-xs text-charcoal-500">Update simulated demonstration password</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">Current Demo Password</label>
            <input
              type="password"
              placeholder="demo123"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-semibold text-charcoal-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-ivory-50 border border-charcoal-200 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-charcoal-800 hover:bg-charcoal-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <KeyRound size={13} />
            <span>Update Password</span>
          </button>
        </div>
      </form>

    </div>
  );
};
