/**
 * PURPOSE
 * Goal: Make a 15-minute multi-agent research run feel alive, deliberate, and trustworthy
 *       so the user never wonders "is this still working?"
 * Real usage: Shown after the user asks for a competitor analysis. Four specialist sub-agents
 *       (Landscape, Positioning, Pricing & Strategy, Pricing) run in parallel. The center
 *       conversation shows a single research card with all four agents; the right sidebar
 *       shows live per-agent activity with the most recent steps (no fake per-agent %).
 * Priority: Premium calm > novelty. No rainbow gradients, no bouncy motion. The composition
 *       leans on craft: dot grid, hairline rings, custom spinner arcs, shimmer-on-active,
 *       and one shared neutral palette with a single accent per specialist.
 * Constraints: Light theme only, Tailwind only, no external icon libs. All animation is
 *       CSS-only (one inline <style> block) so HMR stays fast.
 * State shown: phase = researching, 1 of 4 specialists done. One agent is at a fresh step,
 *       another is mid-stream, third is winding down — so the viewer can feel the asymmetry.
 * Trust: Per-agent completion time is not predictable — UI uses logs, source counts, and
 *       indeterminate “alive” bars instead of numeric percent complete.
 */

const ELAPSED_LABEL = '04:32'
const ETA_LABEL = '~10 min remaining'

type AgentStatus = 'working' | 'done' | 'queued'
type AgentAccent = 'slate' | 'indigo' | 'amber' | 'emerald'

type LogEntry = {
  id: string
  text: string
  at: string
  source?: string
}

type Agent = {
  id: string
  name: string
  initials: string
  angle: string
  icon: 'compass' | 'target' | 'trend' | 'tag'
  accent: AgentAccent
  status: AgentStatus
  sourcesScanned: number
  sourcesPlanned: number
  current?: string
  log: LogEntry[]
}

const agents: Agent[] = [
  {
    id: 'landscape',
    name: 'Landscape Analyst',
    initials: 'LA',
    angle: 'Map GoodFirms’ direct and indirect competitor set and define what is truly comparable.',
    icon: 'compass',
    accent: 'slate',
    status: 'working',
    sourcesScanned: 9,
    sourcesPlanned: 14,
    current: 'Cross-checking Capterra positioning against the GoodFirms target user',
    log: [
      { id: 'l1', text: 'Pulled GoodFirms category taxonomy', at: '00:38', source: 'goodfirms.co' },
      { id: 'l2', text: 'Scanned Clutch service-provider directory structure', at: '01:12', source: 'clutch.co' },
      { id: 'l3', text: 'Compared DesignRush agency listings to GoodFirms', at: '02:01', source: 'designrush.com' },
      { id: 'l4', text: 'Logged G2 as indirect (software, not services)', at: '02:47', source: 'g2.com' },
      { id: 'l5', text: 'Cross-checking Capterra positioning vs GoodFirms users', at: '04:18', source: 'capterra.com' },
    ],
  },
  {
    id: 'positioning',
    name: 'Positioning Analyst',
    initials: 'PA',
    angle: 'How GoodFirms and 4 closest peers describe themselves and which value props they emphasize.',
    icon: 'target',
    accent: 'indigo',
    status: 'working',
    sourcesScanned: 6,
    sourcesPlanned: 16,
    current: 'Capturing Capterra homepage messaging and trust signals',
    log: [
      { id: 'p1', text: 'Saved GoodFirms hero copy and primary CTAs', at: '00:42', source: 'goodfirms.co' },
      { id: 'p2', text: 'Saved Clutch hero copy and primary CTAs', at: '01:09' },
      { id: 'p3', text: 'Captured G2 homepage messaging', at: '02:18', source: 'g2.com' },
      { id: 'p4', text: 'Capturing Capterra homepage messaging', at: '04:11', source: 'capterra.com' },
    ],
  },
  {
    id: 'pricing-strategy',
    name: 'Pricing & Strategy',
    initials: 'PS',
    angle: 'Monetization, vendor advertising, and lead-flow strategy across the directory peer set.',
    icon: 'trend',
    accent: 'amber',
    status: 'working',
    sourcesScanned: 11,
    sourcesPlanned: 13,
    current: 'Reviewing G2 vendor advertising offers and tiers',
    log: [
      { id: 's1', text: 'Identified Clutch lead-fee model from public pages', at: '00:55', source: 'clutch.co' },
      { id: 's2', text: 'Captured DesignRush sponsorship hints', at: '01:30' },
      { id: 's3', text: 'Logged G2 vendor product profile pricing tiers', at: '02:24', source: 'g2.com' },
      { id: 's4', text: 'Cross-referenced Capterra paid placement signals', at: '03:01' },
      { id: 's5', text: 'Reviewing G2 advertising offers and tiers', at: '04:21', source: 'g2.com' },
    ],
  },
  {
    id: 'pricing',
    name: 'Pricing Analyst',
    initials: 'PR',
    angle: 'Concrete pricing structures, paid plans, and visible costs for vendors on each platform.',
    icon: 'tag',
    accent: 'emerald',
    status: 'done',
    sourcesScanned: 12,
    sourcesPlanned: 12,
    current: 'Report ready · 12 sources scanned',
    log: [
      { id: 'r1', text: 'Confirmed GoodFirms paid sponsorship inquiry route', at: '00:46', source: 'goodfirms.co' },
      { id: 'r2', text: 'Logged Clutch sponsored leaders pricing tiers', at: '01:34', source: 'clutch.co' },
      { id: 'r3', text: 'Captured DesignRush package structure', at: '02:09' },
      { id: 'r4', text: 'Compared G2 vendor pricing pages', at: '02:51', source: 'g2.com' },
      { id: 'r5', text: 'Sealed report with 12 cited sources', at: '03:48' },
    ],
  },
]

