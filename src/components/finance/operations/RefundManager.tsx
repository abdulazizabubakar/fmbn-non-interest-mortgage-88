
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

const RefundManager: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Refund Management</CardTitle>
        <CardDescription>Process refund requests from customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-12 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-medium">Refund Management Module</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            This module will allow you to process refund requests, track refund status,
            and manage the refund approval workflow.
          </p>
          <Button className="mt-6">Set Up Refund Management</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RefundManager;
