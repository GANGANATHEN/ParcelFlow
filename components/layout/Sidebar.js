"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useParcels } from "@/context/ParcelContext";
import {
  LayoutDashboard,
  UploadCloud,
  FileCheck2,
  Package,
  FileSpreadsheet,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Building2,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { stats, settings } = useParcels();

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      title: "Upload Parcels",
      href: "/upload",
      icon: UploadCloud,
      badge: "WhatsApp",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      title: "Parcel Verification",
      href: "/verification",
      icon: FileCheck2,
      badge: stats.todayPending > 0 ? stats.todayPending : null,
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300 font-bold",
    },
    {
      title: "All Parcels",
      href: "/parcels",
      icon: Package,
      badge: null,
    },
    {
      title: "Daily Excel",
      href: "/daily-excel",
      icon: FileSpreadsheet,
      badge: "XLSX",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col h-full max-h-screen shrink-0 bg-slate-900 text-white transition-all duration-300 ease-in-out border-r border-slate-800 shadow-xl lg:static",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo & Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-4 border-b border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Box className="h-6 w-6 stroke-[2.2]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  ParcelFlow
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Pro
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  Courier Operations Hub
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Branch / Location Badge */}
        {!isCollapsed && (
          <div className="shrink-0 px-4 py-2.5 bg-slate-800/40 border-b border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Building2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <span className="truncate font-medium">
                {settings.branchName || "Koramangala Hub (BLR-04)"}
              </span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto min-h-0 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative",
                  isActive
                    ? "bg-blue-600 text-white shadow-sm font-semibold"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
                title={isCollapsed ? item.title : undefined}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform group-hover:scale-105",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                  )}
                />
                {!isCollapsed && (
                  <span className="flex-1 truncate">{item.title}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0",
                      isActive
                        ? "bg-white text-blue-700 border-white/80"
                        : item.badgeColor || "bg-slate-700 text-slate-200 border-slate-600"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Verification Alert Callout */}
        {!isCollapsed && stats.todayPending > 0 && (
          <div className="shrink-0 mx-3 mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold text-amber-300">Action Required</span>
            </div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed mb-2">
              {stats.todayPending} parcel(s) waiting for scale weight & OCR verification.
            </p>
            <Link
              href="/verification"
              onClick={() => setIsMobileOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs font-semibold py-1.5 transition-colors"
            >
              Start Verification
            </Link>
          </div>
        )}

        {/* User Profile & Logout Bottom Bar */}
        <div className="shrink-0 border-t border-slate-800 p-3 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 font-bold text-sm border border-blue-400/20">
              {user?.name ? user.name.charAt(0) : "R"}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user?.name || "Rajesh Sharma"}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {user?.role || "Operations Manager"}
                </p>
              </div>
            )}
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

