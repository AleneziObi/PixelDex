import React, { useState, useMemo, useRef } from 'react'
import genres from './data/genres.json'
import SearchBar from './components/SearchBar' 
import GenreCard from './components/GenreCard'
import GenreDetail from './components/GenreDetail'
import CompareView from './components/CompareView'
import html2canvas from 'html2canvas'

export default function App() {
  const [query, setQuery] = useState('')
  const [decade, setDecade] = useState('all')
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [compare, setCompare] = useState([]) // up to 2 genres
  const exportRef = useRef(null)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return genres.filter(g => {
      const matchesQ =
        q === '' ||
        g.name.toLowerCase().includes(q) ||
        g.examples.join(' ').toLowerCase().includes(q) ||
        (g.subgenres || []).join(' ').toLowerCase().includes(q)
      const matchesDecade = decade === 'all' || Object.keys(g.popularity).includes(decade)
      return matchesQ && matchesDecade
    })
  }, [query, decade])

  function toggleCompare(g) {
    setCompare(prev => {
      if (prev.find(p => p.id === g.id)) return prev.filter(p => p.id !== g.id)
      if (prev.length >= 2) return [prev[1], g]
      return [...prev, g]
    })
  }

  async function handleExport() {
    const node = exportRef.current
    if (!node) return
    const canvas = await html2canvas(node, { scale: 2 })
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'pixeldex-comparison.png'
    a.click()
  }

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">PixelDex</h1>
        <p className="text-sm text-gray-600">Explore video game genres • React + Tailwind demo</p>
      </header>

      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} filter={decade} onFilterChange={setDecade} />
      </div>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {list.map(g => (
              <GenreCard
                key={g.id}
                genre={g}
                onSelect={setSelectedGenre}
                onCompareToggle={toggleCompare}
                comparing={!!compare.find(p => p.id === g.id)}
              />
            ))}
          </div>
        </section>

        <aside>
          <div className="sticky top-6" ref={exportRef}>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold">Selected for compare</div>
              <div className="mt-3 space-y-2">
                {compare.length === 0 && <div className="text-sm text-gray-500">No genres selected. Click "Compare" on cards to add.</div>}
                {compare.map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <div className="text-sm">{c.emoji} {c.name}</div>
                    <div className="text-xs text-gray-500">{c.subgenres.join(', ')}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => { if (compare.length > 0) handleExport() }} className="flex-1 px-3 py-2 rounded bg-indigo-600 text-white text-sm">Export Snapshot</button>
                <button onClick={() => setCompare([])} className="px-3 py-2 rounded border">Clear</button>
              </div>

            </div>

            <CompareView selected={compare} onClear={() => setCompare([])} onExport={handleExport} />
          </div>
        </aside>
      </main>

      <GenreDetail genre={selectedGenre} onClose={() => setSelectedGenre(null)} onAddCompare={(g) => { toggleCompare(g); setSelectedGenre(null) }} />

      <footer className="mt-10 text-center text-sm text-gray-500">Made with ❤ — PixelDex starter</footer>
    </div>
  )
}

