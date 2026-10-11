import React from 'react'
import { Sparkles, Clock, Star, Flame, ArrowRight, ShieldCheck, ShoppingBag, Compass, Play } from 'lucide-react'
import { RESTAURANT_INFO } from '../data/dishes'

export function Hero({ onExploreMenu, onQuickOrder, onNavigate }) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-orange-500/30 text-orange-400 text-xs sm:text-sm font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Welcome to {RESTAURANT_INFO.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-['Playfair_Display'] leading-[1.15]">
              Royal Flavours <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Delivered Hot & Fresh
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Immerse yourself in authentic Dum Pukht aromatic biryanis, sizzling charcoal Karahis, and gourmet artisanal feasts. Place your order online, track your meal in real-time with your unique <strong className="text-orange-400">Reference ID</strong>, and enjoy fresh, piping hot royal dining right at your doorstep!
            </p>

            {/* Badges / Stats Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/60 border border-gray-700/80">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">4.9 / 5.0</span>
                <span className="text-gray-400">(2,500+ Reviews)</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/60 border border-gray-700/80">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-white">25 - 35 Mins</span>
                <span className="text-gray-400">Express Delivery</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/60 border border-gray-700/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">100% Halal</span>
                <span className="text-gray-400">& Hygienic</span>
              </div>
            </div>

            {/* Action Buttons: Order Now + Track Order + View Menu */}
            <div className="pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="/order"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/order');
                  }
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Place Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/track"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/track');
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gray-900/90 hover:bg-gray-800 border border-orange-500/40 text-orange-400 hover:text-orange-300 font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-orange-400" />
                <span>Track Order</span>
              </a>

              <a
                href="/menu"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('/menu');
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-panel border border-gray-700 text-gray-200 font-bold text-sm sm:text-base hover:bg-gray-800/80 hover:text-white hover:border-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span>View Full Menu</span>
              </a>

              <a
                href="#media-showcase"
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                <Play className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Watch Promo Video</span>
              </a>
            </div>
          </div>

          {/* Right Column: Animated Visual Dish Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient halo glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-amber-500/20 rounded-full blur-2xl transform scale-90" />

            {/* Main Featured Dish Card */}
            <div className="relative w-full max-w-md glass-card rounded-3xl p-5 border border-orange-500/30 shadow-2xl overflow-hidden group">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                  alt="Mutton Shinwari Karahi"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />

                {/* Floating Discount / Status Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-orange-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  <span>Chef's Masterpiece</span>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold flex items-center gap-1 shadow-lg border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>4.9 (248)</span>
                </div>

                {/* Dish Info overlay at bottom of image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-xl font-bold text-white font-['Playfair_Display']">
                    Mutton Shinwari Karahi
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-1">
                    Organic mutton braised in tomatoes & charcoal wok
                  </p>
                </div>
              </div>

              {/* Bottom Card Row */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs text-gray-400 uppercase font-medium">Special Price</span>
                  <div className="text-2xl font-black text-white">
                    Rs. 1,850 <span className="text-xs text-gray-400 font-normal line-through">Rs. 2,100</span>
                  </div>
                </div>

                <button
                  onClick={() => onQuickOrder && onQuickOrder(1)}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold flex items-center gap-1.5 shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>

            {/* Floating Micro Card 1: Fast Delivery badge */}
            <div className="hidden sm:flex absolute -top-4 -left-6 glass-panel px-4 py-2.5 rounded-2xl border border-gray-700 shadow-2xl items-center gap-3 animate-float">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                ⚡
              </div>
              <div>
                <p className="text-xs font-bold text-white">25-35 Mins Delivery</p>
                <p className="text-[10px] text-emerald-400 font-medium">Hot & Fresh at Doorstep</p>
              </div>
            </div>

            {/* Floating Micro Card 2: Live Tracking */}
            <div className="hidden sm:flex absolute -bottom-5 -right-4 glass-panel px-4 py-2.5 rounded-2xl border border-gray-700 shadow-2xl items-center gap-3 animate-float-delayed">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                📍
              </div>
              <div>
                <p className="text-xs font-bold text-white">Live Order Tracking</p>
                <p className="text-[10px] text-orange-300 font-medium">Track with Reference ID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

