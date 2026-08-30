'use client'

import { useEffect, useState } from 'react'
import { getAllInquiries, CustomerInquiry } from '@/utils/inquiryService'
import { MessageSquare, Phone, Mail, Calendar, Search, RefreshCw, MessageCircle } from 'lucide-react'

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const loadData = async () => {
    setLoading(true)
    const data = await getAllInquiries()
    setInquiries(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const filtered = inquiries.filter(inq => {
    const q = searchTerm.toLowerCase()
    return (
      inq.name.toLowerCase().includes(q) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.subject && inq.subject.toLowerCase().includes(q)) ||
      inq.message.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Messages & Inquiries</h1>
          <p className="text-gray-600 mt-1">Direct inquiries, contact form messages, and orders from your website visitors.</p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by customer name, phone, email or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500 shadow-sm">
          Loading messages...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center text-gray-500 shadow-sm">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-700 mb-1">No Messages Found</h3>
          <p className="text-sm text-gray-500">
            {searchTerm ? "No messages match your search criteria." : "All incoming customer messages will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq, idx) => (
            <div
              key={inq.id || idx}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-200 transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-base">
                    {inq.name ? inq.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{inq.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {inq.created_at ? new Date(inq.created_at).toLocaleString() : 'Just now'}
                      {inq.source && (
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 font-medium">
                          {inq.source.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {inq.phone && (
                    <>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20Marudhar%20Export!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 font-semibold text-xs rounded-lg border border-green-200 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Reply WhatsApp
                      </a>
                      <a
                        href={`tel:${inq.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold text-xs rounded-lg transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call ({inq.phone})
                      </a>
                    </>
                  )}
                  {inq.email && (
                    <a
                      href={`mailto:${inq.email}?subject=Reply%20from%20Marudhar%20Export`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs rounded-lg border border-blue-200 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </a>
                  )}
                </div>
              </div>

              {inq.subject && (
                <div className="text-sm font-semibold text-[#e07a5f]">
                  Subject: {inq.subject}
                </div>
              )}

              {inq.product_name && (
                <div className="text-xs bg-amber-50 text-amber-900 px-3 py-1.5 rounded-lg inline-block font-medium border border-amber-200">
                  Interested Product: {inq.product_name}
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                {inq.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
