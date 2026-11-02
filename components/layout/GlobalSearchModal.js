"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useParcels } from "@/context/ParcelContext";
import { Modal } from "@/components/ui/Modal";
import { ParcelStatusBadge } from "@/components/common/ParcelStatusBadge";
import { Search, Package, ArrowRight, Phone, MapPin, Scale } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function GlobalSearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const { parcels } = useParcels();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return parcels.slice(0, 5); // show recent 5 by default

    const q = searchTerm.toLowerCase().trim();
    return parcels.filter(
      (p) =>
        p.consignmentNumber.toLowerCase().includes(q) ||
        p.receiverName.toLowerCase().includes(q) ||
        p.receiverPhone.includes(q) ||
        p.pincode.includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.senderName.toLowerCase().includes(q)
    );
  }, [searchTerm, parcels]);

  const handleSelectParcel = (parcel) => {
    onClose();
    if (parcel.status === "pending") {
      router.push(`/verification?id=${parcel.id}`);
    } else {
      router.push(`/parcels?search=${parcel.consignmentNumber}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search Parcels & Consignments"
      description="Quickly look up parcels by consignment code, receiver name, phone number, or pincode."
      size="lg"
    >
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type consignment number (e.g. EXP98234, DEL782), phone or name..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-inner"
          />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>{searchTerm ? `Found ${filtered.length} matches` : "Recent Parcels"}</span>
          <span className="text-[11px] text-slate-400">Click result to view or verify</span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Package className="h-10 w-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-medium text-slate-700">No matching parcels found</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Try searching with a different consignment number or mobile number.
              </p>
            </div>
          ) : (
            filtered.map((parcel) => (
              <div
                key={parcel.id}
                onClick={() => handleSelectParcel(parcel)}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200/90 bg-white hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-100/70 p-2 text-blue-700 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Package className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 group-hover:text-blue-700">
                        {parcel.consignmentNumber}
                      </span>
                      <ParcelStatusBadge
                        status={parcel.status}
                        weight={parcel.weight}
                        showIcon={false}
                        className="text-[10px] py-0 px-2"
                      />
                    </div>
                    <div className="text-xs text-slate-700 font-medium mt-1">
                      {parcel.receiverName}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {parcel.receiverPhone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {parcel.city} ({parcel.pincode})
                      </span>
                      {parcel.weight && (
                        <span className="flex items-center gap-1">
                          <Scale className="h-3 w-3" /> {parcel.weight} {parcel.weightUnit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  {parcel.isCod && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      COD {formatCurrency(parcel.codAmount)}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    {parcel.status === "pending" ? "Verify Now" : "View"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}

