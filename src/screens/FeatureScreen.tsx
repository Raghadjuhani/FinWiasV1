import { useMemo } from 'react'
import { StepShell } from '../components/StepShell'
import { OptionCard } from '../components/OptionCard'
import { Icon } from '../components/Icon'
import { FEATURES } from '../data/catalog'
import type { FeatureId, Persona } from '../types'

interface FeatureScreenProps {
  persona: Persona
  value: FeatureId
  onChange: (id: FeatureId) => void
  onContinue: () => void
  onBack: () => void
}

export function FeatureScreen({
  persona,
  value,
  onChange,
  onContinue,
  onBack,
}: FeatureScreenProps) {
  // Screen 2's answer decides both the order and the copy shown here.
  const ordered = useMemo(() => {
    const recommended = FEATURES.filter((f) => f.id === persona.recommendedFeature)
    const rest = FEATURES.filter((f) => f.id !== persona.recommendedFeature)
    return [...recommended, ...rest]
  }, [persona.recommendedFeature])

  const selectedName = FEATURES.find((f) => f.id === value)?.name ?? ''

  return (
    <StepShell
      step={3}
      title="What do you want to fix first?"
      subtitle={`We pre-picked the one most ${persona.optionTitle.toLowerCase()}s start with. Your dashboard leads with whatever you choose.`}
      onBack={onBack}
      footnote={
        <>
          <Icon name="sparkles" className="h-3.5 w-3.5" />
          Everything else stays one tap away
        </>
      }
    >
      <div className="space-y-3">
        {ordered.map((feature) => (
          <OptionCard
            key={feature.id}
            icon={feature.icon}
            title={feature.name}
            subtitle={persona.featureCopy[feature.id]}
            meta={feature.metric}
            badge={
              feature.id === persona.recommendedFeature ? 'Recommended for you' : undefined
            }
            selected={value === feature.id}
            onSelect={() => onChange(feature.id)}
          />
        ))}
      </div>

      <button type="button" className="btn-primary mt-6" onClick={onContinue}>
        Continue with {selectedName}
        <Icon name="arrowRight" className="h-[18px] w-[18px]" />
      </button>
    </StepShell>
  )
}
