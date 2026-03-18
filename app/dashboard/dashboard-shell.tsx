"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTranslation } from "@/lib/i18n/i18n-context";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();

  const navItems = [
    { href: "/dashboard", label: t.sidebar.dashboard, icon: LayoutDashboard },
    { href: "/dashboard/projects", label: t.sidebar.projects, icon: FolderKanban },
    { href: "/dashboard/skills", label: t.sidebar.skills, icon: Sparkles },
    { href: "/dashboard/experiences", label: t.sidebar.experiences, icon: Briefcase },
    { href: "/dashboard/users", label: t.sidebar.users, icon: Users },
    { href: "/dashboard/analytics", label: t.sidebar.analytics, icon: BarChart3 },
    { href: "/dashboard/settings", label: t.sidebar.settings, icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <>
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">{t.sidebar.backoffice}</h1>
        <p className="text-sm text-slate-400 mt-1">{t.sidebar.portfolio}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.href)
                ? "bg-slate-800 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          <span>{t.sidebar.viewSite}</span>
        </Link>
        <button
          onClick={async () => {
            await authClient.signOut();
            router.push("/admin");
            router.refresh();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span>{t.sidebar.signOut}</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col shrink-0">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold text-slate-900">{t.sidebar.backoffice}</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
