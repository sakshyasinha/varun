import { useState } from "react";
import logo from "../assets/ac1af033383c8cea581deb0dcac634d3a8372b10.png";
import {
  BarChart3,
  MapPin,
  AlertTriangle,
  MessageSquare,
  Shield,
  Users,
  Settings,
  Menu,
  X,
  Waves,
} from "lucide-react";
import clsx from "clsx";

type UserRole =
  | "citizen"
  | "official"
  | "moderator"
  | "responder"
  | "analyst"
  | "policy";

type ViewType =
  | "dashboard"
  | "report"
  | "analytics"
  | "verification"
  | "alerts"
  | "community";

interface NavigationItem {
  id: ViewType | string; // string because some labels may not strictly be ViewType
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  userRole: UserRole;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ activeView, onViewChange, userRole, isOpen, setIsOpen }: SidebarProps) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [displayName, setDisplayName] = useState("Your Name");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Define common and role-specific navigation items
  const getNavigationItems = (): NavigationItem[] => {
    // Citizen should not see Alert Center
    const commonItems: NavigationItem[] = [
      { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      ...(userRole !== "citizen"
        ? [{ id: "alerts", label: "Alert Center", icon: AlertTriangle }]
        : []),
    ];

    const roleSpecificItems: Record<UserRole, NavigationItem[]> = {
      citizen: [
        { id: "report", label: "Report Hazard", icon: MapPin },
        { id: "community", label: "Community", icon: Users },
      ],
      official: [
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "verification", label: "Verification", icon: Shield },
        { id: "community", label: "Community", icon: Users },
      ],
      moderator: [
        { id: "verification", label: "Verification", icon: Shield },
        { id: "community", label: "Community", icon: MessageSquare },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ],
      responder: [
        { id: "report", label: "Field Reports", icon: MapPin },
        { id: "community", label: "Community", icon: Users },
      ],
      analyst: [
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "verification", label: "Data Review", icon: Shield },
      ],
      policy: [
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "community", label: "Reports", icon: MessageSquare },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[userRole] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 h-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white transition-all duration-300 z-50 shadow-xl",
        isOpen ? "w-64" : "w-16"
      )}
      aria-label="Sidebar Navigation"
    >
      <ul className="flex flex-col h-full">
        {/* Header */}
        <li className="flex items-center justify-between px-4 py-3 border-b border-blue-100">
          <div className="flex items-center gap-2">
          <img
  src={logo}
  alt="Logo"
  className={clsx(
    "transition-all duration-300",
    isOpen ? "h-16 w-auto" : "h-8 w-auto"
  )}
/>
            {isOpen && (
              <span className="font-bold text-lg whitespace-nowrap">
                Project Varun
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            type="button"
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </li>

        {/* User Role */}
        <li className="px-4 py-3 border-b border-blue-100 flex justify-center">
          {isOpen ? (
            <div className="bg-blue-50 rounded-lg p-3 text-center w-full">
              <p className="text-xs text-blue-600 uppercase tracking-wider mb-1">
                Current Role
              </p>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium capitalize select-none">
                {userRole}
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold capitalize select-none">
              {userRole.charAt(0)}
            </div>
          )}
        </li>

        {/* Navigation Items */}
        <li className="flex flex-col gap-1 mt-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as ViewType)}
                className={clsx(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-left",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                    : "text-white/80 hover:bg-blue-700 hover:text-white"
                )}
                type="button"
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {isOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </li>

        {/* Spacer to push settings to bottom */}
        <li className="flex-grow" aria-hidden="true" />

        {/* Settings */}
        <li className="px-4 py-3 border-t border-blue-100">
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/80 hover:bg-blue-700 hover:text-white transition-all duration-200"
            type="button"
            aria-label="Settings"
            onClick={() => setShowSettingsModal(true)}
          >
            <Settings className="h-5 w-5" aria-hidden="true" />
            {isOpen && <span className="text-sm">Settings</span>}
          </button>
        </li>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="bg-black text-gray-200 p-6 rounded-xl w-96 shadow-xl border border-gray-700">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                setShowSettingsModal(false);
              }}
              className="space-y-4"
            >
              <div className="flex flex-col items-center gap-2">
                <label htmlFor="profilePic" className="cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => setProfilePic(ev.target?.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <span className="text-xs text-blue-400 mt-1 block">Change Profile Picture</span>
                </label>
              </div>
              <div>
                <label htmlFor="displayName" className="block text-sm mb-1">Name</label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-gray-200"
                  required
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowSettingsModal(false)} className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded text-gray-200">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </ul>
    </nav>
  );
}
