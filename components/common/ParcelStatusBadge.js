"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Clock, Scale, AlertOctagon } from "lucide-react";

export function ParcelStatusBadge({ status, weight, showIcon = true, className = "" }) {
  // If status is pending but weight is missing, show "Weight Pending"
  const isWeightPending =
    status === "pending" && (weight === "" || weight === undefined || weight === null);

  if (status === "verified") {
    return (
      <Badge variant="success" className={className}>
        {showIcon && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
        Verified
      </Badge>
    );
  }

  if (status === "rejected") {
    return (
      <Badge variant="danger" className={className}>
        {showIcon && <AlertOctagon className="h-3 w-3 text-rose-600" />}
        Rejected
      </Badge>
    );
  }

  if (isWeightPending) {
    return (
      <Badge variant="warning" className={className}>
        {showIcon && <Scale className="h-3 w-3 text-amber-600" />}
        Weight Pending
      </Badge>
    );
  }

  return (
    <Badge variant="primary" className={className}>
      {showIcon && <Clock className="h-3 w-3 text-blue-600" />}
      Pending Review
    </Badge>
  );
}

