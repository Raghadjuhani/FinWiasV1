export type UserTypeId = 'freelancer' | 'owner' | 'accountant'
export type FeatureId = 'cashflow' | 'invoicing' | 'bookkeeping'
export type DataSourceId = 'bank' | 'file'

export type IconName =
  | 'user'
  | 'building'
  | 'users'
  | 'trending'
  | 'receipt'
  | 'book'
  | 'bank'
  | 'upload'
  | 'check'
  | 'arrowRight'
  | 'arrowLeft'
  | 'lock'
  | 'shield'
  | 'sparkles'
  | 'mail'
  | 'alert'
  | 'clock'
  | 'file'
  | 'wallet'
  | 'google'
  | 'close'
  | 'send'
  | 'refresh'
  | 'zap'

export interface Hero {
  label: string
  value: string
  sub: string
  delta?: { label: string; direction: 'up' | 'down' | 'flat' }
}

export interface Stat {
  label: string
  value: string
  hint?: string
  tone?: 'neutral' | 'positive' | 'warning'
}

export interface Insight {
  title: string
  body: string
}

export interface ForecastWeek {
  label: string
  moneyIn: number
  moneyOut: number
  balance: number
}

export interface Movement {
  name: string
  meta: string
  amount: number
  status?: 'overdue' | 'scheduled' | 'expected'
}

export type InvoiceStatus = 'overdue' | 'due' | 'paid'

export interface InvoiceRow {
  client: string
  ref: string
  amount: number
  status: InvoiceStatus
  note: string
}

export interface BreakdownRow {
  label: string
  amount: number
  count: number
}

export interface ReviewItem {
  label: string
  count: number
  hint: string
}

interface BaseView {
  hero: Hero
  stats: Stat[]
  panelTitle: string
  panelSub: string
  insight: Insight
}

export interface CashflowView extends BaseView {
  kind: 'cashflow'
  forecast: ForecastWeek[]
  movementsTitle: string
  movements: Movement[]
}

export interface InvoicingView extends BaseView {
  kind: 'invoicing'
  invoices: InvoiceRow[]
}

export interface BookkeepingView extends BaseView {
  kind: 'bookkeeping'
  breakdown: BreakdownRow[]
  reviewTitle: string
  review: ReviewItem[]
}

export type FeatureView = CashflowView | InvoicingView | BookkeepingView

export interface Persona {
  id: UserTypeId
  /** Screen 2 option copy. */
  optionTitle: string
  optionSub: string
  icon: IconName
  /** Who they become once they are inside the product. */
  personName: string
  workspaceName: string
  workspaceMeta: string
  emailPlaceholder: string
  /** The one signal from screen 2 drives both of these downstream. */
  recommendedFeature: FeatureId
  recommendedSource: DataSourceId
  featureCopy: Record<FeatureId, string>
  bank: {
    optionTitle: string
    optionSub: string
    preselectedBankId: string
    accounts: { name: string; mask: string; balance: number }[]
  }
  file: {
    optionTitle: string
    optionSub: string
    fileName: string
    fileMeta: string
  }
  importSteps: string[]
  importSummary: string
  collaborator: {
    ctaLabel: string
    role: string
    modalTitle: string
    detectedName: string
    detectedEmail: string
    detectedWhy: string
    permission: string
  }
  views: {
    cashflow: CashflowView
    invoicing: InvoicingView
    bookkeeping: BookkeepingView
  }
}
