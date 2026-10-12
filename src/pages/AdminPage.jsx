import React, { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  UtensilsCrossed,
  FileText,
  PlusCircle,
  Utensils,
  LogOut,
  RefreshCw,
  Search,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  ChevronDown,
  Trash2,
  Plus,
  Flame,
  Home,
  Menu,
  X,
  ExternalLink,
  Globe,
  Lock,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Crown,
  Sparkles
} from 'lucide-react'

import {
  supabase,
  fetchAllOrdersFromSupabase,
  updateOrderStatusInSupabase,
  deleteOrderFromSupabase
} from '../lib/supabase'

import {
  getAllDishes,
  saveCustomDish,
  deleteCustomDish,
  CATEGORIES,
  PRESET_IMAGES
} from '../data/dishes'

/* Royal Restaurant Logo Crest Watermark */
function ZaiqaRoyalLogoWatermark({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Royal Crest Ring */}
      <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Crown at top */}
      <path d="M44 38 L48 48 L60 42 L72 48 L76 38 L72 52 L48 52 Z" />
      <circle cx="44" cy="36" r="2" />
      <circle cx="60" cy="40" r="2.5" />
      <circle cx="76" cy="36" r="2" />
      {/* Crossed Royal Cutlery */}
      <path d="M42 78 L54 66 M54 66 L50 62 M54 66 L58 70 M54 66 L78 42 M78 42 L80 44 L76 48 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M78 78 L66 54 M66 54 L62 58 M66 54 L70 50 M66 54 L42 42 M42 42 L40 44 L44 48 Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Golden Wok / Flame Base */}
      <path d="M38 74 C38 88 82 88 82 74 C74 80 46 80 38 74 Z" />
      {/* Stars */}
      <polygon points="60,20 62,25 67,25 63,28 65,33 60,30 55,33 57,28 53,25 58,25" />
      <polygon points="28,60 29.5,62.5 32,62.5 30,64 31,66.5 28,65 25,66.5 26,64 24,62.5 26.5,62.5" />
      <polygon points="92,60 93.5,62.5 96,62.5 94,64 95,66.5 92,65 89,66.5 90,64 88,62.5 90.5,62.5" />
    </svg>
  )
}

