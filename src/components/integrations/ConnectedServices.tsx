
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { mockConnectedServices } from '@/data/mockIntegrations';
import { Plug, Settings, X, Check, AlertTriangle, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ConnectedServices = () => {
  const [services, setServices] = useState(mockConnectedServices);
  const [currentService, setCurrentService] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleService = (id: string) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id 
          ? { ...service, active: !service.active } 
          : service
      )
    );
    
    const service = services.find(s => s.id === id);
    if (service) {
      toast({
        description: `${service.name} ${service.active ? 'disabled' : 'enabled'} successfully`,
      });
    }
  };

  const configureService = (service: any) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const saveConfiguration = () => {
    setIsDialogOpen(false);
    toast({
      description: `${currentService.name} configuration updated successfully`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Connected External Services</h3>
        <Button>
          <Plug className="h-4 w-4 mr-2" /> Connect New Service
        </Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <div className={`h-1 w-full ${service.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${service.active ? 'bg-primary/10' : 'bg-gray-100'}`}>
                      <service.icon className={`h-6 w-6 ${service.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{service.name}</h4>
                      <Badge variant="outline" className={service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {service.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{service.description}</p>
                  </div>
                </div>
                <Switch 
                  checked={service.active} 
                  onCheckedChange={() => toggleService(service.id)}
                />
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <div className="flex items-center justify-between mb-1">
                  <span>Integration Type:</span>
                  <span className="font-medium">{service.type}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span>Last Synced:</span>
                  <span className="font-medium">{service.lastSync}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="font-medium flex items-center">
                    {service.status === 'healthy' ? (
                      <>
                        <Check className="h-3 w-3 text-green-500 mr-1" /> Healthy
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" /> {service.status}
                      </>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => configureService(service)}>
                  <Settings className="h-3.5 w-3.5 mr-1.5" /> Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure {currentService?.name}</DialogTitle>
            <DialogDescription>
              Adjust the integration settings for this service
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">API Endpoint</label>
              <input 
                type="text"
                className="w-full p-2 border rounded-md"
                defaultValue={currentService?.apiEndpoint}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">API Key</label>
              <div className="flex">
                <input 
                  type="password"
                  className="w-full p-2 border rounded-md rounded-r-none"
                  defaultValue="•••••••••••••••••••"
                />
                <Button className="rounded-l-none">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sync Frequency</label>
              <select className="w-full p-2 border rounded-md">
                <option value="real-time">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="error-notifications" />
              <label htmlFor="error-notifications" className="text-sm font-medium">
                Receive error notifications
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveConfiguration}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectedServices;
