
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Mail, Lock, UserCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    employeeId: '',
    agreeToTerms: false,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) 
      errors.fullName = 'Full name is required';
    
    if (!formData.email.trim()) 
      errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) 
      errors.email = 'Email is invalid';
    
    if (!formData.password) 
      errors.password = 'Password is required';
    else if (formData.password.length < 8)
      errors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = 'Passwords do not match';
    
    if (!formData.organization.trim())
      errors.organization = 'Organization is required';
    
    if (!formData.employeeId.trim())
      errors.employeeId = 'Employee ID is required';
    
    if (!formData.agreeToTerms)
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Registration successful! Please check your email to verify your account.");
      navigate('/verify-email', { state: { email: formData.email } });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={formErrors.fullName ? "border-destructive" : ""}
                />
                {formErrors.fullName && (
                  <p className="text-sm text-destructive">{formErrors.fullName}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m.john@fmbn.gov.ng"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? "border-destructive" : ""}
                />
                {formErrors.email && (
                  <p className="text-sm text-destructive">{formErrors.email}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={formErrors.password ? "border-destructive" : ""}
                />
                {formErrors.password && (
                  <p className="text-sm text-destructive">{formErrors.password}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={formErrors.confirmPassword ? "border-destructive" : ""}
                />
                {formErrors.confirmPassword && (
                  <p className="text-sm text-destructive">{formErrors.confirmPassword}</p>
                )}
              </div>
              
              <Separator className="my-2" />
              
              <div className="grid gap-2">
                <Label htmlFor="organization">Organization/Branch</Label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Head Office"
                  value={formData.organization}
                  onChange={handleChange}
                  className={formErrors.organization ? "border-destructive" : ""}
                />
                {formErrors.organization && (
                  <p className="text-sm text-destructive">{formErrors.organization}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  name="employeeId"
                  placeholder="FMBN-1234"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className={formErrors.employeeId ? "border-destructive" : ""}
                />
                {formErrors.employeeId && (
                  <p className="text-sm text-destructive">{formErrors.employeeId}</p>
                )}
              </div>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Your registration will be verified by an administrator before you can access the system.
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="agreeToTerms" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => {
                    setFormData({
                      ...formData,
                      agreeToTerms: checked as boolean
                    });
                    if (formErrors.agreeToTerms) {
                      setFormErrors({
                        ...formErrors,
                        agreeToTerms: ''
                      });
                    }
                  }}
                />
                <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                  I agree to the terms of service and privacy policy
                </Label>
              </div>
              {formErrors.agreeToTerms && (
                <p className="text-sm text-destructive">{formErrors.agreeToTerms}</p>
              )}
            </div>
            
            <Button className="w-full mt-6" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Create account
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm">
            Already have an account?{' '}
            <Button variant="link" className="p-0" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
