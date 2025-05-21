
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { KeyRound, AlertCircle, ShieldCheck, Shield, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

interface AccessPolicy {
  id: string;
  name: string;
  description: string;
  resource: string;
  enabled: boolean;
  restrictionType: 'ip' | 'time' | 'location' | 'device' | 'mfa';
  restriction: string;
}

const mockPolicies: AccessPolicy[] = [
  { 
    id: '1', 
    name: 'Admin IP Restriction', 
    description: 'Restricts admin access to specific IP addresses',
    resource: 'Administration',
    enabled: true,
    restrictionType: 'ip',
    restriction: '192.168.1.0/24,10.0.0.1'
  },
  { 
    id: '2', 
    name: 'Finance Working Hours', 
    description: 'Restricts finance transactions to business hours',
    resource: 'Finance',
    enabled: true,
    restrictionType: 'time',
    restriction: '09:00-17:00,Mon-Fri'
  },
  { 
    id: '3', 
    name: 'MFA for Sensitive Operations', 
    description: 'Requires MFA for approving mortgages',
    resource: 'Mortgages',
    enabled: false,
    restrictionType: 'mfa',
    restriction: 'required'
  },
  { 
    id: '4', 
    name: 'Device Restriction', 
    description: 'Restricts access to registered devices',
    resource: 'Users',
    enabled: true,
    restrictionType: 'device',
    restriction: 'registered_only'
  },
  { 
    id: '5', 
    name: 'Location Access', 
    description: 'Restricts access based on geolocation',
    resource: 'Mortgages',
    enabled: false,
    restrictionType: 'location',
    restriction: 'NG,GH'
  },
];

const AccessControl: React.FC = () => {
  const [policies, setPolicies] = useState<AccessPolicy[]>(mockPolicies);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPolicies = policies.filter(policy =>
    policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    policy.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleTogglePolicy = (id: string) => {
    const updatedPolicies = policies.map(policy =>
      policy.id === id ? { ...policy, enabled: !policy.enabled } : policy
    );
    setPolicies(updatedPolicies);
    
    const policy = policies.find(p => p.id === id);
    const newStatus = !policy?.enabled;
    
    if (policy) {
      toast.success(newStatus 
        ? `Enabled ${policy.name} policy` 
        : `Disabled ${policy.name} policy`
      );
    }
  };

  return (
    <div>
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Access Control Settings</AlertTitle>
        <AlertDescription>
          These policies control system access based on various security factors. Changes to these policies will affect user access.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button>
          <Shield className="mr-2 h-4 w-4" /> Add Policy
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
            Security Controls
          </CardTitle>
          <CardDescription>
            Configure system-wide security settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Enforce MFA</h4>
                <p className="text-sm text-muted-foreground">Requires multi-factor authentication for all users</p>
              </div>
              <Switch checked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Password Policy</h4>
                <p className="text-sm text-muted-foreground">Enforce strong password requirements</p>
              </div>
              <Select defaultValue="strict">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="strict">Strict</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Session Timeout</h4>
                <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">IP Filtering</h4>
                <p className="text-sm text-muted-foreground">Restrict access to specific IP addresses</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Restriction Type</TableHead>
              <TableHead>Restriction</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPolicies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <KeyRound className="h-4 w-4 mr-2 text-muted-foreground" />
                    {policy.name}
                  </div>
                </TableCell>
                <TableCell>{policy.description}</TableCell>
                <TableCell>{policy.resource}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {policy.restrictionType.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <code className="rounded bg-muted px-2 py-1 text-xs">
                    {policy.restriction}
                  </code>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <Switch 
                      checked={policy.enabled}
                      onCheckedChange={() => handleTogglePolicy(policy.id)}
                    />
                    <span className="ml-2 text-xs">
                      {policy.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <UserCheck className="h-4 w-4 mr-2 text-muted-foreground" />
          Audit Log Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Audit Logging</h4>
              <p className="text-sm text-muted-foreground">Track all user actions in the system</p>
            </div>
            <Switch checked={true} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Log Retention</h4>
              <p className="text-sm text-muted-foreground">How long to keep audit logs</p>
            </div>
            <Select defaultValue="90">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">6 months</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Log Detail Level</h4>
              <p className="text-sm text-muted-foreground">Amount of detail to include in logs</p>
            </div>
            <Select defaultValue="detailed">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
