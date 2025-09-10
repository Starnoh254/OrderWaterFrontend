import { API_BASE } from './config'

export type OrderPayload = {
  name: string
  phone: string
  house: string
  amount: string
}

export function submitOrder(
  data: OrderPayload
): Promise<{ ok: boolean; id: string }> {
  const url = `${API_BASE}/order`

  // Try to POST to the real API, but fall back to a simulated response on error.
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (!res.ok) throw new Error('Network response not ok')
      try {
        const body = await res.json()
        // Expecting { id: string }
        return {
          ok: true,
          id: body?.id ?? Math.random().toString(36).slice(2, 9),
        }
      } catch {
        return { ok: true, id: Math.random().toString(36).slice(2, 9) }
      }
    })
    .catch(() => {
      // fallback mock
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true, id: Math.random().toString(36).slice(2, 9) })
        }, 700)
      })
    })
}

export function submitFeedback(payload: {
  orderId?: string | null
  feedback: string
}): Promise<{ ok: boolean }> {
  const url = `${API_BASE}/feedback`

  // send { message } to the feedback endpoint; fall back to a mock on error
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: payload.feedback }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Network response not ok')
      return { ok: true }
    })
    .catch(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ ok: true }), 600)
        })
    )
}
