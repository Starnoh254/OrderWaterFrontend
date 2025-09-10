import React, { useState } from 'react'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import FeedbackDialog from '../components/FeedbackDialog'
import { submitOrder } from '../lib/mockApi'

export default function Order() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [house, setHouse] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // basic validation
    if (!name || !phone || !house) return
    setLoading(true)
    submitOrder({ name, phone, house , amount })
      .then((res) => {
        if (res.ok) setSubmitted(true)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Place your Water Order
      </h2>

      {submitted ? (
        <div className="p-4 bg-green-50 text-green-800 rounded">
          Order submitted — we will call you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 0700 000 000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              House no / Court
            </label>
            <input
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="House number or court"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount in Litres
            </label>
            <select
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select amount</option>
              <option value="300ml">300ml</option>
              <option value="500ml">500ml</option>
              <option value="1L">1L</option>
              <option value="1.5L">1.5L</option>
              <option value="5L">5L</option>
              <option value="10L">10L</option>
              <option value="20L">20L</option>
            </select>
          </div>

          <div>
            <p className="text-primary font-light italic">
              * All orders are sent to Denva Water Shop Umoja
            </p>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center"
            >
              {loading ? <Spinner size={18} /> : 'Submit Order'}
            </Button>
          </div>
        </form>
      )}

      <FeedbackDialog
        open={submitted}
        title="Order received"
        message="Thanks! We'll contact you soon."
        onClose={() => {
          setSubmitted(false)
        }}
      />
    </div>
  )
}
