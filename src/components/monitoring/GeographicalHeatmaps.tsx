
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const GeographicalHeatmaps = () => {
  const [selectedMetric, setSelectedMetric] = useState('applications');
  const [selectedRegion, setSelectedRegion] = useState('nigeria');
  const [mapView, setMapView] = useState('heatmap');

  const stateData = [
    { state: 'Lagos', applications: 524, approvals: 398, disbursements: 2.1, delinquency: 3.2 },
    { state: 'Abuja', applications: 312, approvals: 245, disbursements: 1.3, delinquency: 2.8 },
    { state: 'Kano', applications: 287, approvals: 198, disbursements: 0.9, delinquency: 4.1 },
    { state: 'Rivers', applications: 234, approvals: 176, disbursements: 0.8, delinquency: 3.5 },
    { state: 'Oyo', applications: 198, approvals: 142, disbursements: 0.7, delinquency: 3.8 },
    { state: 'Katsina', applications: 176, approvals: 124, disbursements: 0.6, delinquency: 4.5 },
  ];

  const lgaData = [
    { lga: 'Ikeja', state: 'Lagos', applications: 89, approvals: 67, performance: 'High' },
    { lga: 'Victoria Island', state: 'Lagos', applications: 76, approvals: 58, performance: 'High' },
    { lga: 'Abuja Municipal', state: 'Abuja', applications: 65, approvals: 49, performance: 'Medium' },
    { lga: 'Gwagwalada', state: 'Abuja', applications: 45, approvals: 32, performance: 'Medium' },
    { lga: 'Fagge', state: 'Kano', applications: 42, approvals: 28, performance: 'Low' },
    { lga: 'Nasarawa', state: 'Kano', applications: 38, approvals: 25, performance: 'Low' },
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricValue = (item: any) => {
    switch (selectedMetric) {
      case 'applications': return item.applications;
      case 'approvals': return item.approvals;
      case 'disbursements': return item.disbursements;
      case 'delinquency': return item.delinquency;
      default: return item.applications;
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applications">Applications</SelectItem>
              <SelectItem value="approvals">Approval Rates</SelectItem>
              <SelectItem value="disbursements">Disbursements (₦B)</SelectItem>
              <SelectItem value="delinquency">Delinquency (%)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="north">Northern Region</SelectItem>
              <SelectItem value="south">Southern Region</SelectItem>
              <SelectItem value="lagos">Lagos State</SelectItem>
            </SelectContent>
          </Select>

          <Select value={mapView} onValueChange={setMapView}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="heatmap">Heatmap</SelectItem>
              <SelectItem value="markers">Markers</SelectItem>
              <SelectItem value="choropleth">Choropleth</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4 mr-1" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4 mr-1" />
            Zoom Out
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Nigeria {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center p-6">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Interactive Nigeria Map
                </h3>
                <p className="text-gray-500 mb-4">
                  Geographical heatmap showing {selectedMetric} distribution across Nigeria ({mapView} view)
                </p>
                <div className="flex justify-center gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regional Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Regional Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Top Performing States</h4>
                <div className="space-y-2">
                  {stateData.slice(0, 6).map((state, index) => (
                    <div key={state.state} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{state.state}</p>
                        <p className="text-xs text-muted-foreground">
                          {getMetricValue(state)} {selectedMetric}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min((getMetricValue(state) / Math.max(...stateData.map(getMetricValue))) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">LGA Breakdown</h4>
                <div className="space-y-2">
                  {lgaData.slice(0, 4).map((lga, index) => (
                    <div key={`${lga.lga}-${lga.state}`} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{lga.lga}</p>
                        <p className="text-xs text-muted-foreground">{lga.state} State</p>
                      </div>
                      <Badge className={getPerformanceColor(lga.performance)}>
                        {lga.performance}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>State-by-State Performance Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">State</th>
                  <th className="text-center p-2">Applications</th>
                  <th className="text-center p-2">Approvals</th>
                  <th className="text-center p-2">Approval Rate</th>
                  <th className="text-center p-2">Disbursements (₦B)</th>
                  <th className="text-center p-2">Delinquency (%)</th>
                </tr>
              </thead>
              <tbody>
                {stateData.map((state, index) => (
                  <tr key={state.state} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{state.state}</td>
                    <td className="p-2 text-center">{state.applications}</td>
                    <td className="p-2 text-center">{state.approvals}</td>
                    <td className="p-2 text-center">{((state.approvals / state.applications) * 100).toFixed(1)}%</td>
                    <td className="p-2 text-center">₦{state.disbursements}B</td>
                    <td className="p-2 text-center">{state.delinquency}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeographicalHeatmaps;
