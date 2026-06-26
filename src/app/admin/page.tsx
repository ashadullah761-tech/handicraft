'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Package, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    categories: 0,
  })
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
      
      const uniqueCategories = new Set(categories?.map(c => c.category)).size

      setStats({
        totalProducts: productCount || 0,
        categories: uniqueCategories || 0,
      })
      setLoading(false)
    }

    fetchStats()
  }, [supabase])

  const statCards = [
    { name: 'Total Products', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { name: 'Categories', value: stats.categories, icon: TrendingUp, color: 'bg-indigo-500' },
    { name: 'Total Visits', value: 'Check Analytics', icon: Users, color: 'bg-emerald-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome back to your store admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 flex items-center">
              <div className={`${stat.color} p-4 rounded-lg text-white mr-6`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                {loading && stat.name !== 'Total Visits' ? (
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
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
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
        </div>
      </div>
    </div>
  )
}
