import { useEffect, useState } from 'react'
import { StepShell } from '../components/StepShell'
import { OptionCard } from '../components/OptionCard'
import { Icon } from '../components/Icon'
import { PERSONAS, PERSONA_ORDER } from '../data/personas'
import type { UserTypeId } from '../types'

interface UserTypeScreenProps {
  value: UserTypeId | null
  onSelect: (id: UserTypeId) => void
  onBack: () => void
}

export function UserTypeScreen({ value, onSelect, onBack }: UserTypeScreenProps) {
  const [pending, setPending] = useState<UserTypeId | null>(null)

  // Selecting is the whole step — highlight the choice, then move on.
  useEffect(() => {
    if (!pending) return
    const timer = window.setTimeout(() => onSelect(pending), 260)
    return () => window.clearTimeout(timer)
  }, [pending, onSelect])

  const selected = pending ?? value

  return (
    <StepShell
      step={2}
      title="Which one sounds like you?"
      subtitle="This is the only thing we ask. It sets your data source, your dashboard and what we put front and centre."
      onBack={onBack}
      footnote={
        <>
          <Icon name="refresh" className="h-3.5 w-3.5" />
          You can change this any time in settings
        </>
      }
    >
      <div className="space-y-3">
        {PERSONA_ORDER.map((id) => {
          const persona = PERSONAS[id]
          return (
            <OptionCard
              key={id}
              icon={persona.icon}
              title={persona.optionTitle}
              subtitle={persona.optionSub}
              selected={selected === id}
              onSelect={() => setPending(id)}
            />
          )
        })}
      </div>
    </StepShell>
  )
}
