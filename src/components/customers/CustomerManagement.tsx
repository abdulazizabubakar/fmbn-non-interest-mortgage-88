
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerDirectory from './CustomerDirectory';
import CustomerOnboarding from './CustomerOnboarding';
import CustomerProfile from './CustomerProfile';
import CustomerCommunication from './CustomerCommunication';
import CustomerSupport from './CustomerSupport';
import CustomerAnalytics from './CustomerAnalytics';
import { Customer } from '@/types/customer';
import { mockCustomers } from '@/data/mockCustomerData';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState('directory');

  // Handle customer selection
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setActiveTab('profile');
  };

  // Handle customer creation
  const handleCustomerCreated = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    setSelectedCustomer(newCustomer);
    setActiveTab('profile');
  };

  // Handle customer update
  const handleCustomerUpdated = (updatedCustomer: Customer) => {
    setCustomers(
      customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)
    );
    setSelectedCustomer(updatedCustomer);
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="profile" disabled={!selectedCustomer}>Profile</TabsTrigger>
          <TabsTrigger value="communication" disabled={!selectedCustomer}>Communication</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="directory">
          <CustomerDirectory 
            customers={customers} 
            onSelectCustomer={handleSelectCustomer} 
          />
        </TabsContent>
        
        <TabsContent value="onboarding">
          <CustomerOnboarding onCustomerCreated={handleCustomerCreated} />
        </TabsContent>
        
        <TabsContent value="profile">
          {selectedCustomer ? (
            <CustomerProfile 
              customer={selectedCustomer} 
              onCustomerUpdated={handleCustomerUpdated} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Select a customer from the Directory to view their profile</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="communication">
          {selectedCustomer ? (
            <CustomerCommunication customer={selectedCustomer} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Select a customer from the Directory to manage communications</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="support">
          <CustomerSupport 
            customers={customers} 
            selectedCustomer={selectedCustomer} 
            onSelectCustomer={handleSelectCustomer}
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <CustomerAnalytics customers={customers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerManagement;
