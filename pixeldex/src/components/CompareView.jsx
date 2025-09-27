import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

function subgenreScore(genre, sub) {
    const base = Object.values(genre.popularity).reduce((a, b) => a + b, 0) / 5
  return Math.round(base / (sub.length + 1))
}

export default function CompareView({ selected, onClear, onExport }) {
  if (selected.length === 0) return null
  const left = selected[0]
  const right = selected[1]

  // build a list of combined subgenres
  const subs = Array.from(new Set([...(left?.subgenres || []), ...(right?.subgenres || [])]))
  const data = subs.map(s => ({ sub: s, [left?.id || 'left']: subgenreScore(left || { popularity: {} }, s), [right?.id || 'right']: subgenreScore(right || { popularity: {} }, s) }))

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Comparison</div>
        <div className="flex gap-2">
          <button onClick={onExport} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Export</button>
          <button onClick={onClear} className="px-3 py-1 rounded border">Clear</button>
        </div>
      </div>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sub" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={left?.id} name={left?.name} />
            <Bar dataKey={right?.id} name={right?.name} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}