"use client";

import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  PieChart,
  CreditCard,
  Settings,
  LogOut,
  PlusCircle
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  const menuItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/dashboard/company" },
    { label: "Post New Job", icon: PlusCircle, path: "/dashboard/company/jobs/post" },
    { label: "My Job Listings", icon: Briefcase, path: "/dashboard/company/jobs" },
    { label: "All Applications", icon: Users, path: "/dashboard/company/applications" },
    { label: "Analytics", icon: PieChart, path: "/dashboard/company/analytics" },
    { label: "Billing & Plans", icon: CreditCard, path: "/dashboard/company/billing" },
    { label: "Settings", icon: Settings, path: "/dashboard/company/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
            CAREER<span className="text-gray-900">HUB</span>
            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Employer Edition</span>
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
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12">
        {children}
      </main>
    </div>
  );
}
