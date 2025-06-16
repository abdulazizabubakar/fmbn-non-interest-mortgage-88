import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lock, Mail, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import AmanahLogo from '@/components/icons/AmanahLogo';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  }),
  role: z.string().optional(),
  rememberMe: z.boolean().default(false)
});
type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    login,
    hasRole
  } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'admin',
      rememberMe: false
    }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await login(values.email, values.password);
      toast.success("Login successful!");

      const from = (location.state as any)?.from?.pathname || determineRedirectPath(user.roles[0]);
      navigate(from, {
        replace: true
      });
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

  // Main modern layout
  return (
    <div className="min-h-screen flex items-center justify-center bg-fmbn-light/40 dark:bg-fmbn-dark/50">
      <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white/60 dark:bg-background/80 border border-fmbn-primary/10 flex flex-col md:flex-row glass-card">
        {/* Left image side (desktop only, appears above form on mobile) */}
        <div className="md:w-1/2 w-full h-60 md:h-auto relative flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=720&q=80"
            alt="Mosque under a starry sky - Non-Interest Mortgage"
            className="object-cover w-full h-full md:rounded-l-3xl md:rounded-none rounded-t-3xl"
            loading="lazy"
            style={{ minHeight: '100%' }}
          />
          {/* Overlay for subtle color and readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-fmbn-primary/60 via-white/0 to-fmbn-light/40 pointer-events-none rounded-t-3xl md:rounded-l-3xl md:rounded-none" />
          <div className="hidden md:block absolute inset-0 flex flex-col items-center justify-center">
            <AmanahLogo className="h-20 w-20 mb-3" />
            <h1 className="text-lg font-playfair font-semibold text-white text-center tracking-tight drop-shadow-lg">
              Welcome to the<br />
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                Non-Interest Mortgage<br />
                Management System
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Glass card form */}
        <div className="md:w-1/2 w-full px-6 py-8 md:py-10 flex flex-col justify-center bg-white/70 dark:bg-background/80 backdrop-blur-md">
          {/* Show AmanahLogo and title on mobile */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <AmanahLogo className="h-14 w-14 mb-2" />
            <h1 className="font-playfair text-lg font-semibold text-fmbn-primary text-center">
              Non-Interest Mortgage Management System
            </h1>
          </div>
          <CardHeader className="space-y-1 bg-transparent border-none p-0 mb-2">
            <CardTitle className="text-2xl font-bold text-center font-playfair">Sign In to Your Account</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Welcome back! Please login to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="email" render={({
                  field
                }) => (
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

                <FormField control={form.control} name="password" render={({
                  field
                }) => (
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

                <FormField control={form.control} name="role" render={({
                  field
                }) => (
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

                <FormField control={form.control} name="rememberMe" render={({
                  field
                }) => (
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
              </form>
            </Form>
            {/* Demo quick login */}
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
          <CardFooter className="flex flex-col mt-4 p-0">
            <p className="mt-2 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Button variant="link" className="p-0 text-fmbn-primary">Contact your administrator</Button>
            </p>
          </CardFooter>
        </div>
      </div>
    </div>
  );
};

export default Login;
