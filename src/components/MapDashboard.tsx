import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  MapPin,
  Filter,
  ChevronDown,
  Activity,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import exampleImage from "../assets/generated-image (1).png";
import VarunMarker from "../assets/map-marker.png"; // Adjust path based on your project setup
import tsunami from "../assets/Frame 2.png";
import storm from "../assets/Frame 3.png";
import waves from "../assets/Frame 4.png";
import erosion from "../assets/Frame 5.png";

interface HazardReport {
  id: string;
  type: "tsunami" | "storm-surge" | "abnormal-waves" | "coastal-erosion";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  coordinates: [number, number];
  mapPosition: [number, number];
  reportedBy: "citizen" | "social-media" | "official";
  timestamp: string;
  verified: boolean;
  description: string;
  images?: number;
}

interface FilterState {
  critical: boolean;
  high: boolean;
  medium: boolean;
  low: boolean;
}

interface EmergencyAlert {
  id: string;
  title: string;
  location: string;
  severity: "low" | "medium" | "high" | "critical";
  time: string;
  description: string;
}

interface MapDashboardProps {
  isSidebarCollapsed: boolean;
  sidebarWidthExpanded?: number; // Optional: width of sidebar when expanded (default 256px)
  sidebarWidthCollapsed?: number; // Optional: width of sidebar when collapsed (default 64px)
}

