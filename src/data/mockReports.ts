
export const mockStandardReports = [
  {
    id: 'report-1',
    name: 'Active vs Closed Mortgage Accounts',
    description: 'Provides a comparison of active and closed mortgage accounts, with breakdowns by product type, region, and customer segments.',
    category: 'finance',
    lastGenerated: '2024-05-15',
  },
  {
    id: 'report-2',
    name: 'Delinquency Rates by Product Type',
    description: 'Analyzes delinquency rates across different mortgage product types, with trend analysis and comparison to industry benchmarks.',
    category: 'finance',
    lastGenerated: '2024-05-10',
  },
  {
    id: 'report-3',
    name: 'Disbursement Performance by Cooperative',
    description: 'Tracks disbursement performance metrics for each cooperative, including processing times, approval rates, and volume.',
    category: 'operations',
    lastGenerated: '2024-05-18',
  },
  {
    id: 'report-4',
    name: 'Legal Clearance Time by Region',
    description: 'Measures the average time taken for legal clearance of mortgage applications across different geographic regions.',
    category: 'compliance',
    lastGenerated: '2024-05-05',
  },
  {
    id: 'report-5',
    name: 'Shariah Compliance Report Logs',
    description: 'Comprehensive logs of Shariah compliance reviews, including approval rates, common issues, and resolution times.',
    category: 'compliance',
    lastGenerated: '2024-05-12',
  },
  {
    id: 'report-6',
    name: 'Monthly Performance Report by Branch',
    description: 'Monthly performance metrics for each branch, including application throughput, conversion rates, and customer satisfaction scores.',
    category: 'performance',
    lastGenerated: '2024-04-30',
  },
  {
    id: 'report-7',
    name: 'Customer Acquisition Channels',
    description: 'Analysis of customer acquisition channels, conversion rates, and cost per acquisition for different marketing initiatives.',
    category: 'customers',
    lastGenerated: '2024-05-02',
  },
  {
    id: 'report-8',
    name: 'Document Verification Efficiency',
    description: 'Measures the efficiency of document verification processes, including processing times, rejection rates, and bottlenecks.',
    category: 'operations',
    lastGenerated: null,
  },
  {
    id: 'report-9',
    name: 'Risk Assessment Report',
    description: 'Comprehensive risk profile analysis across the mortgage portfolio, with segmentation by risk categories and mitigation recommendations.',
    category: 'finance',
    lastGenerated: '2024-05-08',
  },
  {
    id: 'report-10',
    name: 'Customer Demographics Analysis',
    description: 'Demographic breakdown of customers by age, income, profession, and geographic distribution.',
    category: 'customers',
    lastGenerated: '2024-04-15',
  }
];

export const mockScheduledReports = [
  {
    id: 'sched-1',
    reportName: 'Monthly Performance Report by Branch',
    frequency: 'Monthly',
    nextRun: '2024-05-31 00:00:00',
    recipients: ['management@nimms.gov.ng', 'branch-managers@nimms.gov.ng'],
    format: 'Excel',
    active: true
  },
  {
    id: 'sched-2',
    reportName: 'Weekly Disbursement Summary',
    frequency: 'Weekly',
    nextRun: '2024-05-24 08:00:00',
    recipients: ['finance@nimms.gov.ng', 'operations@nimms.gov.ng'],
    format: 'PDF',
    active: true
  },
  {
    id: 'sched-3',
    reportName: 'Daily Application Processing Status',
    frequency: 'Daily',
    nextRun: '2024-05-20 09:00:00',
    recipients: ['operations@nimms.gov.ng'],
    format: 'Excel',
    active: true
  },
  {
    id: 'sched-4',
    reportName: 'Quarterly Compliance Dashboard',
    frequency: 'Quarterly',
    nextRun: '2024-06-30 00:00:00',
    recipients: ['compliance@nimms.gov.ng', 'legal@nimms.gov.ng', 'management@nimms.gov.ng'],
    format: 'PDF',
    active: true
  },
  {
    id: 'sched-5',
    reportName: 'Monthly Shariah Compliance Report',
    frequency: 'Monthly',
    nextRun: '2024-05-31 00:00:00',
    recipients: ['shariah-board@nimms.gov.ng', 'compliance@nimms.gov.ng'],
    format: 'PDF',
    active: false
  }
];

export const mockSavedReports = [
  {
    id: 'saved-1',
    name: 'Q1 2024 Performance Dashboard',
    description: 'Quarterly performance dashboard for Q1 2024',
    createdAt: '2024-04-02 14:30:00',
    createdBy: 'Ahmed Ibrahim',
    format: 'PDF',
    size: '1.2 MB'
  },
  {
    id: 'saved-2',
    name: 'March 2024 Disbursement Analysis',
    description: 'Analysis of all disbursements made in March 2024',
    createdAt: '2024-04-05 10:15:00',
    createdBy: 'Fatima Mohammed',
    format: 'Excel',
    size: '3.5 MB'
  },
  {
    id: 'saved-3',
    name: 'High-Risk Customer Segment Analysis',
    description: 'Analysis of high-risk customer segments and mitigation strategies',
    createdAt: '2024-04-12 16:45:00',
    createdBy: 'Ibrahim Hassan',
    format: 'PDF',
    size: '2.8 MB'
  },
  {
    id: 'saved-4',
    name: 'Product Performance - Diminishing Musharakah',
    description: 'Performance metrics for the Diminishing Musharakah product',
    createdAt: '2024-04-18 11:20:00',
    createdBy: 'Zainab Yusuf',
    format: 'Excel',
    size: '4.1 MB'
  },
  {
    id: 'saved-5',
    name: 'Delinquency Trend Analysis - Q1 2024',
    description: 'Analysis of delinquency trends in Q1 2024 with recommendations',
    createdAt: '2024-04-22 09:30:00',
    createdBy: 'Usman Bello',
    format: 'PDF',
    size: '1.9 MB'
  }
];
