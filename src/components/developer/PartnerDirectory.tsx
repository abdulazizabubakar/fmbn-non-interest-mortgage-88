
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';
import { mockPartners } from '@/data/mockDeveloperData';
import { Partner, PartnerType } from '@/types/developer';

interface PartnerDirectoryProps {
  searchTerm: string;
}

const PartnerDirectory: React.FC<PartnerDirectoryProps> = ({ searchTerm }) => {
  const [partners] = useState<Partner[]>(mockPartners);
  const [selectedType, setSelectedType] = useState<PartnerType | 'all'>('all');

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getPartnerTypeColor = (type: PartnerType) => {
    switch (type) {
      case 'developer': return 'bg-blue-100 text-blue-800';
      case 'surveyor': return 'bg-green-100 text-green-800';
      case 'valuer': return 'bg-purple-100 text-purple-800';
      case 'contractor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'blacklisted': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto">
        {['all', 'developer', 'surveyor', 'valuer', 'contractor'].map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(type as PartnerType | 'all')}
            className="capitalize whitespace-nowrap"
          >
            {type === 'all' ? 'All Partners' : `${type}s`}
          </Button>
        ))}
      </div>

      {/* Partners Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner) => (
          <Card key={partner.id} className="glass-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {partner.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getPartnerTypeColor(partner.type)}>
                        {partner.type}
                      </Badge>
                      <Badge className={getStatusColor(partner.status)}>
                        {partner.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{partner.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{partner.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{partner.address}</span>
                </div>
              </div>

              {/* Performance */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{partner.performanceScore}</span>
                  <span className="text-sm text-muted-foreground">score</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {partner.completedProjects}/{partner.totalProjects} projects
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <Card className="glass-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No partners found</h3>
            <p className="text-muted-foreground text-center">
              No partners match your search criteria. Try adjusting your filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PartnerDirectory;
