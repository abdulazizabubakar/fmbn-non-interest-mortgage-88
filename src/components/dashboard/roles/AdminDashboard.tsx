
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Admin Dashboard focuses on system-wide overview
const AdminDashboard: React.FC = () => {
  // Mock data for executive summary
  const summaryData = [
    {
      title: 'Total Mortgage Portfolio',
      value: '₦45.8B',
      change: '+12.3%',
      changeDirection: 'up'
    },
    {
      title: 'Active Leases',
      value: '1,243',
      change: '+5.3%',
      changeDirection: 'up'
    },
    {
      title: 'Average Lease Value',
      value: '₦36.8M',
      change: '+2.1%',
      changeDirection: 'up'
    },
    {
      title: 'Default Rate',
      value: '3.8%',
      change: '-0.5%',
      changeDirection: 'down',
      isPositive: true
    }
  ];
  
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
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
              <div className="flex items-baseline justify-between mt-1">
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <p className={`text-sm font-medium ${
                  (item.changeDirection === 'up' && !item.isPositive) || 
                  (item.changeDirection === 'down' && item.isPositive)
                    ? 'text-green-600'
                    : (item.changeDirection === 'up' && item.isPositive) ||
                      (item.changeDirection === 'down' && !item.isPositive)
                      ? 'text-red-600'
                      : 'text-gray-600'
                }`}>
                  {item.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Growth</CardTitle>
          <CardDescription>Applications, approvals, and disbursements over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                applications: { label: "Applications", color: "#93C5FD" },
                approvals: { label: "Approvals", color: "#60A5FA" },
                disbursements: { label: "Disbursements", color: "#2563EB" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Key operational indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Processing Time</span>
                <span className="text-sm font-medium text-green-600">12.3 days (Optimal)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Documentation Compliance</span>
                <span className="text-sm font-medium text-green-600">98.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Shariah Compliance</span>
                <span className="text-sm font-medium text-green-600">100%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm font-medium text-amber-600">87% (Target: 90%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">System Uptime</span>
                <span className="text-sm font-medium text-green-600">99.98%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Strategic Goals Progress</CardTitle>
            <CardDescription>Annual targets and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Mortgage Portfolio Growth (Annual Target: 20%)</span>
                  <span className="text-sm font-medium">12.3% / 20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">New Customer Acquisition (Target: 500)</span>
                  <span className="text-sm font-medium">378 / 500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Default Reduction (Target: Below 3%)</span>
                  <span className="text-sm font-medium">3.8% / 3.0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Product Diversification (Target: 5 new products)</span>
                  <span className="text-sm font-medium">3 / 5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
