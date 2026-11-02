"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParcels } from "@/context/ParcelContext";
import { ParcelLabelPreview } from "@/components/common/ParcelLabelPreview";
import { ParcelStatusBadge } from "@/components/common/ParcelStatusBadge";
import { ConfidenceBadge } from "@/components/common/ConfidenceBadge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Barcode,
  User,
  Phone,
  MapPin,
  Calendar,
  IndianRupee,
  HelpCircle,
  FileText,
  AlertCircle,
  Sparkles,
  Layers,
  Loader2,
} from "lucide-react";

// Form validation schema
const verificationSchema = z
  .object({
    consignmentNumber: z.string().min(4, "Consignment number must be at least 4 characters"),
    courierPartner: z.string().min(2, "Courier partner is required"),
    senderName: z.string().min(2, "Sender name is required"),
    senderPhone: z.string().optional(),
    senderCity: z.string().optional(),
    receiverName: z.string().min(2, "Receiver name is required"),
    receiverPhone: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .max(15, "Mobile number too long"),
    receiverAddress: z.string().min(5, "Receiver address is required"),
    pincode: z
      .string()
      .min(6, "Indian PIN code must be 6 digits")
      .max(6, "PIN code must be 6 digits")
      .regex(/^\d{6}$/, "Must be a valid 6-digit PIN code"),
    city: z.string().min(2, "City is required"),
    bookingDate: z.string().min(4, "Booking date is required"),
    weight: z
      .union([z.string(), z.number()])
      .refine(
        (val) => val !== "" && val !== undefined && val !== null && !isNaN(Number(val)) && Number(val) > 0,
        { message: "Actual weight is required. Place parcel on physical scale." }
      ),
    weightUnit: z.enum(["kg", "g"]).default("kg"),
    isCod: z.boolean().default(false),
    codAmount: z.union([z.string(), z.number()]).optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isCod) {
        return (
          data.codAmount !== "" &&
          data.codAmount !== undefined &&
          !isNaN(Number(data.codAmount)) &&
          Number(data.codAmount) > 0
        );
      }
      return true;
    },
    {
      message: "Please enter a valid COD collection amount",
      path: ["codAmount"],
    }
  );

function VerificationWorkspaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("id");

  const {
    parcels,
    verifyParcel,
    rejectParcel,
    updateParcel,
    isDuplicateConsignment,
    stats,
  } = useParcels();

  // Pending parcels list
  const pendingQueue = useMemo(() => {
    return parcels.filter((p) => p.status === "pending");
  }, [parcels]);

  // Current parcel selection
  const [currentParcelId, setCurrentParcelId] = useState(null);
  const [highlightField, setHighlightField] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("Unreadable/Blurry WhatsApp Image");
  const [duplicateWarning, setDuplicateWarning] = useState("");

  // Select initial parcel
  useEffect(() => {
    if (requestedId && parcels.some((p) => p.id === requestedId)) {
      setCurrentParcelId(requestedId);
    } else if (pendingQueue.length > 0) {
      setCurrentParcelId(pendingQueue[0].id);
    } else if (parcels.length > 0) {
      setCurrentParcelId(parcels[0].id);
    }
  }, [requestedId, pendingQueue, parcels]);

  const currentParcel = useMemo(() => {
    return parcels.find((p) => p.id === currentParcelId) || null;
  }, [parcels, currentParcelId]);

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      consignmentNumber: "",
      courierPartner: "SpeedEx Express",
      senderName: "",
      senderPhone: "",
      senderCity: "",
      receiverName: "",
      receiverPhone: "",
      receiverAddress: "",
      pincode: "",
      city: "",
      bookingDate: "2026-11-02",
      weight: "",
      weightUnit: "kg",
      isCod: false,
      codAmount: 0,
      notes: "",
    },
  });

  const isCodValue = watch("isCod");
  const watchedConsignment = watch("consignmentNumber");

  // Sync form when current parcel changes
  useEffect(() => {
    if (currentParcel) {
      reset({
        consignmentNumber: currentParcel.consignmentNumber || "",
        courierPartner: currentParcel.courierPartner || "SpeedEx Express",
        senderName: currentParcel.senderName || "",
        senderPhone: currentParcel.senderPhone || "",
        senderCity: currentParcel.senderCity || "",
        receiverName: currentParcel.receiverName || "",
        receiverPhone: currentParcel.receiverPhone || "",
        receiverAddress: currentParcel.receiverAddress || "",
        pincode: currentParcel.pincode || "",
        city: currentParcel.city || "",
        bookingDate: currentParcel.bookingDate || "2026-11-02",
        weight: currentParcel.weight ?? "",
        weightUnit: currentParcel.weightUnit || "kg",
        isCod: !!currentParcel.isCod,
        codAmount: currentParcel.codAmount || 0,
        notes: currentParcel.notes || "",
      });
      setDuplicateWarning("");
    }
  }, [currentParcel, reset]);

  // Check for duplicate consignment number
  useEffect(() => {
    if (watchedConsignment && currentParcel) {
      if (isDuplicateConsignment(watchedConsignment, currentParcel.id)) {
        setDuplicateWarning(
          `Warning: Consignment "${watchedConsignment}" already exists in the system!`
        );
      } else {
        setDuplicateWarning("");
      }
    }
  }, [watchedConsignment, currentParcel, isDuplicateConsignment]);

  // Navigation within pending queue
  const currentIndex = pendingQueue.findIndex((p) => p.id === currentParcelId);
  const hasNext = currentIndex < pendingQueue.length - 1;
  const hasPrev = currentIndex > 0;

  const goToNextPending = () => {
    if (hasNext) {
      setCurrentParcelId(pendingQueue[currentIndex + 1].id);
    } else if (pendingQueue.length > 0) {
      setCurrentParcelId(pendingQueue[0].id);
    }
  };

  const goToPrevPending = () => {
    if (hasPrev) {
      setCurrentParcelId(pendingQueue[currentIndex - 1].id);
    }
  };

  // Save changes only (without changing status)
  const handleSaveOnly = (data) => {
    if (!currentParcel) return;
    updateParcel(currentParcel.id, {
      ...data,
      weight: data.weight !== "" ? Number(data.weight) : "",
      codAmount: data.isCod ? Number(data.codAmount) : 0,
    });
  };

  // Verify parcel (with weight)
  const handleVerify = (data, proceedToNext = false) => {
    if (!currentParcel) return;
    verifyParcel(currentParcel.id, {
      ...data,
      weight: Number(data.weight),
      codAmount: data.isCod ? Number(data.codAmount) : 0,
    });

    if (proceedToNext) {
      const remaining = pendingQueue.filter((p) => p.id !== currentParcel.id);
      if (remaining.length > 0) {
        setCurrentParcelId(remaining[0].id);
      }
    }
  };

  // Reject parcel action
  const handleConfirmReject = () => {
    if (!currentParcel) return;
    rejectParcel(currentParcel.id, rejectionReason);
    setIsRejectModalOpen(false);

    const remaining = pendingQueue.filter((p) => p.id !== currentParcel.id);
    if (remaining.length > 0) {
      setCurrentParcelId(remaining[0].id);
    }
  };

  // Field confidence helper
  const getFieldConfidence = (fieldName) => {
    return currentParcel?.fieldConfidence?.[fieldName];
  };

  return (
    <div className="space-y-5">
      {/* Top Queue Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Pending Verification Queue
              </span>
              <span className="rounded-full bg-amber-100 text-amber-800 font-bold px-2 py-0.5 text-[11px] border border-amber-300">
                {pendingQueue.length} Remaining
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {currentParcel
                ? `Viewing consignment ${currentParcel.consignmentNumber}`
                : "No pending parcels"}
            </p>
          </div>
        </div>

        {/* Queue Navigator */}
        {pendingQueue.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Button
              variant="outline"
              size="xs"
              onClick={goToPrevPending}
              disabled={!hasPrev}
              className="text-slate-600"
            >
              <ArrowLeft className="h-3 w-3 mr-1" /> Prev
            </Button>

            <div className="flex items-center gap-1.5 max-w-xs sm:max-w-md overflow-x-auto">
              {pendingQueue.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentParcelId(item.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all shrink-0 ${
                    item.id === currentParcelId
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="xs"
              onClick={goToNextPending}
              disabled={!hasNext}
              className="text-slate-600"
            >
              Next <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Empty State when no parcel exists */}
      {!currentParcel ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">All Parcels Verified!</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            There are no pending parcels awaiting verification. Upload new parcel images or download
            today's Excel manifest.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Button onClick={() => router.push("/upload")}>Upload New Images</Button>
            <Button variant="outline" onClick={() => router.push("/daily-excel")}>
              View Daily Excel
            </Button>
          </div>
        </div>
      ) : (
        /* Main Two-Column Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Original Parcel Image Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="overflow-hidden border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50/70 p-4 border-b border-slate-100 flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Original Parcel Shipping Label</span>
                    <ParcelStatusBadge
                      status={currentParcel.status}
                      weight={currentParcel.weight}
                      showIcon={false}
                      className="text-[10px]"
                    />
                  </CardTitle>
                  <CardDescription className="text-[11px] text-slate-500">
                    Scanned from WhatsApp intake photo
                  </CardDescription>
                </div>
                <ConfidenceBadge score={currentParcel.verificationConfidence} />
              </CardHeader>

              <div className="p-3">
                <ParcelLabelPreview
                  parcel={currentParcel}
                  highlightField={highlightField}
                  showOcrBoxes={true}
                />
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Intake Source:</span>
                  <span className="font-semibold text-slate-800">WhatsApp Media Attachment</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>File Name:</span>
                  <span className="font-mono text-slate-700 text-[11px]">
                    {currentParcel.imageFileName || "IMG_WA_20261102.jpg"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Booking Time:</span>
                  <span className="font-mono text-slate-700 text-[11px]">
                    {currentParcel.bookingTime || "10:30 AM"}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Extracted Fields & Verification Form (7 cols) */}
          <div className="lg:col-span-7">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50/70 p-4 border-b border-slate-100 flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Extracted Parcel Details & Verification
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </CardTitle>
                  <CardDescription className="text-[11px] text-slate-500">
                    Review simulated OCR data. Fields with low confidence are highlighted for check.
                  </CardDescription>
                </div>

                <span className="text-[11px] text-slate-500 font-mono">
                  ID: {currentParcel.id}
                </span>
              </CardHeader>

              <CardContent className="p-5">
                {duplicateWarning && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 font-medium">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>{duplicateWarning}</span>
                  </div>
                )}

                <form className="space-y-4">
                  {/* Consignment Number & Courier Partner */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <Barcode className="h-3.5 w-3.5 text-blue-600" />
                          Consignment Number *
                        </label>
                        <ConfidenceBadge
                          score={getFieldConfidence("consignmentNumber")}
                          showPercent={false}
                        />
                      </div>
                      <Input
                        {...register("consignmentNumber")}
                        onFocus={() => setHighlightField("consignmentNumber")}
                        onBlur={() => setHighlightField(null)}
                        error={!!errors.consignmentNumber}
                        className="font-mono font-bold uppercase text-slate-900"
                      />
                      {errors.consignmentNumber && (
                        <p className="mt-1 text-xs text-rose-500">
                          {errors.consignmentNumber.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Courier Partner
                      </label>
                      <select
                        {...register("courierPartner")}
                        className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="SpeedEx Express">SpeedEx Express</option>
                        <option value="BlueDart Express">BlueDart Express</option>
                        <option value="Delhivery Surface">Delhivery Surface</option>
                        <option value="DTDC Plus">DTDC Plus</option>
                        <option value="India Speed Post">India Speed Post</option>
                      </select>
                    </div>
                  </div>

                  {/* Sender Details */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-slate-500" />
                        Sender (Shipper) Details
                      </span>
                      <ConfidenceBadge
                        score={getFieldConfidence("senderName")}
                        showPercent={false}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Sender Name *
                        </label>
                        <Input
                          {...register("senderName")}
                          onFocus={() => setHighlightField("senderName")}
                          onBlur={() => setHighlightField(null)}
                          error={!!errors.senderName}
                          placeholder="Shipper Company or Person"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Sender Origin City
                        </label>
                        <Input {...register("senderCity")} placeholder="e.g. Mumbai" />
                      </div>
                    </div>
                  </div>

                  {/* Receiver Details (Ship-To) */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-blue-600" />
                        Receiver (Consignee) Details
                      </span>
                      <div className="flex items-center gap-2">
                        {getFieldConfidence("receiverPhone") < 75 && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded">
                            Phone OCR Low Confidence
                          </span>
                        )}
                        <ConfidenceBadge
                          score={getFieldConfidence("receiverName")}
                          showPercent={false}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Receiver Full Name *
                        </label>
                        <Input
                          {...register("receiverName")}
                          onFocus={() => setHighlightField("receiverName")}
                          onBlur={() => setHighlightField(null)}
                          error={!!errors.receiverName}
                        />
                        {errors.receiverName && (
                          <p className="mt-1 text-xs text-rose-500">
                            {errors.receiverName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-semibold text-slate-600">
                            Receiver Mobile Number *
                          </label>
                          <ConfidenceBadge
                            score={getFieldConfidence("receiverPhone")}
                            showPercent={true}
                            className="text-[10px] py-0"
                          />
                        </div>
                        <Input
                          {...register("receiverPhone")}
                          onFocus={() => setHighlightField("receiverPhone")}
                          onBlur={() => setHighlightField(null)}
                          error={!!errors.receiverPhone}
                          placeholder="10-digit mobile"
                        />
                        {errors.receiverPhone && (
                          <p className="mt-1 text-xs text-rose-500">
                            {errors.receiverPhone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-semibold text-slate-600">
                          Receiver Complete Delivery Address *
                        </label>
                        <ConfidenceBadge
                          score={getFieldConfidence("receiverAddress")}
                          showPercent={false}
                        />
                      </div>
                      <textarea
                        {...register("receiverAddress")}
                        onFocus={() => setHighlightField("receiverAddress")}
                        onBlur={() => setHighlightField(null)}
                        rows={2}
                        className={`w-full rounded-lg border p-2.5 text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.receiverAddress
                            ? "border-rose-500 bg-rose-50/20"
                            : "border-slate-300 bg-white"
                        }`}
                        placeholder="House/flat, street, landmark..."
                      />
                      {errors.receiverAddress && (
                        <p className="mt-1 text-xs text-rose-500">
                          {errors.receiverAddress.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] font-semibold text-slate-600">
                            Pincode (6 digits) *
                          </label>
                          <ConfidenceBadge
                            score={getFieldConfidence("pincode")}
                            showPercent={false}
                          />
                        </div>
                        <Input
                          {...register("pincode")}
                          onFocus={() => setHighlightField("pincode")}
                          onBlur={() => setHighlightField(null)}
                          error={!!errors.pincode}
                          placeholder="560102"
                          className="font-mono font-bold"
                        />
                        {errors.pincode && (
                          <p className="mt-1 text-xs text-rose-500">{errors.pincode.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Destination City *
                        </label>
                        <Input {...register("city")} error={!!errors.city} placeholder="Bengaluru" />
                      </div>
                    </div>
                  </div>

                  {/* Weight Measurement (Crucial Field!) */}
                  <div className="rounded-xl border-2 border-amber-300 bg-amber-50/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Scale className="h-4 w-4 text-amber-600" />
                        Actual Physical Weight *
                      </label>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                        Scale Required
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <Input
                          type="number"
                          step="0.01"
                          {...register("weight")}
                          onFocus={() => setHighlightField("weight")}
                          onBlur={() => setHighlightField(null)}
                          error={!!errors.weight}
                          placeholder="e.g. 1.25"
                          className="font-mono font-bold text-base bg-white"
                        />
                        {errors.weight && (
                          <p className="mt-1 text-xs text-rose-600 font-medium">
                            {errors.weight.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <select
                          {...register("weightUnit")}
                          className="h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="kg">Kilograms (kg)</option>
                          <option value="g">Grams (g)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* COD & Booking Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* COD Toggle & Amount */}
                    <div className="rounded-xl border border-slate-200 p-3 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            {...register("isCod")}
                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-xs font-bold text-slate-800">
                            Cash on Delivery (COD)
                          </span>
                        </label>
                        {isCodValue && (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            Collect Cash
                          </span>
                        )}
                      </div>

                      {isCodValue && (
                        <div>
                          <Input
                            type="number"
                            icon={IndianRupee}
                            {...register("codAmount")}
                            error={!!errors.codAmount}
                            placeholder="COD Amount in ₹"
                            className="font-mono font-bold text-rose-900 bg-rose-50/30"
                          />
                          {errors.codAmount && (
                            <p className="mt-1 text-xs text-rose-500">
                              {errors.codAmount.message}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Booking Date */}
                    <div className="rounded-xl border border-slate-200 p-3 bg-white space-y-1">
                      <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-500" />
                        Booking Date
                      </label>
                      <Input
                        type="date"
                        {...register("bookingDate")}
                        className="font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Internal Notes */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Verification Remarks / Hub Notes (Optional)
                    </label>
                    <Input
                      {...register("notes")}
                      placeholder="e.g. Verified against weighing scale, fragile contents"
                    />
                  </div>

                  {/* Action Buttons Toolbar */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="dangerOutline"
                        size="sm"
                        onClick={() => setIsRejectModalOpen(true)}
                        className="text-xs"
                      >
                        <XCircle className="h-4 w-4 mr-1 text-rose-600" />
                        Reject Parcel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSubmit(handleSaveOnly)}
                        className="text-xs"
                      >
                        Save Draft
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="md"
                        onClick={handleSubmit((data) => handleVerify(data, false))}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        Save & Verify
                      </Button>

                      <Button
                        size="md"
                        onClick={handleSubmit((data) => handleVerify(data, true))}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20"
                      >
                        Verify & Next
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Consignment Intake"
        description="Mark this parcel as rejected. You can specify why the parcel could not be verified."
        size="sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Reason for Rejection
            </label>
            <select
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="Unreadable/Blurry WhatsApp Image">
                Unreadable or Blurry WhatsApp Image
              </option>
              <option value="Mismatched Consignment Details">
                Mismatched Consignment / Barcode Mismatch
              </option>
              <option value="Invalid or Incomplete Address">
                Invalid Delivery Address or Wrong Pincode
              </option>
              <option value="Physical Parcel Damaged on Arrival">
                Physical Parcel Damaged on Arrival
              </option>
              <option value="Sender Cancelled Dispatch">
                Sender Cancelled Dispatch
              </option>
            </select>
          </div>

          <p className="text-xs text-slate-500">
            The sender will be notified via WhatsApp to resend a clearer photo or cancel the parcel entry.
          </p>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRejectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleConfirmReject}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function VerificationPage() {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <VerificationWorkspaceContent />
      </Suspense>
    </AppLayout>
  );
}
