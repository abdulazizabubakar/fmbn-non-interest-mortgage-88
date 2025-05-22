import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  UserPlus, 
  Building, 
  Briefcase, 
  FileText, 
  CreditCard,
  Check,
  Upload,
  RefreshCw
} from 'lucide-react';
import { CustomerType, Customer, CustomerDocument } from '@/types/customer';

// Define customer onboarding schema
const personalInfoSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  alternatePhone: z.string().optional(),
  nationalId: z.string().min(5, "National ID is required"),
  bvn: z.string().min(8, "BVN is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender"
  }),
  maritalStatus: z.enum(["single", "married", "divorced", "widowed"], {
    required_error: "Please select a marital status"
  })
});

const addressSchema = z.object({
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().optional()
});

const employmentSchema = z.object({
  employer: z.string().min(2, "Employer name is required"),
  employerAddress: z.string().optional(),
  occupation: z.string().min(2, "Occupation is required"),
  monthlyIncome: z.coerce.number().min(1, "Monthly income is required"),
  employmentStartDate: z.string().min(1, "Employment start date is required")
});

const classificationSchema = z.object({
  customerType: z.enum(["new_applicant", "nhf_contributor", "diaspora", "government_worker", "private_sector", "cooperative"], {
    required_error: "Please select a customer type"
  }),
  nhfContributorId: z.string().optional(),
  nhfRegistrationDate: z.string().optional(),
  notes: z.string().optional()
});

// Combine schemas
const customerOnboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  employment: employmentSchema,
  classification: classificationSchema
});

// Define types
type CustomerOnboardingForm = z.infer<typeof customerOnboardingSchema>;

interface CustomerOnboardingProps {
  onCustomerCreated: (customer: Customer) => void;
}

