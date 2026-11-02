"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Box,
  Eye,
  EyeOff,
  Lock,
  Mail,
  AlertCircle,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Info,
  Loader2,
} from "lucide-react";

// Form validation schema using Zod
const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Email or username is required")
    .refine(
      (val) => val.includes("@") || val.length >= 3,
      "Please enter a valid email address or username"
    ),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "admin@parcelflow.com",
      password: "courierdemo2026",
      rememberMe: true,
    },
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await login(data.username, data.password, data.rememberMe);
      if (result.success) {
        router.push(from);
      } else {
        setErrorMessage(
          result.error || "Invalid username or password. Please try again."
        );
      }
    } catch (err) {
      setErrorMessage("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setValue("username", "admin@parcelflow.com");
    setValue("password", "courierdemo2026");
    setErrorMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-900 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/25 ring-8 ring-blue-500/10">
            <Box className="h-8 w-8 stroke-[2.2]" />
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            ParcelFlow
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Courier Parcel Intake & OCR Verification Workspace
          </p>
        </div>

        {/* Demonstration Disclaimer Banner */}
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 shadow-xs">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-amber-300">Demonstration Prototype Notice:</span>
              <p className="mt-0.5 text-amber-200/90 text-[11px]">
                This authentication is a prototype demonstration validated through a server-side route
                handler. In production, this must be connected to enterprise identity (SSO, NextAuth,
                OAuth, or DB).
              </p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Email or Username
              </label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="admin@parcelflow.com"
                icon={Mail}
                error={!!errors.username}
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                {...register("username")}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-rose-400">{errors.username.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Hub Security PIN</span>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••••••"
                icon={Lock}
                error={!!errors.password}
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-rose-400">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-950"
                />
                <span className="text-xs text-slate-300">Remember demo session</span>
              </label>

              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" />
                Fill Demo Login
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-600/30"
            >
              Access Operations Hub
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </form>

          {/* Quick Demo Credentials Box */}
          <div className="mt-6 border-t border-slate-800/80 pt-4">
            <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 text-xs text-slate-400">
              <div className="flex items-center justify-between font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Info className="h-3.5 w-3.5" /> Demo Credentials:
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-300">
                <p>
                  User: <span className="text-white">admin@parcelflow.com</span>
                </p>
                <p>
                  Pass: <span className="text-white">courierdemo2026</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-slate-500">
          ParcelFlow Logistics Platform • Windows 11 Enterprise Optimized
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-900">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
