"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Globe, Phone } from "lucide-react";

const categories = [
  { name: "Pottery", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800", href: "/category/pottery" },
  { name: "Handloom", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=800", href: "/category/handloom" },
  { name: "Jewelry", image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&q=80&w=800", href: "/category/jewelry" },
  { name: "Woodwork", image: "https://images.unsplash.com/photo-1582216503940-5a3962d8095b?auto=format&fit=crop&q=80&w=800", href: "/category/woodwork" },
];

const featuredProducts = [
  { id: "1", name: "Terracotta Vase", price: 45.00, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800", category: "Pottery" },
  { id: "2", name: "Kashmiri Shawl", price: 120.00, image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=800", category: "Handloom" },
  { id: "3", name: "Silver Oxidized Necklace", price: 85.00, image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&q=80&w=800", category: "Jewelry" },
  { id: "4", name: "Hand-carved Elephant", price: 65.00, image: "https://images.unsplash.com/photo-1582216503940-5a3962d8095b?auto=format&fit=crop&q=80&w=800", category: "Woodwork" },
];

export default function Home() {
  const topProducts = [
    { id: 1, image: "/images/top-1.jpg", name: "Wooden Diwan" },
    { id: 2, image: "/images/top-2.jpg", name: "Wooden Diwan" },
    { id: 3, image: "/images/top-3.jpg", name: "Wooden Diwan" },
    { id: 4, image: "/images/top-4.jpg", name: "Wooden Diwan" },
  ];

  // Double the products to make the marquee infinite scroll smoothly
  const marqueeProducts = [...topProducts, ...topProducts];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section / Banner */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#2d3748]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/top-1.jpg"
            alt="Marudhar Export Premium Wooden Furniture"
            fill
            className="object-cover object-center brightness-[0.3]"
            priority
            unoptimized={true}
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-4 leading-tight drop-shadow-lg">
            Marudhar Export
          </h1>
          <div className="mb-10">
            <p className="text-xl md:text-3xl text-[#f2cc8f] drop-shadow-md font-serif italic mb-2">
              "Bringing Indian Heritage to the Global Stage"
            </p>
            <p className="text-lg md:text-xl text-gray-200 drop-shadow-md font-medium">
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
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto justify-center"
            >
              Contact Us <Phone className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scrolling Top Products Marquee - Wooden Diwans */}
      <section className="py-12 bg-[#2d3748] overflow-hidden border-b border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-white">Our Premium Collection</h2>
          <p className="text-[#f2cc8f] mt-2 font-medium">Finest Wooden Diwans</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max">
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`diwan-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/top-${num}.jpg`} 
                    alt="Wooden Diwan"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Diwan</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`diwan-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/top-${num}.jpg`} 
                    alt="Wooden Diwan"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
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
      <section className="py-12 bg-[#2d3748] overflow-hidden border-b border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-white">Royal Heritage</h2>
          <p className="text-[#f2cc8f] mt-2 font-medium">Traditional Wooden Swings (Jhula)</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max" style={{ animationDirection: 'reverse' }}>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`swing-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/swing-${num}.jpg`} 
                    alt="Wooden Swing"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Swing</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`swing-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/swing-${num}.jpg`} 
                    alt="Wooden Swing"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
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
      <section className="py-12 bg-[#2d3748] overflow-hidden border-b border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-white">Elegant Living</h2>
          <p className="text-[#f2cc8f] mt-2 font-medium">Premium Wooden Coffee Tables</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max">
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <div key={`coffee-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/coffee-${num}.jpg`} 
                    alt="Wooden Coffee Table"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Coffee Table</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <div key={`coffee-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/coffee-${num}.jpg`} 
                    alt="Wooden Coffee Table"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
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
      <section className="py-12 bg-[#2d3748] overflow-hidden">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-white">Classic Comfort</h2>
          <p className="text-[#f2cc8f] mt-2 font-medium">Handcrafted Wooden Chairs</p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] w-max" style={{ animationDirection: 'reverse' }}>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`chair-1-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/chair-${num}.jpg`} 
                    alt="Wooden Chair"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Chair</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-6 pr-6">
              {[1, 2, 3, 4].map((num, index) => (
                <div key={`chair-2-${index}`} className="relative w-72 sm:w-80 h-64 flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-white/10 transition-transform duration-300 hover:scale-105">
                  <Image 
                    src={`/images/chair-${num}.jpg`} 
                    alt="Wooden Chair"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={true}
                    className="object-contain bg-white p-2"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-center">Wooden Chair</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story/About Section */}
      <section id="about" className="py-24 bg-[#2d3748] text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="text-[#f4a261] font-semibold tracking-wider uppercase text-sm mb-2 block">About Marudhar Export</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-white">Delivering Excellence Worldwide</h2>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            At <strong className="text-[#f2cc8f] font-normal">Marudhar Export</strong>, we pride ourselves on sourcing and manufacturing the finest quality Indian handicrafts, textiles, and home decor items. With decades of experience in global trade, we understand the standards expected by our international clientele.
          </p>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Our product line spans across intricate woodwork, traditional handlooms, exquisite pottery, and premium jewelry. We work directly with master artisans, ensuring fair trade practices while delivering bulk orders with unmatched precision and quality control.
          </p>
          <ul className="flex flex-col md:flex-row justify-center gap-8 mb-10">
            <li className="flex items-center gap-3 text-lg"><Globe className="text-[#e07a5f] w-6 h-6" /> 30+ Countries</li>
            <li className="flex items-center gap-3 text-lg"><Star className="text-[#e07a5f] w-6 h-6 fill-current" /> Premium Quality</li>
            <li className="flex items-center gap-3 text-lg"><Star className="text-[#e07a5f] w-6 h-6 fill-current" /> Custom Orders</li>
          </ul>
          <Link 
            href="/about" 
            className="inline-block border-2 border-[#e07a5f] bg-[#e07a5f]/10 text-white hover:bg-[#e07a5f] hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Learn More About Us
          </Link>
        </div>
      </section>
    </div>
  );
}
