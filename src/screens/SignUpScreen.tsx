import { useState, type FormEvent } from 'react'
import { StepShell } from '../components/StepShell'
import { Icon } from '../components/Icon'

interface SignUpScreenProps {
  email: string
  onEmailChange: (email: string) => void
  onSubmit: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SignUpScreen({ email, onEmailChange, onSubmit }: SignUpScreenProps) {
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState(false)

  const emailValid = EMAIL_RE.test(email.trim())
  const passwordValid = password.length >= 8
  const canSubmit = emailValid && passwordValid

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setTouched(true)
    if (canSubmit) onSubmit()
  }

  return (
    <StepShell
      step={1}
      eyebrow="Free for 14 days"
      title="Start your FinWise Pro trial"
      subtitle="Every Pro feature for 14 days. No credit card, no demo call. Keep the free plan afterwards if Pro isn't for you."
      footnote={
        <>
          <Icon name="lock" className="h-3.5 w-3.5" />
          Bank-grade encryption · SOC 2 Type II · Read-only access
        </>
      }
    >
      <div className="space-y-4">
        <button type="button" className="btn-secondary" onClick={onSubmit}>
          <Icon name="google" className="h-[18px] w-[18px]" />
          Continue with Google
        </button>

        <div className="flex items-center gap-3">
          <span className="bg-ink-200 h-px flex-1" />
          <span className="text-ink-400 text-xs font-semibold tracking-wide uppercase">
            or
          </span>
          <span className="bg-ink-200 h-px flex-1" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="label" htmlFor="email">
              Work email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              className="field"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
            />
            {touched && !emailValid && (
              <p className="mt-1.5 text-[13px] font-medium text-amber-600">
                Enter a valid email so we can save your work.
              </p>
            )}
          </div>

          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="field"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <PasswordMeter password={password} />
          </div>

          <button type="submit" className="btn-primary" disabled={!canSubmit}>
            Create account
            <Icon name="arrowRight" className="h-[18px] w-[18px]" />
          </button>
        </form>

        <p className="text-ink-400 text-center text-xs leading-relaxed">
          By continuing you agree to the FinWise Terms and Privacy Policy.
          <br />
          We never sell your financial data.
        </p>
      </div>
    </StepShell>
  )
}

function PasswordMeter({ password }: { password: string }) {
  const score = Math.min(
    4,
    (password.length >= 8 ? 1 : 0) +
      (password.length >= 12 ? 1 : 0) +
      (/[^a-zA-Z0-9]/.test(password) ? 1 : 0) +
      (/\d/.test(password) && /[a-zA-Z]/.test(password) ? 1 : 0),
  )
  const labels = ['Too short', 'Okay', 'Good', 'Strong', 'Very strong']

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              password.length > 0 && i < score ? 'bg-brand-500' : 'bg-ink-200'
            }`}
          />
        ))}
      </div>
      <span className="text-ink-400 w-20 text-right text-[11px] font-semibold">
        {password.length > 0 ? labels[score] : ''}
      </span>
    </div>
  )
}
