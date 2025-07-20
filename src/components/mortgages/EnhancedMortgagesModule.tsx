import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  FileText,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SimpleDatePicker from '@/components/ui/simple-date-picker';
import { mockMortgageAccounts } from '@/data/mockMortgageAccounts';

const EnhancedMortgagesModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMortgage, setSelectedMortgage] = useState(null);

  const portfolioStats = {
    totalPortfolio: 15750000000,
    activeAccounts: 2340,
    averageTicketSize: 6800000,
    defaultRate: 3.2,
    portfolioGrowth: 12.5,
    disbursedThisMonth: 450000000
  };

  const filteredMortgages = mockMortgageAccounts.filter(mortgage => {
    const matchesSearch = mortgage.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mortgage.mortgageNumber.includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || mortgage.status.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      delinquent: 'bg-red-100 text-red-800',
      restructured: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge variant="secondary" className={variants[status.toLowerCase()] || variants.active}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="fmbn-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Portfolio</p>
                <p className="text-xl font-bold text-fmbn-primary">
                  {formatCurrency(portfolioStats.totalPortfolio)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-fmbn-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+{portfolioStats.portfolioGrowth}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="fmbn-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Accounts</p>
                <p className="text-xl font-bold text-fmbn-secondary">
                  {portfolioStats.activeAccounts.toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-fmbn-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="fmbn-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Ticket Size</p>
                <p className="text-xl font-bold text-fmbn-accent">
                  {formatCurrency(portfolioStats.averageTicketSize)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-fmbn-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="fmbn-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Default Rate</p>
                <p className="text-xl font-bold text-red-600">
                  {portfolioStats.defaultRate}%
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="fmbn-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(portfolioStats.disbursedThisMonth)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="fmbn-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Performance</p>
                <p className="text-xl font-bold text-green-600">Excellent</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Portfolio Overview
          </TabsTrigger>
          <TabsTrigger value="accounts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Mortgage Accounts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Risk Management
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Payment Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="fmbn-card">
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Primary Mortgage</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-fmbn-primary rounded"></div>
                      <span>65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>NHF Loans</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-fmbn-secondary rounded"></div>
                      <span>25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estate Development</span>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-fmbn-accent rounded"></div>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="fmbn-card">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Disbursement Growth</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +15.2%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Collection Efficiency</span>
                    <span className="text-green-600">96.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>NPL Ratio</span>
                    <span className="text-red-600">3.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          {/* Filters and Search */}
          <Card className="fmbn-card">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 gap-4 items-center w-full">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search by name or account number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="delinquent">Delinquent</SelectItem>
                      <SelectItem value="restructured">Restructured</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <SimpleDatePicker />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mortgage Accounts Table */}
          <Card className="fmbn-card">
            <CardHeader>
              <CardTitle>Mortgage Accounts ({filteredMortgages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account No.</TableHead>
                    <TableHead>Borrower</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMortgages.slice(0, 10).map((mortgage) => (
                    <TableRow key={mortgage.mortgageNumber}>
                      <TableCell className="font-medium">
                        {mortgage.mortgageNumber}
                      </TableCell>
                      <TableCell>{mortgage.customerName}</TableCell>
                      <TableCell>{formatCurrency(mortgage.principalAmount)}</TableCell>
                      <TableCell>{formatCurrency(mortgage.currentBalance)}</TableCell>
                      <TableCell>{getStatusBadge(mortgage.status)}</TableCell>
                      <TableCell>{mortgage.nextPaymentDate || 'N/A'}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Payment History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="fmbn-card">
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Detailed portfolio analytics and reporting tools will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card className="fmbn-card">
            <CardHeader>
              <CardTitle>Risk Management Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Risk assessment tools and portfolio risk metrics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="fmbn-card">
            <CardHeader>
              <CardTitle>Payment Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Real-time payment tracking and collection management tools will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedMortgagesModule;