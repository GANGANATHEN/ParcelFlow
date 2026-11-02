"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParcels } from "@/context/ParcelContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  Building2,
  Scale,
  FileSpreadsheet,
  User,
  RotateCcw,
  Save,
  Check,
  ShieldAlert,
  Info,
} from "lucide-react";

export default function SettingsPage() {
  const { settings, saveSettings, resetToMockData, addToast } = useParcels();

  const [formState, setFormState] = useState({
    businessName: settings.businessName || "SpeedEx Parcel Logistics Hub",
    branchName: settings.branchName || "Koramangala Hub (BLR-04)",
    branchCode: settings.branchCode || "BLR-04",
    gstNumber: settings.gstNumber || "29AABCS1429B1Z8",
    contactPhone: settings.contactPhone || "+91 98801 23456",
    contactEmail: settings.contactEmail || "blr-hub@speedexlogistics.in",
    address: settings.address || "Plot 14, 5th Main, 1st Block, Koramangala, Bengaluru - 560034",
    defaultWeightUnit: settings.defaultWeightUnit || "kg",
    requireManualWeight: settings.requireManualWeight ?? true,
    confidenceThreshold: settings.confidenceThreshold || 80,
    excelPreferences: {
      includeSNo: settings.excelPreferences?.includeSNo ?? true,
      includeConsignmentNumber: settings.excelPreferences?.includeConsignmentNumber ?? true,
      includeSenderName: settings.excelPreferences?.includeSenderName ?? true,
      includeReceiverName: settings.excelPreferences?.includeReceiverName ?? true,
      includeReceiverMobile: settings.excelPreferences?.includeReceiverMobile ?? true,
      includeReceiverAddress: settings.excelPreferences?.includeReceiverAddress ?? true,
      includePincode: settings.excelPreferences?.includePincode ?? true,
      includeBookingDate: settings.excelPreferences?.includeBookingDate ?? true,
      includeWeight: settings.excelPreferences?.includeWeight ?? true,
      includeCodAmount: settings.excelPreferences?.includeCodAmount ?? true,
      includeVerificationStatus: settings.excelPreferences?.includeVerificationStatus ?? true,
      includeCourierPartner: settings.excelPreferences?.includeCourierPartner ?? true,
    },
    userProfile: {
      name: settings.userProfile?.name || "Rajesh Sharma",
      role: settings.userProfile?.role || "Senior Operations Supervisor",
      email: settings.userProfile?.email || "rajesh.sharma@speedexlogistics.in",
      phone: settings.userProfile?.phone || "+91 98450 91823",
      employeeId: settings.userProfile?.employeeId || "OPS-BLR-084",
    },
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("branch"); // 'branch', 'weight', 'excel', 'profile'

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExcelPrefToggle = (columnKey) => {
    setFormState((prev) => ({
      ...prev,
      excelPreferences: {
        ...prev.excelPreferences,
        [columnKey]: !prev.excelPreferences[columnKey],
      },
    }));
  };

  const handleProfileChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      userProfile: {
        ...prev.userProfile,
        [field]: value,
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveSettings(formState);
    addToast({
      title: "Settings Saved",
      description: "Hub configuration and preferences updated successfully.",
      type: "success",
    });
  };

  const handleResetDemo = () => {
    resetToMockData();
    setIsResetModalOpen(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Hub Configuration & Settings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage franchise hub details, scale weighing preferences, Excel columns, and demo profile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetModalOpen(true)}
              className="text-xs text-rose-700 border-rose-200 bg-rose-50/50 hover:bg-rose-100"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1 text-rose-600" />
              Reset Demo Records
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              Save Preferences
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("branch")}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "branch"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Hub & Franchise Information
          </button>
          <button
            onClick={() => setActiveTab("weight")}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "weight"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Scale className="h-4 w-4" />
            Weighing & Verification Rules
          </button>
          <button
            onClick={() => setActiveTab("excel")}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "excel"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileSpreadsheet className="h-4 w-4" />
            Excel Manifest Preferences
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === "profile"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <User className="h-4 w-4" />
            Operator Profile
          </button>
        </div>

        {/* Tab 1: Hub & Franchise Details */}
        {activeTab === "branch" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-slate-900">
                Franchise Hub Details
              </CardTitle>
              <CardDescription>
                Company credentials displayed on daily manifests and shipping label previews.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business / Entity Name
                  </label>
                  <Input
                    value={formState.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Branch / Hub Name
                  </label>
                  <Input
                    value={formState.branchName}
                    onChange={(e) => handleInputChange("branchName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Branch Hub Code
                  </label>
                  <Input
                    value={formState.branchCode}
                    onChange={(e) => handleInputChange("branchCode", e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    GSTIN / Tax ID
                  </label>
                  <Input
                    value={formState.gstNumber}
                    onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                    className="font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <Input
                    value={formState.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hub Physical Address
                </label>
                <textarea
                  rows={2}
                  value={formState.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 2: Weighing & Verification Rules */}
        {activeTab === "weight" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-slate-900">
                Weighing & Verification Rules
              </CardTitle>
              <CardDescription>
                Configure scale measurement requirements and OCR confidence flagging.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Default Scale Weighing Unit
                  </label>
                  <select
                    value={formState.defaultWeightUnit}
                    onChange={(e) => handleInputChange("defaultWeightUnit", e.target.value)}
                    className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Standard unit applied when capturing weight from the electronic scale.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    OCR Confidence Alert Threshold (%)
                  </label>
                  <Input
                    type="number"
                    min="50"
                    max="99"
                    value={formState.confidenceThreshold}
                    onChange={(e) => handleInputChange("confidenceThreshold", Number(e.target.value))}
                    className="font-mono"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Fields with confidence lower than this will show an amber "Review Needed" warning.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={formState.requireManualWeight}
                    onChange={(e) => handleInputChange("requireManualWeight", e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Enforce Physical Scale Measurement before Verification
                    </span>
                    <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">
                      Prevents parcels from being verified until actual weight is measured and recorded,
                      ensuring accurate courier billing and preventing discrepancy fines.
                    </span>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Excel Manifest Preferences */}
        {activeTab === "excel" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-slate-900">
                Excel Manifest Columns
              </CardTitle>
              <CardDescription>
                Select which columns to include in the generated Excel (.xlsx) file.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { key: "includeSNo", label: "S.No (Row Counter)" },
                  { key: "includeConsignmentNumber", label: "Consignment Number" },
                  { key: "includeSenderName", label: "Sender Name" },
                  { key: "includeReceiverName", label: "Receiver Name" },
                  { key: "includeReceiverMobile", label: "Receiver Mobile" },
                  { key: "includeReceiverAddress", label: "Receiver Address" },
                  { key: "includePincode", label: "Pincode" },
                  { key: "includeBookingDate", label: "Booking Date" },
                  { key: "includeWeight", label: "Scale Weight (kg)" },
                  { key: "includeCodAmount", label: "COD Amount (₹)" },
                  { key: "includeVerificationStatus", label: "Verification Status" },
                  { key: "includeCourierPartner", label: "Courier Partner Name" },
                ].map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer select-none text-xs font-medium text-slate-800"
                  >
                    <input
                      type="checkbox"
                      checked={!!formState.excelPreferences[col.key]}
                      onChange={() => handleExcelPrefToggle(col.key)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 4: Operator Profile */}
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-slate-900">
                Demonstration Operator Profile
              </CardTitle>
              <CardDescription>
                Operator identity stamped onto verified parcel audit records.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Operator Full Name
                  </label>
                  <Input
                    value={formState.userProfile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation / Role
                  </label>
                  <Input
                    value={formState.userProfile.role}
                    onChange={(e) => handleProfileChange("role", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Operator Email
                  </label>
                  <Input
                    value={formState.userProfile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Employee ID
                  </label>
                  <Input
                    value={formState.userProfile.employeeId}
                    onChange={(e) => handleProfileChange("employeeId", e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom Save Bar */}
        <div className="flex justify-end pt-2">
          <Button
            size="lg"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20"
          >
            <Save className="h-4 w-4 mr-2" />
            Save All Preferences
          </Button>
        </div>

        {/* Reset Confirmation Modal */}
        <Modal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          title="Reset Prototype to Default Mock Data"
          description="Restore initial 24+ parcel records, pending statuses, and default hub configuration."
          size="sm"
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Any newly uploaded test images or edited parcels in this browser session will be reset to
                their clean demo baseline.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsResetModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleResetDemo}
              >
                Reset Demo Baseline
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}

