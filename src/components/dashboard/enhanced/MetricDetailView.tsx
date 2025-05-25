
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface MetricDetailViewProps {
  selectedMetric: string;
  metrics: Array<{
    id: string;
    title: string;
  }>;
  onClose: () => void;
}

const MetricDetailView: React.FC<MetricDetailViewProps> = ({
  selectedMetric,
  metrics,
  onClose
}) => {
  const mockTrendData = [
    { name: 'Jan', value: 400 + Math.random() * 100 },
    { name: 'Feb', value: 300 + Math.random() * 100 },
    { name: 'Mar', value: 500 + Math.random() * 100 },
    { name: 'Apr', value: 600 + Math.random() * 100 },
    { name: 'May', value: 700 + Math.random() * 100 },
    { name: 'Jun', value: 800 + Math.random() * 100 },
  ];

  const selectedMetricData = metrics.find(m => m.id === selectedMetric);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Detailed View: {selectedMetricData?.title}</CardTitle>
            <CardDescription>Interactive analysis and trends</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockTrendData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricDetailView;
