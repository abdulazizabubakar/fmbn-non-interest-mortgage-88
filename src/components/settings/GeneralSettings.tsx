
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface GeneralSettingsFormValues {
  bankName: string;
  emailDomain: string;
  enableNotifications: boolean;
  enableAutomaticReports: boolean;
}

const GeneralSettings = () => {
  const form = useForm<GeneralSettingsFormValues>({
    defaultValues: {
      bankName: 'Federal Mortgage Bank of Nigeria',
      emailDomain: 'fmbn.gov.ng',
      enableNotifications: true,
      enableAutomaticReports: true
    }
  });

  const onSubmit = (data: GeneralSettingsFormValues) => {
    console.log('General settings submitted:', data);
    toast.success('General settings updated successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Configure general system settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank Name" {...field} />
                    </FormControl>
                    <FormDescription>This name will appear throughout the system.</FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emailDomain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Domain</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Domain" {...field} />
                    </FormControl>
                    <FormDescription>Used for system notifications and user registrations.</FormDescription>
                  </FormItem>
                )}
              />

              <div className="space-y-4 pt-4 border-t">
                <FormField
                  control={form.control}
                  name="enableNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Notifications</FormLabel>
                        <FormDescription>Send automatic notifications to users</FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enableAutomaticReports"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Automatic Reports</FormLabel>
                        <FormDescription>Generate reports automatically</FormDescription>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
