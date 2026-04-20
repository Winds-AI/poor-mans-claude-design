/**
 * PURPOSE
 * Goal: Hi-fi main chat view for the moment right after four research specialists spawn — feels
 *       alive and trustworthy without implying fake per-agent completion %.
 * Real usage: Center column only; user just submitted a competitor research request.
 * Primary user: Founder/researcher watching a long multi-agent run.
 * Core actions: Read status, scan the four agents, internalize the “this takes time” callout, follow up or stop from composer.
 * Priority: Calm premium light UI — zinc neutrals, one restrained accent per agent. Demo tiles mix
 *          queued, working, and done so every status is visible; working cards use bouncing dots only.
 * Constraints: Tailwind only, inline SVG icons only, single <style> block for motion. No sidebars.
 */

const USER_MESSAGE =
  "Please run a competitor scan on goodfirms.co and close peers. Keep the write-up short — I'm mainly checking how the live progress looks in the product."

type AgentStatus = 'queued' | 'working' | 'done'

const AGENTS = [
  {
    id: 'landscape',
    name: 'Landscape Analyst',
    mission: "Who counts as a competitor, and who's adjacent",
    icon: 'compass' as const,
    status: 'queued' as const satisfies AgentStatus,
    accent: {
      tile: 'bg-slate-50 ring-slate-200/90',
      icon: 'text-slate-700',
      bar: 'bg-slate-600',
      track: 'bg-slate-100',
      pulse: 'bg-slate-400/50',
    },
  },
  {
    id: 'positioning',
    name: 'Positioning Analyst',
    mission: 'How they talk about themselves and stand out',
    icon: 'target' as const,
    status: 'working' as const satisfies AgentStatus,
    accent: {
      tile: 'bg-indigo-50/80 ring-indigo-200/80',
      icon: 'text-indigo-800',
      bar: 'bg-indigo-600',
      track: 'bg-indigo-100/80',
      pulse: 'bg-indigo-400/45',
    },
  },
  {
    id: 'pricing-strategy',
    name: 'Pricing & Strategy',
    mission: 'How they make money and win leads',
    icon: 'trend' as const,
    status: 'working' as const satisfies AgentStatus,
    accent: {
      tile: 'bg-amber-50/80 ring-amber-200/80',
      icon: 'text-amber-900',
      bar: 'bg-amber-600',
      track: 'bg-amber-100/80',
      pulse: 'bg-amber-400/45',
    },
  },
  {
    id: 'pricing',
    name: 'Pricing Analyst',
    mission: 'Published prices, tiers, and vendor costs',
    icon: 'tag' as const,
    status: 'done' as const satisfies AgentStatus,
    accent: {
      tile: 'bg-emerald-50/80 ring-emerald-200/80',
      icon: 'text-emerald-900',
      bar: 'bg-emerald-600',
      track: 'bg-emerald-100/80',
      pulse: 'bg-emerald-400/45',
    },
  },
] as const

const AGENT_TOTAL = AGENTS.length
const AGENTS_DONE_COUNT = AGENTS.filter((a) => a.status === 'done').length

function AgentGlyph({ name, className }: { name: (typeof AGENTS)[number]['icon']; className?: string }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.65,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }
  switch (name) {
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.2 5.3-5.3 2.2 2.2-5.3 5.3-2.2Z" />
        </svg>
      )
    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'trend':
      return (
        <svg {...common}>
          <path d="M4 16h4l3-6 4 4 5-9" />
          <path d="M18 6v4h-4" />
        </svg>
      )
    case 'tag':
      return (
        <svg {...common}>
          <path d="M4 10.5V6a2 2 0 0 1 2-2h4.5L20 13.5 10.5 23 4 16.5V10.5Z" />
          <circle cx="8.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
  }
}

