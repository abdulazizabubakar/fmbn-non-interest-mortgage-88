
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  isSystemRole: boolean;
}

// Sample roles data
const mockRoles: Role[] = [
  { id: '1', name: 'Super Admin', description: 'Has complete access to all system features', users: 3, isSystemRole: true },
  { id: '2', name: 'Admin', description: 'Can manage users and most system settings', users: 5, isSystemRole: true },
  { id: '3', name: 'Manager', description: 'Can manage mortgages and applications', users: 12, isSystemRole: false },
  { id: '4', name: 'Finance Officer', description: 'Can manage financial transactions and records', users: 8, isSystemRole: false },
  { id: '5', name: 'Customer Service', description: 'Can view customer information and assist with inquiries', users: 15, isSystemRole: false },
];

const formSchema = z.object({
  name: z.string().min(3, { message: "Role name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteRole = (id: string) => {
    const roleToDelete = roles.find(role => role.id === id);
    
    if (roleToDelete?.isSystemRole) {
      toast.error("System roles cannot be deleted");
      return;
    }
    
    setRoles(roles.filter(role => role.id !== id));
    toast.success('Role deleted successfully');
  };

  const openAddDialog = () => {
    form.reset({ name: '', description: '' });
    setEditingRole(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    if (role.isSystemRole) {
      toast.error("System roles cannot be edited");
      return;
    }
    
    form.reset({ 
      name: role.name,
      description: role.description
    });
    setEditingRole(role);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: FormValues) => {
    if (editingRole) {
      // Update existing role
      const updatedRoles = roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, name: values.name, description: values.description }
          : role
      );
      setRoles(updatedRoles);
      toast.success("Role updated successfully");
    } else {
      // Add new role
      const newRole: Role = {
        id: (roles.length + 1).toString(),
        name: values.name,
        description: values.description,
        users: 0,
        isSystemRole: false
      };
      setRoles([...roles, newRole]);
      toast.success("New role added successfully");
    }
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                    {role.name}
                  </div>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.users}</TableCell>
                <TableCell>
                  <Badge variant={role.isSystemRole ? "secondary" : "default"}>
                    {role.isSystemRole ? "System" : "Custom"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(role)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteRole(role.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            <DialogDescription>
              {editingRole 
                ? 'Update the details of the existing role'
                : 'Create a new role for the system with specific permissions'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Credit Analyst" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the role and its responsibilities" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {editingRole ? 'Update Role' : 'Create Role'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
