
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  FolderOpen, 
  Clock, 
  Upload, 
  Download, 
  Search,
  Share
} from "lucide-react";
import DocumentList from "./DocumentList";
import DocumentUpload from "./DocumentUpload";
import DocumentSearch from "./DocumentSearch";
import DocumentSharing from "./DocumentSharing";
import { DocumentType, DocumentCategory } from "@/types/documents";

const DocumentCenterModule = () => {
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>('all');

  const documentStats = [
    { title: "Total Documents", value: "847", icon: FileText, className: "text-blue-500" },
    { title: "Pending Review", value: "32", icon: Clock, className: "text-amber-500" },
    { title: "Recently Uploaded", value: "124", icon: Upload, className: "text-green-500" },
    { title: "Shared Documents", value: "56", icon: Share, className: "text-purple-500" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {documentStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className={`rounded-full p-2 ${stat.className} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.className}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Document Center</CardTitle>
          <CardDescription>
            Manage all documents in one secure, centralized location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="space-y-4">
            <TabsList className="grid grid-cols-4 md:grid-cols-4">
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="sharing">Sharing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse" className="space-y-4">
              <DocumentList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4">
              <DocumentUpload />
            </TabsContent>
            
            <TabsContent value="search" className="space-y-4">
              <DocumentSearch />
            </TabsContent>
            
            <TabsContent value="sharing" className="space-y-4">
              <DocumentSharing />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentCenterModule;
