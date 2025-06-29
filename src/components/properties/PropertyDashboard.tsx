
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, MapPin, Calendar, TrendingUp, AlertTriangle, Users, DollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

interface PropertyDashboardProps {
  searchQuery?: string;
}

const PropertyDashboard: React.FC<PropertyDashboardProps> = ({ searchQuery }) => {
  // Mock data for property statistics
  const propertyStats = [
    { 
      title: "Total Properties", 
      value: 324, 
      icon: Building,
      color: "bg-blue-100 text-blue-600",
      change: "+12%"
    },
    { 
      title: "Available Units", 
      value: 87, 
      icon: Home,
      color: "bg-green-100 text-green-600",
      change: "-5%"
    },
    { 
      title: "Total Value", 
      value: "₦14.2B", 
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
      change: "+8%"
    },
    { 
      title: "Occupancy Rate", 
      value: "92%", 
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      change: "+3%"
    },
  ];

  // Property types distribution
  const propertyTypeData = [
    { name: 'Apartments', value: 180, color: '#3B82F6', percentage: 55 },
    { name: 'Duplexes', value: 85, color: '#10B981', percentage: 26 },
    { name: 'Bungalows', value: 59, color: '#F59E0B', percentage: 19 },
  ];

  // Property status distribution
  const propertyStatusData = [
    { name: 'Available', value: 87, color: '#10B981' },
    { name: 'Allocated', value: 142, color: '#3B82F6' },
    { name: 'Occupied', value: 95, color: '#8B5CF6' },
  ];

  // Monthly trends
  const monthlyTrends = [
    { month: 'Jan', allocated: 12, available: 28, occupied: 18, value: 850 },
    { month: 'Feb', allocated: 18, available: 24, occupied: 22, value: 920 },
    { month: 'Mar', allocated: 22, available: 20, occupied: 28, value: 1100 },
    { month: 'Apr', allocated: 28, available: 18, occupied: 32, value: 1250 },
    { month: 'May', allocated: 32, available: 15, occupied: 35, value: 1350 },
    { month: 'Jun', allocated: 35, available: 12, occupied: 38, value: 1420 },
  ];

  // Regional performance
  const regionalData = [
    { region: 'Lagos', properties: 89, value: 4.2, occupancy: 94 },
    { region: 'Abuja', properties: 76, value: 3.8, occupancy: 89 },
    { region: 'Kano', properties: 52, value: 2.1, occupancy: 87 },
    { region: 'Rivers', properties: 48, value: 2.3, occupancy: 91 },
    { region: 'Kaduna', properties: 35, value: 1.5, occupancy: 85 },
  ];

  // Construction progress data
  const constructionData = [
    { id: 'Sunrise Estate', progress: 75, units: 24, completion: '2024-03-15' },
    { id: 'Green Valley Homes', progress: 45, units: 36, completion: '2024-06-20' },
    { id: 'Harmony Heights', progress: 90, units: 18, completion: '2024-01-30' },
    { id: 'Peace Gardens', progress: 30, units: 42, completion: '2024-08-10' },
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

  return (
    <div className="space-y-6">
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {propertyStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`rounded-full p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'}>
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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

      {/* Construction Progress & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Construction Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Construction Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {constructionData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.id}</p>
                      <p className="text-sm text-muted-foreground">{item.units} units • Due: {item.completion}</p>
                    </div>
                    <span className="text-sm font-medium">{item.progress}%</span>
                  </div>
                  <Progress 
                    value={item.progress} 
                    className="h-3" 
                  />
                  <div className="flex justify-end">
                    <Badge variant={item.progress >= 75 ? 'default' : item.progress >= 50 ? 'outline' : 'secondary'}>
                      {item.progress >= 75 ? 'On Track' : item.progress >= 50 ? 'Moderate' : 'Behind Schedule'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Property Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-700">Maintenance Required</h4>
                    <p className="text-sm text-red-600">5 properties need immediate maintenance attention</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-700">Inspection Due</h4>
                    <p className="text-sm text-yellow-600">12 properties have pending inspections this week</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">Market Update</h4>
                    <p className="text-sm text-blue-600">Property values increased by 2.3% this quarter</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDashboard;
