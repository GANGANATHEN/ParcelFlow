"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useParcels } from "@/context/ParcelContext";
import {
  Menu,
  Search,
  Bell,
  Calendar,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Building,
  CheckCheck,
  AlertTriangle,
  FileSpreadsheet,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header({ setIsMobileOpen, onOpenSearch }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { notifications, markNotificationsAsRead, settings } = useParcels();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Compute breadcrumbs from pathname
  const getBreadcrumbs = () => {
    if (pathname === "/") {
      return { title: "Operations Dashboard", crumbs: ["Dashboard"] };
    }
    if (pathname === "/upload") {
      return { title: "Upload Parcel Images", crumbs: ["Operations", "Upload"] };
    }
    if (pathname === "/verification") {
      return { title: "Parcel Verification Workspace", crumbs: ["Operations", "Verification"] };
    }
    if (pathname === "/parcels") {
      return { title: "All Consignments", crumbs: ["Parcels", "Registry"] };
    }
    if (pathname === "/daily-excel") {
      return { title: "Daily Excel Export & Manifest", crumbs: ["Reports", "Daily Excel"] };
    }
    if (pathname === "/settings") {
      return { title: "Hub Configuration & Settings", crumbs: ["System", "Settings"] };
    }
    return { title: "Courier Management", crumbs: ["Home"] };
  };

  const { title, crumbs } = getBreadcrumbs();

  // Current formatted date matching local demo time (2 Nov 2026)
  const formattedDate = "Monday, 02 Nov 2026";

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur-xs shadow-xs">
      {/* Left: Mobile hamburger + Page Title & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="text-slate-400">ParcelFlow</span>
            {crumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3 w-3 text-slate-400" />
                <span
                  className={idx === crumbs.length - 1 ? "text-slate-800 font-semibold" : ""}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </nav>
          <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Actions: Date Widget + Search + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Date Display Pill */}
        <div className="hidden md:flex items-center gap-2 rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700">
          <Calendar className="h-3.5 w-3.5 text-blue-600" />
          <span>{formattedDate}</span>
        </div>

        {/* Search Trigger Button */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors shadow-2xs"
          title="Search parcels (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search Consignments...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-500 font-bold">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-xs animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white p-0 shadow-xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-semibold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markNotificationsAsRead}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-3.5 transition-colors flex items-start gap-3",
                        notif.read ? "bg-white" : "bg-blue-50/40"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg p-2 shrink-0 mt-0.5",
                          notif.type === "warning"
                            ? "bg-amber-100 text-amber-700"
                            : notif.type === "success"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {notif.type === "warning" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : notif.type === "success" ? (
                          <FileSpreadsheet className="h-4 w-4" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 leading-snug">
                          {notif.title}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {notif.message}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 inline-block">
                          {notif.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-slate-100 bg-slate-50 p-2 text-center">
                <Link
                  href="/verification"
                  onClick={() => setIsNotifOpen(false)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  View Pending Verification Queue →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-lg p-1.5 text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="User profile menu"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs">
              {user?.name ? user.name.charAt(0) : "R"}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-none">
                {user?.name || "Rajesh Sharma"}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                {user?.role || "Operations Lead"}
              </span>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 duration-150">
              <div className="px-3 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name || "Rajesh Sharma"}</p>
                <p className="text-[11px] text-slate-500 truncate">
                  {user?.username || "admin@parcelflow.com"}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md">
                  <Building className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{settings.branchName || "Koramangala Hub"}</span>
                </div>
              </div>

              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Settings className="h-4 w-4 text-slate-500" />
                  Hub & Profile Settings
                </Link>
                <Link
                  href="/daily-excel"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  <FileSpreadsheet className="h-4 w-4 text-slate-500" />
                  Daily Excel Manifests
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4 text-rose-500" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

