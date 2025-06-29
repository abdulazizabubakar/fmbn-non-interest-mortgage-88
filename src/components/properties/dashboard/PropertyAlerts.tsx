
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

const PropertyAlerts = () => {
  return (
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
  );
};

export default PropertyAlerts;
