"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  QrCode, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  ExternalLink,
  Info,
  Smartphone
} from "lucide-react";

export default function QRCodePage() {
  const [websiteUrl, setWebsiteUrl] = useState("https://marudharexport.com");
  const [qrSize, setQrSize] = useState(500);
  const [fgColor, setFgColor] = useState("2c1a12");
  const [bgColor, setBgColor] = useState("ffffff");
  const [copied, setCopied] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  useEffect(() => {
    // Set current domain if available in browser
    if (typeof window !== "undefined" && window.location.origin) {
      setWebsiteUrl(window.location.origin);
    }
  }, []);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
    websiteUrl
  )}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}&format=png`;

  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
    websiteUrl
  )}&color=${fgColor.replace("#", "")}&bgcolor=${bgColor.replace("#", "")}&format=svg`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(websiteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (format: "png" | "svg") => {
    try {
      setDownloadingFormat(format);
      const targetUrl = format === "svg" ? qrSvgUrl : qrImageUrl;
      const response = await fetch(targetUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `marudhar-export-qr-${format === "svg" ? "vector" : "highres"}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback direct open
      window.open(format === "svg" ? qrSvgUrl : qrImageUrl, "_blank");
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code - Marudhar Export</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center; padding: 40px; background: #fff; color: #2C1A12; }
            .card { border: 3px solid #2C1A12; padding: 30px; display: inline-block; border-radius: 16px; max-width: 400px; }
            h1 { font-size: 26px; margin-bottom: 5px; color: #2C1A12; }
            p { font-size: 14px; color: #555; margin-bottom: 20px; }
            img { width: 280px; height: 280px; margin: 0 auto; display: block; }
            .url { margin-top: 15px; font-weight: bold; font-size: 15px; word-break: break-all; color: #e07a5f; }
            .footer { margin-top: 25px; font-size: 12px; color: #888; border-top: 1px dashed #ccc; padding-top: 10px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Marudhar Export</h1>
            <p>Scan to view our handcrafted wooden furniture & items</p>
            <img src="${qrImageUrl}" alt="Marudhar Export QR Code" />
            <div class="url">${websiteUrl}</div>
            <div class="footer">Handcrafted Excellence &bull; Permanent Free QR Code</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1A12] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#e07a5f]/15 text-[#e07a5f] px-4 py-1.5 rounded-full text-sm font-semibold border border-[#e07a5f]/30">
            <ShieldCheck className="w-4 h-4" /> 100% Lifetime Free & Permanent QR Code
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#2C1A12] tracking-tight">
            Website QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ye Static QR Code kabhi expire nahi hota! Apni website ya kisi bhi link ke liye permanent QR code banayein aur high resolution me download karein.
          </p>
        </div>

        {/* Why QR Code Expired Explanation Card */}
        <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-700 shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
                Aapka Pehla QR Code Expire Kyu Hua? (Why QR Codes Expire)
              </h2>
              <div className="text-amber-800 text-sm md:text-base leading-relaxed space-y-2">
                <p>
                  Internet par zyadatar free QR code generators (jaise QR Code Generator, QRCode Monkey, Flowcode, etc.) <strong>Dynamic QR Codes</strong> banate hain. Dynamic QR code aapke asli link ki jagah unki apni website link par redirect karta hai.
                </p>
                <p>
                  Jab unka free trial (7-14 din) khatam ho jata hai, toh woh dynamic link block kar dete hain aur scan karne par &ldquo;Expired&rdquo; dikhane lagta hai.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-200/70 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/70 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm md:text-base">
                  Is Page Ka Static QR Code KABHI Expire Nahi Hoga!
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  Ye static QR code direct aapki target website URL se banta hai. Koi middleman server nahi hai.
                </p>
              </div>
            </div>
            <div className="shrink-0 font-medium text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full">
              Forever Free
            </div>
          </div>
        </div>

        {/* Interactive QR Generator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-md space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold font-serif text-[#2C1A12] flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#e07a5f]" /> Customize Your Permanent QR Code
              </h2>
              <p className="text-sm text-gray-500">Website link daalein aur colors/size customize karein</p>
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Target Website URL / Link
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://marudharexport.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#e07a5f] focus:border-[#e07a5f] text-gray-900 font-mono text-sm pr-24"
                />
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="absolute right-2 top-2 bottom-2 px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quick Link Presets
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setWebsiteUrl(typeof window !== 'undefined' ? window.location.origin : "https://marudharexport.com")}
                  className="px-3 py-1.5 bg-[#2C1A12]/5 hover:bg-[#2C1A12]/10 text-[#2C1A12] text-xs font-medium rounded-lg transition-colors"
                >
                  🏠 Website Home
                </button>
                <button
                  onClick={() => setWebsiteUrl("https://wa.me/917877609451?text=Hello%20Marudhar%20Export")}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium rounded-lg transition-colors"
                >
                  💬 WhatsApp Direct Link
                </button>
                <button
                  onClick={() => setWebsiteUrl(`${typeof window !== 'undefined' ? window.location.origin : "https://marudharexport.com"}/shop`)}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-medium rounded-lg transition-colors"
                >
                  🛒 Furniture Store Catalog
                </button>
              </div>
            </div>

            {/* Styling Controls Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Foreground Color */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  QR Pattern Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={`#${fgColor}`}
                    onChange={(e) => setFgColor(e.target.value.replace("#", ""))}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 p-0.5 bg-white"
                  />
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setFgColor("2c1a12")}
                      className="w-7 h-7 rounded-full bg-[#2c1a12] border border-gray-300 shadow-xs title='Marudhar Brown'"
                    />
                    <button
                      onClick={() => setFgColor("000000")}
                      className="w-7 h-7 rounded-full bg-black border border-gray-300 shadow-xs title='Classic Black'"
                    />
                    <button
                      onClick={() => setFgColor("1e3a8a")}
                      className="w-7 h-7 rounded-full bg-blue-900 border border-gray-300 shadow-xs title='Royal Blue'"
                    />
                  </div>
                </div>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={`#${bgColor}`}
                    onChange={(e) => setBgColor(e.target.value.replace("#", ""))}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 p-0.5 bg-white"
                  />
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setBgColor("ffffff")}
                      className="w-7 h-7 rounded-full bg-white border border-gray-300 shadow-xs title='Pure White'"
                    />
                    <button
                      onClick={() => setBgColor("fdfbf7")}
                      className="w-7 h-7 rounded-full bg-[#fdfbf7] border border-gray-300 shadow-xs title='Warm Cream'"
                    />
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex justify-between">
                  <span>Image Size / Resolution</span>
                  <span className="font-mono text-[#e07a5f] font-bold">{qrSize} x {qrSize} px</span>
                </label>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="100"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full accent-[#e07a5f] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>200px (Mobile)</span>
                  <span>500px (Standard)</span>
                  <span>1000px (Print / Banners)</span>
                </div>
              </div>

            </div>

          </div>

          {/* Live Preview & Actions */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-md space-y-6 text-center">
            
            <div className="border-b border-gray-100 pb-4 text-left">
              <h2 className="text-xl font-bold font-serif text-[#2C1A12]">
                Live QR Code Preview
              </h2>
              <p className="text-xs text-gray-500">Scan using phone camera to test</p>
            </div>

            {/* QR Code Container */}
            <div className="bg-[#fdfbf7] p-6 rounded-2xl border-2 border-dashed border-gray-300 inline-block shadow-inner relative group">
              <img
                src={qrImageUrl}
                alt="Permanent QR Code"
                className="w-64 h-64 mx-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="mt-4 text-xs font-mono text-gray-500 break-all max-w-xs mx-auto">
                {websiteUrl}
              </div>
            </div>

            {/* Download and Print Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleDownload("png")}
                disabled={downloadingFormat === "png"}
                className="w-full py-3.5 px-6 bg-[#2C1A12] hover:bg-[#1a0f0a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {downloadingFormat === "png" ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 text-[#f2cc8f]" />
                )}
                Download PNG (High Resolution Image)
              </button>

              <button
                onClick={() => handleDownload("svg")}
                disabled={downloadingFormat === "svg"}
                className="w-full py-3.5 px-6 bg-[#e07a5f] hover:bg-[#d06b50] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {downloadingFormat === "svg" ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                Download SVG Vector (For Banner / Flex Print)
              </button>

              <button
                onClick={handlePrint}
                className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-300"
              >
                <Printer className="w-4 h-4 text-gray-600" />
                Print Ready Flyer Card
              </button>
            </div>

          </div>

        </div>

        {/* Ready Files in Public Directory Info */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold font-serif text-[#2C1A12] flex items-center gap-2">
            <Info className="w-5 h-5 text-[#e07a5f]" /> Direct Links & Files Created in Project
          </h3>
          <p className="text-sm text-gray-600">
            Aapki website ke public folder me permanent QR Code images save ho chuki hain. Aap inhe web pages ya emails me directly use kar sakte hain:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm font-bold text-gray-800">/qr-code.png</p>
                <p className="text-xs text-gray-500">Standard PNG Image File</p>
              </div>
              <a 
                href="/qr-code.png" 
                target="_blank" 
                download
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                View / Download <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm font-bold text-gray-800">/qr-code.svg</p>
                <p className="text-xs text-gray-500">Vector SVG File (Scalable for Banners)</p>
              </div>
              <a 
                href="/qr-code.svg" 
                target="_blank" 
                download
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-lg flex items-center gap-1"
              >
                View / Download <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
