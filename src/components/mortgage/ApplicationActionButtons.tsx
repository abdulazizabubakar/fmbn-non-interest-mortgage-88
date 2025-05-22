
import React from 'react';
import { Button } from '@/components/ui/button';
import { MortgageApplicationStatus } from '@/types/mortgage-application';
import { toast } from 'sonner';

interface ApplicationActionButtonsProps {
  status: MortgageApplicationStatus;
}

const ApplicationActionButtons: React.FC<ApplicationActionButtonsProps> = ({ status }) => {
  switch(status) {
    case 'draft':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Complete Application</Button>
          <Button variant="outline">Save Draft</Button>
        </div>
      );
    case 'submitted':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Start Review</Button>
          <Button variant="outline">Request Documents</Button>
        </div>
      );
    case 'in_review':
    case 'credit_assessment':
    case 'legal_review':
    case 'shariah_review':
    case 'management_approval':
    case 'board_approval':
      return (
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => toast.success('Application approved to next stage')}>
            Approve to Next Stage
          </Button>
          <Button variant="outline">Request Additional Info</Button>
          <Button variant="outline" className="text-red-600 hover:bg-red-50">Reject</Button>
        </div>
      );
    case 'approved':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Generate Contract</Button>
          <Button variant="outline">Modify Terms</Button>
        </div>
      );
    case 'offer_sent':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Mark as Accepted</Button>
          <Button variant="outline">Send Reminder</Button>
          <Button variant="outline" className="text-red-600 hover:bg-red-50">Mark as Rejected</Button>
        </div>
      );
    case 'contract_generated':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Record Signatures</Button>
          <Button variant="outline">Send to Customer</Button>
        </div>
      );
    case 'contract_signed':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Activate Lease</Button>
          <Button variant="outline">Schedule Disbursement</Button>
        </div>
      );
    case 'lease_activated':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>View Repayment Schedule</Button>
          <Button variant="outline">Generate Statement</Button>
        </div>
      );
    case 'rejected':
    case 'cancelled':
    case 'offer_rejected':
    case 'offer_expired':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Create New Application</Button>
          <Button variant="outline">View Rejection Reasons</Button>
        </div>
      );
    default:
      return null;
  }
};

export default ApplicationActionButtons;
