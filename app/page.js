"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParcels } from "@/context/ParcelContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ParcelStatusBadge } from "@/components/common/ParcelStatusBadge";
import { WEEKLY_CHART_DATA } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Package,
  Clock,
  Scale,
  CheckCircle2,
  FileSpreadsheet,
  UploadCloud,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  Eye,
  FileCheck,
  ShieldCheck,
  Building,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export default function DashboardPage() {
  const router = useRouter();
  const { parcels, stats, settings } = useParcels();

  // Filter today's recent parcels
  const todayParcels = useMemo(() => {
    return parcels.filter((p) => p.bookingDate === stats.todayStr);
  }, [parcels, stats.todayStr]);

  // Pending parcels that need immediate verification
  const pendingParcels = useMemo(() => {
    return parcels.filter((p) => p.status === "pending").slice(0, 4);
  }, [parcels]);

  // Recent 6 parcels across the hub
  const recentParcels = useMemo(() => {
    return parcels.slice(0, 6);
  }, [parcels]);

  // Metric cards definitions
  const kpiCards = [
    {
      title: "Today's Total Parcels",
      value: stats.todayTotal,
      subtitle: "Received via WhatsApp intake",
      icon: Package,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      trend: "+14% vs yesterday",
    },
    {
      title: "Pending Verification",
      value: stats.todayPending,
      subtitle: "Requires field review",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      alert: stats.todayPending > 0,
    },
    {
      title: "Weight Pending",
      value: stats.todayWeightPending,
      subtitle: "Requires scale measurement",
      icon: Scale,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      alert: stats.todayWeightPending > 0,
    },
    {
      title: "Verified Parcels",
      value: stats.todayVerified,
      subtitle: "Ready for dispatch",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      trend: "Manifest ready",
    },
    {
      title: "Completed Entries Today",
      value: `${Math.round((stats.todayVerified / (stats.todayTotal || 1)) * 100)}%`,
      subtitle: `${stats.todayVerified} of ${stats.todayTotal} processed`,
      icon: FileSpreadsheet,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome & Quick Action Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 text-white shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-300 border border-blue-400/30">
                {settings.branchName || "Koramangala Hub (BLR-04)"}
              </span>
              <span className="text-xs text-slate-400">Live Operations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Welcome back, Rajesh!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {stats.todayPending} parcel(s) awaiting verification and scale weight measurement today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/upload">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs shadow-xs"
              >
                <UploadCloud className="h-4 w-4 mr-1.5" />
                Upload Images
              </Button>
            </Link>
            <Link href="/daily-excel">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs shadow-xs"
              >
                <FileSpreadsheet className="h-4 w-4 mr-1.5 text-emerald-400" />
                Today's Excel
              </Button>
            </Link>
            <Link href="/verification">
              <Button
                size="md"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30"
              >
                <FileCheck className="h-4 w-4 mr-1.5" />
                Verify Next Parcel
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 5 KPI Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {kpiCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Card
                key={i}
                className="border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {card.title}
                    </span>
                    <div className={`p-2 rounded-xl border ${card.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      {card.value}
                    </span>
                    {card.alert && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200 animate-pulse">
                        Action
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 truncate">
                    {card.subtitle}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pending Verification Workspace Quick Section */}
        {stats.todayPending > 0 && (
          <Card className="border-amber-200/80 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/40 shadow-xs">
            <CardHeader className="p-4 sm:p-5 border-b border-amber-100 flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500 text-white p-2 shadow-xs">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    Pending Verification Queue
                    <span className="rounded-full bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 font-bold border border-amber-200">
                      {stats.todayPending} Waiting
                    </span>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600">
                    Physical scale weight must be recorded and OCR confidence checked before daily Excel export.
                  </CardDescription>
                </div>
              </div>
              <Link href="/verification">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
                  Open Workspace
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {pendingParcels.map((parcel) => (
                  <div
                    key={parcel.id}
                    onClick={() => router.push(`/verification?id=${parcel.id}`)}
                    className="p-3.5 rounded-xl border border-amber-200/70 bg-white hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {parcel.consignmentNumber}
                        </span>
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                          {parcel.weight ? `${parcel.weight} kg` : "Scale Req."}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 truncate">
                        {parcel.receiverName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {parcel.city} • {parcel.pincode}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">OCR: {parcel.verificationConfidence}%</span>
                      <span className="font-semibold text-blue-600 flex items-center gap-0.5">
                        Verify <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts & Activity Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Parcel Activity Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  Weekly Parcel Volume & Verification
                </CardTitle>
                <CardDescription>
                  Daily total parcels received vs verified over the current week
                </CardDescription>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Last 7 Days
              </span>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={WEEKLY_CHART_DATA}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="day"
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      axisLine={{ stroke: "#cbd5e1" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        color: "#fff",
                        borderRadius: "8px",
                        fontSize: "12px",
                        border: "none",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }}
                    />
                    <Bar
                      dataKey="total"
                      name="Total Received"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                    />
                    <Bar
                      dataKey="verified"
                      name="Verified & Dispatched"
                      fill="#10b981"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                    />
                    <Bar
                      dataKey="pending"
                      name="Pending Review"
                      fill="#f59e0b"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={32}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Courier Hub Health / Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-slate-900 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Hub Operation Status
              </CardTitle>
              <CardDescription>Daily performance benchmarks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">OCR Extraction Accuracy</span>
                  <span className="font-bold text-slate-900">94.8%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "94.8%" }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Weight Measurement Compliance</span>
                  <span className="font-bold text-slate-900">
                    {Math.round(((stats.todayTotal - stats.todayWeightPending) / (stats.todayTotal || 1)) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{
                      width: `${Math.round(
                        ((stats.todayTotal - stats.todayWeightPending) / (stats.todayTotal || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between py-1.5 text-xs">
                  <span className="text-slate-600">Today's COD Collection:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatCurrency(stats.todayCodTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-xs">
                  <span className="text-slate-600">WhatsApp Intake Batch:</span>
                  <span className="font-bold text-emerald-600">Connected</span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-xs">
                  <span className="text-slate-600">Default Weighing Unit:</span>
                  <span className="font-bold text-slate-900 uppercase">
                    {settings.defaultWeightUnit || "kg"}
                  </span>
                </div>
              </div>

              <Link href="/daily-excel" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full text-xs text-slate-700">
                  <FileSpreadsheet className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                  Generate Day End Manifest
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Parcels Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base text-slate-900">
                Recent Consignments & Manifest Entries
              </CardTitle>
              <CardDescription>
                Live feed of parcels processed through this hub
              </CardDescription>
            </div>
            <Link href="/parcels">
              <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700">
                View All {parcels.length} Parcels
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500 border-y border-slate-200">
                  <tr>
                    <th className="px-5 py-3">Consignment #</th>
                    <th className="px-5 py-3">Shipper & Receiver</th>
                    <th className="px-5 py-3">Destination</th>
                    <th className="px-5 py-3">Scale Weight</th>
                    <th className="px-5 py-3">Booking Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {recentParcels.map((parcel) => (
                    <tr
                      key={parcel.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="font-mono font-bold text-slate-900">
                          {parcel.consignmentNumber}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {parcel.courierPartner}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-slate-900">
                          {parcel.receiverName}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          From: {parcel.senderName}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="text-slate-800 font-medium">
                          {parcel.city}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          PIN: {parcel.pincode}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {parcel.weight ? (
                          <span className="font-mono font-semibold text-slate-900">
                            {parcel.weight} {parcel.weightUnit}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-600 font-medium text-[11px]">
                            <Scale className="h-3 w-3" />
                            Pending Scale
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[11px]">
                        {parcel.bookingDate}
                      </td>
                      <td className="px-5 py-3.5">
                        <ParcelStatusBadge
                          status={parcel.status}
                          weight={parcel.weight}
                        />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {parcel.status === "pending" ? (
                          <Link href={`/verification?id=${parcel.id}`}>
                            <Button size="xs" className="bg-blue-600 hover:bg-blue-700 text-white text-[11px]">
                              Verify
                            </Button>
                          </Link>
                        ) : (
                          <Link href={`/parcels?search=${parcel.consignmentNumber}`}>
                            <Button variant="ghost" size="xs" className="text-slate-600 hover:text-slate-900">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

