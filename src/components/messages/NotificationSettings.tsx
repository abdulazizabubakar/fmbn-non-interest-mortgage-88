
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    channels: {
      email: true,
      inApp: true,
      sms: false,
      pushNotifications: false,
    },
    categories: {
      systemAlerts: true,
      repaymentReminders: true,
      approvals: true,
      documentRejections: true,
      disbursements: true,
      latePayments: true,
      welcomeMessages: true,
      marketingMessages: false,
    },
    frequency: {
      realTime: true,
      dailyDigest: false,
      weeklyDigest: false,
    }
  });

  const updateChannelSetting = (channel: keyof typeof settings.channels) => {
    setSettings({
      ...settings,
      channels: {
        ...settings.channels,
        [channel]: !settings.channels[channel],
      }
    });
  };

  const updateCategorySetting = (category: keyof typeof settings.categories) => {
    setSettings({
      ...settings,
      categories: {
        ...settings.categories,
        [category]: !settings.categories[category],
      }
    });
  };

  const updateFrequencySetting = (frequency: keyof typeof settings.frequency) => {
    // Make sure only one frequency is active at a time
    const updatedFrequency = Object.keys(settings.frequency).reduce((acc, key) => {
      acc[key as keyof typeof settings.frequency] = key === frequency;
      return acc;
    }, {} as typeof settings.frequency);
    
    setSettings({
      ...settings,
      frequency: updatedFrequency
    });
  };

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Channels</h3>
        <p className="text-sm text-muted-foreground">
          Choose how you'd like to receive notifications
        </p>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <Switch 
              id="email-notifications" 
              checked={settings.channels.email} 
              onCheckedChange={() => updateChannelSetting('email')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="in-app-notifications">In-App Notifications</Label>
            </div>
            <Switch 
              id="in-app-notifications" 
              checked={settings.channels.inApp} 
              onCheckedChange={() => updateChannelSetting('inApp')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
            </div>
            <Switch 
              id="sms-notifications" 
              checked={settings.channels.sms} 
              onCheckedChange={() => updateChannelSetting('sms')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor="push-notifications">Push Notifications</Label>
            </div>
            <Switch 
              id="push-notifications" 
              checked={settings.channels.pushNotifications} 
              onCheckedChange={() => updateChannelSetting('pushNotifications')}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Notification Categories</h3>
        <p className="text-sm text-muted-foreground">
          Select which types of notifications you want to receive
        </p>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <Label htmlFor="system-alerts">System Alerts</Label>
            </div>
            <Switch 
              id="system-alerts" 
              checked={settings.categories.systemAlerts} 
              onCheckedChange={() => updateCategorySetting('systemAlerts')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <Label htmlFor="repayment-reminders">Repayment Reminders</Label>
            </div>
            <Switch 
              id="repayment-reminders" 
              checked={settings.categories.repaymentReminders} 
              onCheckedChange={() => updateCategorySetting('repaymentReminders')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <Label htmlFor="approvals">Approvals</Label>
            </div>
            <Switch 
              id="approvals" 
              checked={settings.categories.approvals} 
              onCheckedChange={() => updateCategorySetting('approvals')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <Label htmlFor="document-rejections">Document Rejections</Label>
            </div>
            <Switch 
              id="document-rejections" 
              checked={settings.categories.documentRejections} 
              onCheckedChange={() => updateCategorySetting('documentRejections')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <Label htmlFor="disbursements">Disbursements</Label>
            </div>
            <Switch 
              id="disbursements" 
              checked={settings.categories.disbursements} 
              onCheckedChange={() => updateCategorySetting('disbursements')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <Label htmlFor="late-payments">Late Payments</Label>
            </div>
            <Switch 
              id="late-payments" 
              checked={settings.categories.latePayments} 
              onCheckedChange={() => updateCategorySetting('latePayments')}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Notification Frequency</h3>
        <p className="text-sm text-muted-foreground">
          Choose how often you want to receive notifications
        </p>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="real-time">Real-time notifications</Label>
            <Switch 
              id="real-time" 
              checked={settings.frequency.realTime} 
              onCheckedChange={() => updateFrequencySetting('realTime')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-digest">Daily digest</Label>
            <Switch 
              id="daily-digest" 
              checked={settings.frequency.dailyDigest} 
              onCheckedChange={() => updateFrequencySetting('dailyDigest')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="weekly-digest">Weekly digest</Label>
            <Switch 
              id="weekly-digest" 
              checked={settings.frequency.weeklyDigest} 
              onCheckedChange={() => updateFrequencySetting('weeklyDigest')}
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button onClick={saveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
