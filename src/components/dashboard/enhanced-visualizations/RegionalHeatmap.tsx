
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const regionalData = [
  { region: 'Lagos', applications: 1247, value: 18.5, growth: '+12.3%', color: 'bg-red-500' },
  { region: 'Abuja', applications: 892, value: 12.8, growth: '+8.7%', color: 'bg-orange-500' },
  { region: 'Kano', applications: 634, value: 8.9, growth: '+15.2%', color: 'bg-yellow-500' },
  { region: 'Rivers', applications: 456, value: 6.2, growth: '+6.8%', color: 'bg-green-500' },
  { region: 'Ogun', applications: 389, value: 5.1, growth: '+9.4%', color: 'bg-blue-500' },
  { region: 'Kaduna', applications: 278, value: 3.8, growth: '+4.2%', color: 'bg-purple-500' }
];

const RegionalHeatmap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Performance Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {regionalData.map((region) => (
            <div key={region.region} className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{region.region}</h4>
                <div className={`w-3 h-3 rounded-full ${region.color}`}></div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-medium">{region.applications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value:</span>
                  <span className="font-medium">₦{region.value}B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth:</span>
                  <Badge variant="outline" className="text-green-600">{region.growth}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalHeatmap;
