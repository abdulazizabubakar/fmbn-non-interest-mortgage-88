
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemGrowthChartProps {
  userRole?: string;
  region?: string;
}

const SystemGrowthChart: React.FC<SystemGrowthChartProps> = ({ userRole, region }) => {
  // Mock data for system growth
  const growthData = [
    { month: 'Jan', applications: 45, approvals: 32, disbursements: 28 },
    { month: 'Feb', applications: 52, approvals: 38, disbursements: 32 },
    { month: 'Mar', applications: 61, approvals: 45, disbursements: 40 },
    { month: 'Apr', applications: 67, approvals: 48, disbursements: 42 },
    { month: 'May', applications: 75, approvals: 56, disbursements: 50 },
    { month: 'Jun', applications: 82, approvals: 62, disbursements: 55 }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>System Growth</CardTitle>
        <CardDescription>Applications, approvals, and disbursements over time</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="w-full h-[280px]">
          <ChartContainer
            config={{
              applications: { label: "Applications", color: "#93C5FD" },
              approvals: { label: "Approvals", color: "#60A5FA" },
              disbursements: { label: "Disbursements", color: "#2563EB" },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={growthData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#93C5FD" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApprovals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDisbursements" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#93C5FD" 
                  fillOpacity={1} 
                  fill="url(#colorApplications)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="approvals" 
                  stroke="#60A5FA" 
                  fillOpacity={1}
                  fill="url(#colorApprovals)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="disbursements" 
                  stroke="#2563EB" 
                  fillOpacity={1}
                  fill="url(#colorDisbursements)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemGrowthChart;
