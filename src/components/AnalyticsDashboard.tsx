import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Share2,
  Download,
  Filter,
  Calendar,
  Map
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function AnalyticsDashboard() {
  // Mock data for charts
  const reportsOverTime = [
    { date: '2024-01-01', citizen: 12, social: 8, official: 3 },
    { date: '2024-01-02', citizen: 15, social: 12, official: 5 },
    { date: '2024-01-03', citizen: 8, social: 15, official: 2 },
    { date: '2024-01-04', citizen: 22, social: 18, official: 7 },
    { date: '2024-01-05', citizen: 18, social: 25, official: 4 },
    { date: '2024-01-06', citizen: 25, social: 20, official: 8 },
    { date: '2024-01-07', citizen: 30, social: 35, official: 12 }
  ];

  const hazardTypeData = [
    { name: 'Tsunami', value: 35, color: '#ef4444' },
    { name: 'Storm Surge', value: 28, color: '#f97316' },
    { name: 'Abnormal Waves', value: 22, color: '#eab308' },
    { name: 'Coastal Erosion', value: 15, color: '#22c55e' }
  ];

  const severityDistribution = [
    { severity: 'Critical', count: 8, percentage: 15 },
    { severity: 'High', count: 18, percentage: 35 },
    { severity: 'Medium', count: 20, percentage: 38 },
    { severity: 'Low', count: 6, percentage: 12 }
  ];

  const socialMediaMetrics = [
    { platform: 'Twitter/X', mentions: 1247, sentiment: 72, trend: 'up' },
    { platform: 'Facebook', mentions: 856, sentiment: 68, trend: 'down' },
    { platform: 'YouTube', mentions: 234, sentiment: 81, trend: 'up' },
    { platform: 'Instagram', mentions: 189, sentiment: 75, trend: 'stable' }
  ];

  const verificationStats = [
    { status: 'Verified', count: 142, percentage: 68, color: 'bg-green-500' },
    { status: 'Pending', count: 45, percentage: 22, color: 'bg-yellow-500' },
    { status: 'Rejected', count: 21, percentage: 10, color: 'bg-red-500' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4"></div>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights and social media analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl">1,247</p>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+12%</span>
                  <span className="text-gray-500">vs last week</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified Reports</p>
                <p className="text-2xl">856</p>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+8%</span>
                  <span className="text-gray-500">verification rate</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Social Mentions</p>
                <p className="text-2xl">2,526</p>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">-3%</span>
                  <span className="text-gray-500">vs yesterday</span>
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl">3,421</p>
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+15%</span>
                  <span className="text-gray-500">this month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Reports Analytics</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={reportsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="citizen" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    <Area type="monotone" dataKey="social" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                    <Area type="monotone" dataKey="official" stackId="1" stroke="#10b981" fill="#10b981" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hazard Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={hazardTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {hazardTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {severityDistribution.map((item) => (
                    <div key={item.severity} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.severity}</span>
                        <span>{item.count} reports ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Verification Time</span>
                    <Badge>2.3 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Response Time</span>
                    <Badge>45 minutes</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Alert Distribution Time</span>
                    <Badge variant="secondary">8 minutes</Badge>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>System Performance</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialMediaMetrics.map((platform) => (
                    <div key={platform.platform} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{platform.platform}</span>
                        {getTrendIcon(platform.trend)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Mentions</p>
                          <p className="text-xl">{platform.mentions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Sentiment</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">{platform.sentiment}%</span>
                            <div className="flex-1">
                              <Progress value={platform.sentiment} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { keyword: '#CoastalAlert', mentions: 1247, trend: 'up' },
                    { keyword: '#TsunamiWatch', mentions: 856, trend: 'up' },
                    { keyword: '#MarinaSafety', mentions: 634, trend: 'down' },
                    { keyword: '#HighTides', mentions: 421, trend: 'up' },
                    { keyword: '#StormSurge', mentions: 312, trend: 'stable' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{item.keyword}</span>
                        {getTrendIcon(item.trend)}
                      </div>
                      <Badge variant="outline">{item.mentions}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Positive</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">72%</span>
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-3/4 h-2 bg-green-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Neutral</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">18%</span>
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-1/5 h-2 bg-gray-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Negative</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">10%</span>
                      <div className="w-20 h-2 bg-gray-200 rounded">
                        <div className="w-1/12 h-2 bg-red-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { language: 'Hindi', percentage: 35 },
                    { language: 'English', percentage: 28 },
                    { language: 'Tamil', percentage: 18 },
                    { language: 'Telugu', percentage: 12 },
                    { language: 'Malayalam', percentage: 7 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.language}</span>
                        <span>{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationStats.map((stat) => (
                    <div key={stat.status} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${stat.color}`}></div>
                        <span className="font-medium">{stat.status}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{stat.count}</p>
                        <p className="text-sm text-gray-600">{stat.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 border-l-4 border-green-500 bg-green-50">
                    <Clock className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">142 reports verified</p>
                      <p className="text-xs text-gray-600">Average time: 2.3 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">45 reports pending</p>
                      <p className="text-xs text-gray-600">Oldest: 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 border-l-4 border-red-500 bg-red-50">
                    <Clock className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">21 reports rejected</p>
                      <p className="text-xs text-gray-600">Common reason: Insufficient evidence</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hotspot Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { location: 'Chennai Coast', reports: 67, severity: 'High', trend: 'up' },
                    { location: 'Visakhapatnam', reports: 45, severity: 'Medium', trend: 'stable' },
                    { location: 'Kochi Harbor', reports: 34, severity: 'Medium', trend: 'down' },
                    { location: 'Mumbai Port', reports: 28, severity: 'Low', trend: 'up' },
                    { location: 'Goa Beaches', reports: 21, severity: 'Low', trend: 'stable' }
                  ].map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{location.location}</p>
                        <p className="text-sm text-gray-600">{location.reports} reports</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={location.severity === 'High' ? 'destructive' : 'secondary'}>
                          {location.severity}
                        </Badge>
                        {getTrendIcon(location.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { region: 'Tamil Nadu', reports: 156 },
                    { region: 'Andhra Pradesh', reports: 134 },
                    { region: 'Kerala', reports: 98 },
                    { region: 'Maharashtra', reports: 87 },
                    { region: 'Goa', reports: 45 },
                    { region: 'Karnataka', reports: 43 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reports" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}