
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Home, DollarSign, Users } from 'lucide-react';

const PropertyStats = () => {
  const propertyStats = [
    { 
      title: "Total Properties", 
      value: 324, 
      icon: Building,
      color: "bg-blue-100 text-blue-600",
      change: "+12%"
    },
    { 
      title: "Available Units", 
      value: 87, 
      icon: Home,
      color: "bg-green-100 text-green-600",
      change: "-5%"
    },
    { 
      title: "Total Value", 
      value: "₦14.2B", 
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
      change: "+8%"
    },
    { 
      title: "Occupancy Rate", 
      value: "92%", 
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      change: "+3%"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {propertyStats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`rounded-full p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <Badge variant={stat.change.startsWith('+') ? 'default' : 'destructive'}>
                {stat.change}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyStats;
