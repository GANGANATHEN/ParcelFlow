"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, Eye, Tag, AlertTriangle, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ParcelLabelPreview({ parcel, highlightField = null, showOcrBoxes = true }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!parcel) {
    return (
      <div className="flex h-96 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
        <p className="text-sm">No parcel selected for preview</p>
      </div>
    );
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.7));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  // Determine low-confidence fields for visual alert tags
  const isPhoneLow = parcel.fieldConfidence?.receiverPhone && parcel.fieldConfidence.receiverPhone < 75;
  const isAddressLow = parcel.fieldConfidence?.receiverAddress && parcel.fieldConfidence.receiverAddress < 75;

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-200 bg-slate-900/5 shadow-xs overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            <Tag className="h-3.5 w-3.5 text-blue-600" />
            {parcel.imageFileName || "WhatsApp_Image_Intake.jpg"}
          </span>
          {parcel.scannedFromWhatsApp && (
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              WhatsApp Intake
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs text-slate-500 font-mono w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleRotate}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors ml-1"
            title="Rotate 90°"
            aria-label="Rotate"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Reset View"
            aria-label="Reset View"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Label Canvas Area */}
      <div className="relative flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center bg-slate-100 min-h-[460px]">
        <div
          className="transition-transform duration-150 origin-center select-none"
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        >
          {/* Authentic Physical Airway Bill / Shipping Label Simulation */}
          <div className="w-[360px] sm:w-[410px] bg-[#fcfbfa] text-slate-900 border-2 border-slate-800 rounded-md p-4 shadow-xl font-sans relative text-xs">
            {/* Background Texture & Physical Stamp */}
            <div className="absolute top-3 right-4 opacity-15 pointer-events-none border-2 border-red-700 text-red-700 px-2 py-1 rotate-12 font-black text-xs uppercase tracking-widest">
              SPEEDEX ROUTED
            </div>

            {/* Header / Courier Branding */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2.5 mb-2.5">
              <div>
                <div className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                  <span className="bg-slate-900 text-white px-1.5 py-0.5 rounded text-xs font-mono">
                    EX
                  </span>
                  {parcel.courierPartner || "SpeedEx Express"}
                </div>
                <div className="text-[10px] font-mono tracking-wider text-slate-600">
                  STANDARD AIRWAY BILL (AWB)
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-800">DOMESTIC PRIORITY</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {parcel.bookingDate || "2026-11-02"}
                </div>
              </div>
            </div>

            {/* Consignment Barcode Section */}
            <div
              className={`border-b-2 border-slate-900 pb-3 mb-3 text-center relative ${
                highlightField === "consignmentNumber"
                  ? "ring-2 ring-blue-600 ring-offset-1 rounded bg-blue-50/50"
                  : ""
              }`}
            >
              {/* Simulated Authentic Barcode Lines */}
              <div className="h-12 w-full flex items-stretch justify-center gap-[2px] px-2 py-1 bg-white border border-slate-300 rounded mb-1">
                {[
                  3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 4, 1, 2, 3, 1, 2, 4, 1, 3, 2, 1,
                  4, 2, 1, 3, 1, 2, 3, 4, 1, 2, 3, 1, 2, 4, 1, 2, 3, 2, 4, 1, 3, 2,
                ].map((w, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900"
                    style={{ width: `${w}px`, opacity: idx % 7 === 0 ? 0.75 : 1 }}
                  />
                ))}
              </div>
              <div className="font-mono text-sm font-black tracking-widest text-slate-900">
                {parcel.consignmentNumber}
              </div>
              {showOcrBoxes && (
                <div className="absolute top-0 right-1 text-[9px] font-mono text-blue-700 bg-blue-100/90 px-1 rounded">
                  OCR: 99%
                </div>
              )}
            </div>

            {/* Split Sections: Sender & Routing */}
            <div className="grid grid-cols-2 gap-2 border-b-2 border-slate-900 pb-2.5 mb-2.5 text-[11px]">
              <div
                className={`p-1.5 rounded relative ${
                  highlightField === "senderName" ? "ring-2 ring-blue-600 bg-blue-50/50" : ""
                }`}
              >
                <div className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">
                  FROM (SHIPPER):
                </div>
                <div className="font-bold text-slate-900 leading-tight">
                  {parcel.senderName || "—"}
                </div>
                <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                  Ph: {parcel.senderPhone || "—"}
                </div>
                <div className="text-[10px] text-slate-600">
                  {parcel.senderCity || "Origin Hub"}
                </div>
              </div>

              <div className="p-1.5 border-l border-slate-300 pl-2">
                <div className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">
                  ROUTING / HUB:
                </div>
                <div className="font-bold text-slate-900">BLR / KRM-04</div>
                <div className="text-[10px] text-slate-600 font-mono">
                  SVC: {parcel.isCod ? "C.O.D." : "PREPAID"}
                </div>
                {parcel.isCod && (
                  <div className="font-bold text-rose-700 text-[11px] mt-0.5">
                    COLLECT: {formatCurrency(parcel.codAmount)}
                  </div>
                )}
              </div>
            </div>

            {/* Destination / Receiver Box (Crucial OCR Target) */}
            <div
              className={`border-b-2 border-slate-900 pb-3 mb-2.5 p-2 rounded relative ${
                highlightField === "receiverName" ||
                highlightField === "receiverAddress" ||
                highlightField === "pincode"
                  ? "ring-2 ring-blue-600 bg-blue-50/60"
                  : "bg-white/80 border border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">
                  SHIP TO (CONSIGNEE):
                </div>
                {isAddressLow && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                    <AlertTriangle className="h-3 w-3" /> Review OCR
                  </span>
                )}
              </div>

              <div className="font-bold text-sm text-slate-900 leading-snug">
                {parcel.receiverName || "—"}
              </div>

              <div className="text-xs text-slate-800 mt-1 leading-relaxed">
                {parcel.receiverAddress || "—"}
              </div>

              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-200">
                <div className="font-mono text-xs text-slate-800">
                  <span className="text-slate-500 font-sans text-[10px] mr-1">TEL:</span>
                  <span className={isPhoneLow ? "bg-amber-100 px-1 rounded font-bold" : ""}>
                    {parcel.receiverPhone || "—"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-sans mr-1">PIN:</span>
                  <span className="font-mono text-sm font-black bg-slate-900 text-white px-2 py-0.5 rounded">
                    {parcel.pincode || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Row: Physical Weight & Barcode QR */}
            <div className="flex items-center justify-between pt-1">
              {/* Simulated QR Code */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-white p-1 border border-slate-800 rounded grid grid-cols-4 gap-[2px]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={
                        (i * 3 + 2) % 2 === 0 || i === 0 || i === 3 || i === 12
                          ? "bg-slate-900"
                          : "bg-transparent"
                      }
                    />
                  ))}
                </div>
                <div className="text-[9px] font-mono text-slate-500 leading-tight">
                  SCAN FOR
                  <br />
                  TRACKING
                </div>
              </div>

              {/* Weight Box (Emphasized because it requires physical measurement!) */}
              <div
                className={`p-2 rounded text-right border ${
                  highlightField === "weight" || !parcel.weight
                    ? "border-amber-400 bg-amber-50"
                    : "border-slate-300 bg-slate-50"
                }`}
              >
                <div className="text-[9px] font-bold uppercase text-slate-600">
                  ACTUAL SCALE WEIGHT
                </div>
                {parcel.weight ? (
                  <div className="font-mono text-sm font-extrabold text-slate-900">
                    {parcel.weight} {parcel.weightUnit || "kg"}
                  </div>
                ) : (
                  <div className="text-[10px] font-bold text-amber-700 flex items-center gap-1 justify-end">
                    <AlertTriangle className="h-3 w-3" />
                    SCALE MEASUREMENT REQ.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Intake Explanatory Banner */}
      <div className="border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            Simulated OCR scanned from WhatsApp intake image. Physical weight must be entered manually.
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
          Confidence: {parcel.verificationConfidence || 90}%
        </span>
      </div>
    </div>
  );
}

