
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileClock } from 'lucide-react';

const EmptyApplicationState: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <FileClock className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No applications found</h3>
        <p className="text-muted-foreground mt-1">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyApplicationState;
