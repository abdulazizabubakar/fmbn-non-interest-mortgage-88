
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, LineChart, Download, Clock, Calendar, Filter } from 'lucide-react';
import { mockMortgageAccounts } from '@/data/mockMortgageAccounts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

const ReportingView: React.FC = () => {
  // Calculate statistics for charts
  const statusCounts = mockMortgageAccounts.reduce((acc, account) => {
    acc[account.status] = (acc[account.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.replace('_', ' '),
    value: count
  }));
  
  // Sample payment data by month
  const paymentData = [
    { month: 'Jan', collected: 38500000, expected: 42000000 },
    { month: 'Feb', collected: 40200000, expected: 42000000 },
    { month: 'Mar', collected: 39800000, expected: 42000000 },
    { month: 'Apr', collected: 41500000, expected: 42000000 },
    { month: 'May', collected: 40900000, expected: 42000000 },
    { month: 'Jun', collected: 42000000, expected: 42000000 },
  ];
  
  // Sample portfolio by type
  const typeData = [
    { name: 'Ijara', value: 65 },
    { name: 'Murabaha', value: 20 },
    { name: 'Musharaka', value: 10 },
    { name: 'Istisna', value: 5 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Mortgage Reports</h2>
          <p className="text-muted-foreground">Analytics and insights for mortgage portfolio performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Portfolio</p>
                <p className="text-2xl font-bold">₦325.5M</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Accounts</p>
                <p className="text-2xl font-bold">{mockMortgageAccounts.length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <PieChart className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Tenure</p>
                <p className="text-2xl font-bold">18.5 yrs</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Collection Report */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Payment Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={paymentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="collected" name="Collected" fill="#22c55e" />
                  <Bar dataKey="expected" name="Expected" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mortgage Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Number of accounts']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {statusData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs capitalize">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Financing Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Financing Type Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {typeData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Key Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Collection Efficiency</p>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs">
                  <span className="text-muted-foreground">Target: 100%</span>
                  <span className="font-medium">95%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Default Rate</p>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-amber-500 rounded-full" style={{ width: '4%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs">
                  <span className="text-muted-foreground">Target: &lt;3%</span>
                  <span className="font-medium">4%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Early Settlement Rate</p>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '12%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs">
                  <span className="text-muted-foreground">Avg: 10%</span>
                  <span className="font-medium">12%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Portfolio Growth (YoY)</p>
                <div className="h-2 w-full bg-muted rounded-full">
                  <div className="h-2 bg-purple-500 rounded-full" style={{ width: '22%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs">
                  <span className="text-muted-foreground">Target: 15%</span>
                  <span className="font-medium">22%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span className="font-medium">Portfolio Summary</span>
              <span className="text-xs text-muted-foreground mt-1">Download as Excel or PDF</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
              <LineChart className="h-6 w-6 mb-2" />
              <span className="font-medium">Payment Trends</span>
              <span className="text-xs text-muted-foreground mt-1">Monthly or quarterly analysis</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
              <Clock className="h-6 w-6 mb-2" />
              <span className="font-medium">Maturity Forecast</span>
              <span className="text-xs text-muted-foreground mt-1">Upcoming property transfers</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span className="font-medium">Default Analysis</span>
              <span className="text-xs text-muted-foreground mt-1">Risk patterns and trends</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
              <FileCheck className="h-6 w-6 mb-2" />
              <span className="font-medium">Compliance Report</span>
              <span className="text-xs text-muted-foreground mt-1">Shariah and regulatory status</span>
            </Button>
            
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center text-center">
              <Map className="h-6 w-6 mb-2" />
              <span className="font-medium">Geographical Report</span>
              <span className="text-xs text-muted-foreground mt-1">Properties by location</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Import this since it's not included in our limited icon set
const Map = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" />
    <line x1="15" x2="15" y1="6" y2="21" />
  </svg>
);

export default ReportingView;
