
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Webhook, Plus, Trash, Check, X, PlayCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { mockWebhooks } from '@/data/mockIntegrations';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WebhookManager = () => {
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
    method: 'POST'
  });

  const addWebhook = () => {
    if (!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const webhook = {
      id: `wh_${Date.now()}`,
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      method: newWebhook.method,
      active: true,
      createdAt: new Date().toISOString()
    };

    setWebhooks([...webhooks, webhook]);
    setNewWebhook({
      name: '',
      url: '',
      events: [],
      method: 'POST'
    });

    toast({
      description: "Webhook added successfully",
    });
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(prev => 
      prev.map(webhook => 
        webhook.id === id ? { ...webhook, active: !webhook.active } : webhook
      )
    );
    
    const webhook = webhooks.find(w => w.id === id);
    if (webhook) {
      toast({
        description: `Webhook ${webhook.active ? 'disabled' : 'enabled'} successfully`,
      });
    }
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(webhook => webhook.id !== id));
    toast({
      description: "Webhook deleted successfully",
    });
  };

  const testWebhook = (webhook: any) => {
    toast({
      title: "Testing webhook",
      description: `Sending test payload to ${webhook.url}`,
    });
    
    // Simulate webhook test
    setTimeout(() => {
      toast({
        title: "Test successful",
        description: "Webhook responded with status 200 OK",
      });
    }, 1500);
  };

  const toggleEvent = (event: string) => {
    setNewWebhook(prev => {
      if (prev.events.includes(event)) {
        return { ...prev, events: prev.events.filter(e => e !== event) };
      } else {
        return { ...prev, events: [...prev.events, event] };
      }
    });
  };

  const availableEvents = [
    { id: 'document.created', label: 'Document Created' },
    { id: 'document.updated', label: 'Document Updated' },
    { id: 'document.deleted', label: 'Document Deleted' },
    { id: 'application.submitted', label: 'Application Submitted' },
    { id: 'application.approved', label: 'Application Approved' },
    { id: 'application.rejected', label: 'Application Rejected' },
    { id: 'payment.successful', label: 'Payment Successful' },
    { id: 'payment.failed', label: 'Payment Failed' },
    { id: 'user.created', label: 'User Created' },
    { id: 'user.updated', label: 'User Updated' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Webhook</CardTitle>
          <CardDescription>
            Define a new endpoint to receive event notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-name">Webhook Name</Label>
              <Input
                id="webhook-name"
                placeholder="e.g., Payment Notification Handler"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-method">HTTP Method</Label>
              <Select 
                value={newWebhook.method} 
                onValueChange={(value) => setNewWebhook({ ...newWebhook, method: value })}
              >
                <SelectTrigger id="webhook-method">
                  <SelectValue placeholder="Select HTTP method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              placeholder="https://your-domain.com/webhook-handler"
              value={newWebhook.url}
              onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Events to Subscribe</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableEvents.map(event => (
                <div key={event.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={event.id}
                    checked={newWebhook.events.includes(event.id)}
                    onChange={() => toggleEvent(event.id)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor={event.id} className="text-sm">
                    {event.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={addWebhook}>
            <Plus className="h-4 w-4 mr-2" /> Add Webhook
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Active Webhooks</h3>
        
        {webhooks.length > 0 ? (
          <div className="space-y-4">
            {webhooks.map((webhook) => (
              <Card key={webhook.id} className="overflow-hidden">
                <div className={`h-1 w-full ${webhook.active ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Webhook className={`h-5 w-5 ${webhook.active ? 'text-blue-500' : 'text-muted-foreground'}`} />
                        <h4 className="font-medium">{webhook.name}</h4>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${webhook.active ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {webhook.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 break-all">{webhook.url}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {webhook.events.map(event => (
                          <span key={event} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {event}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Created: {new Date(webhook.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => toggleWebhook(webhook.id)}
                      >
                        {webhook.active ? (
                          <X className="h-4 w-4 mr-1" />
                        ) : (
                          <Check className="h-4 w-4 mr-1" />
                        )}
                        {webhook.active ? 'Disable' : 'Enable'}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => testWebhook(webhook)}
                        disabled={!webhook.active}
                      >
                        <PlayCircle className="h-4 w-4 mr-1" /> Test
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteWebhook(webhook.id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-muted rounded-md">
            <Webhook className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium">No webhooks defined</h4>
            <p className="text-muted-foreground">
              Create your first webhook to receive event notifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookManager;
