import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { findRegistryEntry, registry } from './designs/registry'
import type { Kind, Mode, RegistryEntry } from './types'

const modes: Mode[] = ['wireframe', 'hifi']
const kinds: Kind[] = ['page', 'component']

function getEntries(mode: Mode, kind: Kind) {
  return registry.filter((entry) => entry.mode === mode && entry.kind === kind)
}

function entryHref(entry: RegistryEntry) {
  return `/${entry.mode}/${entry.kind}/${entry.slug}/${entry.variant}`
}

function HomePage() {
  return (
    <main className="space-y-10 p-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Available Designs</h1>
        <p className="text-sm text-slate-600">
          Browse registered entries by mode, then by type.
        </p>
      </header>

      {modes.map((mode) => (
        <section key={mode} className="space-y-6 border-t pt-6 first:border-t-0 first:pt-0">
          <h2 className="text-xl font-medium capitalize">{mode}</h2>

          {kinds.map((kind) => {
            const entries = getEntries(mode, kind)

            return (
              <section key={kind} className="space-y-3 pl-4">
                <h3 className="text-sm font-medium uppercase tracking-wide text-slate-700">
                  {kind}s
                </h3>

                {entries.length === 0 ? (
                  <p className="text-sm text-slate-500">None</p>
                ) : (
                  <ul className="space-y-2">
                    {entries.map((entry) => (
                      <li key={entryHref(entry)}>
                        <NavLink
                          to={entryHref(entry)}
                          className={({ isActive }) =>
                            isActive ? 'font-medium underline' : 'text-blue-700 underline'
                          }
                        >
                          {entry.slug} / {entry.variant}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          })}
        </section>
      ))}
    </main>
  )
}

function DesignRoute() {
  const params = useParams()
  const entry = findRegistryEntry(
    params.mode,
    params.kind,
    params.slug,
    params.variant,
  )

  if (!entry) {
    return (
      <main className="p-6">
        <p>Not found.</p>
        <Link to="/">Home</Link>
      </main>
    )
  }

  const Preview = entry.component

  return (
    <main className="space-y-4 p-6">
      <p>
        <Link to="/">Home</Link>
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
        <Link to="/">Home</Link>
      </p>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:mode/:kind/:slug/:variant" element={<DesignRoute />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
