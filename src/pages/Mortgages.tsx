
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Plus, Download, Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for the portfolio summary
const portfolioData = {
  totalMortgages: 964,
  activeMortgages: 782,
  completedMortgages: 158,
  defaultingMortgages: 24,
  totalValue: "₦45.2B",
  activeValue: "₦36.8B",
  averageTenor: "15 years",
  averageFinancing: "₦47.1M",
};

// Mock data for mortgage lists
const mortgagesByStatus = [
  {
    id: "mort-1",
    customerName: "Ibrahim Mohammed",
    propertyAddress: "15 Ahmadu Bello Way, Lagos",
    amount: "₦52,500,000",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2039",
    status: "active",
  },
  {
    id: "mort-2",
    customerName: "Fatima Okonkwo",
    propertyAddress: "27 Broad Street, Lagos",
    amount: "₦67,200,000",
    startDate: "Feb 3, 2024",
    endDate: "Feb 3, 2044",
    status: "active",
  },
  {
    id: "mort-3",
    customerName: "Chijioke Adebayo",
    propertyAddress: "8 Independence Ave, Abuja",
    amount: "₦42,800,000",
    startDate: "Dec 10, 2023",
    endDate: "Dec 10, 2038",
    status: "active",
  },
  {
    id: "mort-4",
    customerName: "Amina Danjuma",
    propertyAddress: "5 Stadium Road, Port Harcourt",
    amount: "₦38,500,000",
    startDate: "Mar 22, 2024",
    endDate: "Mar 22, 2039",
    status: "active",
  },
];

const mortgagesByProduct = [
  {
    id: "mort-5",
    customerName: "Yusuf Ibrahim",
    propertyAddress: "12 Marina, Lagos",
    amount: "₦75,000,000",
    startDate: "Mar 5, 2024",
    endDate: "Mar 5, 2044",
    product: "Ijarah (Islamic Lease)",
  },
  {
    id: "mort-6",
    customerName: "Ngozi Okafor",
    propertyAddress: "24 Garki II, Abuja",
    amount: "₦48,600,000",
    startDate: "Feb 18, 2024",
    endDate: "Feb 18, 2039",
    product: "Diminishing Musharakah",
  },
  {
    id: "mort-7",
    customerName: "Mohammed Abubakar",
    propertyAddress: "7 Murtala Mohammed Way, Kano",
    amount: "₦36,200,000",
    startDate: "Jan 30, 2024",
    endDate: "Jan 30, 2039",
    product: "Fixed Rate Conventional",
  },
  {
    id: "mort-8",
    customerName: "Elizabeth Chukwu",
    propertyAddress: "18 Ogunlana Drive, Lagos",
    amount: "₦62,400,000",
    startDate: "Apr 8, 2024",
    endDate: "Apr 8, 2044",
    product: "Adjustable Rate Conventional",
  },
];

const Mortgages = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  
  const handleCreateMortgage = () => {
    navigate('/mortgage-applications');
  };
  
  const handleManageMortgages = () => {
    navigate('/mortgage-management');
  };
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mortgages</h1>
            <p className="text-muted-foreground">Manage your mortgage portfolio and applications</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleManageMortgages}>
              Manage Mortgages
            </Button>
            <Button onClick={handleCreateMortgage}>
              <Plus className="mr-2 h-4 w-4" />
              New Application
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
            <TabsTrigger value="by-status">By Status</TabsTrigger>
            <TabsTrigger value="by-product">By Product</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Mortgages</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolioData.totalMortgages}</div>
                  <p className="text-xs text-muted-foreground">Portfolio Value: {portfolioData.totalValue}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Mortgages</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolioData.activeMortgages}</div>
                  <p className="text-xs text-muted-foreground">Active Value: {portfolioData.activeValue}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Mortgages</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolioData.completedMortgages}</div>
                  <p className="text-xs text-muted-foreground">Avg. Tenor: {portfolioData.averageTenor}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Default</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolioData.defaultingMortgages}</div>
                  <p className="text-xs text-muted-foreground">Avg. Financing: {portfolioData.averageFinancing}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Monthly Disbursements</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] flex items-center justify-center border-dashed border-2 rounded-md">
                    <p className="text-muted-foreground">Mortgage Disbursement Chart (Coming Soon)</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Financing Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center border-dashed border-2 rounded-md">
                    <p className="text-muted-foreground">Financing Type Chart (Coming Soon)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="by-status">
            <Card>
              <CardHeader>
                <CardTitle>Mortgages by Status</CardTitle>
                <CardDescription>View and filter mortgages by their current status</CardDescription>
                <div className="flex justify-between items-center mt-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="Search mortgages..." className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_1.5fr_1fr_0.7fr_0.7fr_0.5fr] p-4 font-medium border-b">
                    <div>Customer</div>
                    <div>Property</div>
                    <div>Amount</div>
                    <div>Start Date</div>
                    <div>End Date</div>
                    <div>Status</div>
                  </div>
                  {mortgagesByStatus.map((mortgage) => (
                    <div key={mortgage.id} className="grid grid-cols-[1fr_1.5fr_1fr_0.7fr_0.7fr_0.5fr] p-4 border-b items-center hover:bg-muted/50">
                      <div>{mortgage.customerName}</div>
                      <div className="text-muted-foreground">{mortgage.propertyAddress}</div>
                      <div>{mortgage.amount}</div>
                      <div>{mortgage.startDate}</div>
                      <div>{mortgage.endDate}</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {mortgage.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="by-product">
            <Card>
              <CardHeader>
                <CardTitle>Mortgages by Product</CardTitle>
                <CardDescription>View and filter mortgages by product type</CardDescription>
                <div className="flex justify-between items-center mt-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="Search mortgages..." className="pl-8 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_1.5fr_1fr_0.7fr_0.7fr_1fr] p-4 font-medium border-b">
                    <div>Customer</div>
                    <div>Property</div>
                    <div>Amount</div>
                    <div>Start Date</div>
                    <div>End Date</div>
                    <div>Product</div>
                  </div>
                  {mortgagesByProduct.map((mortgage) => (
                    <div key={mortgage.id} className="grid grid-cols-[1fr_1.5fr_1fr_0.7fr_0.7fr_1fr] p-4 border-b items-center hover:bg-muted/50">
                      <div>{mortgage.customerName}</div>
                      <div className="text-muted-foreground">{mortgage.propertyAddress}</div>
                      <div>{mortgage.amount}</div>
                      <div>{mortgage.startDate}</div>
                      <div>{mortgage.endDate}</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          {mortgage.product}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Mortgages;
