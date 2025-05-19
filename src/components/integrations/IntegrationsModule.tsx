
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database, 
  Users, 
  FileCheck, 
  Building,
  CreditCard,
  Lock,
  Activity,
  Webhook,
  Code
} from 'lucide-react';
import ApiDashboard from './ApiDashboard';
import ConnectedServices from './ConnectedServices';
import WebhookManager from './WebhookManager';
import ApiDocumentation from './ApiDocumentation';

const IntegrationsModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const integrationStats = [
    { title: "Active Integrations", value: "12", icon: Database, className: "text-blue-500" },
    { title: "API Calls (24h)", value: "1,458", icon: Activity, className: "text-green-500" },
    { title: "Connected Services", value: "8", icon: FileCheck, className: "text-purple-500" },
    { title: "Active Webhooks", value: "6", icon: Webhook, className: "text-amber-500" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {integrationStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-2 ${stat.className} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.className}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Integration Center</CardTitle>
          <CardDescription>
            Manage API connections, webhooks, and third-party service integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="dashboard">API Dashboard</TabsTrigger>
              <TabsTrigger value="services">Connected Services</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4 mt-4">
              <ApiDashboard />
            </TabsContent>
            
            <TabsContent value="services" className="space-y-4 mt-4">
              <ConnectedServices />
            </TabsContent>
            
            <TabsContent value="webhooks" className="space-y-4 mt-4">
              <WebhookManager />
            </TabsContent>
            
            <TabsContent value="documentation" className="space-y-4 mt-4">
              <ApiDocumentation />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsModule;
