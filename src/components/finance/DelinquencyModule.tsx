
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock, ArrowUpRight, Phone } from "lucide-react";
import StatCard from "../dashboard/StatCard";

const DelinquencyModule = () => {
  const stats = [
    {
      title: "Active Cases",
      value: "47",
      change: -3,
      icon: { icon: AlertTriangle, className: "text-red-600" },
    },
    {
      title: "Early Warning",
      value: "28",
      change: 5,
      icon: { icon: Clock, className: "text-amber-500" },
    },
    {
      title: "Resolution Rate",
      value: "68%",
      change: 12,
      icon: { icon: ArrowUpRight, className: "text-green-600" },
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
          <CardTitle>Delinquency Management</CardTitle>
          <CardDescription>
            Monitor, manage and resolve delinquent accounts with Shariah-compliant approaches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cases">Active Cases</TabsTrigger>
              <TabsTrigger value="early">Early Warning</TabsTrigger>
              <TabsTrigger value="restructuring">Restructuring</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="mb-4">The Delinquency Management module provides tools for early identification, management, and resolution of delinquent accounts.</p>
                <p>Track payment delays, implement Shariah-compliant restructuring plans, and monitor resolution progress through dedicated workflows.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="cases" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Active delinquency cases and management tools will be available here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="early" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Early warning system and preventative measures will be available here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="restructuring" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Shariah-compliant restructuring plans and templates will be available here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelinquencyModule;
