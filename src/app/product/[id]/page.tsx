"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Minus, Plus, Heart, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

const productDB = {
  "1": { id: "1", name: "Terracotta Vase", price: 45.00, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800", category: "Pottery", description: "Hand-thrown terracotta vase crafted by master potters in Rajasthan. Perfect for dried flowers or as a standalone piece.", material: "Natural Clay", stock: 12 },
  // Adding placeholder fallback for other IDs
};

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  // @ts-ignore
  const product = productDB[productId] || { id: productId, name: "Artisan Product", price: 99.00, image: "https://images.unsplash.com/photo-1582216503940-5a3962d8095b?auto=format&fit=crop&q=80&w=800", category: "Handicraft", description: "Beautifully handcrafted item.", material: "Mixed", stock: 5 };
  
  const [quantity, setQuantity] = useState(1);
  const addItemToCart = useCartStore(state => state.addItem);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  
  const isWishlisted = wishlistItems.includes(product.id);

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    // Can add a toast here
  };

  const toggleWishlist = () => {
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product.id);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#e07a5f] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg border border-gray-100">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-[#81b29a] font-semibold text-sm uppercase tracking-wider mb-2">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#2d3748] mb-6">{product.name}</h1>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-24">Material:</span>
                <span className="text-[#2d3748] font-medium">{product.material}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-24">Availability:</span>
                <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 py-8 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded-full bg-white h-14 px-4 w-36 justify-between">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-[#e07a5f] transition-colors p-2"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="text-gray-500 hover:text-[#e07a5f] transition-colors p-2"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-[#e07a5f] hover:bg-[#d06b50] text-white h-14 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>

                <button 
                  onClick={toggleWishlist}
                  className={`h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all ${
                    isWishlisted 
                    ? "border-red-500 bg-red-50 text-red-500" 
                    : "border-gray-200 bg-white text-gray-400 hover:border-red-200 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#fdfbf7] p-6 rounded-xl space-y-4 border border-[#e07a5f]/10">
              <div className="flex items-center gap-4 text-gray-700">
                <div className="bg-white p-2 rounded-full shadow-sm"><Truck className="w-5 h-5 text-[#81b29a]" /></div>
                <span className="font-medium">Free worldwide shipping on orders over $150</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <div className="bg-white p-2 rounded-full shadow-sm"><ShieldCheck className="w-5 h-5 text-[#81b29a]" /></div>
                <span className="font-medium">Authenticity guaranteed. Fair trade certified.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
