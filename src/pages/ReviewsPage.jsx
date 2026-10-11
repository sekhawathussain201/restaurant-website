import React, { useState } from 'react'
import {
  Star,
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  Sparkles,
  Plus,
  X,
  Filter,
  Send,
  Heart
} from 'lucide-react'
import { getStoredReviews, saveReviewToStorage } from '../data/reviews'
import { DISHES } from '../data/dishes'
import confetti from 'canvas-confetti'

export function ReviewsPage() {
  const [reviews, setReviews] = useState(() => getStoredReviews())
  const [filter, setFilter] = useState('All')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Review Form State
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    dish: DISHES[0].name,
    comment: '',
  })
  const [hoverRating, setHoverRating] = useState(0)
  const [formError, setFormError] = useState('')
  const [helpfulCounts, setHelpfulCounts] = useState({})

  const handleHelpful = (id) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    setFormError('')

    if (!newReview.name.trim()) {
      setFormError('Please enter your name.')
      return
    }
    if (!newReview.comment.trim()) {
      setFormError('Please share a few words about your experience.')
      return
    }

    const reviewObj = {
      id: `rev-${Date.now()}`,
      name: newReview.name.trim(),
      rating: newReview.rating,
      date: 'Just now',
      dish: newReview.dish,
      avatar: newReview.name
        .trim()
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'CU',
      verified: true,
      comment: newReview.comment.trim(),
    }

    const updated = saveReviewToStorage(reviewObj)
    setReviews(updated)
    setIsModalOpen(false)

    // Reset form
    setNewReview({
      name: '',
      rating: 5,
      dish: DISHES[0].name,
      comment: '',
    })

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    } catch (err) {
      console.log('Confetti feedback:', err)
    }
  }

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (filter === 'All') return true
    if (filter === '5 Stars') return r.rating === 5
    if (filter === 'Biryani') return r.dish.toLowerCase().includes('biryani')
    if (filter === 'Karahi') return r.dish.toLowerCase().includes('karahi')
    if (filter === 'BBQ') return r.dish.toLowerCase().includes('kebab') || r.dish.toLowerCase().includes('bbq')
    return true
  })

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Verified Customer Reviews</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-['Playfair_Display']">
            Taste & Experience Reviews
          </h1>

          <p className="text-sm sm:text-base text-gray-400">
            Real dining impressions from thousands of passionate food lovers across Karachi. Share your own experience or see why our royal feasts are celebrated.
          </p>
        </div>

        {/* Rating Overview Scorecard */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-gray-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Score */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r lg:border-gray-800 lg:pr-8">
              <div className="text-5xl sm:text-6xl font-black text-white font-['Playfair_Display']">
                4.9
                <span className="text-2xl text-gray-400 font-normal"> / 5.0</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Based on <strong className="text-white">2,500+ verified ratings</strong> & reviews
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-extrabold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write a Review</span>
                </button>
              </div>
            </div>

            {/* Middle Rating Bars */}
            <div className="lg:col-span-5 space-y-2.5">
              {[
                { stars: '5 Star', pct: '92%' },
                { stars: '4 Star', pct: '6%' },
                { stars: '3 Star', pct: '2%' },
                { stars: '2 Star', pct: '0%' },
                { stars: '1 Star', pct: '0%' },
              ].map((bar) => (
                <div key={bar.stars} className="flex items-center gap-3 text-xs">
                  <span className="text-gray-400 w-12 font-medium">{bar.stars}</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                      style={{ width: bar.pct }}
                    />
                  </div>
                  <span className="text-gray-400 w-8 text-right font-mono">{bar.pct}</span>
                </div>
              ))}
            </div>

            {/* Right Highlights */}
            <div className="lg:col-span-3 space-y-3 bg-gray-950/60 p-5 rounded-2xl border border-gray-800/80 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>99% Food Quality Satisfaction</span>
              </div>
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>97% On-Time Express Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Easy Live Order Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {['All', '5 Stars', 'Biryani', 'Karahi', 'BBQ'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Have you tasted our food? Leave feedback</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 rounded-3xl border border-gray-800 flex flex-col justify-between space-y-5 hover:border-orange-500/40 transition-all group"
            >
              <div className="space-y-3">
                {/* Rating stars & date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500">{rev.date}</span>
                </div>

                {/* Dish tag */}
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold">
                  {rev.dish}
                </div>

                {/* Comment body */}
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom reviewer coordinates */}
              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 text-xs font-bold flex items-center justify-center">
                    {rev.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{rev.name}</span>
                      {rev.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Customer" />
                      )}
                    </h5>
                    <p className="text-[10px] text-gray-400">Karachi Foodie</p>
                  </div>
                </div>

                {/* Helpful count */}
                <button
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-orange-400 transition-colors cursor-pointer"
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{helpfulCounts[rev.id] || 12}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Write a Review */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-orange-500/40 shadow-2xl space-y-6">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-gray-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Experience</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-['Playfair_Display']">
                Write a Customer Review
              </h3>
              <p className="text-xs text-gray-400">
                Let others know what you thought of the flavors, cooking, and delivery.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Rating Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReview((p) => ({ ...p, rating: star }))}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || newReview.rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-orange-400 font-bold ml-2">
                    {hoverRating || newReview.rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase">
                  Your Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Tariq Mehmood"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>

              {/* Dish */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase">
                  Dish You Tasted
                </label>
                <select
                  value={newReview.dish}
                  onChange={(e) => setNewReview((p) => ({ ...p, dish: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white focus:outline-none focus:border-orange-500 text-sm"
                >
                  {DISHES.map((d) => (
                    <option key={d.id} value={d.name} className="bg-gray-900 text-white">
                      {d.name} ({d.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase">
                  Your Honest Review <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows="3"
                  value={newReview.comment}
                  onChange={(e) => setNewReview((p) => ({ ...p, comment: e.target.value }))}
                  placeholder="Tell us about the aroma, tenderness, spice balance, and speed of delivery..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-950/80 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-extrabold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publish Review</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

