
import { MortgageAccount, MortgageAccountStatus } from '@/types/mortgage-account';
import { format, addMonths, addDays } from 'date-fns';

// Helper function to generate mortgage numbers
const generateMortgageNumber = (idx: number): string => {
  return `MGT-${new Date().getFullYear()}-${String(idx).padStart(5, '0')}`;
};

// Helper to calculate random date from past X months
const randomPastDate = (months: number): string => {
  const date = addDays(
    addMonths(new Date(), -Math.floor(Math.random() * months)), 
    -Math.floor(Math.random() * 30)
  );
  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

// Helper for future date
const futureDate = (months: number): string => {
  return format(addMonths(new Date(), months), "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

// Generate mock mortgage accounts
export const mockMortgageAccounts: MortgageAccount[] = [
  {
    id: "mort-001",
    mortgageNumber: generateMortgageNumber(1),
    applicationId: "app-003", // Linked to an approved application
    customerId: "cust-003",
    customerName: "John Adewale",
    propertyId: "prop-002",
    propertyAddress: "7B Crescent Avenue, Lagos",
    
    financingType: "ijara",
    status: "active" as MortgageAccountStatus,
    creationDate: randomPastDate(6),
    activationDate: randomPastDate(5),
    maturityDate: futureDate(300),
    lastUpdated: randomPastDate(1),
    
    principalAmount: 36000000,
    equityContribution: 9000000,
    equityPercentage: 20,
    monthlyPayment: 150000,
    totalPayable: 45000000,
    rentRate: 5.5,
    tenor: 300,
    graceMonths: 0,
    
    scheduleType: "fixed",
    paymentDay: 5,
    totalScheduleItems: 300,
    completedPayments: 5,
    nextPaymentDate: futureDate(0),
    nextPaymentAmount: 150000,
    
    outstandingPrincipal: 35550000,
    outstandingRent: 8450000,
    currentBalance: 44000000,
    overdueDays: 0,
    overduePrincipal: 0,
    overdueProfitRent: 0,
    penalties: 0,
    
    ownershipPercentage: 1.5,
    transferEligible: false
  },
  {
    id: "mort-002",
    mortgageNumber: generateMortgageNumber(2),
    customerId: "cust-005",
    customerName: "Aminat Ibrahim",
    propertyId: "prop-005",
    propertyAddress: "45 Independence Avenue, Abuja",
    
    financingType: "murabaha",
    status: "active" as MortgageAccountStatus,
    creationDate: randomPastDate(14),
    activationDate: randomPastDate(12),
    maturityDate: futureDate(228),
    lastUpdated: randomPastDate(0),
    
    principalAmount: 25000000,
    equityContribution: 5000000,
    equityPercentage: 20,
    monthlyPayment: 118000,
    totalPayable: 28320000,
    profitRate: 6.0,
    tenor: 240,
    graceMonths: 1,
    
    scheduleType: "fixed",
    paymentDay: 15,
    totalScheduleItems: 240,
    completedPayments: 12,
    nextPaymentDate: futureDate(0),
    nextPaymentAmount: 118000,
    
    outstandingPrincipal: 22985000,
    outstandingProfit: 3900000,
    currentBalance: 26885000,
    overdueDays: 0,
    overduePrincipal: 0,
    overdueProfitRent: 0,
    penalties: 0,
    
    ownershipPercentage: 5,
    transferEligible: false
  },
  {
    id: "mort-003",
    mortgageNumber: generateMortgageNumber(3),
    customerId: "cust-008",
    customerName: "Chioma Eze",
    propertyId: "prop-010",
    propertyAddress: "18 Unity Road, Port Harcourt",
    
    financingType: "ijara",
    status: "in_arrears" as MortgageAccountStatus,
    creationDate: randomPastDate(24),
    activationDate: randomPastDate(23),
    maturityDate: futureDate(336),
    lastUpdated: randomPastDate(0),
    
    principalAmount: 40000000,
    equityContribution: 8000000,
    equityPercentage: 20,
    monthlyPayment: 165000,
    totalPayable: 59400000,
    rentRate: 6.2,
    tenor: 360,
    graceMonths: 0,
    
    scheduleType: "fixed",
    paymentDay: 10,
    totalScheduleItems: 360,
    completedPayments: 23,
    nextPaymentDate: futureDate(-1),
    nextPaymentAmount: 165000,
    
    outstandingPrincipal: 38125000,
    outstandingRent: 17600000,
    currentBalance: 55725000,
    overdueDays: 15,
    overduePrincipal: 165000,
    overdueProfitRent: 0,
    penalties: 5000,
    
    ownershipPercentage: 6.4,
    transferEligible: false
  },
  {
    id: "mort-004",
    mortgageNumber: generateMortgageNumber(4),
    customerId: "cust-012",
    customerName: "Mohammed Sani",
    propertyId: "prop-015",
    propertyAddress: "7 Ahmadu Bello Way, Kano",
    
    financingType: "musharaka",
    status: "restructured" as MortgageAccountStatus,
    creationDate: randomPastDate(36),
    activationDate: randomPastDate(35),
    maturityDate: futureDate(324),
    lastUpdated: randomPastDate(2),
    
    principalAmount: 30000000,
    equityContribution: 6000000,
    equityPercentage: 20,
    monthlyPayment: 120000, // Reduced from 140000
    totalPayable: 38880000,
    rentRate: 5.8,
    tenor: 324, // Extended from 240
    graceMonths: 0,
    
    scheduleType: "fixed",
    paymentDay: 20,
    totalScheduleItems: 324,
    completedPayments: 36,
    nextPaymentDate: futureDate(0),
    nextPaymentAmount: 120000,
    
    outstandingPrincipal: 26250000,
    outstandingRent: 10630000,
    currentBalance: 36880000,
    overdueDays: 0,
    overduePrincipal: 0,
    overdueProfitRent: 0,
    penalties: 0,
    
    ownershipPercentage: 12,
    transferEligible: false
  },
  {
    id: "mort-005",
    mortgageNumber: generateMortgageNumber(5),
    customerId: "cust-020",
    customerName: "Tunde Johnson",
    propertyId: "prop-022",
    propertyAddress: "15B Admiralty Way, Lekki, Lagos",
    
    financingType: "ijara",
    status: "default" as MortgageAccountStatus,
    creationDate: randomPastDate(18),
    activationDate: randomPastDate(17),
    maturityDate: futureDate(240),
    lastUpdated: randomPastDate(0),
    
    principalAmount: 45000000,
    equityContribution: 9000000,
    equityPercentage: 20,
    monthlyPayment: 225000,
    totalPayable: 54000000,
    rentRate: 6.0,
    tenor: 240,
    graceMonths: 0,
    
    scheduleType: "fixed",
    paymentDay: 25,
    totalScheduleItems: 240,
    completedPayments: 15,
    nextPaymentDate: futureDate(-2),
    nextPaymentAmount: 225000,
    
    outstandingPrincipal: 42187500,
    outstandingRent: 9562500,
    currentBalance: 51750000,
    overdueDays: 65,
    overduePrincipal: 675000,
    overdueProfitRent: 0,
    penalties: 35000,
    
    ownershipPercentage: 6.25,
    transferEligible: false
  },
  {
    id: "mort-006",
    mortgageNumber: generateMortgageNumber(6),
    customerId: "cust-025",
    customerName: "Fatima Abdullahi",
    propertyId: "prop-030",
    propertyAddress: "3 Maitama District, Abuja",
    
    financingType: "murabaha",
    status: "matured" as MortgageAccountStatus,
    creationDate: randomPastDate(62),
    activationDate: randomPastDate(60),
    maturityDate: randomPastDate(2),
    lastUpdated: randomPastDate(2),
    
    principalAmount: 20000000,
    equityContribution: 4000000,
    equityPercentage: 20,
    monthlyPayment: 100000,
    totalPayable: 24000000,
    profitRate: 5.0,
    tenor: 60,
    graceMonths: 0,
    
    scheduleType: "fixed",
    paymentDay: 1,
    totalScheduleItems: 60,
    completedPayments: 60,
    nextPaymentDate: undefined,
    nextPaymentAmount: 0,
    
    outstandingPrincipal: 0,
    outstandingProfit: 0,
    currentBalance: 0,
    overdueDays: 0,
    overduePrincipal: 0,
    overdueProfitRent: 0,
    penalties: 0,
    
    ownershipPercentage: 100,
    transferEligible: true
  },
  {
    id: "mort-007",
    mortgageNumber: generateMortgageNumber(7),
    customerId: "cust-030",
    customerName: "Chukwudi Okafor",
    propertyId: "prop-040",
    propertyAddress: "22 New GRA, Enugu",
    
    financingType: "ijara",
    status: "suspended" as MortgageAccountStatus,
    creationDate: randomPastDate(12),
    activationDate: randomPastDate(10),
    maturityDate: futureDate(170),
    lastUpdated: randomPastDate(1),
    
    principalAmount: 35000000,
    equityContribution: 7000000,
    equityPercentage: 20,
    monthlyPayment: 175000,
    totalPayable: 31500000,
    rentRate: 5.5,
    tenor: 180,
    graceMonths: 1,
    
    scheduleType: "fixed",
    paymentDay: 15,
    totalScheduleItems: 180,
    completedPayments: 10,
    nextPaymentDate: undefined, // Suspended, so no next payment date
    nextPaymentAmount: 175000,
    
    outstandingPrincipal: 33250000,
    outstandingRent: 6600000,
    currentBalance: 39850000,
    overdueDays: 0, // Not counting overdue days while suspended
    overduePrincipal: 0,
    overdueProfitRent: 0,
    penalties: 0,
    
    ownershipPercentage: 5,
    transferEligible: false
  },
  {
    id: "mort-008",
    mortgageNumber: generateMortgageNumber(8),
    customerId: "cust-035",
    customerName: "Blessing Adekunle",
    propertyId: "prop-050",
    propertyAddress: "5 Stadium Road, Uyo",
    
    financingType: "musharaka",
    status: "transferred" as MortgageAccountStatus,
    creationDate: randomPastDate(36),
    activationDate: randomPastDate(35),
    maturityDate: randomPastDate(5),
    lastUpdated: randomPastDate(5),
    
    principalAmount: 22000000,
    equityContribution: 4400000,
    equityPercentage: 20,
    monthlyPayment: 110000,
    totalPayable: 26400000,
    rentRate: 5.0,
    tenor: 240,
    graceMonths: 0,
    
    scheduleType: "fixed",
    paymentDay: 28,
    totalScheduleItems: 240,
    completedPayments: 240, // Fully paid via early settlement
    nextPaymentDate: undefined,
    nextPaymentAmount: 0,
    
    outstandingPrincipal: 0,
    outstandingRent: 0,
    currentBalance: 0,
    overdueDays: 0,
    overduePrincipal: 0,
    overdueProfitRent: 0,
    penalties: 0,
    
    ownershipPercentage: 100,
    transferEligible: false // Already transferred
  }
];

// Generate a mock payment schedule for a mortgage account
export const generateMockPaymentSchedule = (mortgageId: string, principal: number, payment: number, 
                                          tenor: number, startDate: Date, isIslamic: boolean = true) => {
  const scheduleItems = [];
  let balance = principal;
  let date = startDate;
  
  for (let i = 0; i < tenor; i++) {
    // For Islamic finance, we use rent instead of profit
    const principalComponent = payment * 0.7; // 70% goes to principal
    const profitRentComponent = payment * 0.3; // 30% goes to profit/rent
    
    balance -= principalComponent;
    
    const dueDate = format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
    const isPast = new Date(dueDate) < new Date();
    
    // Determine payment status
    let status: 'paid' | 'partially_paid' | 'overdue' | 'upcoming' | 'waived' = 'upcoming';
    let paymentDate;
    let paymentAmount;
    
    if (isPast) {
      const random = Math.random();
      if (i < 3) { // First few payments
        status = 'paid';
        paymentDate = dueDate;
        paymentAmount = payment;
      } else if (random < 0.8) { // 80% chance of being paid
        status = 'paid';
        paymentDate = dueDate;
        paymentAmount = payment;
      } else if (random < 0.9) { // 10% chance of partial payment
        status = 'partially_paid';
        paymentDate = dueDate;
        paymentAmount = Math.round(payment * 0.6); // 60% paid
      } else { // 10% chance of overdue
        status = 'overdue';
      }
    }
    
    scheduleItems.push({
      id: `sched-${mortgageId}-${i + 1}`,
      mortgageId,
      dueDate,
      amount: payment,
      principal: principalComponent,
      rent: isIslamic ? profitRentComponent : 0,
      profit: !isIslamic ? profitRentComponent : 0,
      cumulativePrincipal: principal - balance,
      remainingBalance: balance > 0 ? balance : 0,
      status,
      paymentDate,
      paymentAmount,
      ...(Math.random() > 0.7 && status === 'paid' ? { 
        paymentMethod: ['bank_transfer', 'direct_debit', 'online'][Math.floor(Math.random() * 3)],
        reference: `REF-${Math.floor(Math.random() * 1000000)}`
      } : {})
    });
    
    // Move to next month
    date = addMonths(date, 1);
  }
  
  return scheduleItems;
};

// Generate mock payment records based on the schedule
export const generateMockPayments = (schedule) => {
  return schedule
    .filter(item => item.status === 'paid' || item.status === 'partially_paid')
    .map((item, index) => ({
      id: `payment-${item.mortgageId}-${index + 1}`,
      mortgageId: item.mortgageId,
      scheduleItemId: item.id,
      date: item.paymentDate,
      amount: item.paymentAmount,
      method: item.paymentMethod || 'bank_transfer',
      reference: item.reference || `REF-${Math.floor(Math.random() * 1000000)}`,
      principalAmount: Math.round(item.paymentAmount * 0.7),
      rentAmount: Math.round(item.paymentAmount * 0.3),
      status: 'processed',
      processedBy: 'System',
      processedAt: item.paymentDate
    }));
};
