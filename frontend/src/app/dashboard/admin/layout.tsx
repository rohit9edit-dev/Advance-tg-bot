"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  ShieldCheck,
  LayoutDashboard,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  LogOut,
  Send
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/admin" },
    { label: "Job Approvals", icon: CheckCircle, path: "/dashboard/admin/approvals" },
    { label: "User Management", icon: Users, path: "/dashboard/admin/users" },
    { label: "Platform Revenue", icon: BarChart3, path: "/dashboard/admin/revenue" },
    { label: "Manage Subscriptions", icon: CreditCard, path: "/dashboard/admin/subscriptions" },
    { label: "Broadcast Message", icon: Send, path: "/dashboard/admin/broadcast" },
    { label: "System Settings", icon: Settings, path: "/dashboard/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black text-blue-500 tracking-tighter flex items-center gap-2">
            <ShieldCheck className="w-8 h-8" />
            <span>ADMIN<span className="text-white">PANEL</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-950/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 bg-gray-950">
        {children}
      </main>
    </div>
  );
}
