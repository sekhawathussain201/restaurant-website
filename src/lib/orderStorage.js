// Helper for generating Reference ID and managing order tracking & persistence

export function generateReferenceId() {
  const timestamp = Date.now()
  return `loc-${timestamp}`
}

export const SAMPLE_ORDERS = [
  {
    referenceId: 'loc-1791615401261',
    orderId: 'loc-1791615401261',
    customerName: 'Sekhawat Arain',
    phone: '03013864320',
    address: 'Hno E:114/stt#04, bhataibad, Gulstan-e-johar blk#09, Karachi',
    items: [
      { id: 1, name: 'Mutton Shinwari Karahi', price: 1850, quantity: 1 },
      { id: 2, name: 'Dum Pukht Royal Biryani', price: 850, quantity: 1 },
    ],
    subtotal: 2700,
    deliveryFee: 0,
    totalAmount: 2500,
    status: 'In Preparation', // 'Order Placed' | 'In Preparation' | 'Delivered'
    riderName: 'Tariq Mehmood',
    riderPhone: '0315-9876543',
    estimatedTime: '15-20 mins',
    notes: 'Please pack hot in royal thermal box.',
    timestamp: 'Today, 10 mins ago',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    referenceId: 'loc-1791614890214',
    orderId: 'loc-1791614890214',
    customerName: 'Ahmed Bilal',
    phone: '03009876543',
    address: 'Apartment 402, Al-Ghafoor Tower, Gulshan-e-Iqbal Blk 13-D, Karachi',
    items: [
      { id: 4, name: 'Smoky Charcoal Reshmi Kebab', price: 950, quantity: 1 },
      { id: 7, name: 'Saffron Shahi Kheer & Gulab Jamun', price: 450, quantity: 1 },
    ],
    subtotal: 1400,
    deliveryFee: 90,
    totalAmount: 1490,
    status: 'Order Placed',
    riderName: 'Zubair Shah',
    riderPhone: '0321-4455667',
    estimatedTime: '25-30 mins',
    notes: 'Send mint raita.',
    timestamp: 'Today, 25 mins ago',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    referenceId: 'loc-1791613250109',
    orderId: 'loc-1791613250109',
    customerName: 'Dr. Aisha Siddiqui',
    phone: '03339876543',
    address: 'House 88/B, Street 7, Clifton Block 5, Karachi',
    items: [
      { id: 1, name: 'Mutton Shinwari Karahi', price: 1850, quantity: 1 },
      { id: 3, name: 'Chicken Makhani Handi', price: 1350, quantity: 1 },
    ],
    subtotal: 3200,
    deliveryFee: 50,
    totalAmount: 3250,
    status: 'Delivered',
    riderName: 'Kamran Ali',
    riderPhone: '0345-1122334',
    estimatedTime: 'Delivered',
    notes: 'Delivered successfully at doorstep.',
    timestamp: 'Yesterday, 9:15 PM',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function getStoredOrders() {
  try {
    const saved = localStorage.getItem('smit_orders_history')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Error reading stored orders:', err)
  }
  return SAMPLE_ORDERS
}

export function getLastPlacedOrder() {
  try {
    const lastId = localStorage.getItem('smit_last_order_id')
    const all = getStoredOrders()
    if (lastId) {
      const found = all.find(o => o.referenceId === lastId || o.orderId === lastId)
      if (found) return found
    }
    if (all.length > 0) {
      return all[0]
    }
  } catch (err) {
    console.warn('Error getting last order:', err)
  }
  return null
}

export function saveOrderToStorage(order) {
  try {
    const current = getStoredOrders()
    // Prepend new order
    const updated = [order, ...current.filter(o => o.referenceId !== order.referenceId)]
    localStorage.setItem('smit_orders_history', JSON.stringify(updated))
    localStorage.setItem('smit_last_order_id', order.referenceId)
    return updated
  } catch (err) {
    console.warn('Error saving order to storage:', err)
    return [order, ...SAMPLE_ORDERS]
  }
}

export function updateOrderStatusInStorage(referenceId, newStatus) {
  try {
    const orders = getStoredOrders()
    const cleanId = String(referenceId || '').trim().toLowerCase()
    const updated = orders.map(ord => {
      const ordRef = String(ord.referenceId || '').toLowerCase()
      const ordId = String(ord.orderId || '').toLowerCase()
      const ordSbId = String(ord.supabaseId || '').toLowerCase()
      const ordNumId = String(ord.id || '').toLowerCase()

      if (
        ordRef === cleanId ||
        ordId === cleanId ||
        ordSbId === cleanId ||
        ordNumId === cleanId ||
        ordRef.includes(cleanId) ||
        cleanId.includes(ordRef)
      ) {
        return { ...ord, status: newStatus, updatedAt: new Date().toISOString() }
      }
      return ord
    })
    localStorage.setItem('smit_orders_history', JSON.stringify(updated))
    window.dispatchEvent(new Event('orders_updated'))
    return updated
  } catch (err) {
    console.warn('Error updating order status in storage:', err)
    return getStoredOrders()
  }
}

export function deleteOrderFromStorage(referenceId) {
  try {
    const orders = getStoredOrders()
    const cleanId = String(referenceId || '').trim().toLowerCase()
    const updated = orders.filter(ord => {
      const ordRef = String(ord.referenceId || '').toLowerCase()
      const ordId = String(ord.orderId || '').toLowerCase()
      return ordRef !== cleanId && ordId !== cleanId
    })
    localStorage.setItem('smit_orders_history', JSON.stringify(updated))
    window.dispatchEvent(new Event('orders_updated'))
    return updated
  } catch (err) {
    console.warn('Error deleting order from storage:', err)
    return getStoredOrders()
  }
}


/**
 * Universal flexible order lookup by Reference ID, Phone, or Name
 */
export function findOrderByReferenceOrPhone(query) {
  if (!query) return null
  const raw = String(query).trim()
  if (!raw) return null

  // Normalize: remove spaces, hyphens, and 'loc-' prefix for numeric search
  const cleanQuery = raw.toLowerCase().replace(/[\s\-_#]/g, '')
  const digitsOnly = raw.replace(/\D/g, '')
  const orders = getStoredOrders()

  // 1. Exact match or partial match on Reference ID (e.g. 'loc-1791615401261' or '1791615401261')
  let found = orders.find(o => {
    const cleanRef = String(o.referenceId || '').toLowerCase().replace(/[\s\-_#]/g, '')
    const cleanOrder = String(o.orderId || '').toLowerCase().replace(/[\s\-_#]/g, '')
    return (
      cleanRef === cleanQuery ||
      cleanOrder === cleanQuery ||
      cleanRef.includes(cleanQuery) ||
      cleanQuery.includes(cleanRef) ||
      (digitsOnly && cleanRef.includes(digitsOnly))
    )
  })

  if (found) return found

  // 2. Phone match
  if (digitsOnly.length >= 6) {
    found = orders.find(o => {
      const orderDigits = String(o.phone || '').replace(/\D/g, '')
      return orderDigits.includes(digitsOnly) || digitsOnly.includes(orderDigits)
    })
    if (found) return found
  }

  // 3. Customer name match
  const lowerName = raw.toLowerCase()
  found = orders.find(o => String(o.customerName || '').toLowerCase().includes(lowerName))
  if (found) return found

  return null
}
