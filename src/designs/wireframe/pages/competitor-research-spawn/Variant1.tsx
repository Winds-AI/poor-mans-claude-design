/**
 * PURPOSE
 * Goal: Wireframe the first trustworthy moment after the swarm spins up — user sees four
 *       specialists online, a correct global status (not “done”), and where live logs will land.
 * Real usage: Immediately after the user sends a competitor research request; ~15 min run ahead.
 * Primary user: Founder/researcher who needs proof the system is alive, not frozen.
 * Core actions: Scan agent roster, glance elapsed time / run status, open details rail when logs appear.
 * Priority: Information architecture + calm hierarchy before motion/visual polish (hi-fi later).
 * Constraints: Wireframe scope only — gray blocks, no brand color, no animation. No per-agent % or
 *              fake completion bars (agents finish independently; show activity / logs, not estimates).
 * Context: Mirrors layout patterns from references/current (left threads, center chat, right
 *          progress). Agent names align with the multi-agent competitor research product.
 */

const AGENT_LABELS = [
  { name: 'Landscape Analyst', mission: 'Competitor set & comparability' },
  { name: 'Positioning Analyst', mission: 'Messaging & differentiation' },
  { name: 'Pricing & Strategy', mission: 'Monetization & lead flow' },
  { name: 'Pricing Analyst', mission: 'Plans, tiers, visible costs' },
] as const

function AgentTileWireframe({ name, mission }: { name: string; mission: string }) {
  return (
    <div
      className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50/80 p-2.5"
      aria-label={`${name}: ${mission}. Spawned, activity starting.`}
    >
      <div className="flex items-start gap-2">
        <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-200" aria-hidden />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="h-2.5 w-[72%] rounded-full bg-slate-300" aria-hidden />
          <div className="h-2 w-full rounded-full bg-slate-200" aria-hidden />
        </div>
        <div className="h-5 w-14 shrink-0 rounded-full bg-slate-200 ring-1 ring-slate-300/80" aria-hidden />
      </div>
      <div className="flex items-center gap-1.5 pt-0.5" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span className="ml-1 text-[10px] font-medium uppercase tracking-wide text-slate-500">Activity</span>
      </div>
    </div>
  )
}

