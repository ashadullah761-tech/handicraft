"use client";

import Image from "next/image";
import { useState, useEffect, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Minus, Plus, Heart, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const allProducts = [
  { id: `diwan-1`, name: `Premium Wooden Diwan`, price: 299.00, image: `/images/top-1.jpg?v=2`, category: "Wooden Diwan", description: "Experience royal comfort with our handcrafted premium wooden diwan. Carved from high-quality solid wood.", material: "Solid Teak Wood", stock: 5 },
  { id: `diwan-2`, name: `Carved Wooden Diwan`, price: 349.00, image: `/images/top-2.jpg?v=2`, category: "Wooden Diwan", description: "Elegant carved wooden diwan showcasing traditional craftsmanship and unparalleled durability.", material: "Solid Teak Wood", stock: 4 },
  { id: `diwan-3`, name: `Royal Pattern Diwan`, price: 399.00, image: `/images/top-3.jpg?v=2`, category: "Wooden Diwan", description: "A luxurious diwan featuring intricate royal patterns. Perfect for a majestic living room.", material: "Rosewood", stock: 2 },
  { id: `diwan-4`, name: `Classic Traditional Diwan`, price: 289.00, image: `/images/top-4.jpg?v=2`, category: "Wooden Diwan", description: "A timeless traditional diwan that blends heritage design with modern comfort.", material: "Sheesham Wood", stock: 6 },
  { id: `swing-1`, name: `Royal Wooden Swing`, price: 499.00, image: `/images/swing-1.jpg?v=2`, category: "Wooden Swing", description: "Traditional Indian Jhula meticulously carved by master artisans. Perfect for your living room or veranda.", material: "Rosewood", stock: 2 },
  { id: `swing-2`, name: `Carved Indoor Swing`, price: 549.00, image: `/images/swing-2.jpg?v=2`, category: "Wooden Swing", description: "A majestic indoor swing with detailed floral carvings to elevate your home decor.", material: "Teak Wood", stock: 3 },
  { id: `swing-3`, name: `Premium Teak Swing`, price: 699.00, image: `/images/swing-3.jpg?v=2`, category: "Wooden Swing", description: "A heavy-duty premium teak wood swing with brass chains. Built to last generations.", material: "Teak Wood", stock: 1 },
  { id: `swing-4`, name: `Antique Pattern Jhula`, price: 599.00, image: `/images/swing-4.jpg?v=2`, category: "Wooden Swing", description: "An antique style wooden jhula featuring rich dark polish and classic patterns.", material: "Sheesham Wood", stock: 2 },
  { id: `coffee-1`, name: `Carved Rectangle Table`, price: 189.00, image: `/images/coffee-1.jpg?v=2`, category: "Coffee Table", description: "A beautifully carved rectangular coffee table with intricate traditional designs.", material: "Mango Wood", stock: 4 },
  { id: `coffee-2`, name: `Square Carved Table`, price: 149.00, image: `/images/coffee-2.jpg?v=2`, category: "Coffee Table", description: "A compact square table featuring detailed floral carvings. Perfect as a center table.", material: "Sheesham Wood", stock: 8 },
  { id: `coffee-3`, name: `Classic Long Table`, price: 129.00, image: `/images/coffee-3.jpg?v=2`, category: "Coffee Table", description: "A versatile long wooden table suitable for your living room or study.", material: "Teak Wood", stock: 6 },
  { id: `coffee-4`, name: `Round Pedestal Table`, price: 159.00, image: `/images/coffee-4.jpg?v=2`, category: "Coffee Table", description: "A classic round table with an elegant pedestal base, perfect for cozy corners.", material: "Rosewood", stock: 3 },
  { id: `coffee-5`, name: `Carved Glass Top Table Base`, price: 179.00, image: `/images/coffee-5.jpg?v=2`, category: "Coffee Table", description: "An intricately carved table base designed to support a glass top, featuring traditional craftsmanship.", material: "Mango Wood", stock: 5 },
  { id: `chair-1`, name: `Comfort Cushioned Chair`, price: 189.00, image: `/images/chair-1.jpg?v=2`, category: "Wooden Chair", description: "Elegant cushioned wooden chair offering premium comfort and a timeless design.", material: "Solid Wood", stock: 10 },
  { id: `chair-2`, name: `Classic Slatted Chair`, price: 179.00, image: `/images/chair-2.jpg?v=2`, category: "Wooden Chair", description: "A traditional wooden chair with a classic slatted back design for versatile use.", material: "Sheesham Wood", stock: 5 },
  { id: `chair-3`, name: `Wooden Wheel Rocking Chair`, price: 219.00, image: `/images/chair-3.jpg?v=2`, category: "Wooden Chair", description: "A unique rocking chair featuring a cartwheel design on the sides. Perfectly handcrafted.", material: "Teak Wood", stock: 3 },
  { id: `chair-4`, name: `Carved Wheel Rocking Chair`, price: 239.00, image: `/images/chair-4.jpg?v=2`, category: "Wooden Chair", description: "Premium wheel rocking chair with detailed carvings on the backrest. A true masterpiece.", material: "Rosewood", stock: 2 },
];

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
      // 1. Check static products first
      const staticProduct = allProducts.find(p => p.id === productId);
      if (staticProduct) {
        setProduct(staticProduct);
        setLoading(false);
        return;
      }
      
      // 2. If not found, fetch from Supabase
      const supabase = createClient();
      const { data } = await supabase.from('products').select('*').eq('id', productId).single();
      
      if (data) {
        setProduct({
          id: data.id,
          name: data.name,
          price: data.price || 0,
          image: data.image_url,
          category: data.category,
          description: "Premium handcrafted item by Marudhar Export.",
          material: "Premium Wood",
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
