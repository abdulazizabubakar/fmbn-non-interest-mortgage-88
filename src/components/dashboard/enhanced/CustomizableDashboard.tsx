
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Layout, 
  Grid, 
  Move, 
  Eye, 
  EyeOff, 
  Settings, 
  Save,
  RotateCcw,
  Plus,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CustomizableDashboardProps {
  userRole: string;
  layout: string;
  onLayoutChange: (layout: string) => void;
}

const CustomizableDashboard: React.FC<CustomizableDashboardProps> = ({
  userRole,
  layout,
  onLayoutChange
}) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [widgets, setWidgets] = useState([
    { id: 'metrics', title: 'Key Metrics', visible: true, position: { x: 0, y: 0, w: 2, h: 1 } },
    { id: 'charts', title: 'Analytics Charts', visible: true, position: { x: 2, y: 0, w: 2, h: 2 } },
    { id: 'activities', title: 'Recent Activities', visible: true, position: { x: 0, y: 1, w: 2, h: 2 } },
    { id: 'alerts', title: 'System Alerts', visible: true, position: { x: 4, y: 0, w: 1, h: 1 } },
    { id: 'performance', title: 'Performance', visible: false, position: { x: 4, y: 1, w: 1, h: 1 } },
    { id: 'reports', title: 'Quick Reports', visible: true, position: { x: 0, y: 3, w: 3, h: 1 } }
  ]);

  const availableWidgets = [
    { id: 'calendar', title: 'Calendar View', description: 'Upcoming events and deadlines' },
    { id: 'notifications', title: 'Notifications', description: 'System notifications and alerts' },
    { id: 'weather', title: 'Weather Widget', description: 'Current weather information' },
    { id: 'tasks', title: 'Task Manager', description: 'Personal task management' },
    { id: 'news', title: 'News Feed', description: 'Industry news and updates' }
  ];

  const presetLayouts = [
    { id: 'default', name: 'Default Layout', description: 'Standard dashboard layout' },
    { id: 'analytics', name: 'Analytics Focus', description: 'Chart and data heavy layout' },
    { id: 'executive', name: 'Executive Summary', description: 'High-level overview layout' },
    { id: 'operational', name: 'Operational View', description: 'Detailed operational metrics' },
    { id: 'minimal', name: 'Minimal View', description: 'Clean, simplified layout' }
  ];

  const toggleWidgetVisibility = (widgetId: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === widgetId 
        ? { ...widget, visible: !widget.visible }
        : widget
    ));
  };

  const addWidget = (widgetType: string) => {
    const newWidget = availableWidgets.find(w => w.id === widgetType);
    if (newWidget) {
      setWidgets([...widgets, {
        id: newWidget.id,
        title: newWidget.title,
        visible: true,
        position: { x: 0, y: 0, w: 2, h: 1 }
      }]);
    }
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
  };

  const saveLayout = () => {
    // Save current layout configuration
    console.log('Saving layout:', { widgets, layout });
    setEditMode(false);
  };

  const resetLayout = () => {
    // Reset to default layout
    onLayoutChange('default');
    setEditMode(false);
  };

  return (
    <div className="space-y-6">
      {/* Customization Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Layout className="h-5 w-5" />
                <span>Dashboard Customization</span>
              </CardTitle>
              <CardDescription>Personalize your dashboard layout and widgets</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-mode"
                checked={editMode}
                onCheckedChange={setEditMode}
              />
              <Label htmlFor="edit-mode">Edit Mode</Label>
              {editMode && (
                <>
                  <Button variant="outline" size="sm" onClick={resetLayout}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={saveLayout}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        
        {editMode && (
          <CardContent>
            <Tabs defaultValue="widgets" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="widgets">Widgets</TabsTrigger>
                <TabsTrigger value="layouts">Layouts</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="widgets" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Current Widgets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {widgets.map((widget) => (
                      <div key={widget.id} className="flex items-center justify-between p-2 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleWidgetVisibility(widget.id)}
                          >
                            {widget.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                          <span className="text-sm">{widget.title}</span>
                          <Badge variant={widget.visible ? "default" : "secondary"}>
                            {widget.visible ? "Visible" : "Hidden"}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeWidget(widget.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Add Widgets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableWidgets.map((widget) => (
                      <div key={widget.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sm">{widget.title}</h5>
                            <p className="text-xs text-gray-500">{widget.description}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addWidget(widget.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layouts" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Preset Layouts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {presetLayouts.map((preset) => (
                      <Card 
                        key={preset.id} 
                        className={`cursor-pointer transition-all ${
                          layout === preset.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                        }`}
                        onClick={() => onLayoutChange(preset.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">{preset.name}</h5>
                              <p className="text-sm text-gray-500">{preset.description}</p>
                            </div>
                            <Grid className="h-5 w-5 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-refresh">Auto Refresh</Label>
                    <Switch id="auto-refresh" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-mode">Compact Mode</Label>
                    <Switch id="compact-mode" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Color Theme</Label>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>

      {/* Live Dashboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Preview</CardTitle>
          <CardDescription>
            {editMode ? 'Click and drag widgets to rearrange' : 'Your customized dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`grid grid-cols-6 gap-4 min-h-96 ${editMode ? 'border-2 border-dashed border-gray-300 p-4' : ''}`}>
            {widgets.filter(w => w.visible).map((widget) => (
              <div
                key={widget.id}
                className={`bg-gray-50 rounded-lg p-4 flex items-center justify-center border ${
                  editMode ? 'cursor-move hover:bg-gray-100 border-gray-300' : 'border-gray-200'
                } ${selectedWidget === widget.id ? 'ring-2 ring-blue-500' : ''}`}
                style={{
                  gridColumn: `span ${widget.position.w}`,
                  gridRow: `span ${widget.position.h}`
                }}
                onClick={() => editMode && setSelectedWidget(widget.id)}
              >
                <div className="text-center">
                  {editMode && <Move className="h-4 w-4 mx-auto mb-2 text-gray-400" />}
                  <h4 className="font-medium text-sm">{widget.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">Widget Content</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizableDashboard;
