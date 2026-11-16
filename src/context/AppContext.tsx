import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ClientAccount, 
  Device, 
  FamilyMember, 
  SubscriptionPlan, 
  AdminActivityLog, 
  ParentNotification,
  ToastMessage,
  SubscriptionTier,
  EnrollmentStatus,
  DevicePermissions
} from '../types';
import { 
  INITIAL_CLIENTS, 
  INITIAL_DEVICES, 
  INITIAL_FAMILY_MEMBERS, 
  INITIAL_SUBSCRIPTION_PLANS, 
  INITIAL_ADMIN_LOGS, 
  INITIAL_PARENT_NOTIFICATIONS 
} from '../data/mockData';

interface UserAuth {
  role: 'parent' | 'admin' | null;
  email: string;
  name: string;
}

interface AppContextType {
  // Auth
  auth: UserAuth;
  login: (role: 'parent' | 'admin', email: string) => void;
  logout: () => void;
  
  // Loading screen
  showIntroLoading: boolean;
  setShowIntroLoading: (val: boolean) => void;
  triggerIntroAnimation: () => void;

  // Data
  clients: ClientAccount[];
  devices: Device[];
  familyMembers: FamilyMember[];
  selectedMemberId: string;
  setSelectedMemberId: (id: string) => void;
  subscriptionPlans: SubscriptionPlan[];
  activityLogs: AdminActivityLog[];
  notifications: ParentNotification[];
  toasts: ToastMessage[];

  // Actions
  suspendClient: (clientId: string, reason?: string) => void;
  reactivateClient: (clientId: string) => void;
  updateClientSubscription: (clientId: string, tier: SubscriptionTier) => void;
  toggleDevicePermission: (deviceId: string, permissionKey: keyof DevicePermissions) => void;
  updateDeviceEnrollmentStatus: (deviceId: string, status: EnrollmentStatus) => void;
  updateScreenTimeLimit: (memberId: string, minutes: number) => void;
  updateSchedule: (
    memberId: string, 
    schedule: { 
      quietHoursEnabled?: boolean; 
      quietHoursStart?: string; 
      quietHoursEnd?: string; 
      bedtimeStart?: string; 
      bedtimeEnd?: string; 
    }
  ) => void;
  refreshMockLocation: (memberId: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  addToast: (title: string, description?: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Intro loading state - can be re-triggered anytime from top demo bar
  const [showIntroLoading, setShowIntroLoading] = useState<boolean>(() => {
    const hasSeen = sessionStorage.getItem('aegis_seen_intro');
    return !hasSeen;
  });

  // Auth State
  const [auth, setAuth] = useState<UserAuth>(() => {
    const saved = localStorage.getItem('aegis_auth');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return { role: null, email: '', name: '' };
  });

  // Clients
  const [clients, setClients] = useState<ClientAccount[]>(() => {
    const saved = localStorage.getItem('aegis_clients');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CLIENTS;
  });

  // Devices
  const [devices, setDevices] = useState<Device[]>(() => {
    const saved = localStorage.getItem('aegis_devices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_DEVICES;
  });

  // Family Members
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => {
    const saved = localStorage.getItem('aegis_family_members');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_FAMILY_MEMBERS;
  });

  const [selectedMemberId, setSelectedMemberId] = useState<string>('FAM-01');

  // Subscriptions
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(() => {
    const saved = localStorage.getItem('aegis_plans');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SUBSCRIPTION_PLANS;
  });

  // Admin Activity Logs
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    const saved = localStorage.getItem('aegis_activity_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ADMIN_LOGS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<ParentNotification[]>(() => {
    const saved = localStorage.getItem('aegis_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_PARENT_NOTIFICATIONS;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('aegis_auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('aegis_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('aegis_devices', JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem('aegis_family_members', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('aegis_plans', JSON.stringify(subscriptionPlans));
  }, [subscriptionPlans]);

  useEffect(() => {
    localStorage.setItem('aegis_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('aegis_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addToast = (
    title: string, 
    description?: string, 
    type: 'success' | 'warning' | 'error' | 'info' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (role: 'parent' | 'admin', email: string) => {
    const name = role === 'admin' ? 'Owner Admin' : 'Sarah Jenkins';
    setAuth({ role, email, name });
    addToast(
      `Welcome back, ${name}`, 
      `Authenticated to ${role === 'admin' ? 'Owner Admin Panel' : 'Parent Control Dashboard'}.`, 
      'success'
    );
  };

  const logout = () => {
    setAuth({ role: null, email: '', name: '' });
    addToast('Signed Out', 'You have been safely signed out of the demo.', 'info');
  };

  const triggerIntroAnimation = () => {
    sessionStorage.removeItem('aegis_seen_intro');
    setShowIntroLoading(true);
  };

  // Admin Actions
  const suspendClient = (clientId: string, reason?: string) => {
    const target = clients.find((c) => c.id === clientId);
    if (!target) return;

    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: 'Suspended' as const } : c))
    );

    const newLog: AdminActivityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Account Access Suspended',
      category: 'Account',
      affectedAccount: `${target.clientName} (${target.id})`,
      status: 'Warning',
      adminUser: 'Owner Admin',
      details: reason || 'Simulated access suspension applied by administrator.',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    addToast(
      'Account Suspended',
      `${target.clientName}'s access has been temporarily restricted.`,
      'warning'
    );
  };

  const reactivateClient = (clientId: string) => {
    const target = clients.find((c) => c.id === clientId);
    if (!target) return;

    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: 'Active' as const } : c))
    );

