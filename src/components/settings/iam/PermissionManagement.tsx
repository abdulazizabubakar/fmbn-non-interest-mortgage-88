
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Lock, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

// Types
interface Permission {
  id: string;
  name: string;
  code: string;
  module: string;
  description: string;
}

interface PermissionGroup {
  module: string;
  permissions: Permission[];
}

interface RolePermission {
  roleId: string;
  roleName: string;
  permissions: string[]; // permission ids
}

// Mock data
const mockPermissions: Permission[] = [
  { id: '1', name: 'View Dashboard', code: 'dashboard:view', module: 'Dashboard', description: 'Can view the main dashboard' },
  { id: '2', name: 'View Mortgages', code: 'mortgages:view', module: 'Mortgages', description: 'Can view mortgage details' },
  { id: '3', name: 'Create Mortgage', code: 'mortgages:create', module: 'Mortgages', description: 'Can create new mortgage applications' },
  { id: '4', name: 'Approve Mortgage', code: 'mortgages:approve', module: 'Mortgages', description: 'Can approve mortgage applications' },
  { id: '5', name: 'Reject Mortgage', code: 'mortgages:reject', module: 'Mortgages', description: 'Can reject mortgage applications' },
  { id: '6', name: 'View Customers', code: 'customers:view', module: 'Customers', description: 'Can view customer details' },
  { id: '7', name: 'Create Customer', code: 'customers:create', module: 'Customers', description: 'Can create new customers' },
  { id: '8', name: 'Edit Customer', code: 'customers:edit', module: 'Customers', description: 'Can edit customer information' },
  { id: '9', name: 'View Disbursements', code: 'finance:view-disbursements', module: 'Finance', description: 'Can view disbursement records' },
  { id: '10', name: 'Create Disbursement', code: 'finance:create-disbursement', module: 'Finance', description: 'Can create disbursements' },
  { id: '11', name: 'View Repayments', code: 'finance:view-repayments', module: 'Finance', description: 'Can view repayment records' },
  { id: '12', name: 'Process Repayment', code: 'finance:process-repayment', module: 'Finance', description: 'Can process repayments' },
  { id: '13', name: 'View Users', code: 'users:view', module: 'Administration', description: 'Can view system users' },
  { id: '14', name: 'Create User', code: 'users:create', module: 'Administration', description: 'Can create new system users' },
  { id: '15', name: 'Edit User', code: 'users:edit', module: 'Administration', description: 'Can edit user information' },
  { id: '16', name: 'Delete User', code: 'users:delete', module: 'Administration', description: 'Can delete system users' },
  { id: '17', name: 'Manage Roles', code: 'roles:manage', module: 'Administration', description: 'Can manage system roles' },
  { id: '18', name: 'Manage Settings', code: 'settings:manage', module: 'Administration', description: 'Can manage system settings' },
];

const mockRoles = [
  { id: '1', name: 'Super Admin' },
  { id: '2', name: 'Admin' },
  { id: '3', name: 'Manager' },
  { id: '4', name: 'Finance Officer' },
  { id: '5', name: 'Customer Service' },
];

const mockRolePermissions: RolePermission[] = [
  { 
    roleId: '1', 
    roleName: 'Super Admin', 
    permissions: mockPermissions.map(p => p.id) // Super Admin has all permissions
  },
  { 
    roleId: '2', 
    roleName: 'Admin', 
    permissions: ['1', '2', '3', '4', '5', '6', '7', '8', '13', '14', '15', '18'] 
  },
  { 
    roleId: '3', 
    roleName: 'Manager', 
    permissions: ['1', '2', '3', '4', '5', '6', '7', '8'] 
  },
  { 
    roleId: '4', 
    roleName: 'Finance Officer', 
    permissions: ['1', '2', '9', '10', '11', '12'] 
  },
  { 
    roleId: '5', 
    roleName: 'Customer Service', 
    permissions: ['1', '2', '6'] 
  },
];

const PermissionManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('1'); // Default to Super Admin
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(mockRolePermissions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Group permissions by module
  const groupedPermissions = mockPermissions.reduce((acc, permission) => {
    const existingGroup = acc.find(g => g.module === permission.module);
    
    if (existingGroup) {
      existingGroup.permissions.push(permission);
    } else {
      acc.push({
        module: permission.module,
        permissions: [permission]
      });
    }
    
    return acc;
  }, [] as PermissionGroup[]);
  
  // Filter grouped permissions by search term
  const filteredGroups = searchTerm 
    ? groupedPermissions.map(group => ({
        module: group.module,
        permissions: group.permissions.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(group => group.permissions.length > 0)
    : groupedPermissions;
    
  // Get current role permissions
  const currentRolePermission = rolePermissions.find(rp => rp.roleId === selectedRole);
  
  const handleTogglePermission = (permissionId: string) => {
    const updatedRolePermissions = rolePermissions.map(rp => {
      if (rp.roleId === selectedRole) {
        // Check if permission already exists
        if (rp.permissions.includes(permissionId)) {
          // Remove permission
          return {
            ...rp,
            permissions: rp.permissions.filter(id => id !== permissionId)
          };
        } else {
          // Add permission
          return {
            ...rp,
            permissions: [...rp.permissions, permissionId]
          };
        }
      }
      return rp;
    });
    
    setRolePermissions(updatedRolePermissions);
    
    // Get the permission and role names for the toast message
    const permission = mockPermissions.find(p => p.id === permissionId);
    const role = mockRoles.find(r => r.id === selectedRole);
    
    const isAdding = updatedRolePermissions.find(rp => rp.roleId === selectedRole)?.permissions.includes(permissionId);
    
    if (permission && role) {
      toast.success(
        isAdding 
          ? `Added "${permission.name}" permission to ${role.name} role` 
          : `Removed "${permission.name}" permission from ${role.name} role`
      );
    }
  };
  
  const handleSaveChanges = () => {
    toast.success("Permission changes saved successfully");
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            placeholder="Search permissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="text-sm mr-2">Select Role:</span>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {mockRoles.map(role => (
                  <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={() => setIsDialogOpen(true)}>
            <Lock className="mr-2 h-4 w-4" /> Manage Role Permissions
          </Button>
        </div>
      </div>

      {filteredGroups.map(group => (
        <div key={group.module} className="mb-8">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <KeyRound className="h-4 w-4 mr-2 text-muted-foreground" />
            {group.module}
            <Badge variant="outline" className="ml-2">
              {group.permissions.length} permissions
            </Badge>
          </h3>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">{permission.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-2 py-1 text-xs">
                        {permission.code}
                      </code>
                    </TableCell>
                    <TableCell>{permission.description}</TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={currentRolePermission?.permissions.includes(permission.id) || false}
                        onCheckedChange={() => handleTogglePermission(permission.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Role Permissions</DialogTitle>
            <DialogDescription>
              Configure which permissions are assigned to each role in the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Permission</TableHead>
                  {mockRoles.map(role => (
                    <TableHead key={role.id} className="text-center">{role.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPermissions.map(permission => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{permission.name}</div>
                        <div className="text-xs text-muted-foreground">{permission.module}</div>
                      </div>
                    </TableCell>
                    
                    {mockRoles.map(role => {
                      const rolePermission = rolePermissions.find(rp => rp.roleId === role.id);
                      const hasPermission = rolePermission?.permissions.includes(permission.id) || false;
                      
                      return (
                        <TableCell key={role.id} className="text-center">
                          <Switch 
                            checked={hasPermission}
                            onCheckedChange={() => {
                              const updatedRolePermissions = rolePermissions.map(rp => {
                                if (rp.roleId === role.id) {
                                  if (hasPermission) {
                                    // Remove permission
                                    return {
                                      ...rp,
                                      permissions: rp.permissions.filter(id => id !== permission.id)
                                    };
                                  } else {
                                    // Add permission
                                    return {
                                      ...rp,
                                      permissions: [...rp.permissions, permission.id]
                                    };
                                  }
                                }
                                return rp;
                              });
                              
                              setRolePermissions(updatedRolePermissions);
                            }}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <DialogFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionManagement;
