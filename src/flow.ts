export type Step = 'signup' | 'usertype' | 'feature' | 'source' | 'importing' | 'results'

/** The screens a reviewer can jump between; the import screen is a transition. */
export const NAV_STEPS: { id: Step; label: string }[] = [
  { id: 'signup', label: 'Sign up' },
  { id: 'usertype', label: 'User type' },
  { id: 'feature', label: 'Feature' },
  { id: 'source', label: 'Data source' },
  { id: 'results', label: 'Results' },
]
