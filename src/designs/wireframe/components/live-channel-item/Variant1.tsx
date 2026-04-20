/**
 * Wireframe: one row from a “Live channels” sidebar (avatar, title lines, live viewer count).
 */
export default function LiveChannelItemWireframe() {
  return (
    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-2">
      <div className="h-9 w-9 shrink-0 rounded-full bg-slate-200" aria-hidden />
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="h-2.5 w-[7.5rem] max-w-full rounded-full bg-slate-300" aria-hidden />
        <div className="h-2 w-24 max-w-full rounded-full bg-slate-200" aria-hidden />
      </div>
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-red-400" title="live" />
        <div className="h-2 w-9 rounded-full bg-slate-200" />
      </div>
    </div>
  )
}
