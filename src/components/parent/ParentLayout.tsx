import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Smartphone, 
  MapPin, 
  BarChart3, 
  Hourglass, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  HelpCircle, 
  ShieldAlert, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

export const ParentLayout: React.FC = () => {
  const { logout, notifications, clients } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if Sarah's account is suspended by admin
  const sarahAccount = clients.find((c) => c.id === 'CLT-8291');
  const isSuspended = sarahAccount?.status === 'Suspended';

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/parent', label: 'Overview', icon: <LayoutDashboard size={18} />, end: true },
    { to: '/parent/family', label: 'My Family', icon: <Users size={18} /> },
    { to: '/parent/devices', label: 'Connected Devices', icon: <Smartphone size={18} /> },
    { to: '/parent/location', label: 'Location Sharing', icon: <MapPin size={18} /> },
    { to: '/parent/reports', label: 'Activity Reports', icon: <BarChart3 size={18} /> },
    { to: '/parent/screen-time', label: 'Screen Time', icon: <Hourglass size={18} /> },
    { 
      to: '/parent/notifications', 
      label: 'Notifications', 
      icon: <Bell size={18} />, 
      badge: unreadCount > 0 ? unreadCount : undefined 
    },
    { to: '/parent/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col md:flex-row text-charcoal-800 pt-10 md:pt-12">
      
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-charcoal-100/80 flex-col justify-between p-4 sticky top-12 h-[calc(100vh-48px)] z-20">
        <div>
          {/* Logo & Family Tag */}
          <div className="px-3 py-2 mb-6">
            <BrandLogo showSubtitle={true} />
            <div className="mt-3 px-2 py-1 rounded-md bg-sage-50 text-[10px] font-semibold text-sage-700 tracking-wider uppercase border border-sage-100 flex items-center justify-between">
              <span>Jenkins Family</span>
              <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sage-600 text-white shadow-xs'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200/70'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-terracotta-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="pt-4 border-t border-ivory-300">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="w-8 h-8 rounded-full object-cover border border-sage-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-charcoal-800 truncate">Sarah Jenkins</p>
              <p className="text-[10px] text-charcoal-400 truncate">parent@demo.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-charcoal-500 hover:text-status-critical hover:bg-status-critical-bg rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Bar */}
      <div className="md:hidden bg-white border-b border-charcoal-100 p-4 flex items-center justify-between sticky top-10 z-30">
        <BrandLogo />
        <div className="flex items-center gap-2">
          <NavLink
            to="/parent/notifications"
            className="p-2 text-charcoal-700 relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta-500" />
            )}
          </NavLink>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 text-charcoal-700 hover:bg-ivory-200 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-charcoal-900/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-xs bg-white h-full p-5 flex flex-col justify-between shadow-modal">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-ivory-300 mb-4">
                <BrandLogo showSubtitle={true} />
                <button onClick={() => setMobileDrawerOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-sage-600 text-white shadow-xs'
                          : 'text-charcoal-600 hover:bg-ivory-200'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="w-5 h-5 rounded-full bg-terracotta-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="pt-4 border-t border-ivory-300">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-status-critical rounded-xl bg-status-critical-bg"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Suspended Alert Banner (Cross-Environment Reactive State!) */}
        {isSuspended && (
          <div className="bg-terracotta-500 text-white px-6 py-2.5 flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="shrink-0" />
              <span>
                <strong>Simulated Access Hold:</strong> This parent account was marked as Suspended in the Owner Admin panel. Device telemetry refresh is paused.
              </span>
            </div>
            <button
              onClick={() => navigate('/admin/clients')}
              className="underline font-semibold hover:text-white/80 shrink-0 ml-4"
            >
              Reactivate in Admin &rarr;
            </button>
          </div>
        )}

        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal-100/80 px-6 py-3.5 flex items-center justify-between sticky top-12 z-10">
          <div className="flex items-center gap-2 text-xs text-charcoal-500">
            <span className="font-semibold text-charcoal-800">Parent Dashboard</span>
            <ChevronRight size={14} />
            <span className="capitalize">
              {location.pathname === '/parent'
                ? 'Overview'
                : location.pathname.replace('/parent/', '').replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-ivory-100 px-3 py-1.5 rounded-xl border border-charcoal-200/60 text-xs text-charcoal-500 w-52">
              <Search size={14} className="text-charcoal-400 shrink-0" />
              <input
                type="text"
                placeholder="Search activity..."
                className="bg-transparent border-none outline-none w-full text-xs text-charcoal-800 placeholder:text-charcoal-400"
              />
            </div>
            
            <NavLink
              to="/parent/notifications"
              className="p-2 rounded-xl text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200 transition-colors relative"
              aria-label="Parent Notifications"
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-terracotta-500" />
              )}
            </NavLink>

            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="w-8 h-8 rounded-full object-cover border border-sage-200"
            />
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-charcoal-100 px-3 py-2 flex items-center justify-around z-30">
          <NavLink
            to="/parent"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-medium ${
                isActive ? 'text-sage-700 font-bold' : 'text-charcoal-500'
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </NavLink>
          <NavLink
            to="/parent/location"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-medium ${
                isActive ? 'text-sage-700 font-bold' : 'text-charcoal-500'
              }`
            }
          >
            <MapPin size={18} />
            <span>Location</span>
          </NavLink>
          <NavLink
            to="/parent/screen-time"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-medium ${
                isActive ? 'text-sage-700 font-bold' : 'text-charcoal-500'
              }`
            }
          >
            <Hourglass size={18} />
            <span>Screen Time</span>
          </NavLink>
          <NavLink
            to="/parent/reports"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[10px] font-medium ${
                isActive ? 'text-sage-700 font-bold' : 'text-charcoal-500'
              }`
            }
          >
            <BarChart3 size={18} />
            <span>Reports</span>
          </NavLink>
        </div>

      </div>

    </div>
  );
};
