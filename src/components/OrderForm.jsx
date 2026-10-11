import React, { useState, useEffect } from 'react'
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  FileText,
  Send,
  Plus,
  Minus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Flame
} from 'lucide-react'
import { getAllDishes, RESTAURANT_INFO } from '../data/dishes'
import { saveOrderToSupabase } from '../lib/supabase'
import { sendOrderToGmail } from '../lib/emailService'
import { saveOrderToStorage } from '../lib/orderStorage'
import confetti from 'canvas-confetti'


export function OrderForm({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  recipientEmail,
  setRecipientEmail,
  onOrderSuccess,
  onOpenSqlModal,
}) {
  const [allDishes, setAllDishes] = useState(() => getAllDishes())

  useEffect(() => {
    const handleUpdate = () => setAllDishes(getAllDishes())
    window.addEventListener('dishes_updated', handleUpdate)
    return () => window.removeEventListener('dishes_updated', handleUpdate)
  }, [])

  // Form fields (All required per Requirement 2)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })

  // Selected dish from inline dropdown selector
  const [quickDishId, setQuickDishId] = useState(allDishes[0]?.id || 1)


  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [supabaseStatus, setSupabaseStatus] = useState(null)
  const [gmailStatus, setGmailStatus] = useState(null)

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 0
    ? (subtotal >= RESTAURANT_INFO.freeDeliveryThreshold ? 0 : RESTAURANT_INFO.deliveryFee)
    : 0
  const grandTotal = subtotal + deliveryFee

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const handleAddQuickDish = () => {
    const dish = allDishes.find((d) => d.id === Number(quickDishId))
    if (dish) {
      onAddToCart(dish)
    }
  }


  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    // Requirement 2: All fields must be filled (required)
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name (Required).')
      return
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your contact phone number (Required).')
      return
    }
    if (!formData.address.trim()) {
      setErrorMsg('Please enter your complete delivery address (Required).')
      return
    }
    if (cartItems.length === 0) {
      setErrorMsg('Please select at least one dish to place your order (Required).')
      return
    }

    setLoading(true)
    setSupabaseStatus('Saving to Supabase...')
    setGmailStatus('Sending to Gmail...')

    // Generate unique customer Reference ID (loc-timestamp as requested)
    const timestampMs = Date.now()
    const referenceId = `loc-${timestampMs}`

    const dishesSummary = cartItems
      .map((item) => `${item.name} x ${item.quantity} (Rs. ${(item.price * item.quantity).toLocaleString()})`)
      .join(', ')

    // 1. Save to Supabase (Table 'orders', passes explicit numeric ID and reference ID)
    const supabasePayload = {
      timestampMs,
      referenceId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      dishesSummary,
      items: cartItems.map((it) => ({
        id: it.id,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
        total: it.price * it.quantity,
      })),
      totalAmount: grandTotal,
      notes: formData.notes.trim(),
    }

    const sbResult = await saveOrderToSupabase(supabasePayload)

    let createdOrderId = sbResult.success ? (sbResult.order?.id || referenceId) : referenceId

    if (sbResult.success) {
      setSupabaseStatus('Saved in Supabase (Status: Pending)')
    } else {
      setSupabaseStatus(`Supabase Notice: ${sbResult.error || 'Table orders not found'}`)
    }

    // 2. Save to local order storage for instant Reference ID Tracking
    const orderRecord = {
      referenceId,
      orderId: referenceId,
      supabaseId: createdOrderId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      items: cartItems.map((it) => ({
        id: it.id,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
      })),
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      notes: formData.notes.trim(),
      status: 'Confirmed', // Ready for tracking
      estimatedTime: '25-35 mins',
      timestamp: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    }
    saveOrderToStorage(orderRecord)

    // 3. Send order to Gmail (Requirement 3: Full order to Gmail with dishes, qty, total, name, phone, address)
    const emailResult = await sendOrderToGmail({
      recipientEmail: recipientEmail,
      orderId: referenceId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      items: cartItems,
      totalAmount: grandTotal,
      notes: formData.notes.trim(),
    })

    if (emailResult.success) {
      setGmailStatus(`Dispatched to ${recipientEmail}`)
    } else {
      setGmailStatus('Gmail notification prepared')
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f97316', '#eab308', '#10b981', '#3b82f6', '#ec4899'],
      })
    } catch (confettiErr) {
      console.log('Confetti feedback:', confettiErr)
    }

    setLoading(false)

    // Notify parent for modal presentation
    onOrderSuccess({
      referenceId,
      orderId: referenceId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      items: [...cartItems],
      subtotal,
      deliveryFee,
      totalAmount: grandTotal,
      notes: formData.notes.trim(),
      supabaseResult: sbResult,
      emailResult,
      timestamp: new Date().toLocaleString(),
    })

    // Reset customer form fields
    setFormData({
      name: '',
      phone: '',
      address: '',
      notes: '',
    })
  }

  return (
    <section id="order" className="py-24 sm:py-28 lg:py-36 relative bg-gray-900/90 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fast Express Checkout</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Playfair_Display']">
            Place Your Food Order
          </h2>

          <p className="text-sm sm:text-base text-gray-400">
            Fill in your delivery details below. Your order will be immediately confirmed and dispatched!
          </p>
        </div>

        {/* Error notification banner */}
        {errorMsg && (
          <div className="max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-200 flex items-center gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm font-semibold">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* Left Column: Customer Delivery Details (Requirement 2) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Playfair_Display']">
                    Customer Information
                  </h3>
                </div>
                <span className="text-xs text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                  All Fields Required *
                </span>
              </div>

              {/* Full Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  <span>Full Customer Name <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-orange-400" />
                  <span>Contact Phone Number <span className="text-red-400">*</span></span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Your Phone Number"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                />
              </div>

              {/* Delivery Address Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>Delivery Address <span className="text-red-400">*</span></span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  placeholder="your address"
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm resize-none"
                />
              </div>

              {/* Notes / Special Instructions */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-gray-500" />
                  <span>Cooking / Delivery Instructions (Optional)</span>
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Extra raita, mild spice, ring doorbell upon arrival"
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Dish Selection & Order Summary (Requirements 2, 3, 4) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Playfair_Display']">
                    Picked Dishes & Total
                  </h3>
                </div>
                {cartItems.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Quick Add Dish Dropdown */}
              <div className="p-3.5 rounded-2xl bg-gray-950/70 border border-gray-800 space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Quick Add Dish to Order:
                </label>
                <div className="flex gap-2">
                  <select
                    value={quickDishId}
                    onChange={(e) => setQuickDishId(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-white text-xs focus:outline-none focus:border-orange-500"
                  >
                    {allDishes.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} — Rs. {d.price.toLocaleString()}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleAddQuickDish}
                    className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Selected Dishes Itemized List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cartItems.length === 0 ? (
                  <div className="py-8 text-center rounded-2xl border-2 border-dashed border-gray-800 bg-gray-950/40 space-y-3">
                    <ShoppingBag className="w-10 h-10 text-gray-600 mx-auto" />
                    <p className="text-sm text-gray-400 font-medium">Your order is currently empty</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      Choose dishes from our menu or use the quick selector above to add dishes.
                    </p>
                    <div className="pt-2">
                      <a
                        href="#menu"
                        className="inline-flex items-center gap-1 text-xs text-orange-400 font-bold hover:underline"
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>Browse 8 Available Dishes</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-950/60 border border-gray-800/80 gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.name}</p>
                          <p className="text-[11px] text-gray-400">
                            Rs. {item.price.toLocaleString()} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-700 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-orange-400 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="text-xs font-bold text-white w-16 text-right">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Remove item button */}
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculations */}
              <div className="border-t border-gray-800 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 && subtotal > 0 ? "text-emerald-400 font-semibold" : "text-white font-medium"}>
                    {subtotal === 0 ? "Rs. 0" : (deliveryFee === 0 ? "FREE (Orders > Rs. 2,500)" : `Rs. ${deliveryFee}`)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white border-t border-gray-800 pt-3">
                  <span>Grand Total</span>
                  <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-black">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button (Place Order) */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer ${
                  loading
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-orange-400" />
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Place Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

