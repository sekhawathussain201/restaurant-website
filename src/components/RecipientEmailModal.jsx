import React, { useState } from 'react'
import { Mail, X, Check, AlertCircle } from 'lucide-react'

export function RecipientEmailModal({ isOpen, onClose, currentEmail, onSave }) {
  const [email, setEmail] = useState(currentEmail)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      onSave(email.trim())
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-orange-500/40 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-gray-800/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-['Playfair_Display']">
              Recipient Gmail Settings
            </h3>
            <p className="text-xs text-gray-400">Requirement 3: Order comes to your Gmail</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-300 block mb-1.5">
              Enter Your Personal Gmail Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. yourname@gmail.com"
              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm font-mono"
            />
            <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">
              When an order is placed, full order details (dishes, quantity, total, name, phone, address) will be dispatched directly to this Gmail!
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-orange-500/30"
            >
              <Check className="w-4 h-4" />
              <span>Save & Use Gmail</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

