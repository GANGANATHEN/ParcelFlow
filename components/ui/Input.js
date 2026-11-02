"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef(
  ({ className, type = "text", error, icon: Icon, rightIcon: RightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            Icon && "pl-9",
            RightIcon && "pr-9",
            error &&
              "border-rose-500 text-rose-900 focus-visible:ring-rose-500 focus-visible:border-rose-500 bg-rose-50/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {RightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

