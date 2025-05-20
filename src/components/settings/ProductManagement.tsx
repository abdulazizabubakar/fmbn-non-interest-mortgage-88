
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'active' | 'inactive';
}

const initialProducts: Product[] = [
  { 
    id: '1', 
    name: 'Murabaha Home Financing', 
    type: 'Mortgage',
    description: 'Cost-plus financing for home purchase',
    status: 'active' 
  },
  { 
    id: '2', 
    name: 'Ijarah Home Financing', 
    type: 'Mortgage',
    description: 'Lease-based home financing solution',
    status: 'active' 
  },
  { 
    id: '3', 
    name: 'Diminishing Musharakah', 
    type: 'Mortgage',
    description: 'Partnership-based home financing with gradual ownership transfer',
    status: 'active' 
  },
  { 
    id: '4', 
    name: 'Istisna Construction Financing', 
    type: 'Construction',
    description: 'Financing for home construction projects',
    status: 'inactive' 
  },
];

interface ProductFormValues {
  name: string;
  type: string;
  description: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: '',
      type: 'Mortgage',
      description: ''
    }
  });

  const filteredProducts = products.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    toast.success('Product deleted successfully');
  };

  const handleToggleStatus = (id: string) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const newStatus = product.status === 'active' ? 'inactive' : 'active';
        toast.success(`Product status updated to ${newStatus}`);
        return { ...product, status: newStatus };
      }
      return product;
    }));
  };

  const onSubmit = (data: ProductFormValues) => {
    const newProduct: Product = {
      id: `${products.length + 1}`,
      name: data.name,
      type: data.type,
      description: data.description,
      status: 'active'
    };
    
    setProducts([...products, newProduct]);
    toast.success('New product added successfully');
    setIsAddDialogOpen(false);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
        <CardDescription>
          Manage mortgage and financing products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Create a new financing product to offer to customers
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mortgage">Mortgage</SelectItem>
                            <SelectItem value="Construction">Construction</SelectItem>
                            <SelectItem value="Renovation">Renovation</SelectItem>
                            <SelectItem value="Refinance">Refinance</SelectItem>
                            <SelectItem value="Commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the category this product belongs to
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the product details"
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="pt-4">
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Product</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{product.description}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleToggleStatus(product.id)}
                      >
                        {product.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
