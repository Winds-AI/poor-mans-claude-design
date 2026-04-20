/**
 * PURPOSE
 * Goal: Make one live channel feel clickable, scannable, and alive in a dense sidebar.
 * Real usage: Appears in a polished discovery rail where users compare channels by name, category, and live status.
 * Focus: Hover feedback, visual emphasis, and fast recognition of stream identity.
 * Target users: Active stream browsers choosing which live channel to join.
 */
export type LiveChannelItemHifiProps = {
  channelName?: string
  category?: string
  viewers?: string
}

const defaultGradient = 'from-violet-500 to-fuchsia-600'

export default function LiveChannelItemHifi({
  channelName = 'ESLCS',
  category = 'Counter-Strike',
  viewers = '1.3K',
}: LiveChannelItemHifiProps) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9146FF]"
    >
      <div
        className={`h-9 w-9 shrink-0 rounded-full bg-gradient-to-br ${defaultGradient} shadow-inner ring-2 ring-zinc-800 transition group-hover:ring-[#9146FF]/40`}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-zinc-100">{channelName}</p>
        <p className="truncate text-xs text-zinc-500">{category}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
        </span>
        <span className="text-xs tabular-nums text-zinc-400">{viewers}</span>
      </div>
    </button>
  )
}
