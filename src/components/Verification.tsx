
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Loader2,
} from "lucide-react";
import { useState } from "react";

// Hackathon ready: accepts userRole prop for role-based actions
export default function VerificationPage({ userRole = "official" }: { userRole?: string }) {
  // Initial reports data
  const [reports, setReports] = useState([
    {
      id: "VRF-001",
      title: "Storm Surge Incident – Hurricane Maya",
      description: "Reported flooding and storm surge during Hurricane Maya.",
      author: "Emergency Response Team",
      location: "Florida Coast",
      date: "11/18/2024",
      status: "Pending",
    },
    {
      id: "VRF-002",
      title: "Tsunami Warning System Maintenance",
      description: "Calibration and performance check of tsunami sensors.",
      author: "Tech Team",
      location: "All Sensor Networks",
      date: "11/15/2024",
      status: "Verified",
    },
    {
      id: "VRF-003",
      title: "Coastal Hazard Assessment – Nov 2024",
      description: "Comprehensive hazard assessment for the Pacific coast.",
      author: "Dr. Sarah Chen",
      location: "Pacific Coast",
      date: "11/12/2024",
      status: "Flagged",
    },
  ]);

  // Toast/alert state
  const [toast, setToast] = useState<string | null>(null);
  // Loading spinner state
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Action handlers
  const handleAction = (id: string, action: "approve" | "reject" | "flag") => {
    setLoadingId(id);
    setTimeout(() => {
      setReports((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status:
                  action === "approve"
                    ? "Verified"
                    : action === "reject"
                    ? "Flagged"
                    : "Flagged",
              }
            : r
        )
      );
      setToast(
        action === "approve"
          ? "Report approved!"
          : action === "reject"
          ? "Report rejected!"
          : "Report flagged!"
      );
      setLoadingId(null);
      setTimeout(() => setToast(null), 2000);
    }, 900);
  };

  // Filter/search state (for hackathon, not implemented)
  // ...existing code...
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Verification Center
        </h1>
        <p className="text-gray-600">
          Review, verify, and manage hazard reports across regions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <Clock className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">Pending Reports</p>
            <p className="text-xl font-semibold">5</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">Verified Reports</p>
            <p className="text-xl font-semibold">12</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">Flagged Reports</p>
            <p className="text-xl font-semibold">2</p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex items-center w-full md:w-1/2 bg-white shadow rounded-lg px-3 py-2">
          <Search className="text-gray-400 h-5 w-5 mr-2" />
          <input
            type="text"
            placeholder="Search reports by title, author, or location..."
            className="w-full focus:outline-none text-sm"
          />
        </div>
        <select className="bg-white shadow rounded-lg px-3 py-2 text-sm">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Verified</option>
          <option>Flagged</option>
        </select>
      </div>

      {/* Report List */}
      <div className="space-y-4">
        {/* Empty state */}
        {reports.length === 0 && (
          <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
            No reports to verify.
          </div>
        )}
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {report.title}
              </h3>
              <p className="text-sm text-gray-600">{report.description}</p>
              <div className="text-xs text-gray-500 mt-2">
                {report.author} • {report.location} • {report.date}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  report.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : report.status === "Verified"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {report.status}
              </span>
              <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 text-sm">
                <Eye className="h-4 w-4" /> View
              </button>
              {/* Only show actions for Pending reports and for allowed roles */}
              {report.status === "Pending" && ["official", "moderator", "analyst"].includes(userRole) && (
                <>
                  <button
                    className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
                    disabled={loadingId === report.id}
                    onClick={() => handleAction(report.id, "approve")}
                  >
                    {loadingId === report.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ThumbsUp className="h-4 w-4" />
                    )} Approve
                  </button>
                  <button
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                    disabled={loadingId === report.id}
                    onClick={() => handleAction(report.id, "reject")}
                  >
                    {loadingId === report.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ThumbsDown className="h-4 w-4" />
                    )} Reject
                  </button>
                </>
              )}
              {/* Flag action always available */}
              <button
                className="flex items-center gap-1 text-orange-600 hover:text-orange-800 text-sm"
                disabled={loadingId === report.id}
                onClick={() => handleAction(report.id, "flag")}
              >
                {loadingId === report.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Flag className="h-4 w-4" />
                )} Flag
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast/alert for actions */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}

      {/* Coming Soon */}
      <div className="mt-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Multi-Tier Verification System
        </h2>
        <p className="text-white/90 mb-4">
          Coming soon – tiered approval workflows, collaborative verification,
          and audit tracking.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex flex-col items-center">
            <Clock className="h-6 w-6 mb-1" /> Initial Review
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-6 w-6 mb-1" /> Expert Approval
          </div>
          <div className="flex flex-col items-center">
            <AlertTriangle className="h-6 w-6 mb-1" /> Dispute Resolution
          </div>
        </div>
      </div>
    </div>
  );
}
