
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare,
  Mail,
  Phone,
  RefreshCw,
  Check,
  AlertTriangle,
  Send,
  Filter,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { Customer, CustomerCommunication } from '@/types/customer';
import { mockCustomerCommunications } from '@/data/mockCustomerData';

interface CustomerCommunicationProps {
  customer: Customer;
}

const CustomerCommunicationComponent: React.FC<CustomerCommunicationProps> = ({ customer }) => {
  const [communications, setCommunications] = useState<CustomerCommunication[]>(
    mockCustomerCommunications.filter(comm => comm.customerId === customer.id)
  );
  const [messageType, setMessageType] = useState<'email' | 'sms' | 'in_app'>('email');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Function to handle sending message
  const handleSendMessage = () => {
    if (!message) {
      toast.error("Message content is required");
      return;
    }
    
    if (messageType === 'email' && !subject) {
      toast.error("Subject is required for email messages");
      return;
    }
    
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCommunication: CustomerCommunication = {
        id: `comm-${Math.floor(Math.random() * 100000)}`,
        customerId: customer.id,
        type: messageType,
        subject: subject || `${messageType.toUpperCase()} Notification`,
        message: message,
        sentBy: "current-user",
        sentDate: new Date().toISOString(),
        status: 'sent',
        templateId: template || undefined
      };
      
      setCommunications([newCommunication, ...communications]);
      setIsSending(false);
      setSubject('');
      setMessage('');
      setTemplate('');
      
      toast.success(`${messageType.toUpperCase()} sent successfully`);
    }, 1500);
  };
  
  // Function to render status badge
  const renderStatusBadge = (status: 'sent' | 'delivered' | 'read' | 'failed') => {
    switch(status) {
      case 'sent':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            <Send className="h-3 w-3 mr-1" /> Sent
          </Badge>
        );
      case 'delivered':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Delivered
          </Badge>
        );
      case 'read':
        return (
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">
            <Check className="h-3 w-3 mr-1" /> Read
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Failed
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Send Message Form */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> Send Message
          </CardTitle>
          <CardDescription>
            Send a message to {customer.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="messageType">Message Type</Label>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant={messageType === 'email' ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setMessageType('email')}
              >
                <Mail className="h-4 w-4 mr-2" /> Email
              </Button>
              <Button 
                type="button" 
                variant={messageType === 'sms' ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setMessageType('sms')}
              >
                <Phone className="h-4 w-4 mr-2" /> SMS
              </Button>
              <Button 
                type="button" 
                variant={messageType === 'in_app' ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setMessageType('in_app')}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> In-App
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="template">Message Template</Label>
            <select
              id="template"
              value={template}
              onChange={(e) => {
                setTemplate(e.target.value);
                if (e.target.value) {
                  switch (e.target.value) {
                    case 'payment-reminder':
                      setSubject('Payment Reminder');
                      setMessage(`Dear ${customer.name},\n\nThis is a friendly reminder that your monthly payment of ${(customer.monthlyIncome * 0.33).toLocaleString("en-NG", {style: "currency", currency: "NGN"})} is due on ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.\n\nPlease ensure timely payment to maintain your good standing.\n\nBest regards,\nFMBN Team`);
                      break;
                    case 'welcome-email':
                      setSubject('Welcome to FMBN Non-Interest Housing Program');
                      setMessage(`Dear ${customer.name},\n\nWelcome to the Federal Mortgage Bank of Nigeria's Non-Interest Rent-to-Own Housing Program. We are delighted to have you on board and look forward to supporting you on your journey to home ownership.\n\nYour customer number is: ${customer.customerNumber}\n\nPlease don't hesitate to contact us if you have any questions.\n\nBest regards,\nFMBN Team`);
                      break;
                    case 'document-request':
                      setSubject('Document Request');
                      setMessage(`Dear ${customer.name},\n\nWe need additional documentation to complete your application process. Please submit the following at your earliest convenience:\n\n- Recent utility bill\n- Updated employment letter\n\nYou can upload these documents directly through your customer portal.\n\nBest regards,\nFMBN Team`);
                      break;
                  }
                }
              }}
              className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Select Template (Optional)</option>
              <option value="payment-reminder">Payment Reminder</option>
              <option value="welcome-email">Welcome Email</option>
              <option value="document-request">Document Request</option>
            </select>
          </div>
          
          {(messageType === 'email' || messageType === 'in_app') && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                placeholder="Message subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          )}
          
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Type your message here..."
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="w-1/3" onClick={() => {
            setSubject('');
            setMessage('');
            setTemplate('');
          }}>
            Clear
          </Button>
          <Button 
            className="w-2/3 ml-2" 
            onClick={handleSendMessage}
            disabled={isSending || (!message) || (messageType === 'email' && !subject)}
          >
            {isSending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send {messageType.toUpperCase()}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Communication History */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" /> Communication History
          </CardTitle>
          <div className="flex items-center justify-between">
            <CardDescription>
              Recent messages sent to this customer
            </CardDescription>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Filter className="h-3 w-3" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-xs">
                <Download className="h-3 w-3" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communications.length > 0 ? (
                  communications.map((comm) => (
                    <TableRow key={comm.id}>
                      <TableCell>
                        {formatDate(comm.sentDate)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {comm.type === 'email' && <Mail className="h-4 w-4 mr-1 text-blue-600" />}
                          {comm.type === 'sms' && <Phone className="h-4 w-4 mr-1 text-green-600" />}
                          {comm.type === 'in_app' && <MessageSquare className="h-4 w-4 mr-1 text-purple-600" />}
                          <span className="capitalize">{comm.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{comm.subject}</TableCell>
                      <TableCell>
                        {renderStatusBadge(comm.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No communication history available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {communications.length} communications
          </div>
        </CardFooter>
      </Card>
      
      {/* Communication Templates */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Communication Templates</CardTitle>
          <CardDescription>
            Standard message templates for common customer communications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Payment Reminder</h3>
                <Badge variant="outline" className="text-blue-700 border-blue-200">Email/SMS</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Reminder for upcoming payment due dates
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setTemplate('payment-reminder');
                  setMessageType('email');
                  setSubject('Payment Reminder');
                  setMessage(`Dear ${customer.name},\n\nThis is a friendly reminder that your monthly payment of ${(customer.monthlyIncome * 0.33).toLocaleString("en-NG", {style: "currency", currency: "NGN"})} is due on ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}.\n\nPlease ensure timely payment to maintain your good standing.\n\nBest regards,\nFMBN Team`);
                }}
              >
                Use Template
              </Button>
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Welcome Message</h3>
                <Badge variant="outline" className="text-green-700 border-green-200">Email</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Welcome message for newly registered customers
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setTemplate('welcome-email');
                  setMessageType('email');
                  setSubject('Welcome to FMBN Non-Interest Housing Program');
                  setMessage(`Dear ${customer.name},\n\nWelcome to the Federal Mortgage Bank of Nigeria's Non-Interest Rent-to-Own Housing Program. We are delighted to have you on board and look forward to supporting you on your journey to home ownership.\n\nYour customer number is: ${customer.customerNumber}\n\nPlease don't hesitate to contact us if you have any questions.\n\nBest regards,\nFMBN Team`);
                }}
              >
                Use Template
              </Button>
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Document Request</h3>
                <Badge variant="outline" className="text-purple-700 border-purple-200">Email</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Request for additional customer documents
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setTemplate('document-request');
                  setMessageType('email');
                  setSubject('Document Request');
                  setMessage(`Dear ${customer.name},\n\nWe need additional documentation to complete your application process. Please submit the following at your earliest convenience:\n\n- Recent utility bill\n- Updated employment letter\n\nYou can upload these documents directly through your customer portal.\n\nBest regards,\nFMBN Team`);
                }}
              >
                Use Template
              </Button>
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Special Announcement</h3>
                <Badge variant="outline" className="text-amber-700 border-amber-200">All</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Important announcements for customers
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setMessageType('email');
                  setSubject('Important Announcement from FMBN');
                  setMessage(`Dear ${customer.name},\n\nWe would like to inform you about an important update regarding your housing arrangement with FMBN.\n\nPlease contact our customer service center for more details.\n\nBest regards,\nFMBN Team`);
                }}
              >
                Use Template
              </Button>
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Payment Received</h3>
                <Badge variant="outline" className="text-blue-700 border-blue-200">Email/SMS</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Confirmation of payment receipt
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setMessageType('email');
                  setSubject('Payment Confirmation');
                  setMessage(`Dear ${customer.name},\n\nWe have received your payment of ${(customer.monthlyIncome * 0.33).toLocaleString("en-NG", {style: "currency", currency: "NGN"})} dated ${new Date().toLocaleDateString()}.\n\nThank you for your prompt payment. Your next payment is due on ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}.\n\nBest regards,\nFMBN Team`);
                }}
              >
                Use Template
              </Button>
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Custom Template</h3>
                <Badge variant="outline" className="text-gray-700 border-gray-200">Custom</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Create a custom message template
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setMessageType('email');
                  setSubject('');
                  setMessage('');
                  setTemplate('');
                }}
              >
                Create Custom
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between py-4 border-t">
          <div className="text-sm text-muted-foreground">
            6 templates available
          </div>
          <Button variant="outline" size="sm">Manage Templates</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerCommunicationComponent;
