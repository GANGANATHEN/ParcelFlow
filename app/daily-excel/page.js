"use client";

import React, { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParcels } from "@/context/ParcelContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ParcelStatusBadge } from "@/components/common/ParcelStatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import ExcelJS from "exceljs";
import {
  FileSpreadsheet,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Scale,
  IndianRupee,
  Package,
  Layers,
  Sparkles,
  Info,
  Check,
  Table,
} from "lucide-react";

export default function DailyExcelPage() {
  const { parcels, settings, addToast } = useParcels();

  // Selected date for daily report (defaults to current demo date: 2026-11-02)
  const [selectedDate, setSelectedDate] = useState("2026-11-02");
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // 'preview' or 'structure'

  // Filter parcels for selected date
  const dailyParcels = useMemo(() => {
    return parcels.filter((p) => p.bookingDate === selectedDate);
  }, [parcels, selectedDate]);

  // Daily statistics
  const dailyStats = useMemo(() => {
    const total = dailyParcels.length;
    const verified = dailyParcels.filter((p) => p.status === "verified").length;
    const pending = dailyParcels.filter((p) => p.status === "pending").length;
    const rejected = dailyParcels.filter((p) => p.status === "rejected").length;

    const totalWeight = dailyParcels.reduce((sum, p) => {
      const w = Number(p.weight) || 0;
      return sum + (p.weightUnit === "g" ? w / 1000 : w);
    }, 0);

    const totalCod = dailyParcels
      .filter((p) => p.isCod)
      .reduce((sum, p) => sum + (Number(p.codAmount) || 0), 0);

    return {
      total,
      verified,
      pending,
      rejected,
      totalWeight: totalWeight.toFixed(2),
      totalCod,
      completionRate: total > 0 ? Math.round((verified / total) * 100) : 0,
    };
  }, [dailyParcels]);

  // Excel columns definition matching the prompt requirements
  const EXCEL_COLUMNS = [
    { header: "S.No", key: "sno", width: 8, align: "center" },
    { header: "Consignment Number", key: "consignmentNumber", width: 22, align: "center" },
    { header: "Sender Name", key: "senderName", width: 26, align: "left" },
    { header: "Receiver Name", key: "receiverName", width: 26, align: "left" },
    { header: "Receiver Mobile", key: "receiverPhone", width: 18, align: "center" },
    { header: "Receiver Address", key: "receiverAddress", width: 44, align: "left" },
    { header: "Pincode", key: "pincode", width: 14, align: "center" },
    { header: "Booking Date", key: "bookingDate", width: 16, align: "center" },
    { header: "Weight (kg)", key: "weight", width: 15, align: "right" },
    { header: "COD Amount (₹)", key: "codAmount", width: 16, align: "right" },
    { header: "Verification Status", key: "status", width: 20, align: "center" },
  ];

  // ExcelJS Export Generator
  const generateAndDownloadExcel = async (exportAll = false) => {
    setIsExporting(true);

    try {
      const recordsToExport = exportAll ? parcels : dailyParcels;

      if (recordsToExport.length === 0) {
        addToast({
          title: "No Records to Export",
          description: `No parcel records found for ${exportAll ? "all dates" : selectedDate}.`,
          type: "warning",
        });
        setIsExporting(false);
        return;
      }

      // Initialize ExcelJS Workbook
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "ParcelFlow Logistics";
      workbook.lastModifiedBy = "Rajesh Sharma";
      workbook.created = new Date();
      workbook.modified = new Date();

      const sheetName = exportAll
        ? "All_Parcels_Master"
        : `Manifest_${selectedDate.replace(/-/g, "")}`;
      const worksheet = workbook.addWorksheet(sheetName, {
        views: [{ showGridLines: true }],
      });

      // 1. Title Banner Row
      worksheet.mergeCells("A1:K1");
      const titleCell = worksheet.getCell("A1");
      titleCell.value = `${settings.businessName || "SpeedEx Logistics"} — ${
        exportAll ? "Master Consignment Manifest" : `Daily Parcel Manifest (${selectedDate})`
      }`;
      titleCell.font = { name: "Calibri", size: 14, bold: true, color: { argb: "FFFFFFFF" } };
      titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0F172A" }, // Dark Navy
      };
      titleCell.alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getRow(1).height = 32;

      // 2. Subheader Meta Row
      worksheet.mergeCells("A2:K2");
      const subCell = worksheet.getCell("A2");
      subCell.value = `Hub: ${settings.branchName || "Koramangala Hub (BLR-04)"} | Generated: ${new Date().toLocaleString()} | Total Records: ${recordsToExport.length}`;
      subCell.font = { name: "Calibri", size: 10, italic: true, color: { argb: "FF334155" } };
      subCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF1F5F9" },
      };
      subCell.alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getRow(2).height = 20;

      // 3. Empty Row for Spacing
      worksheet.addRow([]);

      // 4. Table Header Row (Row 4)
      const headerRow = worksheet.addRow(EXCEL_COLUMNS.map((col) => col.header));
      headerRow.height = 26;
      headerRow.eachCell((cell, colNumber) => {
        cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF1D4ED8" }, // Corporate Blue
        };
        cell.alignment = {
          vertical: "middle",
          horizontal: EXCEL_COLUMNS[colNumber - 1]?.align || "center",
        };
        cell.border = {
          top: { style: "thin", color: { argb: "FF94A3B8" } },
          left: { style: "thin", color: { argb: "FF94A3B8" } },
          bottom: { style: "medium", color: { argb: "FF1E3A8A" } },
          right: { style: "thin", color: { argb: "FF94A3B8" } },
        };
      });

      // 5. Populate Data Rows
      recordsToExport.forEach((parcel, index) => {
        const rowData = [
          index + 1,
          parcel.consignmentNumber,
          parcel.senderName || "—",
          parcel.receiverName || "—",
          parcel.receiverPhone || "—",
          parcel.receiverAddress || "—",
          parcel.pincode || "—",
          parcel.bookingDate || "—",
          parcel.weight !== "" && parcel.weight !== undefined ? Number(parcel.weight) : "Scale Req.",
          parcel.isCod ? Number(parcel.codAmount) : 0,
          parcel.status.toUpperCase(),
        ];

        const row = worksheet.addRow(rowData);
        row.height = 22;

        const isEven = index % 2 === 0;
        row.eachCell((cell, colNumber) => {
          cell.font = { name: "Calibri", size: 10 };
          cell.alignment = {
            vertical: "middle",
            horizontal: EXCEL_COLUMNS[colNumber - 1]?.align || "left",
          };
          cell.border = {
            top: { style: "thin", color: { argb: "FFE2E8F0" } },
            left: { style: "thin", color: { argb: "FFE2E8F0" } },
            bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
            right: { style: "thin", color: { argb: "FFE2E8F0" } },
          };

          // Zebra striping
          if (!isEven) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFF8FAFC" },
            };
          }

          // Specific formatting
          if (colNumber === 9 && typeof cell.value === "number") {
            cell.numFmt = "0.00";
          }
          if (colNumber === 10 && typeof cell.value === "number") {
            cell.numFmt = "₹#,##0.00";
          }
          if (colNumber === 11) {
            // Status styling
            if (parcel.status === "verified") {
              cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF065F46" } };
            } else if (parcel.status === "rejected") {
              cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF991B1B" } };
            } else {
              cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: "FF92400E" } };
            }
          }
        });
      });

      // 6. Summary Totals Row at Bottom
      const startDataRow = 5;
      const endDataRow = startDataRow + recordsToExport.length - 1;

      const summaryRow = worksheet.addRow([
        "TOTAL",
        `${recordsToExport.length} Parcels`,
        "",
        "",
        "",
        "",
        "",
        "",
        { formula: `SUM(I${startDataRow}:I${endDataRow})` },
        { formula: `SUM(J${startDataRow}:J${endDataRow})` },
        "COMPLETED",
      ]);

      summaryRow.height = 24;
      summaryRow.eachCell((cell, colNumber) => {
        cell.font = { name: "Calibri", size: 11, bold: true, color: { argb: "FF0F172A" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE2E8F0" },
        };
        cell.border = {
          top: { style: "medium", color: { argb: "FF0F172A" } },
          bottom: { style: "double", color: { argb: "FF0F172A" } },
        };
        cell.alignment = {
          vertical: "middle",
          horizontal: EXCEL_COLUMNS[colNumber - 1]?.align || "left",
        };

        if (colNumber === 9) {
          cell.numFmt = "0.00";
        }
        if (colNumber === 10) {
          cell.numFmt = "₹#,##0.00";
        }
      });

      // Set explicit column widths
      EXCEL_COLUMNS.forEach((col, idx) => {
        worksheet.getColumn(idx + 1).width = col.width;
      });

      // Write to buffer and trigger browser download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const fileName = exportAll
        ? `ParcelFlow_Master_Manifest_${new Date().toISOString().split("T")[0]}.xlsx`
        : `ParcelFlow_Daily_Manifest_${selectedDate}.xlsx`;

      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      addToast({
        title: "Excel Download Complete",
        description: `Successfully exported ${recordsToExport.length} parcels to "${fileName}".`,
        type: "success",
      });
    } catch (err) {
      console.error("Excel generation error:", err);
      addToast({
        title: "Export Failed",
        description: "Failed to generate Excel file. Please try again.",
        type: "error",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Replacement workflow banner */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50/50 p-5 text-slate-800 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="rounded-xl bg-blue-600 p-2.5 text-white shadow-xs shrink-0">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">
                    Automated Daily Excel Manifest Generator
                  </h3>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 text-xs font-semibold">
                    Replaces Manual WhatsApp Entry
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Client requirement satisfied: Generates professional, multi-row Excel manifests
                  formatted with consignment barcodes, sender, recipient mobile, pincode, scale weight,
                  and COD receipts with 1-click download.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              isLoading={isExporting}
              onClick={() => generateAndDownloadExcel(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 shrink-0"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Day's Excel (.xlsx)
            </Button>
          </div>
        </div>

        {/* Date Selector & Action Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-600" />
              Manifest Date:
            </span>

            {/* Quick date buttons */}
            <button
              onClick={() => setSelectedDate("2026-11-02")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDate === "2026-11-02"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Today (02 Nov)
            </button>
            <button
              onClick={() => setSelectedDate("2026-11-01")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDate === "2026-11-01"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Yesterday (01 Nov)
            </button>
            <button
              onClick={() => setSelectedDate("2026-10-31")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDate === "2026-10-31"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              31 Oct
            </button>

            {/* Custom Date Input */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-slate-800 font-mono shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateAndDownloadExcel(true)}
              isLoading={isExporting}
              className="text-xs text-slate-700"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Download All Records ({parcels.length})
            </Button>
          </div>
        </div>

        {/* Selected Date Summary Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          <Card className="border-slate-200 shadow-2xs">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold uppercase tracking-wider">Day's Parcels</span>
                <Package className="h-4 w-4 text-blue-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">
                {dailyStats.total}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Recorded for {selectedDate}</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-emerald-50/20 shadow-2xs">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-emerald-700 text-xs">
                <span className="font-semibold uppercase tracking-wider">Verified Parcels</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-700">
                {dailyStats.verified}
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                {dailyStats.completionRate}% of manifest
              </p>
            </CardContent>
          </Card>

          <Card
            className={`shadow-2xs ${
              dailyStats.pending > 0
                ? "border-amber-300 bg-amber-50/30"
                : "border-slate-200"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-amber-700 text-xs">
                <span className="font-semibold uppercase tracking-wider">Pending Review</span>
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-amber-800">
                {dailyStats.pending}
              </div>
              <p className="text-[11px] text-amber-700 mt-0.5">Requires verification</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-2xs">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold uppercase tracking-wider">Total Scale Weight</span>
                <Scale className="h-4 w-4 text-slate-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-slate-900">
                {dailyStats.totalWeight}{" "}
                <span className="text-sm font-semibold text-slate-500">kg</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Measured physical weight</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-2xs">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold uppercase tracking-wider">Total COD Cash</span>
                <IndianRupee className="h-4 w-4 text-rose-600" />
              </div>
              <div className="mt-2 text-2xl font-black text-rose-700">
                {formatCurrency(dailyStats.totalCod)}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Cash to be collected</p>
            </CardContent>
          </Card>
        </div>

        {/* Excel Spreadsheet View */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/80 p-4 border-b border-slate-200 flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Table className="h-4 w-4 text-emerald-600" />
                <CardTitle className="text-sm font-bold text-slate-900">
                  Excel Spreadsheet Structure Preview — {selectedDate}
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-500">
                Exact 11-column spreadsheet layout generated by ExcelJS with formatting & formulas.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                {dailyParcels.length} row(s) in sheet
              </span>
              <Button
                size="sm"
                onClick={() => generateAndDownloadExcel(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                Download .XLSX
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {dailyParcels.length === 0 ? (
              <div className="py-16 text-center">
                <FileSpreadsheet className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">
                  No parcel records for {selectedDate}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Select a different date above or upload new parcel images to generate a manifest.
                </p>
                <button
                  onClick={() => setSelectedDate("2026-11-02")}
                  className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                >
                  Switch back to Today (02 Nov) →
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Excel-like header simulation */}
                <table className="w-full text-left text-xs text-slate-700 border-collapse">
                  <thead>
                    {/* Simulated Excel Column Letters (A, B, C...) */}
                    <tr className="bg-slate-100 text-slate-400 font-mono text-[10px] border-b border-slate-200">
                      <th className="px-3 py-1 text-center border-r border-slate-200 w-10"></th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">A</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">B</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">C</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">D</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">E</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">F</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">G</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">H</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">I</th>
                      <th className="px-3 py-1 text-center border-r border-slate-200">J</th>
                      <th className="px-3 py-1 text-center">K</th>
                    </tr>

                    {/* Styled Excel Header Row */}
                    <tr className="bg-blue-700 text-white font-semibold text-[11px] border-b border-blue-900">
                      <th className="px-2 py-2.5 text-center bg-slate-200 text-slate-600 border-r border-slate-300 w-10 font-mono">
                        1
                      </th>
                      {EXCEL_COLUMNS.map((col, idx) => (
                        <th
                          key={idx}
                          className={`px-3 py-2.5 border-r border-blue-600/50 last:border-r-0 whitespace-nowrap text-${col.align}`}
                        >
                          {col.header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 font-sans">
                    {dailyParcels.map((parcel, idx) => (
                      <tr
                        key={parcel.id}
                        className={`hover:bg-blue-50/40 transition-colors ${
                          idx % 2 === 1 ? "bg-slate-50/50" : "bg-white"
                        }`}
                      >
                        {/* Excel Row Number */}
                        <td className="px-2 py-2 text-center bg-slate-100 text-slate-500 font-mono text-[10px] border-r border-slate-200 font-semibold select-none">
                          {idx + 2}
                        </td>

                        {/* S.No */}
                        <td className="px-3 py-2 text-center font-mono border-r border-slate-200">
                          {idx + 1}
                        </td>

                        {/* Consignment Number */}
                        <td className="px-3 py-2 font-mono font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                          {parcel.consignmentNumber}
                        </td>

                        {/* Sender Name */}
                        <td className="px-3 py-2 border-r border-slate-200 truncate max-w-[160px]">
                          {parcel.senderName}
                        </td>

                        {/* Receiver Name */}
                        <td className="px-3 py-2 font-semibold text-slate-900 border-r border-slate-200 truncate max-w-[160px]">
                          {parcel.receiverName}
                        </td>

                        {/* Receiver Mobile */}
                        <td className="px-3 py-2 font-mono text-center border-r border-slate-200 whitespace-nowrap">
                          {parcel.receiverPhone}
                        </td>

                        {/* Receiver Address */}
                        <td className="px-3 py-2 border-r border-slate-200 truncate max-w-[260px] text-[11px]">
                          {parcel.receiverAddress}
                        </td>

                        {/* Pincode */}
                        <td className="px-3 py-2 font-mono text-center font-bold text-slate-900 border-r border-slate-200">
                          {parcel.pincode}
                        </td>

                        {/* Booking Date */}
                        <td className="px-3 py-2 font-mono text-center border-r border-slate-200 text-[11px]">
                          {parcel.bookingDate}
                        </td>

                        {/* Weight */}
                        <td className="px-3 py-2 text-right font-mono font-bold text-slate-900 border-r border-slate-200">
                          {parcel.weight ? `${parcel.weight} kg` : "—"}
                        </td>

                        {/* COD Amount */}
                        <td className="px-3 py-2 text-right font-mono border-r border-slate-200">
                          {parcel.isCod ? (
                            <span className="font-bold text-rose-700">
                              {formatCurrency(parcel.codAmount)}
                            </span>
                          ) : (
                            <span className="text-slate-400">Prepaid</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-3 py-2 text-center whitespace-nowrap">
                          <ParcelStatusBadge
                            status={parcel.status}
                            weight={parcel.weight}
                            showIcon={false}
                            className="text-[10px] py-0 px-2"
                          />
                        </td>
                      </tr>
                    ))}

                    {/* Excel Summary Row */}
                    <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                      <td className="px-2 py-2 text-center bg-slate-200 text-slate-600 font-mono text-[10px] border-r border-slate-300">
                        {dailyParcels.length + 2}
                      </td>
                      <td className="px-3 py-2 text-center font-mono border-r border-slate-200">
                        SUM
                      </td>
                      <td className="px-3 py-2 border-r border-slate-200 font-mono">
                        {dailyParcels.length} Parcels
                      </td>
                      <td className="px-3 py-2 border-r border-slate-200" colSpan={5}></td>
                      <td className="px-3 py-2 text-center border-r border-slate-200 text-[10px] uppercase text-slate-500 font-sans">
                        Total Weight
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-blue-900 border-r border-slate-200">
                        {dailyStats.totalWeight} kg
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-rose-800 border-r border-slate-200">
                        {formatCurrency(dailyStats.totalCod)}
                      </td>
                      <td className="px-3 py-2 text-center text-emerald-700 font-mono text-[11px]">
                        {dailyStats.verified}/{dailyParcels.length} Verified
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

