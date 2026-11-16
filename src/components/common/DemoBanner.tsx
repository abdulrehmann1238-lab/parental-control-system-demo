import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Smartphone, 
  LayoutDashboard, 
  Globe, 
  RotateCcw, 
  Sparkles, 
  ChevronDown, 
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBanner: React.FC = () => {
  const { triggerIntroAnimation, resetAllDemoData, clients } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Check if Sarah's account is suspended to display simulated indicator
  const sarahAccount = clients.find(c => c.id === 'CLT-8291');
  const isSarahSuspended = sarahAccount?.status === 'Suspended';

  return (
    <aside 
      aria-label="Demo switcher navigation"
      className="fixed top-2 left-1/2 -translate-x-1/2 z-[9000] w-[95%] max-w-4xl pointer-events-none transition-all duration-300"
    >
      <div className="pointer-events-auto bg-charcoal-900/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-modal border border-white/10 flex items-center justify-between gap-2 text-xs">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-500"></span>
          </span>
          <span className="font-medium text-white/90 hidden sm:inline text-[11px] tracking-wide">
            LIVE DEMO
          </span>
          {isSarahSuspended && (
            <span className="bg-status-critical/30 border border-status-critical/40 text-red-200 text-[10px] px-2 py-0.5 rounded-full font-semibold animate-pulse">
              Parent Suspended by Admin
            </span>
          )}
        </div>

        {/* Center: Environment Navigation Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Globe size={12} />
            <span className="hidden md:inline">Public</span> Website
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                location.pathname.startsWith('/admin')
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <LayoutDashboard size={12} />
            Admin <span className="hidden md:inline">Panel</span>
          </NavLink>

          <NavLink
            to="/parent"
            className={({ isActive }) =>
              `px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                location.pathname.startsWith('/parent')
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <ShieldAlert size={12} />
            Parent <span className="hidden md:inline">Dashboard</span>
          </NavLink>

          <NavLink
            to="/child"
            className={({ isActive }) =>
              `px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                location.pathname.startsWith('/child')
                  ? 'bg-sage-600 text-white shadow-xs'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Smartphone size={12} />
            Child <span className="hidden md:inline">Companion</span>
          </NavLink>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={triggerIntroAnimation}
            title="Replay introductory loading animation"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Sparkles size={13} />
          </button>
          <button
            onClick={resetAllDemoData}
            title="Reset demo data to initial defaults"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
};
