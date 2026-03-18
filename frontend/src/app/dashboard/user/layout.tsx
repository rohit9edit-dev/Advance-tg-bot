"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  FolderLock,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Award,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  const menuItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard/user" },
    { label: "Profile", icon: User, path: "/dashboard/user/profile" },
    { label: "Applications", icon: Briefcase, path: "/dashboard/user/applications" },
    { label: "Resume Builder", icon: FileText, path: "/dashboard/user/resume" },
    { label: "Document Locker", icon: FolderLock, path: "/dashboard/user/documents" },
    { label: "Job Alerts", icon: Bell, path: "/dashboard/user/alerts" },
    { label: "Settings", icon: Settings, path: "/dashboard/user/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
            CAREER<span className="text-gray-900">HUB</span>
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
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-500 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-50">
          <div className="flex items-center gap-4 px-4 py-3 bg-blue-50/50 rounded-2xl mb-4 border border-blue-100">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">
              {user?.fullName?.[0] || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black text-gray-900 truncate">{user?.fullName}</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12">
        {children}
      </main>
    </div>
  );
}
