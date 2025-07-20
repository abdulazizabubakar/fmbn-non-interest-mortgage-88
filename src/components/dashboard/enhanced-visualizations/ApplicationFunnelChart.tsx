
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelChart, Funnel, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { 
    name: 'Applications Received', 
    value: 2420, 
    fill: 'hsl(var(--fmbn-primary))',
    percentage: 100,
    conversionRate: '-'
  },
  { 
    name: 'Initial Review', 
    value: 1890, 
    fill: 'hsl(var(--fmbn-secondary))',
    percentage: 78.1,
    conversionRate: '78.1%'
  },
  { 
    name: 'Documentation', 
    value: 1420, 
    fill: 'hsl(var(--fmbn-accent))',
    percentage: 58.7,
    conversionRate: '75.1%'
  },
  { 
    name: 'Approval Process', 
    value: 980, 
    fill: 'hsl(var(--primary))',
    percentage: 40.5,
    conversionRate: '69.0%'
  },
  { 
    name: 'Disbursement', 
    value: 720, 
    fill: 'hsl(var(--secondary))',
    percentage: 29.8,
    conversionRate: '73.5%'
  }
];

const ApplicationFunnelChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Processing Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} applications (${props.payload.percentage}%)`, 
                    name
                  ]}
                  labelFormatter={() => ''}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Funnel dataKey="value" data={data} isAnimationActive>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
          
          {/* Funnel Stage Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.map((stage, index) => (
              <div key={stage.name} className="fmbn-card p-4 text-center">
                <div 
                  className="w-4 h-4 rounded mx-auto mb-2" 
                  style={{ backgroundColor: stage.fill }}
                />
                <h4 className="font-semibold text-sm mb-2">{stage.name}</h4>
                <div className="space-y-1 text-xs">
                  <div className="text-2xl font-bold text-foreground">
                    {stage.value.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground">
                    {stage.percentage}% of total
                  </div>
                  {stage.conversionRate !== '-' && (
                    <div className="text-fmbn-secondary font-medium">
                      {stage.conversionRate} conversion
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationFunnelChart;
