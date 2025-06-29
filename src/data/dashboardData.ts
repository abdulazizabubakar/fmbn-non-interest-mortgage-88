
export const mockKPIData = [
  {
    id: 'applications',
    title: 'Total Applications',
    value: '2,456',
    change: '+12.5%',
    trend: 'up' as const,
    color: 'blue',
    description: 'New applications this month',
    previousValue: 2187
  },
  {
    id: 'mortgages',
    title: 'Active Mortgages',
    value: '1,843',
    change: '+8.2%',
    trend: 'up' as const,
    color: 'green',
    description: 'Currently active mortgage accounts',
    previousValue: 1703
  },
  {
    id: 'collections',
    title: 'Monthly Collections',
    value: '₦4.2B',
    change: '+15.3%',
    trend: 'up' as const,
    color: 'purple',
    description: 'Collections for current month',
    previousValue: 3.64
  },
  {
    id: 'portfolio',
    title: 'Portfolio Value',
    value: '₦87.5B',
    change: '+6.7%',
    trend: 'up' as const,
    color: 'orange',
    description: 'Total portfolio valuation',
    previousValue: 82.0
  },
  {
    id: 'users',
    title: 'Active Users',
    value: '3,204',
    change: '+4.1%',
    trend: 'up' as const,
    color: 'pink',
    description: 'Monthly active users',
    previousValue: 3077
  },
  {
    id: 'alerts',
    title: 'Risk Alerts',
    value: '23',
    change: '-18.2%',
    trend: 'down' as const,
    color: 'red',
    description: 'Open risk alerts requiring attention',
    previousValue: 28
  }
];

export const chartData = {
  monthlyPerformance: [
    { name: 'Jan', applications: 186, approvals: 145, disbursements: 120 },
    { name: 'Feb', applications: 205, approvals: 168, disbursements: 142 },
    { name: 'Mar', applications: 237, approvals: 189, disbursements: 165 },
    { name: 'Apr', applications: 198, approvals: 156, disbursements: 138 },
    { name: 'May', applications: 243, approvals: 195, disbursements: 178 },
    { name: 'Jun', applications: 267, approvals: 213, disbursements: 195 }
  ],
  
  propertyTypes: [
    { name: 'Apartments', value: 45, color: '#3b82f6' },
    { name: 'Duplexes', value: 25, color: '#10b981' },
    { name: 'Bungalows', value: 15, color: '#f59e0b' },
    { name: 'Terraced', value: 15, color: '#8b5cf6' }
  ],

  regionalDistribution: [
    { name: 'North Central', value: 28, amount: 12.5 },
    { name: 'South West', value: 22, amount: 18.3 },
    { name: 'South East', value: 18, amount: 14.2 },
    { name: 'North West', value: 15, amount: 8.7 },
    { name: 'South South', value: 12, amount: 9.8 },
    { name: 'North East', value: 5, amount: 3.2 }
  ]
};

export const recentActivities = [
  {
    id: 1,
    type: 'application',
    title: 'New mortgage application submitted',
    description: 'Application #MA-2024-001234 for ₦25,000,000',
    time: '2 minutes ago',
    status: 'new',
    user: 'Adebayo Johnson'
  },
  {
    id: 2,
    type: 'approval',
    title: 'Mortgage application approved',
    description: 'Final approval for Application #MA-2024-001228',
    time: '15 minutes ago',
    status: 'approved',
    user: 'Fatima Al-Hassan'
  },
  {
    id: 3,
    type: 'disbursement',
    title: 'Funds disbursed successfully',
    description: '₦18,500,000 disbursed for Property PID-789456',
    time: '1 hour ago',
    status: 'completed',
    user: 'Emeka Okafor'
  },
  {
    id: 4,
    type: 'document',
    title: 'Document verification completed',
    description: 'All documents verified for Application #MA-2024-001225',
    time: '2 hours ago',
    status: 'verified',
    user: 'Aisha Bello'
  },
  {
    id: 5,
    type: 'payment',
    title: 'Monthly payment received',
    description: '₦185,000 payment processed for Account #AC-456789',
    time: '3 hours ago',
    status: 'received',
    user: 'Chinedu Okwu'
  }
];

export const quickStats = [
  { label: 'Approval Rate', value: '94.2%', status: 'excellent' },
  { label: 'Avg. Processing Time', value: '12.3 days', status: 'good' },
  { label: 'Default Rate', value: '2.1%', status: 'good' },
  { label: 'Collection Rate', value: '97.8%', status: 'excellent' },
  { label: 'Customer Satisfaction', value: '4.6/5', status: 'excellent' },
  { label: 'System Uptime', value: '99.98%', status: 'excellent' }
];
