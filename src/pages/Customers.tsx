
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import CustomerManagement from '@/components/customers/CustomerManagement';

const Customers = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage, onboard, and support customers throughout their leasing journey
          </p>
        </div>
        
        <CustomerManagement />
      </div>
    </PageContainer>
  );
};

export default Customers;
