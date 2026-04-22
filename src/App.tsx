import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useOutletContext,
  useParams,
} from 'react-router-dom'
import { findRegistryEntry, registry } from './designs/registry'
import type { Kind, Mode, RegistryEntry } from './types'

const modes: Mode[] = ['wireframe', 'hifi']
const navSections: Array<{ mode: Mode; kind: Kind; label: string }> = [
  { mode: 'wireframe', kind: 'page', label: 'Wireframe Pages' },
  { mode: 'wireframe', kind: 'component', label: 'Wireframe Components' },
  { mode: 'hifi', kind: 'page', label: 'Hi-fi Pages' },
  { mode: 'hifi', kind: 'component', label: 'Hi-fi Components' },
]

type SectionRouteContext = {
  mode: Mode
  kind: Kind
}

function getEntries(mode: Mode, kind: Kind) {
  return registry.filter((entry) => entry.mode === mode && entry.kind === kind)
}

function isMode(value: string | undefined): value is Mode {
  return value === 'wireframe' || value === 'hifi'
}

function sectionToKind(section: string | undefined): Kind | null {
  if (section === 'page' || section === 'pages') {
    return 'page'
  }

  if (section === 'component' || section === 'components') {
    return 'component'
  }

  return null
}

function kindToSection(kind: Kind) {
  return kind === 'page' ? 'pages' : 'components'
}

function sectionHref(mode: Mode, kind: Kind) {
  return `/${mode}/${kindToSection(kind)}`
}

function entryHref(entry: RegistryEntry) {
  return `/${entry.mode}/${kindToSection(entry.kind)}/${entry.slug}/${entry.variant}`
}

function sectionLabel(mode: Mode, kind: Kind) {
  return `${mode === 'hifi' ? 'Hi-fi' : 'Wireframe'} ${kind === 'page' ? 'Pages' : 'Components'}`
}

function useSectionRouteContext() {
  return useOutletContext<SectionRouteContext>()
}

function DesignSystemLayout() {
  return (
    <>
      <header className="border-b border-slate-200 px-6 py-4">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
          {navSections.map((section) => (
            <NavLink
              key={`${section.mode}-${section.kind}`}
              to={sectionHref(section.mode, section.kind)}
              className={({ isActive }) =>
                isActive ? 'font-medium text-slate-950 underline' : 'underline'
              }
            >
              {section.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </>
  )
}

function SectionRoute() {
  const params = useParams()

  if (!isMode(params.mode)) {
    return <NotFoundPage />
  }

  const kind = sectionToKind(params.section)

  if (!kind) {
    return <NotFoundPage />
  }

  return <Outlet context={{ mode: params.mode, kind }} />
}

function SectionIndexPage() {
  const { mode, kind } = useSectionRouteContext()
  const entries = getEntries(mode, kind)

  return (
    <main className="space-y-6 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{sectionLabel(mode, kind)}</h1>
      </header>

      {entries.length === 0 ? (
        <p className="text-sm text-slate-500">No entries yet.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li key={entryHref(entry)}>
              <NavLink
                to={entryHref(entry)}
                className={({ isActive }) =>
                  [
                    'block rounded-md border px-4 py-3 no-underline transition-colors',
                    isActive
                      ? 'border-slate-300 bg-slate-100 text-slate-950'
                      : 'border-slate-200 text-slate-900 hover:bg-slate-50',
                  ].join(' ')
                }
              >
                <div className="text-sm font-medium">{entry.slug}</div>
                <div className="mt-0.5 text-xs text-slate-500">{entry.variant}</div>
                <p className="mt-2 text-sm text-slate-600">{entry.description}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

function DesignRoute() {
  const { mode, kind } = useSectionRouteContext()
  const params = useParams()
  const entry = findRegistryEntry(mode, kind, params.slug, params.variant)

  if (!entry) {
    return <NotFoundPage />
  }

  const Preview = entry.component

  return (
    <main className="space-y-4 p-6">
      <p>
        <Link to={sectionHref(mode, kind)}>{sectionLabel(mode, kind)}</Link>
      </p>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{entry.title}</h1>
        <p className="text-sm text-slate-600">{entry.description}</p>
      </div>
      <section>
        <Preview />
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="text-sm text-slate-600">Page not found.</p>
      <p>
        <Link to={sectionHref(modes[0], 'page')}>Go to Wireframe Pages</Link>
      </p>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<DesignSystemLayout />}>
        <Route index element={<Navigate to={sectionHref('wireframe', 'page')} replace />} />
        <Route path="/:mode/:section" element={<SectionRoute />}>
          <Route index element={<SectionIndexPage />} />
          <Route path=":slug/:variant" element={<DesignRoute />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
