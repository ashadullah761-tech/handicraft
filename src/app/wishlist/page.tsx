"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { useEffect, useState } from "react";

// In a real app, you would fetch these products from your DB using the IDs in the wishlist store
const productDB = {
  "1": { id: "1", name: "Terracotta Vase", price: 45.00, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800", category: "Pottery", stock: 12 },
  "2": { id: "2", name: "Kashmiri Shawl", price: 120.00, image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=800", category: "Handloom", stock: 5 },
  "3": { id: "3", name: "Silver Oxidized Necklace", price: 85.00, image: "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?auto=format&fit=crop&q=80&w=800", category: "Jewelry", stock: 2 },
};

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addItemToCart = useCartStore(state => state.addItem);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // @ts-ignore
  const wishlistProducts = items.map(id => productDB[id] || { id, name: "Artisan Product", price: 99.00, image: "https://images.unsplash.com/photo-1582216503940-5a3962d8095b?auto=format&fit=crop&q=80&w=800", category: "Handicraft", stock: 5 });

  const handleMoveToCart = (product: any) => {
    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    removeItem(product.id);
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-serif text-[#2d3748] mb-8">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-[#2d3748] mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">Save your favorite items here while you decide.</p>
            <Link 
              href="/shop"
              className="bg-[#e07a5f] hover:bg-[#d06b50] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md"
            >
              Discover Treasures
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="relative aspect-[4/5] bg-gray-100">
                  <Image 
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button 
                    onClick={() => removeItem(product.id)}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 p-2 rounded-full shadow-sm transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.category}</span>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif font-bold text-xl text-[#2d3748] mb-2 line-clamp-1 hover:text-[#e07a5f] transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-[#f4a261] font-bold text-lg mb-6">${product.price.toFixed(2)}</p>
                  
                  <button 
                    onClick={() => handleMoveToCart(product)}
                    className="mt-auto w-full bg-[#2d3748] hover:bg-black text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
