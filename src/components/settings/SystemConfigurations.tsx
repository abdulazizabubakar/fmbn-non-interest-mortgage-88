
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface SystemConfigFormValues {
  databaseConnectionString: string;
  apiEndpoint: string;
  defaultCurrency: string;
  defaultLanguage: string;
  dataRetentionPeriod: string;
  auditLogEnabled: string;
  profitCalculationMethod: string;
}

const SystemConfigurations = () => {
  const form = useForm<SystemConfigFormValues>({
    defaultValues: {
      databaseConnectionString: 'postgresql://fmbn:****@db.fmbn.gov.ng:5432/nimms',
      apiEndpoint: 'https://api.fmbn.gov.ng/nimms',
      defaultCurrency: 'NGN',
      defaultLanguage: 'en',
      dataRetentionPeriod: '7',
      auditLogEnabled: 'true',
      profitCalculationMethod: 'diminishing'
    }
  });

  const onSubmit = (data: SystemConfigFormValues) => {
    console.log('System configuration submitted:', data);
    toast.success('System configurations updated successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Configurations</CardTitle>
        <CardDescription>
          Configure technical system parameters and settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Accordion type="single" collapsible defaultValue="core" className="w-full">
              <AccordionItem value="core">
                <AccordionTrigger>Core System Settings</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-4">
                  <FormField
                    control={form.control}
                    name="databaseConnectionString"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Database Connection String</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Connection string" {...field} />
                        </FormControl>
                        <FormDescription>
                          Database connection string for the system
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="apiEndpoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Endpoint</FormLabel>
                        <FormControl>
                          <Input placeholder="API Endpoint URL" {...field} />
                        </FormControl>
                        <FormDescription>
                          Base URL for the system API
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="locale">
                <AccordionTrigger>Localization Settings</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-4">
                  <FormField
                    control={form.control}
                    name="defaultCurrency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                            <SelectItem value="USD">US Dollar (USD)</SelectItem>
                            <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Default currency used throughout the system
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="defaultLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ha">Hausa</SelectItem>
                            <SelectItem value="yo">Yoruba</SelectItem>
                            <SelectItem value="ig">Igbo</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Default language for the system interface
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="security">
                <AccordionTrigger>Security & Compliance Settings</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-4">
                  <FormField
                    control={form.control}
                    name="dataRetentionPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Retention Period (years)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 year</SelectItem>
                            <SelectItem value="3">3 years</SelectItem>
                            <SelectItem value="5">5 years</SelectItem>
                            <SelectItem value="7">7 years</SelectItem>
                            <SelectItem value="10">10 years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          How long to retain data before archiving
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="auditLogEnabled"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audit Logging</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true">Enabled</SelectItem>
                            <SelectItem value="false">Disabled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Enable or disable system audit logging
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="islamic">
                <AccordionTrigger>Islamic Finance Settings</AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 space-y-4">
                  <FormField
                    control={form.control}
                    name="profitCalculationMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Profit Calculation Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="diminishing">Diminishing Balance</SelectItem>
                            <SelectItem value="constant">Constant Rate</SelectItem>
                            <SelectItem value="floating">Floating Rate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Default method for profit calculation in Islamic financing products
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Configurations
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SystemConfigurations;
