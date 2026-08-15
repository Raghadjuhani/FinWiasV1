import type { ReactNode } from 'react'
import { Icon } from '../Icon'
import { currency, count } from '../../lib/format'
import type {
  BreakdownRow,
  Insight,
  InvoiceRow,
  Movement,
  ReviewItem,
  Stat,
} from '../../types'

export function Panel({
  title,
  sub,
  action,
  children,
  className = '',
}: {
  title: string
  sub?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`card p-5 sm:p-6 ${className}`}>
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-ink-900 text-[15px] font-semibold">{title}</h2>
          {sub && <p className="text-ink-500 mt-1 text-[13px]">{sub}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-4">
          <p className="text-ink-500 text-[12.5px] font-medium">{stat.label}</p>
          <p
            className={`tnum mt-1.5 text-[22px] leading-none font-semibold tracking-[-0.02em] ${
              stat.tone === 'positive'
                ? 'text-brand-700'
                : stat.tone === 'warning'
                  ? 'text-amber-600'
                  : 'text-ink-900'
            }`}
          >
            {stat.value}
          </p>
          {stat.hint && <p className="text-ink-400 mt-1.5 text-[12px]">{stat.hint}</p>}
        </div>
      ))}
    </div>
  )
}

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <section className="from-ink-900 to-ink-800 relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white sm:p-6">
      <div
        className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(23,169,123,0.45),transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative">
        <span className="chip bg-brand-500/20 text-brand-200">
          <Icon name="zap" className="h-3.5 w-3.5" />
          FinWise spotted this
        </span>
        <h3 className="mt-3 text-[17px] leading-snug font-semibold sm:text-[19px]">
          {insight.title}
        </h3>
        <p className="text-ink-200 mt-2 text-[14px] leading-relaxed">{insight.body}</p>
      </div>
    </section>
  )
}

export function MovementList({ movements }: { movements: Movement[] }) {
  return (
    <ul className="divide-ink-100 -my-3 divide-y">
      {movements.map((item) => (
        <li key={item.name} className="flex items-center gap-3 py-3">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              item.amount >= 0 ? 'bg-brand-50 text-brand-700' : 'bg-ink-100 text-ink-500'
            }`}
          >
            <Icon
              name={item.amount >= 0 ? 'trending' : 'wallet'}
              className="h-4 w-4"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-ink-900 block truncate text-[14px] font-medium">
              {item.name}
            </span>
            <span className="text-ink-400 block truncate text-[12.5px]">{item.meta}</span>
          </span>
          <span
            className={`tnum shrink-0 text-[14px] font-semibold ${
              item.status === 'overdue'
                ? 'text-amber-600'
                : item.amount >= 0
                  ? 'text-brand-700'
                  : 'text-ink-700'
            }`}
          >
            {currency(item.amount)}
          </span>
        </li>
      ))}
    </ul>
  )
}

const INVOICE_STYLES: Record<InvoiceRow['status'], string> = {
  overdue: 'bg-amber-50 text-amber-700',
  due: 'bg-ink-100 text-ink-600',
  paid: 'bg-brand-50 text-brand-700',
}

export function InvoiceTable({ invoices }: { invoices: InvoiceRow[] }) {
  return (
    <ul className="divide-ink-100 -my-3 divide-y">
      {invoices.map((invoice) => (
        <li key={`${invoice.client}-${invoice.ref}`} className="flex items-center gap-3 py-3">
          <span className="min-w-0 flex-1">
            <span className="text-ink-900 block truncate text-[14px] font-medium">
              {invoice.client}
            </span>
            <span className="text-ink-400 block truncate text-[12.5px]">
              {invoice.ref} · {invoice.note}
            </span>
          </span>
          <span
            className={`chip shrink-0 ${INVOICE_STYLES[invoice.status]} hidden sm:inline-flex`}
          >
            {invoice.status === 'overdue'
              ? 'Overdue'
              : invoice.status === 'paid'
                ? 'Paid'
                : 'On terms'}
          </span>
          <span
            className={`tnum w-24 shrink-0 text-right text-[14px] font-semibold ${
              invoice.status === 'overdue'
                ? 'text-amber-600'
                : invoice.status === 'paid'
                  ? 'text-ink-400 line-through'
                  : 'text-ink-900'
            }`}
          >
            {currency(invoice.amount)}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function BreakdownList({ rows }: { rows: BreakdownRow[] }) {
  const max = Math.max(...rows.map((r) => r.amount))
  return (
    <ul className="space-y-4">
      {rows.map((row, index) => (
        <li key={row.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="text-ink-800 truncate text-[13.5px] font-medium">
              {row.label}
            </span>
            <span className="text-ink-900 tnum shrink-0 text-[13.5px] font-semibold">
              {currency(row.amount)}
              <span className="text-ink-400 ml-2 font-medium">{count(row.count)}</span>
            </span>
          </div>
          <div className="bg-ink-100 h-2 w-full overflow-hidden rounded-full">
            <div
              className="from-brand-400 to-brand-600 h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out"
              style={{
                width: `${Math.round((row.amount / max) * 100)}%`,
                transitionDelay: `${index * 60}ms`,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export function ReviewList({ items }: { items: ReviewItem[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item.label}
          className="border-ink-200 flex items-center gap-3 rounded-xl border p-3"
        >
          <span className="tnum bg-ink-100 text-ink-700 flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-[13px] font-bold">
            {count(item.count)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-ink-900 block text-[13.5px] font-medium">{item.label}</span>
            <span className="text-ink-400 block truncate text-[12px]">{item.hint}</span>
          </span>
          <Icon name="arrowRight" className="text-ink-300 h-4 w-4 shrink-0" />
        </li>
      ))}
    </ul>
  )
}
