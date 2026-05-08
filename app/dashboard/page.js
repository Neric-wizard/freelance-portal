'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import CountUp from 'react-countup'
import AddClientForm from './AddClientForm'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [clients, setClients] = useState([])
  const router = useRouter()

  const notificationRef = useRef(null)
  const userMenuRef = useRef(null)

  // Fetch clients from Supabase - DEFINED FIRST
  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setClients(data)
    }
  }

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        await fetchClients()
        setLoading(false)
        toast.success(`Welcome back, ${user.email?.split('@')[0]}`, {
          style: { background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }
        })
      }
    }
    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Logged out successfully')
    router.push('/login')
  }

  // Color map for dynamic Tailwind classes
  const colorMap = {
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'hover:border-blue-500/30' },
    green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'hover:border-green-500/30' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'hover:border-purple-500/30' }
  }

  // Context-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const stats = [
    { 
      title: 'Total Clients', 
      value: clients.length.toString(),
      trend: '+0%', 
      trendUp: true,
      icon: 'users',
      color: 'blue'
    },
    { 
      title: 'Active Invoices', 
      value: '0', 
      trend: 'No data', 
      trendUp: null,
      icon: 'invoices',
      color: 'green'
    },
    { 
      title: 'Revenue (MTD)', 
      value: '0', 
      trend: '$0 vs last month', 
      trendUp: false,
      icon: 'revenue',
      color: 'purple'
    }
  ]

  const getIcon = (icon) => {
    switch(icon) {
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      case 'invoices':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      case 'revenue':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-white/10 rounded-xl w-48"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-white/10 rounded-2xl"></div>
              <div className="h-32 bg-white/10 rounded-2xl"></div>
              <div className="h-32 bg-white/10 rounded-2xl"></div>
            </div>
            <div className="h-64 bg-white/10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent)]">
      <Toaster position="top-right" toastOptions={{ className: '!bg-white/10 !backdrop-blur-lg !border !border-white/20 !text-white' }} />
      
      {/* Top Navigation */}
      <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">FP</span>
              </div>
              <span className="font-semibold text-white hidden sm:block">Freelance Portal</span>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 hover:bg-white/10 transition">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none w-40"
                />
                <span className="text-xs text-gray-500 hidden lg:block">⌘K</span>
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-xl hover:bg-white/10 transition"
                >
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl z-30">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-white font-medium">Notifications</p>
                    </div>
                    <div className="p-4 text-center text-gray-400 text-sm">
                      No new notifications
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/10 transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm text-gray-300">
                    {user?.email?.split('@')[0]}
                  </span>
                </button>
                {showUserMenu && (
                  <div className="absolute left-0 mt-2 w-56 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl z-50"
                       style={{ left: 'auto', right: 0 }}
                  >
                    <div className="p-3 border-b border-white/10">
                      <p className="text-white text-sm font-medium">{user?.email}</p>
                      <p className="text-gray-400 text-xs">Freelance Plan</p>
                    </div>
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg transition">
                        Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-lg transition">
                        Settings
                      </button>
                      <hr className="my-1 border-white/10" />
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/10 rounded-lg transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero / Greeting Section with Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {getGreeting()}, {user?.email?.split('@')[0]}
              </h1>
              <p className="text-gray-400 mt-1">
                Here's what's happening with your freelance business
              </p>
            </div>
            
            {/* Quick Actions Bar */}
            <div className="flex gap-3">
              <button 
                onClick={() => toast.info('Invoice creation coming soon')}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 px-4 py-2.5 rounded-xl text-sm font-medium transition hover:scale-[1.02]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                New Invoice
              </button>
              <button 
                onClick={() => toast.info('Client addition coming soon')}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg hover:shadow-purple-500/30 transition hover:scale-[1.02]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Add Client
              </button>
            </div>
          </div>
        </motion.div>

        {/* Add Client Form */}
        <AddClientForm onClientAdded={fetchClients} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] transition-all cursor-pointer ${colorMap[stat.color].border}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${colorMap[stat.color].bg} rounded-xl flex items-center justify-center`}>
                  <div className={colorMap[stat.color].text}>
                    {getIcon(stat.icon)}
                  </div>
                </div>
                <span className="text-3xl font-bold text-white">
                  <CountUp end={parseInt(stat.value) || 0} duration={1.5} separator="," prefix={stat.title === 'Revenue (MTD)' ? '$' : ''} />
                </span>
              </div>
              <h3 className="text-gray-300 font-medium">{stat.title}</h3>
              {stat.trend && (
                <p className={`text-xs mt-2 ${stat.trendUp === null ? 'text-gray-500' : stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Clients List Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Your Clients</h3>
          {clients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No clients yet</p>
              <p className="text-gray-500 text-sm mt-1">Add your first client using the form above</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clients.map((client) => (
                <div key={client.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <div>
                    <p className="text-white font-medium">{client.name}</p>
                    <p className="text-gray-400 text-sm">{client.email}</p>
                  </div>
                  {client.company && (
                    <span className="text-gray-500 text-sm">{client.company}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Invoices Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Recent Invoices</h3>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition">View all →</button>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-400">No invoices yet</p>
                <button 
                  onClick={() => toast.info('Create your first invoice soon')}
                  className="mt-4 text-sm text-purple-400 hover:text-purple-300 transition"
                >
                  Create your first invoice →
                </button>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity Feed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">No activity yet</p>
                <p className="text-gray-500 text-sm mt-1">Add a client or create an invoice</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Getting Started Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Ready to grow your freelance business?</h3>
          <p className="text-gray-300 mb-4">Add your first client and create an invoice to get started</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => toast.info('Client addition coming soon')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:opacity-90 transition shadow-lg"
            >
              + Add Client
            </button>
            <button 
              onClick={() => toast.info('Tutorial coming soon')}
              className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-white/15 transition"
            >
              View Tutorial
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12 py-6 text-center text-gray-500 text-sm">
        <p>© 2026 Freelance Portal — Built in public with Next.js + Supabase</p>
      </footer>
    </div>
  )
}