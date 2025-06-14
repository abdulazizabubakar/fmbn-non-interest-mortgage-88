
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, UserCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast"; // Use custom hook location
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AmanahLogo from "@/components/icons/AmanahLogo";

// Elegant Login page schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  rememberMe: z.boolean().default(false),
});
type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await login(values.email, values.password);
      toast.success("Login successful!");

      // Determine where to go next
      const from =
        (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, {
        replace: true,
      });
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fmbn-light to-white px-2 py-10">
      <Card className="w-full max-w-4xl flex flex-col md:flex-row glass-card shadow-2xl relative overflow-hidden border-0">
        {/* Left: Feature Image */}
        <div className="hidden md:flex flex-col items-center justify-center md:w-1/2 relative z-0 bg-fmbn-primary/90 rounded-l-2xl overflow-hidden">
          {/* Image - responsive, covers area, gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=700&q=80"
              alt="Elegant mosque - befitting Non-Interest Mortgage Management"
              className="w-full h-full object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-fmbn-primary/80 to-fmbn-dark/40" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-10">
            <AmanahLogo className="w-24 h-24 drop-shadow-lg" />
            <h2 className="mt-6 mb-1 text-2xl font-bold text-white text-center font-playfair drop-shadow-lg">
              Welcome to
            </h2>
            <span className="block text-lg text-fmbn-accent font-semibold font-playfair text-center drop-shadow">
              Non-Interest Mortgage<br />Management System
            </span>
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white/90 backdrop-blur-sm">
          <div className="mb-6 flex md:hidden justify-center">
            {/* Mobile logo on top */}
            <AmanahLogo className="w-16 h-16 mb-2" />
          </div>
          <CardHeader className="space-y-1 p-0">
            <CardTitle className="text-2xl font-bold gradient-text text-center">Sign In</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
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
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Button
                          variant="link"
                          type="button"
                          className="p-0 h-auto text-sm font-normal"
                          onClick={() => navigate("/forgot-password")}
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder="Your password"
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
                {/* Remember me */}
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
                      <div className="text-sm leading-none">
                        <FormLabel>Remember me for 30 days</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {/* Submit button */}
                <Button className="w-full mt-4" type="submit">
                  <UserCheck className="mr-2 h-5 w-5" />
                  Sign in
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col p-0 pt-6">
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                type="button"
                onClick={() => toast.info("Please contact your administrator for an account.")}
              >
                Contact your administrator
              </Button>
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default Login;