const EmergencyPanel = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        zIndex: 20,
        width: "250px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(254, 226, 226, 0.95)", // light red
          border: "1px solid rgba(239, 68, 68, 0.5)", // red border
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Emergency Header */}
        <div
          style={{
            backgroundColor: "#B91C1C", // dark red
            color: "white",
            padding: "12px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              margin: 0,
            }}
          >
            🚨 EMERGENCY ALERT 🚨
          </h2>
        </div>

        {/* Content Area */}
        <div
          style={{
            padding: "16px",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#991B1B", // deep red for text
          }}
        >
          <div>
            <AlertTriangle
              style={{
                width: "48px",
                height: "48px",
                margin: "0 auto 12px auto",
                color: "#DC2626", // bright red
              }}
            />
            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
              🌊 Huge Waves Detected
            </p>
            <p style={{ fontSize: "13px", marginTop: "4px" }}>
              Location: Puri, Odisha
            </p>
            <p
              style={{
                fontSize: "12px",
                marginTop: "8px",
                color: "#6B7280", // muted grey
              }}
            >
              Stay away from the coast and follow safety advisories.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export function MapDashboard({
  isSidebarCollapsed,
  sidebarWidthExpanded = 256,
  sidebarWidthCollapsed = 64,
}: MapDashboardProps) {
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    critical: true,
    high: true,
    medium: true,
    low: true,
  });
  const [filtersExpanded, setFiltersExpanded] = useState(true);

  const hazardReports: HazardReport[] = [
    {
      id: "1",
      type: "tsunami",
      severity: "critical",
      location: "Chennai Coast, Tamil Nadu",
      coordinates: [13.0827, 80.2707],
      mapPosition: [45, 86],
      reportedBy: "citizen",
      timestamp: "5 minutes ago",
      verified: false,
      description: "Unusual wave patterns and rapid water recession observed near Marina Beach",
      images: 3,
    },
    {
      id: "2",
      type: "storm-surge",
      severity: "high",
      location: "Visakhapatnam, Andhra Pradesh",
      coordinates: [17.6868, 83.2185],
      mapPosition: [50, 80],
      reportedBy: "official",
      timestamp: "12 minutes ago",
      verified: true,
      description: "Storm surge warning issued by meteorological department",
    },
    {
      id: "3",
      type: "abnormal-waves",
      severity: "medium",
      location: "Kochi Harbor, Kerala",
      coordinates: [9.9312, 76.2673],
      mapPosition: [30, 78],
      reportedBy: "social-media",
      timestamp: "25 minutes ago",
      verified: true,
      description: "Multiple social media reports of unusual tidal patterns",
    },
    {
      id: "4",
      type: "coastal-erosion",
      severity: "low",
      location: "Puri Beach, Odisha",
      coordinates: [19.8135, 85.8312],
      mapPosition: [62, 58],
      reportedBy: "citizen",
      timestamp: "45 minutes ago",
      verified: false,
      description: "Increased coastal erosion observed after recent storm",
    },
    {
      id: "5",
      type: "storm-surge",
      severity: "high",
      location: "Mumbai Coast, Maharashtra",
      coordinates: [19.076, 72.8777],
      mapPosition: [24, 62],
      reportedBy: "official",
      timestamp: "1 hour ago",
      verified: true,
      description: "High tide and storm surge advisory in effect",
    },
  ];

  const getSeverityColor = (
    severity: HazardReport["severity"]
  ): { bg: string; border: string; text: string } => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-gradient-to-br from-red-600 via-red-500 to-red-700",
          border: "border-red-600",
          text: "text-red-600",
        };
      case "high":
        return {
          bg: "bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600",
          border: "border-orange-600",
          text: "text-orange-500",
        };
      case "medium":
        return {
          bg: "bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500",
          border: "border-yellow-600",
          text: "text-yellow-500",
        };
      case "low":
        return {
          bg: "bg-gradient-to-br from-green-400 via-green-300 to-green-600",
          border: "border-green-600",
          text: "text-green-500",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-400 via-gray-300 to-gray-600",
          border: "border-gray-600",
          text: "text-gray-500",
        };
    }
  };

  const filteredReports = hazardReports.filter(
    (report) => filters[report.severity]
  );

  const handleFilterChange = (severity: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [severity]: !prev[severity],
    }));
  };

  const emergencyAlerts: EmergencyAlert[] = [
    {
      id: "e1",
      title: "Cyclone Biparjoy Alert",
      location: "Gujarat Coast",
      severity: "critical",
      time: "2 hours ago",
      description:
        "Extremely severe cyclonic storm approaching Gujarat coastline. Evacuation orders in effect for coastal districts.",
    },
    {
      id: "e2",
      title: "High Wave Alert",
      location: "Karnataka Coast",
      severity: "high",
      time: "4 hours ago",
      description: "Wave heights of 3-4 meters expected. Fishing activities suspended.",
    },
  ];

  // Sidebar width for layout adjustment
  // Removed margin and width so map starts flush with sidebar

  return (
    <div className="flex h-full w-full overflow-hidden ">
      <main className="relative h-full bg-transparent w-full">
       {/* Map Background */}
<div className="absolute inset-0">
  <img
    src={exampleImage}
    alt="Indian Ocean Hazard Monitoring Map"
    className="w-full h-full object-contain bg-black"
  />

  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-transparent to-blue-900/70 pointer-events-none" />
</div>


        {/* Emergency Panel (top-right) */}
        <EmergencyPanel />

        {/* Filters Panel */}
        <div className="absolute top-8 left-8 z-10">
          <Card className="w-56 bg-black/80 backdrop-blur-lg border-gray-700 shadow-2xl text-white rounded-xl">
            <CardHeader className="pb-2">
              <button
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="flex items-center justify-between w-full text-left"
                type="button"
                aria-expanded={filtersExpanded}
                aria-controls="filters-content"
              >
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm font-semibold tracking-wide">Filters</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    filtersExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </CardHeader>
            {filtersExpanded && (
              <CardContent className="pt-0" id="filters-content">
                <div className="space-y-2">
                  <p className="text-xs text-gray-300 mb-2 font-semibold">Legend</p>
                  {[
                    { key: "critical", label: "Critical", color: getSeverityColor("critical") },
                    { key: "high", label: "High", color: getSeverityColor("high") },
                    { key: "medium", label: "Medium", color: getSeverityColor("medium") },
                    { key: "low", label: "Low", color: getSeverityColor("low") },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.key}
                        checked={filters[item.key]}
                        onCheckedChange={() => handleFilterChange(item.key)}
                        className="border-gray-400"
                      />
                      <div
                        className={`w-3 h-3 rounded-full border ${item.color.border} ${item.color.bg} shadow`}
                        aria-hidden="true"
                      />
                      <label
                        htmlFor={item.key}
                        className="text-xs text-gray-200 cursor-pointer font-medium select-none"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Hazard Markers */}
        {filteredReports.map((report) => {
          const colors = getSeverityColor(report.severity);
          let markerImg = VarunMarker;
          if (report.type === "tsunami") markerImg = tsunami;
          else if (report.type === "storm-surge") markerImg = storm;
          else if (report.type === "abnormal-waves") markerImg = waves;
          else if (report.type === "coastal-erosion") markerImg = erosion;
          return (
            <div
              key={report.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{
                left: `${report.mapPosition[0]}%`,
                top: `${report.mapPosition[1]}%`,
              }}
              onClick={() => setSelectedReport(report)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedReport(report);
                }
              }}
              aria-label={`Open details for hazard report at ${report.location}`}
            >
              <div className="relative group">
                <div
                  className={`w-8 h-8 rounded-full border-2 shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${
                    report.severity === "critical" ? "animate-pulse" : ""
                  }`}
                >
                  <img
                    src={markerImg}
                    alt={report.type + " marker"}
                    className="w-9 h-9 object-contain"
                  />
                </div>
                {!report.verified && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white" />
                )}

                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {report.location}
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected Report Details */}
        {selectedReport && (
          <div
            className="absolute bottom-6 right-6 z-30 w-80"
            role="region"
            aria-label="Selected hazard report details"
          >
            <Card className="bg-white shadow-xl border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span aria-hidden="true">
                      {/* Optional: You could display the same image here if desired */}
                    </span>
                    <span className="capitalize">{selectedReport.type.replace("-", " ")}</span>
                  </CardTitle>
                  <Badge
                    variant={selectedReport.severity === "critical" ? "destructive" : "secondary"}
                    className="capitalize"
                  >
                    {selectedReport.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span>{selectedReport.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span>{selectedReport.timestamp}</span>
                  </div>

                  <p className="text-sm text-gray-700">{selectedReport.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs capitalize select-none">
                        {selectedReport.reportedBy.replace("-", " ")}
                      </Badge>
                      {selectedReport.verified && (
                        <Badge variant="default" className="text-xs bg-green-500 select-none">
                          Verified
                        </Badge>
                      )}
                    </div>

                    {selectedReport.images && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500 select-none">
                        <span>{selectedReport.images} photos</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedReport(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Status Bar */}
        <div className="absolute bottom-6 left-6 z-10">
          <Card className="bg-black/70 backdrop-blur-sm border-gray-600 text-white">
            <CardContent className="p-3">
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <Activity className="h-3 w-3" aria-hidden="true" />
                  <span>Live Monitoring</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" aria-hidden="true" />
                  <span>{filteredReports.length} Reports</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" aria-hidden="true" />
                  <span>89% Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
