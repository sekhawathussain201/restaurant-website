import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Compass,
  Search,
  CheckCircle2,
  Clock,
  Flame,
  Bike,
  PackageCheck,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Sparkles,
  AlertCircle,
  ArrowRight,
  PhoneCall,
  RotateCw,
  Copy,
  Check,
  ChefHat
} from 'lucide-react'
import {
  findOrderByReferenceOrPhone,
  getStoredOrders,
  getLastPlacedOrder,
  updateOrderStatusInStorage,
  SAMPLE_ORDERS
} from '../lib/orderStorage'
import { fetchOrderFromSupabase } from '../lib/supabase'
import { RESTAURANT_INFO } from '../data/dishes'

export function TrackOrderPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialRef = searchParams.get('id') || searchParams.get('ref') || ''

  const [inputQuery, setInputQuery] = useState(initialRef || '')
  const [currentOrder, setCurrentOrder] = useState(null)
  const [searched, setSearched] = useState(false)
  const [recentOrders, setRecentOrders] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [copiedId, setCopiedId] = useState(false)
  const [isSearchingLive, setIsSearchingLive] = useState(false)

  const performSearch = async (query) => {
    if (!query) return
    setIsSearchingLive(true)

    // 1. Check local storage orders
    let found = findOrderByReferenceOrPhone(query)

    // 2. If not found locally, query live Supabase table
    if (!found) {
      const sbOrder = await fetchOrderFromSupabase(query)
      if (sbOrder) {
        found = {
          referenceId: sbOrder.notes ? sbOrder.notes.split(' ')[0] : `loc-${sbOrder.id}`,
          orderId: `loc-${sbOrder.id}`,
          customerName: sbOrder.customer_name,
          phone: sbOrder.phone,
          address: sbOrder.address,
          items: sbOrder.items || [],
          subtotal: Number(sbOrder.total_amount),
          deliveryFee: 0,
          totalAmount: Number(sbOrder.total_amount),
          status: sbOrder.status === 'Pending' ? 'Order Placed' : sbOrder.status,
          notes: sbOrder.notes || '',
          timestamp: new Date(sbOrder.created_at).toLocaleString(),
        }
      }
    }

    setCurrentOrder(found)
    if (found) {
      setInputQuery(found.referenceId)
    }
    setSearched(true)
    setIsSearchingLive(false)
  }

  // Load stored orders list on mount - DO NOT auto-fill ID by default!
  useEffect(() => {
    const orders = getStoredOrders()
    setRecentOrders(orders)

    // ONLY search if an explicit ID was provided via URL query (e.g. /track?id=loc-...)
    if (initialRef && initialRef.trim()) {
      setInputQuery(initialRef.trim())
      performSearch(initialRef.trim())
    } else {
      // Input must be empty by default: user pastes or types their own ID!
      setInputQuery('')
      setCurrentOrder(null)
      setSearched(false)
    }
  }, [initialRef])

  const handleSearch = (e) => {

    if (e) e.preventDefault()
    if (!inputQuery.trim()) return

    performSearch(inputQuery.trim())
    setSearchParams({ id: inputQuery.trim() })
  }

  const handleSelectOrder = (refId) => {
    setInputQuery(refId)
    setSearchParams({ id: refId })
    performSearch(refId)
  }

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  // Simulator helper: change status to test live tracker
  const handleSimulateStatus = (newStatus) => {
    if (!currentOrder) return
    setIsUpdating(true)
    updateOrderStatusInStorage(currentOrder.referenceId, newStatus)
    setTimeout(() => {
      setCurrentOrder((prev) => ({ ...prev, status: newStatus }))
      setRecentOrders(getStoredOrders())
      setIsUpdating(false)
    }, 300)
  }

  // 3-Stage Progress cards (matching the user's reference screenshot)
  const stages = [
    {
      id: 'Order Placed',
      stepNum: 1,
      label: '1. Order Placed',
      description: 'Received & queued into kitchen',
      icon: '📝',
    },
    {
      id: 'In Preparation',
      stepNum: 2,
      label: '2. In Preparation',
      description: 'Chefs cooking & packing food',
      icon: '👨‍🍳',
    },
    {
      id: 'Delivered',
      stepNum: 3,
      label: '3. Delivered',
      description: 'Delivered to your address',
      icon: '🎉',
    },
  ]

  const getStageIndex = (status) => {
    const s = (status || '').toLowerCase()
    if (s.includes('deliver') || s.includes('complete')) return 2
    if (s.includes('prepar') || s.includes('cook')) return 1
    return 0 // Order Placed / Pending
  }

  const currentStageIdx = currentOrder ? getStageIndex(currentOrder.status) : 0

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Live Delivery Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Playfair_Display']">
            Track Your Order
          </h1>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Enter your Order ID (e.g. <strong className="text-orange-400 font-mono">loc-1791615401261</strong>) or Customer Phone to track live status.
          </p>
        </div>

        {/* Search Bar Form (styled matching the reference screenshot) */}
        <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-gray-800 shadow-2xl">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
              Enter Order ID or Customer Phone <span className="text-orange-500">*</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Paste or type Order ID (e.g. loc-179161...)..."
                  className="w-full pl-12 pr-20 py-3.5 rounded-2xl bg-gray-950/90 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText()
                      if (text && text.trim()) {
                        setInputQuery(text.trim())
                      }
                    } catch (err) {
                      console.log('Clipboard notice:', err)
                    }
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-gray-800 hover:bg-gray-700 text-orange-400 text-xs font-bold transition-colors cursor-pointer border border-gray-700/80"
                  title="Paste from clipboard"
                >
                  Paste
                </button>
              </div>

              <button
                type="submit"
                disabled={isSearchingLive}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-extrabold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>{isSearchingLive ? 'Searching...' : 'Track Order'}</span>
              </button>
            </div>
          </form>

          {/* Recent on this device: pills (matching screenshot) */}
          <div className="mt-5 pt-4 border-t border-gray-800/80">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Recent on this device:
            </p>
            <div className="flex flex-wrap gap-2">
              {recentOrders.slice(0, 4).map((ord) => {
                const isSelected = currentOrder?.referenceId === ord.referenceId
                const shortRef = ord.referenceId.length > 12 ? `${ord.referenceId.slice(0, 8)}...` : ord.referenceId

                return (
                  <button
                    key={ord.referenceId}
                    type="button"
                    onClick={() => handleSelectOrder(ord.referenceId)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-sm'
                        : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <span>📁</span>
                    <span className="font-mono font-bold text-white">{shortRef}</span>
                    <span className="text-[10px] text-gray-400">
                      (Rs. {ord.totalAmount?.toLocaleString()})
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Empty initial state before searching */}
        {!searched && !currentOrder && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gray-800 text-center space-y-3.5 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/20">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-['Playfair_Display']">
              Live Order Tracker
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Apna <strong>Order Reference ID</strong> (e.g. <span className="text-orange-400 font-mono">loc-179161...</span>) upar paste ya type karen aur <strong>Track Order</strong> button par click karen taake aapko apne order ki live preparation aur rider update nazar aaye.
            </p>
          </div>
        )}

        {/* Not Found state */}
        {searched && !currentOrder && (
          <div className="glass-card p-8 rounded-3xl border border-red-500/30 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Order Not Found</h3>
            <p className="text-xs text-gray-400">
              No order found matching "<strong className="text-white">{inputQuery}</strong>". Please verify your Order ID or click one of the recent order pills above.
            </p>

            <Link
              to="/order"
              className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:underline pt-2"
            >
              <span>Place a New Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Order Details: Exact layout from user's screenshot */}
        {currentOrder && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Order Status Banner */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-orange-500/30 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-gray-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      ORDER ID:
                    </span>
                    <span className="font-mono text-base sm:text-lg font-black text-orange-400">
                      {currentOrder.referenceId}
                    </span>
                    <button
                      onClick={() => handleCopyId(currentOrder.referenceId)}
                      className="px-2 py-0.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Placed on: {currentOrder.timestamp || 'Today'}
                  </p>
                </div>

                {/* Right Status Pill with glowing indicator */}
                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-inner">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span>📝 {currentOrder.status || 'Order Placed & Queued'}</span>
                  </div>

                  <button
                    onClick={() => performSearch(currentOrder.referenceId)}
                    className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    title="Refresh live order status"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* LIVE PREPARATION & DELIVERY PROGRESS (3 Stage Cards from screenshot) */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>Live Preparation & Delivery Progress</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {stages.map((st, idx) => {
                    const isDone = idx <= currentStageIdx
                    const isCurrent = idx === currentStageIdx

                    return (
                      <div
                        key={st.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 space-y-2 ${
                          isCurrent
                            ? 'bg-orange-500/10 border-orange-500 ring-2 ring-orange-500/30 shadow-lg'
                            : isDone
                            ? 'bg-gray-900/90 border-emerald-500/50 text-gray-200'
                            : 'bg-gray-950/60 border-gray-800 text-gray-500 opacity-60'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-gray-800/80 flex items-center justify-center text-lg mb-2">
                          {st.icon}
                        </div>
                        <h4
                          className={`font-bold text-sm ${
                            isCurrent ? 'text-orange-400' : isDone ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {st.label}
                        </h4>
                        <p className="text-xs text-gray-400 leading-snug">
                          {st.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quick Status Simulator buttons */}
              <div className="pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-gray-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Change Status for Testing:</span>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {['Order Placed', 'In Preparation', 'Delivered'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleSimulateStatus(st)}
                      disabled={isUpdating}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentOrder.status === st
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Details & Order Items Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Delivery Coordinates */}
              <div className="md:col-span-5 glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Customer & Delivery Details</span>
                </h4>

                <div className="space-y-3 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-white font-semibold">{currentOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{currentOrder.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{currentOrder.address}</span>
                  </div>
                  {currentOrder.notes && (
                    <div className="p-2.5 rounded-xl bg-gray-900 border border-gray-800 text-[11px] text-gray-400 italic">
                      Special Note: "{currentOrder.notes}"
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Need support?</span>
                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="text-orange-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Kitchen</span>
                  </a>
                </div>
              </div>

              {/* Items Summary */}
              <div className="md:col-span-7 glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Items in this Order ({currentOrder.items?.length || 0})</span>
                  </h4>
                  <span className="text-[11px] text-gray-400 font-mono">
                    Cash on Delivery
                  </span>
                </div>

                <div className="divide-y divide-gray-800/80 text-xs">
                  {currentOrder.items?.map((it, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-gray-800 text-orange-400 font-bold flex items-center justify-center text-xs">
                          {it.quantity}
                        </span>
                        <span className="font-semibold text-white">{it.name}</span>
                      </div>
                      <span className="font-bold text-gray-200">
                        Rs. {(it.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Calculation */}
                <div className="pt-3 border-t border-gray-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">
                      Rs. {(currentOrder.subtotal || currentOrder.totalAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery Fee</span>
                    <span className="text-emerald-400 font-semibold">
                      {currentOrder.deliveryFee === 0 ? 'FREE' : `Rs. ${currentOrder.deliveryFee || 0}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-gray-800">
                    <span>Total (Cash on Delivery)</span>
                    <span className="text-lg text-orange-400 font-black">
                      Rs. {currentOrder.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
