import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  ShieldCheck, 
  Hourglass, 
  QrCode, 
  Wifi, 
  BatteryMedium, 
  Maximize2, 
  Minimize2,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChildLayout: React.FC = () => {
  const [frameMode, setFrameMode] = useState(true);
  const location = useLocation();
  const { devices } = useApp();

  const childDevice = devices[0]; // Emma's iPhone by default

  return (
    <div className="min-h-screen bg-ivory-200/90 text-charcoal-800 flex flex-col items-center justify-center p-2 sm:p-6 pt-14 md:pt-16">
      
      {/* Top Controller Bar */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between text-xs text-charcoal-600 px-2">
        <Link
          to="/parent"
          className="inline-flex items-center gap-1.5 font-semibold text-charcoal-600 hover:text-sage-700"
        >
          <ChevronLeft size={16} />
          Parent Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFrameMode(!frameMode)}
            className="p-1.5 rounded-lg bg-white border border-charcoal-200 hover:bg-ivory-100 transition-colors flex items-center gap-1 text-[11px] font-medium shadow-xs"
            title="Toggle Smartphone Bezel Frame"
          >
            {frameMode ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
            <span className="hidden sm:inline">{frameMode ? 'Full View' : 'Phone Frame'}</span>
          </button>
        </div>
      </div>

      {/* Phone Mockup Container */}
      <div
        className={`w-full transition-all duration-300 ${
          frameMode
            ? 'max-w-sm bg-charcoal-900 rounded-[44px] p-3 shadow-modal border-4 border-charcoal-700'
            : 'max-w-md bg-white rounded-2xl shadow-lift border border-charcoal-200'
        }`}
      >
        {/* Dynamic Island / Bezel Notch (Only in phone frame mode) */}
        {frameMode && (
          <div className="w-28 h-5 bg-charcoal-800 rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-charcoal-950 mr-2" />
            <div className="w-2 h-2 rounded-full bg-sage-500/80" />
          </div>
        )}

        {/* Screen Content Wrapper */}
        <div className={`bg-ivory-100 flex flex-col justify-between overflow-hidden relative ${
          frameMode ? 'rounded-[32px] min-h-[640px]' : 'rounded-2xl min-h-[640px]'
        }`}>
          
          {/* Top Status Bar (Clock & Telemetry) */}
          <div className="px-5 pt-3 pb-2 flex items-center justify-between text-[11px] font-medium text-charcoal-600 select-none">
            <span className="font-semibold text-charcoal-800">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-sage-700 font-bold bg-sage-100 px-1.5 py-0.2 rounded">
                Aegis Companion
              </span>
              <Wifi size={13} className="text-sage-600" />
              <div className="flex items-center gap-0.5">
                <span>84%</span>
                <BatteryMedium size={14} className="text-sage-600" />
              </div>
            </div>
          </div>

          {/* Child App Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[580px]">
            <Outlet />
          </div>

          {/* Child Mobile App Bottom Navigation Bar */}
          <nav className="bg-white/95 backdrop-blur-md border-t border-ivory-300 px-4 py-2 flex items-center justify-around z-10 select-none">
            <NavLink
              to="/child"
              end
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-sage-700 font-bold' : 'text-charcoal-400 hover:text-charcoal-700'
                }`
              }
            >
              <Home size={18} />
              <span>Status</span>
            </NavLink>

            <NavLink
              to="/child/permissions"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-sage-700 font-bold' : 'text-charcoal-400 hover:text-charcoal-700'
                }`
              }
            >
              <ShieldCheck size={18} />
              <span>Privacy</span>
            </NavLink>

            <NavLink
              to="/child/wellbeing"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-sage-700 font-bold' : 'text-charcoal-400 hover:text-charcoal-700'
                }`
              }
            >
              <Hourglass size={18} />
              <span>Wellbeing</span>
            </NavLink>

            <NavLink
              to="/child/enrollment"
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
                  isActive ? 'text-sage-700 font-bold' : 'text-charcoal-400 hover:text-charcoal-700'
                }`
              }
            >
              <QrCode size={18} />
              <span>Enrollment</span>
            </NavLink>
          </nav>

        </div>
      </div>

    </div>
  );
};
