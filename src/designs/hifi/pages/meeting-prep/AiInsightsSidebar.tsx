import type { ReactNode } from 'react'
import { MP_THEME as theme } from './content'

function InsightBadge({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${className}`}
    >
      {children}
    </span>
  )
}

/** Unchanged across meeting-prep variants — reference to main hub cards. */
export default function AiInsightsSidebar() {
  return (
    <aside
      className="w-full shrink-0 border-t border-[#E8EAED] bg-white p-6 lg:w-[min(32%,380px)] lg:border-l lg:border-t-0"
      style={{ boxShadow: '-1px 0 0 rgba(15, 23, 42, 0.04)' }}
    >
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-900">AI Insights</h2>
        <p className="mt-0.5 text-sm text-slate-500">Personalized for you</p>
      </div>

      <div className="space-y-4">
        <article
          className="rounded-2xl border border-[#E8EAED] bg-white p-4"
          style={{ boxShadow: theme.shadowSm }}
        >
          <InsightBadge className="bg-[#E8F5E9] text-[#004B28]">ON TRACK</InsightBadge>
          <h3 className="mt-3 text-[15px] font-bold text-slate-900">Monthly Target</h3>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">78%</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full transition-[width]"
              style={{ width: '78%', backgroundColor: theme.green }}
            />
          </div>
          <p className="mt-2 text-sm text-slate-600">EUR 45,200 of EUR 58,000</p>
        </article>

        <article
          className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-4"
          style={{ boxShadow: theme.shadowSm }}
        >
          <InsightBadge className="bg-amber-100/90 text-amber-800">OPPORTUNITY</InsightBadge>
          <h3 className="mt-3 text-[15px] font-bold text-slate-900">Café de Jaren</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
            This outlet increased orders by 34% last month. Consider offering the new Heineken
            Silver promotion.
          </p>
        </article>

        <article
          className="rounded-2xl border border-sky-200/80 bg-sky-50/90 p-4"
          style={{ boxShadow: theme.shadowSm }}
        >
          <InsightBadge className="bg-sky-100 text-sky-800">TREND</InsightBadge>
          <h3 className="mt-3 text-[15px] font-bold text-slate-900">Premium beers up 12%</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
            Your territory shows growing interest in premium variants. Focus on Heineken 0.0 and
            Silver.
          </p>
        </article>

        <article
          className="rounded-2xl border border-[#E8EAED] bg-white p-4"
          style={{ boxShadow: theme.shadowSm }}
        >
          <InsightBadge className="bg-slate-100 text-slate-700">SUGGESTED FOCUS</InsightBadge>
          <h3 className="mt-3 text-[15px] font-bold text-slate-900">
            Lead with Silver draft placement
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
            Tie the conversation to last month&apos;s uplift and the UEFA promo deck before closing
            on next steps.
          </p>
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-95 active:opacity-90"
            style={{ backgroundColor: theme.green }}
          >
            Open recommendation
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </article>
      </div>
    </aside>
  )
}
