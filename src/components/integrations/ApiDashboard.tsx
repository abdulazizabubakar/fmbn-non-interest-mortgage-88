
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Activity, Clock, RefreshCw, Copy, Key } from 'lucide-react';
import { mockApiData } from '@/data/mockIntegrations';
import { toast } from "@/hooks/use-toast";

const ApiDashboard = () => {
  const copyApiKey = () => {
    navigator.clipboard.writeText('sk_test_9H32ndK28sjLa75n2Jsdu28md9');
    toast({
      description: "API key copied to clipboard",
    });
  };

  const regenerateApiKey = () => {
    toast({
      title: "Confirm Regeneration",
      description: "This action will invalidate your current API key. Are you sure?",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                <code className="bg-muted px-2 py-1 rounded text-sm">sk_test_9H32***************md9</code>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyApiKey}>
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={regenerateApiKey}>
                  <RefreshCw className="h-3.5 w-3.5 mr-1" /> Regenerate
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last regenerated: May 12, 2024
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="font-medium">All Systems Operational</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 inline mr-1" /> Updated 5 minutes ago
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Current uptime: 99.98% | Average response time: 234ms
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API Usage</CardTitle>
          <CardDescription>
            API calls over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockApiData.usageData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="successful"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="failed" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Endpoints</CardTitle>
            <CardDescription>
              Most frequently accessed API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockApiData.topEndpoints}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calls" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent API Errors</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4 max-h-[250px] overflow-auto">
              {mockApiData.recentErrors.map((error, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{error.endpoint}</h4>
                      <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-md">
                        {error.code}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{error.message}</p>
                    <div className="flex items-center mt-1">
                      <Activity className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {error.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiDashboard;
