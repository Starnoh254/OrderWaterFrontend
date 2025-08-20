import { useState } from 'react'
import Button from './Button'
import Spinner from './Spinner'
import { submitFeedback } from '../lib/mockApi'

type Props = {
  open: boolean
  title?: string
  message?: string
  // orderId removed: feedback endpoint only accepts a message
  onClose: () => void
}

export default function FeedbackDialog({
  open,
  title = 'Thank you!',
  message,

  onClose,
}: Props) {
  if (!open) return null

  const [feedback, setFeedback] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSend() {
    if (!feedback) return
    setSending(true)
    submitFeedback({ feedback })
      .then(() => setSent(true))
      .finally(() => setSending(false))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6 mx-4">
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}

        <div className="mb-3">
          {sent ? (
            <div className="p-3 bg-green-50 text-green-800 rounded">
              Thanks for your feedback!
            </div>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tell us where we can improve on
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border rounded px-3 py-2 min-h-[100px]"
                placeholder="What features or services would help you ?"
              />
            </>
          )}
        </div>

        <div className="flex justify-end gap-2">
          {!sent && (
            <Button
              variant="solid"
              onClick={handleSend}
              disabled={sending || !feedback}
            >
              {sending ? <Spinner size={16} /> : 'Send feedback'}
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
