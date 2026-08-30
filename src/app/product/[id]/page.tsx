"use client";

import Image from "next/image";
import { useState, useEffect, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Minus, Plus, Heart, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [quantity, setQuantity] = useState(1);
  const addItemToCart = useCartStore(state => state.addItem);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const supabase = createClient();
      const { data } = await supabase.from('products').select('*').eq('id', productId).single();
      
      if (data) {
        setProduct({
          id: data.id,
          name: data.name,
          price: data.price || 0,
          image: data.image_url,
          category: data.category,
          description: data.description || "Premium handcrafted item by Marudhar Export.",
          material: data.material || "Premium Wood",
          size: data.size || "Standard Size",
          color: data.color || "Natural Teak Finish",
          stock: 1
        });
      }
      setLoading(false);
    }
    
    fetchProduct();
  }, [productId]);
  
  const isWishlisted = product ? wishlistItems.includes(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
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
    if (!product) return;
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product.id);
  };

  if (loading) return <div className="min-h-screen py-32 text-center text-xl font-bold text-gray-500">Loading Product...</div>;
  if (!product) return <div className="min-h-screen py-32 text-center text-xl font-bold text-gray-500">Product not found.</div>;

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#e07a5f] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200 shadow-lg border border-gray-100 p-8">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                unoptimized={true}
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
              

              
              {product.size && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-24">Dimensions:</span>
                  <span className="text-[#2d3748] font-medium">{product.size}</span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 py-8 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <a 
                  href={`https://api.whatsapp.com/send?phone=917877609451&text=${encodeURIComponent(`Hello Marudhar Export (Durg Singh),\n\nI am interested in this product:\n*Product:* ${product.name}\n*Material:* ${product.material || "Solid Wood"}\n*Category:* ${product.category}\n\nPlease share price, custom size availability, and delivery details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] hover:bg-[#1ebd5c] text-white h-14 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
                >
                  Enquire on WhatsApp
                </a>

                <button 
                  onClick={toggleWishlist}
                  className={`h-14 w-14 rounded-full flex items-center justify-center border-2 transition-all ${
                    isWishlisted 
                    ? "border-red-500 bg-red-50 text-red-500" 
                    : "border-gray-200 bg-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500"
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
