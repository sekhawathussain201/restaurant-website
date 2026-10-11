import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { VideoShowcase } from '../components/VideoShowcase'
import { DISHES } from '../data/dishes'
import { INITIAL_REVIEWS } from '../data/reviews'
import {
  Star,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Plus,
  CheckCircle2,
  Compass
} from 'lucide-react'


export function HomePage({ onAddToCart }) {
  const navigate = useNavigate()

  // Select 4 bestsellers
  const featuredDishes = DISHES.filter(d => d.isBestseller).slice(0, 4)

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <Hero
        onExploreMenu={() => navigate('/menu')}
        onQuickOrder={(dishId) => {
          const dish = DISHES.find(d => d.id === dishId)
          if (dish && onAddToCart) onAddToCart(dish)
          navigate('/order')
        }}
        onNavigate={(path) => navigate(path)}
      />

      {/* 2. Featured Signature Dishes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef's Choice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Playfair_Display']">
              Featured Royal Dishes
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Top-voted favourites by over 2,500 Karachi food enthusiasts.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors group"
          >
            <span>Explore All 14 Dishes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="glass-card rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />

                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold">
                  Bestseller
                </div>

                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 text-amber-300 text-[11px] font-bold flex items-center gap-1 border border-amber-500/30">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>{dish.rating}</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                    {dish.category}
                  </span>
                  <h3 className="text-base font-bold text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Price</span>
                    <span className="text-base font-black text-white">
                      Rs. {dish.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-center w-full">
                    <button
                      onClick={() => {
                        if (onAddToCart) onAddToCart(dish)
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Royal Media & Social Videos Showcase */}
      <VideoShowcase />

      {/* 4. Customer Reviews Teaser (User Request: Link to reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gray-800 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>Loved by Food Lovers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Playfair_Display']">
                What Our Customers Say
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Rated <strong className="text-white">4.9 / 5.0</strong> based on 2,500+ happy diners in Karachi.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/reviews"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-bold shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Read All Reviews</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_REVIEWS.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-gray-900/80 border border-gray-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500">{rev.date}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-800/80">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center">
                    {rev.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{rev.name}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </h5>
                    <p className="text-[10px] text-gray-400">{rev.dish}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Fast Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Playfair_Display']">
              Craving Royal Taste Tonight?
            </h3>
            <p className="text-orange-100 text-sm max-w-xl">
              Place your order now! Get a unique Reference ID to track the rider in real-time, plus free delivery on orders above Rs. 2,500.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/order"
              className="px-8 py-3.5 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </Link>
            <Link
              to="/track"
              className="px-6 py-3.5 rounded-xl bg-black/30 hover:bg-black/50 text-white font-bold text-sm border border-white/30 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Track Existing Order</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

