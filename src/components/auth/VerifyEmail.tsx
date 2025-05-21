
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface LocationState {
  email?: string;
}

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = (location.state as LocationState) || {};
  
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  
  useEffect(() => {
    if (!email) {
      navigate('/register');
    }

    let interval: NodeJS.Timeout;
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [email, navigate, resendCountdown]);
  
  const handleSubmit = () => {
    if (value.length !== 6) {
      toast.error('Please enter the complete verification code');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API verification
    setTimeout(() => {
      setIsSubmitting(false);
      setVerificationStatus('success');
      toast.success('Email verified successfully!');
      
      // Redirect after showing success state
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 1500);
  };
  
  const handleResendCode = () => {
    if (resendCountdown > 0) return;
    
    setIsResending(true);
    
    // Simulate API call to resend code
    setTimeout(() => {
      setIsResending(false);
      setResendCountdown(60);
      toast.success('Verification code resent');
    }, 1500);
  };

  if (verificationStatus === 'success') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Email Verified!</CardTitle>
            <CardDescription className="text-center">
              Your account has been verified successfully. You can now log in to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => navigate('/login')}>
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            We have sent a verification code to {email || 'your email'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="w-full mb-6">
            <InputOTP 
              maxLength={6}
              value={value} 
              onChange={setValue}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )} 
            />
          </div>
          
          <Button 
            className="w-full mb-4" 
            onClick={handleSubmit} 
            disabled={isSubmitting || value.length !== 6}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Verify Email
              </span>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleResendCode}
            disabled={resendCountdown > 0 || isResending}
          >
            {isResending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Sending code...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                {resendCountdown > 0 
                  ? `Resend code (${resendCountdown}s)` 
                  : 'Resend verification code'}
              </span>
            )}
          </Button>
        </CardContent>
        <CardFooter>
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              If you don't see the email in your inbox, please check your spam folder.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
