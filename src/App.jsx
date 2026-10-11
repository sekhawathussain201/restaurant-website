import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { MenuPage } from './pages/MenuPage'
import { OrderPage } from './pages/OrderPage'
import { TrackOrderPage } from './pages/TrackOrderPage'
import { ReviewsPage } from './pages/ReviewsPage'
import { ContactPage } from './pages/ContactPage'
import { AdminPage } from './pages/AdminPage'
import { CartDrawer } from './components/CartDrawer'
import { OrderSuccessModal } from './components/OrderSuccessModal'
import { SupabaseGuideModal } from './components/SupabaseGuideModal'
import { AdminPreviewDrawer } from './components/AdminPreviewDrawer'
import { RecipientEmailModal } from './components/RecipientEmailModal'
import { Footer } from './components/Footer'
import { DISHES } from './data/dishes'
import { CheckCircle2, ArrowUp } from 'lucide-react'

// Auto scroll to top upon navigating to a new route (Instant scroll for iPhone & mobile browsers)
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])
  return null
}

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('smit_cart_items')
      return saved ? JSON.parse(saved) : [
        { ...DISHES[0], quantity: 1 },
        { ...DISHES[1], quantity: 1 },
      ]
    } catch {
      return []
    }
  })

  // Recipient Gmail state
  const [recipientEmail, setRecipientEmail] = useState(() => {
    try {
      return localStorage.getItem('smit_recipient_email') || 'sekhawatarain79@gmail.com'
    } catch {
      return 'sekhawatarain79@gmail.com'
    }
  })

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('')

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false)
  const [isAdminExplorerOpen, setIsAdminExplorerOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smit_cart_items', JSON.stringify(cartItems))
    } catch (err) {
      console.warn('Storage save notice:', err)
    }
  }, [cartItems])

  // Save recipient email
  const handleSaveEmail = (email) => {
    setRecipientEmail(email)
    try {
      localStorage.setItem('smit_recipient_email', email)
    } catch (err) {
      console.warn('Email storage error:', err)
    }
    showToast(`Recipient email updated to ${email}`)
  }

  // Scroll listener for top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3000)
  }

  // Cart actions
  const handleAddToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id)
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...dish, quantity: 1 }]
    })
    showToast(`Added ${dish.name} to your order!`)
  }

  const handleUpdateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(dishId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveItem = (dishId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== dishId))
  }

  const handleClearCart = () => {
    setCartItems([])
    showToast('Your order has been cleared')
  }

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0)

  // Dedicated full-screen admin layout matching localhost:3000/admin.html
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#070B14] text-gray-100 font-sans selection:bg-orange-500 selection:text-white">
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<AdminPage />} />
        </Routes>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col font-sans relative selection:bg-orange-500 selection:text-white">
      <ScrollToTop />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-3.5 px-5 rounded-2xl bg-orange-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar with Reviews & Multipage links */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Multipage Routes Container */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/menu"
            element={
              <MenuPage
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
          />
          <Route
            path="/order"
            element={
              <OrderPage
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                recipientEmail={recipientEmail}
                setRecipientEmail={handleSaveEmail}
                onOrderSuccess={(orderData) => {
                  setLastPlacedOrder(orderData)
                  handleClearCart()
                }}
                onOpenSqlModal={() => setIsSqlModalOpen(true)}
              />
            }
          />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="*"
            element={<HomePage onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </main>


      {/* Footer */}
      <Footer
        onOpenSqlModal={() => setIsSqlModalOpen(true)}
        onOpenAdminExplorer={() => setIsAdminExplorerOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false)
          navigate('/order')
        }}
      />

      {/* Order Success Modal with Reference ID & Tracking link */}
      <OrderSuccessModal
        order={lastPlacedOrder}
        onClose={() => setLastPlacedOrder(null)}
        onTrackOrder={(refId) => {
          navigate(`/track?id=${refId}`)
        }}
      />

      {/* Admin / Dev modals accessible discreetly from footer */}
      <SupabaseGuideModal
        isOpen={isSqlModalOpen}
        onClose={() => setIsSqlModalOpen(false)}
      />

      <AdminPreviewDrawer
        isOpen={isAdminExplorerOpen}
        onClose={() => setIsAdminExplorerOpen(false)}
      />

      <RecipientEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        currentEmail={recipientEmail}
        onSave={handleSaveEmail}
      />

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-orange-500 text-white shadow-xl hover:bg-orange-600 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

export default App
