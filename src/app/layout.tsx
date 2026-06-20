import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Marudhar Export | Premium Handicrafts",
  description: "Exporting beautiful, culturally inspired, modern Indian handicrafts worldwide from Marudhar Export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased min-h-full flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/917877609451?text=Hello%20Marudhar%20Export!%20I%20have%20an%20enquiry." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 md:p-5 rounded-full shadow-2xl transition-all hover:scale-110 z-50 flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.274-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.062-.301-.15-1.265-.464-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.205.048-.38-.029-.533-.075-.15-.673-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.21 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.426.248-.705.248-1.31.174-1.433-.074-.124-.272-.195-.57-.345z"/>
            <path d="M12.001 22.002c-1.644 0-3.255-.429-4.664-1.243l-.334-.194-3.46.907.922-3.376-.213-.338c-.896-1.423-1.368-3.075-1.368-4.757 0-4.964 4.04-9 9.006-9s9.005 4.036 9.005 9-4.04 9-9.005 9zm0-16.5c-4.135 0-7.505 3.37-7.505 7.5 0 1.32.344 2.614.998 3.753l.113.197-.577 2.112 2.164-.567.191.113c1.1.652 2.348.995 3.633.995 4.133 0 7.503-3.37 7.503-7.5 0-4.131-3.37-7.503-7.503-7.503z"/>
          </svg>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pl-0 group-hover:pl-2 font-medium hidden sm:block">Message Us</span>
        </a>
      </body>
    </html>
  );
}

