import LiveChannelItemWireframe from '../../components/live-channel-item/Variant1'

/**
 * Wireframe: holy-grail stream layout inspired by a typical live channel page
 * (top bar · live list · player · stream meta · chat · bottom promo).
 */
export default function StreamChannelWireframePage() {
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-100 p-3 font-sans text-sm text-slate-600 antialiased">
      {/* Top nav */}
      <header className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
        <div className="h-8 w-16 shrink-0 rounded-md bg-slate-200" aria-hidden />
        <div className="h-8 w-14 shrink-0 rounded-md bg-slate-100" aria-hidden />
        <div className="h-8 min-w-[8rem] flex-1 rounded-md bg-slate-100" aria-hidden />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="h-8 w-14 rounded-md bg-white ring-1 ring-slate-200" aria-hidden />
          <div className="h-8 w-20 rounded-md bg-slate-300" aria-hidden />
          <div className="h-8 w-8 rounded-full bg-slate-200" aria-hidden />
        </div>
      </header>

      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {/* Left: live channel list */}
        <aside className="flex w-full shrink-0 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2 lg:w-56">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="h-2.5 w-28 rounded-full bg-slate-300" aria-hidden />
            <div className="h-6 w-6 rounded bg-slate-100" aria-hidden />
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <LiveChannelItemWireframe key={i} />
            ))}
          </div>
          <div className="pt-2">
            <div className="mb-2 h-2 w-40 rounded-full bg-slate-200" aria-hidden />
            <div className="space-y-1.5">
              <LiveChannelItemWireframe />
              <LiveChannelItemWireframe />
            </div>
          </div>
        </aside>

        {/* Center: player + stream info */}
        <main className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-200/90 aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3 w-40 rounded-full bg-slate-300/80" aria-hidden />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 border-t border-slate-300/50 bg-white/70 px-2 py-1.5">
              <div className="h-6 w-6 rounded bg-slate-200" aria-hidden />
              <div className="h-2 flex-1 rounded-full bg-slate-200" aria-hidden />
              <div className="h-6 w-16 rounded bg-slate-200" aria-hidden />
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-start">
            <div className="h-14 w-14 shrink-0 rounded-full bg-slate-200" aria-hidden />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-3 w-36 rounded-full bg-slate-300" aria-hidden />
                <div className="h-5 w-5 rounded-full bg-slate-200" aria-hidden />
              </div>
              <div className="h-2.5 w-full max-w-xl rounded-full bg-slate-200" aria-hidden />
              <div className="flex flex-wrap gap-2">
                <div className="h-2 w-28 rounded-full bg-slate-200" aria-hidden />
                <div className="h-2 w-16 rounded-full bg-slate-200" aria-hidden />
                <div className="h-2 w-12 rounded-full bg-slate-200" aria-hidden />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <div className="h-9 w-[5.5rem] rounded-md bg-slate-300" aria-hidden />
              <div className="h-9 w-24 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
              <div className="h-9 w-28 rounded-md bg-slate-100 ring-1 ring-slate-200" aria-hidden />
              <div className="flex items-center gap-1">
                <div className="h-2 w-12 rounded-full bg-slate-200" aria-hidden />
                <div className="h-2 w-14 rounded-full bg-slate-200" aria-hidden />
              </div>
            </div>
          </div>
        </main>

        {/* Right: chat */}
        <aside className="flex w-full shrink-0 flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2 lg:w-64">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
            <div className="h-2.5 w-24 rounded-full bg-slate-300" aria-hidden />
            <div className="flex gap-1">
              <div className="h-6 w-6 rounded bg-slate-100" aria-hidden />
              <div className="h-6 w-6 rounded bg-slate-100" aria-hidden />
            </div>
          </div>
          <div className="space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-2">
            <div className="h-2 w-full rounded-full bg-slate-200" aria-hidden />
            <div className="h-2 w-5/6 rounded-full bg-slate-200" aria-hidden />
          </div>
          <div className="min-h-[140px] flex-1 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-2">
            <div className="h-2 w-48 rounded-full bg-slate-200" aria-hidden />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 rounded border border-slate-200 bg-slate-50 px-2 py-1.5">
              <div className="h-2 flex-1 rounded-full bg-slate-200" aria-hidden />
              <div className="h-6 w-14 shrink-0 rounded bg-slate-200" aria-hidden />
            </div>
            <div className="h-2 w-24 rounded-full bg-slate-200" aria-hidden />
            <div className="flex gap-2">
              <div className="h-10 min-w-0 flex-1 rounded-md border border-slate-200 bg-white" aria-hidden />
              <div className="h-10 w-20 shrink-0 rounded-md bg-slate-300" aria-hidden />
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom promo strip */}
      <footer className="flex flex-col items-stretch gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-8 w-20 shrink-0 rounded-md bg-slate-200" aria-hidden />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="h-2 w-full max-w-2xl rounded-full bg-slate-200" aria-hidden />
          <div className="h-2 w-4/5 max-w-xl rounded-full bg-slate-200" aria-hidden />
        </div>
        <div className="h-9 w-28 shrink-0 self-end rounded-md bg-slate-300 sm:self-auto" aria-hidden />
      </footer>
    </div>
  )
}
