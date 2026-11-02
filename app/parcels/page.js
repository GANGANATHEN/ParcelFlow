"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParcels } from "@/context/ParcelContext";
import { ParcelStatusBadge } from "@/components/common/ParcelStatusBadge";
import { ParcelLabelPreview } from "@/components/common/ParcelLabelPreview";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Search,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  Scale,
  Phone,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileSpreadsheet,
  Plus,
  Loader2,
} from "lucide-react";

function ParcelsTableContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const { parcels, deleteParcel, stats } = useParcels();

  // Filters state
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selected parcel for Detail Modal
  const [viewingParcel, setViewingParcel] = useState(null);
  const [deletingParcelId, setDeletingParcelId] = useState(null);

  // Filtered & Sorted parcels
  const filteredParcels = useMemo(() => {
    return parcels.filter((parcel) => {
      // Search query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matches =
          parcel.consignmentNumber.toLowerCase().includes(q) ||
          parcel.receiverName.toLowerCase().includes(q) ||
          parcel.receiverPhone.includes(q) ||
          parcel.pincode.includes(q) ||
          parcel.city.toLowerCase().includes(q) ||
          parcel.senderName.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Status filter
      if (statusFilter === "verified" && parcel.status !== "verified") return false;
      if (statusFilter === "pending" && parcel.status !== "pending") return false;
      if (
        statusFilter === "weightPending" &&
        !(parcel.status === "pending" && (!parcel.weight || parcel.weight === ""))
      )
        return false;
      if (statusFilter === "rejected" && parcel.status !== "rejected") return false;

      // Date filter
      if (dateFilter === "today" && parcel.bookingDate !== stats.todayStr) return false;
      if (dateFilter === "yesterday" && parcel.bookingDate !== "2026-11-01") return false;
      if (
        dateFilter === "week" &&
        !["2026-11-02", "2026-11-01", "2026-10-31", "2026-10-30", "2026-10-29"].includes(
          parcel.bookingDate
        )
      )
        return false;

      // Courier partner
      if (partnerFilter !== "all" && parcel.courierPartner !== partnerFilter) return false;

      return true;
    });
  }, [parcels, searchTerm, statusFilter, dateFilter, partnerFilter, stats.todayStr]);

  // Pagination calculation
  const totalItems = filteredParcels.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedParcels = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredParcels.slice(startIndex, startIndex + pageSize);
  }, [filteredParcels, currentPage, pageSize]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter("all");
    setPartnerFilter("all");
    setCurrentPage(1);
  };

  const handleDeleteConfirm = () => {
    if (deletingParcelId) {
      deleteParcel(deletingParcelId);
      setDeletingParcelId(null);
      if (viewingParcel?.id === deletingParcelId) {
        setViewingParcel(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            All Consignments & Parcels
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse, search, and manage registered courier parcels across all intake batches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/upload">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white text-xs">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Upload New Parcels
            </Button>
          </Link>
          <Link href="/daily-excel">
            <Button variant="outline" size="sm" className="text-xs text-slate-700">
              <FileSpreadsheet className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Export Manifest
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Controls Card */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search Bar (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search consignment #, receiver, phone, pincode..."
                  className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-2xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Status Filter (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Statuses</option>
                <option value="verified">Verified Only</option>
                <option value="pending">Pending Only</option>
                <option value="weightPending">Weight Pending Only</option>
                <option value="rejected">Rejected Only</option>
              </select>
            </div>

            {/* Date Filter (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Dates</option>
                <option value="today">Today (02 Nov)</option>
                <option value="yesterday">Yesterday (01 Nov)</option>
                <option value="week">Past 7 Days</option>
              </select>
            </div>

            {/* Partner Filter (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={partnerFilter}
                onChange={(e) => {
                  setPartnerFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Couriers</option>
                <option value="SpeedEx Express">SpeedEx Express</option>
                <option value="BlueDart Express">BlueDart Express</option>
                <option value="Delhivery Surface">Delhivery Surface</option>
                <option value="DTDC Plus">DTDC Plus</option>
                <option value="India Speed Post">India Speed Post</option>
              </select>
            </div>

            {/* Reset Button (1 col) */}
            <div className="lg:col-span-1 flex items-center justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="w-full text-xs text-slate-500 hover:text-slate-800 p-1"
                title="Reset All Filters"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
            </div>
          </div>

          {/* Filter tags feedback */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>
              Showing <strong className="text-slate-800">{filteredParcels.length}</strong> of{" "}
              <strong className="text-slate-800">{parcels.length}</strong> total parcels
            </span>

            {filteredParcels.length !== parcels.length && (
              <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                Filters Active
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Parcels Table Card */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {filteredParcels.length === 0 ? (
            <div className="py-16 text-center">
              <Package className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No parcels match your criteria</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try clearing your search term or adjusting status and date filters.
              </p>
              <div className="mt-4">
                <Button size="sm" variant="outline" onClick={resetFilters} className="text-xs">
                  Reset Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-semibold uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Consignment #</th>
                    <th className="px-4 py-3">Receiver Name</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Pincode / City</th>
                    <th className="px-4 py-3">Scale Weight</th>
                    <th className="px-4 py-3">Booking Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {paginatedParcels.map((parcel) => (
                    <tr
                      key={parcel.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Consignment */}
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">
                        <div>{parcel.consignmentNumber}</div>
                        <div className="text-[10px] text-slate-400 font-sans font-normal">
                          {parcel.courierPartner}
                        </div>
                      </td>

                      {/* Receiver */}
                      <td className="px-4 py-3 font-medium text-slate-900">
                        <div>{parcel.receiverName}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs font-normal">
                          {parcel.receiverAddress}
                        </div>
                      </td>

                      {/* Mobile */}
                      <td className="px-4 py-3 font-mono text-slate-700">
                        {parcel.receiverPhone}
                      </td>

                      {/* Pincode & City */}
                      <td className="px-4 py-3">
                        <span className="font-mono font-semibold text-slate-800">
                          {parcel.pincode}
                        </span>
                        <span className="text-slate-400 text-[11px] block">{parcel.city}</span>
                      </td>

                      {/* Weight */}
                      <td className="px-4 py-3 font-mono">
                        {parcel.weight ? (
                          <span className="font-semibold text-slate-900">
                            {parcel.weight} {parcel.weightUnit}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Scale className="h-3 w-3" /> Scale Req.
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-600">
                        {parcel.bookingDate}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <ParcelStatusBadge
                          status={parcel.status}
                          weight={parcel.weight}
                          className="text-[11px]"
                        />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setViewingParcel(parcel)}
                            className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                            title="View Full Details & Label"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <Link href={`/verification?id=${parcel.id}`}>
                            <button
                              className="rounded p-1 text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit & Verify"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => setDeletingParcelId(parcel.id)}
                            className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            title="Delete Parcel Record"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3">
              <div className="text-xs text-slate-500">
                Showing page <strong className="text-slate-800">{currentPage}</strong> of{" "}
                <strong className="text-slate-800">{totalPages}</strong>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-3.5 w-3.5 mr-0.5" /> Previous
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`h-7 w-7 rounded-md text-xs font-semibold transition-all ${
                        pageNumber === currentPage
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Parcel Detail Modal */}
      <Modal
        isOpen={!!viewingParcel}
        onClose={() => setViewingParcel(null)}
        title={`Consignment Details — ${viewingParcel?.consignmentNumber || ""}`}
        description="Complete airway bill inspection and recorded dispatch metadata."
        size="xl"
      >
        {viewingParcel && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Graphic Label Preview */}
            <div>
              <ParcelLabelPreview parcel={viewingParcel} showOcrBoxes={true} />
            </div>

            {/* Right: Detailed Table of Extracted Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <ParcelStatusBadge
                  status={viewingParcel.status}
                  weight={viewingParcel.weight}
                />
                <span className="text-xs text-slate-500 font-mono">
                  ID: {viewingParcel.id}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs">
                <div className="p-2.5 flex justify-between bg-slate-50/60">
                  <span className="text-slate-500">Consignment Number:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {viewingParcel.consignmentNumber}
                  </span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500">Courier Partner:</span>
                  <span className="font-semibold text-slate-900">
                    {viewingParcel.courierPartner}
                  </span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500">Shipper Name:</span>
                  <span className="font-medium text-slate-900">{viewingParcel.senderName}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500">Receiver Name:</span>
                  <span className="font-bold text-slate-900">{viewingParcel.receiverName}</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500">Receiver Phone:</span>
                  <span className="font-mono text-slate-900">{viewingParcel.receiverPhone}</span>
                </div>
                <div className="p-2.5 flex flex-col gap-1">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-normal text-slate-800">
                    {viewingParcel.receiverAddress}
                  </span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500">Pincode & City:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {viewingParcel.pincode} ({viewingParcel.city})
                  </span>
                </div>
                <div className="p-2.5 flex justify-between bg-amber-50/40">
                  <span className="font-semibold text-amber-900">Physical Scale Weight:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {viewingParcel.weight
                      ? `${viewingParcel.weight} ${viewingParcel.weightUnit}`
                      : "Weight Not Yet Measured"}
                  </span>
                </div>
                {viewingParcel.isCod && (
                  <div className="p-2.5 flex justify-between bg-rose-50/40">
                    <span className="font-semibold text-rose-900">COD Cash to Collect:</span>
                    <span className="font-mono font-bold text-rose-700">
                      {formatCurrency(viewingParcel.codAmount)}
                    </span>
                  </div>
                )}
                <div className="p-2.5 flex justify-between">
                  <span className="text-slate-500">Booking Date:</span>
                  <span className="font-mono text-slate-700">
                    {viewingParcel.bookingDate} {viewingParcel.bookingTime || ""}
                  </span>
                </div>
                {viewingParcel.verifiedBy && (
                  <div className="p-2.5 flex justify-between">
                    <span className="text-slate-500">Verified By:</span>
                    <span className="text-slate-800">
                      {viewingParcel.verifiedBy} ({viewingParcel.verifiedAt})
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingParcel(null)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setViewingParcel(null);
                    router.push(`/verification?id=${viewingParcel.id}`);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs"
                >
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Open in Verification Workspace
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingParcelId}
        onClose={() => setDeletingParcelId(null)}
        title="Delete Parcel Entry"
        description="Are you sure you want to remove this parcel from the local records? This action cannot be undone."
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            The parcel record and any associated simulated OCR data will be permanently removed.
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeletingParcelId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteConfirm}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function AllParcelsPage() {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <ParcelsTableContent />
      </Suspense>
    </AppLayout>
  );
}
