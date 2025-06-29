
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ConstructionProgress = () => {
  const constructionData = [
    { id: 'Sunrise Estate', progress: 75, units: 24, completion: '2024-03-15' },
    { id: 'Green Valley Homes', progress: 45, units: 36, completion: '2024-06-20' },
    { id: 'Harmony Heights', progress: 90, units: 18, completion: '2024-01-30' },
    { id: 'Peace Gardens', progress: 30, units: 42, completion: '2024-08-10' },
  ];

  return (
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
  );
};

export default ConstructionProgress;
