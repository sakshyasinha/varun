import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Bell, 
  Menu, 
  Shield, 
  Users, 
  BarChart3, 
  Map, 
  AlertTriangle,
  Settings
} from 'lucide-react';
import varunLogo from 'figma:asset/ac1af033383c8cea581deb0dcac634d3a8372b10.png';
import varunLogoWithText from 'figma:asset/bb58d367c796695bca9bea5fd340149a085325b1.png';

interface NavbarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: 'citizen' | 'official' | 'moderator' | 'responder' | 'analyst' | 'policy';
}

export function Navbar({ activeView, onViewChange, userRole }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Map },
      { id: 'reports', label: 'Reports', icon: AlertTriangle },
    ];

    switch (userRole) {
      case 'citizen':
        return [
          { id: 'dashboard', label: 'Home', icon: Map },
          { id: 'report', label: 'Report Hazard', icon: AlertTriangle },
          { id: 'alerts', label: 'Alerts', icon: Bell },
        ];
      case 'official':
        return [
          ...baseItems,
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'verification', label: 'Verification', icon: Shield },
          { id: 'alerts', label: 'Alert Center', icon: Bell },
        ];
      case 'moderator':
        return [
          ...baseItems,
          { id: 'verification', label: 'Verification', icon: Shield },
          { id: 'community', label: 'Community', icon: Users },
        ];
      default:
        return baseItems;
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'citizen': return 'bg-blue-500';
      case 'official': return 'bg-blue-700';
      case 'moderator': return 'bg-cyan-500';
      case 'responder': return 'bg-orange-500';
      case 'analyst': return 'bg-blue-600';
      case 'policy': return 'bg-slate-500';
      default: return 'bg-blue-500';
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white border-b border-blue-100 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src={varunLogo} 
              alt="Project Varun Logo" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-xl text-gray-900" style={{ fontWeight: 600 }}>Project Varun</h1>
              <p className="text-xs text-gray-500">INCOIS Ocean Hazard Platform</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 ml-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Toggle */}
          <Button variant="outline" size="sm">
            <span className="text-sm">EN</span>
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback>DM</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm text-gray-900">Disaster Manager</p>
              <div className="flex items-center space-x-1">
                <div className={`h-2 w-2 rounded-full ${getRoleColor()}`}></div>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    onViewChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}