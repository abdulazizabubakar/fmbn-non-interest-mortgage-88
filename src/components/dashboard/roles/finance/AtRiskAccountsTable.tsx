
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface AtRiskAccountsTableProps {
  region?: string;
}

const AtRiskAccountsTable: React.FC<AtRiskAccountsTableProps> = ({ region }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>At-Risk Accounts</CardTitle>
          <CardDescription>Accounts with over 60 days in arrears</CardDescription>
        </div>
        <AlertTriangle className="h-5 w-5 text-amber-500 ml-auto" />
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">Account</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Days Overdue</th>
                <th className="px-4 py-2">Amount Due</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-4 py-3 font-medium text-gray-900">M-2023-1078</td>
                <td className="px-4 py-3">Ibrahim Mohammed</td>
                <td className="px-4 py-3">₦12,450,000</td>
                <td className="px-4 py-3">96</td>
                <td className="px-4 py-3">₦840,000</td>
                <td className="px-4 py-3">
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">Critical</span>
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="px-4 py-3 font-medium text-gray-900">M-2023-0896</td>
                <td className="px-4 py-3">Fatima Bello</td>
                <td className="px-4 py-3">₦8,750,000</td>
                <td className="px-4 py-3">78</td>
                <td className="px-4 py-3">₦525,000</td>
                <td className="px-4 py-3">
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">High Risk</span>
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-3 font-medium text-gray-900">M-2023-1241</td>
                <td className="px-4 py-3">John Okafor</td>
                <td className="px-4 py-3">₦15,200,000</td>
                <td className="px-4 py-3">62</td>
                <td className="px-4 py-3">₦760,000</td>
                <td className="px-4 py-3">
                  <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">High Risk</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtRiskAccountsTable;
