
import React, { useState } from 'react';
import { IslamicCard, IslamicCardHeader, IslamicCardContent } from '@/components/ui/islamic-card';
import { EnhancedKPIWidget } from '@/components/ui/enhanced-kpi-widget';
import { IslamicTabs, IslamicTabContent } from '@/components/ui/islamic-tabs';
import { IslamicChart } from '@/components/ui/islamic-chart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  FileText, 
  CreditCard, 
  Users, 
  TrendingUp, 
  BarChart3,
  Mosque,
  Shield,
  Clock,
  AlertTriangle,
  Settings,
  Bell,
  Download
} from 'lucide-react';

interface EnhancedIslamicDashboardProps {
  userRole: string;
  userRegion?: string;
}

const EnhancedIslamicDashboard: React.FC<EnhancedIslamicDashboardProps> = ({
  userRole,
  userRegion = 'All Regions'
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const monthlyData = [
    { name: 'Jan', applications: 120, approvals: 95, disbursements: 85 },
    { name: 'Feb', applications: 145, approvals: 110, disbursements: 102 },
    { name: 'Mar', applications: 180, approvals: 142, disbursements: 128 },
    { name: 'Apr', applications: 165, approvals: 138, disbursements: 120 },
    { name: 'May', applications: 195, approvals: 155, disbursements: 145 },
    { name: 'Jun', applications: 210, approvals: 168, disbursements: 160 }
  ];

  const statusData = [
    { name: 'Approved', value: 45, color: '#10B981' },
    { name: 'Pending', value: 30, color: '#F59E0B' },
    { name: 'Under Review', value: 20, color: '#3B82F6' },
    { name: 'Rejected', value: 5, color: '#EF4444' }
  ];

  const tabItems = [
    { 
      value: 'overview', 
      label: 'Overview', 
      icon: <BarChart3 className="h-4 w-4" />,
      badge: 0
    },
    { 
      value: 'applications', 
      label: 'Applications', 
      icon: <FileText className="h-4 w-4" />,
      badge: 24
    },
    { 
      value: 'financing', 
      label: 'Islamic Financing', 
      icon: <Mosque className="h-4 w-4" />,
      badge: 8
    },
    { 
      value: 'compliance', 
      label: 'Shariah Compliance', 
      icon: <Shield className="h-4 w-4" />,
      badge: 0
    },
    { 
      value: 'analytics', 
      label: 'Analytics', 
      icon: <TrendingUp className="h-4 w-4" />,
      badge: 0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-fmbn-light via-background to-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text font-playfair flex items-center space-x-3">
            <Mosque className="h-10 w-10 text-fmbn-primary" />
            <span>FMBN Islamic Banking Dashboard</span>
          </h1>
          <p className="text-fmbn-primary/70 text-lg font-medium mt-2">
            Federal Mortgage Bank of Nigeria - {userRegion} Region
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-fmbn-primary/30">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm" className="border-fmbn-primary/30">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="border-fmbn-primary/30">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* KPI Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EnhancedKPIWidget
          title="Total Portfolio"
          value={48500000000}
          previousValue={45200000000}
          icon={<Home className="h-6 w-6" />}
          format="currency"
          subtitle="Islamic mortgage portfolio"
          target={50000000000}
          realTime={true}
        />
        
        <EnhancedKPIWidget
          title="Active Applications"
          value={1247}
          previousValue={1180}
          icon={<FileText className="h-6 w-6" />}
          format="number"
          subtitle="New applications this month"
          target={1500}
        />
        
        <EnhancedKPIWidget
          title="Shariah Compliance"
          value={100}
          previousValue={100}
          icon={<Shield className="h-6 w-6" />}
          format="percentage"
          subtitle="All transactions compliant"
          trend="neutral"
        />
        
        <EnhancedKPIWidget
          title="Processing Time"
          value={12.5}
          previousValue={14.2}
          icon={<Clock className="h-6 w-6" />}
          format="number"
          subtitle="Average days to approval"
          trend="down"
        />
      </div>

      {/* Main Content with Islamic Tabs */}
      <IslamicTabs 
        tabs={tabItems} 
        value={activeTab} 
        onValueChange={setActiveTab}
        variant="horizontal"
      >
        <IslamicTabContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicChart
              title="Monthly Application Trends"
              description="Applications, approvals, and disbursements over time"
              data={monthlyData}
              type="area"
              height={350}
              dataKey="applications"
              xAxisKey="name"
            />
            
            <IslamicChart
              title="Application Status Distribution"
              description="Current status of all applications"
              data={statusData}
              type="pie"
              height={350}
              dataKey="value"
              xAxisKey="name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <IslamicCard variant="status" status="approved">
              <IslamicCardHeader 
                title="Recent Approvals" 
                description="24 applications approved today"
                icon={<Shield className="h-5 w-5" />}
                badge={<Badge className="bg-green-100 text-green-700">+12%</Badge>}
              />
              <IslamicCardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Individual Mortgages</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cooperative Financing</span>
                    <span className="font-medium">6</span>
                  </div>
                </div>
              </IslamicCardContent>
            </IslamicCard>
            
            <IslamicCard variant="status" status="pending">
              <IslamicCardHeader 
                title="Pending Reviews" 
                description="Applications awaiting review"
                icon={<Clock className="h-5 w-5" />}
                badge={<Badge className="bg-amber-100 text-amber-700">86</Badge>}
              />
              <IslamicCardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Documentation Review</span>
                    <span className="font-medium">52</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Shariah Board Review</span>
                    <span className="font-medium">34</span>
                  </div>
                </div>
              </IslamicCardContent>
            </IslamicCard>
            
            <IslamicCard variant="financial">
              <IslamicCardHeader 
                title="Monthly Collections" 
                description="Islamic finance repayments"
                icon={<CreditCard className="h-5 w-5" />}
                amount="₦4.2B"
              />
              <IslamicCardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Ijarah Payments</span>
                    <span className="font-medium">₦2.8B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Murabaha Settlements</span>
                    <span className="font-medium">₦1.4B</span>
                  </div>
                </div>
              </IslamicCardContent>
            </IslamicCard>
          </div>
        </IslamicTabContent>

        <IslamicTabContent value="applications">
          <div className="grid grid-cols-1 gap-6">
            <IslamicChart
              title="Application Processing Pipeline"
              description="Status breakdown of current applications"
              data={monthlyData}
              type="bar"
              height={400}
              dataKey="applications"
              xAxisKey="name"
            />
          </div>
        </IslamicTabContent>

        <IslamicTabContent value="financing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicCard variant="financial">
              <IslamicCardHeader 
                title="Islamic Finance Products" 
                description="Shariah-compliant mortgage solutions"
                icon={<Mosque className="h-5 w-5" />}
              />
              <IslamicCardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-fmbn-light rounded-lg">
                    <div>
                      <p className="font-medium">Ijarah (Lease-to-Own)</p>
                      <p className="text-sm text-fmbn-primary/70">Primary home financing</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-fmbn-light rounded-lg">
                    <div>
                      <p className="font-medium">Murabaha</p>
                      <p className="text-sm text-fmbn-primary/70">Cost-plus financing</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-fmbn-light rounded-lg">
                    <div>
                      <p className="font-medium">Istisna'a</p>
                      <p className="text-sm text-fmbn-primary/70">Construction financing</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Coming Soon</Badge>
                  </div>
                </div>
              </IslamicCardContent>
            </IslamicCard>
          </div>
        </IslamicTabContent>

        <IslamicTabContent value="compliance">
          <div className="grid grid-cols-1 gap-6">
            <IslamicCard variant="status" status="approved">
              <IslamicCardHeader 
                title="Shariah Compliance Status" 
                description="All transactions verified by Shariah Board"
                icon={<Shield className="h-5 w-5" />}
                badge={<Badge className="bg-green-100 text-green-700">100% Compliant</Badge>}
              />
              <IslamicCardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">847</div>
                    <div className="text-sm text-green-600">Contracts Reviewed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">100%</div>
                    <div className="text-sm text-green-600">Compliance Rate</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">0</div>
                    <div className="text-sm text-green-600">Violations</div>
                  </div>
                </div>
              </IslamicCardContent>
            </IslamicCard>
          </div>
        </IslamicTabContent>

        <IslamicTabContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IslamicChart
              title="Portfolio Growth Trend"
              description="Islamic finance portfolio expansion"
              data={monthlyData}
              type="line"
              height={350}
              dataKey="disbursements"
              xAxisKey="name"
            />
            
            <IslamicChart
              title="Regional Distribution"
              description="Applications by region"
              data={[
                { name: 'North Central', value: 35 },
                { name: 'South West', value: 28 },
                { name: 'North West', value: 20 },
                { name: 'South East', value: 12 },
                { name: 'South South', value: 5 }
              ]}
              type="bar"
              height={350}
              dataKey="value"
              xAxisKey="name"
            />
          </div>
        </IslamicTabContent>
      </IslamicTabs>
    </div>
  );
};

export default EnhancedIslamicDashboard;
