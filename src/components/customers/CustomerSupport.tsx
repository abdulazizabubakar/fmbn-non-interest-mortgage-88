
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  MessageSquare,
  AlertTriangle,
  Clock,
  CheckCircle,
  FileText,
  Search,
  PlusCircle,
  RefreshCw,
  Users,
  Building,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';
import { Customer, CustomerComplaint } from '@/types/customer';
import { mockCustomerComplaints } from '@/data/mockCustomerData';

interface CustomerSupportProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerSupport: React.FC<CustomerSupportProps> = ({ 
  customers, 
  selectedCustomer,
  onSelectCustomer
}) => {
  const [complaints, setComplaints] = useState<CustomerComplaint[]>(mockCustomerComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<CustomerComplaint | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New complaint form state
  const [formData, setFormData] = useState({
    customerId: selectedCustomer?.id || '',
    category: 'payment',
    subject: '',
    description: '',
    priority: 'medium',
  });
  
  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerId || !formData.subject || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComplaint: CustomerComplaint = {
        id: `comp-${Math.floor(Math.random() * 100000)}`,
        customerId: formData.customerId,
        category: formData.category as 'payment' | 'property' | 'service' | 'contract' | 'other',
        subject: formData.subject,
        description: formData.description,
        priority: formData.priority as 'low' | 'medium' | 'high' | 'critical',
        status: 'open',
        createdAt: new Date().toISOString(),
        documents: []
      };
      
      setComplaints([newComplaint, ...complaints]);
      setIsSubmitting(false);
      setShowNewComplaint(false);
      
      // Reset form
      setFormData({
        customerId: selectedCustomer?.id || '',
        category: 'payment',
        subject: '',
        description: '',
        priority: 'medium',
      });
      
      toast.success("Complaint created successfully");
    }, 1500);
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Function to render priority badge
  const renderPriorityBadge = (priority: 'low' | 'medium' | 'high' | 'critical') => {
    switch(priority) {
      case 'low':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            Low
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            Medium
          </Badge>
        );
      case 'high':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200">
            High
          </Badge>
        );
      case 'critical':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            Critical
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-50 text-gray-700 border-gray-200">
            Unknown
          </Badge>
        );
    }
  };
  
  // Function to render status badge
  const renderStatusBadge = (status: 'open' | 'in_progress' | 'escalated' | 'resolved' | 'closed') => {
    switch(status) {
      case 'open':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Open
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> In Progress
          </Badge>
        );
      case 'escalated':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Escalated
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Resolved
          </Badge>
        );
      case 'closed':
        return (
          <Badge className="bg-gray-50 text-gray-700 border-gray-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Closed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-50 text-gray-700 border-gray-200">
            Unknown
          </Badge>
        );
    }
  };
  
  // Filter complaints based on search term
  const filteredComplaints = complaints.filter(complaint => {
    const customerName = customers.find(c => c.id === complaint.customerId)?.name || '';
    
    return (
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  return (
    <>
      {showNewComplaint ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" /> New Support Ticket
            </CardTitle>
            <CardDescription>
              Create a new support ticket or customer complaint
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="customerId">Customer</Label>
                <select
                  id="customerId"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} ({customer.customerNumber})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="payment">Payment Issue</option>
                    <option value="property">Property Maintenance</option>
                    <option value="service">Customer Service</option>
                    <option value="contract">Contract Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject"
                  placeholder="Brief description of the issue"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea 
                  id="description" 
                  name="description"
                  placeholder="Provide all relevant details about the issue..."
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="border rounded-md p-4 space-y-2">
                <Label>Supporting Documents (Optional)</Label>
                <div className="bg-muted/30 border border-dashed rounded-md flex flex-col items-center justify-center p-6">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag & drop files here or click to upload</p>
                  <Button type="button" variant="outline" size="sm">
                    Upload Documents
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, JPG, PNG (max 5MB)
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setShowNewComplaint(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : "Submit Support Ticket"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : selectedComplaint ? (
        <Card>
          <CardHeader className="relative pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Complaint #{selectedComplaint.id}
                </CardTitle>
                <CardDescription className="mt-1">
                  {selectedComplaint.subject}
                </CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                {renderStatusBadge(selectedComplaint.status)}
                {renderPriorityBadge(selectedComplaint.priority)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Customer</Label>
                <p className="mt-1 font-medium">
                  {customers.find(c => c.id === selectedComplaint.customerId)?.name || 'Unknown'}
                </p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Date Submitted</Label>
                <p className="mt-1">{formatDate(selectedComplaint.createdAt)}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Category</Label>
                <p className="mt-1 capitalize">{selectedComplaint.category}</p>
              </div>
              
              <div>
                <Label className="text-muted-foreground">Assigned To</Label>
                <p className="mt-1">{selectedComplaint.assignedTo || 'Unassigned'}</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-muted-foreground">Description</Label>
              <div className="mt-2 p-4 bg-muted/20 rounded-md whitespace-pre-wrap">
                {selectedComplaint.description}
              </div>
            </div>
            
            {selectedComplaint.documents && selectedComplaint.documents.length > 0 && (
              <>
                <Separator />
                
                <div>
                  <Label className="text-muted-foreground">Supporting Documents</Label>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedComplaint.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-2 border p-2 rounded-md">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">{doc.type} • {(doc.fileSize / 1024).toFixed(0)} KB</p>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="border rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <Label>Add Response</Label>
              </div>
              <Textarea 
                placeholder="Type your response here..."
                rows={3}
              />
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" /> Attach Files
                </Button>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" /> Send Response
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Issue Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Users className="h-4 w-4 mr-2" /> Assign Staff
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" /> Escalate Issue
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" /> Mark as Resolved
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={() => setSelectedComplaint(null)}>
              Back to List
            </Button>
            {selectedComplaint.status !== 'closed' && (
              <Button variant="default">
                <CheckCircle className="h-4 w-4 mr-2" /> Close Ticket
              </Button>
            )}
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Customer Support Cases
              </CardTitle>
              <Button onClick={() => setShowNewComplaint(true)}>
                <PlusCircle className="h-4 w-4 mr-2" /> New Support Case
              </Button>
            </div>
            <CardDescription>
              Manage customer complaints and support tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by customer name, subject or ticket ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Ticket ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell className="font-medium">{complaint.id}</TableCell>
                        <TableCell>
                          {customers.find(c => c.id === complaint.customerId)?.name || 'Unknown'}
                        </TableCell>
                        <TableCell>{complaint.subject}</TableCell>
                        <TableCell>{formatDate(complaint.createdAt)}</TableCell>
                        <TableCell>{renderStatusBadge(complaint.status)}</TableCell>
                        <TableCell>{renderPriorityBadge(complaint.priority)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedComplaint(complaint)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No support tickets found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default CustomerSupport;
