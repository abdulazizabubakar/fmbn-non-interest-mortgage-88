
export type NotificationType = 'alert' | 'success' | 'info' | 'reminder';
export type NotificationCategory = 'document' | 'application' | 'finance' | 'system' | 'property' | 'legal';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  category: NotificationCategory;
  link: string | null;
}
