import React from 'react'
import { Link } from 'react-router-dom'
import {
  UtensilsCrossed,
  Phone,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  Compass,
  Star,
  Flame,
  Database,
  ArrowUp
} from 'lucide-react'
import { RESTAURANT_INFO } from '../data/dishes'

export function Footer({ onOpenSqlModal, onOpenAdminExplorer }) {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-['Playfair_Display']">
                {RESTAURANT_INFO.name}
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              {RESTAURANT_INFO.tagline}. Handcrafted with premium ingredients, authentic dum cooking, and delivered fresh to your doorstep.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Halal Certified Kitchen</span>
            </div>
          </div>

          {/* Col 2: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-['Playfair_Display'] uppercase tracking-wider">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-orange-400 transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-orange-400 transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Pages */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-['Playfair_Display'] uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="space-y-2 text-gray-300">
              <div>
                <Link to="/" className="hover:text-orange-400 transition-colors">
                  Home
                </Link>
              </div>
              <div>
                <Link to="/menu" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>Royal Menu</span>
                </Link>

              </div>
              <div>
                <Link to="/order" className="hover:text-orange-400 transition-colors">
                  Order Online & Checkout
                </Link>
              </div>
              <div>
                <Link to="/track" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-orange-400" />
                  <span>Track Order (Reference ID)</span>
                </Link>
              </div>
              <div>
                <Link to="/reviews" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>Customer Reviews (4.9/5)</span>
                </Link>
              </div>
              <div>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">
                  Contact & Location
                </Link>
              </div>
            </div>
          </div>


          {/* Col 4: Express Service Guarantee */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-['Playfair_Display'] uppercase tracking-wider">
              Express Delivery
            </h4>
            <div className="space-y-2 text-gray-400 text-xs">
              <p>• <strong>Free Delivery:</strong> On orders above Rs. 2,500</p>
              <p>• <strong>Delivery Time:</strong> 25 - 35 minutes across Karachi</p>
              <p>• <strong>Payment Method:</strong> Cash on Delivery (COD)</p>
              <p>• <strong>Tracking:</strong> Live Reference ID updates</p>
            </div>

            {/* Developer / Evaluator tools discreet access */}
            {(onOpenSqlModal || onOpenAdminExplorer) && (
              <div className="pt-3 border-t border-gray-800/80 flex flex-wrap gap-2 text-[11px]">
                {onOpenSqlModal && (
                  <button
                    onClick={onOpenSqlModal}
                    className="text-gray-500 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Database className="w-3 h-3" />
                    <span>Supabase Schema</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-gray-500 text-xs">
            © 2026 {RESTAURANT_INFO.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-orange-400 flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
