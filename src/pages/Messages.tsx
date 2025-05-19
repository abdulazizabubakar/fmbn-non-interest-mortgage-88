
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import NotificationsModule from '@/components/messages/NotificationsModule';

const Messages = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages & Notifications</h1>
          <p className="text-muted-foreground">
            Manage all your communications, alerts and notifications in one place
          </p>
        </div>
        
        <NotificationsModule />
      </div>
    </PageContainer>
  );
};

export default Messages;
