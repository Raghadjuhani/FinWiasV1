# FinWise — onboarding prototype

A clickable onboarding prototype for **FinWise Co.**, a financial-management SaaS for small
businesses running a product-led, reverse-trial motion. It takes a brand-new trial user from
sign-up to a populated, personalized dashboard in five screens.

## The Aha moment

> **Within 90 seconds of signing up, the user sees their own money — real balances, real
> invoices, real categorised transactions — turned into one number and one insight they did
> not have before, without typing a single figure in by hand.**

Everything in the flow is subordinate to that: no screen exists unless it makes the payoff
land faster or makes it land harder.

## Run it

```bash
npm install
npm run dev     # http://localhost:5173
```

```bash
npm run build   # type-check + production build into dist/
npm run preview # serve the production build
```

## The flow

| # | Screen | Job | The one action |
|---|--------|-----|----------------|
| 1 | Sign up | Get them in with zero friction | Email + password (or one-tap Google) |
| 2 | User type | Capture the single signal that personalizes everything downstream | Pick one of three |
| 3 | Feature interest | Let them name the use case that made them sign up | Confirm the pre-picked feature, or switch |
| 4 | Data source | Get real data in by the fastest path available | Connect the pre-selected bank, or import the pre-attached file |
| 5 | Results (Aha) | Pay it off with real numbers, then convert trust into collaboration | View dashboard → **Invite your accountant / bookkeeper / client** |

A short import screen sits between 4 and 5. It is a transition, not a step: it shows the work
being done (`Categorising 2,417 transactions`) so the numbers on screen 5 feel earned.

## How screen 2 personalizes the rest

The user type is the only question the flow asks, and it drives three things:

| User type | Default feature emphasis | Fastest data path | Collaboration CTA |
|-----------|--------------------------|-------------------|-------------------|
| Freelancer | Invoicing — getting paid is the pain | Connect bank (Chase pre-selected) | Invite your accountant |
| Small business owner | Cash flow — payroll vs. receivables | Connect bank (Bank of America pre-selected) | Invite your bookkeeper |
| Accountant managing clients | Bookkeeping — closing books | **Import client ledgers** — accountants arrive with exports, not with their clients' bank credentials | Invite your client |

It also swaps the sample workspace (`Nadia Osei Studio`, `Riverbend Coffee Co.`,
`Hartwell & Co. Advisory`), every number on the dashboard, the import steps, and the
collaborator FinWise "detects" in the imported data.

## Design decisions worth calling out

- **One thing per screen.** Screens 2, 3 and 4 ask exactly one question. Screen 2 advances the
  moment you tap, because the tap _is_ the answer.
- **Pre-fill everything that is not the answer.** The recommended feature is pre-selected, the
  likely bank is pre-selected, the sample file is pre-attached, and the invite email is
  pre-filled from a payment FinWise spotted in the transaction history.
- **The payoff is a number plus a judgement.** Every dashboard pairs the hero figure with one
  written insight ("You dip under $10k in week 6 — two overdue invoices are the reason"),
  because a chart alone is not an Aha moment.
- **The collaboration ask comes after the payoff, never before.** Screen 5 leads with value and
  ends with a single CTA; competing actions are deliberately muted.
- **Reverse trial framing throughout.** "Pro trial · 14 days" is visible on every screen, with
  no credit-card gate anywhere in the flow.

## Clicking through it

- The flow is fully navigable: the in-screen back arrows and CTAs walk the happy path.
- The floating **Prototype** bar (desktop) jumps to any screen, restarts the flow, and responds
  to the ← / → arrow keys.
- On the dashboard, the feature tabs switch between the cash-flow, invoicing and bookkeeping
  views so you can see how each user type's data reads in all three.
- Everything is responsive down to a 375px-wide phone.

## Sample data

All figures are hand-built fixtures in `src/data/personas.ts` and are internally consistent:
account balances sum to the headline cash figure, invoice line items sum to the outstanding
and overdue totals, and each written insight refers to numbers that actually appear on the
screen. No API, no backend, no persistence.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS v4. No component library, no charting library — the
forecast bars and breakdown meters are plain CSS so the whole thing stays under 80 kB gzipped.

```
src/
  App.tsx              flow state machine
  flow.ts              screen order shared with the prototype bar
  data/personas.ts     the three personas and every number they see
  screens/             one file per screen
  components/          shell, options, dashboard panels, invite modal
```
