"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Download, Copy, Check, QrCode, ShieldCheck, Sparkles, Palette } from "lucide-react";

export function DesignedQRCard() {
  const [url, setUrl] = useState("https://marudharexport.com");
  const [colorTheme, setColorTheme] = useState<"royal" | "crimson" | "emerald">("royal");
  const [copied, setCopied] = useState(false);
  const [svgContent, setSvgContent] = useState<string>("");

  const themeConfig = {
    royal: {
      name: "Royal Navy & Gold",
      bgStart: "#0B132B",
      bgEnd: "#1C2541",
      accent: "#E0A96D",
      textDark: "#0B132B",
      badgeBg: "#E0A96D",
      badgeText: "#0B132B",
      moduleColor: "#0B132B"
    },
    crimson: {
      name: "Crimson Red & Dark Onyx",
      bgStart: "#1E1C19",
      bgEnd: "#0A0908",
      accent: "#C82333",
      textDark: "#1A1816",
      badgeBg: "#C82333",
      badgeText: "#FFFFFF",
      moduleColor: "#1A1816"
    },
    emerald: {
      name: "Emerald Green & Gold",
      bgStart: "#062C1B",
      bgEnd: "#021A10",
      accent: "#D4AF37",
      textDark: "#062C1B",
      badgeBg: "#D4AF37",
      badgeText: "#021A10",
      moduleColor: "#062C1B"
    }
  };

  const currentTheme = themeConfig[colorTheme];

  useEffect(() => {
    try {
      const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
      const moduleCount = qr.modules.size;
      const moduleData = qr.modules.data;

      const tileSize = 10;
      const marginModules = 4;
      const offset = marginModules * tileSize;

      const isDark = (r: number, c: number) => {
        if (r < 0 || r >= moduleCount || c < 0 || c >= moduleCount) return false;
        return moduleData[r * moduleCount + c] === 1;
      };

      let modulesSvg = "";
      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (isDark(r, c)) {
            const x = offset + c * tileSize;
            const y = offset + r * tileSize;
            modulesSvg += `<rect x="${x}" y="${y}" width="${tileSize}" height="${tileSize}" fill="${currentTheme.moduleColor}" />`;
          }
        }
      }

      setSvgContent(modulesSvg);
    } catch (err) {
      console.error("QR Generation error:", err);
    }
  }, [url, colorTheme]);

  const cardWidth = 1200;
  const cardHeight = 720;
  const totalSize = 410;

  const fullCardSvgString = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cardWidth} ${cardHeight}" width="${cardWidth}" height="${cardHeight}">
  <defs>
    <linearGradient id="cardGrad_${colorTheme}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${currentTheme.bgStart}"/>
      <stop offset="100%" stop-color="${currentTheme.bgEnd}"/>
    </linearGradient>
  </defs>

  <rect width="${cardWidth}" height="${cardHeight}" rx="32" fill="url(#cardGrad_${colorTheme})" />
  <path d="M 0,0 L 580,0 L 400,320 L 0,320 Z" fill="#FDFBF7" />
  <line x1="0" y1="320" x2="1200" y2="480" stroke="${currentTheme.accent}" stroke-width="4" opacity="0.9" />

  <g id="contact-info">
    <text x="60" y="75" font-family="'Georgia', serif" font-weight="bold" font-size="40" fill="${currentTheme.textDark}">Asadullah</text>
    <text x="60" y="112" font-family="system-ui, sans-serif" font-weight="700" font-size="18" fill="#6B5E55" letter-spacing="1.5">Website Developer</text>

    <g transform="translate(60, 148)">
      <circle cx="16" cy="16" r="16" fill="${currentTheme.textDark}" />
      <path d="M16 8 C12 8 9 11 9 15 C9 20 16 25 16 25 C16 25 23 20 23 15 C23 11 20 8 16 8 Z" fill="#FFFFFF" transform="scale(0.8) translate(4, 4)" />
      <text x="44" y="21" font-family="system-ui, sans-serif" font-weight="600" font-size="15" fill="${currentTheme.textDark}">Sanjay C Colony, Pratap Nagar</text>
      <text x="44" y="39" font-family="system-ui, sans-serif" font-weight="500" font-size="14" fill="#555555">Jodhpur, Rajasthan</text>
    </g>

    <g transform="translate(60, 208)">
      <circle cx="16" cy="16" r="16" fill="${currentTheme.textDark}" />
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#FFFFFF" stroke-width="2" transform="scale(0.75) translate(4, 4)" />
      <text x="44" y="21" font-family="system-ui, sans-serif" font-weight="600" font-size="15" fill="${currentTheme.textDark}">ashadullah761@gmail.com</text>
    </g>

    <g transform="translate(60, 258)">
      <circle cx="16" cy="16" r="16" fill="${currentTheme.textDark}" />
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3" fill="none" stroke="#FFFFFF" stroke-width="2" transform="scale(0.75) translate(4, 4)" />
      <text x="44" y="21" font-family="system-ui, sans-serif" font-weight="bold" font-size="16" fill="${currentTheme.textDark}">93516-25306</text>
    </g>
  </g>

  <g id="bottom-qr-container" transform="translate(60, 370)">
    <rect width="300" height="300" rx="24" fill="#000000" stroke="${currentTheme.accent}" stroke-width="2" opacity="0.9" />
    <text x="150" y="36" font-family="system-ui, sans-serif" font-weight="800" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">SCAN TO VIEW OUR WORK</text>

    <g transform="translate(40, 52)">
      <rect width="220" height="220" rx="14" fill="#FFFFFF" />
      <g transform="translate(10, 10) scale(${200 / totalSize})">
        ${svgContent}
      </g>
    </g>

    <rect x="85" y="265" width="130" height="28" rx="14" fill="${currentTheme.badgeBg}" />
    <text x="150" y="284" font-family="system-ui, sans-serif" font-weight="900" font-size="12" fill="${currentTheme.badgeText}" text-anchor="middle" letter-spacing="1.5">SCAN ME</text>
  </g>

  <g transform="translate(760, 380)">
    <circle cx="120" cy="110" r="100" fill="none" stroke="${currentTheme.accent}" stroke-width="3" opacity="0.4" />
    <text x="120" y="130" font-family="Georgia, serif" font-style="italic" font-weight="bold" font-size="80" fill="#FFFFFF" text-anchor="middle">AM</text>
    <text x="120" y="165" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="${currentTheme.accent}" text-anchor="middle" letter-spacing="4">ASADULLAH</text>
  </g>
