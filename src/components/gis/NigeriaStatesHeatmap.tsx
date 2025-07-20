import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  MapPin, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Home,
  X
} from 'lucide-react';

interface StateData {
  name: string;
  code: string;
  applications: number;
  approvals: number;
  disbursements: number;
  averageAmount: number;
  intensity: number; // 0-100 for heatmap intensity
  coordinates: { x: number; y: number }; // SVG coordinates
}

const nigeriaStatesData: StateData[] = [
  { name: 'Lagos', code: 'LA', applications: 2340, approvals: 1890, disbursements: 1650000000, averageAmount: 8500000, intensity: 100, coordinates: { x: 180, y: 280 } },
  { name: 'Abuja FCT', code: 'FC', applications: 1890, approvals: 1520, disbursements: 1200000000, averageAmount: 9200000, intensity: 95, coordinates: { x: 300, y: 200 } },
  { name: 'Kano', code: 'KN', applications: 1230, approvals: 980, disbursements: 850000000, averageAmount: 6800000, intensity: 75, coordinates: { x: 400, y: 120 } },
  { name: 'Rivers', code: 'RI', applications: 890, approvals: 720, disbursements: 620000000, averageAmount: 7200000, intensity: 65, coordinates: { x: 280, y: 320 } },
  { name: 'Ogun', code: 'OG', applications: 780, approvals: 620, disbursements: 520000000, averageAmount: 7500000, intensity: 60, coordinates: { x: 160, y: 260 } },
  { name: 'Oyo', code: 'OY', applications: 650, approvals: 520, disbursements: 450000000, averageAmount: 6900000, intensity: 55, coordinates: { x: 200, y: 240 } },
  { name: 'Kaduna', code: 'KD', applications: 580, approvals: 460, disbursements: 380000000, averageAmount: 6500000, intensity: 50, coordinates: { x: 360, y: 160 } },
  { name: 'Delta', code: 'DE', applications: 520, approvals: 410, disbursements: 340000000, averageAmount: 6800000, intensity: 45, coordinates: { x: 240, y: 300 } },
  { name: 'Anambra', code: 'AN', applications: 480, approvals: 380, disbursements: 320000000, averageAmount: 7100000, intensity: 42, coordinates: { x: 320, y: 280 } },
  { name: 'Plateau', code: 'PL', applications: 420, approvals: 330, disbursements: 280000000, averageAmount: 6600000, intensity: 38, coordinates: { x: 380, y: 180 } },
  { name: 'Edo', code: 'ED', applications: 380, approvals: 300, disbursements: 250000000, averageAmount: 6900000, intensity: 35, coordinates: { x: 260, y: 260 } },
  { name: 'Kwara', code: 'KW', applications: 340, approvals: 270, disbursements: 220000000, averageAmount: 6400000, intensity: 32, coordinates: { x: 280, y: 200 } },
  { name: 'Enugu', code: 'EN', applications: 320, approvals: 250, disbursements: 210000000, averageAmount: 7000000, intensity: 30, coordinates: { x: 340, y: 260 } },
  { name: 'Imo', code: 'IM', applications: 290, approvals: 230, disbursements: 190000000, averageAmount: 6800000, intensity: 28, coordinates: { x: 330, y: 290 } },
  { name: 'Cross River', code: 'CR', applications: 260, approvals: 200, disbursements: 170000000, averageAmount: 6700000, intensity: 25, coordinates: { x: 380, y: 300 } },
  { name: 'Osun', code: 'OS', applications: 240, approvals: 190, disbursements: 160000000, averageAmount: 6600000, intensity: 23, coordinates: { x: 220, y: 250 } },
  { name: 'Akwa Ibom', code: 'AK', applications: 220, approvals: 170, disbursements: 140000000, averageAmount: 6900000, intensity: 20, coordinates: { x: 360, y: 320 } },
  { name: 'Niger', code: 'NI', applications: 200, approvals: 160, disbursements: 130000000, averageAmount: 6300000, intensity: 18, coordinates: { x: 320, y: 170 } },
  { name: 'Ondo', code: 'ON', applications: 190, approvals: 150, disbursements: 125000000, averageAmount: 6700000, intensity: 16, coordinates: { x: 240, y: 270 } },
  { name: 'Abia', code: 'AB', applications: 180, approvals: 140, disbursements: 115000000, averageAmount: 6800000, intensity: 15, coordinates: { x: 340, y: 300 } },
  { name: 'Benue', code: 'BE', applications: 170, approvals: 130, disbursements: 110000000, averageAmount: 6400000, intensity: 14, coordinates: { x: 360, y: 220 } },
  { name: 'Kogi', code: 'KO', applications: 160, approvals: 120, disbursements: 100000000, averageAmount: 6200000, intensity: 12, coordinates: { x: 320, y: 200 } },
  { name: 'Ekiti', code: 'EK', applications: 150, approvals: 110, disbursements: 95000000, averageAmount: 6500000, intensity: 10, coordinates: { x: 230, y: 240 } },
  { name: 'Gombe', code: 'GO', applications: 140, approvals: 100, disbursements: 85000000, averageAmount: 6100000, intensity: 9, coordinates: { x: 420, y: 200 } },
  { name: 'Adamawa', code: 'AD', applications: 130, approvals: 95, disbursements: 80000000, averageAmount: 6000000, intensity: 8, coordinates: { x: 460, y: 220 } },
  { name: 'Borno', code: 'BO', applications: 120, approvals: 85, disbursements: 70000000, averageAmount: 5800000, intensity: 7, coordinates: { x: 480, y: 160 } },
  { name: 'Sokoto', code: 'SO', applications: 110, approvals: 80, disbursements: 65000000, averageAmount: 5900000, intensity: 6, coordinates: { x: 260, y: 100 } },
  { name: 'Kebbi', code: 'KE', applications: 100, approvals: 75, disbursements: 60000000, averageAmount: 5700000, intensity: 5, coordinates: { x: 300, y: 120 } },
  { name: 'Zamfara', code: 'ZA', applications: 95, approvals: 70, disbursements: 55000000, averageAmount: 5600000, intensity: 4, coordinates: { x: 320, y: 130 } },
  { name: 'Taraba', code: 'TA', applications: 90, approvals: 65, disbursements: 50000000, averageAmount: 5500000, intensity: 3, coordinates: { x: 440, y: 240 } },
  { name: 'Bauchi', code: 'BA', applications: 85, approvals: 60, disbursements: 48000000, averageAmount: 5400000, intensity: 2, coordinates: { x: 420, y: 180 } },
  { name: 'Jigawa', code: 'JI', applications: 80, approvals: 55, disbursements: 45000000, averageAmount: 5300000, intensity: 1, coordinates: { x: 450, y: 140 } },
  { name: 'Yobe', code: 'YO', applications: 75, approvals: 50, disbursements: 40000000, averageAmount: 5200000, intensity: 1, coordinates: { x: 460, y: 160 } },
  { name: 'Nasarawa', code: 'NA', applications: 70, approvals: 45, disbursements: 38000000, averageAmount: 5100000, intensity: 1, coordinates: { x: 340, y: 190 } },
  { name: 'Katsina', code: 'KA', applications: 65, approvals: 40, disbursements: 35000000, averageAmount: 5000000, intensity: 1, coordinates: { x: 380, y: 130 } },
  { name: 'Ebonyi', code: 'EB', applications: 60, approvals: 35, disbursements: 30000000, averageAmount: 4900000, intensity: 1, coordinates: { x: 360, y: 270 } },
  { name: 'Bayelsa', code: 'BY', applications: 55, approvals: 30, disbursements: 25000000, averageAmount: 4800000, intensity: 1, coordinates: { x: 260, y: 340 } },
];