const accentMap: Record<
  AgentAccent,
  {
    tile: string
    iconText: string
    ring: string
    bar: string
    barTrack: string
    text: string
    softBg: string
    pulse: string
  }
> = {
  slate: {
    tile: 'bg-slate-50 ring-slate-200/80',
    iconText: 'text-slate-700',
    ring: 'ring-slate-200',
    bar: 'bg-slate-700',
    barTrack: 'bg-slate-100',
    text: 'text-slate-700',
    softBg: 'bg-slate-50',
    pulse: 'bg-slate-300/60',
  },
  indigo: {
    tile: 'bg-indigo-50/70 ring-indigo-200/70',
    iconText: 'text-indigo-700',
    ring: 'ring-indigo-200',
    bar: 'bg-indigo-600',
    barTrack: 'bg-indigo-100/70',
    text: 'text-indigo-700',
    softBg: 'bg-indigo-50/60',
    pulse: 'bg-indigo-300/60',
  },
  amber: {
    tile: 'bg-amber-50/70 ring-amber-200/70',
    iconText: 'text-amber-700',
    ring: 'ring-amber-200',
    bar: 'bg-amber-600',
    barTrack: 'bg-amber-100/70',
    text: 'text-amber-700',
    softBg: 'bg-amber-50/60',
    pulse: 'bg-amber-300/60',
  },
  emerald: {
    tile: 'bg-emerald-50/70 ring-emerald-200/70',
    iconText: 'text-emerald-700',
    ring: 'ring-emerald-200',
    bar: 'bg-emerald-600',
    barTrack: 'bg-emerald-100/70',
    text: 'text-emerald-700',
    softBg: 'bg-emerald-50/60',
    pulse: 'bg-emerald-300/60',
  },
}

function AgentIcon({ name, className }: { name: Agent['icon']; className?: string }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
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
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'trend':
      return (
        <svg {...common}>
          <path d="M3 17.5 9 11l3.5 3.5L21 6" />
          <path d="M21 6h-4.5M21 6v4.5" />
        </svg>
      )
    case 'tag':
      return (
        <svg {...common}>
          <path d="M12.6 3H4.5A1.5 1.5 0 0 0 3 4.5v8.1a1.5 1.5 0 0 0 .44 1.06l7.4 7.4a1.5 1.5 0 0 0 2.12 0l7.16-7.16a1.5 1.5 0 0 0 0-2.12l-7.4-7.4A1.5 1.5 0 0 0 12.6 3Z" />
          <circle cx="8" cy="8" r="1.3" />
        </svg>
      )
  }
}

