import LiveChannelItemHifi from '../../components/live-channel-item/Variant1'

const sidebarChannels = [
  { channelName: 'ESLCS', category: 'Counter-Strike', viewers: '1.3K' },
  { channelName: 'PGL', category: 'Counter-Strike', viewers: '892' },
  { channelName: 'FACEIT', category: 'Counter-Strike', viewers: '2.1K' },
  { channelName: 'BLASTPremier', category: 'Counter-Strike', viewers: '654' },
  { channelName: 'HLTV', category: 'Counter-Strike', viewers: '3.4K' },
] as const

const alsoWatch = [
  { channelName: 'BLAST', category: 'Counter-Strike', viewers: '412' },
  { channelName: 'ESLCSB', category: 'Counter-Strike', viewers: '221' },
] as const

function IconSearch(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z"
      />
    </svg>
  )
}

function IconVerified(props: { className?: string }) {
  return (
    <svg className={props.className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.06 13.06L7 10.12l1.41-1.41 2.53 2.53 5.66-5.66 1.41 1.41-7.07 7.07z" />
    </svg>
  )
}

export default function StreamChannelHifiPage() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0e0e10] font-sans text-sm text-zinc-300 shadow-2xl shadow-black/40">
      {/* Top nav */}
      <header className="flex flex-wrap items-center gap-3 border-b border-zinc-800 bg-[#18181b] px-3 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tight text-[#9146FF]">⋯</span>
          <button
            type="button"
            className="text-sm font-semibold text-zinc-300 hover:text-white"
          >
            Browse
          </button>
          <button
            type="button"
            className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            aria-label="More"
          >
            ⋮
          </button>
        </div>
        <div className="relative min-w-[10rem] flex-1 max-w-xl">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-md border border-zinc-700 bg-[#18181b] py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-[#9146FF] focus:outline-none focus:ring-1 focus:ring-[#9146FF]"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="rounded px-3 py-1.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800"
          >
            Log In
          </button>
          <button
            type="button"
            className="rounded-md bg-[#9146FF] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#772ce8]"
          >
            Sign Up
          </button>
          <div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 ring-2 ring-zinc-700"
            aria-hidden
          />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* Live channels */}
        <aside className="flex w-full shrink-0 flex-col border-zinc-800 bg-[#1f1f23] lg:w-60 lg:border-r">
          <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
            <span className="text-xs font-bold uppercase tracking-wide text-zinc-400">
              Live Channels
            </span>
            <button
              type="button"
              className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
              aria-label="Collapse"
            >
              ‹
            </button>
          </div>
          <div className="space-y-0.5 p-2">
            {sidebarChannels.map((c) => (
              <LiveChannelItemHifi key={c.channelName} {...c} />
            ))}
          </div>
          <div className="border-t border-zinc-800 px-3 py-2">
            <p className="mb-2 text-xs font-semibold text-zinc-500">ESLCS viewers also watch</p>
            <div className="space-y-0.5">
              {alsoWatch.map((c) => (
                <LiveChannelItemHifi key={c.channelName} {...c} />
              ))}
            </div>
          </div>
        </aside>

        {/* Player + stream meta */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="relative aspect-video w-full bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white ring-1 ring-white/20">
                Live · Counter-Strike
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-2 pt-10">
              <div className="flex items-center gap-2 text-white">
                <button
                  type="button"
                  className="rounded bg-white/10 p-1.5 hover:bg-white/20"
                  aria-label="Play"
                >
                  ▶
                </button>
                <div className="h-1 flex-1 rounded-full bg-white/20">
                  <div className="h-full w-1/3 rounded-full bg-[#9146FF]" />
                </div>
                <span className="text-xs tabular-nums text-zinc-300">1080p60</span>
                <button type="button" className="text-xs hover:underline">
                  ⛶
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-b border-zinc-800 bg-[#18181b] p-4 sm:flex-row sm:items-start">
            <div
              className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 ring-2 ring-zinc-700"
              aria-hidden
            />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-white">ESLCS</h2>
                <IconVerified className="h-5 w-5 text-[#9146FF]" aria-hidden />
              </div>
              <p className="text-sm font-medium text-zinc-200">
                HIGHLIGHTS: G2 vs 3DMAX — ESL Pro League
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <a href="#game" className="font-semibold text-[#9146FF] hover:underline">
                  Counter-Strike
                </a>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-400">English</span>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-400">Esports</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#9146FF] px-3 py-2 text-sm font-semibold text-white hover:bg-[#772ce8]"
              >
                ♡ Follow
              </button>
              <button
                type="button"
                className="rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-700"
              >
                Gift a Sub
              </button>
              <button
                type="button"
                className="rounded-md border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-700"
              >
                ★ Subscribe
              </button>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="tabular-nums">1,264 viewers</span>
                <span className="tabular-nums">6:43:35</span>
                <button type="button" className="rounded p-1 hover:bg-zinc-800" aria-label="Share">
                  ↗
                </button>
                <button type="button" className="rounded p-1 hover:bg-zinc-800" aria-label="More">
                  ⋯
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Chat */}
        <aside className="flex w-full shrink-0 flex-col border-t border-zinc-800 bg-[#18181b] lg:w-80 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
            <span className="text-xs font-bold uppercase tracking-wide text-zinc-400">Stream Chat</span>
            <div className="flex gap-1">
              <button
                type="button"
                className="rounded p-1 text-zinc-500 hover:bg-zinc-800"
                aria-label="Chat settings"
              >
                ⚙
              </button>
              <button
                type="button"
                className="rounded p-1 text-zinc-500 hover:bg-zinc-800"
                aria-label="Collapse chat"
              >
                ›
              </button>
            </div>
          </div>
          <div className="border-b border-zinc-800 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase text-zinc-500">Top givers</p>
            <div className="mt-2 flex gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-700" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700" />
            </div>
          </div>
          <div className="min-h-[120px] flex-1 space-y-2 overflow-y-auto px-3 py-3 lg:min-h-[200px]">
            <p className="text-xs text-zinc-500">Welcome to the chat room!</p>
            <p className="text-sm">
              <span className="font-semibold text-[#9146FF]">mod_bot:</span>{' '}
              <span className="text-zinc-300">Follow the channel for drop notifications.</span>
            </p>
          </div>
          <div className="space-y-2 border-t border-zinc-800 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-700 bg-[#1f1f23] px-2 py-1.5 text-[11px] text-zinc-400">
              <span>Animated emotes can be toggled in Settings.</span>
              <button type="button" className="font-semibold text-[#9146FF] hover:underline">
                Open
              </button>
            </div>
            <p className="text-[11px] text-amber-400/90">Slow mode: 3s between messages</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Send a message"
                className="min-w-0 flex-1 rounded-md border border-zinc-700 bg-[#18181b] px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#9146FF] focus:outline-none focus:ring-1 focus:ring-[#9146FF]"
              />
              <button
                type="button"
                className="shrink-0 rounded-md bg-[#9146FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#772ce8]"
              >
                Chat
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom promo */}
      <footer className="flex flex-col items-stretch gap-3 bg-[#9146FF] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-lg font-black text-white">⋯</span>
        <p className="min-w-0 flex-1 text-sm text-white/95">
          Sign up to get the best of ESLCS chat — follow or subscribe. Twitch is your oyster.
        </p>
        <button
          type="button"
          className="shrink-0 rounded-md bg-white px-5 py-2 text-sm font-bold text-[#9146FF] hover:bg-zinc-100"
        >
          Sign Up
        </button>
      </footer>
    </div>
  )
}
