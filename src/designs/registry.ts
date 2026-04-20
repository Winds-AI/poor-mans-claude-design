import type { RegistryEntry } from '../types'
import CompetitorResearchOrchestrationHifiPage from './hifi/pages/competitor-research-orchestration/Variant1'
import CompetitorResearchSpawnMainHifiPage from './hifi/pages/competitor-research-spawn-main/Variant1'
import LiveChannelItemHifi from './hifi/components/live-channel-item/Variant1'
import StreamChannelHifiPage from './hifi/pages/stream-channel/Variant1'
import LiveChannelItemWireframe from './wireframe/components/live-channel-item/Variant1'
import CompetitorResearchSpawnWireframePage from './wireframe/pages/competitor-research-spawn/Variant1'
import StreamChannelWireframePage from './wireframe/pages/stream-channel/Variant1'

export const registry: RegistryEntry[] = [
  {
    mode: 'wireframe',
    kind: 'component',
    slug: 'live-channel-item',
    variant: 'variant1',
    title: 'Live channel row (wireframe · component)',
    description:
      'Sidebar row: avatar, two text lines (channel + category), live dot and viewer count.',
    component: LiveChannelItemWireframe,
  },
  {
    mode: 'wireframe',
    kind: 'page',
    slug: 'stream-channel',
    variant: 'variant1',
    title: 'Stream channel layout (wireframe · page)',
    description:
      'Holy-grail stream view: nav, live list, video, stream actions, chat, bottom promo.',
    component: StreamChannelWireframePage,
  },
  {
    mode: 'wireframe',
    kind: 'page',
    slug: 'competitor-research-spawn',
    variant: 'variant1',
    title: 'Competitor research — agents spawned (wireframe · page)',
    description:
      'First beat after send: three-column shell, 2×2 specialist grid, live-progress rail with empty log slots. Correct “starting” hierarchy vs premature “complete”.',
    component: CompetitorResearchSpawnWireframePage,
  },
  {
    mode: 'hifi',
    kind: 'component',
    slug: 'live-channel-item',
    variant: 'variant1',
    title: 'Live channel row (hi-fi · component)',
    description:
      'Interactive sidebar row: gradient avatar, channel and game, live pulse and viewers.',
    component: LiveChannelItemHifi,
  },
  {
    mode: 'hifi',
    kind: 'page',
    slug: 'stream-channel',
    variant: 'variant1',
    title: 'Stream channel layout (hi-fi · page)',
    description:
      'Dark stream UI: nav, live list, player bar, meta and actions, chat, signup banner.',
    component: StreamChannelHifiPage,
  },
  {
    mode: 'hifi',
    kind: 'page',
    slug: 'competitor-research-orchestration',
    variant: 'variant1',
    title: 'Competitor research, live multi-agent (hi-fi · page)',
    description:
      'Light, premium chat with a research card showing 4 sub-agents working in parallel and a live sidebar with per-agent timelines, current focus, and source counts (activity motion, not fake % complete).',
    component: CompetitorResearchOrchestrationHifiPage,
  },
  {
    mode: 'hifi',
    kind: 'page',
    slug: 'competitor-research-spawn-main',
    variant: 'variant1',
    title: 'Competitor research — main view, agents spawned (hi-fi · page)',
    description:
      'Center column only: session header, user message, 2×2 specialist grid with activity motion (no %), message actions, composer. No progress sidebar.',
    component: CompetitorResearchSpawnMainHifiPage,
  },
]

export function findRegistryEntry(
  mode: string | undefined,
  kind: string | undefined,
  slug: string | undefined,
  variant: string | undefined,
) {
  return registry.find(
    (entry) =>
      entry.mode === mode &&
      entry.kind === kind &&
      entry.slug === slug &&
      entry.variant === variant,
  )
}
