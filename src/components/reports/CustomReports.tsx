
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, PlusCircle, X, ArrowRight } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const CustomReports = () => {
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('fields');

  const availableEntities = [
    { value: 'customers', label: 'Customers' },
    { value: 'mortgages', label: 'Mortgages' },
    { value: 'applications', label: 'Applications' },
    { value: 'payments', label: 'Payments' },
    { value: 'properties', label: 'Properties' }
  ];

  const fields = {
    customers: [
      { id: 'customer_id', name: 'Customer ID' },
      { id: 'customer_name', name: 'Customer Name' },
      { id: 'customer_email', name: 'Email' },
      { id: 'customer_phone', name: 'Phone' },
      { id: 'customer_address', name: 'Address' },
      { id: 'customer_created', name: 'Registration Date' },
    ],
    mortgages: [
      { id: 'mortgage_id', name: 'Mortgage ID' },
      { id: 'mortgage_amount', name: 'Amount' },
      { id: 'mortgage_tenure', name: 'Tenure' },
      { id: 'mortgage_type', name: 'Type' },
      { id: 'mortgage_status', name: 'Status' },
      { id: 'mortgage_start_date', name: 'Start Date' },
    ],
    applications: [
      { id: 'application_id', name: 'Application ID' },
      { id: 'application_date', name: 'Application Date' },
      { id: 'application_type', name: 'Type' },
      { id: 'application_status', name: 'Status' },
      { id: 'application_stage', name: 'Current Stage' },
    ],
    payments: [
      { id: 'payment_id', name: 'Payment ID' },
      { id: 'payment_date', name: 'Date' },
      { id: 'payment_amount', name: 'Amount' },
      { id: 'payment_method', name: 'Method' },
      { id: 'payment_status', name: 'Status' },
    ],
    properties: [
      { id: 'property_id', name: 'Property ID' },
      { id: 'property_type', name: 'Type' },
      { id: 'property_address', name: 'Address' },
      { id: 'property_value', name: 'Value' },
      { id: 'property_status', name: 'Status' },
    ]
  };

  const [selectedEntity, setSelectedEntity] = useState(availableEntities[0].value);
  
  const toggleFieldSelection = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const addFilter = () => {
    const newFilter = {
      id: Date.now(),
      field: '',
      operator: 'equals',
      value: ''
    };
    
    setSelectedFilters([...selectedFilters, newFilter]);
  };

  const updateFilter = (id: number, key: string, value: string) => {
    setSelectedFilters(selectedFilters.map(filter => 
      filter.id === id ? { ...filter, [key]: value } : filter
    ));
  };

  const removeFilter = (id: number) => {
    setSelectedFilters(selectedFilters.filter(filter => filter.id !== id));
  };

  const handleCreateReport = () => {
    if (!reportName) {
      toast({
        title: "Report name required",
        description: "Please provide a name for your report",
        variant: "destructive"
      });
      return;
    }

    if (selectedFields.length === 0) {
      toast({
        title: "Fields required",
        description: "Please select at least one field for your report",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Created",
      description: `Your custom report "${reportName}" has been created`,
    });

    // Reset form
    setReportName('');
    setReportDescription('');
    setSelectedFields([]);
    setSelectedFilters([]);
    setActiveTab('fields');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Details</CardTitle>
              <CardDescription>
                Define the basic information for your custom report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name *</Label>
                <Input 
                  id="report-name" 
                  placeholder="e.g., Active Mortgage Summary" 
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-description">Description</Label>
                <Textarea 
                  id="report-description" 
                  placeholder="Briefly describe the purpose of this report"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-entity">Primary Data Entity</Label>
                <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                  <SelectTrigger id="report-entity">
                    <SelectValue placeholder="Select entity" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEntities.map(entity => (
                      <SelectItem key={entity.value} value={entity.value}>{entity.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted h-40 rounded-md flex flex-col items-center justify-center p-4 text-center">
                {reportName ? (
                  <>
                    <h4 className="font-semibold mb-2">{reportName}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{reportDescription || "No description provided"}</p>
                    <div className="text-xs">
                      <p>Selected {selectedFields.length} fields</p>
                      <p>Applied {selectedFilters.length} filters</p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    Complete the form to preview your custom report
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleCreateReport}
                disabled={!reportName || selectedFields.length === 0}
              >
                <Save className="h-4 w-4 mr-2" /> Create Report
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>
                Select fields, apply filters, and set sorting options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="fields">Fields</TabsTrigger>
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                </TabsList>
                
                <TabsContent value="fields" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Available Fields</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedFields.length} fields selected
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 space-y-3 max-h-[400px] overflow-y-auto">
                    {fields[selectedEntity as keyof typeof fields].map(field => (
                      <div key={field.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={field.id}
                          checked={selectedFields.includes(field.id)} 
                          onCheckedChange={() => toggleFieldSelection(field.id)}
                        />
                        <Label htmlFor={field.id} className="cursor-pointer">
                          {field.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" onClick={() => setActiveTab('filters')}>
                      Next: Filters <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="filters" className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Apply Filters (Optional)</h4>
                    <Button variant="outline" size="sm" onClick={addFilter}>
                      <Plus className="h-4 w-4 mr-2" /> Add Filter
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedFilters.length > 0 ? (
                      selectedFilters.map(filter => (
                        <div key={filter.id} className="flex items-center space-x-2 border rounded-md p-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1">
                            <Select 
                              value={filter.field} 
                              onValueChange={(value) => updateFilter(filter.id, 'field', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                {fields[selectedEntity as keyof typeof fields].map(field => (
                                  <SelectItem key={field.id} value={field.id}>{field.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Select 
                              value={filter.operator} 
                              onValueChange={(value) => updateFilter(filter.id, 'operator', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="not_equals">Not Equals</SelectItem>
                                <SelectItem value="contains">Contains</SelectItem>
                                <SelectItem value="greater_than">Greater Than</SelectItem>
                                <SelectItem value="less_than">Less Than</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input 
                              placeholder="Value"
                              value={filter.value}
                              onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                            />
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFilter(filter.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-8 border rounded-md">
                        <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="font-medium">No filters added</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add filters to refine your report results
                        </p>
                        <Button variant="outline" className="mt-4" onClick={addFilter}>
                          <Plus className="h-4 w-4 mr-2" /> Add Your First Filter
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab('fields')}>
                      Back to Fields
                    </Button>
                    <Button onClick={handleCreateReport} disabled={!reportName || selectedFields.length === 0}>
                      Create Report
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomReports;
