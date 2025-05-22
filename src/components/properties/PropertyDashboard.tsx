
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Home, MapPin, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
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
  Cell
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
      color: "bg-blue-100 text-blue-600" 
    },
    { 
      title: "Available Units", 
      value: 87, 
      icon: Home,
      color: "bg-green-100 text-green-600"
    },
    { 
      title: "Under Construction", 
      value: 45, 
      icon: Building,
      color: "bg-amber-100 text-amber-600"
    },
    { 
      title: "Upcoming Inspections", 
      value: 12, 
      icon: Calendar,
      color: "bg-purple-100 text-purple-600"
    },
  ];

  // Mock data for property types distribution
  const propertyTypeData = [
    { name: 'Apartments', value: 180, color: '#3B82F6' },
    { name: 'Duplexes', value: 85, color: '#10B981' },
    { name: 'Bungalows', value: 59, color: '#F59E0B' },
  ];

  // Mock data for property status distribution
  const propertyStatusData = [
    { name: 'Available', value: 87, color: '#10B981' },
    { name: 'Allocated', value: 142, color: '#3B82F6' },
    { name: 'Occupied', value: 95, color: '#8B5CF6' },
  ];

  // Mock data for property location distribution (Top 5 states)
  const locationData = [
    { state: 'Lagos', count: 68 },
    { state: 'Abuja', count: 54 },
    { state: 'Kano', count: 42 },
    { state: 'Rivers', count: 35 },
    { state: 'Kaduna', count: 28 },
  ];

  // Mock data for construction progress
  const constructionData = [
    { id: 'Sunrise Estate', progress: 75, units: 24 },
    { id: 'Green Valley Homes', progress: 45, units: 36 },
    { id: 'Harmony Heights', progress: 90, units: 18 },
    { id: 'Peace Gardens', progress: 30, units: 42 },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="text-sm font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.fill }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {propertyStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex flex-row items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`rounded-full p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Property Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {propertyStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Location Distribution & Construction Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Property Distribution by Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="state" type="category" width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="#3B82F6" name="Properties" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

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
                      <p className="text-sm text-muted-foreground">{item.units} units</p>
                    </div>
                    <span className="text-sm font-medium">{item.progress}%</span>
                  </div>
                  <Progress 
                    value={item.progress} 
                    className="h-2" 
                    style={{"--progress-background": item.progress >= 75 ? "#10B981" : item.progress >= 50 ? "#3B82F6" : "#F59E0B"} as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDashboard;
