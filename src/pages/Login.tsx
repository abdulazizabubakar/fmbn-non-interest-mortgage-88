
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import AmanahLogo from '@/components/icons/AmanahLogo';
import LoginImage from '@/components/login/LoginImage';
import LoginForm from '@/components/login/LoginForm';
import LoginDemoButtons from '@/components/login/LoginDemoButtons';

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
      const user = await login(values.email, values.password, values.role);
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
    // Automatically submit after filling
    form.handleSubmit(onSubmit)();
  };

  // Main modern layout
  return (
    <div className="min-h-screen flex items-center justify-center bg-fmbn-light/40 dark:bg-fmbn-dark/50">
      <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-white/60 dark:bg-background/80 border border-fmbn-primary/10 flex flex-col md:flex-row glass-card">
        <LoginImage />

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
                <LoginForm />
              </form>
            </Form>
            <LoginDemoButtons onDemoLogin={handleDemoLogin} />
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
