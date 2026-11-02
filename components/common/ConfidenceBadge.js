"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, AlertCircle } from "lucide-react";

export function ConfidenceBadge({ score, label = "OCR", showPercent = true, className = "" }) {
  if (score === undefined || score === null) return null;

  const numericScore = Number(score);

  if (numericScore >= 90) {
    return (
      <Badge variant="success" className={className}>
        <Sparkles className="h-2.5 w-2.5 text-emerald-600" />
        <span>{label}</span>
        {showPercent && <span className="font-mono font-bold">{numericScore}%</span>}
      </Badge>
    );
  }

  if (numericScore >= 75) {
    return (
      <Badge variant="warning" className={className}>
        <AlertCircle className="h-2.5 w-2.5 text-amber-600" />
        <span>Review</span>
        {showPercent && <span className="font-mono font-bold">{numericScore}%</span>}
      </Badge>
    );
  }

  return (
    <Badge variant="danger" className={className}>
      <AlertCircle className="h-2.5 w-2.5 text-rose-600" />
      <span>Low Conf</span>
      {showPercent && <span className="font-mono font-bold">{numericScore}%</span>}
    </Badge>
  );
}

