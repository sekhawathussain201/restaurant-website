import React, { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { RESTAURANT_INFO } from '../data/dishes'

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setFormData({ name: '', phone: '', message: '' })
    }, 4000)
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us or Reach Out</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Playfair_Display']">
            Contact & Kitchen Location
          </h1>

          <p className="text-sm sm:text-base text-gray-400">
            Have questions about an event catering, dietary requirements, or express kitchen delivery? We are here to serve you royal hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-['Playfair_Display']">
                Bistro Information
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Address</h5>
                    <p className="text-gray-300 text-xs mt-0.5 leading-relaxed">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Direct Hotline</h5>
                    <a
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="text-orange-400 font-mono font-bold text-sm hover:underline mt-0.5 block"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Manager Email</h5>
                    <a
                      href={`mailto:${RESTAURANT_INFO.email}`}
                      className="text-gray-300 text-xs hover:text-white mt-0.5 block"
                    >
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase tracking-wider">Opening Hours</h5>
                    <p className="text-gray-300 text-xs mt-0.5">
                      {RESTAURANT_INFO.openingHours}
                    </p>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      Open 7 Days a Week for Dine-in & Express Takeaway
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <a
                  href={`https://wa.me/92${RESTAURANT_INFO.phone.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white font-['Playfair_Display']">
                  Send a Quick Message
                </h3>
                <p className="text-xs text-gray-400">
                  Got an inquiry or special request? We respond within 15 minutes during operating hours.
                </p>
              </div>

              {sent ? (
                <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-base">Message Dispatched!</h4>
                  <p className="text-xs text-gray-300">
                    Thank you. Our kitchen manager will contact you promptly at {formData.phone || 'your phone'}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Asad Rehman"
                      className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="e.g. 0300-1234567"
                      className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300 uppercase">Message</label>
                    <textarea
                      rows="4"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us about your event, feedback, or inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-extrabold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

