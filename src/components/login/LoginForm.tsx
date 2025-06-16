
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lock, Mail, UserCheck } from 'lucide-react';

const LoginForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <FormField control={control} name="email" render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <FormControl>
              <Input placeholder="m.john@fmbn.gov.ng" className="pl-10" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )} />

      <FormField control={control} name="password" render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            <Button
              variant="link"
              className="p-0 h-auto text-sm font-normal text-fmbn-primary"
              type="button"
            >
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <FormControl>
              <Input type="password" className="pl-10" {...field} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )} />

      <FormField control={control} name="role" render={({ field }) => (
        <FormItem>
          <FormLabel>Login as (Demo)</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="application_officer">Application Officer</SelectItem>
              <SelectItem value="finance_officer">Finance Officer</SelectItem>
              <SelectItem value="legal_officer">Legal Officer</SelectItem>
              <SelectItem value="zonal_admin">Zonal Admin</SelectItem>
              <SelectItem value="shariah_reviewer">Shariah Reviewer</SelectItem>
              <SelectItem value="lessee">Lessee</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />

      <FormField control={control} name="rememberMe" render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Remember me for 30 days</FormLabel>
          </div>
        </FormItem>
      )} />

      <Button className="w-full mt-2 bg-fmbn-primary hover:bg-fmbn-primary/90" type="submit">
        <UserCheck className="mr-2 h-5 w-5" />
        Sign in
      </Button>
    </>
  );
};

export default LoginForm;
