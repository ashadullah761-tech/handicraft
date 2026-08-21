'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Package, TrendingUp, Users, Star, MessageSquare, Phone, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    categories: 0,
    totalReviews: 0,
  })
  const [recentReviews, setRecentReviews] = useState<any[]>([])
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

      const uniqueCategories = new Set(categories?.map(c => c.category)).size

      setStats({
        totalProducts: productCount || 0,
        categories: uniqueCategories || 0,
        totalReviews: (reviewCount || 0) + 4, // 4 seed reviews + db reviews
      })

      if (reviewsData && reviewsData.length > 0) {
        setRecentReviews(reviewsData)
      }
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

  const statCards = [
    { name: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { name: 'Categories', value: stats.categories, icon: TrendingUp, color: 'bg-indigo-500' },
    { name: 'Customer Reviews', value: `${stats.totalReviews} Reviews`, icon: Star, color: 'bg-amber-500' },
    { name: 'Total Visits', value: 'Check Analytics', icon: Users, color: 'bg-emerald-500' },
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
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                {loading && stat.name !== 'Total Visits' && stat.name !== 'Customer Reviews' ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : stat.name === 'Total Visits' ? (
                  <a 
                    href="https://analytics.google.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-bold rounded border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    {stat.value} ↗
                  </a>
                ) : (
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Customer Reviews Section in Admin */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" /> Recent Customer Reviews & Feedback
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