function AdminLoginView({ onLoginSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    setTimeout(() => {
      if (password.trim() || email.trim() || name.trim()) {
        const sessionData = {
          name: name.trim() || 'Admin',
          email: email.trim() || 'admin@zaiqa.com',
          token: 'zaiqa_admin_' + Date.now(),
          loginTime: new Date().toISOString()
        }

        if (rememberMe) {
          localStorage.setItem('zaiqa_admin_session', JSON.stringify(sessionData))
        } else {
          sessionStorage.setItem('zaiqa_admin_session', JSON.stringify(sessionData))
        }

        onLoginSuccess(sessionData)
      } else {
        setError('Please enter your credentials.')
        setIsLoading(false)
      }
    }, 250)
  }

  const fillQuickCredentials = () => {
    setName('Admin')
    setEmail('admin@zaiqa.com')
    setPassword('admin123')
    setError('')
  }

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4 selection:bg-orange-500 selection:text-white relative">
      {/* Background ambient decorative glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="relative bg-[#0B0F19] border border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden">
          {/* Subtle Card Background Logo Watermark */}
          <div className="absolute -top-10 -right-10 w-56 h-56 text-orange-500/[0.04] pointer-events-none select-none rotate-12">
            <ZaiqaRoyalLogoWatermark />
          </div>

          {/* Brand Header with Logo Behind Zaiqa Lounge */}
          <div className="relative flex flex-col items-center text-center mb-8">
            {/* Watermark Crest Logo directly behind "Zaiqa Lounge" */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-orange-500/15 pointer-events-none select-none z-0 blur-[0.3px]">
              <ZaiqaRoyalLogoWatermark />
            </div>

            {/* Main Glowing Royal Logo Badge */}
            <div className="relative z-10 mb-3.5 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-2xl shadow-orange-500/30 ring-4 ring-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                  <UtensilsCrossed className="w-8 h-8" />
                </div>
                {/* Crown pinned at top */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-md ring-2 ring-[#0B0F19]">
                  <Crown className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Playfair_Display'] drop-shadow-md">
                  Zaiqa Lounge
                </h1>
                <Crown className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-xs text-orange-400/90 font-semibold tracking-wider mt-1 flex items-center justify-center gap-1.5 uppercase">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Executive Admin Console</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Email / Gmail
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zaiqa.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="enter your password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#070B14] border border-gray-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500/20"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Quick Demo Credentials Box */}
            <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-xl flex items-center justify-between">
              <div className="text-[11px] text-gray-400">
                <span className="text-gray-300 font-semibold block">Demo Login:</span>
                <span>admin@zaiqa.com / admin123</span>
              </div>
              <button
                type="button"
                onClick={fillQuickCredentials}
                className="text-[11px] font-bold text-orange-400 hover:text-orange-300 px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 transition-all cursor-pointer"
              >
                Auto Fill
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In to Admin Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* View Customer Website Link */}
          <div className="mt-6 pt-5 border-t border-gray-800/80 text-center">
            <Link
              to="/"
              className="text-xs text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-2 hover:underline cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>View Customer Website</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminPage() {
  const navigate = useNavigate()

  // Authentication session state
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem('zaiqa_admin_session') || sessionStorage.getItem('zaiqa_admin_session')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  // Active view: 'orders' | 'add-dish' | 'menu-items'
  const [activeTab, setActiveTab] = useState('orders')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Orders state
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All')

  const [searchQuery, setSearchQuery] = useState('')
  const [openStatusDropdownId, setOpenStatusDropdownId] = useState(null)

  // Feedback toast
  const [toastMessage, setToastMessage] = useState('')

  // Menu items state
  const [dishesList, setDishesList] = useState([])
  const [dishSearch, setDishSearch] = useState('')

  // New Dish Form State
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'BBQ & Grills',
    price: '',
    prepTime: '20 mins',
    description: '',
    tags: 'Chef Special',
    image: PRESET_IMAGES[0].url,
    isSpicy: false,
    isBestseller: true,
  })
  const [addingDish, setAddingDish] = useState(false)

  // Show Toast helper
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  // Load orders strictly from Supabase (Zero mock localStorage orders)
  const loadOrders = async () => {
    setLoadingOrders(true)

    try {
      // Fetch live orders directly from Supabase
      const sbResult = await fetchAllOrdersFromSupabase()

      if (sbResult.success && Array.isArray(sbResult.data)) {
        // Map Supabase rows to consistent order structure
        const mappedSbOrders = sbResult.data.map((row) => {
          let parsedItems = []
          if (Array.isArray(row.items) && row.items.length > 0) {
            parsedItems = row.items
          } else if (typeof row.items === 'string') {
            try {
              parsedItems = JSON.parse(row.items)
            } catch {
              parsedItems = []
            }
          }

          // If no items parsed, build from dishes string
          if (parsedItems.length === 0 && row.dishes) {
            parsedItems = [{ name: row.dishes, quantity: 1, price: row.total_amount }]
          }

          const refId = row.notes ? row.notes.split(' ')[0] : `loc-${row.id}`

          return {
            referenceId: refId,
            orderId: String(row.id),
            supabaseId: row.id,
            customerName: row.customer_name || 'Customer',
            phone: row.phone || 'N/A',
            address: row.address || 'Address provided',
            items: parsedItems,
            totalAmount: Number(row.total_amount) || 0,
            status: row.status || 'Pending',
            notes: row.notes || '',
            timestamp: row.created_at ? new Date(row.created_at).toLocaleString() : 'Recent',
            rawCreatedAt: row.created_at || new Date().toISOString(),
          }
        })

        setOrders(mappedSbOrders)
      } else {
        setOrders([])
      }
    } catch (err) {
      console.warn('Orders fetch note:', err)
      setOrders([])
    } finally {
      setLoadingOrders(false)
    }
  }

  // Load menu dishes
  const loadDishes = () => {
    setDishesList(getAllDishes())
  }

  // Refresh entire dashboard (Orders + Dishes + Stats)
  const handleRefreshAll = async () => {
    setLoadingOrders(true)
    try {
      await Promise.all([loadOrders(), loadDishes()])
      showToast('Dashboard refreshed successfully! 🔄')
    } catch {
      showToast('Dashboard refreshed!')
    } finally {
      setLoadingOrders(false)
    }
  }

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the Admin Console?')) {
      localStorage.removeItem('zaiqa_admin_session')
      sessionStorage.removeItem('zaiqa_admin_session')
      setSession(null)
      showToast('Logged out from Admin Console.', 'info')
    }
  }

  useEffect(() => {
    if (!session) return

    loadOrders()
    loadDishes()

    const handleDishesUpdated = () => loadDishes()
    const handleOrdersUpdated = () => loadOrders()

    window.addEventListener('dishes_updated', handleDishesUpdated)
    window.addEventListener('orders_updated', handleOrdersUpdated)

    // Live Real-time Supabase synchronization
    const channel = supabase
      .channel('admin-realtime-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        loadOrders()
      })
      .subscribe()

    return () => {
      window.removeEventListener('dishes_updated', handleDishesUpdated)
      window.removeEventListener('orders_updated', handleOrdersUpdated)
      supabase.removeChannel(channel)
    }
  }, [session])

  // Order Counts
  const totalOrdersCount = orders.length
  const pendingOrdersCount = orders.filter((o) => {
    const s = (o.status || '').toLowerCase()
    return s.includes('pend') || s.includes('order placed') || s.includes('confirm')
  }).length
  const preparingOrdersCount = orders.filter((o) => {
    const s = (o.status || '').toLowerCase()
    return s.includes('prepar') || s.includes('cook')
  }).length
  const deliveredOrdersCount = orders.filter((o) => {
    const s = (o.status || '').toLowerCase()
    return s.includes('deliver') || s.includes('complete')
  }).length

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const statusLower = (ord.status || '').toLowerCase()
      let matchesFilter = true

      if (selectedStatusFilter === 'Pending') {
        matchesFilter = statusLower.includes('pend') || statusLower.includes('order placed') || statusLower.includes('confirm')
      } else if (selectedStatusFilter === 'Preparing') {
        matchesFilter = statusLower.includes('prepar') || statusLower.includes('cook')
      } else if (selectedStatusFilter === 'Delivered') {
        matchesFilter = statusLower.includes('deliver') || statusLower.includes('complete')
      }

      if (!matchesFilter) return false

      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      const ref = (ord.referenceId || ord.orderId || '').toLowerCase()
      const cust = (ord.customerName || '').toLowerCase()
      const phone = (ord.phone || '').toLowerCase()
      const addr = (ord.address || '').toLowerCase()

      return ref.includes(q) || cust.includes(q) || phone.includes(q) || addr.includes(q)
    })
  }, [orders, selectedStatusFilter, searchQuery])

  // Handle status update directly in Supabase
  const handleUpdateStatus = async (order, newStatus) => {
    setOpenStatusDropdownId(null)

    // 1. Optimistic update
    setOrders((prev) =>
      prev.map((o) =>
        (o.supabaseId && o.supabaseId === order.supabaseId) ||
        (o.referenceId && o.referenceId === order.referenceId)
          ? { ...o, status: newStatus }
          : o
      )
    )

    // 2. Live Supabase update
    const targetId = order.supabaseId || order.orderId || order.referenceId
    const res = await updateOrderStatusInSupabase(targetId, newStatus)
    if (res.success) {
      showToast(`Order #${order.supabaseId || order.referenceId} updated to "${newStatus}" in Supabase!`)
    } else {
      showToast(`Supabase Notice: ${res.error || 'Failed to update'}`)
      loadOrders()
    }
  }

  // Handle order deletion from Supabase
  const handleDeleteOrder = async (order) => {
    if (!window.confirm(`Are you sure you want to delete order #${order.supabaseId || order.referenceId} from Supabase?`)) {
      return
    }

    const targetId = order.supabaseId || order.orderId || order.referenceId
    const res = await deleteOrderFromSupabase(targetId)
    if (res.success) {
      setOrders((prev) => prev.filter((o) => o.supabaseId !== order.supabaseId && o.referenceId !== order.referenceId))
      showToast(`Order #${order.supabaseId || order.referenceId} removed from Supabase.`)
    } else {
      showToast(`Delete failed: ${res.error || 'Unknown error'}`)
    }
  }

  // Handle adding new dish
  const handleCreateDish = (e) => {
    e.preventDefault()
    if (!newDish.name.trim()) {
      showToast('Please enter a dish name.')
      return
    }
    if (!newDish.price || Number(newDish.price) <= 0) {
      showToast('Please enter a valid price in PKR.')
      return
    }

    setAddingDish(true)
    const tagArray = newDish.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const created = saveCustomDish({
      name: newDish.name.trim(),
      category: newDish.category,
      price: Number(newDish.price),
      prepTime: newDish.prepTime || '20 mins',
      description: newDish.description.trim() || 'Delicious royal delicacy freshly prepared upon order.',
      tags: tagArray.length > 0 ? tagArray : ['Chef Special'],
      image: newDish.image || PRESET_IMAGES[0].url,
      isSpicy: newDish.isSpicy,
      isBestseller: newDish.isBestseller,
    })

    setAddingDish(false)
    if (created) {
      showToast(`✨ "${created.name}" added to menu successfully!`)
      // Reset form
      setNewDish({
        name: '',
        category: 'BBQ & Grills',
        price: '',
        prepTime: '20 mins',
        description: '',
        tags: 'Chef Special',
        image: PRESET_IMAGES[0].url,
        isSpicy: false,
        isBestseller: true,
      })
      loadDishes()
      setActiveTab('menu-items')
    }
  }

  // Handle deleting custom dish
  const handleDeleteDish = (dishId, dishName) => {
    if (window.confirm(`Are you sure you want to remove "${dishName}" from the menu?`)) {
      deleteCustomDish(dishId)
      loadDishes()
      showToast(`Removed "${dishName}" from menu.`)
    }
  }

  // Filtered dishes for Manage Menu tab
  const filteredDishesList = useMemo(() => {
    if (!dishSearch.trim()) return dishesList
    const q = dishSearch.toLowerCase()
    return dishesList.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    )
  }, [dishesList, dishSearch])

  // If not authenticated, render Admin Login screen
  if (!session) {
    return (
      <AdminLoginView
        onLoginSuccess={(newSession) => {
          setSession(newSession)
          showToast(`Welcome back, ${newSession.name || 'Admin'}! 👋`)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-gray-100 flex flex-col md:flex-row font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 px-6 rounded-2xl bg-orange-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0A0F1D] border-b border-gray-800 shrink-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
              <Crown className="w-2 h-2" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h2 className="text-base font-extrabold text-white font-['Playfair_Display'] leading-none">
                Zaiqa Lounge
              </h2>
              <Crown className="w-3 h-3 text-amber-400" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-orange-400 mt-0.5">
              ADMIN CONSOLE
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshAll}
            disabled={loadingOrders}
            className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white cursor-pointer"
            title="Refresh Entire Dashboard"
          >
            <RefreshCw className={`w-4 h-4 ${loadingOrders ? 'animate-spin text-orange-400' : ''}`} />
          </button>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1 text-xs font-bold"
            title="View Customer Site"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="text-[10px]">Site</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-gray-800 text-gray-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* LEFT SIDEBAR (Matching reference screenshot media_1791617452038_3de2d0c7.png) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 sm:w-72 bg-[#0A0F1D] border-r border-gray-800/80 flex flex-col justify-between shrink-0 p-5 transition-transform duration-300 md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Top Logo Badge with Royal Crest Watermark behind Zaiqa Lounge */}
          <div className="relative overflow-hidden rounded-2xl p-3.5 bg-gradient-to-br from-gray-900/95 via-gray-900/80 to-[#070B14] border border-gray-800 shadow-xl group">
            {/* Watermark Logo behind "Zaiqa Lounge" */}
            <div className="absolute -right-3 -bottom-3 w-28 h-28 text-orange-500/15 pointer-events-none select-none rotate-12 group-hover:rotate-6 transition-transform duration-500">
              <ZaiqaRoyalLogoWatermark />
            </div>

            <div className="relative flex items-center gap-3 z-10">
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-500/20">
                  <UtensilsCrossed className="w-6 h-6 animate-pulse" />
                </div>
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-xs">
                  <Crown className="w-2.5 h-2.5" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-lg font-extrabold text-white font-['Playfair_Display'] leading-none">
                    Zaiqa Lounge
                  </h2>
                  <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mt-1 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>ADMIN CONSOLE</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-4">
            {/* Orders Tab */}
            <button
              onClick={() => {
                setActiveTab('orders')
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'orders'
                    ? 'bg-white text-orange-600'
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}
              >
                {totalOrdersCount}
              </span>
            </button>

            {/* Add New Dish Tab */}
            <button
              onClick={() => {
                setActiveTab('add-dish')
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'add-dish'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <PlusCircle className="w-4 h-4" />
                <span>Add New Dish</span>
              </div>
              <span className="text-[10px] text-orange-400 font-bold">+ New</span>
            </button>

            {/* Manage Menu Tab */}
            <button
              onClick={() => {
                setActiveTab('menu-items')
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'menu-items'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Utensils className="w-4 h-4" />
                <span>Menu Items</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 font-bold">
                {dishesList.length}
              </span>
            </button>


            {/* View Customer Website Link */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-gray-300 hover:text-white bg-gray-900/60 hover:bg-orange-500/20 border border-gray-800 hover:border-orange-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-orange-400" />
                <span>View Customer Site</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            </Link>

            {/* Standalone admin.html Link */}
            <a
              href="/admin.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-gray-400 hover:text-orange-400 hover:bg-gray-900/60 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
              <span>Standalone Console</span>
            </a>
          </nav>
        </div>

        {/* Bottom User Info & Logout Button */}
        <div className="pt-4 border-t border-gray-800/80 space-y-2.5">
          <div className="px-3 py-2 rounded-xl bg-gray-900/80 border border-gray-800/80 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
              {(session?.name || 'A')[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{session?.name || 'Admin'}</p>
              <p className="text-[10px] text-gray-400 truncate">{session?.email || 'admin@zaiqa.com'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 rounded-2xl bg-gray-900/80 hover:bg-red-950/40 text-gray-400 hover:text-red-400 border border-gray-800 hover:border-red-500/40 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8 max-w-7xl">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
              {activeTab === 'orders'
                ? 'Orders Management'
                : activeTab === 'add-dish'
                ? 'Add New Menu Item'
                : 'Menu Items Management'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {activeTab === 'orders'
                ? 'Real-time orders synced with Supabase & Gmail'
                : activeTab === 'add-dish'
                ? 'Create a new dish that instantly appears across the entire website'
                : `Currently offering ${dishesList.length} royal dishes across Karachi`}
            </p>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            {/* View Customer Site Button */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500 hover:to-amber-500 text-orange-400 hover:text-white border border-orange-500/40 text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-orange-500/10 cursor-pointer active:scale-95"
              title="Visit Customer Facing Website in new tab"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Customer Site</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </Link>

            {/* Refresh Dashboard Button */}
            <button
              onClick={handleRefreshAll}
              disabled={loadingOrders}
              className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              title="Refresh entire dashboard (Orders, Menu items, Stats)"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? 'animate-spin text-orange-400' : ''}`} />
              <span>{loadingOrders ? 'Refreshing...' : 'Refresh Dashboard'}</span>
            </button>

            {/* Admin User Pill */}
            <div className="hidden lg:flex px-3.5 py-2 rounded-xl bg-gray-900/90 border border-gray-800 items-center gap-2 text-xs font-medium text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white">{session?.name || 'Admin'}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">{session?.email || 'admin@zaiqa.com'}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-gray-900 hover:bg-red-950/40 border border-gray-800 hover:border-red-500/40 text-gray-400 hover:text-red-400 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Log out from Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* TAB 1: ORDERS VIEW */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* 4 Stat Cards (Matching media_1791617452038_3de2d0c7.png) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Card 1: TOTAL ORDERS */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#0F172A]/70 border border-gray-800 shadow-xl space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  TOTAL ORDERS
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {totalOrdersCount}
                </div>
              </div>

              {/* Card 2: PENDING ORDERS */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#0F172A]/70 border border-gray-800 shadow-xl space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  PENDING ORDERS
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                  {pendingOrdersCount}
                </div>
              </div>

              {/* Card 3: PREPARING */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#0F172A]/70 border border-gray-800 shadow-xl space-y-2">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">
                  PREPARING
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                  {preparingOrdersCount}
                </div>
              </div>

              {/* Card 4: DELIVERED */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#0F172A]/70 border border-gray-800 shadow-xl space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  DELIVERED
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                  {deliveredOrdersCount}
                </div>
              </div>
            </div>

            {/* Filter Tabs and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {['All', 'Pending', 'Preparing', 'Delivered'].map((filter) => {
                  const isActive = selectedStatusFilter === filter
                  return (
                    <button
                      key={filter}
                      onClick={() => setSelectedStatusFilter(filter)}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                          : 'bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                      }`}
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>

              {/* Search Customer / Phone / ID */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, phone, ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-900/90 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* ORDERS DISPLAY: Responsive Card View for Mobile + Table View for Tablet/Desktop */}
            <div className="rounded-3xl border border-gray-800/90 bg-[#0A0F1D]/80 shadow-2xl overflow-hidden">
              {filteredOrders.length === 0 ? (
                <div className="py-16 text-center text-gray-500 space-y-2 p-6">
                  <FileText className="w-8 h-8 text-gray-600 mx-auto" />
                  <p className="text-sm font-semibold text-gray-300">No orders found</p>
                  <p className="text-xs text-gray-500">
                    Try changing the filter or search query
                  </p>
                </div>
              ) : (
                <>
                  {/* 1. Mobile Cards View (< md) */}
                  <div className="md:hidden divide-y divide-gray-800/80">
                    {filteredOrders.map((ord) => {
                      const statusLower = (ord.status || '').toLowerCase()
                      const isDelivered = statusLower.includes('deliver')
                      const isPreparing = statusLower.includes('prepar')
                      const isDropdownOpen = openStatusDropdownId === ord.referenceId

                      return (
                        <div key={ord.referenceId || ord.orderId} className="p-4 space-y-3.5 bg-gray-950/40">
                          {/* Top: Order ID, Timestamp & Status Changer */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <span className="font-mono font-bold text-amber-400 text-xs">
                                #{ord.referenceId || ord.orderId}
                              </span>
                              <p className="text-[10px] text-gray-400">{ord.timestamp || 'Today'}</p>
                            </div>

                            {/* Status button with 1-click dropdown */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenStatusDropdownId(isDropdownOpen ? null : ord.referenceId)
                                }
                                className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                                  isDelivered
                                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                                    : isPreparing
                                    ? 'bg-blue-500/15 text-blue-400 border-blue-500/40'
                                    : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                                }`}
                              >
                                <span>
                                  {isDelivered
                                    ? '✓ Delivered'
                                    : isPreparing
                                    ? '👨‍🍳 Preparing'
                                    : '⏳ Pending'}
                                </span>
                                <ChevronDown className="w-3 h-3" />
                              </button>

                              {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl p-1.5 z-40 animate-fadeIn">
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateStatus(ord, 'Pending')}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-amber-500/20 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Pending</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateStatus(ord, 'Preparing')}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-blue-300 hover:bg-blue-500/20 flex items-center gap-2 cursor-pointer"
                                  >
                                    <Flame className="w-3.5 h-3.5 text-blue-400" />
                                    <span>Preparing</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateStatus(ord, 'Delivered')}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 flex items-center gap-2 cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Delivered</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Customer Details */}
                          <div className="space-y-1 text-xs">
                            <div className="font-bold text-white text-sm">{ord.customerName}</div>
                            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
                              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                              <a href={`tel:${ord.phone}`} className="hover:underline">{ord.phone}</a>
                            </div>
                            <div className="flex items-start gap-1.5 text-gray-400 text-[11px] leading-tight">
                              <MapPin className="w-3 h-3 text-gray-500 shrink-0 mt-0.5" />
                              <span>{ord.address}</span>
                            </div>
                            {ord.notes && (
                              <div className="text-[10px] text-gray-400 italic">
                                Note: {ord.notes}
                              </div>
                            )}
                          </div>

                          {/* Dishes List & Pricing */}
                          <div className="p-3 rounded-2xl bg-gray-900/80 border border-gray-800 text-xs space-y-1.5">
                            {Array.isArray(ord.items) && ord.items.length > 0 ? (
                              ord.items.map((it, idx) => (
                                <div key={idx} className="flex items-center justify-between text-gray-300">
                                  <span>{it.name} <span className="text-orange-400 font-bold">× {it.quantity || 1}</span></span>
                                  <span className="text-gray-400 font-medium">Rs. {Number((it.price || 0) * (it.quantity || 1)).toLocaleString()}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-400">{ord.dishes || 'Standard items'}</div>
                            )}

                            <div className="pt-2 border-t border-gray-800 flex items-center justify-between font-bold">
                              <span className="text-gray-300">Grand Total:</span>
                              <span className="text-base text-white font-black">Rs. {Number(ord.totalAmount).toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Bottom Action: Link to Track */}
                          <div className="flex justify-end pt-1">
                            <Link
                              to={`/track?id=${ord.referenceId || ord.orderId}`}
                              target="_blank"
                              className="text-xs font-bold text-orange-400 hover:underline flex items-center gap-1"
                            >
                              <span>🔍 Open Live Tracking</span>
                            </Link>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* 2. Desktop & Tablet Table View (>= md) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[760px]">
                      {/* Table Headers */}
                      <thead className="bg-[#060A14] text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-800">
                        <tr>
                          <th className="py-4 px-5">ORDER ID & TIME</th>
                          <th className="py-4 px-5">CUSTOMER DETAILS</th>
                          <th className="py-4 px-5">DISHES & QUANTITY</th>
                          <th className="py-4 px-5">TOTAL (PKR)</th>
                          <th className="py-4 px-5 text-right">STATUS (CLICK TO CHANGE)</th>
                        </tr>
                      </thead>

                      {/* Table Body */}
                      <tbody className="divide-y divide-gray-800/60 text-gray-300">
                        {filteredOrders.map((ord) => {
                          const statusLower = (ord.status || '').toLowerCase()
                          const isDelivered = statusLower.includes('deliver')
                          const isPreparing = statusLower.includes('prepar')
                          const isDropdownOpen = openStatusDropdownId === ord.referenceId

                          return (
                            <tr
                              key={ord.referenceId || ord.orderId}
                              className="hover:bg-gray-900/40 transition-colors"
                            >
                              {/* Column 1: ORDER ID & TIME */}
                              <td className="py-4 px-5 align-top space-y-1.5 whitespace-nowrap">
                                <div className="font-mono font-bold text-amber-400 text-xs">
                                  #{ord.referenceId || ord.orderId}
                                </div>
                                <div className="text-[11px] text-gray-400">
                                  {ord.timestamp || 'Today'}
                                </div>
                                <div>
                                  <Link
                                    to={`/track?id=${ord.referenceId || ord.orderId}`}
                                    target="_blank"
                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-400 hover:text-orange-300 hover:underline"
                                  >
                                    <span>🔍 Track</span>
                                  </Link>
                                </div>
                              </td>

                              {/* Column 2: CUSTOMER DETAILS */}
                              <td className="py-4 px-5 align-top space-y-1 max-w-[240px]">
                                <div className="font-bold text-white text-sm">
                                  {ord.customerName}
                                </div>
                                <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
                                  <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                                  <span>{ord.phone}</span>
                                </div>
                                <div className="flex items-start gap-1.5 text-gray-400 text-[11px] leading-tight">
                                  <MapPin className="w-3 h-3 text-gray-500 shrink-0 mt-0.5" />
                                  <span className="line-clamp-2">{ord.address}</span>
                                </div>
                                {ord.notes && (
                                  <div className="text-[10px] text-gray-500 italic truncate max-w-[200px]">
                                    Note: {ord.notes}
                                  </div>
                                )}
                              </td>

                              {/* Column 3: DISHES & QUANTITY */}
                              <td className="py-4 px-5 align-top space-y-1.5 max-w-[320px]">
                                {Array.isArray(ord.items) && ord.items.length > 0 ? (
                                  ord.items.map((it, idx) => (
                                    <div
                                      key={idx}
                                      className="text-xs text-gray-300 leading-snug font-medium"
                                    >
                                      <span className="font-semibold text-white">{it.name}</span>{' '}
                                      <span className="text-gray-400">× {it.quantity || 1}</span>{' '}
                                      <span className="text-gray-500 text-[11px]">
                                        (Rs. {Number(it.price || 0).toLocaleString()})
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-xs text-gray-400">
                                    {ord.dishes || 'Standard items'}
                                  </span>
                                )}
                              </td>

                              {/* Column 4: TOTAL (PKR) */}
                              <td className="py-4 px-5 align-top whitespace-nowrap">
                                <div className="font-black text-white text-sm sm:text-base">
                                  Rs. {Number(ord.totalAmount).toLocaleString()}
                                </div>
                                <span className="text-[10px] text-gray-500">Cash on Delivery</span>
                              </td>

                              {/* Column 5: STATUS (CLICK TO CHANGE) */}
                              <td className="py-4 px-5 align-top text-right relative whitespace-nowrap">
                                <div className="inline-block text-left">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setOpenStatusDropdownId(
                                        isDropdownOpen ? null : ord.referenceId
                                      )
                                    }
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                                      isDelivered
                                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                                        : isPreparing
                                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/40 hover:bg-blue-500/25'
                                        : 'bg-amber-500/15 text-amber-400 border-amber-500/40 hover:bg-amber-500/25'
                                    }`}
                                  >
                                    <span>
                                      {isDelivered
                                        ? '✓ Delivered'
                                        : isPreparing
                                        ? '👨‍🍳 Preparing'
                                        : '⏳ Pending'}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Dropdown Menu for 1-Click Status Update */}
                                  {isDropdownOpen && (
                                    <div className="absolute right-5 mt-2 w-44 rounded-2xl bg-gray-900 border border-gray-700 shadow-2xl p-1.5 z-30 animate-fadeIn">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateStatus(ord, 'Pending')}
                                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-amber-500/20 flex items-center gap-2 cursor-pointer transition-colors"
                                      >
                                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                                        <span>Mark Pending</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateStatus(ord, 'Preparing')}
                                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-blue-300 hover:bg-blue-500/20 flex items-center gap-2 cursor-pointer transition-colors"
                                      >
                                        <Flame className="w-3.5 h-3.5 text-blue-400" />
                                        <span>Mark Preparing</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateStatus(ord, 'Delivered')}
                                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 flex items-center gap-2 cursor-pointer transition-colors"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                        <span>Mark Delivered</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: ADD NEW DISH (Admin can add any item to the restaurant menu) */}
        {activeTab === 'add-dish' && (
          <div className="max-w-3xl glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-xl font-bold text-white font-['Playfair_Display']">
                Add New Dish to Restaurant Menu
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Fill in the details below. Once added, the dish immediately shows up in the Menu, Order Form, and Cart!
              </p>
            </div>

            <form onSubmit={handleCreateDish} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dish Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Dish Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                    placeholder="e.g. Mutton Handi or Charcoal Tikka"
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Category <span className="text-orange-500">*</span>
                  </label>
                  <select
                    value={newDish.category}
                    onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:outline-none focus:border-orange-500 text-xs"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Dishes').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Price in PKR <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="50"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    placeholder="e.g. 950"
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>

                {/* Prep Time */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Preparation Time
                  </label>
                  <input
                    type="text"
                    value={newDish.prepTime}
                    onChange={(e) => setNewDish({ ...newDish, prepTime: e.target.value })}
                    placeholder="e.g. 15-20 mins"
                    className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  placeholder="Describe the dish ingredients, cooking style, spices..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={newDish.tags}
                  onChange={(e) => setNewDish({ ...newDish, tags: e.target.value })}
                  placeholder="e.g. Charcoal Grill, Melt-in-Mouth, Spicy"
                  className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs"
                />
              </div>

              {/* Image URL & Preset Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  Dish Photo (Image URL or Pick Preset)
                </label>
                <input
                  type="url"
                  value={newDish.image}
                  onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs font-mono"
                />

                {/* Preset image buttons for quick pick */}
                <div className="pt-2">
                  <p className="text-[11px] text-gray-400 mb-2 font-semibold">
                    Quick Preset Photos:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewDish({ ...newDish, image: preset.url })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
                          newDish.image === preset.url
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500'
                            : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={newDish.isBestseller}
                    onChange={(e) => setNewDish({ ...newDish, isBestseller: e.target.checked })}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-0"
                  />
                  <span>Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={newDish.isSpicy}
                    onChange={(e) => setNewDish({ ...newDish, isSpicy: e.target.checked })}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-0"
                  />
                  <span>Mark as Spicy</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-800 flex justify-end">
                <button
                  type="submit"
                  disabled={addingDish}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black shadow-lg shadow-orange-500/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{addingDish ? 'Adding Dish...' : 'Add Dish to Menu'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE MENU ITEMS */}
        {activeTab === 'menu-items' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={dishSearch}
                  onChange={(e) => setDishSearch(e.target.value)}
                  placeholder="Search dish by name or category..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-900 border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>

              <button
                onClick={() => setActiveTab('add-dish')}
                className="px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-orange-500/25"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Dish</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="rounded-3xl border border-gray-800 bg-[#0A0F1D]/80 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#060A14] text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-800">
                    <tr>
                      <th className="py-4 px-5">DISH IMAGE & NAME</th>
                      <th className="py-4 px-5">CATEGORY</th>
                      <th className="py-4 px-5">PRICE</th>
                      <th className="py-4 px-5">PREP TIME</th>
                      <th className="py-4 px-5">TYPE</th>
                      <th className="py-4 px-5 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60 text-gray-300">
                    {filteredDishesList.map((dish) => (
                      <tr key={dish.id} className="hover:bg-gray-900/40 transition-colors">
                        <td className="py-3.5 px-5 flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-800"
                          />
                          <div>
                            <div className="font-bold text-white text-sm">{dish.name}</div>
                            <div className="text-[10px] text-gray-400 line-clamp-1 max-w-xs">
                              {dish.description}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-5">
                          <span className="px-2.5 py-1 rounded-full bg-gray-900 text-orange-400 text-[10px] font-bold border border-gray-800">
                            {dish.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-5 font-bold text-white">
                          Rs. {Number(dish.price).toLocaleString()}
                        </td>

                        <td className="py-3.5 px-5 text-gray-400">
                          {dish.prepTime || '20 mins'}
                        </td>

                        <td className="py-3.5 px-5">
                          {dish.isCustom ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                              Custom Dish
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-[10px] font-semibold">
                              Default Dish
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-5 text-right">
                          {dish.isCustom ? (
                            <button
                              onClick={() => handleDeleteDish(dish.id, dish.name)}
                              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
                              title="Delete custom dish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="text-[11px] text-gray-600 italic">Protected</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminPage
