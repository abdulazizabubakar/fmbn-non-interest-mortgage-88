import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import NigeriaStatesHeatmap from '@/components/gis/NigeriaStatesHeatmap';

const GISAnalytics = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">GIS Analytics</h1>
          <p className="text-muted-foreground">Geographical insights and state-level mortgage data analysis</p>
        </div>
        <NigeriaStatesHeatmap />
      </div>
    </PageContainer>
  );
};

export default GISAnalytics;