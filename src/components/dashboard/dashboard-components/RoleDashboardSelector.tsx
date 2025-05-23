
import React from 'react';
import { 
  Card, 
  CardContent,
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { UserRole } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';

interface RoleDashboardSelectorProps {
  activeRole: UserRole | null;
  activeRegion: string;
  hideControls?: boolean;
  onRoleChange: (role: UserRole) => void;
  onRegionChange: (region: string) => void;
}

const roleConfig: Record<string, { title: string; description: string }> = {
  admin: {
    title: "Admin Dashboard",
    description: "System-wide overview of all metrics and KPIs"
  },
  super_admin: {
    title: "Super Admin Dashboard",
    description: "Complete system oversight with advanced controls"
  },
  finance_officer: {
    title: "Finance Dashboard",
    description: "Financial metrics, collections, and disbursements"
  },
  legal_officer: {
    title: "Legal Dashboard",
    description: "Contract status, transfers, and compliance metrics"
  },
  zonal_admin: {
    title: "Zonal Officer Dashboard",
    description: "Regional performance and metrics"
  },
  developer: {
    title: "Developer Dashboard",
    description: "Property submissions and development metrics"
  },
  lessee: {
    title: "Customer Dashboard",
    description: "Your lease progress and payment information"
  },
  treasury_officer: {
    title: "Treasury Dashboard",
    description: "Cash flow, investments and financial reporting"
  },
  shariah_reviewer: {
    title: "Shariah Compliance Dashboard",
    description: "Compliance metrics and review status"
  },
  // Add more role configurations as needed
};

const regions = [
  'All Regions',
  'North Central',
  'North East',
  'North West',
  'South East',
  'South South',
  'South West',
  'Federal Capital Territory'
];

const RoleDashboardSelector: React.FC<RoleDashboardSelectorProps> = ({
  activeRole,
  activeRegion,
  hideControls = false,
  onRoleChange,
  onRegionChange
}) => {
  const { user, hasRole } = useAuth();
  
  // Map user roles to selectable options
  const availableRoles: UserRole[] = [
    'admin',
    'super_admin',
    'finance_officer',
    'legal_officer',
    'zonal_admin',
    'developer',
    'lessee',
    'treasury_officer',
    'shariah_reviewer',
  ].filter(role => {
    // For non-admin users, only show their role
    if (!hasRole('admin') && !hasRole('super_admin')) {
      return user?.roles?.includes(role as UserRole);
    }
    return true;
  }) as UserRole[];
  
  // Get the active dashboard config
  const activeDashboardConfig = activeRole ? roleConfig[activeRole] : null;
  
  // Handle case where no role is selected
  const dashboardTitle = activeDashboardConfig?.title || "Dashboard";
  const dashboardDescription = activeDashboardConfig?.description || "Select a role to view role-specific dashboard";

  // Determine if region selector should be visible (only for zonal admins or when all regions view is enabled)
  const showRegionSelector = activeRole === 'zonal_admin' || (hasRole('admin') || hasRole('super_admin'));
  
  // Create content based on if we're showing controls
  if (hideControls) {
    // When hideControls is true, we just need to display the active dashboard component
    return (
      <LoadDashboardByRole 
        role={activeRole} 
        region={activeRegion} 
        title={dashboardTitle} 
        description={dashboardDescription} 
      />
    );
  }
  
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4 justify-between items-end">
          <div>
            <h3 className="font-semibold text-lg mb-1">{dashboardTitle}</h3>
            <p className="text-sm text-muted-foreground">{dashboardDescription}</p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            {availableRoles.length > 1 && (
              <div>
                <label className="block text-sm font-medium mb-1">Dashboard View</label>
                <Select
                  value={activeRole || undefined}
                  onValueChange={(value) => onRoleChange(value as UserRole)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map(role => (
                      <SelectItem key={role} value={role}>
                        {role.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {showRegionSelector && (
              <div>
                <label className="block text-sm font-medium mb-1">Region Filter</label>
                <Select
                  value={activeRegion}
                  onValueChange={onRegionChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// This component will dynamically load the appropriate dashboard based on role
const LoadDashboardByRole = ({ 
  role, 
  region, 
  title, 
  description 
}: { 
  role: UserRole | null; 
  region: string;
  title: string;
  description: string;
}) => {
  // This component will later dynamically import the appropriate dashboard
  // based on the role. For now, it's just a placeholder.
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="mt-4">Region: {region}</p>
        
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed mt-4">
          <p className="text-muted-foreground">
            {role ? `${role} dashboard content will be loaded here` : "Please select a role to load dashboard"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleDashboardSelector;
