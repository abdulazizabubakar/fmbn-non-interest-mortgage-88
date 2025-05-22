
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MessageSquare, User, Clock } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: 'open' | 'in_progress' | 'escalated' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responseCount: number;
}

const SupportTickets = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [ticketFormData, setTicketFormData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });
  
  // Mock ticket data - in a real app, this would come from an API
  const tickets: Ticket[] = [
    {
      id: 'T-12345',
      subject: 'Issue with payment receipt',
      description: 'I made a payment last week but haven\'t received a receipt yet.',
      category: 'payment',
      status: 'in_progress',
      priority: 'medium',
      createdAt: '2025-05-10T14:30:00',
      updatedAt: '2025-05-12T09:15:00',
      assignedTo: 'Support Agent',
      responseCount: 2
    },
    {
      id: 'T-12346',
      subject: 'Need to update personal information',
      description: 'I recently changed my phone number and need to update it in the system.',
      category: 'account',
      status: 'open',
      priority: 'low',
      createdAt: '2025-05-15T11:20:00',
      updatedAt: '2025-05-15T11:20:00',
      responseCount: 0
    },
    {
      id: 'T-12340',
      subject: 'Question about ownership transfer',
      description: 'I want to know the process for transferring ownership after final payment.',
      category: 'ownership',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2025-04-28T15:45:00',
      updatedAt: '2025-05-03T10:30:00',
      assignedTo: 'Legal Officer',
      responseCount: 3
    },
    {
      id: 'T-12339',
      subject: 'Property maintenance request',
      description: 'There is a leak in the bathroom that needs urgent attention.',
      category: 'property',
      status: 'closed',
      priority: 'high',
      createdAt: '2025-04-20T09:30:00',
      updatedAt: '2025-04-25T16:20:00',
      assignedTo: 'Maintenance Supervisor',
      responseCount: 5
    }
  ];
  
  // Filter tickets based on active tab
  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'active') {
      return ['open', 'in_progress', 'escalated'].includes(ticket.status);
    } else if (activeTab === 'resolved') {
      return ['resolved', 'closed'].includes(ticket.status);
    }
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
      case 'escalated':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Escalated</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setTicketFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmitTicket = () => {
    // In a real app, this would submit the ticket to an API
    console.log('Submitting ticket:', ticketFormData);
    setNewTicketOpen(false);
    
    // Reset form
    setTicketFormData({
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    });
    
    // Show success message (in a real app, use a toast)
    alert('Ticket submitted successfully!');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                Request assistance and track your support tickets
              </CardDescription>
            </div>
            <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create Support Ticket</DialogTitle>
                  <DialogDescription>
                    Fill out the form to submit a new support ticket
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={ticketFormData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <Select
                        value={ticketFormData.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payment">Payment</SelectItem>
                          <SelectItem value="account">Account</SelectItem>
                          <SelectItem value="property">Property</SelectItem>
                          <SelectItem value="ownership">Ownership</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium mb-1">
                        Priority
                      </label>
                      <Select
                        value={ticketFormData.priority}
                        onValueChange={(value) => handleSelectChange('priority', value)}
                      >
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={ticketFormData.description}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your issue"
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setNewTicketOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleSubmitTicket}>
                    Submit Ticket
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active Tickets</TabsTrigger>
              <TabsTrigger value="resolved">Resolved Tickets</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{ticket.subject}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" /> 
                          {ticket.responseCount} response(s)
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{ticket.category}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredTickets.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No tickets found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Support Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Alternative ways to reach our customer support team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-muted p-3 rounded-full mr-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Chat Support</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Available Monday to Friday, 8am - 5pm
                </p>
                <Button variant="link" className="p-0 h-auto text-sm mt-1">
                  Start Chat
                </Button>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-muted p-3 rounded-full mr-3">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Customer Service</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Call us at 0800-FMBN-123
                </p>
                <p className="text-sm text-muted-foreground">
                  Email: support@fmbn.gov.ng
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-muted p-3 rounded-full mr-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">Visit Us</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  FMBN Headquarters, Central Business District, Abuja
                </p>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 8:00am - 4:00pm
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTickets;
