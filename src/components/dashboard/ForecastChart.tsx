import { currency } from '../../lib/format'
import type { ForecastWeek } from '../../types'

export function ForecastChart({ weeks }: { weeks: ForecastWeek[] }) {
  const max = Math.max(...weeks.map((w) => w.balance))
  const lowest = weeks.reduce((low, w) => (w.balance < low.balance ? w : low), weeks[0])

  return (
    <div>
      <div className="flex h-44 items-end gap-1.5 sm:gap-2.5">
        {weeks.map((week, index) => {
          const isLow = week.label === lowest.label
          const height = Math.max(6, Math.round((week.balance / max) * 100))
          return (
            <div key={week.label} className="flex h-full flex-1 flex-col justify-end">
              {isLow && (
                <span className="mb-1.5 text-center text-[10px] leading-tight font-bold text-amber-600">
                  low
                </span>
              )}
              <div
                className={`animate-grow-bar rounded-t-md ${
                  isLow
                    ? 'bg-gradient-to-t from-amber-300 to-amber-400'
                    : 'from-brand-300 to-brand-500 bg-gradient-to-t'
                }`}
                style={{ height: `${height}%`, animationDelay: `${index * 55}ms` }}
                title={`${week.label}: ${currency(week.balance)} projected · in ${currency(
                  week.moneyIn,
                )} · out ${currency(week.moneyOut)}`}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex gap-1.5 sm:gap-2.5">
        {weeks.map((week) => (
          <span
            key={week.label}
            className="text-ink-400 flex-1 text-center text-[10px] font-medium sm:text-[11px]"
          >
            {week.label}
          </span>
        ))}
      </div>

      <div className="text-ink-500 mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="from-brand-300 to-brand-500 h-2.5 w-2.5 rounded-sm bg-gradient-to-t" />
          Projected balance
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
          Lowest point · {currency(lowest.balance)} on {lowest.label}
        </span>
      </div>
    </div>
  )
}