function StatusPill({ status, accent }: { status: AgentStatus; accent: AgentAccent }) {
  if (status === 'done') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200/80">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
        Done
      </span>
    )
  }
  if (status === 'queued') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600 ring-1 ring-zinc-200">
        Queued
      </span>
    )
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium ring-1 ${accentMap[accent].ring} ${accentMap[accent].text}`}>
      <SpinnerArc className="h-3 w-3" />
      Working
    </span>
  )
}

function SpinnerArc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className ?? ''} animate-[spin_1.6s_linear_infinite]`} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.18" strokeWidth="2.2" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function LiveDot() {
  return (
    <span className="relative inline-flex h-2 w-2" aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500/40" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
    </span>
  )
}

function ShimmerText({ children }: { children: React.ReactNode }) {
  return <span className="cri-shimmer-text font-medium text-zinc-900">{children}</span>
}

function PhaseStepper({ phase }: { phase: 'planning' | 'researching' | 'synthesizing' }) {
  const phases = [
    { key: 'planning', label: 'Planning' },
    { key: 'researching', label: 'Researching' },
    { key: 'synthesizing', label: 'Synthesizing' },
  ] as const

  const currentIndex = phases.findIndex((p) => p.key === phase)

  return (
    <ol className="flex items-center gap-2 text-[11px]">
      {phases.map((p, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        return (
          <li key={p.key} className="flex items-center gap-2">
            <span
              className={
                'flex h-5 items-center gap-1.5 rounded-full px-2 font-medium ' +
                (done
                  ? 'bg-zinc-900 text-white'
                  : active
                  ? 'bg-white text-zinc-900 ring-1 ring-zinc-300'
                  : 'bg-zinc-50 text-zinc-400 ring-1 ring-zinc-200/70')
              }
            >
              {done ? (
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              ) : active ? (
                <span className="relative h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-zinc-900/40" />
                  <span className="relative block h-1.5 w-1.5 rounded-full bg-zinc-900" />
                </span>
              ) : (
                <span className="block h-1.5 w-1.5 rounded-full bg-zinc-300" />
              )}
              {p.label}
            </span>
            {i < phases.length - 1 && (
              <span className={'h-px w-6 ' + (done ? 'bg-zinc-300' : 'bg-zinc-200')} />
            )}
          </li>
        )
      })}
    </ol>
  )
}

function OrchestratorDiagram() {
  return (
    <svg viewBox="0 0 360 56" className="h-12 w-full" aria-hidden>
      <defs>
        <linearGradient id="orch-line" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a1a1aa" stopOpacity="0.5" />
          <stop offset="1" stopColor="#a1a1aa" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <line x1="180" y1="14" x2="50" y2="46" stroke="url(#orch-line)" strokeWidth="1" />
      <line x1="180" y1="14" x2="135" y2="46" stroke="url(#orch-line)" strokeWidth="1" />
      <line x1="180" y1="14" x2="225" y2="46" stroke="url(#orch-line)" strokeWidth="1" />
      <line x1="180" y1="14" x2="310" y2="46" stroke="url(#orch-line)" strokeWidth="1" />

      <circle cx="180" cy="14" r="6" fill="white" stroke="#18181b" strokeWidth="1.2" />
      <circle cx="180" cy="14" r="2.4" fill="#18181b" />
      <circle cx="180" cy="14" r="11" fill="none" stroke="#18181b" strokeOpacity="0.18" strokeDasharray="2 3" />

      {[50, 135, 225, 310].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="46" r="5" fill="white" stroke="#52525b" strokeWidth="1" />
          <circle cx={x} cy="46" r={i === 3 ? 1.8 : 1.2} fill={i === 3 ? '#059669' : '#52525b'} />
        </g>
      ))}
    </svg>
  )
}

