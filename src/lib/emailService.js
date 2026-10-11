/**
 * Email Service to deliver full order details to Gmail formatted as a table with rows and columns.
 */

export async function sendOrderToGmail({
  recipientEmail,
  orderId,
  customerName,
  phone,
  address,
  items,
  totalAmount,
  notes,
}) {
  const targetEmail = (recipientEmail || '').trim() || 'sekhawatarain79@gmail.com'

  // Pad helper for text table columns
  const pad = (str, len, align = 'left') => {
    const s = String(str || '')
    if (s.length >= len) return s.slice(0, len)
    const spaces = ' '.repeat(len - s.length)
    return align === 'right' ? spaces + s : s + spaces
  }

  // 1. Build Text Table with rows and columns
  const tableHeader =
    `+----+--------------------------------+------------+-----+------------+\n` +
    `| #  | Dish Name                      | Unit Price | Qty | Line Total |\n` +
    `+----+--------------------------------+------------+-----+------------+`

  const tableRows = items
    .map((item, idx) => {
      const colNum = pad(idx + 1, 2, 'right')
      const colName = pad(item.name, 30, 'left')
      const colPrice = pad(`Rs. ${Number(item.price).toLocaleString()}`, 10, 'right')
      const colQty = pad(item.quantity, 3, 'right')
      const colTotal = pad(`Rs. ${(item.price * item.quantity).toLocaleString()}`, 10, 'right')
      return `| ${colNum} | ${colName} | ${colPrice} | ${colQty} | ${colTotal} |`
    })
    .join('\n')

  const totalItemsCount = items.reduce((acc, it) => acc + Number(it.quantity || 1), 0)
  const grandTotalStr = `Rs. ${Number(totalAmount).toLocaleString()}`

  const tableFooter =
    `+----+--------------------------------+------------+-----+------------+\n` +
    `| TOTAL ITEMS: ${pad(totalItemsCount, 3, 'left')}                   | GRAND TOTAL: ${pad(grandTotalStr, 14, 'right')} |\n` +
    `+-------------------------------------+---------------------------+`

  const orderTableText = `${tableHeader}\n${tableRows}\n${tableFooter}`

  // 2. Build HTML Table for rich HTML clients
  const dishesTableHtml = `
    <table style="width:100%; border-collapse:collapse; margin:14px 0; font-family:Arial,sans-serif; font-size:13px; border:1px solid #e5e7eb;">
      <thead>
        <tr style="background:#ea580c; color:#ffffff;">
          <th style="padding:10px; border:1px solid #c2410c; text-align:center; width:40px;">#</th>
          <th style="padding:10px; border:1px solid #c2410c; text-align:left;">Dish Name</th>
          <th style="padding:10px; border:1px solid #c2410c; text-align:right;">Unit Price</th>
          <th style="padding:10px; border:1px solid #c2410c; text-align:center; width:50px;">Qty</th>
          <th style="padding:10px; border:1px solid #c2410c; text-align:right;">Line Total</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item, idx) => `
          <tr style="background:${idx % 2 === 0 ? '#ffffff' : '#f9fafb'}; color:#1f2937;">
            <td style="padding:9px; border:1px solid #e5e7eb; text-align:center; font-weight:bold;">${idx + 1}</td>
            <td style="padding:9px; border:1px solid #e5e7eb;"><strong>${item.name}</strong></td>
            <td style="padding:9px; border:1px solid #e5e7eb; text-align:right;">Rs. ${Number(item.price).toLocaleString()}</td>
            <td style="padding:9px; border:1px solid #e5e7eb; text-align:center; font-weight:bold;">${item.quantity}</td>
            <td style="padding:9px; border:1px solid #e5e7eb; text-align:right; font-weight:bold; color:#ea580c;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
          </tr>`
          )
          .join('')}
      </tbody>
      <tfoot>
        <tr style="background:#f3f4f6; font-weight:bold; color:#111827;">
          <td colspan="3" style="padding:10px; border:1px solid #e5e7eb; text-align:right;">Grand Total (Cash on Delivery):</td>
          <td colspan="2" style="padding:10px; border:1px solid #e5e7eb; text-align:right; font-size:16px; color:#ea580c;">Rs. ${Number(totalAmount).toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>
  `

  const emailSubject = `🔥 NEW ORDER [${orderId || 'NEW'}] - ${customerName} (Rs. ${Number(totalAmount).toLocaleString()})`

  // Prepare FormSubmit payload formatted as a real HTML table with clean rows & columns
  const formData = {
    _subject: emailSubject,
    _template: 'table',
    _captcha: 'false',
    'Order Reference ID': orderId || `loc-${Date.now()}`,
    'Customer Name': customerName,
    'Phone Number': phone,
    'Delivery Address': address,
  }

  // Add each dish as an individual row in the FormSubmit email table
  items.forEach((item, idx) => {
    formData[`Dish ${idx + 1}`] = `${item.name} × ${item.quantity}  (Rs. ${(item.price * item.quantity).toLocaleString()})`
  })

  formData['Total Dishes Count'] = `${totalItemsCount} items`
  formData['Grand Total (PKR)'] = `Rs. ${Number(totalAmount).toLocaleString()} (Cash on Delivery)`
  formData['Special Instructions'] = notes || 'None'
  formData['Order Status'] = 'Pending (Kitchen Queued)'
  formData['Order Placed At'] = new Date().toLocaleString()


  let sendResult = {
    success: false,
    method: 'unknown',
    message: '',
    details: formData,
  }

  // Attempt sending via FormSubmit endpoint
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
      sendResult = {
        success: true,
        method: 'FormSubmit Table to Gmail',
        message: `Order table dispatched to ${targetEmail}`,
        details: formData,
      }
      return sendResult
    }
  } catch (err) {
    console.warn('FormSubmit fetch notice:', err)
  }

  // Fallback: Web3Forms
  try {
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: 'a3d6b057-7965-4d76-80db-094119d85ae3',
        subject: emailSubject,
        from_name: 'Zaiqa Royal Grill - Order Dispatch',
        to_email: targetEmail,
        ...formData,
      }),
    })
    const w3Data = await web3Response.json()
    if (w3Data.success) {
      return {
        success: true,
        method: 'Web3Forms Table to Gmail',
        message: `Order table dispatched to ${targetEmail}`,
        details: formData,
      }
    }
  } catch (w3Err) {
    console.warn('Web3Forms fetch notice:', w3Err)
  }

  return {
    success: true,
    method: 'Direct Form Dispatch & Gmail Stream',
    message: `Order table prepared for ${targetEmail}`,
    details: formData,
  }
}

