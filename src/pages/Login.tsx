
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lock, Mail, UserCheck, Shield, Home, Users } from 'lucide-react';
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
  const { login } = useAuth();

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

  const handleDemoLogin = (role: string) => {
    form.setValue('email', `${role}@fmbn.gov.ng`);
    form.setValue('password', 'password123');
    form.setValue('role', role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <AmanahLogo className="h-24 w-24" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-slate-900 leading-tight">
                Federal Mortgage Bank
                <span className="block text-fmbn-primary">of Nigeria</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Non-Interest Mortgage Management System
              </p>
              <p className="text-slate-500">
                Empowering homeownership through Shariah-compliant financing solutions
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 gap-4 w-full max-w-md">
            <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-fmbn-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-fmbn-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Secure Platform</h3>
                <p className="text-sm text-slate-600">Enterprise-grade security</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-fmbn-secondary/10 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-fmbn-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Property Management</h3>
                <p className="text-sm text-slate-600">Comprehensive property tracking</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-fmbn-accent/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-fmbn-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Multi-Role Access</h3>
                <p className="text-sm text-slate-600">Role-based permissions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-4 pb-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-4">
                <AmanahLogo className="h-16 w-16" />
              </div>
              
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Sign in to your FMBN account to continue
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField 
                    control={form.control} 
                    name="email" 
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Email Address</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <FormControl>
                            <Input 
                              placeholder="Enter your email address" 
                              className="pl-10 h-12 border-slate-200 focus:border-fmbn-primary focus:ring-fmbn-primary/20 bg-white/50" 
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
                          <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-sm text-fmbn-primary hover:text-fmbn-primary/80"
                            type="button"
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter your password" 
                              className="pl-10 h-12 border-slate-200 focus:border-fmbn-primary focus:ring-fmbn-primary/20 bg-white/50" 
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
                        <FormLabel className="text-slate-700 font-medium">Login as (Demo)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-slate-200 focus:border-fmbn-primary bg-white/50">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="application_officer">Application Officer</SelectItem>
                            <SelectItem value="finance_officer">Finance Officer</SelectItem>
                            <SelectItem value="legal_officer">Legal Officer</SelectItem>
                            <SelectItem value="zonal_admin">Zonal Administrator</SelectItem>
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
                            className="data-[state=checked]:bg-fmbn-primary data-[state=checked]:border-fmbn-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-slate-600">
                            Keep me signed in for 30 days
                          </FormLabel>
                        </div>
                      </FormItem>
                    )} 
                  />

                  <Button 
                    className="w-full h-12 bg-gradient-to-r from-fmbn-primary to-fmbn-secondary hover:from-fmbn-primary/90 hover:to-fmbn-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                    type="submit"
                  >
                    <UserCheck className="mr-2 h-5 w-5" />
                    Sign In
                  </Button>
                </form>
              </Form>

              {/* Demo Login Section */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Quick Demo Access</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDemoLogin('admin')}
                    className="border-slate-200 hover:bg-slate-50 text-slate-700"
                  >
                    Admin
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDemoLogin('finance_officer')}
                    className="border-slate-200 hover:bg-slate-50 text-slate-700"
                  >
                    Finance
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDemoLogin('zonal_admin')}
                    className="border-slate-200 hover:bg-slate-50 text-slate-700"
                  >
                    Zonal
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDemoLogin('lessee')}
                    className="border-slate-200 hover:bg-slate-50 text-slate-700"
                  >
                    Lessee
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-6">
              <p className="text-center text-sm text-slate-600 w-full">
                Need access?{' '}
                <Button 
                  variant="link" 
                  className="p-0 text-fmbn-primary hover:text-fmbn-primary/80 font-medium"
                >
                  Contact your administrator
                </Button>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
