export type AccountStatus = 'Active' | 'Suspended' | 'Pending';
export type SubscriptionTier = 'Free' | 'Standard' | 'Premium';
export type DevicePlatform = 'iOS' | 'Android';
export type EnrollmentStatus = 'Enrolled' | 'Pending' | 'Disconnected';

export interface DevicePermissions {
  locationSharing: boolean;
  screenTimeAccess: boolean;
  notificationRelay: boolean;
  appUsageSummary: boolean;
}

export interface Device {
  id: string;
  clientId: string;
  clientName: string;
  deviceName: string;
  platform: DevicePlatform;
  model: string;
  osVersion: string;
  enrollmentStatus: EnrollmentStatus;
  lastSync: string;
  batteryLevel: number;
  isOnline: boolean;
  assignedUser: string;
  permissions: DevicePermissions;
}

export interface ClientAccount {
  id: string;
  clientName: string;
  email: string;
  avatar: string;
  registeredDate: string;
  connectedDevicesCount: number;
  subscription: SubscriptionTier;
  status: AccountStatus;
  phone: string;
  lastLogin: string;
  monthlyCost: number;
  familyMembersCount: number;
}

export interface LocationPoint {
  latitude: number;
  longitude: number;
  address: string;
  landmark: string;
  timestamp: string;
  batteryLevel: number;
  accuracyMeters: number;
  speedMph?: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relationship: string;
  avatar: string;
  deviceId: string;
  deviceName: string;
  platform: DevicePlatform;
  todayScreenTimeMinutes: number;
  screenTimeLimitMinutes: number;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  bedtimeStart: string;
  bedtimeEnd: string;
  currentMockLocation: LocationPoint;
  locationHistory: LocationPoint[];
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
  activeSubscribers: number;
  maxDevices: number;
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'Account' | 'Security' | 'Device' | 'Billing';
  affectedAccount: string;
  status: 'Success' | 'Warning' | 'Info';
  adminUser: string;
  details: string;
}

export interface ParentNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'device' | 'safety' | 'account' | 'screen_time';
  read: boolean;
  memberName?: string;
}

export interface ScreenTimeRecord {
  day: string;
  date: string;
  screenTimeMinutes: number;
  productiveMinutes: number;
  socialMinutes: number;
  gamesMinutes: number;
  entertainmentMinutes: number;
}

export interface WebCategoryReport {
  category: string;
  percentage: number;
  hours: number;
  color: string;
}

export interface CommunicationSummary {
  totalCalls: number;
  totalMessages: number;
  safeContactsCount: number;
  unknownContactsAlerts: number;
  note: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'warning' | 'error' | 'info';
}
