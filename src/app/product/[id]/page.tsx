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
  // Wooden Furniture
  { id: 'wf-1', name: 'Solid Teak Wood Dining Chair', price: 299.00, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture', description: 'Experience royal comfort with our handcrafted premium wooden chair. Carved from high-quality solid wood.', material: 'Solid Teak Wood', stock: 5 },
  { id: 'wf-2', name: 'Premium Oak Cabinet', price: 499.00, image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture', description: 'Store your treasures in this exquisitely carved oak cabinet. A perfect blend of utility and heritage.', material: 'Oak Wood', stock: 2 },
  { id: 'wf-3', name: 'Minimalist Wooden Bed Frame', price: 149.00, image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture', description: 'A sleek, modern wooden bed frame built to last generations.', material: 'Mango Wood', stock: 8 },
  { id: 'wf-4', name: 'Classic Wooden Coffee Table', price: 89.00, image: 'https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&q=80&w=800', category: 'Wooden Furniture', description: 'Center your living space with this beautiful, solid wood coffee table.', material: 'Sheesham Wood', stock: 12 },
  
  // Handcrafted Decor
  { id: 'hd-1', name: 'Hand-painted Ceramic Vases', price: 99.00, image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor', description: 'Beautifully hand-painted vases to elevate your interior design.', material: 'Ceramic', stock: 15 },
  { id: 'hd-2', name: 'Artisan Wall Mirror', price: 120.00, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor', description: 'A stunning wall mirror featuring an intricately carved wooden frame.', material: 'Glass & Wood', stock: 7 },
  { id: 'hd-3', name: 'Rustic Terracotta Pottery', price: 45.00, image: 'https://images.unsplash.com/photo-1581683705068-ca8f49fc7f45?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor', description: 'Traditional terracotta pottery handmade by rural artisans.', material: 'Terracotta', stock: 25 },
  { id: 'hd-4', name: 'Carved Wooden Bowls', price: 65.00, image: 'https://images.unsplash.com/photo-1584368686622-6b9914902db2?auto=format&fit=crop&q=80&w=800', category: 'Handcrafted Decor', description: 'Perfect for dining or decoration, these bowls are carved from single blocks of wood.', material: 'Mango Wood', stock: 10 },

  // Custom Furniture
  { id: 'cf-1', name: 'Bespoke Lounge Chair', price: 350.00, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture', description: 'A custom-designed lounge chair crafted to your exact specifications.', material: 'Teak & Fabric', stock: 0 },
  { id: 'cf-2', name: 'Custom Dining Table Setup', price: 850.00, image: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture', description: 'A grand dining setup, custom built for large family gatherings.', material: 'Rosewood', stock: 0 },
  { id: 'cf-3', name: 'Tailored Leather Sofa', price: 1200.00, image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture', description: 'Premium leather sofa designed for ultimate comfort and style.', material: 'Leather & Wood', stock: 0 },
  { id: 'cf-4', name: 'Personalized Writing Desk', price: 450.00, image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&q=80&w=800', category: 'Custom Furniture', description: 'A quiet, inspiring workspace custom-fitted for your study.', material: 'Oak Wood', stock: 0 },

  // Antique Furniture
  { id: 'af-1', name: 'Vintage Drawer Cabinet', price: 600.00, image: 'https://images.unsplash.com/photo-1554295405-abb8fd54f153?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture', description: 'An authentic vintage piece restored to its former glory.', material: 'Reclaimed Wood', stock: 1 },
  { id: 'af-2', name: 'Victorian Era Chair', price: 400.00, image: 'https://images.unsplash.com/photo-1615800098779-1be32e60cccc?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture', description: 'A genuine Victorian-era chair with original upholstery.', material: 'Mahogany', stock: 1 },
  { id: 'af-3', name: 'Heritage Wooden Chest', price: 550.00, image: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture', description: 'A heavy, intricately carved chest from the 19th century.', material: 'Teak Wood', stock: 1 },
  { id: 'af-4', name: 'Classic Antique Bookshelf', price: 750.00, image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800', category: 'Antique Furniture', description: 'Showcase your library in this massive antique bookshelf.', material: 'Rosewood', stock: 1 },
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
