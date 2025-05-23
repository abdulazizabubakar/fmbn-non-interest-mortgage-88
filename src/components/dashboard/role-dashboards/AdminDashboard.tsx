
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Users, Building, FileText, AlertTriangle } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import AdminMetricCards from './admin/AdminMetricCards';
import ApplicationsOverview from './admin/ApplicationsOverview';
import MortgageDistributionChart from './admin/MortgageDistributionChart';
import AdminActionCards from './admin/AdminActionCards';

interface AdminDashboardProps {
  region: string;
}

// Mock data for statistics
const applicationData = [
  { name: 'Jan', new: 65, approved: 40, rejected: 20 },
  { name: 'Feb', new: 59, approved: 45, rejected: 15 },
  { name: 'Mar', new: 80, approved: 55, rejected: 25 },
  { name: 'Apr', new: 81, approved: 60, rejected: 18 },
  { name: 'May', new: 56, approved: 42, rejected: 12 },
  { name: 'Jun', new: 55, approved: 48, rejected: 7 },
];

// Mock data for property distribution
const propertyData = [
  { name: 'Apartments', value: 350, color: '#3b82f6' },
  { name: 'Duplexes', value: 150, color: '#22c55e' },
  { name: 'Bungalows', value: 120, color: '#f59e0b' },
  { name: 'Terraced', value: 200, color: '#8b5cf6' },
  { name: 'Semi-Detached', value: 80, color: '#ec4899' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ region }) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  
  return (
    <div className="space-y-6">
      {/* Main KPIs */}
      <AdminMetricCards region={region} timeframe={timeframe} />
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Applications Chart */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Application Trends</CardTitle>
                <CardDescription>New, approved and rejected applications</CardDescription>
              </div>
              <Tabs defaultValue="monthly" className="w-[200px]">
                <TabsList>
                  <TabsTrigger value="daily" onClick={() => setTimeframe('daily')}>Daily</TabsTrigger>
                  <TabsTrigger value="weekly" onClick={() => setTimeframe('weekly')}>Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" onClick={() => setTimeframe('monthly')}>Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer 
                config={{
                  new: { label: "New", theme: { light: "#3b82f6", dark: "#60a5fa" } },
                  approved: { label: "Approved", theme: { light: "#22c55e", dark: "#4ade80" } },
                  rejected: { label: "Rejected", theme: { light: "#ef4444", dark: "#f87171" } },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={applicationData} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="new" stackId="a" fill="var(--color-new, #3b82f6)" />
                    <Bar dataKey="approved" stackId="a" fill="var(--color-approved, #22c55e)" />
                    <Bar dataKey="rejected" stackId="a" fill="var(--color-rejected, #ef4444)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Property Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Property Distribution</CardTitle>
            <CardDescription>Property types across all regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Applications Overview */}
      <ApplicationsOverview region={region} />
      
      {/* More Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mortgage Distribution */}
        <MortgageDistributionChart region={region} />
        
        {/* Quick Action Cards */}
        <AdminActionCards region={region} />
      </div>
    </div>
  );
};

export default AdminDashboard;
