import React from 'react'
import { Link } from 'react-router-dom'
import { OrderForm } from '../components/OrderForm'
import { ArrowLeft, Sparkles } from 'lucide-react'

export function OrderPage({
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
  return (
    <div className="pt-24 pb-16">
      {/* Top Breadcrumb & Notification */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu Selection</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-orange-400 font-semibold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Reference ID generated upon order</span>
          </div>
        </div>
      </div>

      {/* Main Order Form Component */}
      <OrderForm
        cartItems={cartItems}
        onAddToCart={onAddToCart}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onClearCart={onClearCart}
        recipientEmail={recipientEmail}
        setRecipientEmail={setRecipientEmail}
        onOrderSuccess={onOrderSuccess}
        onOpenSqlModal={onOpenSqlModal}
      />
    </div>
  )
}

