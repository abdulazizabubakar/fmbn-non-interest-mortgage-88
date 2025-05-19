
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const PredictiveInsights = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              AI-Powered Predictive Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] bg-muted rounded-md flex flex-col items-center justify-center p-6">
              <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Predictive Insights Coming Soon</h3>
              <p className="text-sm text-muted-foreground text-center max-w-lg mt-2">
                This section will leverage AI and machine learning to provide predictive insights such as 
                early default detection, risk segment prediction, and other forecasting analytics to support 
                proactive decision-making.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveInsights;
