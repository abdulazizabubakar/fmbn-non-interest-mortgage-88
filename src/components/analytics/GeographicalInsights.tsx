
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";

const GeographicalInsights = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Geographic Distribution of Mortgages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] bg-muted rounded-md flex flex-col items-center justify-center p-6">
              <Map className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Interactive Map Coming Soon</h3>
              <p className="text-sm text-muted-foreground text-center max-w-lg mt-2">
                This section will display an interactive map showing the geographic distribution of mortgages across Nigeria, 
                with heat-map overlays for metrics like approval rates, disbursement amounts, and delinquency rates by region.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographicalInsights;
