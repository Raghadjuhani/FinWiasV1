import type { ReactNode } from 'react'
import type { IconName } from '../types'
import { Icon } from './Icon'

interface OptionCardProps {
  icon: IconName
  title: string
  subtitle: string
  selected: boolean
  onSelect: () => void
  badge?: string
  meta?: string
  children?: ReactNode
}

export function OptionCard({
  icon,
  title,
  subtitle,
  selected,
  onSelect,
  badge,
  meta,
  children,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`option ${selected ? 'option-selected' : ''}`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
          selected ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-600'
        }`}
      >
        <Icon name={icon} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-ink-900 text-[15px] font-semibold">{title}</span>
          {badge && (
            <span className="chip bg-brand-100 text-brand-800">{badge}</span>
          )}
        </span>
        <span className="text-ink-500 mt-1 block text-[13.5px] leading-snug">
          {subtitle}
        </span>
        {meta && (
          <span className="text-ink-400 mt-2 flex items-center gap-1.5 text-xs font-medium">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {meta}
          </span>
        )}
        {children}
      </span>

      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          selected ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-300 text-transparent'
        }`}
      >
        <Icon name="check" className="h-3 w-3" strokeWidth={3} />
      </span>
    </button>
  )
}
