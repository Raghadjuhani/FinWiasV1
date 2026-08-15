import { useEffect, useState } from 'react'
import { BrandMark } from '../components/BrandMark'
import { Backdrop } from '../components/StepShell'
import { Icon } from '../components/Icon'
import type { Persona } from '../types'

const STEP_MS = 850

interface ImportingScreenProps {
  persona: Persona
  sourceLabel: string
  onDone: () => void
}

export function ImportingScreen({ persona, sourceLabel, onDone }: ImportingScreenProps) {
  const steps = persona.importSteps
  const [done, setDone] = useState(0)

  useEffect(() => {
    if (done >= steps.length) {
      const finish = window.setTimeout(onDone, 700)
      return () => window.clearTimeout(finish)
    }
    const timer = window.setTimeout(() => setDone((n) => n + 1), STEP_MS)
    return () => window.clearTimeout(timer)
  }, [done, steps.length, onDone])

  const progress = Math.round((done / steps.length) * 100)

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <Backdrop />
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[520px] flex-col justify-center px-5 py-10">
        <div className="animate-screen-in">
          <BrandMark />
          <h1 className="text-ink-900 mt-8 text-[26px] leading-tight font-semibold tracking-[-0.02em]">
            Pulling in your data from {sourceLabel}
          </h1>
          <p className="text-ink-500 mt-2.5 text-[15px]">
            {persona.importSummary}. Stay here — this is usually done in under a minute.
          </p>

          <div className="bg-ink-200 mt-7 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-brand-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.max(progress, 6)}%` }}
            />
          </div>

          <ul className="mt-7 space-y-3.5">
            {steps.map((step, index) => {
              const complete = index < done
              const active = index === done
              return (
                <li
                  key={step}
                  className={`flex items-center gap-3 text-[15px] transition-opacity duration-300 ${
                    complete || active ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                      complete
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : active
                          ? 'border-brand-500 text-brand-600'
                          : 'border-ink-200 text-transparent'
                    }`}
                  >
                    {complete ? (
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : active ? (
                      <span className="bg-brand-500 h-2 w-2 animate-pulse rounded-full" />
                    ) : (
                      <span className="bg-ink-200 h-2 w-2 rounded-full" />
                    )}
                  </span>
                  <span className={complete ? 'text-ink-500' : 'text-ink-900 font-medium'}>
                    {step}
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="mt-9 space-y-3">
            <div className="shimmer h-20 rounded-2xl" />
            <div className="grid grid-cols-3 gap-3">
              <div className="shimmer h-14 rounded-xl" />
              <div className="shimmer h-14 rounded-xl" />
              <div className="shimmer h-14 rounded-xl" />
            </div>
          </div>

          <button
            type="button"
            onClick={onDone}
            className="text-ink-400 hover:text-ink-700 mx-auto mt-8 block text-xs font-semibold"
          >
            Skip the wait
          </button>
        </div>
      </div>
    </div>
  )
}
