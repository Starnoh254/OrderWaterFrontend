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
  const [price, setPrice] = useState<number | null>(null)
  type AmountKey = '500ml' | '1L' | '1.5L' | '20L'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // basic validation
    if (!name || !phone || !house) return
    setLoading(true)
    submitOrder({ name, phone, house, amount })
      .then((res) => {
        if (res.ok) setSubmitted(true)
      })
      .finally(() => setLoading(false))
  }

  function amountToCurrency(amount: AmountKey) {
    const currencyObject = {
      '500ml': 30,
      '1L': 50,
      '1.5L': 60,
      '20L': 100,
    }

    setPrice(currencyObject[amount])
  }

  function isAmountKey(value: string): value is AmountKey {
    return ['500ml', '1L', '1.5L', '20L'].includes(value)
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
              onChange={(e) => {
                const selectedValue = e.target.value
                setAmount(selectedValue)
                // Check if it's a valid key before calling the function
                if (isAmountKey(selectedValue)) {
                  amountToCurrency(selectedValue) // TS now knows selectedValue is AmountKey
                } else {
                  // Handle the invalid case, e.g., if it's an empty string
                  setPrice(null) // or setPrice(0), or just do nothing
                }
              }}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select amount</option>
              <option value="500ml">500ml</option>
              <option value="1L">1L</option>
              <option value="1.5L">1.5L</option>
              <option value="20L">20L</option>
            </select>
          </div>

          {price !== null && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">Order Summary:</p>
              <div className="mt-2">
                <span className="font-medium">{amount}</span> of water
              </div>
              <div className="mt-2 text-xl font-bold text-green-900">
                Total: Kshs {price}
              </div>

              {/* Lipa na M-Pesa Payment Instructions */}
              <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  💳 Pay Via M-Pesa
                </p>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lipa Na M-Pesa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Buy Goods & Services</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Till Number</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="font-bold">Enter Till Number:</span>
                    <span className="font-mono font-bold text-blue-700">
                      7003835
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Amount:</span>
                    <span className="font-mono font-bold">Ksh {price}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Payment confirmation required after delivery.
                </p>
              </div>
            </div>
          )}

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
