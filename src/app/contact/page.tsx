"use client";

import { Mail, Phone, MapPin, Send, MessageCircle, FileText, CheckCircle2, PhoneCall } from "lucide-react";
import { useState } from "react";
import { saveInquiry, buildWhatsAppLink, OWNER_PHONE, OWNER_PHONE_DISPLAY } from "@/utils/inquiryService";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const formattedText = `Hello Marudhar Export (Durg Singh),\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone || "Not provided"}\n*Email:* ${formData.email || "Not provided"}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`;
    const whatsappUrl = buildWhatsAppLink(formattedText);
    setLastWhatsAppUrl(whatsappUrl);

    // 1. Save to database / Admin store
    await saveInquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      source: "contact_form",
    });

    // 2. Open WhatsApp in new tab
    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Popup blocked or window open error:", err);
    }

    setIsSaving(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-[#e07a5f] font-semibold tracking-wider uppercase text-sm mb-2 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#2d3748] mb-4">Contact Marudhar Export</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">We&apos;d love to hear from you. Whether you have a question about our products, bulk orders, or custom furniture, Durg Singh is ready to help you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-[#e07a5f]/10 p-3 rounded-full text-[#e07a5f]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#2d3748] mb-1">Our Location</h3>
                <p className="text-gray-600">Lawera Kallan<br/>Jodhpur, Rajasthan<br/>India</p>
              </div>
            </div>

            <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-[#e07a5f]/10 p-3 rounded-full text-[#e07a5f]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#2d3748] mb-1">Contact Details</h3>
                <p className="text-gray-600 font-medium text-[#e07a5f] mb-1">Durg Singh</p>
                <p className="text-gray-600">Phone: {OWNER_PHONE_DISPLAY}<br/>WhatsApp: {OWNER_PHONE_DISPLAY}</p>
              </div>
            </div>

            <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-[#e07a5f]/10 p-3 rounded-full text-[#e07a5f]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#2d3748] mb-1">Email Us</h3>
                <p className="text-gray-600">marudharExport9@gmail.com</p>
              </div>
            </div>

            <div className="bg-gray-200 p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-[#e07a5f]/10 p-3 rounded-full text-[#e07a5f]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#2d3748] mb-1">GST Registration</h3>
                <p className="text-gray-600"><strong>GSTIN:</strong> 08OJUPS5124N1ZY</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold font-serif text-[#2d3748] mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-white p-8 rounded-2xl border border-green-200 shadow-sm text-center space-y-5">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Saved & Sent!</h3>
                    <p className="text-gray-600 max-w-md mx-auto text-sm">
                      Aapka message Marudhar Export system mein save ho gaya hai aur Durg Singh ji ko forward kar diya gaya hai.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    {lastWhatsAppUrl && (
                      <a 
                        href={lastWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" /> Open in WhatsApp
                      </a>
                    )}
                    <a
                      href={`tel:+${OWNER_PHONE}`}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#2d3748] hover:bg-black text-white font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-5 h-5" /> Call Direct
                    </a>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button 
                      onClick={handleReset}
                      className="text-[#e07a5f] hover:underline text-sm font-semibold"
                    >
                      ← Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile / WhatsApp No. *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input 
                        type="text" 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                        placeholder="e.g. Bulk Order, Custom Furniture"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50 resize-none"
                      placeholder="Please write your detailed inquiry here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-[#25D366] hover:bg-[#1ebd5c] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-75 cursor-pointer"
                  >
                    {isSaving ? "Saving & Sending..." : "Send to WhatsApp & Store"} <MessageCircle className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
