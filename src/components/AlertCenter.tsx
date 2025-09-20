import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  Send, 
  Users, 
  MapPin, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Radio,
  Smartphone,
  MessageSquare,
  Globe,
  Volume2,
  Eye,
  Share2
} from 'lucide-react';

interface AlertData {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'warning' | 'watch' | 'advisory' | 'emergency';
  targetRegions: string[];
  channels: string[];
  language: string[];
  status: 'draft' | 'sent' | 'scheduled';
  sentAt?: string;
  recipients?: number;
  engagement?: {
    viewed: number;
    acknowledged: number;
    shared: number;
  };
}

// Accept sidebarOpen prop to adjust margin responsively
interface AlertCenterProps {
  sidebarOpen?: boolean;
}

export function AlertCenter({ sidebarOpen = true }: AlertCenterProps) {
  const [activeTab, setActiveTab] = useState('compose');
  const [newAlert, setNewAlert] = useState<Partial<AlertData>>({
    severity: 'medium',
    type: 'advisory',
    targetRegions: [],
    channels: ['sms'],
    language: ['english', 'hindi']
  });
  // Broadcast Test result state
  const [broadcastResult, setBroadcastResult] = useState<string | null>(null);

  const recentAlerts: AlertData[] = [
    {
      id: '1',
      title: 'High Tide Warning - Chennai Coast',
      message: 'Unusually high tides expected along Chennai coastline. Avoid beach areas between 6 PM - 8 PM today.',
      severity: 'high',
      type: 'warning',
      targetRegions: ['Chennai', 'Kanchipuram'],
      channels: ['sms', 'app', 'social'],
      language: ['english', 'tamil'],
      status: 'sent',
      sentAt: '2 hours ago',
      recipients: 45672,
      engagement: {
        viewed: 38954,
        acknowledged: 12876,
        shared: 3421
      }
    },
    {
      id: '2',
      title: 'Storm Surge Advisory - Visakhapatnam',
      message: 'Moderate storm surge conditions developing. Fishermen advised to return to shore by evening.',
      severity: 'medium',
      type: 'advisory',
      targetRegions: ['Visakhapatnam', 'East Godavari'],
      channels: ['sms', 'radio'],
      language: ['english', 'telugu'],
      status: 'sent',
      sentAt: '6 hours ago',
      recipients: 23451,
      engagement: {
        viewed: 19876,
        acknowledged: 8765,
        shared: 1234
      }
    },
    {
      id: '3',
      title: 'Coastal Erosion Update - Goa Beaches',
      message: 'Ongoing coastal erosion monitoring. No immediate threat. Regular updates will follow.',
      severity: 'low',
      type: 'advisory',
      targetRegions: ['North Goa', 'South Goa'],
      channels: ['app', 'email'],
      language: ['english', 'konkani'],
      status: 'sent',
      sentAt: '1 day ago',
      recipients: 8976,
      engagement: {
        viewed: 6543,
        acknowledged: 2134,
        shared: 876
      }
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'warning': return '⚠️';
      case 'watch': return '👁️';
      case 'advisory': return 'ℹ️';
      default: return '📢';
    }
  };

  const handleSendAlert = () => {
    // Mock sending alert
    console.log('Sending alert:', newAlert);
    // Reset form
    setNewAlert({
      severity: 'medium',
      type: 'advisory',
      targetRegions: [],
      channels: ['sms'],
      language: ['english', 'hindi']
    });
    setActiveTab('history');
  };

  // Responsive margin based on sidebar state
  const sidebarMargin = sidebarOpen ? "ml-64" : "ml-16";
  return (
    <div className={`p-6 space-y-6 transition-all duration-300 ${sidebarMargin}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2">Alert Center</h1>
          <p className="text-gray-600">Compose and manage emergency alerts and communications</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Generate random response time between 1ms and 20ms
              const ms = Math.floor(Math.random() * 20) + 1;
              setBroadcastResult(`${ms}ms`);
              setTimeout(() => setBroadcastResult(null), 2000);
            }}
          >
            <Radio className="h-4 w-4 mr-2" />
            Broadcast Test
          </Button>
          {broadcastResult && (
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium animate-fade-in">
              Response time: {broadcastResult}
            </span>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose Alert</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>New Alert</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm mb-2 block">Alert Type *</label>
                      <Select value={newAlert.type} onValueChange={(value) => setNewAlert(prev => ({ ...prev, type: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select alert type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">🚨 Emergency</SelectItem>
                          <SelectItem value="warning">⚠️ Warning</SelectItem>
                          <SelectItem value="watch">👁️ Watch</SelectItem>
                          <SelectItem value="advisory">ℹ️ Advisory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm mb-2 block">Severity Level *</label>
                      <Select value={newAlert.severity} onValueChange={(value) => setNewAlert(prev => ({ ...prev, severity: value as any }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical - Immediate Action Required</SelectItem>
                          <SelectItem value="high">High - Significant Risk</SelectItem>
                          <SelectItem value="medium">Medium - Moderate Risk</SelectItem>
                          <SelectItem value="low">Low - Informational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Alert Title *</label>
                    <Input
                      placeholder="Enter a clear, concise alert title"
                      value={newAlert.title || ''}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Alert Message *</label>
                    <Textarea
                      placeholder="Enter the detailed alert message. Be specific about the hazard, location, timing, and recommended actions."
                      value={newAlert.message || ''}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Keep message under 160 characters for SMS compatibility. Current: {(newAlert.message || '').length}/160
                    </p>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Target Regions *</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select regions to alert" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chennai">Chennai Coast</SelectItem>
                        <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                        <SelectItem value="kochi">Kochi Harbor</SelectItem>
                        <SelectItem value="mumbai">Mumbai Port</SelectItem>
                        <SelectItem value="goa">Goa Beaches</SelectItem>
                        <SelectItem value="all">All Coastal Areas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Distribution Channels *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'sms', label: 'SMS', icon: MessageSquare },
                        { id: 'app', label: 'Mobile App', icon: Smartphone },
                        { id: 'social', label: 'Social Media', icon: Share2 },
                        { id: 'radio', label: 'Radio', icon: Radio },
                        { id: 'tv', label: 'Television', icon: Volume2 },
                        { id: 'email', label: 'Email', icon: Globe },
                        { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                        { id: 'loudspeaker', label: 'Loudspeakers', icon: Volume2 }
                      ].map((channel) => {
                        const Icon = channel.icon;
                        return (
                          <Button
                            key={channel.id}
                            variant={newAlert.channels?.includes(channel.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              const channels = newAlert.channels || [];
                              const newChannels = channels.includes(channel.id)
                                ? channels.filter(c => c !== channel.id)
                                : [...channels, channel.id];
                              setNewAlert(prev => ({ ...prev, channels: newChannels }));
                            }}
                            className="flex flex-col items-center space-y-1 h-auto py-3"
                          >
                            <Icon className="h-4 w-4" />
                            <span className="text-xs">{channel.label}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm mb-2 block">Languages *</label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {[
                        'English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Gujarati', 'Marathi', 'Bengali', 'Kannada', 'Odia', 'Punjabi', 'Assamese'
                      ].map((lang) => (
                        <Button
                          key={lang}
                          variant={newAlert.language?.includes(lang.toLowerCase()) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            const languages = newAlert.language || [];
                            const langLower = lang.toLowerCase();
                            const newLanguages = languages.includes(langLower)
                              ? languages.filter(l => l !== langLower)
                              : [...languages, langLower];
                            setNewAlert(prev => ({ ...prev, language: newLanguages }));
                          }}
                          className="text-xs"
                        >
                          {lang}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button onClick={handleSendAlert} className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Send Alert Now</span>
                    </Button>
                    <Button variant="outline">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule Later
                    </Button>
                    <Button variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Alert Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <span>{getTypeIcon(newAlert.type || 'advisory')}</span>
                        <Badge variant={newAlert.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {newAlert.severity}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm mb-1">
                        {newAlert.title || 'Alert Title'}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {newAlert.message || 'Alert message will appear here...'}
                      </p>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                      <p><strong>Channels:</strong> {(newAlert.channels || []).join(', ') || 'None selected'}</p>
                      <p><strong>Languages:</strong> {(newAlert.language || []).join(', ')}</p>
                      <p><strong>Estimated reach:</strong> ~45,000 people</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      const ms = Math.floor(Math.random() * 20) + 1;
                      setBroadcastResult(`${ms}ms`);
                      setTimeout(() => setBroadcastResult(null), 2000);
                    }}
                    >
                    <Radio className="h-4 w-4 mr-2" />
                    Test Broadcast
                    </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview All Languages
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Estimate Audience
                  </Button>
                </CardContent>
              </Card>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Emergency alerts will be sent immediately to all channels. Ensure accuracy before sending.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <Card key={alert.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                      <div>
                        <h3 className="font-semibold mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{alert.sentAt}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{alert.recipients?.toLocaleString()} recipients</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.targetRegions.join(', ')}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`}></div>
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  </div>

                  {alert.engagement && (
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                          <Eye className="h-4 w-4" />
                          <span>Viewed</span>
                        </div>
                        <p className="text-lg font-semibold">{alert.engagement.viewed.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          {Math.round((alert.engagement.viewed / (alert.recipients || 1)) * 100)}% rate
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Acknowledged</span>
                        </div>
                        <p className="text-lg font-semibold">{alert.engagement.acknowledged.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          {Math.round((alert.engagement.acknowledged / (alert.recipients || 1)) * 100)}% rate
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                          <Share2 className="h-4 w-4" />
                          <span>Shared</span>
                        </div>
                        <p className="text-lg font-semibold">{alert.engagement.shared.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">
                          {Math.round((alert.engagement.shared / (alert.recipients || 1)) * 100)}% rate
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: 'Tsunami Warning',
                description: 'Standard template for tsunami alerts',
                usage: 23,
                template: 'TSUNAMI WARNING: {location} - Seek higher ground immediately. Estimated arrival: {time}. Follow evacuation routes.'
              },
              {
                name: 'Storm Surge Advisory',
                description: 'Template for storm surge conditions',
                usage: 45,
                template: 'STORM SURGE ADVISORY: {location} - Coastal flooding expected. Avoid low-lying areas until {time}.'
              },
              {
                name: 'High Tide Warning',
                description: 'Template for abnormal tide conditions',
                usage: 67,
                template: 'HIGH TIDE WARNING: {location} - Unusually high tides expected at {time}. Stay away from shore areas.'
              },
              {
                name: 'All Clear',
                description: 'Template for clearing warnings',
                usage: 89,
                template: 'ALL CLEAR: {location} - Previous {hazard_type} warning has been lifted. Normal activities may resume.'
              },
              {
                name: 'Fishermen Advisory',
                description: 'Specific template for fishing community',
                usage: 34,
                template: 'FISHERMEN ADVISORY: {location} - {conditions} expected. Return to shore by {time} for safety.'
              },
              {
                name: 'Beach Closure',
                description: 'Template for beach safety alerts',
                usage: 12,
                template: 'BEACH CLOSURE: {location} - Beach access restricted due to {reason}. Expected reopening: {time}.'
              }
            ].map((template, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded text-sm">
                      {template.template}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Used {template.usage} times</span>
                      <Button size="sm" variant="outline">Use Template</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Alerts Sent</p>
                    <p className="text-2xl">247</p>
                    <p className="text-xs text-green-600">+15% this month</p>
                  </div>
                  <Bell className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reach</p>
                    <p className="text-2xl">1.2M</p>
                    <p className="text-xs text-green-600">+8% this month</p>
                  </div>
                  <Users className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Response</p>
                    <p className="text-2xl">8 min</p>
                    <p className="text-xs text-blue-600">2 min faster</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Engagement</p>
                    <p className="text-2xl">87%</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}