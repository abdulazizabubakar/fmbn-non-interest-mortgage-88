
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const CustomerAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Customer Segmentation Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] bg-muted rounded-md flex flex-col items-center justify-center p-6">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Customer Analytics Coming Soon</h3>
              <p className="text-sm text-muted-foreground text-center max-w-lg mt-2">
                This section will display advanced customer segmentation analysis, showing demographic breakdowns, 
                behavior patterns, and key performance indicators across different customer segments.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
