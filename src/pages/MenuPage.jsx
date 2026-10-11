import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllDishes, CATEGORIES } from '../data/dishes'
import {
  Flame,
  Star,
  Clock,
  Plus,
  Minus,
  Search,
  ShoppingBag,
  ArrowRight
} from 'lucide-react'

export function MenuPage({ cartItems, onAddToCart, onUpdateQuantity, onOpenCart }) {
  const [allDishes, setAllDishes] = useState(() => getAllDishes())
  const [selectedCategory, setSelectedCategory] = useState('All Dishes')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleUpdate = () => setAllDishes(getAllDishes())
    window.addEventListener('dishes_updated', handleUpdate)
    return () => window.removeEventListener('dishes_updated', handleUpdate)
  }, [])

  const getItemQuantity = (dishId) => {
    const item = cartItems.find((i) => i.id === dishId)
    return item ? item.quantity : 0
  }

  // Filter dishes by category and search term
  const filteredDishes = allDishes.filter((dish) => {
    const matchesCategory =
      selectedCategory === 'All Dishes' || dish.category === selectedCategory
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dish.tags && dish.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
    return matchesCategory && matchesSearch
  })


  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0)
  const totalCartPrice = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0)

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            <span>Handcrafted Royal Delicacies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Playfair_Display']">
            Our Complete Menu
          </h1>

          <p className="text-sm sm:text-base text-gray-400">
            Explore 14 authentic culinary masterpieces. Prepared fresh upon your order using genuine charcoal woks, aged basmati rice, and slow Dum Pukht techniques.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto pt-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Biryani, Karahi, Kebab)..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-900/90 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (iPad & mobile responsive) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                      : 'bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dishes Grid (Optimized for iPad Mini, iPad Air & Pro: sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4) */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 space-y-3 glass-card rounded-3xl border border-gray-800 max-w-md mx-auto">
            <p className="text-gray-400 text-sm">No dishes found matching "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All Dishes')
              }}
              className="text-xs text-orange-400 underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {filteredDishes.map((dish) => {
              const qty = getItemQuantity(dish.id)

              return (
                <div
                  key={dish.id}
                  className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-gray-800 hover:border-orange-500/40 transition-all duration-300"
                >
                  {/* Image and badges */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-900">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />

                    {/* Tags */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      {dish.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-600/90 text-white shadow"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[11px] font-bold flex items-center gap-1 border border-amber-500/30">
                      <Star className="w-3 h-3 fill-amber-300" />
                      <span>{dish.rating}</span>
                    </div>

                    <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[11px] text-gray-300">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{dish.prepTime}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                        {dish.category}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-300 transition-colors mt-0.5 line-clamp-1 font-['Playfair_Display']">
                        {dish.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Price & Bigger Centered Add to Order Button */}
                    <div className="pt-3 border-t border-gray-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Price</span>
                        <div className="text-lg sm:text-xl font-black text-white">
                          Rs. {dish.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Bigger Centered Add Button as requested */}
                      <div className="flex justify-center w-full">
                        {qty === 0 ? (
                          <button
                            onClick={() => onAddToCart(dish)}
                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>Add to Order</span>
                          </button>
                        ) : (
                          <div className="w-full flex items-center justify-between bg-gray-900 border-2 border-orange-500/50 rounded-xl p-1 shadow-inner">
                            <button
                              onClick={() => onUpdateQuantity(dish.id, qty - 1)}
                              className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4 stroke-[2.5]" />
                            </button>
                            <span className="text-xs font-black text-orange-400 px-2">
                              {qty} in Order
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(dish.id, qty + 1)}
                              className="w-9 h-9 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Quick Checkout Bar when Cart has items */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] animate-slideUp">
          <div className="glass-panel p-3.5 px-5 rounded-2xl border border-orange-500/40 shadow-2xl flex items-center justify-between gap-4 bg-gray-900/95 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  {totalCartCount} {totalCartCount === 1 ? 'dish' : 'dishes'} in Order
                </p>
                <p className="text-xs text-orange-400 font-extrabold">
                  Rs. {totalCartPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCart}
                className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold cursor-pointer"
              >
                View Order
              </button>
              <Link
                to="/order"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-orange-500/30 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
