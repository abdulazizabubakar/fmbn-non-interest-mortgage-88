
import React, { useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Customer, CustomerType, RiskCategory } from '@/types/customer';

interface CustomerAnalyticsProps {
  customers: Customer[];
}

const CustomerAnalytics: React.FC<CustomerAnalyticsProps> = ({ customers }) => {
  // Prepare data for customer type distribution
  const customerTypeData = useMemo(() => {
    const typeCount: Record<string, number> = {};
    customers.forEach(customer => {
      const type = customer.customerType;
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    
    return Object.entries(typeCount).map(([type, count]) => ({
      name: type.replace('_', ' '),
      value: count,
      fill: getTypeColor(type as CustomerType)
    }));
  }, [customers]);
  
  // Prepare data for customer state distribution
  const customerStateData = useMemo(() => {
    const stateCount: Record<string, number> = {};
    customers.forEach(customer => {
      const state = customer.state;
      stateCount[state] = (stateCount[state] || 0) + 1;
    });
    
    return Object.entries(stateCount)
      .map(([state, count]) => ({
        state,
        count
      }))
      .sort((a, b) => b.count - a.count);
  }, [customers]);
  
  // Prepare data for customer risk category distribution
  const customerRiskData = useMemo(() => {
    const riskCount: Record<string, number> = {
      low: 0,
      medium: 0,
      high: 0,
      critical: 0
    };
    
    customers.forEach(customer => {
      if (customer.riskProfile) {
        const risk = customer.riskProfile.riskCategory;
        riskCount[risk] = (riskCount[risk] || 0) + 1;
      }
    });
    
    return Object.entries(riskCount)
      .map(([risk, count]) => ({
        name: risk,
        value: count,
        fill: getRiskColor(risk as RiskCategory)
      }));
  }, [customers]);
  
  // Prepare data for customer monthly income distribution
  const customerIncomeData = useMemo(() => {
    const incomeRanges = [
      { range: '< ₦100k', min: 0, max: 100000, count: 0 },
      { range: '₦100k - ₦250k', min: 100000, max: 250000, count: 0 },
      { range: '₦250k - ₦500k', min: 250000, max: 500000, count: 0 },
      { range: '₦500k - ₦750k', min: 500000, max: 750000, count: 0 },
      { range: '₦750k - ₦1M', min: 750000, max: 1000000, count: 0 },
      { range: '> ₦1M', min: 1000000, max: Infinity, count: 0 }
    ];
    
    customers.forEach(customer => {
      const income = customer.monthlyIncome;
      const rangeIndex = incomeRanges.findIndex(r => income >= r.min && income < r.max);
      if (rangeIndex !== -1) {
        incomeRanges[rangeIndex].count++;
      }
    });
    
    return incomeRanges.map(r => ({
      range: r.range,
      count: r.count
    }));
  }, [customers]);
  
  // Customer status count
  const statusCount = useMemo(() => {
    const counts = {
      active: customers.filter(c => c.status === 'active').length,
      pending: customers.filter(c => c.status === 'pending_verification').length,
      suspended: customers.filter(c => c.status === 'suspended').length,
      blacklisted: customers.filter(c => c.status === 'blacklisted').length,
      completed: customers.filter(c => c.status === 'completed').length,
    };
    
    return counts;
  }, [customers]);
  
  // Helper functions for colors
  function getTypeColor(type: CustomerType): string {
    const colors: Record<CustomerType, string> = {
      new_applicant: '#818cf8',
      nhf_contributor: '#6366f1',
      diaspora: '#4f46e5',
      government_worker: '#4338ca',
      private_sector: '#3730a3',
      cooperative: '#312e81'
    };
    
    return colors[type] || '#6366f1';
  }
  
  function getRiskColor(risk: RiskCategory): string {
    const colors: Record<RiskCategory, string> = {
      low: '#22c55e',
      medium: '#f59e0b',
      high: '#ef4444',
      critical: '#7f1d1d'
    };
    
    return colors[risk] || '#6366f1';
  }
  
  // Custom tooltip component for the charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 rounded-md shadow-sm">
          <p className="font-medium text-sm">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCount.active}</div>
            <p className="text-xs text-muted-foreground">{Math.round((statusCount.active / customers.length) * 100)}% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{statusCount.pending}</div>
            <p className="text-xs text-muted-foreground">{Math.round((statusCount.pending / customers.length) * 100)}% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suspended/Blacklisted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{statusCount.suspended + statusCount.blacklisted}</div>
            <p className="text-xs text-muted-foreground">{Math.round(((statusCount.suspended + statusCount.blacklisted) / customers.length) * 100)}% of total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{statusCount.completed}</div>
            <p className="text-xs text-muted-foreground">{Math.round((statusCount.completed / customers.length) * 100)}% of total</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Type Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Customer Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of customers by classification
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Customer Monthly Income Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Income Distribution</CardTitle>
            <CardDescription>
              Customer segmentation by income range
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerIncomeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" vertical={false} />
                  <XAxis 
                    dataKey="range" 
                    angle={-45} 
                    textAnchor="end" 
                    tick={{ fontSize: 12 }}
                    height={60}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Customers" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Customer State Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Geographical Distribution</CardTitle>
            <CardDescription>
              Customer distribution by state
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={customerStateData.slice(0, 10)} 
                  layout="vertical" 
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#ddd" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="state" 
                    type="category" 
                    tick={{ fontSize: 12 }}
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Customers" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Customer Risk Profile */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Risk Profile</CardTitle>
            <CardDescription>
              Customer segmentation by risk category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerRiskData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {customerRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Key Insights Card */}
      <Card>
        <CardHeader>
          <CardTitle>Key Customer Insights</CardTitle>
          <CardDescription>
            Important trends and metrics from customer data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-base">Customer Demographics</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Most common customer type:</span>
                    <span className="font-medium capitalize">
                      {customerTypeData.sort((a, b) => b.value - a.value)[0]?.name || 'N/A'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Most represented state:</span>
                    <span className="font-medium">
                      {customerStateData[0]?.state || 'N/A'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Avg. monthly income:</span>
                    <span className="font-medium">
                      {customers.length > 0 
                        ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                            customers.reduce((sum, cust) => sum + cust.monthlyIncome, 0) / customers.length
                          )
                        : 'N/A'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-base">Customer Acquisition</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">New customers (90 days):</span>
                    <span className="font-medium">
                      {customers.filter(c => {
                        const diff = new Date().getTime() - new Date(c.createdAt).getTime();
                        const days = diff / (1000 * 60 * 60 * 24);
                        return days <= 90;
                      }).length}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Pending verification:</span>
                    <span className="font-medium">{statusCount.pending}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-base">Risk Analysis</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">High/Critical risk customers:</span>
                    <span className="font-medium">
                      {customers.filter(c => c.riskProfile?.riskCategory === 'high' || c.riskProfile?.riskCategory === 'critical').length}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Customers in arrears:</span>
                    <span className="font-medium">
                      {customers.filter(c => c.tags.includes('in_arrears')).length}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Defaulting customers:</span>
                    <span className="font-medium">
                      {customers.filter(c => c.tags.includes('defaulting')).length}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-base">Retention & Completion</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Eligible for ownership:</span>
                    <span className="font-medium">
                      {customers.filter(c => c.tags.includes('eligible_for_ownership')).length}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Completed ownership:</span>
                    <span className="font-medium">{statusCount.completed}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAnalytics;
