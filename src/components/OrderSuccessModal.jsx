import React, { useState, useEffect, useRef } from 'react'
import {
  CheckCircle2,
  X,
  Copy,
  Check,
  MapPin,
  Phone,
  User,
  Compass,
  ArrowRight,
  Sparkles,
  GripHorizontal
} from 'lucide-react'

export function OrderSuccessModal({ order, onClose, onTrackOrder }) {
  const [copiedRef, setCopiedRef] = useState(false)
  const [copiedReceipt, setCopiedReceipt] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef(null)
  const dragStartRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 })

  // Reset position whenever a new order is received / opened
  useEffect(() => {
    setPosition({ x: 0, y: 0 })
  }, [order])

  // Mouse & Touch Drag Handlers
  const handleStartDrag = (clientX, clientY) => {
    setIsDragging(true)
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initialX: position.x,
      initialY: position.y
    }
  }

  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    if (e.target.closest('button') || e.target.closest('a')) return
    handleStartDrag(e.clientX, e.clientY)
  }

  const handleTouchStart = (e) => {
    if (e.target.closest('button') || e.target.closest('a')) return
    const touch = e.touches[0]
    if (touch) {
      handleStartDrag(touch.clientX, touch.clientY)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - dragStartRef.current.startX
      const deltaY = e.clientY - dragStartRef.current.startY
      setPosition({
        x: dragStartRef.current.initialX + deltaX,
        y: dragStartRef.current.initialY + deltaY
      })
    }

    const handleTouchMove = (e) => {
      if (!isDragging) return
      const touch = e.touches[0]
      if (!touch) return
      const deltaX = touch.clientX - dragStartRef.current.startX
      const deltaY = touch.clientY - dragStartRef.current.startY
      setPosition({
        x: dragStartRef.current.initialX + deltaX,
        y: dragStartRef.current.initialY + deltaY
      })
    }

    const handleEndDrag = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleEndDrag)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleEndDrag)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEndDrag)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEndDrag)
    }
  }, [isDragging])

  if (!order) return null

  const referenceId = order.referenceId || order.orderId || (`loc-${Date.now()}`)

  const copyRefToClipboard = () => {
    navigator.clipboard.writeText(referenceId)
    setCopiedRef(true)
    setTimeout(() => setCopiedRef(false), 2000)
  }

  const copyReceiptText = () => {
    const text =
      `==============================\n` +
      `ZAIQA ROYAL BISTRO & GRILL\n` +
      `OFFICIAL ORDER RECEIPT\n` +
      `==============================\n` +
      `Tracking Reference ID: ${referenceId}\n` +
      `Customer: ${order.customerName}\n` +
      `Phone: ${order.phone}\n` +
      `Delivery Address: ${order.address}\n\n` +
      `ORDER ITEMS TABLE:\n` +
      `# | Dish Name | Qty | Total\n` +
      `------------------------------\n` +
      order.items
        .map(
          (it, i) =>
            `${i + 1}. ${it.name} (Qty: ${it.quantity}) - Rs. ${(it.price * it.quantity).toLocaleString()}`
        )
        .join('\n') +
      `\n------------------------------\n` +
      `Subtotal: Rs. ${(order.subtotal || order.totalAmount).toLocaleString()}\n` +
      `Delivery Fee: Rs. ${(order.deliveryFee || 0).toLocaleString()}\n` +
      `Grand Total: Rs. ${order.totalAmount.toLocaleString()} (Cash on Delivery)\n` +
      `Status: Order Confirmed (Preparing in Kitchen)\n` +
      `Estimated Delivery: 25 - 35 mins\n` +
      `Time: ${order.timestamp || new Date().toLocaleString()}\n` +
      `==============================\n` +
      `Track live at: /track with Tracking ID: ${referenceId}\n`

    navigator.clipboard.writeText(text)
    setCopiedReceipt(true)
    setTimeout(() => setCopiedReceipt(false), 2000)
  }

  const handleTrackClick = () => {
    onClose()
    if (onTrackOrder) {
      onTrackOrder(referenceId)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDragging) onClose()
      }}
    >
      <div
        ref={dragRef}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isDragging ? 'none' : 'transform 0.15s ease-out'
        }}
        className={`relative w-full max-w-2xl lg:max-w-3xl glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-orange-500/50 shadow-2xl shadow-black/80 overflow-hidden h-[94vh] max-h-[860px] flex flex-col select-auto transition-shadow ${
          isDragging ? 'shadow-orange-500/40 ring-2 ring-orange-500/60' : ''
        }`}
      >
        {/* Top decorative gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400" />

        {/* Top Control Bar with Drag Handle & Position Helpers */}
        <div className="w-full flex items-center justify-between pt-0.5 pb-2.5 border-b border-gray-800/80 mb-2">
          {/* Quick Position Shift (Up / Reset / Down) */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPosition(p => ({ ...p, y: Math.max(p.y - 70, -260) }))}
              className="px-2 py-0.5 rounded-lg bg-gray-800/80 hover:bg-orange-500/20 text-gray-300 hover:text-orange-300 text-[10px] font-bold border border-gray-700/60 transition-all cursor-pointer flex items-center gap-1"
              title="Move modal up"
            >
              ▲ Up
            </button>
            <button
              type="button"
              onClick={() => setPosition({ x: 0, y: 0 })}
              className="px-2 py-0.5 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white text-[10px] font-bold border border-gray-700/60 transition-all cursor-pointer"
              title="Center modal"
            >
              Center
            </button>
            <button
              type="button"
              onClick={() => setPosition(p => ({ ...p, y: Math.min(p.y + 70, 260) }))}
              className="px-2 py-0.5 rounded-lg bg-gray-800/80 hover:bg-orange-500/20 text-gray-300 hover:text-orange-300 text-[10px] font-bold border border-gray-700/60 transition-all cursor-pointer flex items-center gap-1"
              title="Move modal down"
            >
              ▼ Down
            </button>
          </div>

          {/* Central Drag Pill */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gray-800/90 hover:bg-orange-500/25 text-gray-300 hover:text-orange-300 transition-colors border border-gray-700/70 shadow-xs cursor-grab active:cursor-grabbing select-none touch-none"
            title="Click & drag to move anywhere"
          >
            <GripHorizontal className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] font-bold tracking-wider uppercase">Drag to Move</span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full bg-gray-800/80 hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Compact & Stylish Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-3 shrink-0">
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 ring-4 ring-emerald-500/10 shadow-lg">
            <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Playfair_Display'] leading-tight">
              Order Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 truncate">
              Thank you, <strong className="text-white">{order.customerName}</strong>! Feast sent to royal kitchen.
            </p>
          </div>
        </div>

        {/* Prominent Tracking Reference ID Card */}
        <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-950/70 via-amber-950/50 to-orange-950/70 border border-orange-500/50 shadow-inner flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 shrink-0">
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="text-[10px] sm:text-[11px] font-bold text-orange-300 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Your Order Tracking ID</span>
            </div>
            <div className="text-lg sm:text-2xl md:text-2xl font-black text-amber-300 font-mono mt-0.5 tracking-wide break-all">
              {referenceId}
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-300 mt-0.5">
              Enter this ID on the Track Order page to follow your delivery
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={copyRefToClipboard}
              className="flex-1 sm:flex-none px-3.5 py-2 sm:py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/30 transition-all cursor-pointer"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Copied ID!' : 'Copy Reference ID'}</span>
            </button>

            <button
              onClick={handleTrackClick}
              className="flex-1 sm:flex-none px-3.5 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Track Now</span>
            </button>
          </div>
        </div>

        {/* Order Details Body - Fully scrollable with visible styled scrollbar & touch panning */}
        <div className="flex-1 overflow-y-auto overscroll-contain space-y-3.5 pr-2 text-xs min-h-0 touch-pan-y select-text custom-modal-scroll">
          {/* Customer Details Box */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-950/80 border border-gray-800/90 shadow-xs space-y-2">
            <div className="text-orange-400 font-bold uppercase tracking-wider text-[10.5px] flex items-center justify-between">
              <span>Customer & Delivery Coordinates</span>
              <span className="text-gray-400 font-normal lowercase text-[10px]">scroll for all details ↓</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="font-semibold text-white truncate">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{order.phone}</span>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span className="break-words leading-relaxed">{order.address}</span>
              </div>
              {order.notes && (
                <div className="sm:col-span-2 text-gray-300 text-[11px] italic bg-gray-900/60 p-2.5 rounded-lg border border-gray-800">
                  Special Instructions: "{order.notes}"
                </div>
              )}
            </div>
          </div>

          {/* Ordered Dishes List (Full Unconstrained Table) */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-950/80 border border-gray-800/90 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between text-gray-400 font-bold uppercase tracking-wider text-[10.5px]">
              <span>Dishes Ordered ({order.items.length})</span>
              <span>Subtotal</span>
            </div>
            <div className="divide-y divide-gray-800/90">
              {order.items.map((it, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-gray-200 hover:bg-white/[0.02] px-1 rounded-lg transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="w-5 h-5 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold flex items-center justify-center text-[11px] shrink-0">
                      {it.quantity}
                    </span>
                    <span className="font-medium text-white truncate">{it.name}</span>
                  </div>
                  <span className="font-bold text-gray-100 shrink-0">
                    Rs. {(it.price * it.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2.5 border-t border-gray-800 flex justify-between items-center text-sm">
              <span className="font-bold text-gray-300 text-xs sm:text-sm">Total (Cash on Delivery)</span>
              <span className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Rs. {order.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 mt-2 border-t border-gray-800 flex flex-col sm:flex-row gap-2 justify-between items-center shrink-0">
          <button
            onClick={copyReceiptText}
            className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-xl bg-gray-800/90 hover:bg-gray-700 active:scale-95 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReceipt ? 'Copied Receipt' : 'Copy Full Receipt'}</span>
          </button>

          <button
            onClick={handleTrackClick}
            className="w-full sm:w-auto px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Track Order Live</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
