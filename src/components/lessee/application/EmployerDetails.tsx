
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

const employerSchema = z.object({
  employerName: z.string().min(3, {
    message: "Employer name must be at least 3 characters.",
  }),
  employerType: z.enum(['public', 'private', 'self_employed', 'cooperative'], {
    required_error: "Please select an employer type.",
  }),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  employmentStartDate: z.string().min(1, {
    message: "Employment start date is required.",
  }),
  employmentStatus: z.enum(['permanent', 'contract', 'temporary'], {
    required_error: "Please select employment status.",
  }),
  monthlyIncome: z.string().min(1, {
    message: "Monthly income is required.",
  }),
  employerAddress: z.string().min(5, {
    message: "Employer address must be at least 5 characters.",
  }),
  supervisorName: z.string().optional(),
  supervisorPhone: z.string().optional(),
  supervisorEmail: z.string().email().optional(),
  hasGuarantor: z.boolean().default(false),
  guarantorName: z.string().optional(),
  guarantorPhone: z.string().optional(),
  guarantorEmail: z.string().email().optional(),
  guarantorAddress: z.string().optional(),
  guarantorRelationship: z.string().optional(),
  consent: z.boolean().refine(value => value === true, {
    message: "You must agree to the employer verification process.",
  }),
});

export const EmployerDetails = () => {
  const form = useForm<z.infer<typeof employerSchema>>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      employerName: "",
      employerType: undefined,
      jobTitle: "",
      employmentStartDate: "",
      employmentStatus: undefined,
      monthlyIncome: "",
      employerAddress: "",
      supervisorName: "",
      supervisorPhone: "",
      supervisorEmail: "",
      hasGuarantor: false,
      guarantorName: "",
      guarantorPhone: "",
      guarantorEmail: "",
      guarantorAddress: "",
      guarantorRelationship: "",
      consent: false,
    },
  });
  
  const hasGuarantor = form.watch("hasGuarantor");
  
  function onSubmit(values: z.infer<typeof employerSchema>) {
    console.log(values);
  }
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Employment Details</h2>
        <p className="text-sm text-muted-foreground">
          Provide your employment information for income verification
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="employerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Federal Ministry of Finance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employer type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Government/Public Sector</SelectItem>
                        <SelectItem value="private">Private Sector</SelectItem>
                        <SelectItem value="self_employed">Self Employed</SelectItem>
                        <SelectItem value="cooperative">Cooperative</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Accountant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="employmentStartDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income (₦)</FormLabel>
                    <FormControl>
                      <Input placeholder="350,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="employerAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter full address of your employer"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-md font-medium">Supervisor Information</h3>
            <p className="text-sm text-muted-foreground">
              Provide details of your immediate supervisor or HR contact
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="supervisorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supervisorPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+234 800 123 4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supervisorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="hasGuarantor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Add a Guarantor</FormLabel>
                    <FormDescription>
                      A guarantor may be required based on your eligibility assessment
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            {hasGuarantor && (
              <div className="space-y-4 mt-4 p-4 border rounded-md">
                <h3 className="text-md font-medium">Guarantor Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guarantorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guarantor Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guarantorRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship</FormLabel>
                        <FormControl>
                          <Input placeholder="Family Friend" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guarantorPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 800 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guarantorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jane.smith@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="guarantorAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter guarantor's full address"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Employment Verification Consent</FormLabel>
                  <FormDescription>
                    I authorize FMBN to verify my employment details with my employer and the provided contacts.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