function AgentSpawnTile({ agent, staggerMs = 0 }: { agent: (typeof AGENTS)[number]; staggerMs?: number }) {
  const { accent, status } = agent
  const isWorking = status === 'working'
  const isQueued = status === 'queued'
  const isDone = status === 'done'

  const ariaStatus = isDone ? 'Finished' : isWorking ? 'Working' : 'Queued, waiting to start'

  return (
    <div
      className="spawn-fade-up group relative flex flex-col gap-3 rounded-xl bg-white p-3.5 shadow-sm ring-1 ring-zinc-200/80 transition duration-200 hover:ring-zinc-300/90"
      style={{ animationDelay: `${staggerMs}ms` }}
      aria-label={`${agent.name}: ${agent.mission}. ${ariaStatus}.`}
    >
      <span
        className={`pointer-events-none absolute -inset-px rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 ${accent.pulse}`}
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <div className="relative">
          {isWorking && (
            <span
              className={`absolute -inset-1 animate-[spawn-breathe_2.4s_ease-in-out_infinite] rounded-[11px] ${accent.pulse} blur-[7px]`}
              aria-hidden
            />
          )}
          <div
            className={`relative flex h-10 w-10 items-center justify-center rounded-[10px] ring-1 ${accent.tile} ${isDone ? 'opacity-95' : ''}`}
          >
            <AgentGlyph name={agent.icon} className={`h-5 w-5 ${accent.icon}`} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[13px] font-semibold leading-tight text-zinc-900">{agent.name}</h3>
            {isDone && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-medium text-white">
                <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
                Done
              </span>
            )}
            {isWorking && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Working
              </span>
            )}
            {isQueued && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 ring-1 ring-zinc-200/90">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" aria-hidden />
                Queued
              </span>
            )}
          </div>
          <p className="mt-1 text-[12px] leading-snug text-zinc-500">{agent.mission}</p>
        </div>
      </div>
      {isWorking && (
        <div
          className={`inline-flex max-w-full items-center gap-2 rounded-full px-2.5 py-1.5 ring-1 ring-zinc-900/[0.06] ${accent.track}`}
          aria-hidden
        >
          <span className="flex items-center gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`spawn-activity-dot h-1 w-1 shrink-0 rounded-full ${accent.bar}`}
                style={{ animationDelay: `${i * 0.14}s` }}
              />
            ))}
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${accent.icon}`}>Working</span>
        </div>
      )}
      {isQueued && (
        <div
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-zinc-50 px-2.5 py-1.5 ring-1 ring-zinc-200/80"
          aria-hidden
        >
          <span className="flex items-center gap-0.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
            ))}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">In line</span>
        </div>
      )}
      {isDone && (
        <div
          className="inline-flex max-w-full items-center gap-2 rounded-full bg-emerald-50/90 px-2.5 py-1.5 ring-1 ring-emerald-200/70"
          aria-hidden
        >
          <svg className="h-3.5 w-3.5 shrink-0 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800">Complete</span>
        </div>
      )}
    </div>
  )
}

export default function CompetitorResearchSpawnMainHifiPage() {
  return (
    <div className="flex max-h-[min(90vh,880px)] min-h-[560px] flex-col overflow-hidden rounded-2xl bg-[#fafaf9] font-sans text-[13.5px] text-zinc-900 shadow-2xl shadow-zinc-900/[0.06] ring-1 ring-zinc-200/80">
      <style>{`
        @keyframes spawn-breathe {
          0%, 100% { opacity: .32; transform: scale(0.96); }
          50%      { opacity: .75; transform: scale(1.03); }
        }
        @keyframes spawn-activity-bounce {
          0%, 70%, 100% { transform: translateY(0); }
          35% { transform: translateY(-5px); }
        }
        .spawn-activity-dot {
          animation: spawn-activity-bounce 0.95s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .spawn-fade-up {
          animation: spawn-fade-up 0.45s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes spawn-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .spawn-dotgrid {
          background-image: radial-gradient(circle, rgba(24,24,27,0.055) 1px, transparent 1px);
          background-size: 15px 15px;
        }
        @media (prefers-reduced-motion: reduce) {
          .spawn-activity-dot, .spawn-fade-up { animation: none; }
        }
      `}</style>

      <header className="flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/85 px-5 py-3 backdrop-blur-sm">
        <div className="min-w-0">
          <h1 className="truncate text-[13px] font-semibold text-zinc-900">GoodFirms · competitor research</h1>
          <p className="mt-0.5 text-[11.5px] text-zinc-500">Your research run is active</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden font-mono text-[11px] tabular-nums text-zinc-400 sm:inline">00:00</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 ring-1 ring-zinc-200/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="spawn-dotgrid min-h-0 flex-1 overflow-y-auto px-5 py-6">
          <div className="mx-auto flex max-w-3xl flex-col gap-5">
            <div className="spawn-fade-up flex justify-end" style={{ animationDelay: '0ms' }}>
              <div className="max-w-[min(100%,26rem)] rounded-2xl rounded-tr-md bg-zinc-900 px-4 py-2.5 text-[13px] leading-relaxed text-white shadow-md shadow-zinc-900/15">
                {USER_MESSAGE}
              </div>
            </div>

            <div
              className="spawn-fade-up rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/80 sm:p-5"
              style={{ animationDelay: '70ms' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[15px] font-semibold tracking-tight text-zinc-900">Your research team is here</h2>
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 ring-1 ring-zinc-200/80">
                      {AGENTS_DONE_COUNT} of {AGENT_TOTAL} done
                    </span>
                  </div>
                  <p className="max-w-xl text-[12.5px] leading-snug text-zinc-500">
                    Four researchers run in parallel. Each card shows whether they’re waiting in line,
                    actively working (bouncing dots), or already finished. Updates appear here as they
                    find something worth sharing — there’s no fixed countdown.
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg px-3 py-2 text-[12px] font-medium text-zinc-600 ring-1 ring-zinc-200/90 transition hover:bg-zinc-50 active:scale-[0.98]"
                >
                  See details
                </button>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {AGENTS.map((a, i) => (
                  <AgentSpawnTile key={a.id} agent={a} staggerMs={120 + i * 50} />
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-gradient-to-b from-amber-50/95 to-amber-50/50 px-4 py-3.5 ring-1 ring-amber-200/70">
                <div className="flex gap-3 sm:gap-3.5">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/80 text-amber-800 shadow-sm ring-1 ring-amber-200/60"
                    aria-hidden
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.65} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[13px] font-semibold leading-snug text-zinc-900">
                      No need to hover over the screen
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-700">
                      Good research reads real pages and takes time. Most full runs land around{' '}
                      <strong className="font-semibold text-zinc-900">10–15 minutes</strong> (sometimes a little less, sometimes
                      more). It’s fine to grab coffee, answer email, or switch tabs — just leave this
                      one open. When the little dots on a card are bouncing, that researcher is still
                      busy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 active:scale-[0.97]"
                    aria-label="Copy"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="8" y="8" width="12" height="12" rx="2" />
                      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 active:scale-[0.97]"
                    aria-label="Regenerate"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                      <path d="M21 21v-5h-5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 active:scale-[0.97]"
                    aria-label="Helpful"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 active:scale-[0.97]"
                    aria-label="Not helpful"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200/80 bg-white/90 px-5 py-4 backdrop-blur-sm">
          <div className="mx-auto max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[12px]">
              <span className="text-zinc-500">Replying as</span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 px-2.5 py-1.5 font-medium text-zinc-800 ring-1 ring-zinc-200/90 hover:bg-zinc-100/80"
              >
                Founder / CEO
                <svg className="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
            <div className="flex items-end gap-2 rounded-xl border border-zinc-200/90 bg-zinc-50/80 p-2 ring-1 ring-zinc-200/40">
              <button
                type="button"
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-white hover:text-zinc-600"
                aria-label="Attach"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m21 12-8.5 8.5a5 5 0 1 1-7-7L13 5a3.4 3.4 0 1 1 4.8 4.8l-9 9a1.7 1.7 0 0 1-2.4-2.4L14 8.6" />
                </svg>
              </button>
              <input
                type="text"
                readOnly
                placeholder="Type a follow-up or extra context anytime…"
                className="min-w-0 flex-1 bg-transparent py-2 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-[12px] font-medium text-white transition active:scale-[0.97]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                Stop
              </button>
            </div>
            <p className="text-center text-[11px] text-zinc-400">
              AI can get things wrong or miss recent changes. Please double-check anything you’d bet a decision on.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