</svg>`;

  const handleDownloadPNG = () => {
    const img = new Image();
    const svgBlob = new Blob([fullCardSvgString], { type: "image/svg+xml;charset=utf-8" });
    const blobUrl = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 2400;
      canvas.height = 1440;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = currentTheme.bgEnd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `side-designed-qr-card-${colorTheme}-2400px.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(blobUrl);
    };
    img.src = blobUrl;
  };

  const handleDownloadSVG = () => {
    const blob = new Blob([fullCardSvgString], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `side-designed-qr-card-${colorTheme}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  const handleCopySVG = async () => {
    try {
      await navigator.clipboard.writeText(fullCardSvgString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0A0908] text-white rounded-3xl p-6 md:p-10 shadow-2xl border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" /> Side Designed Color Themes
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold font-serif tracking-tight">
            Workable QR Business Card
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl">
            Your QR Code is 100% camera-scannable and designed in elegant side-card layouts with customizable color themes. Select your preferred theme and download directly!
          </p>
        </div>

        {/* Color Theme Buttons */}
        <div className="flex flex-col space-y-2 bg-white/10 p-2 rounded-2xl">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center flex items-center justify-center gap-1">
            <Palette className="w-3 h-3 text-amber-400" /> Select Color Theme
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setColorTheme("royal")}
              className={`px-3 py-2 rounded-xl font-bold text-xs transition-all ${
                colorTheme === "royal"
                  ? "bg-[#E0A96D] text-[#0B132B] shadow-lg font-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Royal Navy &amp; Gold
            </button>
            <button
              onClick={() => setColorTheme("crimson")}
              className={`px-3 py-2 rounded-xl font-bold text-xs transition-all ${
                colorTheme === "crimson"
                  ? "bg-[#C82333] text-white shadow-lg font-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Crimson Red
            </button>
            <button
              onClick={() => setColorTheme("emerald")}
              className={`px-3 py-2 rounded-xl font-bold text-xs transition-all ${
                colorTheme === "emerald"
                  ? "bg-[#D4AF37] text-[#021A10] shadow-lg font-black"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Emerald Green
            </button>
          </div>
        </div>
      </div>

      {/* Main Display Box */}
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl aspect-[12/7.2] rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-800 bg-[#0A0908] relative">
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: fullCardSvgString }}
            />
          </div>
        </div>

        {/* DIRECT DOWNLOAD BUTTONS SECTION */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-amber-500/30 space-y-4 text-center">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold font-serif text-gray-900 flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              Direct Download Options ({currentTheme.name})
            </h3>
            <p className="text-xs text-gray-500">
              Niche click karke 100% scannable HD PNG Image ya Vector SVG file download karein.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleDownloadPNG}
              className="w-full sm:w-auto px-8 py-4 bg-[#0B132B] hover:bg-[#1C2541] text-amber-300 font-extrabold rounded-2xl text-base shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Download className="w-5 h-5 text-amber-300" />
              Download PNG Image ({currentTheme.name})
            </button>

            <button
              onClick={handleDownloadSVG}
              className="w-full sm:w-auto px-8 py-4 bg-[#C82333] hover:bg-[#A71D2A] text-white font-extrabold rounded-2xl text-base shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Download className="w-5 h-5 text-white" />
              Download Vector SVG File
            </button>

            <button
              onClick={handleCopySVG}
              className="w-full sm:w-auto px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl text-sm transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              {copied ? "Code Copied!" : "Copy SVG Code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