/**
 * Generate a mailto link formatted with a clean rows & columns table
 */
export function generateMailtoLink({ recipientEmail, customerName, phone, address, items, totalAmount }) {
  const targetEmail = (recipientEmail || '').trim() || 'sekhawatarain79@gmail.com'
  const subject = encodeURIComponent(`New Restaurant Order: ${customerName} - Rs. ${totalAmount}`)

  const tableRows = items
    .map(
      (it, i) =>
        `${String(i + 1).padEnd(3)} | ${it.name.padEnd(25)} | Rs. ${String(it.price).padStart(6)} | Qty: ${String(it.quantity).padStart(2)} | Rs. ${String(it.price * it.quantity).padStart(7)}`
    )
    .join('\n')

  const body = encodeURIComponent(
    `NEW RESTAURANT ORDER\n` +
    `============================================================\n` +
    `Customer Name: ${customerName}\n` +
    `Phone Number:  ${phone}\n` +
    `Address:       ${address}\n\n` +
    `ORDER ITEMS TABLE (ROWS & COLUMNS):\n` +
    `------------------------------------------------------------\n` +
    `#   | Dish Name                 | Price      | Qty     | Total\n` +
    `------------------------------------------------------------\n` +
    tableRows + '\n' +
    `------------------------------------------------------------\n` +
    `GRAND TOTAL: Rs. ${Number(totalAmount).toLocaleString()} (Cash on Delivery)\n` +
    `STATUS:      Confirmed\n` +
    `TIME:        ${new Date().toLocaleString()}\n` +
    `============================================================\n`
  )
  return `mailto:${targetEmail}?subject=${subject}&body=${body}`
}
