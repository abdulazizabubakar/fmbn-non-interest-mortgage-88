
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import DocumentCenterModule from '@/components/documents/DocumentCenterModule';

const Documents = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Document Center</h1>
          <p className="text-muted-foreground">
            Manage, upload and share documents securely in one central location
          </p>
        </div>
        
        <DocumentCenterModule />
      </div>
    </PageContainer>
  );
};

export default Documents;
