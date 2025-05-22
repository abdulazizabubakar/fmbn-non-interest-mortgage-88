
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MortgageApplication } from '@/types/mortgage-application';
import ApplicationCard from './ApplicationCard';
import EmptyApplicationState from './EmptyApplicationState';

interface ApplicationsListProps {
  applications: MortgageApplication[];
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ applications }) => {
  const navigate = useNavigate();
  
  // Handle view application details
  const handleViewApplication = (id: string) => {
    navigate(`/mortgage-applications/${id}`);
  };
  
  if (applications.length === 0) {
    return <EmptyApplicationState />;
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard 
          key={application.id} 
          application={application} 
          onViewDetails={handleViewApplication} 
        />
      ))}
    </div>
  );
};

export default ApplicationsList;
