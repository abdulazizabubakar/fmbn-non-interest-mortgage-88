import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const SimpleDatePicker = () => {
  return (
    <Button variant="outline" size="sm">
      <Calendar className="h-4 w-4 mr-2" />
      Date Range
    </Button>
  );
};

export default SimpleDatePicker;