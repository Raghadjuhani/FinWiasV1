import type { ReactNode } from 'react'
import { BrandMark } from './BrandMark'
import { Icon } from './Icon'
import { TRIAL_DAYS_LEFT } from '../data/catalog'

export const TOTAL_STEPS = 4

interface StepShellProps {
  step: number
  title: string
  subtitle: string
  eyebrow?: string
  onBack?: () => void
  children: ReactNode
  footnote?: ReactNode
}

export function StepShell({
  step,
  title,
  subtitle,
  eyebrow,
  onBack,
  children,
  footnote,
}: StepShellProps) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <Backdrop />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[520px] flex-col px-5 pt-6 pb-10 sm:pt-10">
        <header className="flex items-center justify-between">
          <BrandMark />
          <span className="chip border-brand-200 bg-brand-50 text-brand-700 border">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            Pro trial · {TRIAL_DAYS_LEFT} days
          </span>
        </header>

        <div className="mt-7 flex items-center gap-3">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-ink-500 hover:text-ink-900 hover:bg-ink-100 -ml-1.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition"
              aria-label="Go back"
            >
              <Icon name="arrowLeft" className="h-[18px] w-[18px]" />
            </button>
          ) : (
            <span className="h-8 w-8 shrink-0" aria-hidden="true" />
          )}
          <ProgressBar step={step} />
          <span className="text-ink-400 tnum shrink-0 text-xs font-semibold">
            {step} / {TOTAL_STEPS}
          </span>
        </div>

        <main key={step} className="animate-screen-in mt-8 flex-1">
          {eyebrow && (
            <p className="text-brand-700 mb-2 text-xs font-bold tracking-[0.14em] uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="text-ink-900 text-[26px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[30px]">
            {title}
          </h1>
          <p className="text-ink-500 mt-2.5 text-[15px] leading-relaxed">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </main>

        {footnote && (
          <footer className="text-ink-400 mt-8 flex items-center justify-center gap-2 text-center text-xs">
            {footnote}
          </footer>
        )}
      </div>
    </div>
  )
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex w-full items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const done = i + 1 <= step
        return (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              done ? 'bg-brand-500' : 'bg-ink-200'
            }`}
          />
        )
      })}
    </div>
  )
}

export function Backdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_15%_-5%,rgba(23,169,123,0.14),transparent_60%),radial-gradient(70%_50%_at_100%_0%,rgba(109,110,240,0.12),transparent_55%)]"
      aria-hidden="true"
    />
  )
}
