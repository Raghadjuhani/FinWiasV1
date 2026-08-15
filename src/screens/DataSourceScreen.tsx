import { StepShell } from '../components/StepShell'
import { OptionCard } from '../components/OptionCard'
import { Icon } from '../components/Icon'
import { BANKS } from '../data/catalog'
import type { DataSourceId, Persona } from '../types'

interface DataSourceScreenProps {
  persona: Persona
  source: DataSourceId
  bankId: string
  onSourceChange: (source: DataSourceId) => void
  onBankChange: (bankId: string) => void
  onConnect: () => void
  onBack: () => void
}

export function DataSourceScreen({
  persona,
  source,
  bankId,
  onSourceChange,
  onBankChange,
  onConnect,
  onBack,
}: DataSourceScreenProps) {
  const bank = BANKS.find((b) => b.id === bankId) ?? BANKS[0]
  const bankRecommended = persona.recommendedSource === 'bank'

  return (
    <StepShell
      step={4}
      title="Now let's get your real numbers in"
      subtitle="One connection is all it takes. We only ever read — FinWise can't move your money."
      onBack={onBack}
      footnote={
        <>
          <Icon name="shield" className="h-3.5 w-3.5" />
          Read-only · 256-bit encryption · Disconnect in one click
        </>
      }
    >
      <div className="space-y-3">
        <div>
          <OptionCard
            icon="bank"
            title={persona.bank.optionTitle}
            subtitle={persona.bank.optionSub}
            meta="About 30 seconds"
            badge={bankRecommended ? 'Fastest' : undefined}
            selected={source === 'bank'}
            onSelect={() => onSourceChange('bank')}
          />
          {source === 'bank' && (
            <div className="animate-rise border-brand-200 bg-brand-50/50 mt-2 rounded-2xl border p-4">
              <p className="text-ink-600 mb-3 text-[13px] font-semibold">
                {bankRecommended
                  ? 'We pre-selected the bank most likely to be yours'
                  : 'Pick the institution to link'}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {BANKS.map((option) => {
                  const active = option.id === bankId
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onBankChange(option.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl border bg-white px-2 py-3 transition ${
                        active
                          ? 'border-brand-500 ring-brand-500/20 ring-4'
                          : 'border-ink-200 hover:border-ink-300'
                      }`}
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                        style={{ backgroundColor: option.color }}
                      >
                        {option.short}
                      </span>
                      <span className="text-ink-700 text-center text-[11px] leading-tight font-medium">
                        {option.name}
                      </span>
                    </button>
                  )
                })}
              </div>
              <p className="text-ink-400 mt-3 text-center text-[11px]">
                Or search 12,000+ banks and credit unions
              </p>
            </div>
          )}
        </div>

        <div>
          <OptionCard
            icon="upload"
            title={persona.file.optionTitle}
            subtitle={persona.file.optionSub}
            meta="About 2 minutes"
            badge={!bankRecommended ? 'Fastest for you' : undefined}
            selected={source === 'file'}
            onSelect={() => onSourceChange('file')}
          />
          {source === 'file' && (
            <div className="animate-rise border-brand-200 bg-brand-50/50 mt-2 rounded-2xl border p-4">
              <div className="border-ink-200 flex items-center gap-3 rounded-xl border bg-white p-3">
                <span className="bg-ink-100 text-ink-600 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon name="file" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-ink-900 block truncate text-[14px] font-semibold">
                    {persona.file.fileName}
                  </span>
                  <span className="text-ink-500 block text-[12.5px]">
                    {persona.file.fileMeta}
                  </span>
                </span>
                <span className="chip bg-brand-100 text-brand-800 shrink-0">
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  Ready
                </span>
              </div>
              <p className="text-ink-400 mt-3 text-center text-[11px]">
                Drag in a different file, or browse your computer
              </p>
            </div>
          )}
        </div>
      </div>

      <button type="button" className="btn-primary mt-6" onClick={onConnect}>
        {source === 'bank' ? (
          <>
            <Icon name="lock" className="h-[18px] w-[18px]" />
            Connect {bank.name} securely
          </>
        ) : (
          <>
            <Icon name="upload" className="h-[18px] w-[18px]" />
            Import {persona.file.fileName.split('.')[0].slice(0, 28)}
          </>
        )}
      </button>
    </StepShell>
  )
}
