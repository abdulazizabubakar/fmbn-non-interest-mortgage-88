
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  TrendingUp,
  RefreshCw,
  Calendar,
  User,
  Settings,
} from 'lucide-react';

interface DashboardNavTabsProps {
    activeView: string;
    setActiveView: (view: string) => void;
}

const DashboardNavTabs: React.FC<DashboardNavTabsProps> = ({ activeView, setActiveView }) => {
    return (
        <div className="px-4 pb-2">
            <Tabs value={activeView} onValueChange={setActiveView}>
                <TabsList className="grid w-full grid-cols-6 lg:max-w-4xl bg-slate-100">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Overview
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                </TabsTrigger>
                <TabsTrigger value="realtime" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Real-time
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Reports
                </TabsTrigger>
                <TabsTrigger value="custom" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Custom
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};

export default DashboardNavTabs;