const CustomerOnboarding: React.FC<CustomerOnboardingProps> = ({ onCustomerCreated }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [verifyingNIN, setVerifyingNIN] = useState(false);
  const [verifyingBVN, setVerifyingBVN] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<CustomerDocument[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<CustomerOnboardingForm>({
    resolver: zodResolver(customerOnboardingSchema),
    defaultValues: {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        alternatePhone: "",
        nationalId: "",
        bvn: "",
        dateOfBirth: "",
        gender: "male",
        maritalStatus: "single"
      },
      address: {
        address: "",
        city: "",
        state: "",
        postalCode: ""
      },
      employment: {
        employer: "",
        employerAddress: "",
        occupation: "",
        monthlyIncome: 0,
        employmentStartDate: ""
      },
      classification: {
        customerType: "new_applicant",
        nhfContributorId: "",
        nhfRegistrationDate: "",
        notes: ""
      }
    }
  });
  
  // Submit handler
  const onSubmit = (data: CustomerOnboardingForm) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      try {
        // Create new customer object
        const newCustomer: Customer = {
          id: `cust-${Math.floor(Math.random() * 100000)}`,
          customerNumber: `NHF-${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          name: data.personalInfo.name,
          email: data.personalInfo.email,
          phone: data.personalInfo.phone,
          alternatePhone: data.personalInfo.alternatePhone,
          nationalId: data.personalInfo.nationalId,
          bvn: data.personalInfo.bvn,
          dateOfBirth: data.personalInfo.dateOfBirth,
          gender: data.personalInfo.gender,
          maritalStatus: data.personalInfo.maritalStatus,
          
          address: data.address.address,
          city: data.address.city,
          state: data.address.state,
          postalCode: data.address.postalCode,
          
          employer: data.employment.employer,
          employerAddress: data.employment.employerAddress,
          occupation: data.employment.occupation,
          monthlyIncome: data.employment.monthlyIncome,
          employmentStartDate: data.employment.employmentStartDate,
          
          customerType: data.classification.customerType as CustomerType,
          status: "pending_verification",
          tags: ["needs_review"],
          nhfContributorId: data.classification.nhfContributorId,
          nhfRegistrationDate: data.classification.nhfRegistrationDate,
          
          documents: uploadedDocuments,
          verification: {
            ninVerified: false,
            bvnVerified: false,
            employmentVerified: false,
            addressVerified: false
          },
          
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "current-user",
          updatedBy: "current-user", // Added the missing property
          notes: data.classification.notes
        };
        
        // Pass the new customer to parent
        onCustomerCreated(newCustomer);
        
        // Show success message
        toast.success("Customer created successfully");
        
        // Reset form
        form.reset();
        setUploadedDocuments([]);
      } catch (error) {
        console.error("Error creating customer:", error);
        toast.error("Failed to create customer. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };
  
  // Handle NIN verification
  const verifyNIN = () => {
    const nin = form.getValues("personalInfo.nationalId");
    if (!nin || nin.length < 5) {
      toast.error("Please enter a valid NIN");
      return;
    }
    
    setVerifyingNIN(true);
    
    // Simulate API call
    setTimeout(() => {
      setVerifyingNIN(false);
      toast.success("NIN verified successfully");
    }, 2000);
  };
  
  // Handle BVN verification
  const verifyBVN = () => {
    const bvn = form.getValues("personalInfo.bvn");
    if (!bvn || bvn.length < 8) {
      toast.error("Please enter a valid BVN");
      return;
    }
    
    setVerifyingBVN(true);
    
    // Simulate API call
    setTimeout(() => {
      setVerifyingBVN(false);
      toast.success("BVN verified successfully");
    }, 2000);
  };
  
  // Handle document upload
  const handleDocumentUpload = (type: "id_card" | "employment_letter" | "payslip" | "utility_bill" | "photograph" | "other") => {
    // Simulate document upload
    const newDocument: CustomerDocument = {
      id: `doc-${Math.floor(Math.random() * 100000)}`,
      customerId: "",
      documentType: type,
      documentUrl: `/documents/${type}_${Math.floor(Math.random() * 100000)}.pdf`,
      verified: false,
      uploadDate: new Date().toISOString()
    };
    
    setUploadedDocuments([...uploadedDocuments, newDocument]);
    toast.success(`${type.replace('_', ' ')} uploaded successfully`);
  };
  
  // Move to next tab
  const moveToNextTab = () => {
    if (activeTab === "personal") setActiveTab("address");
    else if (activeTab === "address") setActiveTab("employment");
    else if (activeTab === "employment") setActiveTab("documents");
    else if (activeTab === "documents") setActiveTab("classification");
  };
  
  // Move to previous tab
  const moveToPreviousTab = () => {
    if (activeTab === "classification") setActiveTab("documents");
    else if (activeTab === "documents") setActiveTab("employment");
    else if (activeTab === "employment") setActiveTab("address");
    else if (activeTab === "address") setActiveTab("personal");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" /> Customer Onboarding
        </CardTitle>
        <CardDescription>
          Register a new customer to the FMBN Non-Interest Rent-to-Own system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="classification">Classification</TabsTrigger>
              </TabsList>
              
              {/* Personal Information */}
              <TabsContent value="personal">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full legal name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                              {...field}
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marital Status</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                              {...field}
                            >
                              <option value="single">Single</option>
                              <option value="married">Married</option>
                              <option value="divorced">Divorced</option>
                              <option value="widowed">Widowed</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +2348012345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="personalInfo.alternatePhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternate Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Alternate phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.nationalId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>National ID Number (NIN)</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="National ID number" {...field} />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="secondary" 
                              onClick={verifyNIN}
                              disabled={verifyingNIN || !field.value}
                            >
                              {verifyingNIN ? (
                                <>
                                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Verifying
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" /> Verify
                                </>
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.bvn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Verification Number (BVN)</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input placeholder="BVN" {...field} />
                            </FormControl>
                            <Button 
                              type="button" 
                              variant="secondary"
                              onClick={verifyBVN}
                              disabled={verifyingBVN || !field.value}
                            >
                              {verifyingBVN ? (
                                <>
                                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Verifying
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" /> Verify
                                </>
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button type="button" onClick={moveToNextTab}>
                    Next: Address Information
                  </Button>
                </div>
              </TabsContent>
              
              {/* Address Information */}
              <TabsContent value="address">
                <div className="space-y-4">
                  <div className="mb-4">
                    <h3 className="flex items-center text-lg font-semibold">
                      <Building className="mr-2 h-5 w-5" /> Address Information
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter the customer's current residential address
                    </p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                              {...field}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={moveToNextTab}>
                    Next: Employment Information
                  </Button>
                </div>
              </TabsContent>
              
              {/* Employment Information */}
              <TabsContent value="employment">
                <div className="space-y-4">
                  <div className="mb-4">
                    <h3 className="flex items-center text-lg font-semibold">
                      <Briefcase className="mr-2 h-5 w-5" /> Employment Information
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enter the customer's current employment details
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="employment.employer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employer Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Employer name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employment.occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation/Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Job title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="employment.employerAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employer Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Employer address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="employment.monthlyIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Income (₦)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Monthly income in Naira" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employment.employmentStartDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={moveToNextTab}>
                    Next: Document Upload
                  </Button>
                </div>
              </TabsContent>
              
              {/* Document Upload */}
              <TabsContent value="documents">
                <div className="space-y-6">
                  <div className="mb-4">
                    <h3 className="flex items-center text-lg font-semibold">
                      <FileText className="mr-2 h-5 w-5" /> Required Documents
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Upload all required customer documents for KYC verification
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ID Card */}
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label>National ID Card</Label>
                          <p className="text-sm text-muted-foreground">
                            National ID card, voter's card, or int'l passport
                          </p>
                        </div>
                        <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          Required
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 border border-dashed rounded-md flex flex-col items-center justify-center p-4">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">PDF, JPG, or PNG</p>
                        <Button
                          type="button" 
                          variant="secondary" 
                          onClick={() => handleDocumentUpload("id_card")}
                          disabled={uploadedDocuments.some(doc => doc.documentType === "id_card")}
                        >
                          {uploadedDocuments.some(doc => doc.documentType === "id_card") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Uploaded
                            </>
                          ) : "Upload ID"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Employment Letter */}
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label>Employment Letter</Label>
                          <p className="text-sm text-muted-foreground">
                            Employment confirmation letter
                          </p>
                        </div>
                        <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          Required
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 border border-dashed rounded-md flex flex-col items-center justify-center p-4">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">PDF format only</p>
                        <Button
                          type="button" 
                          variant="secondary" 
                          onClick={() => handleDocumentUpload("employment_letter")}
                          disabled={uploadedDocuments.some(doc => doc.documentType === "employment_letter")}
                        >
                          {uploadedDocuments.some(doc => doc.documentType === "employment_letter") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Uploaded
                            </>
                          ) : "Upload Letter"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Payslip */}
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label>Recent Payslip</Label>
                          <p className="text-sm text-muted-foreground">
                            Last 3 months payslip or bank statement
                          </p>
                        </div>
                        <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          Required
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 border border-dashed rounded-md flex flex-col items-center justify-center p-4">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">PDF format preferred</p>
                        <Button
                          type="button" 
                          variant="secondary" 
                          onClick={() => handleDocumentUpload("payslip")}
                          disabled={uploadedDocuments.some(doc => doc.documentType === "payslip")}
                        >
                          {uploadedDocuments.some(doc => doc.documentType === "payslip") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Uploaded
                            </>
                          ) : "Upload Payslip"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Utility Bill */}
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label>Utility Bill</Label>
                          <p className="text-sm text-muted-foreground">
                            Recent electricity, water, or internet bill
                          </p>
                        </div>
                        <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          Required
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 border border-dashed rounded-md flex flex-col items-center justify-center p-4">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Not older than 3 months</p>
                        <Button
                          type="button" 
                          variant="secondary" 
                          onClick={() => handleDocumentUpload("utility_bill")}
                          disabled={uploadedDocuments.some(doc => doc.documentType === "utility_bill")}
                        >
                          {uploadedDocuments.some(doc => doc.documentType === "utility_bill") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Uploaded
                            </>
                          ) : "Upload Bill"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Photograph */}
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label>Recent Photograph</Label>
                          <p className="text-sm text-muted-foreground">
                            Passport-sized photograph with plain background
                          </p>
                        </div>
                        <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                          Required
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 border border-dashed rounded-md flex flex-col items-center justify-center p-4">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">JPG or PNG format</p>
                        <Button
                          type="button" 
                          variant="secondary" 
                          onClick={() => handleDocumentUpload("photograph")}
                          disabled={uploadedDocuments.some(doc => doc.documentType === "photograph")}
                        >
                          {uploadedDocuments.some(doc => doc.documentType === "photograph") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Uploaded
                            </>
                          ) : "Upload Photo"}
                        </Button>
                      </div>
                    </div>
                    
                    {/* Any Other Document */}
                    <div className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label>Other Supporting Documents</Label>
                          <p className="text-sm text-muted-foreground">
                            Any additional supporting documents
                          </p>
                        </div>
                        <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          Optional
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 border border-dashed rounded-md flex flex-col items-center justify-center p-4">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Any format</p>
                        <Button
                          type="button" 
                          variant="secondary" 
                          onClick={() => handleDocumentUpload("other")}
                          disabled={uploadedDocuments.some(doc => doc.documentType === "other")}
                        >
                          {uploadedDocuments.some(doc => doc.documentType === "other") ? (
                            <>
                              <Check className="mr-2 h-4 w-4" /> Uploaded
                            </>
                          ) : "Upload Document"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={moveToNextTab}
                    disabled={!uploadedDocuments.some(doc => 
                      doc.documentType === "id_card" || 
                      doc.documentType === "employment_letter" ||
                      doc.documentType === "payslip"
                    )}
                  >
                    Next: Classification
                  </Button>
                </div>
              </TabsContent>
              
              {/* Customer Classification */}
              <TabsContent value="classification">
                <div className="space-y-6">
                  <div className="mb-4">
                    <h3 className="flex items-center text-lg font-semibold">
                      <CreditCard className="mr-2 h-5 w-5" /> Customer Classification
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Categorize the customer for appropriate mortgage offerings
                    </p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="classification.customerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Type</FormLabel>
                        <FormControl>
                          <select
                            className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background"
                            {...field}
                          >
                            <option value="new_applicant">New Applicant</option>
                            <option value="nhf_contributor">Existing NHF Contributor</option>
                            <option value="diaspora">Diaspora</option>
                            <option value="government_worker">Government Worker</option>
                            <option value="private_sector">Private Sector</option>
                            <option value="cooperative">Cooperative Member</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("classification.customerType") === "nhf_contributor" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="classification.nhfContributorId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NHF Contributor ID</FormLabel>
                            <FormControl>
                              <Input placeholder="NHF Contributor ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="classification.nhfRegistrationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NHF Registration Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  <FormField
                    control={form.control}
                    name="classification.notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional notes about this customer..." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="font-medium text-blue-700">Registration Summary</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Please review all information before submitting. Once submitted, the customer will be registered in the system and assigned a unique Customer ID.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={moveToPreviousTab}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="min-w-32">
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : "Register Customer"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t p-6 flex flex-col gap-4">
        <div className="flex justify-between w-full text-sm">
          <div>
            <span className="font-medium">Upload Status:</span>
            <span className="text-muted-foreground ml-1">
              {uploadedDocuments.length}/6 documents uploaded
            </span>
          </div>
          <div>
            <span className="font-medium">Verification Status:</span>
            <span className="text-muted-foreground ml-1">
              NIN/BVN verification required
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomerOnboarding;
