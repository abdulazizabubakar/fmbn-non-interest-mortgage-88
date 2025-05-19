
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertCircle, Layers } from "lucide-react";
import { StatCard } from "../dashboard/StatCard";

const RiskAssessmentModule = () => {
  const stats = [
    {
      title: "Risk Assessments",
      value: "138",
      change: 5,
      icon: { icon: Shield, className: "text-blue-500" },
    },
    {
      title: "High Risk Cases",
      value: "24",
      change: -8,
      icon: { icon: AlertCircle, className: "text-red-500" },
    },
    {
      title: "Risk Categories",
      value: "5",
      change: 0,
      icon: { icon: Layers, className: "text-emerald-500" },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Dashboard</CardTitle>
          <CardDescription>
            Comprehensive risk assessment tools for Islamic mortgage applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="mb-4">The Risk Assessment module provides tools to evaluate financial and Shariah compliance risk factors for mortgage applications.</p>
                <p>Configure risk policies, review assessment results, and generate comprehensive risk reports for management review.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="assessments" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Assessment tools and risk analysis will be available here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="policies" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Risk policies and guidelines configuration will be available here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Risk assessment reports and analytics will be available here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentModule;
