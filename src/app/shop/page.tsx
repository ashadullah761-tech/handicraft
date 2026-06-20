"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const allProducts = [
  // Wooden Furniture
  { id: 'wf-1', name: 'Solid Teak Wood Dining Chair', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture' },
  { id: 'wf-2', name: 'Premium Oak Cabinet', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture' },
  { id: 'wf-3', name: 'Minimalist Wooden Bed Frame', image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture' },
  { id: 'wf-4', name: 'Classic Wooden Coffee Table', image: 'https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture' },
  
  // Handcrafted Decor
  { id: 'hd-1', name: 'Hand-painted Ceramic Vases', image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor' },
  { id: 'hd-2', name: 'Artisan Wall Mirror', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor' },
  { id: 'hd-3', name: 'Rustic Terracotta Pottery', image: 'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor' },
  { id: 'hd-4', name: 'Carved Wooden Bowls', image: 'https://images.unsplash.com/photo-1584368686622-6b9914902db2?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor' },

  // Custom Furniture
  { id: 'cf-1', name: 'Bespoke Lounge Chair', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture' },
  { id: 'cf-2', name: 'Custom Dining Table Setup', image: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture' },
  { id: 'cf-3', name: 'Tailored Leather Sofa', image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture' },
  { id: 'cf-4', name: 'Personalized Writing Desk', image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture' },

  // Antique Furniture
  { id: 'af-1', name: 'Vintage Drawer Cabinet', image: 'https://images.unsplash.com/photo-1554295405-abb8fd54f153?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture' },
  { id: 'af-2', name: 'Victorian Era Chair', image: 'https://images.unsplash.com/photo-1615800098779-1be32e60cccc?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture' },
  { id: 'af-3', name: 'Heritage Wooden Chest', image: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture' },
  { id: 'af-4', name: 'Classic Antique Bookshelf', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture' },
];

const categories = ["All", "Wooden Furniture", "Handcrafted Decor", "Custom Furniture", "Antique Furniture"];

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
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
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
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <Link href={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-white p-4 border-b border-gray-50">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-[#2d3748] px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm z-10">
                  {product.category}
                </div>
              </Link>
              <div className="p-6 flex-grow flex flex-col bg-white">
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
