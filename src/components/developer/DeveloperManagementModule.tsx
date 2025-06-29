
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building, 
  Target, 
  CreditCard, 
  Plus,
  Search,
  Filter,
  Download
} from 'lucide-react';
import PartnerDirectory from './PartnerDirectory';
import PartnerOnboarding from './PartnerOnboarding';
import MilestoneTracking from './MilestoneTracking';
import DisbursementTracking from './DisbursementTracking';
import PerformanceScoring from './PerformanceScoring';

const DeveloperManagementModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const stats = [
    {
      title: 'Active Partners',
      value: '48',
      change: '+12%',
      icon: <Users className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'Ongoing Projects',
      value: '156',
      change: '+8%',
      icon: <Building className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      title: 'Pending Milestones',
      value: '23',
      change: '-5%',
      icon: <Target className="h-5 w-5" />,
      color: 'text-orange-600'
    },
    {
      title: 'Pending Disbursements',
      value: '₦2.4B',
      change: '+15%',
      icon: <CreditCard className="h-5 w-5" />,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Developer & Partner Management</h1>
          <p className="text-muted-foreground">Manage partners, track projects, and monitor performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className={`${stat.color} bg-opacity-10 p-3 rounded-full`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search partners, projects, or milestones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="directory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="directory">Partner Directory</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6">
          <PartnerDirectory searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-6">
          <PartnerOnboarding />
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <MilestoneTracking searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="disbursements" className="space-y-6">
          <DisbursementTracking searchTerm={searchTerm} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceScoring searchTerm={searchTerm} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperManagementModule;
