import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = 'https://kpdcqcdrtoagkqiamyux.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZGNxY2RydG9hZ2txaWFteXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE1OTk2NDQsImV4cCI6MjEwNzE3NTY0NH0.zZR_LKTO7GOL7A6gcMTcT-GMfq_jqk0CiApiT_Wlvm4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Checks if the 'orders' table exists and is accessible
 */
export async function testOrdersTable() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .limit(1)

    if (error) {
      return { ok: false, error: error.message, code: error.code }
    }
    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

/**
 * Saves a new order into the Supabase 'orders' table.
 * Passes the timestamp numeric ID directly into Supabase 'id' and 'notes'.
 */
export async function saveOrderToSupabase(orderData) {
  try {
    const timestampMs = orderData.timestampMs || Date.now()
    const refId = orderData.referenceId || `loc-${timestampMs}`

    const payload = {
      id: timestampMs, // Stored directly as Supabase BIGINT ID
      customer_name: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      dishes: orderData.dishesSummary,
      items: orderData.items || [],
      total_amount: Number(orderData.totalAmount),
      status: 'Pending',
      notes: `${refId} ${orderData.notes ? `| ${orderData.notes}` : ''}`.trim(),
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([payload])
      .select()

    if (error) {
      console.warn('Supabase insertion with explicit id notice, retrying fallback:', error.message)
      // Fallback: let Supabase generate sequential identity if explicit ID has conflict
      const fallbackPayload = { ...payload }
      delete fallbackPayload.id
      const fbResult = await supabase.from('orders').insert([fallbackPayload]).select()
      if (fbResult.error) {
        return { success: false, error: fbResult.error.message }
      }
      return { success: true, order: fbResult.data?.[0], referenceId: refId }
    }

    return { success: true, order: data?.[0], referenceId: refId }
  } catch (err) {
    console.error('Supabase exception:', err)
    return { success: false, error: err.message }
  }
}

/**
 * Query order live from Supabase by ID, reference code, or phone number
 */
export async function fetchOrderFromSupabase(query) {
  if (!query) return null
  const cleaned = query.trim()
  const digitsOnly = cleaned.replace(/\D/g, '')

  try {
    // 1. Try querying by numeric id if clean digits
    if (digitsOnly.length >= 10) {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('id', Number(digitsOnly))
        .limit(1)
      if (data && data.length > 0) return data[0]
    }

    // 2. Try querying by notes containing reference ID
    const { data: notesData } = await supabase
      .from('orders')
      .select('*')
      .ilike('notes', `%${cleaned}%`)
      .limit(1)
    if (notesData && notesData.length > 0) return notesData[0]

    // 3. Try querying by phone
    if (digitsOnly.length >= 7) {
      const { data: phoneData } = await supabase
        .from('orders')
        .select('*')
        .ilike('phone', `%${digitsOnly}%`)
        .limit(1)
      if (phoneData && phoneData.length > 0) return phoneData[0]
    }
  } catch (err) {
    console.warn('Supabase live fetch notice:', err)
  }
  return null
}

/**
 * Fetch all orders live from Supabase (for Admin Dashboard)
 */
export async function fetchAllOrdersFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.warn('Supabase fetch all notice:', error.message)
      return { success: false, error: error.message, data: [] }
    }
    return { success: true, data: data || [] }
  } catch (err) {
    console.warn('Supabase fetch all exception:', err.message)
    return { success: false, error: err.message, data: [] }
  }
}

/**
 * Update order status live in Supabase
 */
export async function updateOrderStatusInSupabase(orderId, newStatus) {
  try {
    // If orderId is string like 'loc-179161...' or number
    const numericId = typeof orderId === 'number' ? orderId : Number(String(orderId).replace(/\D/g, ''))

    let query = supabase.from('orders').update({ status: newStatus })

    if (numericId && !isNaN(numericId) && numericId > 0) {
      const { data, error } = await query.eq('id', numericId).select()
      if (!error && data && data.length > 0) {
        return { success: true, data: data[0] }
      }
    }

    // Try matching by notes
    const { data: noteData, error: noteError } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .ilike('notes', `%${orderId}%`)
      .select()

    if (!noteError && noteData && noteData.length > 0) {
      return { success: true, data: noteData[0] }
    }

    return { success: true, message: 'Status updated' }
  } catch (err) {
    console.warn('Supabase update status exception:', err.message)
    return { success: false, error: err.message }
  }
}

/**
 * Delete order from Supabase
 */
export async function deleteOrderFromSupabase(orderId) {
  try {
    const numericId = typeof orderId === 'number' ? orderId : Number(String(orderId).replace(/\D/g, ''))
    if (numericId && !isNaN(numericId) && numericId > 0) {
      const { error } = await supabase.from('orders').delete().eq('id', numericId)
      if (error) return { success: false, error: error.message }
      return { success: true }
    }
    const { error: noteError } = await supabase.from('orders').delete().ilike('notes', `%${orderId}%`)
    if (noteError) return { success: false, error: noteError.message }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}


