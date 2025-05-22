
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Bell, AlertTriangle, Upload, FileText, ChevronRight, Home, FileCheck, CreditCard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const LesseeDashboardContent = () => {
  // Mock data for the dashboard - in a real app, this would come from an API
  const { user } = useAuth();
  const leaseStatus = "Active";
  const nextPaymentDate = "2025-06-15";
  const paymentAmount = 75000;
  const notificationCount = 3;
  const documentsPending = 2;
  const ownershipProgress = 35; // percentage
  
  const daysUntilNextPayment = () => {
    const today = new Date();
    const next = new Date(nextPaymentDate);
    const diffTime = Math.abs(next.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>
              <p className="text-muted-foreground mt-1">
                Your non-interest lease journey with FMBN
              </p>
            </div>
            <Button variant="default" className="mt-4 md:mt-0">
              View Lease Details <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lease Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center">
              <Home className="h-4 w-4 mr-2 text-primary" />
              Lease Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Badge 
                variant={leaseStatus === "Active" ? "default" : leaseStatus === "Under Review" ? "outline" : "destructive"}
                className="text-sm py-1"
              >
                {leaseStatus}
              </Badge>
              <span className="text-sm text-muted-foreground">Since Apr 2025</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Countdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Next Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-semibold">{daysUntilNextPayment()} days</span>
              </div>
              <span className="font-medium">₦{paymentAmount.toLocaleString()}</span>
            </div>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Due on {new Date(nextPaymentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">Make Payment</Button>
          </CardFooter>
        </Card>
        
        {/* Notifications Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium flex items-center">
              <Bell className="h-4 w-4 mr-2 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span>{notificationCount} new notifications</span>
              </div>
              {documentsPending > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {documentsPending} docs pending
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full">View All</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common tasks you may want to perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
              <Upload className="h-5 w-5 mb-2" />
              <span className="text-sm">Upload Document</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
              <FileText className="h-5 w-5 mb-2" />
              <span className="text-sm">View Contract</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
              <AlertTriangle className="h-5 w-5 mb-2" />
              <span className="text-sm">Report Issue</span>
            </Button>
            <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 px-2">
              <Bell className="h-5 w-5 mb-2" />
              <span className="text-sm">Set Reminders</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Ownership Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileCheck className="h-5 w-5 mr-2 text-primary" />
            Ownership Progress
          </CardTitle>
          <CardDescription>Track your journey to full property ownership</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Progress</span>
              <span className="font-medium">{ownershipProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${ownershipProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Start Date: Apr 2025</span>
              <span>Estimated Completion: Apr 2035</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LesseeDashboardContent;
