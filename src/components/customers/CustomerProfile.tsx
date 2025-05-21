import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  User,
  FileText,
  History,
  Home,
  Building,
  CreditCard,
  ShieldCheck,
  Edit,
  Save,
  X,
  Check,
  AlertTriangle,
  Clock,
  Users,
  Briefcase
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Customer, CustomerTag, CustomerDocument, CustomerStatus } from '@/types/customer';
import { mockCustomerLeases } from '@/data/mockCustomerData';

interface CustomerProfileProps {
  customer: Customer;
  onCustomerUpdated: (updatedCustomer: Customer) => void;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ 
  customer, 
  onCustomerUpdated 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const form = useForm({
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      alternatePhone: customer.alternatePhone || '',
      address: customer.address,
      city: customer.city,
      state: customer.state,
      postalCode: customer.postalCode || '',
      employer: customer.employer,
      occupation: customer.occupation,
      employerAddress: customer.employerAddress || '',
      monthlyIncome: customer.monthlyIncome,
      notes: customer.notes || ''
    }
  });
  
  const lease = mockCustomerLeases.find(l => l.customerId === customer.id);
  
  // Handle form submit
  const onSubmit = (data: any) => {
    const updatedCustomer = {
      ...customer,
      name: data.name,
      email: data.email,
      phone: data.phone,
      alternatePhone: data.alternatePhone,
      address: data.address,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      employer: data.employer,
      occupation: data.occupation,
      employerAddress: data.employerAddress,
      monthlyIncome: data.monthlyIncome,
      notes: data.notes,
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user'
    };
    
    // Update customer
    onCustomerUpdated(updatedCustomer);
    setIsEditing(false);
    toast.success("Customer information updated successfully");
  };
  
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Render verification status badge
  const renderVerificationBadge = (isVerified: boolean) => {
    if (isVerified) {
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200">
          <Check className="h-3 w-3 mr-1" /> Verified
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-amber-50 text-amber-700 border-amber-200">
          <Clock className="h-3 w-3 mr-1" /> Pending
        </Badge>
      );
    }
  };
  
  // Render status badge
  const renderStatusBadge = (status: CustomerStatus) => {
    switch(status) {
      case 'active':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case 'pending_verification':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> Pending Verification
          </Badge>
        );
      case 'suspended':
        return (
          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Suspended
          </Badge>
        );
      case 'blacklisted':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Blacklisted
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            <Check className="h-3 w-3 mr-1" /> Completed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-50 text-gray-700 border-gray-200">
            Unknown
          </Badge>
        );
    }
  };
  
  // Render tag badges
  const renderTagBadges = (tags: CustomerTag[]) => {
    if (!tags.length) return null;
    
    return (
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => {
          switch(tag) {
            case 'high_risk':
              return (
                <Badge key={tag} variant="outline" className="border-red-200 text-red-700">
                  High Risk
                </Badge>
              );
            case 'eligible_for_ownership':
              return (
                <Badge key={tag} variant="outline" className="border-green-200 text-green-700">
                  Eligible for Ownership
                </Badge>
              );
            case 'in_arrears':
              return (
                <Badge key={tag} variant="outline" className="border-amber-200 text-amber-700">
                  In Arrears
                </Badge>
              );
            case 'defaulting':
              return (
                <Badge key={tag} variant="outline" className="border-red-200 text-red-700">
                  Defaulting
                </Badge>
              );
            case 'good_standing':
              return (
                <Badge key={tag} variant="outline" className="border-blue-200 text-blue-700">
                  Good Standing
                </Badge>
              );
            case 'needs_review':
              return (
                <Badge key={tag} variant="outline" className="border-purple-200 text-purple-700">
                  Needs Review
                </Badge>
              );
            default:
              return (
                <Badge key={tag} variant="outline">
                  {tag.toString().replace(/_/g, ' ')}
                </Badge>
              );
          }
        })}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="relative pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{customer.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <span className="font-medium">ID: {customer.customerNumber}</span>
                •
                <span>{customer.email}</span>
                •
                <span>{customer.phone}</span>
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              {renderStatusBadge(customer.status)}
              {renderTagBadges(customer.tags)}
              
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                  <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
              <TabsTrigger value="personal">
                <User className="h-4 w-4 mr-2" /> Personal
              </TabsTrigger>
              <TabsTrigger value="address">
                <Home className="h-4 w-4 mr-2" /> Address
              </TabsTrigger>
              <TabsTrigger value="employment">
                <Briefcase className="h-4 w-4 mr-2" /> Employment
              </TabsTrigger>
              <TabsTrigger value="documents">
                <FileText className="h-4 w-4 mr-2" /> Documents
              </TabsTrigger>
              <TabsTrigger value="lease">
                <Building className="h-4 w-4 mr-2" /> Lease
              </TabsTrigger>
              <TabsTrigger value="financial">
                <CreditCard className="h-4 w-4 mr-2" /> Financial
              </TabsTrigger>
              <TabsTrigger value="audit">
                <History className="h-4 w-4 mr-2" /> Activity
              </TabsTrigger>
            </TabsList>
            
            {/* Personal Information */}
            <TabsContent value="personal" className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {isEditing ? (
                    // Editable personal information
                    <>
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...form.register('name')}
                          defaultValue={customer.name}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register('email')}
                          defaultValue={customer.email}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          {...form.register('phone')}
                          defaultValue={customer.phone}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="alternatePhone">Alternate Phone</Label>
                        <Input
                          id="alternatePhone"
                          {...form.register('alternatePhone')}
                          defaultValue={customer.alternatePhone || ''}
                        />
                      </div>
                    </>
                  ) : (
                    // Read-only personal information
                    <>
                      <div>
                        <Label className="text-muted-foreground">Full Name</Label>
                        <p className="mt-1">{customer.name}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Gender</Label>
                        <p className="mt-1 capitalize">{customer.gender}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Email Address</Label>
                        <p className="mt-1">{customer.email}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Phone Number</Label>
                        <p className="mt-1">{customer.phone}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Alternate Phone</Label>
                        <p className="mt-1">{customer.alternatePhone || "N/A"}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Date of Birth</Label>
                        <p className="mt-1">{formatDate(customer.dateOfBirth)}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Marital Status</Label>
                        <p className="mt-1 capitalize">{customer.maritalStatus}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Customer Type</Label>
                        <p className="mt-1 capitalize">{customer.customerType.replace('_', ' ')}</p>
                      </div>
                    </>
                  )}
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <Label className="text-muted-foreground">National ID (NIN)</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <p>{customer.nationalId}</p>
                      {renderVerificationBadge(customer.verification.ninVerified)}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Bank Verification Number (BVN)</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <p>{customer.bvn}</p>
                      {renderVerificationBadge(customer.verification.bvnVerified)}
                    </div>
                  </div>
                </div>
                
                {customer.customerType === "nhf_contributor" && (
                  <>
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <Label className="text-muted-foreground">NHF Contributor ID</Label>
                        <p className="mt-1">{customer.nhfContributorId || "N/A"}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">NHF Registration Date</Label>
                        <p className="mt-1">{formatDate(customer.nhfRegistrationDate)}</p>
                      </div>
                    </div>
                  </>
                )}
                
                {isEditing && (
                  <>
                    <Separator />
                    
                    <div>
                      <Label htmlFor="notes">Notes</Label>
                      <textarea
                        id="notes"
                        {...form.register('notes')}
                        defaultValue={customer.notes || ''}
                        className="w-full h-24 p-2 mt-1 border rounded-md"
                        placeholder="Additional notes about this customer..."
                      />
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            
            {/* Address Information */}
            <TabsContent value="address" className="pt-6">
              <div className="space-y-6">
                {isEditing ? (
                  // Editable address information
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        {...form.register('address')}
                        defaultValue={customer.address}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        {...form.register('city')}
                        defaultValue={customer.city}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="state">State</Label>
                      <select
                        id="state"
                        {...form.register('state')}
                        defaultValue={customer.state}
                        className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select State</option>
                        <option value="Abia">Abia</option>
                        <option value="Adamawa">Adamawa</option>
                        <option value="Akwa Ibom">Akwa Ibom</option>
                        <option value="Anambra">Anambra</option>
                        <option value="Bauchi">Bauchi</option>
                        <option value="Bayelsa">Bayelsa</option>
                        <option value="Benue">Benue</option>
                        <option value="Borno">Borno</option>
                        <option value="Cross River">Cross River</option>
                        <option value="Delta">Delta</option>
                        <option value="Ebonyi">Ebonyi</option>
                        <option value="Edo">Edo</option>
                        <option value="Ekiti">Ekiti</option>
                        <option value="Enugu">Enugu</option>
                        <option value="FCT">Federal Capital Territory</option>
                        <option value="Gombe">Gombe</option>
                        <option value="Imo">Imo</option>
                        <option value="Jigawa">Jigawa</option>
                        <option value="Kaduna">Kaduna</option>
                        <option value="Kano">Kano</option>
                        <option value="Katsina">Katsina</option>
                        <option value="Kebbi">Kebbi</option>
                        <option value="Kogi">Kogi</option>
                        <option value="Kwara">Kwara</option>
                        <option value="Lagos">Lagos</option>
                        <option value="Nasarawa">Nasarawa</option>
                        <option value="Niger">Niger</option>
                        <option value="Ogun">Ogun</option>
                        <option value="Ondo">Ondo</option>
                        <option value="Osun">Osun</option>
                        <option value="Oyo">Oyo</option>
                        <option value="Plateau">Plateau</option>
                        <option value="Rivers">Rivers</option>
                        <option value="Sokoto">Sokoto</option>
                        <option value="Taraba">Taraba</option>
                        <option value="Yobe">Yobe</option>
                        <option value="Zamfara">Zamfara</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        {...form.register('postalCode')}
                        defaultValue={customer.postalCode || ''}
                      />
                    </div>
                  </div>
                ) : (
                  // Read-only address information
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <Label className="text-muted-foreground">Street Address</Label>
                      <p className="mt-1">{customer.address}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">City</Label>
                      <p className="mt-1">{customer.city}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">State</Label>
                      <p className="mt-1">{customer.state}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Postal Code</Label>
                      <p className="mt-1">{customer.postalCode || "N/A"}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Address Verification</Label>
                      <div className="mt-1">
                        {renderVerificationBadge(customer.verification.addressVerified)}
                        <span className="text-sm text-muted-foreground ml-2">
                          {customer.verification.addressVerified 
                            ? `Verified on ${formatDate(customer.verification.addressVerificationDate)}` 
                            : "Pending verification"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Employment Information */}
            <TabsContent value="employment" className="pt-6">
              <div className="space-y-6">
                {isEditing ? (
                  // Editable employment information
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <Label htmlFor="employer">Employer</Label>
                      <Input
                        id="employer"
                        {...form.register('employer')}
                        defaultValue={customer.employer}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        {...form.register('occupation')}
                        defaultValue={customer.occupation}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="employerAddress">Employer Address</Label>
                      <Input
                        id="employerAddress"
                        {...form.register('employerAddress')}
                        defaultValue={customer.employerAddress || ''}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="monthlyIncome">Monthly Income (₦)</Label>
                      <Input
                        id="monthlyIncome"
                        type="number"
                        {...form.register('monthlyIncome', { 
                          valueAsNumber: true 
                        })}
                        defaultValue={customer.monthlyIncome}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="employmentStartDate">Employment Start Date</Label>
                      <Input
                        id="employmentStartDate"
                        type="date"
                        readOnly
                        disabled
                        value={customer.employmentStartDate}
                      />
                    </div>
                  </div>
                ) : (
                  // Read-only employment information
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <Label className="text-muted-foreground">Employer</Label>
                      <p className="mt-1">{customer.employer}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Occupation</Label>
                      <p className="mt-1">{customer.occupation}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Employer Address</Label>
                      <p className="mt-1">{customer.employerAddress || "N/A"}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Monthly Income</Label>
                      <p className="mt-1">{formatCurrency(customer.monthlyIncome)}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Employment Start Date</Label>
                      <p className="mt-1">{formatDate(customer.employmentStartDate)}</p>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Employment Verification</Label>
                      <div className="mt-1">
                        {renderVerificationBadge(customer.verification.employmentVerified)}
                        <span className="text-sm text-muted-foreground ml-2">
                          {customer.verification.employmentVerified 
                            ? `Verified on ${formatDate(customer.verification.employmentVerificationDate)}` 
                            : "Pending verification"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Documents */}
            <TabsContent value="documents" className="pt-6">
              <div className="space-y-6">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Type</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Verification Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.documents.length > 0 ? (
                        customer.documents.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium capitalize">
                              {doc.documentType.replace('_', ' ')}
                            </TableCell>
                            <TableCell>{formatDate(doc.uploadDate)}</TableCell>
                            <TableCell>
                              {renderVerificationBadge(doc.verified)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4 mr-2" /> View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            No documents uploaded yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" /> Upload New Document
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Lease Information */}
            <TabsContent value="lease" className="pt-6">
              {lease ? (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-blue-700" />
                      <div>
                        <h4 className="font-medium text-blue-700">Active Lease Agreement</h4>
                        <p className="text-sm text-blue-600">
                          Lease #{lease.leaseNumber} • Started on {formatDate(lease.startDate)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Contract</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 space-y-2">
                      <Label className="text-muted-foreground">Lease Status</Label>
                      <div className="flex items-center gap-2">
                        <Badge className={`
                          ${lease.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                          ${lease.status === 'defaulting' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                          ${lease.status === 'completed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                          ${lease.status === 'terminated' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                        `}>
                          {lease.status === 'active' && <Check className="h-3 w-3 mr-1" />}
                          {lease.status === 'defaulting' && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {lease.status === 'completed' && <Check className="h-3 w-3 mr-1" />}
                          {lease.status === 'terminated' && <X className="h-3 w-3 mr-1" />}
                          <span className="capitalize">{lease.status}</span>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 space-y-2">
                      <Label className="text-muted-foreground">Property Information</Label>
                      <div className="font-medium">Unit #{lease.unitId}</div>
                      <div className="text-sm text-muted-foreground">
                        Property ID: {lease.propertyId}
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 space-y-2">
                      <Label className="text-muted-foreground">Lease Timeframe</Label>
                      <div className="font-medium">
                        {formatDate(lease.startDate)} - {formatDate(lease.maturityDate)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(lease.maturityDate).getFullYear() - new Date(lease.startDate).getFullYear()} year term
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium mb-2">Financial Summary</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-md p-4 space-y-2">
                          <Label className="text-muted-foreground">Monthly Payment</Label>
                          <div className="text-lg font-medium">{formatCurrency(lease.monthlyPayment)}</div>
                        </div>
                        
                        <div className="border rounded-md p-4 space-y-2">
                          <Label className="text-muted-foreground">Total Property Value</Label>
                          <div className="text-lg font-medium">{formatCurrency(lease.totalValue)}</div>
                        </div>
                        
                        <div className="border rounded-md p-4 space-y-2">
                          <Label className="text-muted-foreground">Paid To Date</Label>
                          <div className="text-lg font-medium text-green-600">{formatCurrency(lease.paidToDate)}</div>
                        </div>
                        
                        <div className="border rounded-md p-4 space-y-2">
                          <Label className="text-muted-foreground">Remaining Balance</Label>
                          <div className="text-lg font-medium text-gray-800">{formatCurrency(lease.remainingBalance)}</div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 space-y-2">
                        <Label className="text-muted-foreground">Ownership Progress</Label>
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${lease.ownershipPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{lease.ownershipPercentage}%</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-muted-foreground">Payment Schedule</Label>
                          <Button variant="ghost" size="sm" className="text-xs">View Schedule</Button>
                        </div>
                        <div>
                          <div className="font-medium">Next payment: {formatDate(lease.nextPaymentDate)}</div>
                          <div className="text-sm text-muted-foreground">
                            {lease.lastPaymentDate ? `Last paid on ${formatDate(lease.lastPaymentDate)}` : 'No payments recorded yet'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-medium mb-2">Lease Details</h4>
                      
                      <div className="border rounded-md p-4 space-y-6">
                        <div className="flex justify-between">
                          <Label className="text-muted-foreground">Takaful Insurance</Label>
                          <Badge variant="outline" className="border-blue-200 text-blue-700">
                            Active
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Policy ID: {lease.takafulPolicyId || 'N/A'}
                        </div>
                        <div className="border-t pt-4">
                          <Button variant="outline" size="sm" className="w-full">View Policy Details</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <Label className="text-muted-foreground">Contract Documents</Label>
                        </div>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Ijarah Contract</span>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Payment Schedule</span>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-start gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Terms and Conditions</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-4">
                          <Label className="text-muted-foreground">Special Conditions</Label>
                        </div>
                        <div className="text-sm text-gray-500 italic">
                          No special conditions recorded for this lease agreement.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Building className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Lease Agreement Found</h3>
                  <p className="text-muted-foreground mb-6 text-center max-w-md">
                    This customer doesn't have an active lease agreement in the system.
                  </p>
                  <Button>Create New Lease</Button>
                </div>
              )}
            </TabsContent>
            
            {/* Financial Information */}
            <TabsContent value="financial" className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border rounded-md p-4">
                    <div className="text-sm text-muted-foreground mb-1">Monthly Income</div>
                    <div className="text-2xl font-bold">{formatCurrency(customer.monthlyIncome)}</div>
                  </div>
                  
                  <div className="bg-white border rounded-md p-4">
                    <div className="text-sm text-muted-foreground mb-1">Monthly Obligation</div>
                    <div className="text-2xl font-bold">{lease ? formatCurrency(lease.monthlyPayment) : '₦0'}</div>
                  </div>
                  
                  <div className="bg-white border rounded-md p-4">
                    <div className="text-sm text-muted-foreground mb-1">Debt Service Ratio</div>
                    <div className="text-2xl font-bold">
                      {lease ? `${Math.round((lease.monthlyPayment / customer.monthlyIncome) * 100)}%` : '0%'}
                    </div>
                  </div>
                </div>
                
                {customer.riskProfile && (
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-4 flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-2" />
                      Risk Profile
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Risk Category</Label>
                        <div className="mt-1">
                          <Badge className={`
                            ${customer.riskProfile.riskCategory === 'low' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                            ${customer.riskProfile.riskCategory === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                            ${customer.riskProfile.riskCategory === 'high' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                            ${customer.riskProfile.riskCategory === 'critical' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                          `}>
                            <span className="capitalize">{customer.riskProfile.riskCategory}</span>
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Contribution Regularity</Label>
                        <p className="mt-1 capitalize">{customer.riskProfile.contributionRegularity}</p>
                      </div>
                      
                      <div>
                        <Label className="text-muted-foreground">Default History</Label>
                        <p className="mt-1 capitalize">{customer.riskProfile.defaultHistory}</p>
                      </div>
                    </div>
                    
                    {customer.riskProfile.recommendations && customer.riskProfile.recommendations.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <Label className="text-muted-foreground">Recommendations</Label>
                        <ul className="mt-1 list-disc pl-5 space-y-1">
                          {customer.riskProfile.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm">{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-4">Payment History</h4>
                  <div className="bg-muted/30 p-6 rounded-md flex flex-col items-center justify-center">
                    <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground mb-2">No payment records available</p>
                    <Button variant="outline" size="sm">View Payment History</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Activity History */}
            <TabsContent value="audit" className="pt-6">
              <div className="space-y-6">
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden md:table-cell">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">{formatDate(customer.createdAt)}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(customer.createdAt).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell>Customer Created</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{customer.createdBy}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          Initial customer registration
                        </TableCell>
                      </TableRow>
                      
                      {customer.updatedAt !== customer.createdAt && (
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">{formatDate(customer.updatedAt)}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(customer.updatedAt).toLocaleTimeString()}
                            </div>
                          </TableCell>
                          <TableCell>Customer Updated</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{customer.updatedBy}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Customer information updated
                          </TableCell>
                        </TableRow>
                      )}
                      
                      {customer.verification.ninVerified && (
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">{formatDate(customer.verification.ninVerificationDate)}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.verification.ninVerificationDate && 
                                new Date(customer.verification.ninVerificationDate).toLocaleTimeString()}
                            </div>
                          </TableCell>
                          <TableCell>NIN Verified</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                              <span>System</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            National ID verification completed
                          </TableCell>
                        </TableRow>
                      )}
                      
                      {customer.verification.bvnVerified && (
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">{formatDate(customer.verification.bvnVerificationDate)}</div>
                            <div className="text-xs text-muted-foreground">
                              {customer.verification.bvnVerificationDate && 
                                new Date(customer.verification.bvnVerificationDate).toLocaleTimeString()}
                            </div>
                          </TableCell>
                          <TableCell>BVN Verified</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                              <span>System</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            Bank Verification Number validated
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">View Full Audit Log</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerProfile;
