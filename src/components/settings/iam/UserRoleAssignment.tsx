
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { User, Role } from '@/types/user';
import { toast } from 'sonner';
import { Plus, Search, UserPlus, Shield, Globe, Map } from 'lucide-react';

// Mock users data
const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@fmbn.gov.ng', 
    roles: ['admin'], 
    scope: 'global',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane.smith@fmbn.gov.ng', 
    roles: ['application_officer'], 
    scope: 'zonal',
    region: 'North Central',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Ahmed Ibrahim', 
    email: 'ahmed.ibrahim@fmbn.gov.ng', 
    roles: ['finance_officer', 'auditor'], 
    scope: 'global',
    status: 'active'
  },
  { 
    id: '4', 
    name: 'Fatima Hassan', 
    email: 'fatima.hassan@fmbn.gov.ng', 
    roles: ['shariah_reviewer'], 
    scope: 'global',
    status: 'active'
  },
  { 
    id: '5', 
    name: 'Michael Obi', 
    email: 'michael.obi@fmbn.gov.ng', 
    roles: ['zonal_admin'], 
    scope: 'zonal',
    region: 'South West',
    status: 'active'
  },
];

// Get roles from previous component
const mockRoles: Role[] = [
  { id: '1', name: 'Super Admin', description: 'Has complete access to all system features', isSystemRole: true, permissions: [] },
  { id: '2', name: 'Admin', description: 'Can manage users and most system settings', isSystemRole: true, permissions: [] },
  { id: '3', name: 'Application Officer', description: 'Processes mortgage applications', isSystemRole: false, permissions: [] },
  { id: '4', name: 'Legal Officer', description: 'Reviews legal aspects of applications', isSystemRole: false, permissions: [] },
  { id: '5', name: 'Finance Officer', description: 'Manages financial transactions', isSystemRole: false, permissions: [] },
  { id: '6', name: 'Zonal Admin', description: 'Manages operations for a specific zone', isSystemRole: false, permissions: [] },
  { id: '7', name: 'Shariah Reviewer', description: 'Ensures Islamic finance compliance', isSystemRole: false, permissions: [] },
];

const regions = [
  'North Central',
  'North East',
  'North West',
  'South East',
  'South South',
  'South West',
  'Federal Capital Territory'
];

const UserRoleAssignment: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedScope, setSelectedScope] = useState<'global' | 'zonal' | 'self'>('global');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openUserDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setSelectedRoles(user.roles);
      setSelectedScope(user.scope);
      setSelectedRegion(user.region || '');
    } else {
      setSelectedUser(null);
      setSelectedRoles([]);
      setSelectedScope('global');
      setSelectedRegion('');
    }
    setIsDialogOpen(true);
  };

  const handleRoleToggle = (roleId: string) => {
    // Convert from role name to role ID for this example
    const role = mockRoles.find(r => r.id === roleId)?.name.toLowerCase().replace(' ', '_') as string;
    
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === selectedUser.id ? {
          ...user,
          roles: selectedRoles,
          scope: selectedScope,
          region: selectedScope === 'zonal' ? selectedRegion : undefined
        } : user
      ));
      toast.success(`User ${selectedUser.name} roles updated successfully`);
    } else {
      // This would normally handle creating a new user
      toast.success('New user created successfully');
    }
    
    setIsDialogOpen(false);
  };

  const getScopeDisplay = (scope: string, region?: string) => {
    switch (scope) {
      case 'global':
        return (
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-1 text-blue-500" />
            <span>Global</span>
          </div>
        );
      case 'zonal':
        return (
          <div className="flex items-center">
            <Map className="h-4 w-4 mr-1 text-green-500" />
            <span>{region || 'Zonal'}</span>
          </div>
        );
      case 'self':
        return 'Self Only';
      default:
        return scope;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>User Role Assignment</CardTitle>
        <CardDescription>
          Assign roles and access scopes to users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => openUserDialog()}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Access Scope</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {user.roles.map((role, index) => (
                        <Badge key={index} variant="outline" className="capitalize">
                          {role.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getScopeDisplay(user.scope, user.region)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => openUserDialog(user)}>
                      Edit Roles
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? `Edit Roles for ${selectedUser.name}` : 'Add New User'}
              </DialogTitle>
              <DialogDescription>
                {selectedUser 
                  ? 'Modify user roles and access scope' 
                  : 'Create a new user and assign roles'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {!selectedUser && (
                <>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <Input placeholder="John Doe" className="mt-1" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="john.doe@fmbn.gov.ng" className="mt-1" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Employee ID</label>
                      <Input placeholder="FMBN-1234" className="mt-1" />
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <label className="text-sm font-medium">Assigned Roles</label>
                <div className="mt-3 space-y-2 max-h-[200px] overflow-y-auto border rounded-md p-3">
                  {mockRoles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`role-${role.id}`}
                        checked={selectedRoles.includes(role.name.toLowerCase().replace(' ', '_'))}
                        onCheckedChange={() => handleRoleToggle(role.id)}
                      />
                      <div>
                        <label 
                          htmlFor={`role-${role.id}`} 
                          className="text-sm font-medium flex items-center cursor-pointer"
                        >
                          <Shield className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                          {role.name}
                        </label>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Access Scope</label>
                <Select 
                  value={selectedScope}
                  onValueChange={(value) => setSelectedScope(value as 'global' | 'zonal' | 'self')}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global (All regions)</SelectItem>
                    <SelectItem value="zonal">Zonal (Specific region)</SelectItem>
                    <SelectItem value="self">Self (Personal records only)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedScope === 'zonal' && (
                <div>
                  <label className="text-sm font-medium">Region</label>
                  <Select 
                    value={selectedRegion}
                    onValueChange={setSelectedRegion}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button onClick={handleSaveUser}>
                {selectedUser ? 'Update User' : 'Create User'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserRoleAssignment;
