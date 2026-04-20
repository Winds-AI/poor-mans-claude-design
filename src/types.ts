import type { ComponentType } from 'react'

export type Mode = 'wireframe' | 'hifi'

export type Kind = 'component' | 'page'

export type RegistryEntry = {
  mode: Mode
  kind: Kind
  slug: string
  variant: string
  title: string
  description: string
  component: ComponentType
}
