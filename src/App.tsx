import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
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

// Add the new mortgage application routes
import MortgageApplications from './pages/MortgageApplications';
import MortgageApplicationDetails from './pages/MortgageApplicationDetails';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
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
          <Route path="/messages" element={<Messages />} />
          
          {/* New Mortgage Application Routes */}
          <Route path="/mortgage-applications" element={<MortgageApplications />} />
          <Route path="/mortgage-applications/:id" element={<MortgageApplicationDetails />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
