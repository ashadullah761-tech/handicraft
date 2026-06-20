"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Minus, Plus, Heart, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";

const allProducts = [
  ...[1, 2, 3, 4].map(num => ({ id: `diwan-${num}`, name: `Premium Wooden Diwan 0${num}`, price: 299.00, image: `/images/top-${num}.jpg`, category: "Wooden Diwan", description: "Experience royal comfort with our handcrafted premium wooden diwan. Carved from high-quality solid wood.", material: "Solid Teak Wood", stock: 5 })),
  ...[1, 2, 3, 4].map(num => ({ id: `swing-${num}`, name: `Royal Wooden Swing 0${num}`, price: 499.00, image: `/images/swing-${num}.jpg`, category: "Wooden Swing", description: "Traditional Indian Jhula meticulously carved by master artisans. Perfect for your living room or veranda.", material: "Rosewood", stock: 2 })),
  ...[1, 2, 3, 4, 5].map(num => ({ id: `coffee-${num}`, name: `Elegant Coffee Table 0${num}`, price: 149.00, image: `/images/coffee-${num}.jpg`, category: "Coffee Table", description: "A perfect blend of modern design and traditional craftsmanship. Features a smooth finish and durable build.", material: "Mango Wood", stock: 8 })),
  ...[1, 2, 3, 4].map(num => ({ id: `chair-${num}`, name: `Classic Wooden Chair 0${num}`, price: 89.00, image: `/images/chair-${num}.jpg`, category: "Wooden Chair", description: "Ergonomically designed solid wood chair with intricate backrest carving. Ensures both style and comfort.", material: "Sheesham Wood", stock: 12 })),
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const product = allProducts.find(p => p.id === productId) || { id: productId, name: "Artisan Product", price: 99.00, image: "https://images.unsplash.com/photo-1582216503940-5a3962d8095b?auto=format&fit=crop&q=80&w=800", category: "Handicraft", description: "Beautifully handcrafted item.", material: "Mixed", stock: 5 };
  
  const [quantity, setQuantity] = useState(1);
  const addItemToCart = useCartStore(state => state.addItem);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  
  const isWishlisted = wishlistItems.includes(product.id);

  const router = useRouter();

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    router.push('/cart');
  };

  const toggleWishlist = () => {
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product.id);
  };

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-12">
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
            </div>

            <div className="border-t border-gray-200 py-8 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link 
                  href="/contact"
                  className="flex-1 bg-[#e07a5f] hover:bg-[#d06b50] text-white h-14 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
                >
                  Enquire Now
                </Link>

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
          </div>
        </div>
      </div>
    </div>
  );
}
