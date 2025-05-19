
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Mortgages from "./pages/Mortgages";
import Customers from "./pages/Customers";
import Applications from "./pages/Applications";
import Properties from "./pages/Properties";
import Finance from "./pages/Finance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mortgages" element={<Mortgages />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/properties" element={<Properties />} />
          
          {/* Finance module and submodule routes */}
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/dashboard" element={<Finance />} />
          <Route path="/finance/disbursements" element={<Finance />} />
          <Route path="/finance/repayments" element={<Finance />} />
          <Route path="/finance/subsidies" element={<Finance />} />
          <Route path="/finance/exceptions" element={<Finance />} />
          <Route path="/finance/risk" element={<Finance />} />
          <Route path="/finance/compliance" element={<Finance />} />
          <Route path="/finance/delinquency" element={<Finance />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
