import { useCallback, useEffect, useState } from 'react'
import { SignUpScreen } from './screens/SignUpScreen'
import { UserTypeScreen } from './screens/UserTypeScreen'
import { FeatureScreen } from './screens/FeatureScreen'
import { DataSourceScreen } from './screens/DataSourceScreen'
import { ImportingScreen } from './screens/ImportingScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { PrototypeBar } from './components/PrototypeBar'
import { PERSONAS } from './data/personas'
import { BANKS } from './data/catalog'
import type { Step } from './flow'
import type { DataSourceId, FeatureId, UserTypeId } from './types'

const DEFAULT_USER_TYPE: UserTypeId = 'freelancer'

export default function App() {
  const [step, setStep] = useState<Step>('signup')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<UserTypeId | null>(null)
  const [feature, setFeature] = useState<FeatureId>('cashflow')
  // The tab open on the dashboard; starts on whatever they picked in screen 3.
  const [viewFeature, setViewFeature] = useState<FeatureId>('cashflow')
  const [source, setSource] = useState<DataSourceId>('bank')
  const [bankId, setBankId] = useState<string>(BANKS[0].id)

  const persona = PERSONAS[userType ?? DEFAULT_USER_TYPE]
  const bank = BANKS.find((b) => b.id === bankId) ?? BANKS[0]
  const sourceLabel = source === 'bank' ? bank.name : persona.file.fileName

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  // Screen 2 is the only signal we collect, so it seeds every later default.
  const applyUserType = useCallback((id: UserTypeId) => {
    const next = PERSONAS[id]
    setUserType(id)
    setFeature(next.recommendedFeature)
    setViewFeature(next.recommendedFeature)
    setSource(next.recommendedSource)
    setBankId(next.bank.preselectedBankId)
  }, [])

  const goTo = useCallback(
    (target: Step) => {
      if (target !== 'signup' && target !== 'usertype' && !userType) {
        applyUserType(DEFAULT_USER_TYPE)
      }
      if (target === 'results') setViewFeature(feature)
      setStep(target)
    },
    [applyUserType, feature, userType],
  )

  const restart = useCallback(() => {
    setStep('signup')
    setEmail('')
    setUserType(null)
    setFeature('cashflow')
    setViewFeature('cashflow')
    setSource('bank')
    setBankId(BANKS[0].id)
  }, [])

  return (
    <>
      {step === 'signup' && (
        <SignUpScreen
          email={email}
          onEmailChange={setEmail}
          onSubmit={() => setStep('usertype')}
        />
      )}

      {step === 'usertype' && (
        <UserTypeScreen
          value={userType}
          onSelect={(id) => {
            applyUserType(id)
            setStep('feature')
          }}
          onBack={() => setStep('signup')}
        />
      )}

      {step === 'feature' && (
        <FeatureScreen
          persona={persona}
          value={feature}
          onChange={setFeature}
          onContinue={() => setStep('source')}
          onBack={() => setStep('usertype')}
        />
      )}

      {step === 'source' && (
        <DataSourceScreen
          persona={persona}
          source={source}
          bankId={bankId}
          onSourceChange={setSource}
          onBankChange={setBankId}
          onConnect={() => {
            setViewFeature(feature)
            setStep('importing')
          }}
          onBack={() => setStep('feature')}
        />
      )}

      {step === 'importing' && (
        <ImportingScreen
          persona={persona}
          sourceLabel={sourceLabel}
          onDone={() => setStep('results')}
        />
      )}

      {step === 'results' && (
        <ResultsScreen
          persona={persona}
          feature={viewFeature}
          chosenFeature={feature}
          onFeatureChange={setViewFeature}
          sourceLabel={sourceLabel}
          email={email || persona.emailPlaceholder}
          onRestart={restart}
        />
      )}

      <PrototypeBar step={step} onNavigate={goTo} onRestart={restart} />
    </>
  )
}
