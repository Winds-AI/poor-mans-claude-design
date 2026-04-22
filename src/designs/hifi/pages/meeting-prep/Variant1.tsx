import AiInsightsSidebar from './AiInsightsSidebar'
import { MP_THEME as theme, meetingPrepCopy, meetingTabs as tabs } from './content'

/**
 * Sales Coach — Meeting Preparation screen (hi-fi page).
 * Themed like APB Sales AI: cool gray canvas, forest green accent, soft shadows, pill insight badges.
 */

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2.5 pl-5 text-[16px] leading-relaxed text-slate-800">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function CardShell({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-[#E8EAED] bg-white p-6 ${className}`}
      style={{ boxShadow: theme.shadowSm }}
    >
      {children}
    </section>
  )
}

export default function MeetingPrepHifiPage() {
  const c = meetingPrepCopy
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E8EAED] text-slate-900 [font-family:Manrope,system-ui,sans-serif]"
      style={{ backgroundColor: theme.bg, boxShadow: theme.shadow }}
      data-design="meeting-prep-hifi"
    >
      <header
        className="border-b border-[#E8EAED] bg-white px-6 pb-4 pt-6"
        style={{ boxShadow: '0 1px 0 rgba(15, 23, 42, 0.04)' }}
      >
        <h1 className="text-[28px] font-bold tracking-tight text-slate-900 sm:text-[30px]">{c.outletName}</h1>
        <p className="mt-1.5 text-[16px] text-slate-600">
          {c.when} • {c.where} • Contact: {c.contactName}
        </p>
      </header>

      <nav
        className="flex gap-10 border-b border-[#E8EAED] bg-white px-6 sm:px-8"
        aria-label="Meeting sections"
      >
        {tabs.map((label) => {
          const active = label === 'Meeting Preparation'
          return (
            <button
              key={label}
              type="button"
              className={[
                'relative min-h-[52px] pb-4 pt-4 text-[17px] transition-colors sm:min-h-[56px] sm:text-[18px]',
                active
                  ? 'font-semibold text-[#004B28] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-t after:bg-[#004B28]'
                  : 'font-normal text-slate-600 hover:text-slate-800',
              ].join(' ')}
            >
              {label}
            </button>
          )
        })}
      </nav>

      <div className="flex min-h-[520px] flex-col lg:flex-row">
        <div className="flex-1 px-6 py-6 sm:px-8 sm:py-8" style={{ backgroundColor: theme.bg }}>
          <div className="grid w-full auto-rows-auto grid-cols-1 content-start items-start gap-5 sm:grid-cols-2 sm:gap-6">
            <CardShell className="flex flex-col">
              <h2 className="mb-4 text-lg font-bold text-slate-900">Outlet info</h2>
              <div className="space-y-3 text-[16px] leading-relaxed text-slate-800">
                <p>
                  {c.where} • Tier: {c.tier}
                </p>
                <p>
                  Contact: {c.contactName} • {c.contactPhone}
                </p>
                <p>
                  Customer since {c.customerSince} • {c.seats} • Hours: {c.hours}
                </p>
              </div>
            </CardShell>

            <CardShell className="flex flex-col">
              <h2 className="mb-4 text-lg font-bold text-slate-900">Objectives</h2>
              <BulletList items={c.objectives} />
            </CardShell>

            <CardShell className="flex flex-col">
              <h2 className="mb-4 text-lg font-bold text-slate-900">Prep materials</h2>
              <BulletList items={c.prepItems} />
            </CardShell>
          </div>
        </div>

        <AiInsightsSidebar />
      </div>
    </div>
  )
}
