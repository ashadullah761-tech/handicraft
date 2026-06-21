"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section / Banner */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#2C1A12]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000"
            alt="Marudhar Export Premium Wooden Furniture"
            fill
            className="object-cover object-center"
            priority
            unoptimized={true}
          />
          {/* Rich Dark Wood Overlay */}
          <div className="absolute inset-0 bg-[#2C1A12]/60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-4 leading-tight drop-shadow-lg">
            Marudhar Export
          </h1>
          <div className="mb-10">
            <p className="text-xl md:text-3xl text-[#f2cc8f] font-serif italic mb-2 drop-shadow-md">
              &quot;Bringing Indian Heritage to the Global Stage&quot;
            </p>
            <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-md">
              We are a premier export house specializing in authentic, handcrafted treasures.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-[#e07a5f] hover:bg-[#d06b50] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              View Collection <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-gray-200/10 hover:bg-gray-200/20 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Contact Us <Phone className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scrolling Top Products Marquee - Wooden Diwans */}
      <section className="py-12 bg-[#FAFAF9] overflow-hidden border-b border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-[#2d3748]">Our Premium Collection</h2>
          <p className="text-[#e07a5f] mt-2 font-medium">Finest Wooden Diwans</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max">
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`diwan-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/top-${num}.jpg?v=2`} 
                    alt="Wooden Diwan"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Diwan</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`diwan-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/top-${num}.jpg?v=2`} 
                    alt="Wooden Diwan"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Diwan</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Top Products Marquee - Wooden Swings */}
      <section className="py-12 bg-[#F5F0E6] overflow-hidden border-b border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-[#2d3748]">Royal Heritage</h2>
          <p className="text-[#e07a5f] mt-2 font-medium">Traditional Wooden Swings (Jhula)</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max" style={{ animationDirection: 'reverse' }}>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`swing-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/swing-${num}.jpg?v=2`} 
                    alt="Wooden Swing"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Swing</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`swing-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/swing-${num}.jpg?v=2`} 
                    alt="Wooden Swing"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Swing</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Top Products Marquee - Coffee Tables */}
      <section className="py-12 bg-[#FAFAF9] overflow-hidden border-b border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-[#2d3748]">Elegant Living</h2>
          <p className="text-[#e07a5f] mt-2 font-medium">Premium Wooden Coffee Tables</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max">
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <div key={`coffee-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/coffee-${num}.jpg?v=2`} 
                    alt="Wooden Coffee Table"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Coffee Table</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <div key={`coffee-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/coffee-${num}.jpg?v=2`} 
                    alt="Wooden Coffee Table"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Coffee Table</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Top Products Marquee - Wooden Chairs */}
      <section className="py-12 bg-[#F5F0E6] overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-[#2d3748]">Classic Comfort</h2>
          <p className="text-[#e07a5f] mt-2 font-medium">Handcrafted Wooden Chairs</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max" style={{ animationDirection: 'reverse' }}>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`chair-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/chair-${num}.jpg?v=2`} 
                    alt="Wooden Chair"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  {num !== 4 && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-center">Wooden Chair</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`chair-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-gray-200 rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/chair-${num}.jpg?v=2`} 
                    alt="Wooden Chair"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-gray-200 p-2"
                  />
                  {num !== 4 && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-center">Wooden Chair</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Furniture Request Section */}
      <section className="py-20 bg-gray-100 overflow-hidden border-b border-gray-200 relative">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2d3748]">Got a Design in Mind?</h2>
            <p className="text-[#e07a5f] mt-2 font-medium text-lg">Upload your photo and we will make the exact same furniture for you!</p>
          </div>
          
          <div className="bg-gray-200 rounded-3xl shadow-xl overflow-hidden border border-gray-300 flex flex-col md:flex-row">
            {/* Left Side Info */}
            <div className="bg-[#2C1A12] p-8 md:p-12 text-white md:w-2/5 flex flex-col justify-center relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold font-serif mb-4 text-[#f2cc8f]">Custom Craftsmanship</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Can&apos;t find exactly what you&apos;re looking for? Don&apos;t worry! Upload a picture of any furniture design, and our master artisans will carve and build it exclusively for you.
                </p>
                <ul className="space-y-4 text-gray-200 font-medium">
                  <li className="flex items-center gap-3">
                    <div className="bg-[#e07a5f] p-1 rounded-full"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                    Exact Replica Making
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-[#e07a5f] p-1 rounded-full"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                    Premium Quality Wood
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-[#e07a5f] p-1 rounded-full"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                    Custom Dimensions
                  </li>
                </ul>
              </div>
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#e07a5f] rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            </div>
            
            {/* Right Side Form */}
            <div className="p-8 md:p-12 md:w-3/5 bg-gray-100">
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! Your custom design request has been submitted successfully. Our shopkeeper will contact you shortly.");
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Your Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent transition-all bg-gray-50" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">Contact Number</label>
                    <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent transition-all bg-gray-50" placeholder="Your phone number" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Upload Furniture Photo</label>
                  <div className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-gray-400 border-dashed rounded-xl bg-gray-50 hover:bg-gray-200 transition-colors relative group">
                    <div className="space-y-4 text-center w-full">
                      <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-[#e07a5f] transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                        <label htmlFor="file-upload" className="cursor-pointer rounded-xl font-bold bg-[#e07a5f] text-white px-5 py-2.5 hover:bg-[#d06b50] transition-all shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          Upload Picture
                        </label>
                        <span className="text-gray-400 font-bold text-sm">OR</span>
                        <label htmlFor="file-upload" className="cursor-pointer rounded-xl font-bold bg-white text-[#e07a5f] border-2 border-[#e07a5f] px-5 py-2.5 hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          Open Gallery
                        </label>
                      </div>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" required />
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Any Specific Details? (Optional)</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent transition-all bg-gray-50" placeholder="E.g., I want this in Teak Wood, dimensions 5ft x 3ft..."></textarea>
                </div>

                <button type="submit" className="w-full bg-[#e07a5f] hover:bg-[#d06b50] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 text-lg">
                  Submit Order Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Story/About Section */}
      <section id="about" className="py-24 bg-[#FAFAF9] text-[#2d3748]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-[#e07a5f] font-semibold tracking-wider uppercase text-sm mb-2 block">About Marudhar Export</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-[#2d3748]">Delivering Excellence Worldwide</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            At <strong className="text-[#e07a5f] font-semibold">Marudhar Export</strong>, we pride ourselves on sourcing and manufacturing the finest quality Indian handicrafts, textiles, and home decor items. With decades of experience in global trade, we understand the standards expected by our international clientele.
          </p>
          <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 text-left max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-[#2d3748] mb-4 text-center">Our Specializations</h3>
            <ul className="space-y-3 text-lg text-gray-700 font-medium">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#e07a5f]"></span> Wooden Furniture</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#e07a5f]"></span> Handcrafted Decor</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#e07a5f]"></span> Custom Furniture</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#e07a5f]"></span> Antique Furniture</li>
            </ul>
          </div>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            We work directly with master artisans, ensuring fair trade practices while delivering bulk orders with unmatched precision and quality control.
          </p>
          <Link 
            href="/contact" 
            className="inline-block border-2 border-[#e07a5f] text-[#e07a5f] hover:bg-[#e07a5f] hover:text-white px-8 py-3 rounded-full font-semibold transition-colors mt-4"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
