
import React from 'react';
import { EnhancedCard, EnhancedCardContent, EnhancedCardHeader } from '@/components/ui/enhanced-card';
import FinancialMetricsCards from './finance/FinancialMetricsCards';
import CollectionsChart from './finance/CollectionsChart';
import ArrearsZoneChart from './finance/ArrearsZoneChart';
import AtRiskAccountsTable from './finance/AtRiskAccountsTable';
import { Briefcase } from 'lucide-react';

interface FinanceDashboardProps {
  region?: string;
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ region = 'Global' }) => {
  return (
    <div className="space-y-6">
      <EnhancedCard gradient="blue" glow>
        <EnhancedCardHeader 
          title="Financial Overview" 
          description="Collections, disbursements, and financial health metrics"
          icon={<Briefcase className="h-6 w-6 text-primary" />}
        />
        <EnhancedCardContent>
          <FinancialMetricsCards region={region} />
        </EnhancedCardContent>
      </EnhancedCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CollectionsChart region={region} />
        <ArrearsZoneChart region={region} />
      </div>

      <AtRiskAccountsTable region={region} />
    </div>
  );
};

export default FinanceDashboard;
