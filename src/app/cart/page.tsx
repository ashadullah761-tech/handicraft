"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, MessageCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { saveInquiry, buildWhatsAppLink } from "@/utils/inquiryService";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleProceedCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    setSubmitting(true);

    const itemsSummary = items
      .map((i, idx) => `${idx + 1}. *${i.name}* x ${i.quantity} (₹${(i.price * i.quantity).toFixed(2)})`)
      .join("\n");

    const message = `*NEW ORDER INQUIRY - Marudhar Export*\n\n*Customer Details:*\n• Name: ${customerName.trim()}\n• Phone: ${customerPhone.trim()}\n• City: ${customerCity.trim() || "Not specified"}\n\n*Ordered Items:*\n${itemsSummary}\n\n*Total Amount:* ₹${getTotal().toFixed(2)}\n\nPlease confirm availability and delivery timeframe.`;

    const whatsappUrl = buildWhatsAppLink(message);
    setLastWhatsAppUrl(whatsappUrl);

    // Save to Database / Admin Store
    await saveInquiry({
      name: customerName.trim(),
      phone: customerPhone.trim(),
      subject: `Order Inquiry: ${items.length} item(s)`,
      message: message,
      product_name: items.map(i => i.name).join(", "),
      source: "cart_checkout",
    });

    // Open WhatsApp
    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Popup blocked:", err);
    }

    setSubmitting(false);
    setOrderSent(true);
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold font-serif text-[#2d3748] mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-gray-200 rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-[#2d3748] mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">Looks like you haven&apos;t added any beautiful handcrafted items to your cart yet.</p>
            <Link 
              href="/shop"
              className="bg-[#e07a5f] hover:bg-[#d06b50] text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-200 p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <Link href={`/product/${item.id}`} className="font-bold text-xl text-[#2d3748] hover:text-[#e07a5f] transition-colors line-clamp-1 mb-2">
                      {item.name}
                    </Link>
                    <p className="text-[#81b29a] font-semibold mb-4">₹{item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-6">
                      <div className="flex items-center border border-gray-200 rounded-full bg-gray-50 h-10 px-2 w-28 justify-between">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-[#e07a5f] p-1 cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-[#e07a5f] p-1 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-xl text-[#2d3748]">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-28">
              <h2 className="text-2xl font-bold font-serif text-[#2d3748] mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#2d3748]">₹{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-[#2d3748]">Calculated at confirmation</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-[#2d3748]">Total</span>
                  <span className="font-bold text-2xl text-[#f4a261]">₹{getTotal().toFixed(2)}</span>
                </div>
              </div>

              {!isCheckoutOpen ? (
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-[#25D366] hover:bg-[#1ebd5c] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Order via WhatsApp <MessageCircle className="w-5 h-5" />
                </button>
              ) : orderSent ? (
                <div className="bg-white p-6 rounded-2xl border border-green-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
                  <h3 className="font-bold text-gray-900">Order Inquiry Sent!</h3>
                  <p className="text-xs text-gray-600">Aapka order record ho gaya hai.</p>
                  {lastWhatsAppUrl && (
                    <a
                      href={lastWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-lg shadow"
                    >
                      Open WhatsApp Again
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setOrderSent(false);
                      setIsCheckoutOpen(false);
                    }}
                    className="text-xs text-gray-500 underline"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProceedCheckout} className="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
                  <h3 className="font-bold text-gray-800 text-sm border-b pb-2">Enter Contact Details for Order:</h3>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile / WhatsApp No. *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">City / State</label>
                    <input
                      type="text"
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="e.g. Jodhpur, Rajasthan"
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#25D366] hover:bg-[#1ebd5c] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow cursor-pointer text-sm"
                  >
                    {submitting ? "Sending..." : "Send Order to WhatsApp"} <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full text-center text-xs text-gray-500 hover:text-gray-700 py-1"
                  >
                    Cancel
                  </button>
                </form>
              )}
              
              <div className="mt-6 text-center">
                <Link href="/shop" className="text-[#e07a5f] font-medium hover:underline text-sm">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