    const newLog: AdminActivityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: 'Account Access Reactivated',
      category: 'Account',
      affectedAccount: `${target.clientName} (${target.id})`,
      status: 'Success',
      adminUser: 'Owner Admin',
      details: 'Account reactivated with standard family privileges restored.',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    addToast(
      'Account Reactivated',
      `${target.clientName}'s access is now active.`,
      'success'
    );
  };

  const updateClientSubscription = (clientId: string, tier: SubscriptionTier) => {
    const target = clients.find((c) => c.id === clientId);
    if (!target) return;

    const costs = { Free: 0, Standard: 9.99, Premium: 19.99 };

    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? { ...c, subscription: tier, monthlyCost: costs[tier] }
          : c
      )
    );

    const newLog: AdminActivityLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action: `Subscription Updated to ${tier}`,
      category: 'Billing',
      affectedAccount: `${target.clientName} (${target.id})`,
      status: 'Success',
      adminUser: 'Owner Admin',
      details: `Plan changed to ${tier} ($${costs[tier]}/mo).`,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    addToast(
      'Plan Updated',
      `${target.clientName} is now subscribed to the ${tier} plan.`,
      'success'
    );
  };

  const toggleDevicePermission = (deviceId: string, permissionKey: keyof DevicePermissions) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id === deviceId) {
          const updatedPermissions = {
            ...d.permissions,
            [permissionKey]: !d.permissions[permissionKey],
          };
          return { ...d, permissions: updatedPermissions };
        }
        return d;
      })
    );

    const dev = devices.find((d) => d.id === deviceId);
    const newStatus = dev ? !dev.permissions[permissionKey] : true;
    
    addToast(
      'Permission Updated',
      `${permissionKey.replace(/([A-Z])/g, ' $1').toLowerCase()} is now ${newStatus ? 'enabled' : 'disabled'}.`,
      'info'
    );
  };

  const updateDeviceEnrollmentStatus = (deviceId: string, status: EnrollmentStatus) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === deviceId ? { ...d, enrollmentStatus: status } : d))
    );
    addToast('Device Status Changed', `Enrollment status updated to ${status}.`, 'info');
  };

  // Parent & Family Actions
  const updateScreenTimeLimit = (memberId: string, minutes: number) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, screenTimeLimitMinutes: minutes } : m))
    );
    const target = familyMembers.find((m) => m.id === memberId);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    addToast(
      'Screen Time Goal Saved',
      `${target?.name || 'Child'}'s daily limit set to ${hours}h ${mins > 0 ? `${mins}m` : ''}.`,
      'success'
    );
  };

  const updateSchedule = (
    memberId: string, 
    schedule: { 
      quietHoursEnabled?: boolean; 
      quietHoursStart?: string; 
      quietHoursEnd?: string; 
      bedtimeStart?: string; 
      bedtimeEnd?: string; 
    }
  ) => {
    setFamilyMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          return {
            ...m,
            ...schedule,
          };
        }
        return m;
      })
    );
    const target = familyMembers.find((m) => m.id === memberId);
    addToast(
      'Schedule Updated',
      `Quiet hours and bedtime settings saved for ${target?.name || 'Child'}.`,
      'success'
    );
  };

  const refreshMockLocation = (memberId: string) => {
    setFamilyMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          // slight simulated GPS jitter
          const latJitter = (Math.random() - 0.5) * 0.0004;
          const lngJitter = (Math.random() - 0.5) * 0.0004;
          const updatedLoc = {
            ...m.currentMockLocation,
            latitude: m.currentMockLocation.latitude + latJitter,
            longitude: m.currentMockLocation.longitude + lngJitter,
            timestamp: 'Just now (GPS verified)',
          };
          return { ...m, currentMockLocation: updatedLoc };
        }
        return m;
      })
    );
    const target = familyMembers.find((m) => m.id === memberId);
    addToast(
      'Location Refreshed',
      `Signal updated for ${target?.name}'s device. Accuracy: 6m.`,
      'info'
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All Caught Up', 'All notifications marked as read.', 'info');
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('aegis_auth');
    localStorage.removeItem('aegis_clients');
    localStorage.removeItem('aegis_devices');
    localStorage.removeItem('aegis_family_members');
    localStorage.removeItem('aegis_plans');
    localStorage.removeItem('aegis_activity_logs');
    localStorage.removeItem('aegis_notifications');
    sessionStorage.removeItem('aegis_seen_intro');

    setAuth({ role: null, email: '', name: '' });
    setClients(INITIAL_CLIENTS);
    setDevices(INITIAL_DEVICES);
    setFamilyMembers(INITIAL_FAMILY_MEMBERS);
    setSelectedMemberId('FAM-01');
    setSubscriptionPlans(INITIAL_SUBSCRIPTION_PLANS);
    setActivityLogs(INITIAL_ADMIN_LOGS);
    setNotifications(INITIAL_PARENT_NOTIFICATIONS);

    addToast('Demo Reset', 'All mock data and session states restored to defaults.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        login,
        logout,
        showIntroLoading,
        setShowIntroLoading,
        triggerIntroAnimation,
        clients,
        devices,
        familyMembers,
        selectedMemberId,
        setSelectedMemberId,
        subscriptionPlans,
        activityLogs,
        notifications,
        toasts,
        suspendClient,
        reactivateClient,
        updateClientSubscription,
        toggleDevicePermission,
        updateDeviceEnrollmentStatus,
        updateScreenTimeLimit,
        updateSchedule,
        refreshMockLocation,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        addToast,
        removeToast,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
