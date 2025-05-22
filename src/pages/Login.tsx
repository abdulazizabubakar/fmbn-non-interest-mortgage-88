
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lock, Mail, UserCheck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.string().optional(),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, hasRole } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'admin',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await login(values.email, values.password);
      toast.success("Login successful!");
      
      // Get the intended destination from location state or use default based on role
      const from = (location.state as any)?.from?.pathname || determineRedirectPath(user.roles[0]);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const determineRedirectPath = (role: string) => {
    if (role === 'lessee') {
      return '/lessee-portal';
    } else {
      return '/dashboard';
    }
  };

  // For demo purposes
  const handleDemoLogin = (role: string) => {
    form.setValue('email', `${role}@fmbn.gov.ng`);
    form.setValue('password', 'password123');
    form.setValue('role', role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <ShieldCheck className="h-12 w-12 text-nimms-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            FMBN Mortgage Management
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="m.john@fmbn.gov.ng"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm font-normal" 
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="password"
                          className="pl-10"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Login as (Demo)</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
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
                )}
              />
              
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me for 30 days</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button className="w-full" type="submit">
                <UserCheck className="mr-2 h-5 w-5" />
                Sign in
              </Button>
            </form>
          </Form>
          
          <div className="mt-6">
            <p className="text-sm text-center text-muted-foreground mb-2">Quick Login (Demo)</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin')}>
                Login as Admin
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('finance_officer')}>
                Login as Finance
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('zonal_admin')}>
                Login as Zonal
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDemoLogin('lessee')}>
                Login as Lessee
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm">
            Don't have an account?{' '}
            <Button variant="link" className="p-0">
              Contact your administrator
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
