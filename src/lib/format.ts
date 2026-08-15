const MINUS = '\u2212'

export function currency(value: number, opts: { cents?: boolean } = {}): string {
  const abs = Math.abs(value)
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: opts.cents ? 2 : 0,
    maximumFractionDigits: opts.cents ? 2 : 0,
  })
  return `${value < 0 ? MINUS : ''}$${formatted}`
}

export function signedCurrency(value: number, opts: { cents?: boolean } = {}): string {
  return value > 0 ? `+${currency(value, opts)}` : currency(value, opts)
}

export function count(value: number): string {
  return value.toLocaleString('en-US')
}
