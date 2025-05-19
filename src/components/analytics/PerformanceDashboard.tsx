
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar } from "lucide-react";

const PerformanceDashboard = () => {
  const [timePeriod, setTimePeriod] = useState('6months');
  
  const approvalRejectionData = [
    { month: 'Jan', approved: 45, rejected: 12 },
    { month: 'Feb', approved: 52, rejected: 15 },
    { month: 'Mar', approved: 49, rejected: 10 },
    { month: 'Apr', approved: 63, rejected: 14 },
    { month: 'May', approved: 58, rejected: 17 },
    { month: 'Jun', approved: 64, rejected: 13 }
  ];
  
  const disbursementData = [
    { month: 'Jan', amount: 120000000 },
    { month: 'Feb', amount: 135000000 },
    { month: 'Mar', amount: 128000000 },
    { month: 'Apr', amount: 150000000 },
    { month: 'May', amount: 162000000 },
    { month: 'Jun', amount: 175000000 }
  ];
  
  const productPerformanceData = [
    { name: 'Diminishing Musharakah', value: 45 },
    { name: 'Ijarah', value: 28 },
    { name: 'Murabaha', value: 18 },
    { name: 'Istisna\'a', value: 9 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const formatCurrency = (value: number) => {
    return `₦${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Performance Metrics</h3>
        <div className="flex items-center space-x-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
              <SelectItem value="2years">Last 2 years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Mortgage Approval vs. Rejection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={approvalRejectionData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" name="Approved" fill="#10b981" />
                  <Bar dataKey="rejected" name="Rejected" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Disbursement Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={disbursementData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    name="Disbursement Amount"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Product Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productPerformanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {productPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Processing Time by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { department: 'Legal', days: 4.2 },
                    { department: 'Risk', days: 3.6 },
                    { department: 'Shariah', days: 2.8 },
                    { department: 'Documentation', days: 5.1 },
                    { department: 'Finance', days: 3.3 }
                  ]}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 40,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 'dataMax + 1']} />
                  <YAxis dataKey="department" type="category" width={100} />
                  <Tooltip formatter={(value: number) => `${value} days`} />
                  <Legend />
                  <Bar 
                    dataKey="days" 
                    name="Processing Time (days)" 
                    fill="#8884d8" 
                    background={{ fill: '#eee' }} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
