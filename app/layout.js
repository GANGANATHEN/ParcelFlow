import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ParcelProvider } from "@/context/ParcelContext";

export const metadata = {
  title: "ParcelFlow — Courier Parcel Management & OCR Verification",
  description:
    "Enterprise courier parcel intake, simulated OCR data extraction, weight capture, and daily Excel manifest generation.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <AuthProvider>
          <ParcelProvider>{children}</ParcelProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

