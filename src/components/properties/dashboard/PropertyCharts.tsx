
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area,
  LineChart,
  Line,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';

const PropertyCharts = () => {
  // Monthly trends data
  const monthlyTrends = [
    { month: 'Jan', allocated: 12, available: 28, occupied: 18, value: 850 },
    { month: 'Feb', allocated: 18, available: 24, occupied: 22, value: 920 },
    { month: 'Mar', allocated: 22, available: 20, occupied: 28, value: 1100 },
    { month: 'Apr', allocated: 28, available: 18, occupied: 32, value: 1250 },
    { month: 'May', allocated: 32, available: 15, occupied: 35, value: 1350 },
    { month: 'Jun', allocated: 35, available: 12, occupied: 38, value: 1420 },
  ];

  // Property valuation trends
  const valuationTrends = [
    { month: 'Jan', avgValue: 38.5, marketGrowth: 2.1 },
    { month: 'Feb', avgValue: 39.2, marketGrowth: 1.8 },
    { month: 'Mar', avgValue: 40.1, marketGrowth: 2.3 },
    { month: 'Apr', avgValue: 41.5, marketGrowth: 3.5 },
    { month: 'May', avgValue: 42.8, marketGrowth: 3.1 },
    { month: 'Jun', avgValue: 43.6, marketGrowth: 1.9 },
  ];

  // Property types distribution
  const propertyTypeData = [
    { name: 'Apartments', value: 180, color: '#3B82F6', percentage: 55 },
    { name: 'Duplexes', value: 85, color: '#10B981', percentage: 26 },
    { name: 'Bungalows', value: 59, color: '#F59E0B', percentage: 19 },
  ];

  // Regional performance
  const regionalData = [
    { region: 'Lagos', properties: 89, value: 4.2, occupancy: 94 },
    { region: 'Abuja', properties: 76, value: 3.8, occupancy: 89 },
    { region: 'Kano', properties: 52, value: 2.1, occupancy: 87 },
    { region: 'Rivers', properties: 48, value: 2.3, occupancy: 91 },
    { region: 'Kaduna', properties: 35, value: 1.5, occupancy: 85 },
  ];

  return (
    <>
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Allocation Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Allocation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="allocated" stackId="1" stroke="#3B82F6" fill="#3B82F6" name="Allocated" />
                  <Area type="monotone" dataKey="occupied" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="Occupied" />
                  <Area type="monotone" dataKey="available" stackId="1" stroke="#10B981" fill="#10B981" name="Available" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Value Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Property Value Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={valuationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => [
                    name === 'avgValue' ? `₦${value}M` : `${value}%`,
                    name === 'avgValue' ? 'Average Value' : 'Market Growth'
                  ]} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="avgValue" stroke="#3B82F6" strokeWidth={3} name="Average Value (₦M)" />
                  <Line yAxisId="right" type="monotone" dataKey="marketGrowth" stroke="#10B981" strokeWidth={2} name="Market Growth (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Property Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {propertyTypeData.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="font-medium">{type.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={type.percentage} className="w-20 h-2" />
                    <span className="text-sm font-medium w-8">{type.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="region" type="category" width={60} />
                  <Tooltip formatter={(value, name) => [
                    name === 'value' ? `₦${value}B` : `${value}%`,
                    name === 'properties' ? 'Properties' : name === 'value' ? 'Total Value' : 'Occupancy'
                  ]} />
                  <Bar dataKey="properties" fill="#3B82F6" name="Properties" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PropertyCharts;
