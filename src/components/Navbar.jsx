import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  UtensilsCrossed,
  ShoppingBag,
  Flame,
  Menu,
  X,
  Compass,
  Star,
  Home,
  Clock,
  PhoneCall,
  Film
} from 'lucide-react'


export function Navbar({ cartCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto close mobile drawer on route change (iPhone / mobile optimization)
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Customer Nav links (No 14 Dishes badge)
  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Menu', path: '/menu', icon: Flame },
    { label: 'Order Now', path: '/order', icon: ShoppingBag },
    { label: 'Track Order', path: '/track', icon: Compass },
    { label: 'Reviews', path: '/reviews', icon: Star, highlight: true },
    { label: 'Videos', path: '/#media-showcase', icon: Film },
  ]




  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleNavClick = (path) => {
    setMobileMenuOpen(false)
    if (path === '/#media-showcase') {
      const el = document.getElementById('media-showcase')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel shadow-2xl py-2.5 sm:py-3 border-b border-orange-500/20'
          : 'bg-[#0B0F19]/90 backdrop-blur-md py-3 sm:py-4 border-b border-gray-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Restaurant Name */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300">
                  <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-white font-['Playfair_Display'] group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  Zaiqa Royal <span className="text-orange-500 text-xs sm:text-sm font-sans px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30">Grill</span>
                </span>
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-0.5">
                  Bistro & Express Kitchen
                </p>
              </div>
            </Link>
          </div>


          {/* Desktop & iPad Nav Links with matching icons */}
          <div className="hidden md:flex items-center gap-3.5 lg:gap-6 text-xs lg:text-sm font-semibold">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              const Icon = link.icon

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`relative py-1 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    active
                      ? 'text-orange-400 font-bold'
                      : 'text-gray-300 hover:text-orange-400'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      link.highlight ? 'text-amber-400 fill-amber-400/20' : 'text-orange-500'
                    }`}
                  />
                  <span>{link.label}</span>

                  {link.badge && (
                    <span className="hidden lg:inline-block text-[10px] px-1.5 py-0.2 rounded-md bg-orange-500/15 text-orange-400 font-bold border border-orange-500/20">
                      {link.badge}
                    </span>
                  )}

                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Header Action Buttons: Track Order button next to Order button */}
          <div className="flex items-center gap-2 sm:gap-2.5">



            {/* Direct Track Order Button */}
            <Link
              to="/track"
              onClick={handleNavClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-gray-300 hover:text-orange-400 border border-gray-800 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Track Your Order Live"
            >
              <Compass className="w-3.5 h-3.5 text-orange-400" />
              <span>Track Order</span>
            </Link>

            {/* Cart / Order button: My Order */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              aria-label="View Order"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">My Order</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 bg-white text-orange-600 rounded-full text-xs font-black shadow animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg bg-gray-800/60 border border-gray-700 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown navigation with matching icons */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-800 flex flex-col gap-1.5 pb-3 animate-fadeIn">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              const Icon = link.icon

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={`px-3.5 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors active:scale-[0.98] ${
                    active
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                      : 'text-gray-300 hover:bg-gray-800/60 hover:text-white active:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-orange-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}


            <div className="pt-2.5 mt-1 border-t border-gray-800/80 flex items-center justify-between px-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-400" /> 12 PM - 2 AM
              </span>
              <a href="tel:03013864320" className="text-orange-400 font-bold hover:underline flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" /> 0301-3864320
              </a>
            </div>
          </div>
        )}

      </div>
    </nav>
  )
}
