import { useEffect } from 'react'
import { Icon } from './Icon'
import { NAV_STEPS, type Step } from '../flow'

interface PrototypeBarProps {
  step: Step
  onNavigate: (step: Step) => void
  onRestart: () => void
}

/** Reviewer chrome — lets you jump around the flow without replaying it. */
export function PrototypeBar({ step, onNavigate, onRestart }: PrototypeBarProps) {
  const index = NAV_STEPS.findIndex((s) => s.id === step)
  const current = index === -1 ? NAV_STEPS.length - 1 : index

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
      if (event.key === 'ArrowRight' && current < NAV_STEPS.length - 1) {
        onNavigate(NAV_STEPS[current + 1].id)
      }
      if (event.key === 'ArrowLeft' && current > 0) {
        onNavigate(NAV_STEPS[current - 1].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, onNavigate])

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 hidden justify-center px-4 sm:flex">
      <div className="bg-ink-900/90 pointer-events-auto flex items-center gap-1 rounded-full p-1.5 text-white shadow-[0_16px_40px_-16px_rgba(11,18,32,0.7)] backdrop-blur-md">
        <span className="text-ink-400 px-2.5 text-[11px] font-bold tracking-[0.12em] uppercase">
          Prototype
        </span>

        <button
          type="button"
          onClick={() => current > 0 && onNavigate(NAV_STEPS[current - 1].id)}
          disabled={current === 0}
          className="hover:bg-ink-700 flex h-8 w-8 items-center justify-center rounded-full transition disabled:opacity-30"
          aria-label="Previous screen"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1">
          {NAV_STEPS.map((navStep, i) => {
            const active = i === current
            return (
              <button
                key={navStep.id}
                type="button"
                onClick={() => onNavigate(navStep.id)}
                className={`rounded-full text-[12px] font-semibold transition ${
                  active
                    ? 'bg-white px-3 py-1.5 text-ink-900'
                    : 'text-ink-300 hover:bg-ink-700 h-8 w-8'
                }`}
                aria-label={`Go to ${navStep.label}`}
              >
                {active ? navStep.label : i + 1}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            current < NAV_STEPS.length - 1 && onNavigate(NAV_STEPS[current + 1].id)
          }
          disabled={current === NAV_STEPS.length - 1}
          className="hover:bg-ink-700 flex h-8 w-8 items-center justify-center rounded-full transition disabled:opacity-30"
          aria-label="Next screen"
        >
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>

        <span className="bg-ink-700 mx-1 h-5 w-px" aria-hidden="true" />

        <button
          type="button"
          onClick={onRestart}
          className="hover:bg-ink-700 flex h-8 w-8 items-center justify-center rounded-full transition"
          aria-label="Restart the flow"
        >
          <Icon name="refresh" className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
