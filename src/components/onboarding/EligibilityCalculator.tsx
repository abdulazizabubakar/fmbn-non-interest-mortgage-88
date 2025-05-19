
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle } from 'lucide-react';

const EligibilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(500000);
  const [propertyValue, setPropertyValue] = useState<number>(30000000);
  const [downPayment, setDownPayment] = useState<number>(6000000);
  const [tenor, setTenor] = useState<number>(180);
  const [employmentStatus, setEmploymentStatus] = useState<string>('employed');
  const [calculationResult, setCalculationResult] = useState<{
    eligible: boolean;
    maxAmount?: number;
    monthlyPayment?: number;
    message: string;
  } | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCalculate = () => {
    // Simple eligibility calculation
    const downPaymentPercentage = (downPayment / propertyValue) * 100;
    const financingAmount = propertyValue - downPayment;
    const maxMonthlyPayment = monthlyIncome * 0.33; // 33% of monthly income
    
    // For Murabaha, we use an approximate equivalent of 6% profit rate (not interest)
    const profitRate = 0.06;
    const monthlyProfit = (financingAmount * profitRate) / 12;
    const monthlyPrincipal = financingAmount / tenor;
    const totalMonthlyPayment = monthlyPrincipal + monthlyProfit;
    
    const eligible = downPaymentPercentage >= 20 && totalMonthlyPayment <= maxMonthlyPayment;
    
    setCalculationResult({
      eligible,
      maxAmount: eligible ? financingAmount : undefined,
      monthlyPayment: eligible ? totalMonthlyPayment : undefined,
      message: eligible 
        ? 'You are eligible for non-interest mortgage financing!' 
        : 'Based on the information provided, you may not be eligible. Please adjust your inputs or contact our team.'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eligibility Calculator</CardTitle>
        <CardDescription>
          Check your eligibility for non-interest mortgage financing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employmentStatus">Employment Status</Label>
            <Select 
              value={employmentStatus} 
              onValueChange={setEmploymentStatus}
            >
              <SelectTrigger id="employmentStatus">
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed">Employed</SelectItem>
                <SelectItem value="self-employed">Self-employed</SelectItem>
                <SelectItem value="business-owner">Business Owner</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="monthlyIncome">Monthly Income</Label>
              <span className="text-sm">{formatCurrency(monthlyIncome)}</span>
            </div>
            <Slider
              id="monthlyIncome"
              min={100000}
              max={2000000}
              step={50000}
              value={[monthlyIncome]}
              onValueChange={(values) => setMonthlyIncome(values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="propertyValue">Property Value</Label>
              <span className="text-sm">{formatCurrency(propertyValue)}</span>
            </div>
            <Slider
              id="propertyValue"
              min={5000000}
              max={100000000}
              step={1000000}
              value={[propertyValue]}
              onValueChange={(values) => setPropertyValue(values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="downPayment">Down Payment (min 20%)</Label>
              <span className="text-sm">{formatCurrency(downPayment)} ({((downPayment / propertyValue) * 100).toFixed(0)}%)</span>
            </div>
            <Slider
              id="downPayment"
              min={propertyValue * 0.2}
              max={propertyValue * 0.7}
              step={500000}
              value={[downPayment]}
              onValueChange={(values) => setDownPayment(values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="tenor">Financing Term</Label>
              <span className="text-sm">{tenor / 12} years</span>
            </div>
            <Slider
              id="tenor"
              min={60}
              max={240}
              step={12}
              value={[tenor]}
              onValueChange={(values) => setTenor(values[0])}
            />
          </div>
        </div>
        
        <Button onClick={handleCalculate} className="w-full">Check Eligibility</Button>
        
        {calculationResult && (
          <div className={`p-4 rounded-lg mt-4 ${calculationResult.eligible ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-start space-x-3">
              {calculationResult.eligible ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              )}
              <div>
                <p className="font-medium">{calculationResult.message}</p>
                {calculationResult.eligible && (
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Maximum financing amount: <span className="font-bold">{formatCurrency(calculationResult.maxAmount!)}</span></p>
                    <p>Estimated monthly payment: <span className="font-bold">{formatCurrency(calculationResult.monthlyPayment!)}</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EligibilityCalculator;
