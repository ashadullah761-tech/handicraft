"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Generate products from the images we have in the public folder
const allProducts = [
  { id: `diwan-1`, name: `Premium Wooden Diwan`, price: 299.00, image: `/images/top-1.jpg`, category: "Wooden Diwan" },
  { id: `swing-1`, name: `Royal Wooden Swing`, price: 499.00, image: `/images/swing-1.jpg`, category: "Wooden Swing" },
  { id: `coffee-1`, name: `Carved Rectangle Table`, price: 189.00, image: `/images/coffee-1.jpg`, category: "Coffee Table" },
  { id: `coffee-2`, name: `Square Carved Table`, price: 149.00, image: `/images/coffee-2.jpg`, category: "Coffee Table" },
  { id: `coffee-3`, name: `Classic Long Table`, price: 129.00, image: `/images/coffee-3.jpg`, category: "Coffee Table" },
  { id: `coffee-4`, name: `Round Pedestal Table`, price: 159.00, image: `/images/coffee-4.jpg`, category: "Coffee Table" },
  { id: `coffee-5`, name: `Carved Glass Top Table Base`, price: 179.00, image: `/images/coffee-5.jpg`, category: "Coffee Table" },
  { id: `chair-1`, name: `Comfort Cushioned Chair`, price: 189.00, image: `/images/chair-1.jpg`, category: "Wooden Chair" },
  { id: `chair-2`, name: `Classic Slatted Chair`, price: 179.00, image: `/images/chair-2.jpg`, category: "Wooden Chair" },
  { id: `chair-3`, name: `Wooden Wheel Rocking Chair`, price: 219.00, image: `/images/chair-3.jpg`, category: "Wooden Chair" },
  { id: `chair-4`, name: `Carved Wheel Rocking Chair`, price: 239.00, image: `/images/chair-4.jpg`, category: "Wooden Chair" },
];

const categories = ["All", "Wooden Diwan", "Wooden Swing", "Coffee Table", "Wooden Chair"];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#2d3748] mb-4">Our Premium Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our curated selection of handcrafted wooden furniture, designed for elegance and durability.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat 
                  ? "bg-[#e07a5f] text-white shadow-md" 
                  : "bg-gray-200 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span className="text-sm text-gray-500 font-medium">{filteredProducts.length} Products Found</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group flex flex-col bg-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <Link href={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-gray-200 p-4 border-b border-gray-50">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#2d3748] px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm z-10">
                  {product.category}
                </div>
              </Link>
              <div className="p-6 flex-grow flex flex-col bg-gray-200">
                <h3 className="font-serif font-bold text-lg text-[#2d3748] mb-1 line-clamp-1 group-hover:text-[#e07a5f] transition-colors">
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="text-gray-500 text-sm mb-4">Handcrafted Excellence</p>
                <div className="mt-auto flex justify-end">
                  <Link href={`/product/${product.id}`} className="bg-[#e07a5f]/10 text-[#e07a5f] hover:bg-[#e07a5f] hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors inline-block">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
