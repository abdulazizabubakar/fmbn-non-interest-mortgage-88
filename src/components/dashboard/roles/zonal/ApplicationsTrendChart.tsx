
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ApplicationsTrendChartProps {
  region?: string;
}

const ApplicationsTrendChart: React.FC<ApplicationsTrendChartProps> = ({ region }) => {
  // Mock data for regional applications
  const applicationData = [
    { month: 'Jan', applications: 35, approvals: 28, disbursements: 22 },
    { month: 'Feb', applications: 42, approvals: 30, disbursements: 25 },
    { month: 'Mar', applications: 48, approvals: 36, disbursements: 30 },
    { month: 'Apr', applications: 52, approvals: 40, disbursements: 32 },
    { month: 'May', applications: 58, approvals: 44, disbursements: 38 },
    { month: 'Jun', applications: 62, approvals: 46, disbursements: 40 },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={applicationData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
          <Bar dataKey="approvals" fill="#10B981" name="Approvals" />
          <Bar dataKey="disbursements" fill="#6366F1" name="Disbursements" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationsTrendChart;
