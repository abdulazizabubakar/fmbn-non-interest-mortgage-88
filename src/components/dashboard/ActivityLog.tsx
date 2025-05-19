
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockActivityLogs } from '@/data/mockData';
import { format } from 'date-fns';

const ActivityLog: React.FC = () => {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivityLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-2 h-2 mt-2 bg-nimms-primary rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{log.user}</span> {log.action} <span className="font-medium">{log.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(log.timestamp), 'MMM dd, yyyy - HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
