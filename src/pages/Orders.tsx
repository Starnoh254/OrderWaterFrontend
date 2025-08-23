import { useEffect, useState, useCallback } from 'react'
import { API_BASE } from '../lib/config'
import Spinner from '../components/Spinner'
import Button from '../components/Button'

type Order = {
  id?: string
  name?: string
  phone?: string
  house?: string
  [key: string]: any
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/order`)
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      const body = await res.json()

      // Accept either an array response or an object with `orders`.
      const list: Order[] = Array.isArray(body)
        ? body
        : Array.isArray(body?.orders)
        ? body.orders
        : []

      setOrders(list)
    } catch (err) {
      // On network failure, fall back to an empty list and show an error message.
      setError(String(err ?? 'Failed to load orders'))
      // Provide a small mock so UI is still usable during local development.
      setOrders([
        { id: 'mock-1', name: 'Local Mock', phone: '+000', house: 'Mock House' },
      ])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-primary">All Orders</h2>
        <Button onClick={fetchOrders} disabled={loading} className="flex items-center">
          {loading ? <Spinner size={16} /> : 'Refresh'}
        </Button>
      </div>

      {loading && orders === null ? (
        <div className="py-8 flex justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-800 rounded mb-4">{error}</div>
      ) : orders && orders.length === 0 ? (
        <div className="p-4 text-gray-600">No orders found.</div>
      ) : (
        <ul className="space-y-3">
          {orders?.map((o) => (
            <li key={o.id ?? JSON.stringify(o)} className="p-3 border rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-primary">{o.name ?? '—'}</div>
                  <div className="text-sm text-gray-600">{o.phone ?? '—'}</div>
                </div>
                <div className="text-sm text-gray-500">{o.id ?? '—'}</div>
              </div>
              <div className="mt-2 text-sm text-gray-700">{o.house ?? ''}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