export default function CompetitorResearchSpawnWireframePage() {
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-100 p-3 font-sans text-sm text-slate-600 antialiased">
      <div className="flex min-h-[520px] flex-col gap-2 lg:flex-row lg:items-stretch">
        {/* Left: app / thread rail */}
        <aside className="flex w-full shrink-0 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2 lg:w-52">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="space-y-1">
              <div className="h-2.5 w-28 rounded-full bg-slate-300" aria-hidden />
              <div className="h-2 w-36 rounded-full bg-slate-200" aria-hidden />
            </div>
            <div className="h-7 w-7 shrink-0 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
          </div>
          <div className="h-9 w-full rounded-lg bg-slate-300" aria-hidden />
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-2">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="h-2 w-24 rounded-full bg-slate-300" aria-hidden />
              <div className="h-6 w-6 rounded bg-slate-200" aria-hidden />
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200" aria-hidden />
            <div className="mt-1 h-2 w-4/5 rounded-full bg-slate-200" aria-hidden />
          </div>
          <div className="mt-auto flex justify-center pt-4">
            <div className="h-8 w-8 rounded-full bg-slate-200" aria-hidden />
          </div>
        </aside>

        {/* Center: chat + spawn card */}
        <main className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-slate-200 bg-white">
            <div className="flex-1 space-y-3 overflow-hidden p-3">
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[min(100%,28rem)] space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <div className="h-2 w-full rounded-full bg-slate-200" aria-hidden />
                  <div className="h-2 w-11/12 rounded-full bg-slate-200" aria-hidden />
                  <div className="h-2 w-3/4 rounded-full bg-slate-200" aria-hidden />
                </div>
              </div>

              {/* Swarm / spawn card */}
              <div className="mx-auto w-full max-w-3xl space-y-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm ring-1 ring-slate-200/60">
                <div className="flex flex-wrap items-start gap-2 border-b border-slate-100 pb-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="h-3 w-44 rounded-full bg-slate-300" aria-hidden />
                      <div className="h-5 w-20 rounded-full bg-slate-200 ring-1 ring-slate-300/80" aria-hidden />
                    </div>
                    <div className="h-2 w-full max-w-md rounded-full bg-slate-200" aria-hidden />
                    <div className="flex flex-wrap gap-2">
                      <div className="h-2 w-24 rounded-full bg-slate-200" aria-hidden />
                      <div className="h-2 w-28 rounded-full bg-slate-200" aria-hidden />
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="h-8 w-20 rounded-lg bg-slate-100 ring-1 ring-slate-200" aria-hidden />
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {AGENT_LABELS.map((a) => (
                    <AgentTileWireframe key={a.name} name={a.name} mission={a.mission} />
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                  <div className="flex flex-wrap gap-2">
                    <div className="h-7 w-7 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
                    <div className="h-7 w-7 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
                    <div className="h-7 w-7 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
                    <div className="h-7 w-7 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
                  </div>
                  <div className="h-2 w-32 rounded-full bg-slate-200" aria-hidden />
                </div>
              </div>
            </div>

            {/* Composer */}
            <div className="border-t border-slate-100 p-3">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <div className="h-2 w-20 rounded-full bg-slate-300" aria-hidden />
                <div className="h-8 min-w-[10rem] flex-1 rounded-lg border border-slate-200 bg-slate-50 sm:max-w-xs" aria-hidden />
              </div>
              <div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-200" aria-hidden />
                <div className="mb-0.5 h-10 min-w-0 flex-1 rounded-lg bg-white ring-1 ring-slate-200" aria-hidden />
                <div className="h-9 w-16 shrink-0 rounded-lg bg-slate-300" aria-hidden />
              </div>
              <div className="mt-2 h-2 w-full max-w-lg rounded-full bg-slate-200" aria-hidden />
            </div>
          </div>
        </main>

        {/* Right: live progress rail (spawn moment — logs still empty) */}
        <aside className="flex w-full shrink-0 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2 lg:w-72">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="space-y-1.5">
              <div className="h-2.5 w-36 rounded-full bg-slate-300" aria-hidden />
              <div className="h-2 w-28 rounded-full bg-slate-200" aria-hidden />
            </div>
            <div className="h-7 w-7 shrink-0 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50 p-2">
            <div className="flex justify-between gap-2">
              <div className="h-2 w-24 rounded-full bg-slate-200" aria-hidden />
              <div className="h-2 w-20 rounded-full bg-slate-200" aria-hidden />
            </div>
            <div className="mt-2 h-2 w-[90%] rounded-full bg-slate-200" aria-hidden />
          </div>

          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5">
            {AGENT_LABELS.map((a) => (
              <div
                key={a.name}
                className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="h-2.5 w-[55%] rounded-full bg-slate-300" title={a.name} />
                  <div className="h-5 w-12 shrink-0 rounded-full bg-slate-200" aria-hidden />
                </div>
                <div className="mb-2 space-y-1">
                  <div className="h-2 w-full rounded-full bg-slate-200" aria-hidden />
                  <div className="h-2 w-5/6 rounded-full bg-slate-200" aria-hidden />
                </div>
                <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-2">
                  <div className="mb-1.5 h-2 w-32 rounded-full bg-slate-300" aria-hidden />
                  <div className="space-y-1.5">
                    <div className="h-6 w-full rounded-md bg-slate-200/80" aria-hidden />
                    <div className="h-6 w-full rounded-md bg-slate-200/80" aria-hidden />
                    <div className="h-6 w-4/5 rounded-md bg-slate-200/60" aria-hidden />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
