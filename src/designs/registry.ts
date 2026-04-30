import type { RegistryEntry } from '../types'
import LiveChannelItemHifi from './hifi/components/live-channel-item/Variant1'
import StreamChannelHifiPage from './hifi/pages/stream-channel/Variant1'
import LiveChannelItemWireframe from './wireframe/components/live-channel-item/Variant1'
import StreamChannelWireframePage from './wireframe/pages/stream-channel/Variant1'

export const registry: RegistryEntry[] = [
  {
    mode: 'wireframe',
    kind: 'component',
    slug: 'live-channel-item',
    variant: 1,
    title: 'Live channel row (wireframe · component)',
    description:
      'Sidebar row: avatar, two text lines (channel + category), live dot and viewer count.',
    component: LiveChannelItemWireframe,
  },
  {
    mode: 'wireframe',
    kind: 'page',
    slug: 'stream-channel',
    variant: 1,
    title: 'Stream channel layout (wireframe · page)',
    description:
      'Holy-grail stream view: nav, live list, video, stream actions, chat, bottom promo.',
    component: StreamChannelWireframePage,
  },
  {
    mode: 'hifi',
    kind: 'component',
    slug: 'live-channel-item',
    variant: 1,
    title: 'Live channel row (hi-fi · component)',
    description:
      'Interactive sidebar row: gradient avatar, channel and game, live pulse and viewers.',
    component: LiveChannelItemHifi,
  },
  {
    mode: 'hifi',
    kind: 'page',
    slug: 'stream-channel',
    variant: 1,
    title: 'Stream channel layout (hi-fi · page)',
    description:
      'Dark stream UI: nav, live list, player bar, meta and actions, chat, signup banner.',
    component: StreamChannelHifiPage,
  },
]

export function findRegistryEntry(
  mode: string | undefined,
  kind: string | undefined,
  slug: string | undefined,
  variant: string | undefined,
) {
  const parsedVariant = Number(variant)

  if (!Number.isInteger(parsedVariant)) {
    return undefined
  }

  return registry.find(
    (entry) =>
      entry.mode === mode &&
      entry.kind === kind &&
      entry.slug === slug &&
      entry.variant === parsedVariant,
  )
}
