"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParcels } from "@/context/ParcelContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MOCK_OCR_TEMPLATES } from "@/lib/mock-data";
import {
  UploadCloud,
  FileImage,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Info,
  Scale,
  ShieldCheck,
  RefreshCw,
  FolderOpen,
} from "lucide-react";

export default function UploadParcelsPage() {
  const router = useRouter();
  const { addParcels, isDuplicateConsignment } = useParcels();

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedResults, setExtractedResults] = useState(null);

  const fileInputRef = useRef(null);

  // Supported file formats & limits
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const validateAndAddFiles = (fileList) => {
    setErrorMessage("");
    const validFiles = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Validate MIME type
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrorMessage(
          `"${file.name}" has an unsupported format. Please upload JPG, PNG, or WebP images only.`
        );
        continue;
      }

      // Validate size limit
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(
          `"${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB size limit. Please compress or resize the photo.`
        );
        continue;
      }

      // Generate preview URL
      validFiles.push({
        id: "file-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type,
        previewUrl: URL.createObjectURL(file),
        fileObject: file,
      });
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove && fileToRemove.previewUrl) {
        try {
          URL.revokeObjectURL(fileToRemove.previewUrl);
        } catch (e) {}
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearAllFiles = () => {
    files.forEach((f) => {
      if (f.previewUrl) {
        try {
          URL.revokeObjectURL(f.previewUrl);
        } catch (e) {}
      }
    });
    setFiles([]);
    setErrorMessage("");
    setExtractedResults(null);
  };

  // Demo shortcut: Load 4 realistic WhatsApp sample photos
  const loadSampleWhatsAppImages = () => {
    setErrorMessage("");
    const sampleFiles = [
      {
        id: "sample-1",
        name: "IMG_WA_20261102_001_SpeedEx.jpg",
        size: "412.5 KB",
        type: "image/jpeg",
        previewUrl: null,
      },
      {
        id: "sample-2",
        name: "IMG_WA_20261102_002_Delhivery.jpg",
        size: "389.2 KB",
        type: "image/jpeg",
        previewUrl: null,
      },
      {
        id: "sample-3",
        name: "IMG_WA_20261102_003_BlueDart.jpg",
        size: "524.8 KB",
        type: "image/jpeg",
        previewUrl: null,
      },
      {
        id: "sample-4",
        name: "IMG_WA_20261102_004_DTDC.jpg",
        size: "348.0 KB",
        type: "image/jpeg",
        previewUrl: null,
      },
    ];
    setFiles(sampleFiles);
  };

  // Run simulated OCR pipeline
  const handleStartProcessing = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setUploadProgress(10);
    setProcessingStage("Uploading WhatsApp parcel photos to secure staging...");

    // Stage 1
    await new Promise((res) => setTimeout(res, 600));
    setUploadProgress(35);
    setProcessingStage("Image enhancement: Auto-contrast, deskew, and barcode isolation...");

    // Stage 2
    await new Promise((res) => setTimeout(res, 700));
    setUploadProgress(70);
    setProcessingStage("Simulated OCR: Extracting Consignment #, Sender & Receiver details...");

    // Stage 3
    await new Promise((res) => setTimeout(res, 800));
    setUploadProgress(95);
    setProcessingStage("Formatting verification records & checking duplicate consignments...");

    await new Promise((res) => setTimeout(res, 400));
    setUploadProgress(100);

    // Map files to mock OCR records
    const generatedParcels = files.map((file, idx) => {
      const template = MOCK_OCR_TEMPLATES[idx % MOCK_OCR_TEMPLATES.length];
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const uniqueConsignment = template.consignmentNumber.replace(/\d{4}IN$/, `${randomSuffix}IN`);

      return {
        id: "PCL-" + Date.now() + "-" + idx,
        consignmentNumber: uniqueConsignment,
        courierPartner: template.courierPartner,
        senderName: template.senderName,
        senderPhone: template.senderPhone,
        senderCity: template.senderCity,
        receiverName: template.receiverName,
        receiverPhone: template.receiverPhone,
        receiverAddress: template.receiverAddress,
        pincode: template.pincode,
        city: template.city,
        state: template.state,
        bookingDate: "2026-11-02",
        bookingTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        weight: "", // Intentionally blank: physical scale measurement required!
        weightUnit: "kg",
        isCod: template.isCod,
        codAmount: template.codAmount,
        status: "pending",
        verificationConfidence: template.confidence,
        fieldConfidence: template.fieldConfidence,
        scannedFromWhatsApp: true,
        imageFileName: file.name,
        verifiedBy: null,
        verifiedAt: null,
        notes: "Intake from WhatsApp batch. Manual weighing on scale required.",
      };
    });

    // Add to global store
    addParcels(generatedParcels);
    setExtractedResults(generatedParcels);
    setIsProcessing(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* WhatsApp Intake Explanatory Notice */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5 text-slate-800 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="rounded-xl bg-blue-600 p-2.5 text-white shadow-xs shrink-0 mt-0.5">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  WhatsApp Intake & OCR Simulation Workflow
                </h3>
                <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-[11px] font-semibold">
                  Client Demo Ready
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Staff receive parcel images on WhatsApp and download them locally. Upload them in bulk here
                to demonstrate how simulated OCR extracts the consignment number, receiver address, and
                contact numbers automatically—eliminating manual Excel entry!
              </p>
              <div className="pt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-blue-700">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" /> Simulated OCR Confidence Scores
                </span>
                <span className="flex items-center gap-1 text-amber-700">
                  <Scale className="h-3.5 w-3.5 text-amber-600" /> Physical Weight Flagged for Measurement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drag and Drop Zone Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-base text-slate-900">
                  Batch Image Upload Zone
                </CardTitle>
                <CardDescription>
                  Supports JPG, JPEG, PNG, and WebP (up to 10MB per image).
                </CardDescription>
              </div>

              {/* Sample loader shortcut */}
              <Button
                variant="outline"
                size="sm"
                onClick={loadSampleWhatsAppImages}
                disabled={isProcessing}
                className="text-xs text-blue-700 border-blue-200 bg-blue-50/50 hover:bg-blue-100/70"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                Load 4 WhatsApp Sample Photos
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Drag & Drop Canvas */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-blue-600 bg-blue-50/70 scale-[0.99]"
                  : "border-slate-300 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md text-blue-600 mb-4 border border-slate-200">
                <UploadCloud className="h-8 w-8 stroke-[1.8]" />
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Drag and drop WhatsApp parcel photos here
              </h4>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                or <span className="font-semibold text-blue-600 underline">browse files</span> from your
                computer or WhatsApp folder
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                <span>PNG, JPG, JPEG, WebP</span>
                <span>•</span>
                <span>Up to 10MB each</span>
                <span>•</span>
                <span>Multiple files allowed</span>
              </div>
            </div>

            {/* Selected Files List */}
            {files.length > 0 && !extractedResults && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Selected Photos ({files.length})
                  </span>
                  <button
                    onClick={clearAllFiles}
                    disabled={isProcessing}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="group relative flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                        <FileImage className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                        <p className="text-[11px] text-slate-400">{file.size}</p>
                      </div>
                      {!isProcessing && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                          title="Remove image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress bar during processing */}
                {isProcessing && (
                  <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
                      <span className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                        {processingStage}
                      </span>
                      <span className="font-mono">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-200/60 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action button */}
                <div className="flex justify-end pt-2">
                  <Button
                    size="lg"
                    onClick={handleStartProcessing}
                    isLoading={isProcessing}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-500/20"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Process {files.length} Photo(s) with Simulated OCR
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Post-Processing Results Preview Card */}
        {extractedResults && (
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardHeader className="border-b border-emerald-100 flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-600 text-white p-2.5 shadow-xs">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-base text-slate-900">
                    Simulated OCR Extraction Successful!
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {extractedResults.length} parcel(s) scanned. Next: Enter physical weight on scale & verify.
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFiles}
                  className="text-xs"
                >
                  Upload Another Batch
                </Button>
                <Button
                  size="sm"
                  onClick={() => router.push(`/verification?id=${extractedResults[0].id}`)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                >
                  Proceed to Verification
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {extractedResults.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-slate-900">
                        {item.consignmentNumber}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        OCR: {item.verificationConfidence}%
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-slate-900 truncate">
                        {item.receiverName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        Ph: {item.receiverPhone}
                      </p>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {item.receiverAddress}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-700">
                        PIN: {item.pincode} ({item.city})
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Scale className="h-3 w-3" /> Weight Req.
                      </span>
                      <button
                        onClick={() => router.push(`/verification?id=${item.id}`)}
                        className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        Verify <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

