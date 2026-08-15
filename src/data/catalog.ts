import type { FeatureId, IconName } from '../types'

export const FEATURES: {
  id: FeatureId
  name: string
  icon: IconName
  metric: string
}[] = [
  { id: 'cashflow', name: 'Cash flow', icon: 'trending', metric: 'Live balance + 8-week forecast' },
  { id: 'invoicing', name: 'Invoicing', icon: 'receipt', metric: 'Who owes you, and how late' },
  { id: 'bookkeeping', name: 'Bookkeeping', icon: 'book', metric: 'Auto-categorised, tax-ready books' },
]

export const BANKS: { id: string; name: string; short: string; color: string }[] = [
  { id: 'chase', name: 'Chase', short: 'CH', color: '#1567b3' },
  { id: 'bofa', name: 'Bank of America', short: 'BA', color: '#c0203a' },
  { id: 'wells', name: 'Wells Fargo', short: 'WF', color: '#b9282d' },
  { id: 'mercury', name: 'Mercury', short: 'MC', color: '#5754d8' },
  { id: 'novo', name: 'Novo', short: 'NV', color: '#0c8a65' },
  { id: 'amex', name: 'Amex Business', short: 'AX', color: '#1c6fb8' },
]

export const TRIAL_DAYS_LEFT = 14
