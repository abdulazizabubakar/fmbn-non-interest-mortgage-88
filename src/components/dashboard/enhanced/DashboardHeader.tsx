
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LayoutDashboard, 
  Settings, 
  Maximize2, 
  Minimize2, 
  Filter,
  Download,
  Bell,
  Command,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  userRole: string;
  userRegion: string;
  realTimeEnabled: boolean;
  setRealTimeEnabled: (enabled: boolean) => void;
  refreshInterval: string;
  setRefreshInterval: (interval: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  notifications: number;
  isFullscreen: boolean;
  onFullscreenToggle: () => void;
  onCommandPaletteToggle: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userRole,
  userRegion,
  realTimeEnabled,
  setRealTimeEnabled,
  refreshInterval,
  setRefreshInterval,
  showFilters,
  setShowFilters,
  notifications,
  isFullscreen,
  onFullscreenToggle,
  onCommandPaletteToggle,
}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NIMMS Dashboard
          </h1>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {userRole.replace('_', ' ').toUpperCase()}
        </Badge>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {userRegion}
        </Badge>
      </div>

      <div className="flex items-center space-x-3">
        {/* Real-time toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="realtime"
            checked={realTimeEnabled}
            onCheckedChange={setRealTimeEnabled}
          />
          <Label htmlFor="realtime" className="text-sm">Real-time</Label>
          {realTimeEnabled && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>

        {/* Refresh interval */}
        <Select value={refreshInterval} onValueChange={setRefreshInterval}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10s</SelectItem>
            <SelectItem value="30">30s</SelectItem>
            <SelectItem value="60">1m</SelectItem>
            <SelectItem value="300">5m</SelectItem>
          </SelectContent>
        </Select>

        {/* Action buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-blue-50 border-blue-200" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="relative"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {notifications}
            </Badge>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onFullscreenToggle}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>

        <Button variant="outline" size="sm" onClick={onCommandPaletteToggle}>
          <Command className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
