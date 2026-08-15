import { useEffect, useState, type FormEvent } from 'react'
import { Icon } from './Icon'
import type { Persona } from '../types'

interface InviteModalProps {
  persona: Persona
  onClose: () => void
}

export function InviteModal({ persona, onClose }: InviteModalProps) {
  const { collaborator } = persona
  const [email, setEmail] = useState(collaborator.detectedEmail)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (email.trim().length > 3) setSent(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="bg-ink-900/40 absolute inset-0 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={collaborator.modalTitle}
        className="animate-rise relative w-full max-w-[460px] rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="text-ink-400 hover:bg-ink-100 hover:text-ink-700 absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg transition"
          aria-label="Close"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>

        {sent ? (
          <div className="py-4 text-center">
            <span className="bg-brand-100 text-brand-700 animate-pop-in mx-auto flex h-14 w-14 items-center justify-center rounded-full">
              <Icon name="check" className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <h2 className="text-ink-900 mt-4 text-[20px] font-semibold tracking-[-0.01em]">
              Invite sent
            </h2>
            <p className="text-ink-500 mx-auto mt-2 max-w-[320px] text-[14px] leading-relaxed">
              {email} can now see {persona.workspaceName} in FinWise. We will tell you the
              moment they accept.
            </p>
            <button type="button" className="btn-primary mt-6" onClick={onClose}>
              Back to my dashboard
            </button>
          </div>
        ) : (
          <>
            <span className="bg-brand-50 text-brand-700 flex h-11 w-11 items-center justify-center rounded-xl">
              <Icon name="mail" />
            </span>
            <h2 className="text-ink-900 mt-4 text-[20px] font-semibold tracking-[-0.01em]">
              {collaborator.modalTitle}
            </h2>
            <p className="text-ink-500 mt-2 text-[14px] leading-relaxed">
              Books stay clean when two people can see them. Your {collaborator.role} works in
              the same live data — no more emailing spreadsheets back and forth.
            </p>

            <div className="border-brand-200 bg-brand-50/60 mt-5 flex items-start gap-3 rounded-xl border p-3.5">
              <Icon name="sparkles" className="text-brand-600 mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-brand-900 text-[13px] leading-relaxed">
                <span className="font-semibold">{collaborator.detectedName}</span> —{' '}
                {collaborator.detectedWhy} We filled in their email for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5">
              <label className="label" htmlFor="invite-email">
                Their email
              </label>
              <input
                id="invite-email"
                type="email"
                className="field"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <p className="text-ink-400 mt-2 flex items-center gap-1.5 text-[12px]">
                <Icon name="lock" className="h-3.5 w-3.5" />
                {collaborator.permission}
              </p>
              <button type="submit" className="btn-primary mt-5">
                <Icon name="send" className="h-[18px] w-[18px]" />
                Send invite
              </button>
              <button type="button" className="btn-ghost mt-1" onClick={onClose}>
                Maybe later
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
