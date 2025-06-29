
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, TrendingUp, TrendingDown } from 'lucide-react';

const riskMetrics = [
  { category: 'Credit Risk', score: 78, status: 'Good', trend: 'up', color: 'green' },
  { category: 'Operational Risk', score: 65, status: 'Moderate', trend: 'down', color: 'yellow' },
  { category: 'Market Risk', score: 82, status: 'Good', trend: 'up', color: 'green' },
  { category: 'Liquidity Risk', score: 58, status: 'Watch', trend: 'down', color: 'orange' }
];

const riskAlerts = [
  { id: 1, type: 'High', message: '15 accounts past due >90 days', priority: 'urgent' },
  { id: 2, type: 'Medium', message: 'Concentration risk in Lagos region', priority: 'moderate' },
  { id: 3, type: 'Low', message: 'Minor documentation delays', priority: 'low' }
];

const RiskAnalyticsDashboard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Risk Analytics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-gray-600">RISK SCORES</h4>
            {riskMetrics.map((metric) => (
              <div key={metric.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.category}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={metric.color === 'green' ? 'default' : 'outline'}>
                      {metric.status}
                    </Badge>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                <Progress value={metric.score} className="h-2" />
                <div className="text-xs text-gray-500">{metric.score}/100</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-gray-600">ACTIVE ALERTS</h4>
            {riskAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                alert.priority === 'urgent' ? 'border-red-500 bg-red-50' :
                alert.priority === 'moderate' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    alert.priority === 'urgent' ? 'text-red-500' :
                    alert.priority === 'moderate' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{alert.type} Risk</div>
                    <div className="text-sm text-gray-600">{alert.message}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAnalyticsDashboard;
