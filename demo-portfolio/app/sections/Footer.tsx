"use client";

import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          © 2026 DEMO. All rights reserved.
        </p>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          Crafted with <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> using Next.js & Three.js
        </p>
      </div>
    </footer>
  );
}
