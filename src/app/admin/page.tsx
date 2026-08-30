'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { getAllInquiries, CustomerInquiry } from '@/utils/inquiryService'
import { Package, TrendingUp, Users, Star, MessageSquare, Phone, MapPin, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    categories: 0,
    totalReviews: 0,
    totalInquiries: 0,
  })
  const [recentReviews, setRecentReviews] = useState<any[]>([])
  const [recentInquiries, setRecentInquiries] = useState<CustomerInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchStats() {
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      const { data: categories } = await supabase
        .from('products')
        .select('category')
      
      const { count: reviewCount, data: reviewsData } = await supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })

      const inquiriesData = await getAllInquiries()

      const uniqueCategories = new Set(categories?.map(c => c.category)).size

      setStats({
        totalProducts: productCount || 0,
        categories: uniqueCategories || 0,
        totalReviews: (reviewCount || 0) + 4, // 4 seed reviews + db reviews
        totalInquiries: inquiriesData.length,
      })

      if (reviewsData && reviewsData.length > 0) {
        setRecentReviews(reviewsData.slice(0, 5))
      }
      setRecentInquiries(inquiriesData.slice(0, 5))
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

  const statCards = [
    { name: 'Customer Inquiries', value: `${stats.totalInquiries} Messages`, icon: MessageSquare, color: 'bg-green-600', link: '/admin/inquiries' },
    { name: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500', link: '/admin/products' },
    { name: 'Categories', value: stats.categories, icon: TrendingUp, color: 'bg-indigo-500', link: '/admin/products' },
    { name: 'Customer Reviews', value: `${stats.totalReviews} Reviews`, icon: Star, color: 'bg-amber-500', link: '/reviews' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back to your Marudhar Export store admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 flex items-center">
              <div className={`${stat.color} p-4 rounded-lg text-white mr-4 shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                )}
              </div>
            </div>
            {stat.link && (
              <Link href={stat.link} className="block px-6 py-2 bg-gray-50 text-xs font-semibold text-gray-600 hover:text-blue-600 border-t border-gray-100">
                View details →
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      {/* Customer Inquiries & Messages Section in Admin */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-600" /> Recent Customer Messages & Inquiries
          </h2>
          <Link
            href="/admin/inquiries"
            className="text-xs font-bold text-[#e07a5f] hover:underline flex items-center gap-1"
          >
            View All Messages <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg">
            No customer inquiries yet. Any message sent from website or contact form will appear here automatically.
          </p>
        ) : (
          <div className="space-y-3">
            {recentInquiries.map((inq, idx) => (
              <div key={inq.id || idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{inq.name}</span>
                    {inq.subject && (
                      <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                        {inq.subject}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium line-clamp-2">&ldquo;{inq.message}&rdquo;</p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  {inq.phone && (
                    <>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20Marudhar%20Export!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <a
                        href={`tel:${inq.phone}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-white text-gray-800 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-gray-600" /> Call
                      </a>
                    </>
                  )}
                  {inq.email && (
                    <a
                      href={`mailto:${inq.email}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Reviews Section in Admin */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500" /> Recent Customer Reviews & Feedback
          </h2>
          <a
            href="/reviews"
            target="_blank"
            className="text-xs font-bold text-[#e07a5f] hover:underline"
          >
            View Live Reviews Page ↗
          </a>
        </div>

        {recentReviews.length === 0 ? (
          <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-lg">
            No custom reviews submitted via web form yet. Default customer reviews are currently active on site.
          </p>
        ) : (
          <div className="space-y-3">
            {recentReviews.map((rev) => (
              <div key={rev.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{rev.name}</span>
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-bold">
                      {rev.rating} ★
                    </span>
                    {rev.city && <span className="text-xs text-gray-500">({rev.city})</span>}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">&ldquo;{rev.comment}&rdquo;</p>
                </div>
                <div className="shrink-0 text-xs font-mono text-gray-700 bg-white px-3 py-1.5 rounded border border-gray-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-green-600" />
                  {rev.phone}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/inquiries" className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-800 rounded-lg font-medium hover:bg-green-100 transition-colors">
            <MessageSquare className="w-5 h-5 text-green-600" />
            Customer Messages
          </Link>
          <a href="/admin/products/new" className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors">
            <Package className="w-5 h-5" />
            Add New Product
          </a>
          <a href="/admin/products" className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            View All Products
          </a>
          <a href="/reviews" className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-50 text-amber-800 rounded-lg font-medium hover:bg-amber-100 transition-colors">
            <Star className="w-5 h-5 text-amber-500" />
            Customer Reviews
          </a>
        </div>
      </div>
    </div>
  )
}
