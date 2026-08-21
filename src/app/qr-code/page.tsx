import { DesignedQRCard } from "@/components/qrcode/DesignedQRCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Designed Scannable QR Code & Business Card | Marudhar Export",
  description: "Download 100% workable, scannable designed QR code and business card for Marudhar Export and Website Developer.",
};

export default function QRCodePage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-12">
      <DesignedQRCard />
    </main>
  );
}
