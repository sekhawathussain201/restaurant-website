import React, { useState } from 'react'
import {
  CheckCircle2,
  X,
  Copy,
  Check,
  Receipt,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Compass,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export function OrderSuccessModal({ order, onClose, onTrackOrder }) {
  const [copiedRef, setCopiedRef] = useState(false)
  const [copiedReceipt, setCopiedReceipt] = useState(false)

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-5 sm:p-7 md:p-8 border border-orange-500/40 shadow-2xl overflow-hidden max-h-[92vh] md:max-h-[88vh] flex flex-col">
        {/* Top decorative gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-gray-800/60 hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 mb-5 shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 shadow-lg">
            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Playfair_Display']">
            Order Confirmed!
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            Thank you, <strong className="text-white">{order.customerName}</strong>! Your feast has been sent to our royal kitchen.
          </p>
        </div>

        {/* Prominent Tracking Reference ID Card */}
        <div className="mb-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-950/70 via-amber-950/50 to-orange-950/70 border border-orange-500/50 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-center sm:text-left">
            <div className="text-[11px] font-bold text-orange-300 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Your Order Tracking ID</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              {referenceId}
            </div>
            <p className="text-[11px] text-gray-300 mt-0.5">
              Enter this ID on the Track Order page to follow your delivery
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyRefToClipboard}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/30 transition-all cursor-pointer"
            >
              {copiedRef ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedRef ? 'Copied ID!' : 'Copy Reference ID'}</span>
            </button>

            <button
              onClick={handleTrackClick}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Track Now</span>
            </button>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
          {/* Customer Details Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-950/60 border border-gray-800 space-y-2">
            <div className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
              Customer & Delivery Coordinates
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="font-semibold text-white">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{order.phone}</span>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>{order.address}</span>
              </div>
              {order.notes && (
                <div className="sm:col-span-2 text-gray-400 text-[11px] italic">
                  Note: "{order.notes}"
                </div>
              )}
            </div>
          </div>

          {/* Ordered Dishes List (Table layout) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-950/60 border border-gray-800 space-y-2.5">
            <div className="flex items-center justify-between text-gray-400 font-bold uppercase tracking-wider text-[10px]">
              <span>Dishes Ordered ({order.items.length})</span>
              <span>Subtotal</span>
            </div>
            <div className="divide-y divide-gray-800/80">
              {order.items.map((it, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-gray-800 text-orange-400 font-bold flex items-center justify-center text-[11px]">
                      {it.quantity}
                    </span>
                    <span className="font-medium text-white">{it.name}</span>
                  </div>
                  <span className="font-bold">
                    Rs. {(it.price * it.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-sm">
              <span className="font-bold text-gray-300">Total (Cash on Delivery)</span>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Rs. {order.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions: Clean layout without Gmail receipt */}
        <div className="pt-3.5 mt-3 border-t border-gray-800 flex flex-col sm:flex-row gap-2.5 justify-between items-center shrink-0">
          <button
            onClick={copyReceiptText}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReceipt ? 'Copied Receipt' : 'Copy Full Receipt'}</span>
          </button>

          <button
            onClick={handleTrackClick}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
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
