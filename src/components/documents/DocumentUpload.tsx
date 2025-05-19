
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X, FileText, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { DocumentCategory, DocumentType } from '@/types/documents';

interface FormData {
  title: string;
  description: string;
  category: DocumentCategory;
  expiryDate?: string;
  associatedEntity?: string;
  tags?: string;
}

const DocumentUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const onSubmit = (data: FormData) => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      console.log('Document metadata:', data);
      console.log('Files to upload:', files);
      
      toast({
        title: "Success",
        description: `${files.length} document(s) uploaded successfully`,
      });
      
      setFiles([]);
      reset();
      setIsUploading(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          files.length > 0 ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Drag & Drop Files</h3>
          <p className="text-sm text-muted-foreground">
            or click to browse from your computer
          </p>
          <Input 
            type="file" 
            multiple 
            className="hidden" 
            id="file-upload" 
            onChange={onFileChange}
          />
          <Button size="sm" asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Browse Files
            </label>
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: PDF, JPEG, PNG, DOCX, XLSX (Max: 10MB per file)
          </p>
        </div>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files ({files.length})</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px] md:max-w-[300px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeFile(index)}
                  className="h-7 w-7 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input 
              id="title" 
              placeholder="Enter document title" 
              {...register("title", { required: true })} 
            />
            {errors.title && (
              <span className="text-xs text-red-500">Title is required</span>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="application" {...register("category", { required: true })}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="kyc">KYC</SelectItem>
                <SelectItem value="property">Property</SelectItem>
                <SelectItem value="shariah">Shariah</SelectItem>
                <SelectItem value="application">Application</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Document Description</Label>
          <Textarea 
            id="description" 
            placeholder="Enter a brief description of the document" 
            {...register("description")} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
            <Input 
              id="expiryDate" 
              type="date" 
              {...register("expiryDate")} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="associatedEntity">Associated Entity/Customer ID</Label>
            <Input 
              id="associatedEntity" 
              placeholder="E.g., Customer ID, Mortgage ID" 
              {...register("associatedEntity")} 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input 
            id="tags" 
            placeholder="E.g., important, contract, agreement" 
            {...register("tags")} 
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => {
              setFiles([]);
              reset();
            }}
          >
            Clear All
          </Button>
          
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>Upload Documents</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
