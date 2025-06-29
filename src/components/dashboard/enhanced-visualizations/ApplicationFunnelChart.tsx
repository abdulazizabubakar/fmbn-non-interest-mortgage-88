
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelChart, Funnel, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Applications Received', value: 2420, fill: '#3b82f6' },
  { name: 'Initial Review', value: 1890, fill: '#22c55e' },
  { name: 'Documentation', value: 1420, fill: '#f59e0b' },
  { name: 'Approval Process', value: 980, fill: '#8b5cf6' },
  { name: 'Disbursement', value: 720, fill: '#ec4899' }
];

const ApplicationFunnelChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Processing Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip formatter={(value, name) => [`${value} applications`, name]} />
              <Funnel dataKey="value" data={data} isAnimationActive>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationFunnelChart;
