
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, CheckCircle, FileCheck, Calendar } from "lucide-react";
import StatCard from "../dashboard/StatCard";

const ShariahComplianceModule = () => {
  const stats = [
    {
      title: "Compliance Reviews",
      value: "87",
      change: 12,
      icon: { icon: FileCheck, className: "text-green-600" },
    },
    {
      title: "Compliant Products",
      value: "4",
      change: 0,
      icon: { icon: CheckCircle, className: "text-blue-500" },
    },
    {
      title: "Pending Reviews",
      value: "13",
      change: -5,
      icon: { icon: Calendar, className: "text-amber-500" },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} data={stat} />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Shariah Compliance</CardTitle>
          <CardDescription>
            Ensure all products and processes comply with Islamic finance principles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Compliance Reviews</TabsTrigger>
              <TabsTrigger value="board">Shariah Board</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="mb-4">The Shariah Compliance module ensures all financial products and operations adhere to Islamic finance principles.</p>
                <p>Track compliance reviews, interact with the Shariah advisory board, and maintain proper documentation of all Shariah-compliant activities.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Compliance review tools and history will be available here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="board" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Shariah board meeting minutes, decisions, and communications will be available here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="certificates" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Shariah compliance certificates and documentation will be available here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShariahComplianceModule;
