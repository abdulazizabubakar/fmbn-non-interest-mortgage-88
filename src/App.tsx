
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Mortgages from './pages/Mortgages';
import Properties from './pages/Properties';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import Applications from './pages/Applications';
import Finance from './pages/Finance';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/hooks/useAuth";
import LesseePortal from './pages/LesseePortal';

// Mortgage application routes
import MortgageApplications from './pages/MortgageApplications';
import MortgageApplicationDetails from './pages/MortgageApplicationDetails';

// New Mortgage Management routes
import MortgageManagement from './pages/MortgageManagement';
import MortgageAccountDetails from './pages/MortgageAccountDetails';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/mortgages" element={<Mortgages />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/finance/operations" element={<Finance />} />
            <Route path="/finance/disbursements" element={<Finance />} />
            <Route path="/finance/repayments" element={<Finance />} />
            <Route path="/finance/subsidies" element={<Finance />} />
            <Route path="/finance/exceptions" element={<Finance />} />
            <Route path="/finance/risk" element={<Finance />} />
            <Route path="/finance/compliance" element={<Finance />} />
            <Route path="/finance/delinquency" element={<Finance />} />
            <Route path="/messages" element={<Messages />} />
            
            {/* Lessee Portal Route */}
            <Route path="/lessee-portal/*" element={<LesseePortal />} />
            
            {/* Mortgage Application Routes */}
            <Route path="/mortgage-applications" element={<MortgageApplications />} />
            <Route path="/mortgage-applications/:id" element={<MortgageApplicationDetails />} />
            
            {/* New Mortgage Management Routes */}
            <Route path="/mortgage-management" element={<MortgageManagement />} />
            <Route path="/mortgage-management/accounts/:id" element={<MortgageAccountDetails />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