/** Motion shows “still working”, not a numeric completion estimate. */
function ActivityMicroBar({ accent, status }: { accent: AgentAccent; status: AgentStatus }) {
  const c = accentMap[accent]
  if (status === 'done') {
    return (
      <div className={`relative h-1 w-full overflow-hidden rounded-full ${c.barTrack}`}>
        <div className={`h-full rounded-full ${c.bar}`} />
      </div>
    )
  }
  if (status === 'working') {
    return (
      <div className={`relative h-1 w-full overflow-hidden rounded-full ${c.barTrack}`}>
        <span
          className={`cri-indeterminate-chunk pointer-events-none absolute left-0 top-0 h-full w-[42%] rounded-full ${c.bar} opacity-95`}
        />
      </div>
    )
  }
  return <div className={`h-1 w-full rounded-full ${c.barTrack} opacity-70`} />
}

function AgentTile({ agent }: { agent: Agent }) {
  const c = accentMap[agent.accent]
  const isWorking = agent.status === 'working'
  const isDone = agent.status === 'done'

  return (
    <div className="cri-fade-up group relative flex flex-col gap-3 rounded-xl bg-white p-4 ring-1 ring-zinc-200/70 transition hover:ring-zinc-300">
      {/* top row: avatar + meta + status */}
      <div className="flex items-start gap-3">
        <div className="relative">
          {isWorking && (
            <span
              className={`absolute -inset-1 animate-[cri-breathe_2.6s_ease-in-out_infinite] rounded-[14px] ${c.pulse} blur-[6px]`}
              aria-hidden
            />
          )}
          <div className={`relative flex h-10 w-10 items-center justify-center rounded-[10px] ring-1 ${c.tile}`}>
            <AgentIcon name={agent.icon} className={`h-5 w-5 ${c.iconText}`} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-[13.5px] font-semibold text-zinc-900">{agent.name}</h3>
            <span className="text-[10.5px] tabular-nums text-zinc-400">{agent.initials}</span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-zinc-500">{agent.angle}</p>
        </div>
        <div className="shrink-0">
          <StatusPill status={agent.status} accent={agent.accent} />
        </div>
      </div>

      {/* divider */}
      <div className="h-px w-full bg-zinc-100" />

      {/* current activity */}
      <div className="min-h-[44px]">
        <div className="text-[10.5px] font-medium uppercase tracking-wide text-zinc-400">
          {isDone ? 'Result' : 'Now'}
        </div>
        <div className="mt-1 text-[13px] leading-snug">
          {isWorking ? (
            <ShimmerText>{agent.current}</ShimmerText>
          ) : (
            <span className="font-medium text-zinc-800">{agent.current}</span>
          )}
        </div>
      </div>

      {/* footer: source counter + activity strip (no % — agents finish independently) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] tabular-nums text-zinc-500">
          <span>
            <span className="font-medium text-zinc-700">{agent.sourcesScanned}</span>
            <span className="text-zinc-400"> / {agent.sourcesPlanned} sources</span>
          </span>
          <span className={isDone ? 'text-emerald-600' : c.text}>{isDone ? 'Complete' : 'In flight'}</span>
        </div>
        <ActivityMicroBar accent={agent.accent} status={agent.status} />
      </div>
    </div>
  )
}

function SidebarAgentBlock({ agent }: { agent: Agent }) {
  const c = accentMap[agent.accent]
  const isWorking = agent.status === 'working'
  const isDone = agent.status === 'done'
  const recent = agent.log.slice(-5).reverse()

  return (
    <section className="rounded-xl bg-white ring-1 ring-zinc-200/70">
      {/* header */}
      <header className="flex items-start gap-3 px-3.5 pt-3.5">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ${c.tile}`}>
          <AgentIcon name={agent.icon} className={`h-4 w-4 ${c.iconText}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="truncate text-[13px] font-semibold text-zinc-900">{agent.name}</h4>
            <StatusPill status={agent.status} accent={agent.accent} />
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] tabular-nums text-zinc-500">
            <span>
              <span className="font-medium text-zinc-700">{agent.sourcesScanned}</span>
              <span className="text-zinc-400"> / {agent.sourcesPlanned}</span>
              <span className="text-zinc-400"> sources</span>
            </span>
            <span className="text-zinc-300">·</span>
            <span className={isDone ? 'text-emerald-600' : c.text}>{isDone ? 'Complete' : 'In flight'}</span>
          </div>
          <div className="mt-1.5">
            <ActivityMicroBar accent={agent.accent} status={agent.status} />
          </div>
        </div>
      </header>

      {/* current focus */}
      {isWorking && (
        <div className="mx-3.5 mt-3 rounded-lg bg-zinc-50 px-3 py-2 ring-1 ring-zinc-100">
          <div className="text-[10.5px] font-medium uppercase tracking-wide text-zinc-400">Current focus</div>
          <div className="mt-0.5 text-[13px] leading-snug">
            <ShimmerText>{agent.current}</ShimmerText>
          </div>
        </div>
      )}

      {/* timeline */}
      <div className="px-3.5 pt-3 pb-3.5">
        <div className="mb-2 flex items-center justify-between text-[10.5px] font-medium uppercase tracking-wide text-zinc-400">
          <span>Progress log</span>
          <span className="tabular-nums normal-case text-zinc-400">{agent.log.length} steps</span>
        </div>
        <ol className="relative space-y-2.5">
          <span className="absolute left-[5px] top-1 bottom-1 w-px bg-zinc-200/80" aria-hidden />
          {recent.map((step, i) => {
            const isLatest = i === 0 && isWorking
            return (
              <li key={step.id} className="relative flex items-start gap-3 pl-4">
                <span className="absolute left-0 top-[6px]">
                  {isLatest ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className={`absolute inset-0 animate-ping rounded-full ${c.pulse}`} />
                      <span className={`relative h-2.5 w-2.5 rounded-full ${c.bar} ring-2 ring-white`} />
                    </span>
                  ) : (
                    <span className="block h-2 w-2 translate-x-[1px] translate-y-[1px] rounded-full bg-zinc-300 ring-2 ring-white" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={'text-[12.5px] leading-snug ' + (isLatest ? 'text-zinc-900 font-medium' : 'text-zinc-600')}>
                    {step.text}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10.5px] text-zinc-400">
                    <span className="tabular-nums">{step.at}</span>
                    {step.source && (
                      <>
                        <span>·</span>
                        <span className="font-mono text-zinc-500">{step.source}</span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function SourceChip({ host, count }: { host: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[11px] text-zinc-700 ring-1 ring-zinc-200">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" aria-hidden />
      <span className="font-mono text-[10.5px] text-zinc-500">{host}</span>
      <span className="tabular-nums text-zinc-400">{count}</span>
    </span>
  )
}

export default function CompetitorResearchOrchestrationHifiPage() {
  const completed = agents.filter((a) => a.status === 'done').length
  const total = agents.length

  return (
    <div className="cri-root overflow-hidden rounded-2xl bg-[#fafaf9] font-sans text-[13.5px] text-zinc-900 shadow-2xl shadow-zinc-900/[0.04] ring-1 ring-zinc-200/80">
      {/* one inline style block — animations + textures only, no global rules */}
      <style>{`
        @keyframes cri-shimmer-x {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes cri-breathe {
          0%, 100% { opacity: .35; transform: scale(0.96); }
          50%      { opacity: .8;  transform: scale(1.04); }
        }
        @keyframes cri-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cri-bar-shine {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(350%); }
        }
        .cri-shimmer-text {
          background-image: linear-gradient(90deg, #71717a 0%, #71717a 38%, #18181b 50%, #71717a 62%, #71717a 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: cri-shimmer-x 2.6s linear infinite;
        }
        .cri-fade-up {
          animation: cri-fade-up .42s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .cri-fade-up:nth-of-type(1) { animation-delay: 0ms; }
        .cri-fade-up:nth-of-type(2) { animation-delay: 60ms; }
        .cri-fade-up:nth-of-type(3) { animation-delay: 120ms; }
        .cri-fade-up:nth-of-type(4) { animation-delay: 180ms; }
        .cri-bar-shine {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%);
          animation: cri-bar-shine 1.8s ease-in-out infinite;
        }
        @keyframes cri-indeterminate-chunk {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(320%); }
        }
        .cri-indeterminate-chunk {
          animation: cri-indeterminate-chunk 1.15s cubic-bezier(0.77, 0, 0.175, 1) infinite alternate;
        }
        .cri-dotgrid {
          background-image: radial-gradient(circle, rgba(24,24,27,0.06) 1px, transparent 1px);
          background-size: 14px 14px;
          background-position: 0 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .cri-shimmer-text, .cri-bar-shine, .cri-fade-up, .cri-indeterminate-chunk {
            animation: none;
          }
          .cri-shimmer-text { color: #18181b; -webkit-text-fill-color: currentColor; }
          .cri-indeterminate-chunk { transform: translateX(20%); opacity: 0.92; }
        }
      `}</style>

      <div className="grid min-h-[860px] grid-cols-[260px_minmax(0,1fr)_400px]">
        {/* ─────────── LEFT NAV ─────────── */}
        <aside className="flex flex-col border-r border-zinc-200/80 bg-white/70">
          <div className="px-4 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 12c2.5-3 5-3 8 0s5.5 3 8 0" />
                  <path d="M4 17c2.5-3 5-3 8 0s5.5 3 8 0" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-zinc-900">Competitor Intel</div>
                <div className="truncate text-[11px] text-zinc-500">Research & positioning</div>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 inline-flex w-full items-center justify-between rounded-lg bg-zinc-900 px-3 py-2 text-[12.5px] font-medium text-white transition active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New analysis
              </span>
              <span className="font-mono text-[10.5px] text-zinc-300/90">⌘N</span>
            </button>
          </div>

          <div className="mt-5 px-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                In progress
              </span>
              <LiveDot />
            </div>
            <div className="rounded-lg bg-zinc-50 p-2.5 ring-1 ring-zinc-200/60">
              <div className="flex items-center justify-between">
                <span className="truncate text-[12.5px] font-medium text-zinc-900">
                  GoodFirms vs B2B directories
                </span>
                <span className="text-[10.5px] tabular-nums text-zinc-500">{ELAPSED_LABEL}</span>
              </div>
              <div className="mt-1 text-[11px] text-zinc-500">
                {completed} of {total} specialists finished
              </div>
              <div
                className="mt-2 flex h-1 w-full gap-px overflow-hidden rounded-full bg-zinc-200/70 ring-1 ring-zinc-200/70"
                title="One segment per specialist: solid = done, motion = still working"
              >
                {agents.map((a) => {
                  const c = accentMap[a.accent]
                  return (
                    <div
                      key={a.id}
                      className="relative min-w-0 flex-1 overflow-hidden bg-white/95 first:rounded-l-full last:rounded-r-full"
                    >
                      {a.status === 'done' && <div className={`absolute inset-0 ${c.bar}`} />}
                      {a.status === 'working' && (
                        <div className={`relative h-full w-full overflow-hidden ${c.barTrack}`}>
                          <span
                            className={`cri-indeterminate-chunk pointer-events-none absolute left-0 top-0 h-full w-[48%] rounded-full ${c.bar} opacity-95`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 px-4">
            <div className="mb-2 text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
              Recent
            </div>
            <ul className="space-y-0.5">
              {[
                { t: 'Notion vs Coda · feature parity', d: 'Yesterday' },
                { t: 'Linear positioning vs Jira', d: '2 days ago' },
                { t: 'Vercel pricing benchmark', d: 'Last week' },
                { t: 'Stripe vs Adyen for SMB', d: 'Last week' },
              ].map((r) => (
                <li key={r.t}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[12.5px] text-zinc-700 transition hover:bg-zinc-100/70"
                  >
                    <span className="truncate">{r.t}</span>
                    <span className="ml-2 shrink-0 text-[10.5px] text-zinc-400">{r.d}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto border-t border-zinc-200/80 px-4 py-3">
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition hover:bg-zinc-100/70"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 text-[11px] font-semibold text-white">
                N
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-medium text-zinc-900">Niko</div>
                <div className="truncate text-[10.5px] text-zinc-500">Founder / CEO</div>
              </div>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M8 9 12 5l4 4M16 15l-4 4-4-4" />
              </svg>
            </button>
          </div>
        </aside>

        {/* ─────────── CENTER CONVERSATION ─────────── */}
        <section className="flex min-w-0 flex-col">
          {/* top bar */}
          <header className="flex items-center gap-3 border-b border-zinc-200/80 bg-white/70 px-5 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-[13px] font-semibold text-zinc-900">
                  GoodFirms vs B2B directories
                </h1>
                <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600">
                  Draft
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-zinc-500">
                <span>Started 4 min ago</span>
                <span className="text-zinc-300">·</span>
                <span>Audience: Founder / CEO</span>
                <span className="text-zinc-300">·</span>
                <span className="font-mono text-[10.5px]">claude-sonnet-4.5</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-md px-2 py-1 text-[12px] text-zinc-600 hover:bg-zinc-100">
                Export
              </button>
              <button type="button" className="rounded-md px-2 py-1 text-[12px] text-zinc-600 hover:bg-zinc-100">
                Share
              </button>
              <span className="mx-1 h-4 w-px bg-zinc-200" />
              <button type="button" className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100" aria-label="Settings">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="2.5" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z" />
                </svg>
              </button>
            </div>
          </header>

          {/* scroll body */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="mx-auto max-w-[680px] space-y-6">
              {/* user message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-zinc-900 px-4 py-2.5 text-[13.5px] text-white shadow-sm shadow-zinc-900/10">
                  Do a short analysis on{' '}
                  <span className="font-mono text-[12.5px] text-zinc-200">https://www.goodfirms.co</span>{' '}
                  and similar companies. Focus on positioning and pricing strategy.
                </div>
              </div>

              {/* RESEARCH CARD — the centerpiece */}
              <article className="cri-fade-up overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200/80 shadow-sm shadow-zinc-900/[0.03]">
                {/* hero */}
                <div className="relative overflow-hidden border-b border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/60 px-5 pt-5 pb-4">
                  <div className="cri-dotgrid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent" aria-hidden />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <LiveDot />
                        <span className="text-[10.5px] font-medium uppercase tracking-wider text-zinc-500">
                          Live research
                        </span>
                      </div>
                      <h2 className="mt-1.5 text-[15px] font-semibold text-zinc-900">
                        Research in progress
                      </h2>
                      <p className="mt-0.5 max-w-md text-[12.5px] leading-relaxed text-zinc-500">
                        4 specialists are working in parallel. Expect roughly 10 minutes for full
                        results — partial findings appear here as they land.
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="font-mono text-[11px] text-zinc-400">elapsed</div>
                      <div className="mt-0.5 font-mono text-[22px] font-medium tabular-nums leading-none text-zinc-900">
                        {ELAPSED_LABEL}
                      </div>
                      <div className="mt-1 text-[11px] text-zinc-500">{ETA_LABEL}</div>
                    </div>
                  </div>

                  {/* orchestrator diagram + counts */}
                  <div className="relative mt-4 grid grid-cols-[1fr_auto] items-center gap-4">
                    <OrchestratorDiagram />
                    <div className="flex items-center gap-3 rounded-lg bg-white/80 px-3 py-1.5 ring-1 ring-zinc-200/70 backdrop-blur">
                      <div>
                        <div className="text-[10.5px] uppercase tracking-wider text-zinc-400">
                          Specialists
                        </div>
                        <div className="font-mono text-[13px] tabular-nums text-zinc-900">
                          {completed}
                          <span className="text-zinc-300"> / </span>
                          {total}
                        </div>
                      </div>
                      <span className="h-7 w-px bg-zinc-200" />
                      <div>
                        <div className="text-[10.5px] uppercase tracking-wider text-zinc-400">
                          Sources
                        </div>
                        <div className="font-mono text-[13px] tabular-nums text-zinc-900">
                          {agents.reduce((s, a) => s + a.sourcesScanned, 0)}
                          <span className="text-zinc-300"> / </span>
                          {agents.reduce((s, a) => s + a.sourcesPlanned, 0)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* phase stepper */}
                  <div className="relative mt-4 flex items-center justify-between">
                    <PhaseStepper phase="researching" />
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11.5px] text-zinc-600 transition hover:bg-zinc-100"
                    >
                      Open live progress
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* agent grid */}
                <div className="grid grid-cols-2 gap-3 p-3">
                  {agents.map((a) => (
                    <AgentTile key={a.id} agent={a} />
                  ))}
                </div>

                {/* sources strip */}
                <div className="border-t border-zinc-200/80 bg-zinc-50/40 px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10.5px] font-medium uppercase tracking-wider text-zinc-400">
                      Live sources
                    </span>
                    <SourceChip host="goodfirms.co" count={6} />
                    <SourceChip host="clutch.co" count={5} />
                    <SourceChip host="g2.com" count={4} />
                    <SourceChip host="capterra.com" count={3} />
                    <SourceChip host="designrush.com" count={2} />
                    <span className="text-[11px] text-zinc-400">+12 more</span>
                  </div>
                </div>
              </article>

              {/* assistant placeholder while waiting */}
              <div className="text-[12.5px] text-zinc-400">
                <ShimmerText>Drafting executive takeaway as findings land…</ShimmerText>
              </div>
            </div>
          </div>

          {/* composer */}
          <div className="border-t border-zinc-200/80 bg-white/70 px-5 py-3">
            <div className="mx-auto max-w-[680px]">
              <div className="rounded-2xl bg-white p-2 ring-1 ring-zinc-200/80 shadow-sm shadow-zinc-900/[0.03]">
                <div className="flex items-center gap-2 px-1.5 pt-1">
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10.5px] font-medium text-zinc-600">
                    Audience
                  </span>
                  <button type="button" className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11.5px] font-medium text-zinc-700 hover:bg-zinc-100">
                    Founder / CEO
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-end gap-2 px-1.5 pt-1.5">
                  <button type="button" className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100" aria-label="Attach">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m21 12-8.5 8.5a5 5 0 1 1-7-7L13 5a3.4 3.4 0 1 1 4.8 4.8l-9 9a1.7 1.7 0 0 1-2.4-2.4L14 8.6" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Ask a follow-up while research runs…"
                    className="min-w-0 flex-1 bg-transparent py-1.5 text-[13px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-[12px] font-medium text-white transition active:scale-[0.97]"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                    Stop
                  </button>
                </div>
              </div>
              <p className="mt-2 text-center text-[11px] text-zinc-400">
                AI-generated analysis can be wrong or out of date. Verify material facts before decisions.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────── RIGHT: LIVE PROGRESS ─────────── */}
        <aside className="flex flex-col border-l border-zinc-200/80 bg-zinc-50/40">
          <header className="border-b border-zinc-200/80 bg-white/70 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <LiveDot />
                  <h3 className="text-[13px] font-semibold text-zinc-900">Live progress</h3>
                </div>
                <p className="mt-0.5 text-[11.5px] text-zinc-500">
                  {completed} of {total} specialists finished · {ETA_LABEL}
                </p>
              </div>
              <button type="button" className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100" aria-label="Minimize">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
                  <path d="M5 12h14" />
                </svg>
              </button>
            </div>

            {/* elapsed + phase */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[20px] font-medium tabular-nums leading-none text-zinc-900">
                  {ELAPSED_LABEL}
                </span>
                <span className="text-[11px] text-zinc-400">elapsed</span>
              </div>
              <PhaseStepper phase="researching" />
            </div>

            {/* combined mini-bars */}
            <div className="mt-3 space-y-1.5">
              {agents.map((a) => {
                const c = accentMap[a.accent]
                return (
                  <div key={a.id} className="flex items-center gap-2 text-[11px]">
                    <span className={`flex h-4 w-4 items-center justify-center rounded ring-1 ${c.tile}`}>
                      <AgentIcon name={a.icon} className={`h-2.5 w-2.5 ${c.iconText}`} />
                    </span>
                    <span className="w-24 shrink-0 truncate text-zinc-600">{a.name}</span>
                    <div className="min-w-0 flex-1">
                      <ActivityMicroBar accent={a.accent} status={a.status} />
                    </div>
                    <span
                      className={`w-11 shrink-0 text-right font-medium tabular-nums ${
                        a.status === 'done' ? 'text-emerald-600' : 'text-zinc-500'
                      }`}
                    >
                      {a.status === 'done' ? '✓' : '···'}
                    </span>
                  </div>
                )
              })}
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {agents.map((a) => (
              <SidebarAgentBlock key={a.id} agent={a} />
            ))}
            <div className="rounded-xl border border-dashed border-zinc-300/80 bg-white/60 px-3 py-3 text-center text-[11.5px] text-zinc-500">
              Synthesis will start when all 4 specialists finish.
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
