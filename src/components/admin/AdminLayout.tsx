import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Smartphone, 
  CreditCard, 
  History, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Bell, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';

export const AdminLayout: React.FC = () => {
  const { logout, auth } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', label: 'Overview', icon: <LayoutDashboard size={18} />, end: true },
    { to: '/admin/clients', label: 'Client Accounts', icon: <Users size={18} /> },
    { to: '/admin/devices', label: 'Device Registry', icon: <Smartphone size={18} /> },
    { to: '/admin/subscriptions', label: 'Subscriptions', icon: <CreditCard size={18} /> },
    { to: '/admin/activity', label: 'Activity Logs', icon: <History size={18} /> },
    { to: '/admin/settings', label: 'Admin Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col md:flex-row text-charcoal-800 pt-10 md:pt-12">
      
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-64 bg-white border-r border-charcoal-100/80 flex-col justify-between p-4 sticky top-12 h-[calc(100vh-48px)] z-20">
        <div>
          {/* Logo & Platform Tag */}
          <div className="px-3 py-2 mb-6">
            <BrandLogo showSubtitle={true} />
            <div className="mt-3 px-2 py-1 rounded-md bg-sage-50 text-[10px] font-semibold text-sage-700 tracking-wider uppercase border border-sage-100 flex items-center justify-between">
              <span>Owner Admin</span>
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
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sage-600 text-white shadow-xs'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200/70'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="pt-4 border-t border-ivory-300">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sage-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
              OA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-charcoal-800 truncate">Platform Owner</p>
              <p className="text-[10px] text-charcoal-400 truncate">admin@demo.com</p>
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
        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-2 text-charcoal-700 hover:bg-ivory-200 rounded-lg transition-colors"
          aria-label="Toggle admin navigation"
        >
          {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Modal */}
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
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-sage-600 text-white shadow-xs'
                          : 'text-charcoal-600 hover:bg-ivory-200'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
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
        
        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-charcoal-100/80 px-6 py-3.5 flex items-center justify-between sticky top-12 z-10">
          <div className="flex items-center gap-2 text-xs text-charcoal-500">
            <span className="font-semibold text-charcoal-800">Admin Console</span>
            <ChevronRight size={14} />
            <span className="capitalize">
              {location.pathname === '/admin'
                ? 'Overview'
                : location.pathname.replace('/admin/', '').replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-ivory-100 px-3 py-1.5 rounded-xl border border-charcoal-200/60 text-xs text-charcoal-500 w-56">
              <Search size={14} className="text-charcoal-400 shrink-0" />
              <input
                type="text"
                placeholder="Search platform..."
                className="bg-transparent border-none outline-none w-full text-xs text-charcoal-800 placeholder:text-charcoal-400"
              />
            </div>
            <div className="relative">
              <button 
                className="p-2 rounded-xl text-charcoal-600 hover:text-charcoal-900 hover:bg-ivory-200 transition-colors relative"
                aria-label="Platform Notifications"
              >
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sage-600" />
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-sage-100 text-sage-700 border border-sage-200 flex items-center justify-center font-bold text-xs">
              OA
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
};
