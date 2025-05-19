
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import IntegrationsModule from '@/components/integrations/IntegrationsModule';

const Integrations = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">
            Connect NIMMS with third-party systems and services for seamless data flow
          </p>
        </div>
        
        <IntegrationsModule />
      </div>
    </PageContainer>
  );
};

export default Integrations;