const NigeriaStatesHeatmap = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getHeatmapColor = (intensity: number) => {
    if (intensity >= 80) return 'hsl(var(--fmbn-primary))';
    if (intensity >= 60) return 'hsl(var(--fmbn-secondary))';
    if (intensity >= 40) return 'hsl(var(--fmbn-accent))';
    if (intensity >= 20) return 'hsl(var(--primary))';
    return 'hsl(var(--muted))';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleStateClick = (state: StateData) => {
    setSelectedState(state);
    setIsDialogOpen(true);
  };

  const calculateApprovalRate = (approvals: number, applications: number) => {
    return ((approvals / applications) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <Card className="fmbn-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nigeria States Mortgage Applications Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Heatmap */}
            <div className="lg:col-span-2">
              <div className="relative">
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-[400px] border rounded-lg bg-gradient-to-br from-background to-muted/20"
                >
                  {/* Nigeria outline (simplified) */}
                  <path
                    d="M100 150 Q200 100 300 120 Q400 110 500 140 Q520 200 510 260 Q480 320 450 340 Q350 360 250 350 Q150 340 120 300 Q90 250 100 200 Q95 175 100 150 Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  
                  {/* State markers */}
                  {nigeriaStatesData.map((state) => (
                    <g key={state.code}>
                      <circle
                        cx={state.coordinates.x}
                        cy={state.coordinates.y}
                        r={Math.max(6, state.intensity / 10)}
                        fill={getHeatmapColor(state.intensity)}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleStateClick(state)}
                      />
                      <text
                        x={state.coordinates.x}
                        y={state.coordinates.y + 20}
                        textAnchor="middle"
                        className="text-xs font-medium fill-foreground pointer-events-none"
                      >
                        {state.code}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--fmbn-primary))' }}></div>
                  <span className="text-sm">High (80%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--fmbn-secondary))' }}></div>
                  <span className="text-sm">Medium (60-79%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--fmbn-accent))' }}></div>
                  <span className="text-sm">Low (40-59%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--muted))' }}></div>
                  <span className="text-sm">Minimal (&lt;40%)</span>
                </div>
              </div>
            </div>

            {/* Top Performing States */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Top Performing States</h3>
              <div className="space-y-3">
                {nigeriaStatesData
                  .sort((a, b) => b.applications - a.applications)
                  .slice(0, 8)
                  .map((state, index) => (
                    <div
                      key={state.code}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleStateClick(state)}
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <div>
                          <p className="font-medium text-sm">{state.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {state.applications} applications
                          </p>
                        </div>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getHeatmapColor(state.intensity) }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {selectedState?.name} State Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedState && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="fmbn-card">
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-fmbn-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedState.applications.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Applications</p>
                  </CardContent>
                </Card>
                
                <Card className="fmbn-card">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold">{selectedState.approvals.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Approvals</p>
                  </CardContent>
                </Card>
                
                <Card className="fmbn-card">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-8 w-8 text-fmbn-secondary mx-auto mb-2" />
                    <p className="text-lg font-bold">{formatCurrency(selectedState.disbursements)}</p>
                    <p className="text-sm text-muted-foreground">Disbursed</p>
                  </CardContent>
                </Card>
                
                <Card className="fmbn-card">
                  <CardContent className="p-4 text-center">
                    <Home className="h-8 w-8 text-fmbn-accent mx-auto mb-2" />
                    <p className="text-lg font-bold">{formatCurrency(selectedState.averageAmount)}</p>
                    <p className="text-sm text-muted-foreground">Avg. Amount</p>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="fmbn-card">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Performance Indicators</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Approval Rate</span>
                        <span className="font-semibold text-green-600">
                          {calculateApprovalRate(selectedState.approvals, selectedState.applications)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Share</span>
                        <span className="font-semibold">
                          {((selectedState.applications / nigeriaStatesData.reduce((sum, s) => sum + s.applications, 0)) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activity Level</span>
                        <Badge 
                          variant={selectedState.intensity > 50 ? "default" : "secondary"}
                          className={selectedState.intensity > 50 ? "bg-green-100 text-green-800" : ""}
                        >
                          {selectedState.intensity > 50 ? "High" : selectedState.intensity > 20 ? "Medium" : "Low"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="fmbn-card">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Market Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>State Ranking</span>
                        <span className="font-semibold">
                          #{nigeriaStatesData
                            .sort((a, b) => b.applications - a.applications)
                            .findIndex(s => s.code === selectedState.code) + 1}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth Potential</span>
                        <Badge variant="outline">
                          {selectedState.intensity > 70 ? "Saturated" : selectedState.intensity > 30 ? "Growing" : "Emerging"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Market Status</span>
                        <Badge variant="secondary">
                          {selectedState.intensity > 60 ? "Mature" : "Developing"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NigeriaStatesHeatmap;