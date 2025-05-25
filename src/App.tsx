
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import ProcessFlows from './pages/ProcessFlows';
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/hooks/useAuth";
import LesseePortal from './components/lessee/LesseePortal';
import ProtectedRoute from './components/auth/ProtectedRoute';

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
            {/* Make Login the default landing page */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/mortgages" element={<ProtectedRoute><Mortgages /></ProtectedRoute>} />
            <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
            <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/operations" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/disbursements" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/repayments" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/subsidies" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/exceptions" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/risk" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/compliance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/finance/delinquency" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            
            {/* Lessee Portal Route - Modified to use the component directly without PageContainer */}
            <Route path="/lessee-portal/*" element={<ProtectedRoute requiredRole="lessee"><LesseePortal /></ProtectedRoute>} />
            
            {/* Mortgage Application Routes */}
            <Route path="/mortgage-applications" element={<ProtectedRoute><MortgageApplications /></ProtectedRoute>} />
            <Route path="/mortgage-applications/:id" element={<ProtectedRoute><MortgageApplicationDetails /></ProtectedRoute>} />
            
            {/* New Mortgage Management Routes */}
            <Route path="/mortgage-management" element={<ProtectedRoute><MortgageManagement /></ProtectedRoute>} />
            <Route path="/mortgage-management/accounts/:id" element={<ProtectedRoute><MortgageAccountDetails /></ProtectedRoute>} />
            
            {/* Process Flows Route */}
            <Route path="/process-flows" element={<ProtectedRoute><ProcessFlows /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
