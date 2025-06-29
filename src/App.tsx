
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Applications from '@/pages/Applications';
import MortgageApplications from '@/pages/MortgageApplications';
import MortgageApplicationDetails from '@/pages/MortgageApplicationDetails';
import Mortgages from '@/pages/Mortgages';
import MortgageManagement from '@/pages/MortgageManagement';
import MortgageAccountDetails from '@/pages/MortgageAccountDetails';
import Customers from '@/pages/Customers';
import Properties from '@/pages/Properties';
import Finance from '@/pages/Finance';
import Documents from '@/pages/Documents';
import Messages from '@/pages/Messages';
import Reports from '@/pages/Reports';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import ProcessFlows from '@/pages/ProcessFlows';
import Integrations from '@/pages/Integrations';
import LesseePortal from '@/pages/LesseePortal';
import Partners from '@/pages/Partners';
import FinancialAnalytics from '@/pages/FinancialAnalytics';
import MonitoringReporting from '@/pages/MonitoringReporting';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/lessee-portal" element={
            <ProtectedRoute requiredRole="lessee">
              <LesseePortal />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/applications" element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          } />
          <Route path="/mortgage-applications" element={
            <ProtectedRoute>
              <MortgageApplications />
            </ProtectedRoute>
          } />
          <Route path="/mortgage-applications/:id" element={
            <ProtectedRoute>
              <MortgageApplicationDetails />
            </ProtectedRoute>
          } />
          <Route path="/mortgages" element={
            <ProtectedRoute>
              <Mortgages />
            </ProtectedRoute>
          } />
          <Route path="/mortgage-management" element={
            <ProtectedRoute>
              <MortgageManagement />
            </ProtectedRoute>
          } />
          <Route path="/mortgage-accounts/:id" element={
            <ProtectedRoute>
              <MortgageAccountDetails />
            </ProtectedRoute>
          } />
          <Route path="/customers" element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          } />
          <Route path="/properties" element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          } />
          <Route path="/partners" element={
            <ProtectedRoute>
              <Partners />
            </ProtectedRoute>
          } />
          <Route path="/finance" element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          } />
          <Route path="/finance/*" element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          } />
          <Route path="/financial-analytics" element={
            <ProtectedRoute>
              <FinancialAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/monitoring-reporting" element={
            <ProtectedRoute>
              <MonitoringReporting />
            </ProtectedRoute>
          } />
          <Route path="/documents" element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          } />
          <Route path="/messages" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/process-flows" element={
            <ProtectedRoute>
              <Process

Flows />
            </ProtectedRoute>
          } />
          <Route path="/integrations" element={
            <ProtectedRoute>
              <Integrations />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/security" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
