
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Coins, Home, Users, Building } from 'lucide-react';

interface FinanceTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const FinanceTypeSelector: React.FC<FinanceTypeSelectorProps> = ({ value, onChange }) => {
  const financeTypes = [
    {
      id: 'murabaha',
      name: 'Murabaha',
      description: 'Cost-plus financing where the bank purchases the property and sells it to you at a marked-up price.',
      icon: <Coins className="h-5 w-5 text-nimms-primary" />,
      benefits: 'Fixed payment schedule, transparent cost structure, suitable for ready properties.'
    },
    {
      id: 'ijara',
      name: 'Ijara',
      description: 'Lease-to-own arrangement where you make rental payments and gradually acquire ownership.',
      icon: <Home className="h-5 w-5 text-nimms-secondary" />,
      benefits: 'Flexible payment terms, potential for ownership transfer, suitable for most property types.'
    },
    {
      id: 'musharaka',
      name: 'Musharaka',
      description: 'Partnership arrangement where you and the bank co-own the property with declining bank ownership over time.',
      icon: <Users className="h-5 w-5 text-nimms-accent" />,
      benefits: 'Shared ownership, potential for equity building, suitable for higher-value properties.'
    },
    {
      id: 'istisna',
      name: 'Istisna',
      description: 'Construction financing where the bank funds the building process and transfers ownership upon completion.',
      icon: <Building className="h-5 w-5 text-nimms-primary" />,
      benefits: 'Specialized for new constructions, staged payments, flexible plans for custom builds.'
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Financing Type</CardTitle>
        <CardDescription>
          Choose the Shariah-compliant financing structure that best suits your needs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-6">
          {financeTypes.map((type) => (
            <div key={type.id} className="flex">
              <RadioGroupItem 
                value={type.id} 
                id={type.id} 
                className="peer sr-only" 
              />
              <Label
                htmlFor={type.id}
                className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all peer-data-[state=checked]:border-nimms-primary peer-data-[state=checked]:bg-nimms-primary/5 hover:bg-muted"
              >
                <div className="flex-shrink-0 p-2 bg-muted rounded-md">
                  {type.icon}
                </div>
                <div>
                  <h4 className="font-medium">{type.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  <p className="text-xs font-medium mt-2">Benefits: {type.benefits}</p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        All financing options are fully Shariah-compliant and certified by our Shariah board.
      </CardFooter>
    </Card>
  );
};

export default FinanceTypeSelector;
