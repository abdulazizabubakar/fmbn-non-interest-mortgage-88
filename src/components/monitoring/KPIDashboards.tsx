
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  FileText, 
  CreditCard, 
  Home, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  AlertTriangle,
  CheckCircle 
} from 'lucide-react';

const KPIDashboards = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const applicationKPIs = [
    { title: "Total Applications", value: "2,847", change: "+12.5%", trend: "up", icon: FileText },
    { title: "Approval Rate", value: "76.3%", change: "+3.2%", trend: "up", icon: CheckCircle },
    { title: "Processing Time", value: "14.2 days", change: "-2.1 days", trend: "up", icon: Clock },
    { title: "Rejection Rate", value: "23.7%", change: "-3.2%", trend: "up", icon: AlertTriangle },
  ];

  const repaymentKPIs = [
    { title: "Collection Rate", value: "94.8%", change: "+1.4%", trend: "up", icon: CreditCard },
    { title: "Delinquency Rate", value: "5.2%", change: "-0.8%", trend: "up", icon: TrendingDown },
    { title: "Recovery Rate", value: "82.1%", change: "+4.2%", trend: "up", icon: TrendingUp },
    { title: "Default Rate", value: "2.3%", change: "-0.3%", trend: "up", icon: AlertTriangle },
  ];

  const ownershipKPIs = [
    { title: "Transfer Rate", value: "68.9%", change: "+5.1%", trend: "up", icon: Home },
    { title: "Completion Rate", value: "91.2%", change: "+2.3%", trend: "up", icon: CheckCircle },
    { title: "Avg. Transfer Time", value: "8.3 years", change: "-0.4 years", trend: "up", icon: Clock },
    { title: "Success Rate", value: "97.4%", change: "+1.1%", trend: "up", icon: TrendingUp },
  ];

  const monthlyTrendsData = [
    { name: 'Jan', applications: 240, approvals: 185, repayments: 92 },
    { name: 'Feb', applications: 268, approvals: 201, repayments: 94 },
    { name: 'Mar', applications: 295, approvals: 218, repayments: 89 },
    { name: 'Apr', applications: 312, approvals: 241, repayments: 96 },
    { name: 'May', applications: 287, approvals: 223, repayments: 93 },
    { name: 'Jun', applications: 334, approvals: 258, repayments: 95 },
  ];

  const statusDistribution = [
    { name: 'Approved', value: 76.3, color: '#22c55e' },
    { name: 'Pending', value: 15.2, color: '#f59e0b' },
    { name: 'Rejected', value: 8.5, color: '#ef4444' },
  ];

  const renderKPISection = (title: string, kpis: any[]) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className="h-5 w-5 text-blue-600" />
                  <Badge variant={kpi.trend === 'up' ? 'default' : 'destructive'}>
                    {kpi.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="applications">Applications</SelectItem>
              <SelectItem value="repayments">Repayments</SelectItem>
              <SelectItem value="ownership">Ownership</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Sections */}
      {(selectedCategory === 'all' || selectedCategory === 'applications') && 
        renderKPISection('Application KPIs', applicationKPIs)
      }
      
      {(selectedCategory === 'all' || selectedCategory === 'repayments') && 
        renderKPISection('Repayment KPIs', repaymentKPIs)
      }
      
      {(selectedCategory === 'all' || selectedCategory === 'ownership') && 
        renderKPISection('Ownership KPIs', ownershipKPIs)
      }

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="approvals" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="repayments" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KPIDashboards;
