import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MapDashboard } from './components/MapDashboard';
import { ReportingInterface } from './components/ReportingInterface';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AlertCenter } from './components/AlertCenter';
import Community from './components/community';
import { Toaster } from './components/ui/sonner';
import Verification from './components/Verification';
import LandingPage from './components/landingpage';

type UserRole = 'citizen' | 'official' | 'moderator' | 'responder' | 'analyst' | 'policy';
type ViewType =
  | 'landing'
  | 'dashboard'
  | 'report'
  | 'analytics'
  | 'verification'
  | 'alerts'
  | 'community';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing'); // start with landing page
  const [userRole, setUserRole] = useState<UserRole>('official'); // default role
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onLaunchDashboard={() => setCurrentView('dashboard')} />;
      case 'dashboard':
        return <MapDashboard isSidebarCollapsed={!isSidebarOpen} />;
      case 'report':
        return <ReportingInterface />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'alerts':
        return <AlertCenter sidebarOpen={isSidebarOpen} />;
      case 'verification':
        return <Verification />;
      case 'community':
        return <Community />;
      default:
        return <MapDashboard isSidebarCollapsed={!isSidebarOpen} />;
    }
  };

  const isDashboardView = currentView === 'dashboard';

  return (
    <div className="h-screen flex bg-gray-50">
      {currentView === 'landing' ? (
        // Landing Page should take full screen
        <div className="w-full h-full">{renderView()}</div>
      ) : (
        <>
          {/* Sidebar + main content (not shown on landing page) */}
          <Sidebar
            activeView={currentView}
            onViewChange={setCurrentView}
            userRole={userRole}
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          <main
            className="flex-1 overflow-auto transition-all duration-300"
            style={{ marginLeft: isSidebarOpen ? 256 : 64 }}
          >
            {isDashboardView ? (
              renderView()
            ) : (
              <div className="p-6">{renderView()}</div>
            )}
          </main>

          {/* Demo Role Switcher Toggle Button */}
          <button
            className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
            onClick={() => setShowRoleSwitcher((prev) => !prev)}
            aria-label={showRoleSwitcher ? 'Hide Role Switcher' : 'Show Role Switcher'}
            style={{ display: showRoleSwitcher ? 'none' : 'block' }}
          >
            Switch Role
          </button>

          {/* Demo Role Switcher */}
          {showRoleSwitcher && (
            <div className="fixed bottom-6 right-6 z-50">
              <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs text-gray-600 tracking-wide">Demo: Switch Role</p>
                  <button
                    className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded transition"
                    onClick={() => setShowRoleSwitcher(false)}
                    aria-label="Close Role Switcher"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  {(['citizen', 'official', 'moderator'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setUserRole(role);
                        setCurrentView(role === 'citizen' ? 'report' : 'dashboard');
                      }}
                      className={`px-3 py-2 text-xs rounded-lg transition-all duration-200 capitalize ${
                        userRole === role
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Toaster />
    </div>
  );
}
