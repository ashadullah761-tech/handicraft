"use client";

import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Marudhar Export (Durg Singh),\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`;
    const whatsappUrl = `https://wa.me/917877609451?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
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
                <p className="text-gray-600">Phone: +91 7877609451<br/>WhatsApp: +91 7877609451</p>
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
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-200 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold font-serif text-[#2d3748] mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p>Your inquiry has been sent directly to Durg Singh via WhatsApp. We will reply shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject (e.g., Bulk Order Inquiry)</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e07a5f]/50 focus:border-[#e07a5f] transition-all bg-gray-50"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
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
                    className="bg-[#25D366] hover:bg-[#1ebd5c] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full md:w-auto"
                  >
                    Send to WhatsApp <MessageCircle className="w-5 h-5" />
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
