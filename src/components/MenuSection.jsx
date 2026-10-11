import React, { useState, useEffect } from 'react'
import { Plus, Minus, Star, Clock, Flame } from 'lucide-react'
import { getAllDishes, CATEGORIES } from '../data/dishes'

export function MenuSection({ cartItems, onAddToCart, onUpdateQuantity }) {
  const [allDishes, setAllDishes] = useState(() => getAllDishes())
  const [selectedCategory, setSelectedCategory] = useState("All Dishes")

  useEffect(() => {
    const handleUpdate = () => setAllDishes(getAllDishes())
    window.addEventListener('dishes_updated', handleUpdate)
    return () => window.removeEventListener('dishes_updated', handleUpdate)
  }, [])

  const filteredDishes = selectedCategory === "All Dishes"
    ? allDishes
    : allDishes.filter(d => d.category === selectedCategory)


  const getItemQuantity = (dishId) => {
    const item = cartItems.find(i => i.id === dishId)
    return item ? item.quantity : 0
  }

  return (
    <section id="menu" className="py-20 sm:py-24 lg:py-28 bg-gray-950/60 relative border-t border-gray-800/80">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            <span>Our Gourmet Selection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Playfair_Display']">
            Signature Menu & Royal Delicacies
          </h2>

          <p className="text-sm sm:text-base text-gray-400">
            Handcrafted with age-old secret spice blends, organic ingredients, and cooked fresh upon your order. Select your dishes below to build your custom feast.
          </p>

          {/* Category Filter Pills (iPad & tablet friendly) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {CATEGORIES.map(category => {
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

        {/* Dishes Grid (iPad & Tablet optimized) */}
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

                  {/* Badges on top */}
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

                  {/* Prep time badge */}
                  <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[11px] text-gray-300">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>{dish.prepTime}</span>
                  </div>
                </div>

                {/* Content details */}
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

                  {/* Price and Bigger Centered Add to Order Button */}
                  <div className="pt-3 border-t border-gray-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Price</span>
                      <div className="text-lg sm:text-xl font-black text-white">
                        Rs. {dish.price.toLocaleString()}
                      </div>
                    </div>

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
      </div>
    </section>
  )
}
