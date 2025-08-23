import React, { useState } from 'react'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import FeedbackDialog from '../components/FeedbackDialog'
import { submitOrder } from '../lib/mockApi'

export default function Order() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [house, setHouse] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // basic validation
    if (!name || !phone || !house) return
    setLoading(true)
    submitOrder({ name, phone, house })
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
