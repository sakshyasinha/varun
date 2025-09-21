import React, { useState, useEffect } from "react";
import { Search, Plus, Shield, Users, Ban, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type User = {
  name: string;
  initials: string;
  role: "Super Admin" | "Admin" | "Analyst";
  status: "online" | "offline" | "suspended";
  contact: string;
  meta: string;
  location: string;
  lastSeen: string;
  reports: number;
};

const initialUsers: User[] = [
  {
    name: "Dr. Sarah Chen",
    initials: "SC",
    role: "Super Admin",
    status: "online",
    contact: "s.chen@oceansafe.gov · +1-555-0101",
    meta: "Administration · Joined 2023-01-15 · 45 verified reports",
    location: "Pacific Coast HQ",
    lastSeen: "Just now",
    reports: 47,
  },
  {
    name: "Marcus Rodriguez",
    initials: "MR",
    role: "Admin",
    status: "online",
    contact: "m.rodriguez@oceansafe.gov · +1-555-0102",
    meta: "Operations · Joined 2023-02-20 · 22 verified reports",
    location: "Hawaii Station",
    lastSeen: "2 mins ago",
    reports: 23,
  },
  {
    name: "Emma Thompson",
    initials: "ET",
    role: "Analyst",
    status: "offline",
    contact: "emma.t@oceansafe.gov · +1-555-0103",
    meta: "Data Analysis · Joined 2023-03-10 · 87 verified reports",
    location: "California Coast",
    lastSeen: "10 mins ago",
    reports: 89,
  },
];

const roleColors: Record<string, string> = {
  "Super Admin": "linear-gradient(90deg,#7c3aed,#4f46e5)",
  Admin: "#ef4444",
  Analyst: "#7c3aed",
};

// 👇 Change this to test different roles
const userRole: "citizen" | "official" | "moderator" | "admin" | "super-admin" = "official"; // Change as needed

const canManage = userRole !== "citizen";

const CommunityPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showRoleModal, setShowRoleModal] = useState<null | number>(null);
  const [showActionModal, setShowActionModal] = useState<null | number>(null);
  const [showAddUser, setShowAddUser] = useState(false);

  // Fake live online/offline toggle
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((prev) =>
        prev.map((u) =>
          Math.random() > 0.9
            ? { ...u, status: u.status === "online" ? "offline" : "online" }
            : u
        )
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Dynamic Stats
  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-sky-400",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "online").length,
      icon: Shield,
      color: "text-green-400",
    },
    {
      title: "Suspended",
      value: users.filter((u) => u.status === "suspended").length,
      icon: Ban,
      color: "text-rose-400",
    },
    {
      title: "Offline",
      value: users.filter((u) => u.status === "offline").length,
      icon: Clock,
      color: "text-amber-400",
    },
  ];

  // Filters
  const filteredUsers = users.filter((u) => {
    const matchesQuery =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.contact.toLowerCase().includes(query.toLowerCase()) ||
      u.location.toLowerCase().includes(query.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesStatus =
      statusFilter === "All" || u.status === statusFilter.toLowerCase();
    return matchesQuery && matchesRole && matchesStatus;
  });

  // Handlers
  const changeRole = (idx: number, newRole: User["role"]) => {
    setUsers((prev) =>
      prev.map((u, i) => (i === idx ? { ...u, role: newRole } : u))
    );
    setShowRoleModal(null);
  };
  const suspendUser = (idx: number) => {
    setUsers((prev) =>
      prev.map((u, i) => (i === idx ? { ...u, status: "suspended" } : u))
    );
    setShowActionModal(null);
  };
  const deleteUser = (idx: number) => {
    setUsers((prev) => prev.filter((_, i) => i !== idx));
    setShowActionModal(null);
  };
  const addUser = (name: string, email: string, role: User["role"]) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const newUser: User = {
      name,
      initials,
      role,
      status: "offline",
      contact: `${email} · +1-555-9999`,
      meta: "New User · Joined today · 0 reports",
      location: "Unassigned",
      lastSeen: "Never",
      reports: 0,
    };
    setUsers((prev) => [...prev, newUser]);
    setShowAddUser(false);
  };

  return (
    <div
      className="min-h-screen text-gray-200 p-6"
      style={{
        background: "linear-gradient(180deg, #0b1317 0%, #0f1720 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-gray-400">
            Manage system users, roles, and permissions
          </p>
        </div>

        {/* Add User button only for managers */}
        {canManage && (
          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow"
          >
            <Plus size={18} /> Add User
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-[#26303a]/60 rounded-xl p-4 flex flex-col"
          >
            <s.icon className={`${s.color} mb-2`} />
            <div className="text-sm text-gray-400">{s.title}</div>
            <div className="text-2xl font-bold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="bg-[#26303a]/60 rounded-xl p-4 mt-6 flex flex-col md:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg py-2 px-3 text-gray-200"
        >
          <option>All</option>
          <option>Admin</option>
          <option>Analyst</option>
          <option>Super Admin</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black border border-gray-700 rounded-lg py-2 px-3 text-gray-200"
        >
          <option>All</option>
          <option>Online</option>
          <option>Offline</option>
          <option>Suspended</option>
        </select>
      </div>

      {/* User List */}
      <div className="mt-6 space-y-4">
        {filteredUsers.map((u, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.01 }}
            className="bg-[#26303a]/60 p-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-gray-800 to-gray-700">
                {u.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{u.name}</span>
                  <span
                    className="px-2 py-1 text-xs rounded-full text-white"
                    style={{ background: roleColors[u.role] }}
                  >
                    {u.role.toUpperCase()}
                  </span>
                  <span
                    className="px-2 py-1 text-xs rounded-full text-white"
                    style={{
                      background:
                        u.status === "online"
                          ? "#16a34a"
                          : u.status === "offline"
                          ? "#9ca3af"
                          : "#ef4444",
                    }}
                  >
                    {u.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm text-gray-400">{u.contact}</div>
                <div className="text-xs text-gray-500">{u.meta}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      u.status === "online"
                        ? "bg-green-400"
                        : u.status === "offline"
                        ? "bg-gray-400"
                        : "bg-red-500"
                    }`}
                  />
                  {u.location} · {u.lastSeen} · {u.reports} reports
                </div>
              </div>
            </div>

            {/* Only show management controls if allowed */}
            {canManage && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRoleModal(i)}
                  className="px-3 py-1 rounded-lg bg-black/30 border border-gray-700 hover:bg-black/40 text-sm"
                >
                  Change Role
                </button>
                <button
                  onClick={() => setShowActionModal(i)}
                  className="px-3 py-1 rounded-lg bg-black/30 border border-gray-700 hover:bg-black/40 text-sm"
                >
                  Actions
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Role Modal */}
      <AnimatePresence>
        {showRoleModal !== null && canManage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="bg-black text-gray-900 p-6 rounded-xl w-80 shadow-xl border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Change Role</h2>
              {["Super Admin", "Admin", "Analyst"].map((r) => (
                <button
                  key={r}
                  onClick={() => changeRole(showRoleModal, r as User["role"])}
                  className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                >
                  {r}
                </button>
              ))}
              <button
                onClick={() => setShowRoleModal(null)}
                className="mt-3 w-full px-3 py-2 rounded bg-black/30 hover:bg-black/40"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions Modal */}
      <AnimatePresence>
        {showActionModal !== null && canManage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="bg-black text-gray-900 p-6 rounded-xl w-80 shadow-xl border border-gray-200">
              <h2 className="text-lg font-bold mb-4">Actions</h2>
              <button
                onClick={() => suspendUser(showActionModal)}
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Suspend User
              </button>
              <button
                onClick={() => deleteUser(showActionModal)}
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-500"
              >
                Delete User
              </button>
              <button
                onClick={() => setShowActionModal(null)}
                className="mt-3 w-full px-3 py-2 rounded bg-black/30 hover:bg-black/40"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddUser && canManage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            <div className="bg-black text-gray-200 p-6 rounded-xl w-96 shadow-xl border border-gray-700">
              <h2 className="text-lg font-bold mb-4">Add New User</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const name = (
                    e.currentTarget.elements.namedItem(
                      "name"
                    ) as HTMLInputElement
                  ).value;
                  const email = (
                    e.currentTarget.elements.namedItem(
                      "email"
                    ) as HTMLInputElement
                  ).value;
                  const role = (
                    e.currentTarget.elements.namedItem(
                      "role"
                    ) as HTMLSelectElement
                  ).value as User["role"];
                  addUser(name, email, role);
                }}
                className="space-y-3"
              >
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-gray-200"
                />
                <input
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-gray-200"
                />
                <select
                  name="role"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded text-gray-200"
                >
                  <option>Admin</option>
                  <option>Analyst</option>
                  <option>Super Admin</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddUser(false)}
                    className="px-4 py-2 bg-black/30 hover:bg-black/40 rounded text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



export default CommunityPage;
