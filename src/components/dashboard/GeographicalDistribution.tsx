
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GeographicalDistributionProps {
  view: 'applications' | 'properties' | 'payments' | 'defaults';
}

const GeographicalDistribution: React.FC<GeographicalDistributionProps> = ({ 
  view = 'properties' 
}) => {
  const [mapView, setMapView] = useState<'heatmap' | 'markers'>('heatmap');
  const [region, setRegion] = useState<string>('all');

  // This would be replaced with an actual map implementation
  // Using a library like react-simple-maps or Mapbox
  const renderMockMap = () => {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center border">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-2">
            Nigeria Geographical Map would be displayed here showing {view} distribution by {region === 'all' ? 'all regions' : region}.
          </p>
          <p className="text-sm text-muted-foreground">
            View: <span className="font-medium">{mapView}</span>
          </p>
        </div>
      </div>
    );
  };

  const getViewTitle = () => {
    switch (view) {
      case 'properties': return 'Property Distribution';
      case 'applications': return 'Application Distribution';
      case 'payments': return 'Payment Performance';
      case 'defaults': return 'Default Distribution';
      default: return 'Geographical Distribution';
    }
  };

  const getViewDescription = () => {
    switch (view) {
      case 'properties': return 'Geographical distribution of properties by state and region';
      case 'applications': return 'Heatmap of application concentrations across Nigeria';
      case 'payments': return 'Payment performance metrics by geographical location';
      case 'defaults': return 'Mapping of defaults and arrears by location';
      default: return 'Geographical insights and mapping data';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle>{getViewTitle()}</CardTitle>
            <CardDescription>{getViewDescription()}</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={mapView} onValueChange={(value) => setMapView(value as 'heatmap' | 'markers')}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Map Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heatmap">Heat Map</SelectItem>
                <SelectItem value="markers">Marker Map</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north_central">North Central</SelectItem>
                <SelectItem value="north_east">North East</SelectItem>
                <SelectItem value="north_west">North West</SelectItem>
                <SelectItem value="south_east">South East</SelectItem>
                <SelectItem value="south_south">South South</SelectItem>
                <SelectItem value="south_west">South West</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {renderMockMap()}
      </CardContent>
    </Card>
  );
};

export default GeographicalDistribution;
