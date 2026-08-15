import { useState } from 'react'
import { BrandMark } from '../components/BrandMark'
import { Icon } from '../components/Icon'
import { InviteModal } from '../components/InviteModal'
import { ForecastChart } from '../components/dashboard/ForecastChart'
import {
  BreakdownList,
  InsightCard,
  InvoiceTable,
  MovementList,
  Panel,
  ReviewList,
  StatGrid,
} from '../components/dashboard/Panels'
import { FEATURES, TRIAL_DAYS_LEFT } from '../data/catalog'
import { currency } from '../lib/format'
import type { FeatureId, Persona } from '../types'

interface ResultsScreenProps {
  persona: Persona
  feature: FeatureId
  chosenFeature: FeatureId
  onFeatureChange: (feature: FeatureId) => void
  sourceLabel: string
  email: string
  onRestart: () => void
}

export function ResultsScreen({
  persona,
  feature,
  chosenFeature,
  onFeatureChange,
  sourceLabel,
  email,
  onRestart,
}: ResultsScreenProps) {
  const [inviteOpen, setInviteOpen] = useState(false)
  const view = persona.views[feature]
  const featureName = FEATURES.find((f) => f.id === feature)?.name ?? ''

  return (
    <div className="min-h-dvh pb-28 sm:pb-10">
      <header className="border-ink-200/80 sticky top-0 z-30 border-b bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-3 px-4 sm:px-6">
          <BrandMark withWordmark={false} />
          <div className="min-w-0 flex-1">
            <p className="text-ink-900 truncate text-[14px] font-semibold">
              {persona.workspaceName}
            </p>
            <p className="text-ink-400 truncate text-[12px]">{persona.workspaceMeta}</p>
          </div>
          <span className="chip border-brand-200 bg-brand-50 text-brand-700 hidden border sm:inline-flex">
            <Icon name="sparkles" className="h-3.5 w-3.5" />
            Pro trial · {TRIAL_DAYS_LEFT} days left
          </span>
          <button
            type="button"
            onClick={onRestart}
            className="text-ink-500 hover:bg-ink-100 hover:text-ink-900 rounded-lg px-2.5 py-1.5 text-[13px] font-semibold transition"
          >
            Start over
          </button>
          <span
            className="bg-ink-900 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
            title={email}
          >
            {persona.personName.slice(0, 1)}
          </span>
        </div>
      </header>

      <main className="animate-screen-in mx-auto w-full max-w-5xl space-y-5 px-4 py-6 sm:px-6 sm:py-8">
        <div>
          <span className="text-brand-700 flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="bg-brand-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
              <span className="bg-brand-500 relative inline-flex h-2 w-2 rounded-full" />
            </span>
            Live · synced from {sourceLabel}
          </span>
          <h1 className="text-ink-900 mt-2 text-[26px] leading-tight font-semibold tracking-[-0.025em] sm:text-[32px]">
            Here is your money, {persona.personName}.
          </h1>
          <p className="text-ink-500 mt-2 max-w-2xl text-[15px]">
            {persona.importSummary} — read, categorised and turned into the numbers below.
            Nothing typed in by hand.
          </p>
        </div>

        <FeatureTabs
          value={feature}
          chosen={chosenFeature}
          onChange={onFeatureChange}
        />

        <section className="card overflow-hidden">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div>
              <p className="text-ink-500 text-[13px] font-medium">{view.hero.label}</p>
              <p className="text-ink-900 tnum animate-pop-in mt-1.5 text-[42px] leading-none font-semibold tracking-[-0.03em] sm:text-[52px]">
                {view.hero.value}
              </p>
              <p className="text-ink-400 mt-2.5 text-[13px]">{view.hero.sub}</p>
            </div>
            {view.hero.delta && (
              <span
                className={`chip w-fit px-3 py-1.5 text-[13px] ${
                  view.hero.delta.direction === 'up'
                    ? 'bg-brand-50 text-brand-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                <Icon
                  name={view.hero.delta.direction === 'up' ? 'trending' : 'alert'}
                  className="h-4 w-4"
                />
                {view.hero.delta.label}
              </span>
            )}
          </div>
        </section>

        <StatGrid stats={view.stats} />

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">
          <Panel
            title={view.panelTitle}
            sub={view.panelSub}
            className="lg:col-span-2"
            action={
              <span className="chip bg-ink-100 text-ink-500 hidden shrink-0 sm:inline-flex">
                {featureName}
              </span>
            }
          >
            {view.kind === 'cashflow' && <ForecastChart weeks={view.forecast} />}
            {view.kind === 'invoicing' && <InvoiceTable invoices={view.invoices} />}
            {view.kind === 'bookkeeping' && <BreakdownList rows={view.breakdown} />}
          </Panel>

          {view.kind === 'cashflow' && (
            <Panel title={view.movementsTitle} sub="Straight from your feed">
              <MovementList movements={view.movements} />
            </Panel>
          )}
          {view.kind === 'invoicing' && (
            <Panel title="Reminders ready to send" sub="Written for you, one tap to send">
              <ul className="space-y-2.5">
                {view.invoices
                  .filter((invoice) => invoice.status === 'overdue')
                  .map((invoice) => (
                    <li
                      key={invoice.ref}
                      className="border-ink-200 flex items-center gap-3 rounded-xl border p-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                        <Icon name="clock" className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="text-ink-900 block truncate text-[13.5px] font-medium">
                          {invoice.client}
                        </span>
                        <span className="text-ink-400 block truncate text-[12px]">
                          {currency(invoice.amount)} · {invoice.note}
                        </span>
                      </span>
                      <span className="chip bg-ink-100 text-ink-500 shrink-0">Queued</span>
                    </li>
                  ))}
              </ul>
            </Panel>
          )}
          {view.kind === 'bookkeeping' && (
            <Panel title={view.reviewTitle} sub="Everything else is already done">
              <ReviewList items={view.review} />
            </Panel>
          )}
        </div>

        <InsightCard insight={view.insight} />

        <section className="card border-brand-200 bg-brand-50/40 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <span className="bg-brand-600 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white">
            <Icon name="users" />
          </span>
          <div className="flex-1">
            <h2 className="text-ink-900 text-[17px] font-semibold tracking-[-0.01em]">
              {persona.collaborator.ctaLabel}
            </h2>
            <p className="text-ink-600 mt-1.5 text-[14px] leading-relaxed">
              These numbers are only as good as the person checking them. We already spotted{' '}
              <span className="text-ink-900 font-semibold">
                {persona.collaborator.detectedName}
              </span>{' '}
              in your data — invite them and they see this dashboard too.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary sm:w-auto sm:px-6"
            onClick={() => setInviteOpen(true)}
          >
            {persona.collaborator.ctaLabel}
            <Icon name="arrowRight" className="h-[18px] w-[18px]" />
          </button>
        </section>
      </main>

      <div className="border-ink-200 fixed inset-x-0 bottom-0 z-30 border-t bg-white/95 p-3 backdrop-blur-md sm:hidden">
        <button type="button" className="btn-primary" onClick={() => setInviteOpen(true)}>
          {persona.collaborator.ctaLabel}
          <Icon name="arrowRight" className="h-[18px] w-[18px]" />
        </button>
      </div>

      {inviteOpen && <InviteModal persona={persona} onClose={() => setInviteOpen(false)} />}
    </div>
  )
}

function FeatureTabs({
  value,
  chosen,
  onChange,
}: {
  value: FeatureId
  chosen: FeatureId
  onChange: (feature: FeatureId) => void
}) {
  return (
    <div>
      <div className="border-ink-200 flex gap-1 overflow-x-auto rounded-xl border bg-white p-1">
        {FEATURES.map((feature) => {
          const active = feature.id === value
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => onChange(feature.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold whitespace-nowrap transition ${
                active
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-500 hover:bg-ink-100 hover:text-ink-900'
              }`}
            >
              <Icon name={feature.icon} className="h-4 w-4" />
              {feature.name}
            </button>
          )
        })}
      </div>
      <p className="text-ink-400 mt-2 flex items-center gap-1.5 px-1 text-[12.5px]">
        <Icon name="check" className="text-brand-600 h-3.5 w-3.5" strokeWidth={3} />
        {value === chosen
          ? `Leading with ${FEATURES.find((f) => f.id === chosen)?.name} because you picked it during setup`
          : `Switched view — ${FEATURES.find((f) => f.id === chosen)?.name} is still your default`}
      </p>
    </div>
  )
}
