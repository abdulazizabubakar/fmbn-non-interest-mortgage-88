
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Clock, CheckCircle, XCircle, Filter, Download } from 'lucide-react';

const applicationData = [
  { month: 'Jan', received: 320, approved: 180, rejected: 45, pending: 95 },
  { month: 'Feb', received: 280, approved: 165, rejected: 32, pending: 83 },
  { month: 'Mar', received: 380, approved: 220, rejected: 58, pending: 102 },
  { month: 'Apr', received: 340, approved: 195, rejected: 41, pending: 104 },
  { month: 'May', received: 290, approved: 172, rejected: 38, pending: 80 },
  { month: 'Jun', received: 410, approved: 245, rejected: 52, pending: 113 }
];

const statusData = [
  { name: 'Approved', value: 1177, color: '#22c55e' },
  { name: 'Pending Review', value: 577, color: '#f59e0b' },
  { name: 'Rejected', value: 266, color: '#ef4444' },
  { name: 'Under Documentation', value: 423, color: '#8b5cf6' }
];

const ApplicationsTabContent = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">2,443</p>
                <p className="text-sm text-green-600">+8.2% from last month</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold">1,177</p>
                <p className="text-sm text-green-600">48% approval rate</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">577</p>
                <p className="text-sm text-yellow-600">Avg. 12 days processing</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">266</p>
                <p className="text-sm text-red-600">11% rejection rate</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="analytics" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="regional">Regional View</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="received" fill="#3b82f6" name="Received" />
                      <Bar dataKey="approved" fill="#22c55e" name="Approved" />
                      <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: 'Initial Review', count: 145, progress: 85, time: '2-3 days' },
                  { stage: 'Documentation', count: 89, progress: 65, time: '5-7 days' },
                  { stage: 'Credit Assessment', count: 67, progress: 45, time: '3-5 days' },
                  { stage: 'Final Approval', count: 34, progress: 78, time: '1-2 days' },
                  { stage: 'Disbursement Ready', count: 23, progress: 92, time: '1 day' }
                ].map((stage) => (
                  <div key={stage.stage} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-4">
                        <h4 className="font-medium">{stage.stage}</h4>
                        <Badge variant="outline">{stage.count} applications</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Avg: {stage.time}</div>
                    </div>
                    <Progress value={stage.progress} className="h-2" />
                    <div className="text-xs text-gray-500 mt-1">{stage.progress}% efficiency</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12.3</div>
                  <div className="text-sm text-gray-600">Avg Processing Days</div>
                  <div className="text-xs text-green-600">-2.1 from last month</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">87.5%</div>
                  <div className="text-sm text-gray-600">Documentation Completeness</div>
                  <div className="text-xs text-blue-600">+3.2% improvement</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">94.2%</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                  <div className="text-xs text-purple-600">+1.8% this month</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regional Application Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { region: 'Lagos', applications: 547, approved: 312, rate: 57 },
                  { region: 'Abuja', applications: 398, approved: 243, rate: 61 },
                  { region: 'Kano', applications: 289, approved: 167, rate: 58 },
                  { region: 'Rivers', applications: 234, approved: 145, rate: 62 },
                  { region: 'Ogun', applications: 198, approved: 118, rate: 60 },
                  { region: 'Kaduna', applications: 167, approved: 89, rate: 53 }
                ].map((region) => (
                  <div key={region.region} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{region.region}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Applications:</span>
                        <span className="font-medium">{region.applications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approved:</span>
                        <span className="font-medium">{region.approved}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <Badge variant="outline">{region.rate}%</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationsTabContent;
