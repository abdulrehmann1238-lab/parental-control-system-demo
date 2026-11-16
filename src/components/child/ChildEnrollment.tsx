import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  MapPin, 
  Hourglass, 
  Bell, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChildEnrollment: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { addToast } = useApp();

  // Step 3 Permission Choices
  const [permLocation, setPermLocation] = useState(true);
  const [permScreenTime, setPermScreenTime] = useState(true);
  const [permNotifications, setPermNotifications] = useState(true);

  const handleFinish = () => {
    addToast('Enrollment Verified', 'Device has been successfully paired with Jenkins Family.', 'success');
    navigate('/child');
  };

  return (
    <div className="space-y-4 text-xs">
      
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between pb-2 border-b border-ivory-200">
        <div>
          <span className="text-[10px] font-bold text-sage-600 uppercase tracking-wider">
            Step {step} of 5
          </span>
          <h2 className="font-heading font-bold text-sm text-charcoal-800">
            {step === 1 && 'Welcome & Family Pledge'}
            {step === 2 && 'Review Device Information'}
            {step === 3 && 'Supported Permissions'}
            {step === 4 && 'Confirm Preferences'}
            {step === 5 && 'Enrollment Complete'}
          </h2>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step ? 'bg-sage-600 w-4' : i < step ? 'bg-sage-400' : 'bg-ivory-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Welcome & Overview */}
      {step === 1 && (
        <div className="space-y-4 py-2">
          <div className="w-14 h-14 rounded-2xl bg-sage-50 text-sage-600 flex items-center justify-center mx-auto mb-2 border border-sage-100">
            <ShieldCheck size={32} />
          </div>
          <div className="text-center space-y-1.5">
            <h3 className="font-heading font-extrabold text-base text-charcoal-800">
              Welcome to AegisFamily
            </h3>
            <p className="text-charcoal-500 text-[11px] leading-relaxed">
              This companion experience is designed to keep you and your family safely connected with complete transparency.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-ivory-50 border border-charcoal-100 space-y-2 text-[11px] text-charcoal-600">
            <p className="font-bold text-charcoal-800">The Family Trust Pledge:</p>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-sage-600 shrink-0 mt-0.5" />
              <span>No secret tracking or hidden monitoring apps.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-sage-600 shrink-0 mt-0.5" />
              <span>You always see what permissions are enabled.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-sage-600 shrink-0 mt-0.5" />
              <span>Private text messages and calls are never read or stored.</span>
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-2.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Continue Setup</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* STEP 2: Review Device Information */}
      {step === 2 && (
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <h3 className="font-bold text-charcoal-800">Confirm Your Device Details</h3>
            <p className="text-[11px] text-charcoal-500">
              Verify that this hardware profile matches your enrolled smartphone.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-charcoal-200 space-y-2 text-[11px]">
            <div className="flex justify-between py-1 border-b border-ivory-200">
              <span className="text-charcoal-400">Device Model</span>
              <span className="font-semibold text-charcoal-800">Apple iPhone 15 Pro</span>
            </div>
            <div className="flex justify-between py-1 border-b border-ivory-200">
              <span className="text-charcoal-400">Operating System</span>
              <span className="font-semibold text-charcoal-800">iOS 17.5.1 (Supported)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-ivory-200">
              <span className="text-charcoal-400">Enrolling Child</span>
              <span className="font-semibold text-charcoal-800">Emma Jenkins</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-charcoal-400">Family Admin</span>
              <span className="font-semibold text-charcoal-800">Sarah Jenkins</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-2 bg-ivory-200 text-charcoal-700 font-semibold rounded-xl"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-2 bg-sage-600 text-white font-semibold rounded-xl flex items-center justify-center gap-1"
            >
              <span>Verify &amp; Next</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review Supported Permissions */}
      {step === 3 && (
        <div className="space-y-3 py-1">
          <div className="space-y-1">
            <h3 className="font-bold text-charcoal-800">Review Requested Permissions</h3>
            <p className="text-[11px] text-charcoal-500">
              Each permission is explicitly requested with OS-level consent.
            </p>
          </div>

          {/* Perm 1 */}
          <div className="p-3 rounded-xl bg-white border border-charcoal-100 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-slateBlue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-charcoal-800">Location Sharing</p>
                <p className="text-[10px] text-charcoal-500">
                  Lets family check safe zone arrivals at school and sports practice.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={permLocation}
              onChange={(e) => setPermLocation(e.target.checked)}
              className="rounded border-charcoal-300 text-sage-600 h-4 w-4"
            />
          </div>

          {/* Perm 2 */}
          <div className="p-3 rounded-xl bg-white border border-charcoal-100 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <Hourglass size={16} className="text-sand-300 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-charcoal-800">Screen Time &amp; Wellbeing</p>
                <p className="text-[10px] text-charcoal-500">
                  Tracks total daily usage and pauses recreation during quiet study hours.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={permScreenTime}
              onChange={(e) => setPermScreenTime(e.target.checked)}
              className="rounded border-charcoal-300 text-sage-600 h-4 w-4"
            />
          </div>

          {/* Perm 3 */}
          <div className="p-3 rounded-xl bg-white border border-charcoal-100 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <Bell size={16} className="text-terracotta-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-charcoal-800">Safety Notifications</p>
                <p className="text-[10px] text-charcoal-500">
                  Sends friendly reminders when bedtime is approaching.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={permNotifications}
              onChange={(e) => setPermNotifications(e.target.checked)}
              className="rounded border-charcoal-300 text-sage-600 h-4 w-4"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-2 bg-ivory-200 text-charcoal-700 font-semibold rounded-xl"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-2 bg-sage-600 text-white font-semibold rounded-xl flex items-center justify-center gap-1"
            >
              <span>Continue</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Confirm Authorized Sharing Preferences */}
      {step === 4 && (
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <h3 className="font-bold text-charcoal-800">Confirm Your Choices</h3>
            <p className="text-[11px] text-charcoal-500">
              Double check the sharing permissions you are enabling today.
            </p>
          </div>

          <div className="p-3.5 bg-sage-50 rounded-xl border border-sage-200 space-y-2 text-[11px] text-sage-900">
            <div className="flex items-center justify-between">
              <span>Location Check-Ins:</span>
              <span className="font-bold">{permLocation ? 'Authorized' : 'Disabled'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Digital Wellbeing Totals:</span>
              <span className="font-bold">{permScreenTime ? 'Authorized' : 'Disabled'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Bedtime &amp; Quiet Reminders:</span>
              <span className="font-bold">{permNotifications ? 'Authorized' : 'Disabled'}</span>
            </div>
          </div>

          <p className="text-[10px] text-charcoal-400 text-center">
            You can view or adjust these permissions at any time from the Privacy tab.
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setStep(3)}
              className="flex-1 py-2 bg-ivory-200 text-charcoal-700 font-semibold rounded-xl"
            >
              Back
            </button>
            <button
              onClick={() => setStep(5)}
              className="flex-1 py-2 bg-sage-600 text-white font-semibold rounded-xl flex items-center justify-center gap-1"
            >
              <span>Authorize &amp; Pair</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Complete Enrollment */}
      {step === 5 && (
        <div className="space-y-4 py-6 text-center">
          <div className="w-14 h-14 rounded-full bg-status-success-bg text-status-success flex items-center justify-center mx-auto border border-status-success/30">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-base text-charcoal-800">
              Enrollment Complete!
            </h3>
            <p className="text-[11px] text-charcoal-500 max-w-xs mx-auto">
              Your device is now securely paired with your family's Aegis dashboard.
            </p>
          </div>

          <div className="p-3 bg-ivory-50 rounded-xl border border-charcoal-100 text-[11px] text-charcoal-600">
            Status: <span className="font-bold text-status-success">Connected &amp; Protected</span>
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-2.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-xl shadow-xs"
          >
            Go to Companion Home
          </button>
        </div>
      )}

    </div>
  );
};
