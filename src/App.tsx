import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LoadingScreen } from './components/common/LoadingScreen';
import { DemoBanner } from './components/common/DemoBanner';
import { ToastContainer } from './components/common/ToastContainer';

// Public & Auth
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';

// Owner Admin
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { ClientAccounts } from './components/admin/ClientAccounts';
import { ClientDetail } from './components/admin/ClientDetail';
import { DeviceRegistry } from './components/admin/DeviceRegistry';
import { Subscriptions } from './components/admin/Subscriptions';
import { ActivityLogs } from './components/admin/ActivityLogs';
import { AdminSettings } from './components/admin/AdminSettings';

// Parent Dashboard
import { ParentLayout } from './components/parent/ParentLayout';
import { ParentOverview } from './components/parent/ParentOverview';
import { FamilyMembers } from './components/parent/FamilyMembers';
import { ConnectedDevices } from './components/parent/ConnectedDevices';
import { LocationSharing } from './components/parent/LocationSharing';
import { ActivityReports } from './components/parent/ActivityReports';
import { ScreenTime } from './components/parent/ScreenTime';
import { NotificationsCenter } from './components/parent/NotificationsCenter';
import { ParentSettings } from './components/parent/ParentSettings';

// Child Companion
import { ChildLayout } from './components/child/ChildLayout';
import { ChildHome } from './components/child/ChildHome';
import { ChildEnrollment } from './components/child/ChildEnrollment';
import { ChildPermissions } from './components/child/ChildPermissions';
import { ChildWellbeing } from './components/child/ChildWellbeing';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route wrapper for section redirects
const SectionScrollWrapper: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [sectionId]);
  return <LandingPage />;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <LoadingScreen />
        <DemoBanner />
        <ToastContainer />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<SectionScrollWrapper sectionId="features" />} />
          <Route path="/how-it-works" element={<SectionScrollWrapper sectionId="how-it-works" />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Owner Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="clients" element={<ClientAccounts />} />
            <Route path="clients/:id" element={<ClientDetail />} />
            <Route path="devices" element={<DeviceRegistry />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="activity" element={<ActivityLogs />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Parent Control Dashboard Routes */}
          <Route path="/parent" element={<ParentLayout />}>
            <Route index element={<ParentOverview />} />
            <Route path="family" element={<FamilyMembers />} />
            <Route path="devices" element={<ConnectedDevices />} />
            <Route path="location" element={<LocationSharing />} />
            <Route path="reports" element={<ActivityReports />} />
            <Route path="screen-time" element={<ScreenTime />} />
            <Route path="notifications" element={<NotificationsCenter />} />
            <Route path="settings" element={<ParentSettings />} />
          </Route>

          {/* Child Companion App Routes */}
          <Route path="/child" element={<ChildLayout />}>
            <Route index element={<ChildHome />} />
            <Route path="enrollment" element={<ChildEnrollment />} />
            <Route path="permissions" element={<ChildPermissions />} />
            <Route path="wellbeing" element={<ChildWellbeing />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
