
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, X, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface PendingUser {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  organization: string;
  registeredAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockPendingUsers: PendingUser[] = [
  { 
    id: '1', 
    name: 'Ibrahim Mohammed', 
    email: 'ibrahim.m@fmbn.gov.ng', 
    employeeId: 'FMBN-1001', 
    organization: 'Head Office', 
    registeredAt: '2023-05-15T10:30:00Z',
    status: 'pending'
  },
  { 
    id: '2', 
    name: 'Amina Yusuf', 
    email: 'amina.y@fmbn.gov.ng', 
    employeeId: 'FMBN-1245', 
    organization: 'Lagos Branch', 
    registeredAt: '2023-05-14T14:20:00Z',
    status: 'pending'
  },
  { 
    id: '3', 
    name: 'Joseph Okafor', 
    email: 'joseph.o@fmbn.gov.ng', 
    employeeId: 'FMBN-1562', 
    organization: 'Operations', 
    registeredAt: '2023-05-13T09:15:00Z',
    status: 'approved'
  },
  { 
    id: '4', 
    name: 'Fatima Abubakar', 
    email: 'fatima.a@fmbn.gov.ng', 
    employeeId: 'FMBN-1782', 
    organization: 'Finance', 
    registeredAt: '2023-05-12T16:45:00Z',
    status: 'rejected'
  }
];

const UserVerification = () => {
  const [users, setUsers] = useState<PendingUser[]>(mockPendingUsers);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [assignedRoles, setAssignedRoles] = useState<string[]>([]);
  
  const handleViewUser = (user: PendingUser) => {
    setSelectedUser(user);
    setAssignedRoles(user.status === 'approved' ? ['user'] : []);
    setIsUserDetailsOpen(true);
  };
  
  const handleApproveUser = () => {
    if (!selectedUser || assignedRoles.length === 0) {
      toast.error('Please assign at least one role before approving');
      return;
    }
    
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, status: 'approved' } : user
    ));
    
    toast.success(`User ${selectedUser.name} has been approved and notified`);
    setIsUserDetailsOpen(false);
  };
  
  const handleRejectUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, status: 'rejected' } : user
    ));
    
    toast.success(`User ${selectedUser.name} has been rejected`);
    setIsUserDetailsOpen(false);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Verification</CardTitle>
        <CardDescription>
          Verify and approve new user registrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.employeeId}</TableCell>
                <TableCell>{user.organization}</TableCell>
                <TableCell>{formatDate(user.registeredAt)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(user.status) as any}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Verification</DialogTitle>
              <DialogDescription>
                Review user details and approve or reject registration
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <div className="mt-1 text-sm font-medium">{selectedUser.name}</div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div className="mt-1 text-sm font-medium">{selectedUser.email}</div>
                  </div>
                  <div>
                    <Label>Employee ID</Label>
                    <div className="mt-1 text-sm font-medium">{selectedUser.employeeId}</div>
                  </div>
                  <div>
                    <Label>Organization</Label>
                    <div className="mt-1 text-sm font-medium">{selectedUser.organization}</div>
                  </div>
                </div>
                
                <div>
                  <Label>Registration Date</Label>
                  <div className="mt-1 text-sm font-medium">{formatDate(selectedUser.registeredAt)}</div>
                </div>
                
                {selectedUser.status === 'pending' && (
                  <div>
                    <Label className="mb-2 block">Assign Roles</Label>
                    <div className="space-y-2">
                      {['user', 'manager', 'admin'].map((role) => (
                        <div key={role} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`role-${role}`} 
                            checked={assignedRoles.includes(role)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setAssignedRoles([...assignedRoles, role]);
                              } else {
                                setAssignedRoles(assignedRoles.filter(r => r !== role));
                              }
                            }}
                          />
                          <Label htmlFor={`role-${role}`} className="capitalize">{role}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedUser.status === 'pending' ? (
                  <DialogFooter className="flex justify-between sm:justify-between">
                    <Button type="button" variant="destructive" onClick={handleRejectUser}>
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button type="button" onClick={handleApproveUser}>
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </DialogFooter>
                ) : (
                  <DialogFooter>
                    <Button type="button" onClick={() => setIsUserDetailsOpen(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserVerification;
