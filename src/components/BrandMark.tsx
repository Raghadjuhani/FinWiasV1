interface BrandMarkProps {
  className?: string
  withWordmark?: boolean
}

export function BrandMark({ className = '', withWordmark = true }: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="from-brand-500 to-brand-700 inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br shadow-[0_6px_16px_-6px_var(--color-brand-700)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M5 16.5 10 11l3.5 3.5L19.5 7"
            fill="none"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="19.5" cy="7" r="2" fill="white" />
        </svg>
      </span>
      {withWordmark && (
        <span className="text-ink-900 text-[19px] font-semibold tracking-[-0.02em]">
          FinWise
        </span>
      )}
    </span>
  )
}
