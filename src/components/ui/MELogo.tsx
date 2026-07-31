"use client";

import React from "react";

export function MELogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Rounded Square */}
      <rect width="100" height="100" rx="24" fill="url(#meGradient)" />
      
      {/* Inner Decorative Gold Border */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="18"
        stroke="#F2CC8F"
        strokeWidth="3.5"
        strokeDasharray="90 10"
        opacity="0.85"
        fill="none"
      />

      {/* Monogram ME */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="44"
        fontWeight="800"
        fontFamily="Georgia, 'Times New Roman', serif"
        letterSpacing="-1.5"
      >
        ME
      </text>

      {/* Gold Dot Accent */}
      <circle cx="78" cy="62" r="4.5" fill="#F2CC8F" />

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="meGradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#E07A5F" />
          <stop offset="100%" stopColor="#2C1A12" />
        </linearGradient>
      </defs>
    </svg>
  );
}
