import React, { useState, useEffect } from 'react'
import { Database, RefreshCw, X, Clock, CheckCircle2, AlertCircle, Eye, ArrowRight, ShieldCheck } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function AdminPreviewDrawer({ isOpen, onClose }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: sbError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (sbError) {
        setError(sbError.message)
      } else {
        setOrders(data || [])
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchOrders()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border border-orange-500/30 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-['Playfair_Display']">
                  Supabase Live Orders Explorer
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                  Part A & B Live Sync
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Direct view into your cloud Supabase database <code className="text-orange-400 font-mono">public.orders</code> table
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-orange-400' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table / Status */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3">
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-orange-400 animate-spin mx-auto" />
              <p className="text-sm text-gray-400">Loading orders from Supabase...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 space-y-2 text-center">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-sm font-bold">Table 'orders' not found yet</p>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                {error}
              </p>
              <p className="text-xs text-amber-300 pt-2 font-mono">
                Click "Supabase Setup" in the top navbar to create the table with 1 click.
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center space-y-2 border-2 border-dashed border-gray-800 rounded-2xl">
              <Database className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-sm text-gray-400 font-semibold">No orders in Supabase yet</p>
              <p className="text-xs text-gray-500">
                Place an order using the website form to see it appear here in real-time with status "Pending"!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-950/80 text-gray-400 uppercase text-[10px] font-bold border-b border-gray-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Dishes</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80 text-gray-200">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-900/40 transition-colors">
                      <td className="p-3 font-mono text-orange-400 font-bold">#{ord.id}</td>
                      <td className="p-3">
                        <div className="font-semibold text-white">{ord.customer_name}</div>
                        <div className="text-[11px] text-gray-400">{ord.phone}</div>
                        <div className="text-[10px] text-gray-500 truncate max-w-[140px]">{ord.address}</div>
                      </td>
                      <td className="p-3 max-w-[220px]">
                        <p className="truncate text-gray-300" title={ord.dishes}>
                          {ord.dishes}
                        </p>
                      </td>
                      <td className="p-3 font-bold text-white whitespace-nowrap">
                        Rs. {Number(ord.total_amount).toLocaleString()}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : ord.status === 'Preparing'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {ord.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-3 text-gray-400 text-[10px] whitespace-nowrap">
                        {ord.created_at ? new Date(ord.created_at).toLocaleTimeString() : 'Just now'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ready for Sunday Part B Admin Dashboard & Status Changes!</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer"
          >
            Close Explorer
          </button>
        </div>
      </div>
    </div>
  )
}

