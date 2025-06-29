
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building, 
  MapPin, 
  Award, 
  TrendingUp,
  Search,
  Plus,
  Filter
} from 'lucide-react';
import { Partner, PartnerType, PartnerStatus } from '@/types/partner';

const mockPartners: Partner[] = [
  {
    id: 'DEV001',
    name: 'Sunset Developers Ltd.',
    type: 'developer',
    status: 'active',
    registrationDate: '2023-01-15',
    email: 'contact@sunsetdev.com',
    phone: '+234-801-234-5678',
    address: 'Plot 123, Victoria Island, Lagos',
    contactPerson: 'Mr. Adebayo Johnson',
    performanceScore: 92,
    performanceRating: 'excellent',
    activeProjects: 8,
    completedProjects: 24,
    documents: [],
    certifications: []
  },
  {
    id: 'SUR002',
    name: 'Precision Surveyors',
    type: 'surveyor',
    status: 'active',
    registrationDate: '2023-03-20',
    email: 'info@precisionsur.com',
    phone: '+234-802-345-6789',
    address: '45 Independence Way, Kaduna',
    contactPerson: 'Engr. Fatima Hassan',
    performanceScore: 88,
    performanceRating: 'good',
    activeProjects: 12,
    completedProjects: 56,
    documents: [],
    certifications: []
  },
  {
    id: 'VAL003',
    name: 'Elite Property Valuers',
    type: 'valuer',
    status: 'active',
    registrationDate: '2023-02-10',
    email: 'valuations@eliteprop.com',
    phone: '+234-803-456-7890',
    address: '78 Wuse II, Abuja',
    contactPerson: 'Dr. Chinedu Okafor',
    performanceScore: 85,
    performanceRating: 'good',
    activeProjects: 6,
    completedProjects: 18,
    documents: [],
    certifications: []
  }
];

const PartnerManagementModule: React.FC = () => {
  const [selectedPartnerType, setSelectedPartnerType] = useState<PartnerType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [partners] = useState<Partner[]>(mockPartners);

  const filteredPartners = partners.filter(partner => {
    const matchesType = selectedPartnerType === 'all' || partner.type === selectedPartnerType;
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: PartnerStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-700 border-red-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'satisfactory': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partner Management</h1>
          <p className="text-muted-foreground">Manage developers, surveyors, valuers and other partners</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Partner
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Total Partners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">142</p>
                <p className="text-sm text-muted-foreground">Active Partners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">246</p>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="directory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="directory">Partner Directory</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding Queue</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="projects">Project Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search partners..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedPartnerType === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedPartnerType('all')}
                    size="sm"
                  >
                    All Partners
                  </Button>
                  <Button
                    variant={selectedPartnerType === 'developer' ? 'default' : 'outline'}
                    onClick={() => setSelectedPartnerType('developer')}
                    size="sm"
                  >
                    Developers
                  </Button>
                  <Button
                    variant={selectedPartnerType === 'surveyor' ? 'default' : 'outline'}
                    onClick={() => setSelectedPartnerType('surveyor')}
                    size="sm"
                  >
                    Surveyors
                  </Button>
                  <Button
                    variant={selectedPartnerType === 'valuer' ? 'default' : 'outline'}
                    onClick={() => setSelectedPartnerType('valuer')}
                    size="sm"
                  >
                    Valuers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partner List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{partner.contactPerson}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {partner.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">#{partner.id}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate">{partner.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Performance: </span>
                        <span className={`font-medium ${getRatingColor(partner.performanceRating)}`}>
                          {partner.performanceScore}% ({partner.performanceRating})
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-lg font-semibold">{partner.activeProjects}</p>
                        <p className="text-xs text-muted-foreground">Active Projects</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">{partner.completedProjects}</p>
                        <p className="text-xs text-muted-foreground">Completed</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="onboarding">
          <Card>
            <CardHeader>
              <CardTitle>Partner Onboarding Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Onboarding workflow component will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Partner Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Performance scoring and analytics will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestone Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Project milestone tracking component will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnerManagementModule;
